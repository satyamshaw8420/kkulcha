import React, { createContext, useContext, useState, type ReactNode } from "react";

interface ReservationContextType {
  isOpen: boolean;
  openReservation: () => void;
  closeReservation: () => void;
}

const ReservationContext = createContext<ReservationContextType | undefined>(undefined);

export function ReservationProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  const openReservation = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  return (
    <ReservationContext.Provider value={{ isOpen, openReservation, closeReservation: closeModal }}>
      {children}
    </ReservationContext.Provider>
  );
}

export function useReservation() {
  const context = useContext(ReservationContext);
  if (!context) {
    throw new Error("useReservation must be used within a ReservationProvider");
  }
  return context;
}
