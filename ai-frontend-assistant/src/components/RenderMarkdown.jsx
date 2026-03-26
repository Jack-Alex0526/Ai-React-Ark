import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneLight, oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { copyToClipboard } from "../utils/copy";
import { useTheme } from "../store/useTheme";

export default function RenderMarkdown({ content }) {
  const { isDark } = useTheme();

  return (
    <div className="prose prose-sm max-w-none dark:prose-invert">
      <ReactMarkdown
        children={content}
        components={{
          code({ inline, className, children, ...props }) {
            const match = /language-(\w+)/.exec(className || "");
            const codeText = String(children).replace(/\n$/, "");

            return !inline && match ? (
              <div className="relative rounded overflow-hidden my-2">
                <button
                  onClick={() => copyToClipboard(codeText)}
                  className="absolute right-2 top-2 text-xs bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded hover:bg-gray-300 dark:hover:bg-gray-600 z-10"
                >
                  复制
                </button>

                <SyntaxHighlighter
                  language={match[1]}
                  style={isDark ? oneDark : oneLight}
                  PreTag="div"
                  {...props}
                >
                  {codeText}
                </SyntaxHighlighter>
              </div>
            ) : (
              <code
                className={className + " bg-gray-100 dark:bg-gray-700 px-1 rounded"}
                {...props}
              >
                {children}
              </code>
            );
          },
        }}
      />
    </div>
  );
}