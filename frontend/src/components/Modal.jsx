import { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';

export default function Modal({ isOpen, onClose, children }) {
  const [closing, setClosing] = useState(false);

  const handleClose = () => {
    if (closing) return;
    setClosing(true);
    setTimeout(() => {
      setClosing(false);
      onClose();
    }, 200);
  };

  useEffect(() => {
    if (!isOpen) {
      document.body.style.overflow = '';
      return undefined;
    }

    const onKey = (e) => { if (e.key === 'Escape') handleClose(); };
    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      document.removeEventListener('keydown', onKey);
    };
  }, [isOpen, onClose]);

  if (!isOpen && !closing) return null;

  return ReactDOM.createPortal(
    <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center sm:px-6">

      {/* Frosted glass backdrop */}
      <div
        className="absolute inset-0 backdrop-blur-[8px]"
        style={{ background: 'rgba(13, 27, 42, 0.55)' }}
        onClick={handleClose}
      />

      {/* Card */}
      <div
        className={`relative z-10 flex w-full flex-col overflow-hidden bg-white
          rounded-t-[24px] h-[92vh]
          sm:max-w-[440px] sm:rounded-[24px] sm:h-auto
          ${closing ? 'aqua-modal-exit' : 'aqua-modal-enter'}`}
        style={{ boxShadow: '0 24px 60px rgba(30, 136, 229, 0.12)' }}
      >
        {/* Gradient top accent bar */}
        <div
          className="pointer-events-none absolute left-0 right-0 top-0 z-10 h-[3px]"
          style={{ background: 'linear-gradient(90deg, #1E88E5, #42A5F5)' }}
        />

        {/* Mobile drag handle */}
        <div className="flex shrink-0 justify-center pb-1 pt-3 sm:hidden">
          <div className="h-1 w-10 rounded-full bg-slate-300" />
        </div>

        {/* Close button */}
        <button
          type="button"
          onClick={handleClose}
          className="absolute right-4 top-4 z-20 flex h-9 w-9 items-center justify-center rounded-full text-slate-400 transition-all duration-200 hover:bg-slate-100 hover:text-slate-600"
          aria-label="Close"
        >
          <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M6 18 18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Scrollable content with 40px padding */}
        <div className="flex-1 overflow-y-auto px-10 pb-10 pt-8 sm:pt-10">
          {children}
        </div>
      </div>
    </div>,
    document.body,
  );
}
