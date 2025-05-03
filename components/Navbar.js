"use client"

import Link from "next/link";
import { useState, useEffect } from "react";
import { auth } from "@/services/firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useRouter } from "next/navigation";

export default function Navbar() {
    const [user, setUser] = useState(null);
    const [isAdmin, setIsAdmin] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setUser(user);
            if (user) {
                setIsAdmin(user.email === process.env.NEXT_PUBLIC_ADMIN_EMAIL);
            } else {
                setIsAdmin(false);
            }
        });

        return () => unsubscribe();
    }, []);

    const handleLogout = async () => {
        try {
            await signOut(auth);
            router.push('/');
        } catch (error) {
            console.error('Error signing out:', error);
        }
    };

    return (
        <nav className="fixed top-0 left-0 right-0 bg-green-600 text-white p-4 flex justify-between items-center z-50">
            <Link href="/" className="text-xl font-bold hover:text-green-200">
                John Doe
            </Link>
            <div className="space-x-4 flex items-center">
                <Link href="/about" className="hover:text-green-200">
                    About
                </Link>
                <Link href="/faq" className="hover:text-green-200">
                    FAQ
                </Link>
                {isAdmin && (
                    <Link
                        href="/admin"
                        className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-md transition-colors"
                    >
                        管理後台
                    </Link>
                )}
                {user ? (
                    <div className="flex items-center space-x-4">
                        <span className="text-sm">{user.email}</span>
                        <button
                            onClick={handleLogout}
                            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md transition-colors"
                        >
                            登出
                        </button>
                    </div>
                ) : (
                    <Link
                        href="/admin-login"
                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition-colors"
                    >
                        登入
                    </Link>
                )}
            </div>
        </nav>
    )
}
