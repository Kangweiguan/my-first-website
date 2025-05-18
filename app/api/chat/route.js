// 引入OpenAI套件
import OpenAI from "openai";
// 初始化OpenAI，取得可以跟OpenAI伺服器溝通的物件 "client"
const client = new OpenAI();


export async function POST(req) {
    // 取得前端傳過來的資料
    const userMessage = await req.json();
    console.log("userMessage", userMessage);

    // 對接OpenAI，並且得來自OpenAI的回應
    const completion = await client.chat.completions.create({
        model: "gpt-4.1",
        messages: [
            {
                role: "user",
                content: userMessage.text,
            },
        ],
    });

    const aiText = (completion.choices[0].message.content);
    console.log("AI回傳的文字", aiText);

    // 將AI回傳的文字包裝成前端可以接收的格式
    const aiMessage = {
        text: aiText,
        role: "ai",
        createdAt: new Date().getTime(),
    };
    console.log("aiMessage", aiMessage)

    // return Response.json(要給前端的資料)
    return Response.json(aiMessage);
}