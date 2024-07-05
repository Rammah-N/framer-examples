import reactLogo from "./assets/react.svg";
import "./App.css";
import { motion, useAnimationControls, VariantLabels } from "framer-motion";
import { useEffect } from "react";

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
			width: "1px",
			backgroundColor: "transparent",
		},
		hover: {
			opacity: [0, 1, 0],
			width: "1px",
			backgroundColor: "yellow",
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
			className="overflow-hidden flex select-none min-w-[225px] w-full h-full p-5 items-center justify-center text-2xl"
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
				className="w-[1px] h-full"
				variants={bar}
				animate={controls}></motion.span>
		</motion.div>
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
		<main>
			<a
				href="https://react.dev"
				target="_blank"
				className="flex justify-center self-start">
				<img src={reactLogo} className="logo react" alt="React logo" />
			</a>
			<h1>Framer Examples</h1>
			<motion.ul
				initial="hidden"
				animate="visible"
				layout
				variants={list}
				className="flex flex-wrap gap-10 items-center justify-center my-10">
				<motion.a
					variants={item}
					href="/text-animations"
					className="min-w-[225px] h-20 relative">
					<motion.li
						initial={{
							position: "absolute",
							top: 0,
							left: 0,
							right: 0,
							bottom: 0,
						}}
						whileHover={{
							scale: 5,
							zIndex: 1,
							transition: { duration: 0.2 },
						}}
						className="w-full h-full rounded-md text-white bg-[#414141] bg-opacity-80 flex items-center justify-center">
						<TypeWriter text="Text Animations" />
					</motion.li>
				</motion.a>
			</motion.ul>
		</main>
	);
}

export default App;
