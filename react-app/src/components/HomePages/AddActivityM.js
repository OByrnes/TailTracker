import React from "react"
import Modal from "react-modal"
import AddActivityForm from "../FormComponents/AddActivityForm"
import useModal from "../../context/modalContext"

const AddActivityM = () => {
  const {openActivityModal, setOpenActivityModal} = useModal()

    return (
        <Modal
        isOpen={openActivityModal}
        contentLabel="AddActivity"
        className="modalInner"
        overlayClassName="ModalOverlay"
        onRequestClose={() => setOpenActivityModal(false)}
      >
        <div className="closeIcoOuterShell">
          <button className="closeIcoShell" className="clickable" onClick={(e) => setOpenActivityModal(false)}>
            X
          </button>
        </div>
        <AddActivityForm/>
      </Modal>
    )
}
export default AddActivityM