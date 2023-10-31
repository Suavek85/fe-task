import '../styles/modal.scss'

const YouTubeModal = ({ isModalOpen, closeModal, children }) => {
    return isModalOpen ? (
      <div className="modal-background" onClick={closeModal}>
        <div className="modal-wrapper" onClick={(e) => e.stopPropagation()}>
          {children}
          <button className="modal-close" onClick={closeModal}>
            &times;
          </button>
        </div>
      </div>
    ) : null;
  };

export default YouTubeModal
  