export default function FAQ() {
    return (
        <div className="min-h-screen bg-black text-white">
            <div className="container mx-auto px-4 py-20">
                <h1 className="text-4xl font-bold text-center mb-12">常見問題</h1>
                <div className="flex justify-center">
                    <a
                        href="/"
                        className="px-6 py-3 bg-[#FF5733] text-white rounded-md
                                 transition-all duration-300 ease-in-out
                                 hover:-translate-y-1
                                 hover:shadow-[0_10px_20px_rgba(255,87,51,0.3)]
                                 hover:shadow-[0_10px_20px_rgba(128,0,128,0.1)]"
                    >
                        返回首頁
                    </a>
                </div>
            </div>
        </div>
    );
} 