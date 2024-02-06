import React, { useCallback, useContext, useState } from "react";
import ConfirmModal from "../modals/ConfirmModal";
import UpsertTransactionModal from "../modals/UpsertTransactionModal";

const ModalContext = React.createContext();
ModalContext.displayName = "ModalContext";

export const MODALS = {
  NONE: "NONE",
  CONFIRM: "CONFIRM",
  TRANSACTION: "TRANSACTION",
};

export function Modals() {
  return (
    <ModalContext.Consumer>
      {(context) => {
        const onClose = () => context.showModal(MODALS.NONE);
        switch (context.currentModal) {
          case MODALS.CONFIRM:
            return <ConfirmModal onClose={onClose} {...context.modalProps} />;
          case MODALS.TRANSACTION:
            return (
              <UpsertTransactionModal
                onClose={onClose}
                {...context.modalProps}
              />
            );
          case MODALS.NONE:
          default:
            return null;
        }
      }}
    </ModalContext.Consumer>
  );
}

export function ModalContextProvider({ children }) {
  const [currentModal, setCurrentModal] = useState(false);
  const [modalProps, setModalProps] = useState({});
  const showModal = useCallback(
    (newModal, newModalProps = {}) => {
      setModalProps(newModalProps);
      setCurrentModal(newModal);
    },
    [setCurrentModal, setModalProps]
  );
  return (
    <ModalContext.Provider value={{ currentModal, showModal, modalProps }}>
      {children}
      <Modals />
    </ModalContext.Provider>
  );
}

export function useModals() {
  return useContext(ModalContext);
}
