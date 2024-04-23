const Check = ({ id, title, completedOld }) => {
	const handleCheck = () => {
		let completed = !completedOld;

		fetch("http://localhost:3001/tasks/" + id, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ title, completed }),
		})
			.then((response) => response.text())
			.then((data) => {
				console.log(data);
			});
	};

	return (
		<>
			{/* <button
				className="check-btn"
				onClick={handleCheck}>
				{completedOld ? <i className="fa-solid fa-circle-check fa-xl"></i> : <i className="fa-regular fa-circle-check fa-xl"></i>}
			</button> */}
			<button
				className="check-btn"
				onClick={handleCheck}>
				{completedOld ? <i className="fa-solid fa-square-check fa-2xl"></i> : <i className="fa-regular fa-square fa-2xl"></i>}
			</button>
		</>
	);
};

export default Check;
