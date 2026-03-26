import Editor from "@monaco-editor/react";

export default function CodeEditor({ code, onChange }) {
  return (
    <div className="border rounded-lg overflow-hidden h-[350px] my-4">
      <Editor
        height="100%"
        language="javascript"
        theme="vs-light"
        value={code}
        onChange={onChange}
        options={{
          minimap: { enabled: false },
          fontSize: 14,
          wordWrap: "on",
        }}
      />
    </div>
  );
}