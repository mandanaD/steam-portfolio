import {motion, useInView, useAnimation} from "framer-motion";
import {useEffect, useRef} from "react";

export const Reveal = ({children, width = "fit-content"}) => {
    let elementRef = useRef()
    let isInView = useInView(elementRef, {once: true})
    let variants = {
        hidden: {opacity: 0, y: 75},
        visible: {opacity: 1, y: 0}
    }
    let mainControl = useAnimation()
    let slidControl=useAnimation()
    useEffect(() => {
        if (isInView) {
            mainControl.start("visible")
            slidControl.start("visible")
        }
    }, [isInView]);

    return (
        <div ref={elementRef} style={{width: width}} className={"overflow-hidden relative"}>
            <motion.div
                variants={variants}
                initial={"hidden"}
                animate={mainControl}
                transition={{delay: .25, duration: .5}}
            >
                {children}
            </motion.div>
            <motion.div
                className={"absolute left-0 right-0 z-20 h-full w-full"}
                style={{background:"var(--clr-green",top:4,bottom:4}}
                variants={{
                    hidden:{
                        left:0
                    },
                    visible:{
                        left:"100%"
                    }
                }}
                initial={"hidden"}
                animate={slidControl}
                transition={{duration: .5,ease:"easeIn"}}
            />
        </div>
)
}