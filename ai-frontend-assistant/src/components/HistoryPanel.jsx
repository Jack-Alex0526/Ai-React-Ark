import { useHistory } from "../store/useHistory";

export default function HistoryPanel() {
  const { histories, clearHistory } = useHistory();

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-4 h-[500px] overflow-y-auto">
      <div className="flex justify-between items-center mb-3">
        <h3 className="font-bold">历史记录</h3>
        <button
          onClick={clearHistory}
          className="text-sm text-red-500 dark:text-red-400"
        >
          清空
        </button>
      </div>

      <div className="space-y-3">
        {histories.length === 0 ? (
          <p className="text-sm text-gray-500">暂无记录</p>
        ) : (
          histories.map((h, index) => (
            <div
              key={`history-${h.id}-${index}-${h.prompt?.slice(0, 10) || 'empty'}`}
              className="border-b pb-2 dark:border-gray-700 text-sm"
            >
              <p className="text-accent dark:text-yellow-400">Q：{h.prompt}</p>
              <p className="text-gray-600 dark:text-gray-300 line-clamp-2">
                A：{h.answer}
              </p>
              <p className="text-xs text-gray-400 mt-1">{h.time}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}