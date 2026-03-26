import { useState } from "react";
import { fetchDoubao } from "../services/aiService";
import { useHistory } from "../store/useHistory";

export function useAIStream() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState("");
  const { addHistory } = useHistory();

  const sendPrompt = async (prompt) => {
    console.log("useAIStream 收到指令：", prompt);
    if (!prompt) return;

    setLoading(true);
    setResult("");
    let fullText = "";

    try {
      await fetchDoubao(prompt, (content) => {
        fullText += content;
        setResult(fullText);
      });

      addHistory(prompt, fullText);
    } catch (err) {
      console.error("AI流错误：", err);
      setResult("出错：" + err.message);
    } finally {
      setLoading(false);
    }
  };

  return { loading, result, sendPrompt };
}