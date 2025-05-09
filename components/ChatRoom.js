
export default function ChatRoom() {
    return (
        <>
            <div className="fixed bottom-5 right-5 flex flex-col items-end">
                {/* 聊天室 */}
                <div className="w-[300px] bg-white rounded-lg shadow-[0_4px_8px_rgba(128,0,128,0.2)] overflow-hidden mb-4">
                    {/* 聊天室-標題區 */}
                    <div className="bg-gradient-to-r from-orange-500 to-orange-600 p-5">
                        <h3 className="text-white font-bold">跟AI小編聊聊</h3>
                    </div>
                    {/* 聊天室-內容區 */}
                    <div className="h-[300px] overflow-y-auto">
                        {/* 未來放置所有對話訊息的地方 */}
                    </div>
                    {/* 聊天室-輸入表單區 */}
                    <form className="p-4 border-t border-gray-200 flex gap-2">
                        <input
                            className="flex-1 border border-gray-300 rounded-md p-2"
                            placeholder="趕快來跟AI對話"
                            minLength={2}
                            required
                        />
                        <button className="w-10 h-10 bg-blue-500 border-2 border-orange-600 rounded-md">送出</button>
                    </form>
                </div>
                {/* 開啟聊天室的按鈕 */}
                <button className="w-[50px] h-[50px] rounded-full bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-[0_4px_8px_rgba(128,0,128,0.2)]">
                    開始聊天
                </button>
            </div>
        </>
    )
}

