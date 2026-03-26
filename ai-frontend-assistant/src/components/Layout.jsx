import { Link, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../store/useAuth";
import ThemeToggle from "./ThemeToggle";

export default function Layout() {
  const { user, logout } = useAuth();
  const nav = useNavigate();

  const handleLogout = () => {
    logout();
    nav("/login");
  };

  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-primary dark:bg-gray-800 shadow-md">
        <div className="max-w-7xl mx-auto px-4 py-3 flex flex-wrap gap-3 items-center justify-between">
          <h1 className="text-xl font-bold text-accent dark:text-yellow-400">
            AI 前端助手
          </h1>

          <div className="flex items-center gap-4">
            <ThemeToggle />

            <nav className="flex gap-4 flex-wrap">
              <Link to="/" className="hover:text-accent">首页</Link>
              <Link to="/code-generator">代码生成</Link>
              <Link to="/debug">报错调试</Link>
              <Link to="/interview">面试助手</Link>
            </nav>

            {user ? (
              <div className="flex items-center gap-2">
                <span className="text-sm">欢迎，{user}</span>
                <button onClick={handleLogout} className="text-sm text-red-500">
                  退出
                </button>
              </div>
            ) : (
              <Link to="/login" className="text-accent">登录</Link>
            )}
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 py-8">
        <Outlet />
      </main>

      <footer className="bg-primary dark:bg-gray-800 py-4 text-center text-sm">
        3519027082@qq.com © 2026.3
      </footer>
    </div>
  );
}