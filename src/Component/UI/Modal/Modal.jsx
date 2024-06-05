import Backdrop from "../Backdrop/Backdrop.jsx";
import {motion} from "framer-motion";
import "./Modal.css"
import {UilGithub} from "@iconscout/react-unicons";

const Modal = ({closeHandler,selectedItem}) => {
    const dropIn = {
        hidden: {
            y: "-100%",
            opacity: 0
        },
        visible: {
            y: "0",
            opacity: 1
        },
        exit: {
            y: "100%",
            opacity: 0
        }
    }
    return (
        <Backdrop closeHandler={closeHandler}>
            <motion.div
                onClick={e => e.stopPropagation()}
                variants={dropIn}
                initial={"hidden"}
                animate={"visible"}
                exit={"exit"}
            >
                <div className={"modal-body m-4"}>
                            <div
                                className="aspect-[2/1] overflow-hidden grid place-items-center mb-8 group cursor-pointer main-img">
                                <img src={selectedItem.img} alt=""/>
                            </div>
                        <div className="project-desc mx-4">
                            <div>
                                <h2 className={"text-2xl font-bold"}>
                                    {selectedItem.title}
                                </h2>
                            </div>
                        </div>
                            <div className="project-tech flex flex-wrap gap-1 my-4 green-text mx-4 text-sm">
                                {selectedItem.tec.map((tec, index) => {
                                        return (
                                            <p key={index}>
                                                {tec}
                                                {index < selectedItem.tec.length - 1 && ' - '}
                                            </p>
                                        )
                                    }
                                )}
                            </div>
                            <div className={"flex flex-wrap gap-x-3 mx-4 text-sm pb-4 modal-txt"}>
                                <p>
                                    {selectedItem.description}
                                </p>
                            </div>
                </div>
            </motion.div>
        </Backdrop>
    )
}
export default Modal;