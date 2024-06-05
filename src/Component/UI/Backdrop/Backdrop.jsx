import {motion} from "framer-motion";
import {UilTimes} from "@iconscout/react-unicons";

const Backdrop = ({children, closeHandler}) => {
    return (
        <motion.div
            className={"fixed top-0 inset-0 w-full min-h-screen overflow-hidden flex items-center justify-center z-50"}
            style={{background: "var(--bg-opaque)", backdropFilter: "blur(12px)"}}
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            exit={{opacity: 0}}
            onClick={closeHandler}
        >
            <p className={"absolute top-2 right-3 cursor-pointer"} onClick={closeHandler}>
                <UilTimes/>
            </p>
            {children}
        </motion.div>
    )
}
export default Backdrop;