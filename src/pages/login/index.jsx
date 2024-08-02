import { useState } from "react";
import { getAPIUrl } from "../../helpers/helpers";
import { useAuth } from "../../provider/userprovider";
import { useNavigate } from "react-router-dom";
import "./index.css";
import "../../common/styles/index.css";
import { PasswordInput, Text, Group, TextInput, Button } from "@mantine/core";
import { notifications } from "@mantine/notifications";

export default function Login() {
	const auth = useAuth();
	const navigate = useNavigate();
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");

	const login = async () => {
		await fetch(getAPIUrl() + `user/login?username=${username}&password=${password}`)
			.then((response) => {
				if (!response.ok) {
					return notifications.show({
						title: "Ups algo correu mal...",
						message: "Contacte o administrador.",
						autoClose: 1000,
						color: "red",
						className: "notification",
						withBorder: true,
					});
				}
				return response.json();
			})
			.then((data) => {
				auth.setJwt(data.token);
				sessionStorage.setItem("jwt", JSON.stringify(data.token));
				navigate("/");
				return notifications.show({
					title: "Login Efetuado com Sucesso",
					message: "Disfrute de todas as funcionalidades.",
					autoClose: 3000,
					color: "green",
					className: "notification",
					withBorder: true,
				});
			})
			.catch((error) => {
				console.error("There was a problem with the fetch operation:", error);
			});
	};
	return (
		<>
			<div className='container-default-nobg row d-flex justify-content-center'>
				<div className='col-lg-4 login-card'>
					<Group justify='space-between'>
						<Text component='label' htmlFor='Username' size='sm' fw={500}>
							Nome de Utilizador
						</Text>
					</Group>
					<TextInput placeholder='Nome de Utilizador' id='Username' value={username} onChange={(e) => setUsername(e.target.value)} />

					<Group justify='space-between' className='mt-2'>
						<Text component='label' htmlFor='PSWD' size='sm' fw={500}>
							Password
						</Text>
					</Group>
					<PasswordInput placeholder='Password' id='PSWD' value={password} onChange={(e) => setPassword(e.target.value)} />

					<Button variant='filled' fullWidth color='#B676EC' size='sm' onClick={login} className='mt-3 login'>
						Login
					</Button>
				</div>
			</div>
		</>
	);
}
