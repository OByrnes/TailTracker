import React, { createContext, useContext, useState } from 'react';

export const ModalContext = createContext();
export const useModal = () => useContext(ModalContext);

export default function ModalOpenProvider({ children }) {
  const [openActivityModal, setOpenActivityModal] = useState(false);
  const [openAddDogModal, setOpenAddDogModal] = useState(false)
 

  return (
    <ModalContext.Provider
      value={{
        openActivityModal,
        openAddDogModal,
        setOpenActivityModal,
        setOpenAddDogModal
      }}
    >
      {children}
    </ModalContext.Provider>
  );
}
