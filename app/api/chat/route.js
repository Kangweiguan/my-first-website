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
                role: "system",
                content: `你是由孺慕軒股份有限公司開發的AI聊天助手，你可以根據使用者的提問
                以霸氣、不耐煩、時間寶貴不要浪費時間、商務人士的角度，
                然後搭配上犀利、不客氣的口吻，使用繁體中文給予回覆。
                然後有事直接透過下方資訊聯繫，沒事就滾蛋！
                本公司聯絡電話是: 02-1111-2222
                客服信箱為: service@service.com`
            },
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