import React, { useEffect, useState } from "react";
import { CheckSolidIcon, XMarkSolidIcon } from "../icon";

interface ToastProps {
  message: string;
  toastType: string;
  duration?: number;
  onClose: () => void;
}

export const Toast: React.FC<ToastProps> = ({ message, toastType, duration = 2000, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, duration);
    return () => clearTimeout(timer);
  }, [duration, onClose]);

  return (
    <div className="fixed left-0 bottom-16 w-full md:w-auto md:left-auto md:bottom-5 md:right-5 flex flex-col text-darkaqua text-sm py-4 px-4 rounded-t-lg bg-white custom-toast-shadow z-50">
      <div className="flex items-center justify-center">
        {toastType === 'SUCCESS' ? <CheckSolidIcon size={24} hexColor={"#00b2b3"} /> : <XMarkSolidIcon size={24} hexColor={"#ef4444"} /> }
        <p className={`ms-2 ${toastType === 'WARNING' && 'text-red-500'}`}>{message}</p>
      </div>
      <div className="absolute bottom-0 left-0 mt-2 h-1 bg-blue-500 w-full" style={{ animation: `toast-progress ${duration}ms linear` }}></div>
    </div>
  );
};

export const useToast = () => {
  const [message, setMessage] = useState<string | null>(null);
  const [toastType, setToastType] = useState<string | null>(null);

  const showToast = (msg: string, toastType: string, duration = 2000) => {
    setMessage(msg);
    setToastType(toastType);
    setTimeout(() => setMessage(null), duration);
  };

  return { message, toastType, showToast };
};
