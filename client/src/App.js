import logo from "./logo.svg";
import "./App.css";
import { useState, useEffect } from "react";
import axios from "axios";

function App() {
	const [test, setTest] = useState("");

	useEffect(() => {
		let body = {
			text: "hello",
		};

		axios
			.post("/api/test", body)
			.then((res) => {
				setTest(res.data.text);
			})
			.catch((err) => {
				console.log(err);
			});
	}, []);
	return <h1>{test}</h1>;
}

export default App;
