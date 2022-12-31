import "./App.css";
import TodoForm from "./Components/TodoForm";
import Main from "./Components/Main";
import { Routes, Route, BrowserRouter } from "react-router-dom";

function App() {
	return (
		<>
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<Main />} />
					<Route path="/todo" element={<TodoForm />} />
				</Routes>
			</BrowserRouter>
		</>
	);
}

export default App;
