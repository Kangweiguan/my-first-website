'use client';

import { useState, useEffect } from 'react';
import { db, auth } from "@/services/firebase"
import { collection, addDoc, serverTimestamp, getDocs, deleteDoc, doc } from "firebase/firestore";
import { onAuthStateChanged, signOut } from "firebase/auth";
import ProductCard from '@/components/ProductCard';
import { useRouter } from 'next/navigation';

export default function AdminPage() {
    const [activeTab, setActiveTab] = useState('projects');
    const [formData, setFormData] = useState({
        title: '',
        image: '',
        description: ''
    });
    const [projects, setProjects] = useState([]);
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isAdmin, setIsAdmin] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user);
                setIsAdmin(user.email === process.env.NEXT_PUBLIC_ADMIN_EMAIL);
            } else {
                setUser(null);
                setIsAdmin(false);
                router.push('/admin-login');
            }
            setIsLoading(false);
        });

        return () => unsubscribe();
    }, [router]);

    useEffect(() => {
        if (!isLoading && !isAdmin) {
            router.push('/');
        }
    }, [isLoading, isAdmin, router]);

    const handleLogout = async () => {
        try {
            await signOut(auth);
            router.push('/admin-login');
        } catch (error) {
            console.error("登出失敗:", error);
        }
    };

    useEffect(() => {
        fetchProjects();
    }, []);

    const fetchProjects = async () => {
        try {
            const querySnapshot = await getDocs(collection(db, "project-list"));
            const projectsList = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            setProjects(projectsList);
        } catch (error) {
            console.error("Error fetching projects: ", error);
        }
    };

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-100">
                <div className="text-center">
                    <div className="text-2xl font-bold text-gray-700 mb-4">驗證登入身份中...</div>
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
                </div>
            </div>
        );
    }

    if (!isAdmin) {
        return null;
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const docRef = await addDoc(collection(db, "project-list"), {
                ...formData,
                createdAt: serverTimestamp()
            });

            alert('作品新增成功！');
            setFormData({ title: '', image: '', description: '' });
            fetchProjects();
        } catch (error) {
            console.error("Error adding document: ", error);
            alert(`新增失敗：${error.message}`);
        }
    };

    const handleDelete = async (projectId) => {
        if (window.confirm('確定要刪除這個作品嗎？')) {
            try {
                await deleteDoc(doc(db, "project-list", projectId));
                fetchProjects();
                alert('作品已刪除！');
            } catch (error) {
                console.error("Error deleting document: ", error);
                alert(`刪除失敗：${error.message}`);
            }
        }
    };

    const handleEdit = (project) => {
        // TODO: 實現編輯功能
        alert('編輯功能開發中...');
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const renderContent = () => {
        switch (activeTab) {
            case 'projects':
                return (
                    <div className="space-y-6">
                        {/* 新增作品表單 */}
                        <div className="bg-white shadow rounded-lg p-6">
                            <h1 className="text-2xl font-bold text-gray-900 mb-6">新增作品</h1>
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div>
                                    <label htmlFor="title" className="block text-lg font-medium text-gray-700 mb-2">
                                        標題
                                    </label>
                                    <input
                                        type="text"
                                        id="title"
                                        name="title"
                                        value={formData.title}
                                        onChange={handleChange}
                                        className="mt-1 block w-full rounded-md border-2 border-gray-300 p-3 text-lg shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                        required
                                    />
                                </div>

                                <div>
                                    <label htmlFor="image" className="block text-lg font-medium text-gray-700 mb-2">
                                        圖片網址
                                    </label>
                                    <input
                                        type="text"
                                        id="image"
                                        name="image"
                                        value={formData.image}
                                        onChange={handleChange}
                                        className="mt-1 block w-full rounded-md border-2 border-gray-300 p-3 text-lg shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                        required
                                    />
                                </div>

                                <div>
                                    <label htmlFor="description" className="block text-lg font-medium text-gray-700 mb-2">
                                        敘述
                                    </label>
                                    <textarea
                                        id="description"
                                        name="description"
                                        rows={4}
                                        value={formData.description}
                                        onChange={handleChange}
                                        className="mt-1 block w-full rounded-md border-2 border-gray-300 p-3 text-lg shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                        required
                                    />
                                </div>

                                <div>
                                    <button
                                        type="submit"
                                        className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-lg font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                    >
                                        新增作品
                                    </button>
                                </div>
                            </form>
                        </div>

                        {/* 作品列表 */}
                        <div className="bg-white shadow rounded-lg p-6">
                            <h2 className="text-2xl font-bold text-gray-900 mb-6">現有作品清單</h2>
                            <div className="grid grid-cols-3 gap-6">
                                {projects.map(project => (
                                    <ProductCard
                                        key={project.id}
                                        image={project.image}
                                        title={project.title}
                                        description={project.description}
                                        isAdmin={true}
                                        onEdit={() => handleEdit(project)}
                                        onDelete={() => handleDelete(project.id)}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                );
            case 'qa':
                return (
                    <div className="bg-white shadow rounded-lg p-6">
                        <h1 className="text-2xl font-bold text-gray-900 mb-6">問答管理</h1>
                        <p>問答管理內容將在這裡顯示</p>
                    </div>
                );
            case 'messages':
                return (
                    <div className="bg-white shadow rounded-lg p-6">
                        <h1 className="text-2xl font-bold text-gray-900 mb-6">收件管理</h1>
                        <p>收件管理內容將在這裡顯示</p>
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <div className="min-h-screen bg-gray-100">
            {/* 登入狀態顯示區 */}
            <div className="bg-white shadow-sm p-4 mb-4">
                <div className="max-w-7xl mx-auto flex justify-between items-center">
                    {user ? (
                        <>
                            <div className="text-gray-700">
                                目前登入: <span className="font-medium">{user.email}</span>
                            </div>
                            <button
                                onClick={handleLogout}
                                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md transition-colors"
                            >
                                登出
                            </button>
                        </>
                    ) : (
                        <div className="text-gray-700">
                            目前尚未登入
                        </div>
                    )}
                </div>
            </div>

            <div className="grid grid-cols-4 gap-4 p-4">
                {/* 左側選單區 */}
                <div className="col-span-1">
                    <div className="bg-white shadow rounded-lg p-4">
                        <h2 className="text-xl font-bold text-gray-900 mb-4">管理選單</h2>
                        <div className="space-y-2">
                            <button
                                onClick={() => setActiveTab('projects')}
                                className={`w-full text-left px-4 py-2 rounded-md transition-colors ${activeTab === 'projects'
                                    ? 'bg-indigo-600 text-white'
                                    : 'text-gray-700 hover:bg-gray-100'
                                    }`}
                            >
                                作品管理
                            </button>
                            <button
                                onClick={() => setActiveTab('qa')}
                                className={`w-full text-left px-4 py-2 rounded-md transition-colors ${activeTab === 'qa'
                                    ? 'bg-indigo-600 text-white'
                                    : 'text-gray-700 hover:bg-gray-100'
                                    }`}
                            >
                                問答管理
                            </button>
                            <button
                                onClick={() => setActiveTab('messages')}
                                className={`w-full text-left px-4 py-2 rounded-md transition-colors ${activeTab === 'messages'
                                    ? 'bg-indigo-600 text-white'
                                    : 'text-gray-700 hover:bg-gray-100'
                                    }`}
                            >
                                收件管理
                            </button>
                        </div>
                    </div>
                </div>

                {/* 右側內容區 */}
                <div className="col-span-3">
                    {renderContent()}
                </div>
            </div>
        </div>
    );
} 