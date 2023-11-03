import React, { ReactNode, createContext, useState } from 'react';

interface ModalContextType {
   openModal: (id: string) => void;
   closeModal: () => void;
   isModalOpen: boolean;
   setIsModalOpen: (newValue: boolean) => void;
}
const initialModalContext: ModalContextType = {
   openModal: (id: string) => {},
   closeModal: () => {},
   isModalOpen: false,
   setIsModalOpen: (newValue: boolean) => {},
};
export const ModalContext = createContext<ModalContextType>(initialModalContext);

interface ModalProviderProps {
   children: ReactNode;
}
const ModalProvider = ({ children }: ModalProviderProps) => {
   const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

   const openModal = (id: string) => {
      setIsModalOpen((prevState) => !prevState);
   };
   const closeModal = () => {
      setIsModalOpen(false);
   };
   const modalValue: ModalContextType = {
      isModalOpen,
      setIsModalOpen,
      openModal,
      closeModal,
   };
   return <ModalContext.Provider value={modalValue}>{children}</ModalContext.Provider>;
};

export { ModalProvider };
