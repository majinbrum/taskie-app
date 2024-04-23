import { useState, useEffect } from "react";

const Header = ({ tasksCount }) => {
	const [avatarSrc, setAvatarSrc] = useState("./src/assets/img/sorridentetaskie.png");
	const [headerTitle, setHeaderTitle] = useState("Hello, Hooman!");
	const [headerText, setHeaderText] = useState("What have you been up to?");

	useEffect(() => {
		// Adjust avatar and text based on tasksCount
		if (tasksCount === 0) {
			setAvatarSrc("./src/assets/img/supataskie.png");
			setHeaderTitle("OMG YOU ROCK!!");
			setHeaderText("No tasks on sight, keep it up!");
		} else if (tasksCount > 0 && tasksCount <= 3) {
			setAvatarSrc("./src/assets/img/sorridentetaskie.png");
			setHeaderTitle("You got this!");
			setHeaderText("C'mon hooman, just do it!");
		} else if (tasksCount > 3 && tasksCount <= 6) {
			setAvatarSrc("./src/assets/img/madtaskie.png");
			setHeaderTitle("What have you been up to??!!");
			setHeaderText("They're piling up, don't lose control!");
		} else {
			setAvatarSrc("./src/assets/img/dedtaskie.png");
			setHeaderTitle("Oh jeez...");
			setHeaderText(".. .. . . ... .. . . . .. . . ... .. .. . . ... .. . . . .. . ... .. . . ... .. . . . .. . . ... .. .. . . ... .. . . . .. .");
		}
	}, [tasksCount]);

	const changeColorMode = () => {
		const html = document.querySelector("html");
		const colorMode_btnicon = document.querySelector(".color-mode i");
		html.classList.toggle("light-mode");
		html.classList.toggle("dark-mode");
		colorMode_btnicon.classList.toggle("fa-moon");
		colorMode_btnicon.classList.toggle("fa-lightbulb");
	};

	return (
		<>
			<header className="app-header">
				<div className="header-title">
					<h1>
						{/* Taskie <i className="fa-solid fa-lightbulb"></i> */}
						Taskie
					</h1>
					<button
						className="color-mode"
						onClick={changeColorMode}>
						<i className="fa-solid fa-moon fa-lg"></i>
					</button>
				</div>
				<div className="header-taskie">
					<div>
						<h2>{headerTitle}</h2>
						<br />
						<h4>{headerText}</h4>
					</div>
					<div className="header-img">
						<img
							src={avatarSrc}
							alt="taskie"
						/>
					</div>
				</div>
			</header>
		</>
	);
};

export default Header;
