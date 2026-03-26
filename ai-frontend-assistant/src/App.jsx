import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import CodeGenerator from "./pages/CodeGenerator";
import DebugAssistant from "./pages/DebugAssistant";
import InterviewHelper from "./pages/InterviewHelper";
import Login from "./pages/Login";
import { useAuth } from "./store/useAuth";
import { useTheme } from "./store/useTheme";
import { useEffect } from "react";

function Protected({ children }) {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" />;
}

function App() {
  const { isDark } = useTheme();

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDark]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />

        <Route path="/" element={<Layout />}>
          <Route index element={<Protected><Home /></Protected>} />
          <Route path="code-generator" element={<Protected><CodeGenerator /></Protected>} />
          <Route path="debug" element={<Protected><DebugAssistant /></Protected>} />
          <Route path="interview" element={<Protected><InterviewHelper /></Protected>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;