import { useState } from "react";
import { useAIStream } from "../hooks/useAIStream";
import AIChatBox from "../components/AIChatBox";
import CodeEditor from "../components/CodeEditor";
import HistoryPanel from "../components/HistoryPanel";
import RenderMarkdown from "../components/RenderMarkdown";

export default function CodeGenerator() {
  const { loading, result, sendPrompt } = useAIStream();
  const [code, setCode] = useState("");

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="md:col-span-2">
        <h2 className="text-2xl font-bold mb-4">⚙️ AI 代码生成</h2>
        <CodeEditor code={code} onChange={setCode} />
        <AIChatBox onSend={sendPrompt} loading={loading} />

        {result && (
          <div className="mt-6 bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
            <RenderMarkdown content={result} />
          </div>
        )}
      </div>

      <div className="hidden md:block">
        <HistoryPanel />
      </div>
    </div>
  );
}