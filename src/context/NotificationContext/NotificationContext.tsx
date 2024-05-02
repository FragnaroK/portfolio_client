import React, { createContext, ReactNode, useCallback, useMemo } from 'react';
import toast, { ToastType, Toaster } from 'react-hot-toast';

interface NotificationContextData {
  notify: (type: ToastType, msg: string, id?: string) => void;
  fakeLoadingNotify:(type: ToastType, initial: string, msg: string, timeout?: number) => void;
}

// Create a context with an initial value
export const NotificationContext = createContext<NotificationContextData | undefined>(undefined);

// Create a custom hook to easily access the context

// Define props for your context provider
interface NotificationContextProviderProps {
  children: ReactNode; // ReactNode allows any valid React children
}

// Define your context provider component
export const NotificationContextProvider: React.FC<NotificationContextProviderProps> = ({ children }) => {

  
 
  const notify = useCallback((type: ToastType, msg: string, id?: string) => {
    switch (type) {
      case "success":
        toast.success(msg, { id })
        break;
      case "error":
        toast.error(msg, { id });
        break;
      default:
        toast(msg, { id })
        break;
    }
  }, [])

  const fakeLoadingNotify = useCallback((type: ToastType, initial: string, msg: string, timeout: number = 1500) => {
    const promise = toast.loading(initial);

    setTimeout(() => {
      notify(type, msg, promise);
    }, timeout)
  }, [notify])

  const contextValue: NotificationContextData = useMemo(() => ({
    notify,
    fakeLoadingNotify
  }), [notify, fakeLoadingNotify]);

  return <NotificationContext.Provider value={contextValue}>
    {children}
    <Toaster 
      position='top-center'
    toastOptions={{
      iconTheme: {
        primary: "var(--primary)",
          secondary: "var(--secondary-foreground)"
      },
      
      style: {
        border: "2px solid var(--primary)",
        background: "var(--card)",
        color: "var(--card-foreground)",
        fontFamily: "var(--font)",
        fontWeight: "bold"
      }
    }}
    />
  </NotificationContext.Provider>;
};
