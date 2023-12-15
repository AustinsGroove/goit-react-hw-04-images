import { useEffect } from 'react';

const Modal = ({ image, closeModal }) => {
  const handleClick = e => {
    if (e.target.className === 'Overlay') {
      closeModal();
    }
  };

  useEffect(() => {
    const handleEsc = e => {
      if (e.code === 'Escape') closeModal();
    };
    document.addEventListener('keydown', handleEsc);
    return () => {
      document.removeEventListener('keydown', handleEsc);
    };
  }, [closeModal]);

  return (
    <div className="Overlay" onClick={handleClick}>
      <div className="Modal">
        <img src={image.largeImageURL} alt={image.tags} />
      </div>
    </div>
  );
};

export default Modal;
