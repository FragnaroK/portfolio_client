import Logger from 'node-logger-web';
import React, { createContext, ReactNode, useCallback, useMemo, useRef } from 'react';
import toast, { ToastType, Toaster } from 'react-hot-toast';

interface NotificationContextData {
  notify: (type: ToastType, msg: string, id?: string) => void | string;
  fakeLoadingNotify: (type: ToastType, initial: string, msg: string, timeout?: number, cb?: () => void) => void;
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

  const log = new Logger('Notification::context', import.meta.env.DEV);
  const toastQueue = useRef<Map<string, string>>(new Map<string, string>());

  const notify = useCallback((type: ToastType, msg: string, id?: string) => {
    try {
      const options = id ? { id: toastQueue.current.get(id) } : {}
      switch (type) {
        case "success":
          toast.success(msg, options);
          break;
        case "error":
          toast.error(msg, options);
          break;
        case "loading":
          if (!id) throw new Error('Missing required param "id" for loading mode');
          toastQueue.current.set(id, toast.loading(msg));
          break;
        default:
          toast(msg, options)
          break;
      }
      if (type !== 'loading' && id && toastQueue.current.has(id ?? '')) toastQueue.current.delete(id)
    } catch (err) {
      log.e('Could not trigger toast', err);
    }

  }, [])

  const fakeLoadingNotify = useCallback((type: ToastType, initial: string, msg: string, timeout: number = 1500, cb = () => { }) => {
    const promise = new Promise<void>((res) => {
      setTimeout(() => {
        res(cb());
      }, timeout)
    })

    toast.promise(promise, {
      loading: initial,
      success: () => {
        cb();
        return type === 'success' ? msg : 'Done!'
      },
      error: () => {
        cb();
        return type === 'error' ? msg : 'Oh no! Something went wrong!'
      }
    })
  }, [])

  const contextValue: NotificationContextData = useMemo(() => ({
    notify,
    fakeLoadingNotify,
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
          border: "1px solid var(--primary)",
          background: "var(--card)",
          color: "var(--card-foreground)",
          fontFamily: "var(--font)",
          fontWeight: "bold"
        }
      }}
    />
  </NotificationContext.Provider>;
};
