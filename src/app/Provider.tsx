import { FirebaseContextProvider } from "@Context/Firebase"
import { NotificationContextProvider } from "@Context/Notification"
import { PopUpContextProvider } from "@Context/PopUp"
import { UtilsContextProvider } from "@Context/Utils"
import { LazyMotion, domAnimation } from "framer-motion"
import { FC, ReactNode } from "react"

const Provider: FC<{ children: ReactNode }> = ({ children }) => {
    return (
        <PopUpContextProvider>
            <NotificationContextProvider>
                <FirebaseContextProvider>
                    <UtilsContextProvider>
                        <LazyMotion features={domAnimation}>
                            {children}
                        </ LazyMotion >
                    </ UtilsContextProvider >
                </ FirebaseContextProvider>
            </ NotificationContextProvider>
        </ PopUpContextProvider>
    )
}

export default Provider;