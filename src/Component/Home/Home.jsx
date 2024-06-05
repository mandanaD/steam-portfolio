import WaterDropGrid from "../UI/WaterDropGrid/WaterDropGrid.jsx";
import "./Home.css"
import {useEffect, useState} from "react";
import {
    UilLinkedin,
    UilGithub,
    UilInstagram,
    UilTelegram,
    UilArrowRight,
    UilSmile,
    UilBracketsCurly
} from "@iconscout/react-unicons";
import {ExpList, ProjectsList} from "../../ItemList/ItemList.js";
import {Reveal} from "../UI/Animation/Reveal.jsx";
import Modal from "../UI/Modal/Modal.jsx";
import {AnimatePresence} from "framer-motion";

const Home = () => {

    // scroll
    const scrollToSection = (id) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({behavior: 'smooth'});
        }
    };
    //scrollSpy
    const [activeSection, setActiveSection] = useState(null)
    useEffect(() => {
        const handleScroll = () => {
            const sectionOffsets = Array.from(document.querySelectorAll('section')).map(section => ({
                id: section.id,
                offsetTop: section.offsetTop,
                offsetHeight: section.offsetHeight
            }));
            const scrollPosition = window.scrollY + window.innerHeight / 2;
            const active = sectionOffsets.find(section => scrollPosition >= section.offsetTop && scrollPosition <= (section.offsetTop + section.offsetHeight));

            if (active && activeSection !== active.id) {
                setActiveSection(active.id);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [activeSection]);

    const activeSectionStyle = (section) => {
        return section === activeSection ? "active-section" : "";
    };

    //Experience

    const expMap = ExpList.map((item, index) => {
        return (
            <div className={"experience-item mt-8"} key={index}>
                <div className={"flex justify-between text-xl mb-3 exp-txt items-center"}>
                    <h2 className={"font-bold"}>
                        <Reveal>{item.title}</Reveal>
                    </h2>
                    <p>
                        <Reveal>{item.date}</Reveal>
                    </p>
                </div>
                <div className={"flex justify-between text-xl mb-3 exp-txt items-center"}>
                    <h2 className={"green-text font-bold"}>
                        <Reveal>{item.role}</Reveal>
                    </h2>
                    <p>
                        <Reveal>{item.location}</Reveal>
                    </p>
                </div>
                <div className={"mb-3"}>
                    <Reveal>
                        {item.description}
                    </Reveal>
                </div>
                <Reveal>
                    <div className={"technology flex flex-wrap gap-3 mb-12"}>
                        {item.tec.map((item, index) => {
                            return (
                                <p key={index}>{item}</p>
                            )
                        })}
                    </div>
                </Reveal>
            </div>
        )
    })

    //projects
    const projectMap = ProjectsList.map((item, index) => {
        return (
            <div key={index} className={"mt-8"}>
                <Reveal>
                    <div className="project-img overflow-hidden grid place-items-center rounded-lg mb-8 group cursor-pointer" onClick={()=>openWindowHandler(item)} >
                        <img className={"w-9/12 mt-10 rounded transition group-hover:scale-105 group-hover:rotate-1"} src={item.img} alt=""/>
                    </div>
                </Reveal>
                <div className="project-desc">
                    <div className={"project-title my-3 relative"}>
                        <h2 className={"text-xl font-bold absolute -top-4"}>
                            {item.title}
                        </h2>
                        <p className={"absolute -top-4 right-0"}>
                            <UilGithub/>
                        </p>
                        <hr/>
                    </div>
                </div>
                <Reveal>
                    <div className="project-tech flex flex-wrap gap-1 my-4 green-text">
                        {item.tec.map((tec, index) => {
                                return (
                                    <p key={index}>
                                        {tec}
                                        {index < item.tec.length - 1 && ' - '}
                                    </p>
                                )
                            }
                        )}
                    </div>
                </Reveal>
                <Reveal>
                    <div className={"flex flex-wrap gap-x-3"}>
                        <p>
                            {item.description.length > 110 ? `${item.description.substring(0, 110)}...` : item.description}
                        </p>
                        <p onClick={()=>openWindowHandler(item)} className={"green-text flex items-center cursor-pointer"}>
                        <span>
                            Learn more
                        </span>
                            <UilArrowRight/>
                        </p>

                    </div>
                </Reveal>
            </div>
        )
    })

    //project detail
    const [isWindowOpen,setIsWindowOpen]=useState(false)
    const [selected,setSelected]=useState()
    const closeWindowHandler=()=>{
        setIsWindowOpen(false)
        setSelected(null)
    }
    const openWindowHandler=(item)=>{
        setIsWindowOpen(true)
        setSelected(item)
    }

    return (
        <>
            <div className="home-container overflow-x-hidden">
                <div className="header fixed top-0 flex right-0 w-screen justify-between items-center pr-11 z-10">
                    <div className="social-media flex gap-2">
                        <UilLinkedin/><UilGithub/><UilInstagram/><UilTelegram/>
                    </div>
                    <button className={"green-text w-36 h-10 rounded"}>
                        My Resume
                    </button>
                </div>
                <div className="side-menu fixed h-screen z-50 left-0 w-16 text-lg">
                    <ul className={"flex rotate-90"}>
                        <li className="font-bold">
                            <p className={"-rotate-90 text-xl rounded"}>
                                B<span className="green-text">.</span>
                            </p>
                        </li>
                        <li onClick={() => scrollToSection("About")} className={activeSectionStyle("About")}>About</li>
                        <li onClick={() => scrollToSection("Project")} className={activeSectionStyle("Project")}>Project
                        </li>
                        <li onClick={() => scrollToSection("Exp.")} className={activeSectionStyle("Exp.")}>Exp.</li>
                        <li onClick={() => scrollToSection("Contact")} className={activeSectionStyle("Contact")}>Contact
                        </li>
                    </ul>
                </div>
                <div className={"home pl-12 w-8/12"}>
                    <section className="landing flex relative items-center min-h-screen justify-end" id={"Landing"}>
                        <div className={"water-drop"}>
                            <WaterDropGrid/>
                        </div>
                        <div className={"absolute left-0 landing-txt"}>
                            <h1 className={"text-8xl font-bold"}>
                                <Reveal>
                                    Hey, Im Bob<span className={"green-text"}>.</span>
                                </Reveal>
                            </h1>
                            <h2 className={"text-4xl my-5"}>
                                <Reveal>
                                    Im a <span className={"green-text font-bold"}>Full Stack Developer</span>
                                </Reveal>
                            </h2>
                            <p>
                                <Reveal>
                                    Ive spent the last 5 years building and scaling software for some pretty cool
                                    companies.
                                    I
                                    also
                                    teach people to paint online (in case you have got an empty canvas laying around
                                    🎨).
                                    Lets
                                    connect!
                                </Reveal>
                            </p>
                            <Reveal>
                                <button className={"green-bg w-36 h-9 mt-4 rounded "}
                                        onClick={() => scrollToSection("Contact")}>
                                    Contact me
                                </button>
                            </Reveal>
                        </div>
                    </section>
                    <section className={"about-container  min-h-screen py-10 flex justify-center flex-col"}
                             id={"About"}>
                        <div className="about-title relative h-4 ">
                            <hr/>
                            <h1 className={"text-6xl font-bold absolute -top-8"}>
                                <Reveal>
                                    About
                                    <span className={"green-text"}>.</span>
                                </Reveal>
                            </h1>
                        </div>
                        <div className="about grid gap-6 mt-8">
                            <div className="about-txt">
                                <p>
                                    <Reveal>
                                        Hey! Im Bob, if you have not already gathered that by now. Im a painter turned
                                        software
                                        engineer from Daytona, Florida. I specialize in the backend, primarily Node and
                                        Rust,
                                        but
                                        love building with whatever tools are right for the job.
                                    </Reveal>
                                </p>
                                <br/>
                                <p>
                                    <Reveal>
                                        I currently work for Google on Google Photos. I also toss in my ¢2 with the
                                        design
                                        systems
                                        teams from time to time (once an artist, always an artist, amirite?).
                                    </Reveal>
                                </p>
                                <br/>
                                <p>
                                    <Reveal>
                                        Outside of work, I still love to paint. Any given Sunday you wll find me
                                        scribbling
                                        some
                                        happy clouds with my son ☁️ I even teach courses online if you are looking to
                                        learn!
                                    </Reveal>
                                </p>
                                <br/>
                                <p>
                                    <Reveal>
                                        Im passively looking for new positions where I can merge my love for code with
                                        my
                                        love
                                        for
                                        the canvas. If you think you have got an opening that I might like, lets connect
                                        🔗
                                    </Reveal>
                                </p>
                                <br/>
                                <Reveal>
                                    <p className={"flex gap-3"}>
                                        <span
                                            className={"green-text flex items-center"}>My links <UilArrowRight/></span>
                                        <div className="social-media flex gap-2">
                                            <UilLinkedin/><UilGithub/><UilInstagram/><UilTelegram/>
                                        </div>
                                    </p>
                                </Reveal>
                            </div>
                            <div className="technologies text-sm">
                                <div>
                                    <h2 className={"text-xl font-bold mb-3 flex items-center gap-1"}>
                                        <UilBracketsCurly color={"var(--clr-green)"}/>
                                        <span>Use at work</span>
                                    </h2>
                                    <div className={"flex flex-wrap gap-3 mb-12"}>
                                        <p>JavaScript</p>
                                        <p>TypeScript</p>
                                        <p>HTML</p>
                                        <p>CSS</p>
                                        <p>React</p>
                                        <p>Redux</p>
                                        <p>NodeJS</p>
                                        <p>Express</p>
                                        <p>Postgres</p>
                                        <p>MongoDB</p>
                                        <p>GitHub</p>
                                        <p>Jira</p>
                                        <p>Heroku</p>
                                        <p>AWS</p>
                                    </div>
                                </div>
                                <div>
                                    <h2 className={"text-xl font-bold mb-3 flex items-center gap-1"}>
                                        <UilSmile color={"var(--clr-green)"}/>
                                        <span>Use for fun</span>
                                    </h2>
                                    <div className={"flex flex-wrap gap-3 mb-12"}>
                                        <p>Rust</p>
                                        <p>Tailwind</p>
                                        <p>Java</p>
                                        <p>Spring</p>
                                        <p>Figma</p>
                                        <p>Whimsical</p>
                                        <p>Planetscale</p>
                                        <p>GraphQL</p>
                                        <p>Python</p>
                                        <p>FastAPI</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                    <section className="projects-container min-h-screen py-10" id="Project">
                        <div className="projects-title relative h-4 ">
                            <hr/>
                            <h1 className={"text-6xl font-bold absolute -top-8 right-0"}>
                                <Reveal>
                                    Projects
                                    <span className={"green-text"}>.</span>
                                </Reveal>
                            </h1>
                        </div>
                        <div className={"grid grid-cols-2 gap-8 project-item"}>
                            {projectMap}
                        </div>
                    </section>
                    <section className="experience-container  min-h-screen py-10" id="Exp.">
                        <div className="experience-title relative h-4 ">
                            <hr/>
                            <h1 className={"text-6xl font-bold absolute -top-8"}>
                                <Reveal>
                                    Experience
                                    <span className={"green-text"}>.</span>
                                </Reveal>
                            </h1>
                        </div>
                        {expMap}
                    </section>
                    <section
                        className="contact-container min-h-screen py-10 flex flex-col justify-center gap-6 items-center"
                        id="Contact">
                        <h1 className={"text-8xl font-bold"}>
                            <Reveal>
                                Contact<span className={"green-text"}>.</span>
                            </Reveal>
                        </h1>
                        <div className={"text-center w-full contact-txt"}>
                            <Reveal>
                                Shoot me an email if you want to connect! You can also find me
                                on <span className={"green-text"}>Linkedin</span> or <span
                                className={"green-text"}>Twitter</span> if
                                that is more your speed.
                            </Reveal>
                        </div>
                        <p>
                            <Reveal>
                                bob.ross@notreal.com
                            </Reveal>
                        </p>
                    </section>
                </div>
            </div>
            <AnimatePresence initial={false}>
                {isWindowOpen && (
                    <Modal closeHandler={closeWindowHandler} selectedItem={selected}/>
                )}
            </AnimatePresence>
        </>
    )
}
export default Home;