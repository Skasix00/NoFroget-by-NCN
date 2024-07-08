import { useState } from "react";
import { FormField, Button, Form } from "semantic-ui-react";
import { getAPIUrl } from "../../helpers/helpers";
import { useAuth } from "../../provider/userprovider";
import {useNavigate } from "react-router-dom";

export default function Login() {
	const auth = useAuth();
	const navigate = useNavigate();
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");

	const login = () => {
		fetch(getAPIUrl() + `user/login?username=${encodeURIComponent(username)}&password=${encodeURIComponent(password)}`)
			.then((response) => {
				if (!response.ok) {
					throw new Error("Ocorreu um erro com a API, contacte administrador. " + response.statusText);
				}
				return response.json();
			})
			.then((data) => {
				auth.setJwt(data.token);
				navigate("/");
				//sessionStorage.setItem("jwt", data.token);
			})
			.catch((error) => {
				console.error("There was a problem with the fetch operation:", error);
			});
	};
	return (
		<>
			<Form onSubmit={login}>
				<FormField>
					<label>Nome de Utilizador</label>
					<input placeholder='Nome de Utilizador' value={username} onChange={(e) => setUsername(e.target.value)} />
				</FormField>
				<FormField>
					<label>Password</label>
					<input placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} />
				</FormField>
				<Button type='submit'>Submit</Button>
			</Form>
		</>
	);
}
