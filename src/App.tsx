import reactLogo from "./assets/react.svg";
import "./App.css";
import {
	motion,
	useAnimationControls,
	useScroll,
	useSpring,
	VariantLabels,
} from "framer-motion";
import { useEffect, useRef } from "react";

const TypeWriter = ({ text }: { text: string }) => {
	const controls = useAnimationControls();
	const container = {
		rest: { opacity: 1 },
		hover: (i = 1) => ({
			opacity: 1,
			transition: { staggerChildren: 0.1 },
		}),
	};

	const child = {
		rest: {
			display: "inline",
		},

		hover: {
			display: ["none", "inline"],
		},
	};

	const bar = {
		rest: {
			opacity: 0,
			width: "2px",
			backgroundColor: "rgba(0,0,0,0)",
		},
		hover: {
			opacity: [0, 1, 0],
			width: "2px",
			backgroundColor: "rgb(252, 125, 5)",
			transition: {
				repeat: Infinity,
				duration: 0.8,
			},
		},
	};

	useEffect(() => {
		controls.start("hover");
	}, []);

	return (
		<motion.div
			variants={container}
			className="overflow-hidden flex select-none h-full p-5 items-center justify-center text-2xl"
			initial="rest"
			whileHover="hover"
			onHoverStart={() => controls.start("hover")}
			onHoverEnd={() => controls.start("rest")}>
			{text.split("").map((char, index) => (
				<motion.span
					key={`char-${index}`}
					variants={child}
					style={{ display: "inline-block", whiteSpace: "pre" }}>
					{char}
				</motion.span>
			))}
			<motion.span
				className="w-[2px] h-full"
				variants={bar}
				animate={controls}></motion.span>
		</motion.div>
	);
};

const Entrance = () => {
	const container = {
		rest: { opacity: 1 },
		hover: (i = 1) => ({
			opacity: 1,
			transition: { staggerChildren: 0.1, delay: 0.5 },
		}),
	};

	const child1 = {
		rest: {
			y: 0,
			opacity: 1,
		},
		hover: {
			y: [0, 50],
			opacity: 0,
			transition: {
				duration: 0.2,
			},
		},
	};
	const child2 = {
		rest: {
			opacity: 0,
			y: -50,
		},
		hover: {
			opacity: 1,
			y: [-50, 0],
			transition: {
				duration: 0.2,
			},
		},
	};

	return (
		<div className="w-full h-full">
			<motion.a
				href="/entrance-animations"
				className="min-w-fit w-full h-full text-2xl p-5 flex items-center justify-center"
				initial="rest"
				whileHover="hover"
				variants={container}>
				<motion.span className="absolute" variants={child2}>
					OHHHH YEAAAAH!!!
				</motion.span>
				<motion.span variants={child1} className="whitespace-nowrap">
					Entrance Animations
				</motion.span>
			</motion.a>
		</div>
	);
};

const ScrollAnimations = () => {
	const containerRef = useRef(null);
	const { scrollYProgress } = useScroll({
		container: containerRef,
	});
	const scaleX = useSpring(scrollYProgress);

	return (
		<>
			<motion.div
				className="absolute top-0 left-0 border-[1px] border-yellow-500 w-full"
				style={{ scaleX, transformOrigin: 0 }}></motion.div>
			<motion.div
				ref={containerRef}
				className="max-h-[70px] relative overflow-y-scroll overflow-x-hidden flex-col w-full items-center justify-center p-5">
				{[
					"Scroll Animations",
					"Keep Going",
					"Cool stuff",
					"Almost there",
					"Last one",
				].map((text, index) => (
					<motion.a
						key={index}
						href="/scroll-animations"
						className="max-w-fit top-0 whitespace-nowrap h-[100px] text-2xl block text-center mx-auto">
						{text}
					</motion.a>
				))}
				<motion.a
					href="/scroll-animations"
					className="max-w-fit top-0 whitespace-nowrap h-fit text-2xl block text-center mx-auto">
					DING DING DING!!!
				</motion.a>
			</motion.div>
		</>
	);
};

function App() {
	const list = {
		hidden: { opacity: 0 },
		visible: {
			opacity: 1,
			transition: {
				when: "beforeChildren",
				staggerChildren: 0.1,
			},
		},
	};
	const item = {
		hidden: { opacity: 0, y: 20 },
		visible: {
			opacity: 1,
			y: 0,
		},
	};

	return (
		<main className="flex flex-col w-full place-items-center">
			<a
				href="https://react.dev"
				target="_blank"
				className="flex justify-center self-start mx-auto">
				<img src={reactLogo} className="logo react" alt="React logo" />
			</a>
			<h1 className="text-center">Framer Examples</h1>
			<motion.ul
				initial="hidden"
				animate="visible"
				layout
				variants={list}
				className="w-full my-10 gap-10 p-5 place-content-center"
				style={{
					display: "grid",
					gridTemplateColumns: "repeat(auto-fit, minmax(300px, 350px))",
				}}>
				<motion.li
					variants={item}
					className="w-full h-20 relative rounded-md text-white bg-[#414141] bg-opacity-80 flex items-center justify-center">
					<motion.a href="/text-animations" className="w-full h-full">
						<TypeWriter text="Text Animations" />
					</motion.a>
				</motion.li>
				<motion.li
					variants={item}
					className="w-full h-20 relative rounded-md text-white bg-[#414141] bg-opacity-80 flex items-center justify-center">
					<Entrance />
				</motion.li>
				<motion.li
					variants={item}
					className="w-full h-20 relative rounded-md text-white bg-[#414141] bg-opacity-80 flex items-center justify-center">
					<ScrollAnimations />
				</motion.li>
			</motion.ul>
		</main>
	);
}

export default App;
