import React from 'react';

export default function Modal({ isOpen = true, onClose = () => {}, children }) {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50" onClick={onClose}>
      <div className="mx-4 max-w-lg rounded-lg bg-white p-6 shadow-lg" onClick={(e) => e.stopPropagation()}>
        <div className="flex justify-end">
          <button onClick={onClose} className="text-sm text-slate-500 hover:text-slate-700">Close</button>
        </div>
        <div className="mt-4">{children}</div>
      </div>
    </div>
  );
}
