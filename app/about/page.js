import Link from 'next/link';

export default function About() {
    return (
        <div className="min-h-screen bg-white">
            <div className="max-w-4xl mx-auto px-4 py-12">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">關於本站</h1>
                    <div className="w-24 h-1 bg-coral-500 mx-auto"></div>
                </div>

                <div className="flex justify-center mb-8">
                    <Link
                        href="/"
                        className="inline-flex items-center px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
                    >
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                        返回首頁
                    </Link>
                </div>

                <div className="space-y-12">
                    <section className="bg-white rounded-lg shadow-sm p-8 border-l-4 border-coral-500">
                        <h2 className="text-2xl font-semibold text-gray-900 mb-4">網站簡介</h2>
                        <p className="text-gray-700 leading-relaxed">
                            歡迎來到我們的網站！這是一個專注於提供優質內容和服務的平台。我們致力於為用戶創造一個便捷、安全且富有價值的網絡環境。
                        </p>
                    </section>

                    <section className="bg-white rounded-lg shadow-sm p-8 border-l-4 border-sky-500">
                        <h2 className="text-2xl font-semibold text-gray-900 mb-4">我們的使命</h2>
                        <p className="text-gray-700 leading-relaxed">
                            我們的使命是通過創新的技術和優質的服務，為用戶提供最佳的網絡體驗。我們相信，通過不斷改進和創新，我們可以為用戶創造更多價值。
                        </p>
                    </section>

                    <section className="bg-white rounded-lg shadow-sm p-8 border-l-4 border-coral-500">
                        <h2 className="text-2xl font-semibold text-gray-900 mb-4">網站特色</h2>
                        <ul className="list-disc pl-6 text-gray-700 space-y-2">
                            <li className="flex items-center">
                                <span className="w-2 h-2 bg-coral-500 rounded-full mr-2"></span>
                                用戶友好的界面設計
                            </li>
                            <li className="flex items-center">
                                <span className="w-2 h-2 bg-coral-500 rounded-full mr-2"></span>
                                安全可靠的數據保護
                            </li>
                            <li className="flex items-center">
                                <span className="w-2 h-2 bg-coral-500 rounded-full mr-2"></span>
                                豐富多樣的內容資源
                            </li>
                            <li className="flex items-center">
                                <span className="w-2 h-2 bg-coral-500 rounded-full mr-2"></span>
                                快速響應的客戶服務
                            </li>
                            <li className="flex items-center">
                                <span className="w-2 h-2 bg-coral-500 rounded-full mr-2"></span>
                                持續更新的功能優化
                            </li>
                        </ul>
                    </section>

                    <section className="bg-white rounded-lg shadow-sm p-8 border-l-4 border-sky-500">
                        <h2 className="text-2xl font-semibold text-gray-900 mb-4">聯繫我們</h2>
                        <p className="text-gray-700 leading-relaxed mb-4">
                            如果您有任何問題或建議，歡迎隨時與我們聯繫。您可以通過以下方式聯繫我們：
                        </p>
                        <ul className="space-y-3">
                            <li className="flex items-center text-gray-700">
                                <span className="w-6 h-6 bg-sky-500 rounded-full flex items-center justify-center mr-3">
                                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                    </svg>
                                </span>
                                電子郵件：contact@example.com
                            </li>
                            <li className="flex items-center text-gray-700">
                                <span className="w-6 h-6 bg-sky-500 rounded-full flex items-center justify-center mr-3">
                                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                    </svg>
                                </span>
                                電話：+886-2-1234-5678
                            </li>
                            <li className="flex items-center text-gray-700">
                                <span className="w-6 h-6 bg-sky-500 rounded-full flex items-center justify-center mr-3">
                                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                </span>
                                地址：台北市信義區信義路五段7號
                            </li>
                        </ul>
                    </section>
                </div>
            </div>
        </div>
    );
}