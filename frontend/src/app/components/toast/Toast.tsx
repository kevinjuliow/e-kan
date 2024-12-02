import React, { useEffect, useState } from "react";
import { CheckSolidIcon } from "../icon";

interface ToastProps {
  message: string;
  duration?: number;
  onClose: () => void;
}

export const Toast: React.FC<ToastProps> = ({ message, duration = 2000, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, duration);
    return () => clearTimeout(timer);
  }, [duration, onClose]);

  return (
    <div className="fixed left-0 bottom-16 w-full md:w-auto md:left-auto md:bottom-5 md:right-5 flex flex-col text-darkaqua text-sm py-4 px-4 rounded-t-lg bg-white custom-toast-shadow z-50">
      <div className="flex items-center justify-center">
        <CheckSolidIcon size={24} hexColor={"#00b2b3"} />
        <p className="ms-2">{message}</p>
      </div>
      <div className="absolute bottom-0 left-0 mt-2 h-1 bg-blue-500 w-full" style={{ animation: `toast-progress ${duration}ms linear` }}></div>
    </div>
  );
};

export const useToast = () => {
  const [message, setMessage] = useState<string | null>(null);

  const showToast = (msg: string, duration = 2000) => {
    setMessage(msg);
    setTimeout(() => setMessage(null), duration);
  };

  return { message, showToast };
};
