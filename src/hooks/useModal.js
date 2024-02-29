import React, { useCallback, useContext, useMemo, useState } from "react";
import ConfirmModal from "../modals/ConfirmModal";
import UpsertTransactionModal from "../modals/UpsertTransactionModal";
import { MODALS } from "../constants";

const ModalContext = React.createContext();
ModalContext.displayName = "ModalContext";

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
    <ModalContext.Provider
      value={useMemo(
        () => ({ currentModal, showModal, modalProps }),
        [currentModal, showModal, modalProps]
      )}
    >
      {children}
      <Modals />
    </ModalContext.Provider>
  );
}

export function useModals() {
  return useContext(ModalContext);
}
