export default function Home() {
  return (
    <div className="text-center max-w-2xl mx-auto mt-2 space-y-6">
      <h2 className="text-3xl font-bold text-accent dark:text-yellow-400">
        欢迎使用 AI 前端助手
      </h2>
      <p className="text-gray-700 dark:text-gray-300">
        集成代码生成、报错分析、面试辅导，一站式前端开发辅助平台
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-8">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm">
          <h3 className="font-bold mb-2">⚙️ 代码生成</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            一句话生成 React 组件
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm">
          <h3 className="font-bold mb-2">🐞 报错调试</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            自动分析报错并给出修复方案
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm">
          <h3 className="font-bold mb-2">📚 面试辅导</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            JS/React 高频题讲解
          </p>
        </div>
      </div>
    </div>
  );
}