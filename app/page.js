'use client';

import { useState, useEffect } from 'react';
import ProductCard from "@/components/ProductCard";
import { db } from "@/services/firebase";
import { collection, getDocs } from "firebase/firestore";

// 註解 Ctrl + / 
// app 底下的 page.js 是首頁
// 開啟Cursor Tab -> Ctrl + Shift + P -> Enable Cursor Tab
export default function Home() {
    const [projects, setProjects] = useState([]);

    useEffect(() => {
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

        fetchProjects();
    }, []);

    // TODO: 客戶推薦
    const testimonials = [
        {
            id: 1,
            name: "陳小萱",
            role: "科技新創執行長",
            content: "John Doe 為我們開發的電商平台超出預期。他對細節的關注和用戶體驗設計令人印象深刻。",
            image: "https://picsum.photos/100/100?random=10"
        },
        {
            id: 2,
            name: "張志明",
            role: "行銷總監",
            content: "John Doe 為我們設計的網站顯著提升了轉換率。專業、反應迅速，非常推薦！",
            image: "https://picsum.photos/100/100?random=11"
        },
        {
            id: 3,
            name: "王怡君",
            role: "新創創辦人",
            content: "與 John Doe 合作是一次愉快的經驗。他完全理解我們的願景，並打造出完美展現我們品牌的產品。",
            image: "https://picsum.photos/100/100?random=12"
        }
    ];

    // TODO: 常見問答
    const faqs = [
        {
            id: 1,
            question: "您提供哪些類型的網頁設計服務？",
            answer: "我提供全方位的網頁設計服務，包括響應式網站設計、電子商務平台開發、企業形象網站、網頁應用程式開發等。每個項目都會根據客戶的具體需求量身定制。"
        },
        {
            id: 2,
            question: "開發一個網站需要多長時間？",
            answer: "項目時程取決於網站的複雜度和功能需求。一般的企業形象網站約需 4-6 週，而較複雜的電子商務平台可能需要 8-12 週。我會在項目開始前提供詳細的時程規劃。"
        },
        {
            id: 3,
            question: "網站完成後是否提供後續支援？",
            answer: "是的，我提供網站上線後的技術支援和維護服務。包括定期更新、安全維護、內容更新協助等。我們可以根據您的需求制定合適的維護方案。"
        },
        {
            id: 4,
            question: "如何確保網站的安全性？",
            answer: "我採用業界最佳實踐來確保網站安全，包括SSL加密、定期安全更新、防火牆配置、資料備份等措施。同時也會提供安全使用指南給客戶。"
        }
    ];

    return (
        <>
            <header className="bg-black py-20">
                <div className="container mx-auto px-4">
                    <h1 className="text-center text-white text-6xl font-extrabold">Will 的個人網站</h1>
                    <h2 className="text-center text-[#FF5733] text-3xl font-bold mt-4">PM與前端網站開發者</h2>
                    <div className="flex justify-center gap-4 mt-6">
                        <a
                            href="/about"
                            className="px-6 py-3 bg-[#FF5733] text-white rounded-md
                                     transition-all duration-300 ease-in-out
                                     hover:-translate-y-1
                                     hover:shadow-[0_10px_20px_rgba(255,87,51,0.3)]
                                     hover:shadow-[0_10px_20px_rgba(128,0,128,0.1)]"
                        >
                            關於本站
                        </a>
                        <a
                            href="/faq"
                            className="px-6 py-3 bg-[#FF5733] text-white rounded-md
                                     transition-all duration-300 ease-in-out
                                     hover:-translate-y-1
                                     hover:shadow-[0_10px_20px_rgba(255,87,51,0.3)]
                                     hover:shadow-[0_10px_20px_rgba(128,0,128,0.1)]"
                        >
                            常見問題
                        </a>
                    </div>
                </div>
            </header>

            {/* Projects Section - White background */}
            <section className="py-16 bg-white">
                <div className="container mx-auto px-4">
                    <h2 className="text-4xl font-bold text-center mb-12 text-black">作品集</h2>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {projects.map(project => (
                            <ProductCard
                                key={project.id}
                                image={project.image}
                                title={project.title}
                                description={project.description}
                            />
                        ))}
                    </div>
                </div>
            </section>

            {/* About Me Section - Black background */}
            <section className="py-16 bg-black text-white">
                <div className="container mx-auto px-4">
                    <h2 className="text-4xl font-bold text-center mb-12">關於我</h2>
                    <div className="flex flex-col md:flex-row items-center gap-12">
                        <div className="md:w-1/2">
                            <img
                                src="https://picsum.photos/600/400?random=20"
                                alt="關於我"
                                className="rounded-lg shadow-lg w-full"
                            />
                        </div>
                        <div className="md:w-1/2">
                            <h3 className="text-2xl font-bold mb-4 text-[#FF5733]">嗨！我是 John Doe</h3>
                            <p className="text-gray-300 mb-4">
                                擁有超過 8 年的網頁設計與開發經驗，專注於創造美觀且實用的數位體驗。我相信優秀的設計不僅要看起來令人驚艷，更要能夠解決實際問題。
                            </p>
                            <p className="text-gray-300 mb-4">
                                我擅長運用現代網頁技術，包括 React、Next.js、TypeScript 等，為客戶打造高效能且易於維護的網站。
                            </p>
                            <div className="grid grid-cols-2 gap-4 mt-8">
                                <div className="bg-neutral-800 p-4 rounded-lg border border-[#FF5733] transform transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_10px_20px_rgba(255,87,51,0.3)] cursor-pointer">
                                    <h4 className="font-bold text-xl mb-2 text-[#FF5733]">100+</h4>
                                    <p className="text-gray-300">完成專案</p>
                                </div>
                                <div className="bg-neutral-800 p-4 rounded-lg border border-[#FF5733] transform transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_10px_20px_rgba(255,87,51,0.3)] cursor-pointer">
                                    <h4 className="font-bold text-xl mb-2 text-[#FF5733]">50+</h4>
                                    <p className="text-gray-300">合作客戶</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Testimonials Section - White background */}
            <section className="py-16 bg-white">
                <div className="container mx-auto px-4">
                    <h2 className="text-4xl font-bold text-center mb-12 text-black">客戶推薦</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {testimonials.map(testimonial => (
                            <div key={testimonial.id} className="bg-neutral-100 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
                                <div className="flex items-center mb-4">
                                    <img
                                        src={testimonial.image}
                                        alt={testimonial.name}
                                        className="w-12 h-12 rounded-full mr-4 border-2 border-[#FF5733]"
                                    />
                                    <div>
                                        <h3 className="font-bold text-black">{testimonial.name}</h3>
                                        <p className="text-[#FF5733] text-sm">{testimonial.role}</p>
                                    </div>
                                </div>
                                <p className="text-gray-600 italic">"{testimonial.content}"</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* FAQ Section - Black background */}
            <section className="py-16 bg-black text-white">
                <div className="container mx-auto px-4">
                    <h2 className="text-4xl font-bold text-center mb-12">常見問答</h2>
                    <div className="max-w-3xl mx-auto">
                        {faqs.map(faq => (
                            <div key={faq.id} className="mb-8 bg-neutral-900 p-6 rounded-lg hover:bg-neutral-800 transition-colors duration-300">
                                <h3 className="text-xl font-bold mb-3 text-[#FF5733]">{faq.question}</h3>
                                <p className="text-gray-300">{faq.answer}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Contact Form Section - White background */}
            <section className="py-16 bg-white">
                <div className="container mx-auto px-4">
                    <h2 className="text-4xl font-bold text-center mb-12 text-black">聯絡表單</h2>
                    <div className="max-w-2xl mx-auto">
                        <form className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                                        姓名
                                    </label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF5733] focus:border-transparent outline-none transition duration-200"
                                        required
                                    />
                                </div>
                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                                        Email
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF5733] focus:border-transparent outline-none transition duration-200"
                                        required
                                    />
                                </div>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-2">
                                        公司名稱
                                    </label>
                                    <input
                                        type="text"
                                        id="company"
                                        name="company"
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF5733] focus:border-transparent outline-none transition duration-200"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                                        職稱
                                    </label>
                                    <input
                                        type="text"
                                        id="title"
                                        name="title"
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF5733] focus:border-transparent outline-none transition duration-200"
                                    />
                                </div>
                            </div>
                            <div>
                                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                                    留言內容
                                </label>
                                <textarea
                                    id="message"
                                    name="message"
                                    rows="5"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF5733] focus:border-transparent outline-none transition duration-200 resize-none"
                                    required
                                ></textarea>
                            </div>
                            <div className="text-center">
                                <button
                                    type="submit"
                                    className="bg-[#FF5733] text-white px-8 py-3 rounded-lg font-semibold hover:bg-[#E64A2E] transition duration-300 transform hover:-translate-y-1"
                                >
                                    送出表單
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </section>
        </>
    );
}