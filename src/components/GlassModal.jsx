import { X } from "lucide-react";

export default function GlassModal({ open, onClose, title, subtitle, children, wide = false }) {
  if (!open) return null;
  return (
    <div className="modal-backdrop" onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
      <section className={`glass-modal ${wide ? "modal-wide" : ""}`} role="dialog" aria-modal="true">
        <button className="icon-button modal-close" onClick={onClose} aria-label="Close"><X size={21}/></button>
        <h2>{title}</h2>
        {subtitle && <p className="modal-subtitle">{subtitle}</p>}
        {children}
      </section>
    </div>
  );
}