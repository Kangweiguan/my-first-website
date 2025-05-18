"use client"
// 將此元件強制轉換為前端元件，讓邏輯運算在瀏覽器端進行
// 不能放金鑰、機密資訊
import { useState, useEffect, useRef } from "react"
import moment from "moment"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRobot } from '@fortawesome/free-solid-svg-icons'
import { faPaperPlane, faSpinner } from '@fortawesome/free-solid-svg-icons'
// 引入axios：可將資料傳送給後端之套件(負責做Https request的套件)
import axios from "axios";


export default function ChatRoom() {
    // 控制聊天室開啟狀態的函數
    // const [聊天室是否開啟之狀態, 控制該狀態的函數] = useState(狀態初始值)
    const [isOpen, setIsOpen] = useState(true)
    // const [聊天室User輸入框輸入狀態, 控制該狀態的函數] = useState(狀態初始值)
    const [userInput, setUserInput] = useState("")
    // 預設一個名為chatHistory(聊天室內整體的對話)的狀態，初始值為空陣列
    const [chatHistory, setChatHistory] = useState([
        {
            text: "Hello 你是誰？",
            role: "user",
            createdAt: new Date().getTime()
        },
        {
            text: "Hi 我是AI",
            role: "ai",
            createdAt: new Date().getTime() + 1000
        }
    ])
    // 設計一個名為isLoading的狀態，預設為false。如果是true就在聊天室內顯示一個等候動畫
    const [isLoading, setIsLoading] = useState(false)
    // 新增一個ref來引用聊天內容區的div元素
    const chatContainerRef = useRef(null)

    const submitHandler = (e) => {
        // 阻止表單送出時，預設會重新整理的行為
        e.preventDefault()
        const userMessage = {
            // 訊息的文字使用輸入框內的文字
            text: userInput,
            // 產生者為User
            role: "user",
            // 訊息產生的時間戳記
            createdAt: new Date().getTime()
        }
        // 更新聊天室內的訊息，並且將過去的歷史紀錄訊息保留在前面，最新的訊息放在最下方
        setChatHistory([...chatHistory, userMessage])
        // 清空輸入框
        setUserInput("")
        // 顯示訊息回覆中，請等候的提示
        setIsLoading(true)
        // 將userMessgae POST到後端 /api/chat
        axios
            .post("/api/chat", userMessage)
            .then(res => {
                console.log("成功獲得後端回應", res);
                const aiMessage = res.data;
                // 確保前次使用者的訊息已經被更新完成後的狀態放在新狀態的最前面
                setChatHistory(prev => [...prev, aiMessage]);
                setIsLoading(false);
            })
            .catch(error => {
                console.log("出錯了!", error);
                alert("發生錯誤，請重新再試一次！");
                setIsLoading(false);
            })
    }

    // 當chatHistory更新時，自動捲動到最下方
    useEffect(() => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight
        }
    }, [chatHistory])

    return (
        <>
            <div className="fixed bottom-5 right-5 flex flex-col items-end">
                {/* 聊天室 : 只有在isOpen為true時，才會顯示 */}
                {isOpen && <div className="w-[300px] bg-white rounded-lg shadow-[0_4px_8px_rgba(128,0,128,0.2)] overflow-hidden mb-4">
                    {/* 聊天室-標題區 */}
                    <div className="bg-gradient-to-r from-orange-500 to-orange-600 p-5">
                        <h3 className="text-white font-bold">跟AI小編聊聊</h3>
                    </div>
                    {/* 聊天室-內容區 */}
                    <div ref={chatContainerRef} className="h-[300px] overflow-y-auto px-4 pt-5">
                        {/* 未來放置所有對話訊息的地方 */}
                        {/* 透過map迴圈，把陣列內的每個物件取出，並稱每個物件為Message */}
                        {chatHistory.map(message => {
                            // 取得每個message物件後要做的事
                            // 把message內的三個欄位資料個別取出
                            const { text, role, createdAt } = message
                            // 將時間戳記轉換為可讀的時間格式
                            const t = moment(createdAt).format("YYYY/MM/DD HH:mm:ss")
                            // 如果訊息產生的角色是User
                            if (role == "user") {
                                // 則做以下的事
                                return (
                                    <div className="flex justify-end mb-4" key={createdAt}>
                                        <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-tl-lg rounded-tr-lg rounded-bl-lg p-3 max-w-[75%] shadow-md">
                                            <p className="font-semibold">{text}</p>
                                            <p className="text-[10px] opacity-50">{t}</p>
                                        </div>
                                    </div>
                                )
                                // 如果訊息產生的角色是AI
                            } else if (role == "ai") {
                                // 則做以下的事
                                return (
                                    <div className="flex justify-start mb-4" key={createdAt}>
                                        <div className="bg-gradient-to-r from-blue-500 to-gray-600 text-white rounded-tl-lg rounded-tr-lg rounded-br-lg p-3 max-w-[75%] shadow-md">
                                            <p className="font-semibold">{text}</p>
                                            <p className="text-[10px] opacity-50">{t}</p>
                                        </div>
                                    </div>
                                )
                            }
                        })
                        }

                        {isLoading &&
                            <div>
                                <p className="text-gray-500">
                                    <FontAwesomeIcon icon={faSpinner} className="mr-2 fa-spin" />
                                    等待AI回應中
                                </p>

                            </div>}

                    </div>
                    {/* 聊天室-輸入表單區 */}
                    <form onSubmit={submitHandler} className="p-4 border-t border-gray-200 flex gap-2">
                        <input
                            // 讓輸入框的值，對應到userInput狀態
                            value={userInput}
                            // onChange事件觸發時，e.target.value代表User輸入在輸入框中的文字
                            // 透過usereInput 把User當下輸入的文字更新 userInput狀態
                            // 狀態被更新會觸發react，更新整個畫面的程序，讓畫面重新渲染(re-render)
                            onChange={e => setUserInput(e.target.value)}
                            className="flex-1 border border-gray-300 rounded-md p-2"
                            placeholder="趕快來跟AI對話"
                            minLength={2}
                            required
                        />
                        <button className="w-10 h-10 bg-blue-500 border-2 border-orange-600 rounded-md">
                            <FontAwesomeIcon icon={faPaperPlane} />
                        </button>
                    </form>
                </div>}
                {/* 開啟聊天室的按鈕 */}
                <button
                    // on事件={函數}
                    onClick={() => setIsOpen(!isOpen)}
                    className="w-[50px] h-[50px] rounded-full bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-[0_4px_8px_rgba(128,0,128,0.2)]">
                    <FontAwesomeIcon icon={faRobot} />
                </button>
            </div>
        </>
    )
}

