import React, { useEffect, useRef } from 'react';
import './Popup.css';

interface PopupProps {
  isOpen: boolean;
  onClose: () => void;
}

const Popup: React.FC<PopupProps> = ({ isOpen, onClose }) => {
  const popupRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (popupRef.current && !popupRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="popup-overlay">
      <div className="popup-content" ref={popupRef}>
        <h2>Popup Content</h2>
        <p>This is a popup that closes when clicking outside.</p>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default Popup;