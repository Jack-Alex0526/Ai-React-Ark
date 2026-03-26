export async function fetchDoubao(prompt, onChunk) {
  console.log("【调试】开始请求后端：", prompt); // 关键日志

  try {
    const res = await fetch("http://localhost:3002/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ prompt }),
    });

    console.log("【调试】后端响应状态：", res.status); // 关键日志

    const reader = res.body.getReader();
    const decoder = new TextDecoder();

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      const chunk = decoder.decode(value);
      const lines = chunk.split("\n").filter((i) => i.trim());

      for (const line of lines) {
        if (line.startsWith("data: ")) {
          const data = line.replace("data: ", "");
          if (data === "[DONE]") return;

          try {
            const json = JSON.parse(data);
            const content = json.content || "";
            onChunk(content);
          } catch (e) {
            console.warn("解析数据跳过", e);
          }
        }
      }
    }
  } catch (err) {
    console.error("【请求失败】", err); // 关键错误
  }
}