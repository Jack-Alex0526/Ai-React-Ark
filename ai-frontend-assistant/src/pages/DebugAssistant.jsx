import { useAIStream } from "../hooks/useAIStream";
import AIChatBox from "../components/AIChatBox";
import HistoryPanel from "../components/HistoryPanel";
import RenderMarkdown from "../components/RenderMarkdown";

export default function DebugAssistant() {
  const { loading, result, sendPrompt } = useAIStream();

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="md:col-span-2">
        <h2 className="text-2xl font-bold mb-4">🐞 报错调试助手</h2>
        <p className="mb-4 text-gray-600 dark:text-gray-300">
          粘贴报错信息或描述问题，AI 帮你分析原因并给出修复方案
        </p>

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