import { useState } from "react";

const useYoutubeModal = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const closeModal = () => setModalOpen(false);
  const openModal = () => setModalOpen(true);

  return {
    isModalOpen,
    openModal,
    closeModal
  };
};

export default useYoutubeModal;
