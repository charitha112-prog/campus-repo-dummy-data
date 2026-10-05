import { GraduationCap } from "lucide-react";

export default function Brand({ compact = false }) {
  return (
    <div className={`brand ${compact ? "brand-compact" : ""}`}>
      <GraduationCap size={34} strokeWidth={1.6} />
      {!compact && (
        <div>
          <strong>Campus Knowledge</strong>
          <strong>Repository</strong>
        </div>
      )}
    </div>
  );
}