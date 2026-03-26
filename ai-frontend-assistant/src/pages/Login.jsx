import { useState } from "react";
import { useAuth } from "../store/useAuth";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [name, setName] = useState("");
  const [pwd, setPwd] = useState("");
  const { login } = useAuth();
  const nav = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (name && pwd) {
      login(name);
      nav("/");
    }
  };

  return (
    <div className="max-w-sm mx-auto mt-20 bg-white dark:bg-gray-800 p-6 rounded-xl shadow">
      <h2 className="text-2xl font-bold mb-4 text-center">登录</h2>
      <form onSubmit={handleLogin} className="space-y-4">
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="用户名"
          className="w-full border p-2 rounded dark:bg-gray-700 dark:border-gray-600"
        />
        <input
          type="password"
          value={pwd}
          onChange={(e) => setPwd(e.target.value)}
          placeholder="密码"
          className="w-full border p-2 rounded dark:bg-gray-700 dark:border-gray-600"
        />
        <button
          type="submit"
          className="w-full bg-accent text-white py-2 rounded hover:opacity-90"
        >
          登录
        </button>
      </form>
    </div>
  );
}