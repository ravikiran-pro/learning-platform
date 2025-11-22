interface ConsolePanelProps {
  logs: string[];
}

const ConsolePanel: React.FC<ConsolePanelProps> = ({ logs }) => {
  return (
    <pre className="text-yellow-400 whitespace-pre-wrap font-mono text-sm">
      {logs.length ? logs.join("\n") : "No console logs"}
    </pre>
  );
};

export default ConsolePanel;
