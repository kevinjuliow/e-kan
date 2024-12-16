"use client";

import React, { createContext, useContext } from "react";
import { CheckoutItem } from "./interfaces/Item/types";

interface ItemContextProps {
  addItemToCheckout: (checkoutItem: CheckoutItem[]) => void;
  clearCheckout: () => void;
}

interface Props {
  children?: React.ReactNode;
}

const ItemContext = createContext<ItemContextProps | undefined>(undefined);

export const ItemProvider: React.FC<Props> = ({ children }) => {

  const addItemToCheckout = (checkoutItem: CheckoutItem[]) => {
    console.log({checkoutItem})
    
    sessionStorage.setItem("checkoutItems", JSON.stringify(checkoutItem))
  }

  const clearCheckout = () => {
    sessionStorage.removeItem("checkoutItems")
  }

  return (
    <ItemContext.Provider value={{ addItemToCheckout, clearCheckout }}>
      {children}
    </ItemContext.Provider>
  )
}

export const useItemContext = () => {
  const context = useContext(ItemContext)
  if (!context) {
    throw new Error("useItemContext must be used within an ItemProvider")
  }
  return context
}
