import { useState } from "react";
import { Send } from "lucide-react";

export default function AIChatBox({ onSend, loading }) {
  const [prompt, setPrompt] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("我点击发送了，内容：", prompt); // 调试日志
    if (!prompt.trim()) return;
    onSend(prompt);
    setPrompt("");
  };

  return (
    <form onSubmit={handleSubmit} className="mt-4 flex gap-2">
      <input
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="输入你的需求..."
        className="flex-1 border rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-accent"
        disabled={loading}
      />
      <button
        type="submit"
        disabled={loading}
        className="bg-accent text-white px-4 rounded-lg hover:opacity-90 disabled:opacity-50 flex items-center gap-1"
      >
        <Send size={18} /> 发送
      </button>
    </form>
  );
}