import '../styles/modal.scss';

const YouTubeModal = ({ closeModal, children }) => {
  return (
    <div className="modal__background" onClick={closeModal}>
      <div className="modal__wrapper" onClick={(e) => e.stopPropagation()}>
        {children}
        <button className="modal__close" onClick={closeModal}>
          &times;
        </button>
      </div>
    </div>
  );
};

export default YouTubeModal;

  