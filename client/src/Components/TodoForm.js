import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const TodoForm = () => {
	const [Title, setTitle] = useState("");
	const [Content, setContent] = useState("");

	const navigate = useNavigate();

	const onSubmit = (e) => {
		e.preventDefault();
		if (Title === "" || Content === "") {
			return alert("모든 항목을 채워주세요");
		}

		let body = {
			title: Title,
			content: Content,
		};

		axios
			.post("/api/post/submit", body)
			.then((response) => {
				if (response.data.success) {
					alert("글 작성이 완료 되었습니다.");
					navigate("/");
				} else {
					alert("글 작성에 실패하였습니다.");
				}
			})
			.catch((err) => {
				console.log(`오류 메시지입니다 ${err}`);
			});
	};
	return (
		<form onSubmit={onSubmit}>
			<p>Title</p>
			<input type="text" onChange={(e) => setTitle(e.target.value)} />
			<p>Content</p>
			<input type="text" onChange={(e) => setContent(e.target.value)} />
			<button>Submit</button>
		</form>
	);
};

export default TodoForm;
