"use client";

import useUploadModal from "@/hooks/useUploadModal";
import Modal from "./Modal";
import { FieldValues, useForm } from "react-hook-form";

const UploadModal = () => {
  const uploadModal = useUploadModal();

  const {} = useForm<FieldValues>();

  const onChange = (open: boolean) => {
    if (!open) {
      uploadModal.onClose();
    }
  };
  return (
    <Modal
      title="Create new playlist"
      description="Have your own custom playlist"
      onChange={onChange}
      isOpen={uploadModal.isOpen}
    >
      Upload Modal
    </Modal>
  );
};

export default UploadModal;
