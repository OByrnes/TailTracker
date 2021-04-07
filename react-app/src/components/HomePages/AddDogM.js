import React from "react"
import AddDogForm from "../FormComponents/AddDogForm"
import Modal from "react-modal"
import useModal from "../../context/modalContext"

const AddDogM = () => {
  const {openAddDogModal, setOpenAddDogModal} = useModal()

    return (
        <Modal
        isOpen={openAddDogModal}
        contentLabel="AddDog"
        className="modalInner"
        overlayClassName="ModalOverlay"
        onRequestClose={() => setOpenAddDogModal(false)}
      >
        <div className="closeIcoOuterShell">
          <button className="closeIcoShell" className="clickable" onClick={(e) => setOpenAddDogModal(false)}>
            X
          </button>
        </div>
        <AddDogForm/>
      </Modal>
    )
}
export default AddDogM