const Modal = ({ isOpen, onClose, children }: any) => {
    if (!isOpen) return null;
  
    const handleOverlayClick = (e: any) => {
      if (e.target === e.currentTarget) {
        onClose();
      }
    };
  
    return (
      <div
        className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50"
        onClick={e => handleOverlayClick(e)}
      >
        <div className="bg-white rounded-lg shadow-lg w-11/12 max-w-lg p-6 relative max-h-[85dvh] overflow-y-auto">
          <button
            onClick={onClose}
            className="absolute top-3 right-3 text-gray-600 hover:text-gray-900 focus:outline-none"
          >
            &times;
          </button>
          {children}
        </div>
      </div>
    );
  };
  
  export default Modal;