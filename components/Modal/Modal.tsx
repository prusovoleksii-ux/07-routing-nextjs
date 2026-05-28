import { createPortal } from 'react-dom';
import css from './Modal.module.css'
import { useEffect } from 'react';
import { useRouter } from 'next/router';

interface ModalProps {
  children: React.ReactNode;
  onClose: () => void;
}

export default function Modal({children, onClose}: ModalProps) {

  const router = useRouter();
  const close = () => router.back();

  const handleBackdropClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return createPortal(
    <div
    className={css.backdrop}
    role="dialog"
    aria-modal="true"
    onClick={handleBackdropClick}
    >
        <div className={css.modal}>
           {children} 
           <button onClick={close}>Close</button>
        </div>
    </div>,
    document.body
  );
}