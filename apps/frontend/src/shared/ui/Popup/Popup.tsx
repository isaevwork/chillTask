import React from 'react';
import ReactDOM from 'react-dom';
import cls from './Popup.module.scss';

interface PopupProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export const Popup = ({ isOpen, onClose, children }: PopupProps) => {
  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div className={cls.popupOverlay} onClick={onClose}>
      <div onClick={(e) => e.stopPropagation()}>{children}</div>
    </div>,
    document.body,
  );
};
