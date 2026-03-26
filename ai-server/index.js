require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// ==============================================
// 🔥 修复：测试函数完全用环境变量，不再硬编码
// ==============================================
async function testAPI() {
  console.log("🔍 正在测试豆包API连通性...");
  console.log("🔑 读取到的模型ID:", process.env.DOUBAO_MODEL); // 打印确认
  try {
    const res = await fetch("https://ark.cn-beijing.volces.com/api/v3/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.DOUBAO_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: process.env.DOUBAO_MODEL, // 完全用.env里的ep-开头ID
        messages: [{ role: "user", content: "你好" }]
      })
    });
    console.log("✅ 测试状态码:", res.status);
    const data = await res.json();
    console.log("✅ 测试返回:", JSON.stringify(data, null, 2));
  } catch (err) {
    console.error("❌ 测试失败:", err);
  }
}
// 启动时自动运行测试
testAPI();

// ==============================================
// 聊天接口（同步修复，完全用环境变量）
// ==============================================
app.post('/api/chat', async (req, res) => {
  console.log('【后端】收到请求：', req.body.prompt);

  res.setHeader('Content-Type', 'text/event-stream; charset=utf-8');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');

  try {
    const apiUrl = "https://ark.cn-beijing.volces.com/api/v3/chat/completions";

    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.DOUBAO_API_KEY}`
      },
      body: JSON.stringify({
        model: process.env.DOUBAO_MODEL, // 用.env里的ep-开头ID
        messages: [{ role: 'user', content: req.body.prompt }],
        stream: true
      })
    });

    console.log('【后端】豆包响应状态：', response.status);

    if (!response.ok) {
      const errorText = await response.text();
      console.error('【后端】API错误详情：', errorText);
      res.write(`data: ${JSON.stringify({ error: `API请求失败：${response.status}` })}\n\n`);
      return res.end();
    }

    const reader = response.body.getReader();
    const decoder = new TextDecoder('utf-8', { fatal: false });

    async function read() {
      try {
        const { done, value } = await reader.read();
        if (done) {
          res.end();
          return;
        }

        const chunk = decoder.decode(value, { stream: true });
        const lines = chunk.split('\n').filter(line => line.trim());

        for (const line of lines) {
          if (line.startsWith('data: ')) {
            const data = line.replace('data: ', '');
            if (data === '[DONE]') continue;

            try {
              const json = JSON.parse(data);
              const content = json.choices?.[0]?.delta?.content || '';
              if (content) {
                res.write(Buffer.from(`data: ${JSON.stringify({ content })}\n\n`, 'utf-8'));
              }
            } catch (e) {
              console.warn('【后端】解析数据跳过：', e.message);
            }
          }
        }
        read();
      } catch (readErr) {
        console.error('【后端】流读取错误：', readErr);
        res.end();
      }
    }
    read();

  } catch (err) {
    console.error('【后端】全局错误：', err);
    try {
      res.write(`data: ${JSON.stringify({ error: err.message })}\n\n`);
    } finally {
      res.end();
    }
  }
});

const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
  console.log(`✅ 服务已启动：http://localhost:${PORT}`);
});