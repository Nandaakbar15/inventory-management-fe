import { useEffect, useState, type ReactNode } from "react";

interface ModalProps {
  show: boolean;
  onClose: () => void;
  children: ReactNode;
}

export default function Modal({ show, onClose, children }: ModalProps) {
  const [visible, setVisible] = useState(false);
  const [animating, setAnimating] = useState(false);

  useEffect(() => {
    if (show) {
      // Mount dulu, lalu trigger animasi masuk di frame berikutnya
      setVisible(true);
      requestAnimationFrame(() => {
        requestAnimationFrame(() => setAnimating(true));
      });
    } else {
      // Trigger animasi keluar, lalu unmount setelah selesai
      setAnimating(false);
      const timer = setTimeout(() => setVisible(false), 300);
      return () => clearTimeout(timer);
    }
  }, [show]);

  if (!visible) return null;

  return (
    <div
      className={`fixed inset-0 z-50 flex items-start justify-center pt-16 transition-all duration-300 ${
        animating ? "bg-black/50" : "bg-black/0"
      }`}
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`bg-white rounded-2xl shadow-xl w-full max-w-md transition-all duration-300 ease-out ${
          animating ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-8"
        }`}
      >
        {/* Header */}
        <div className="flex justify-between items-center border-b p-4">
          <h5 className="text-lg font-semibold">Notifikasi</h5>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition-colors"
          >
            ✕
          </button>
        </div>

        {/* Body */}
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
}
