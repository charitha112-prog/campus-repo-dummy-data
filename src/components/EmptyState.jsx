import { Database, FileSearch } from "lucide-react";

export default function EmptyState({ message = "No records available yet.", action }) {
  return (
    <div className="empty-state">
      <div className="empty-icon"><Database size={34}/></div>
      <h3>{message}</h3>
      <p>Records will appear here after they are added through the repository.</p>
      {action}
    </div>
  );
}