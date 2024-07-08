import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../provider/userprovider";

export default function Logout() {
	const navigate = useNavigate();
	const auth = useAuth();

	useEffect(() => {
		auth.setJwt(null);
		sessionStorage.removeItem("jwt");
		navigate("/");
	}, [auth, navigate]);

	return (
		<>
			<div>
				<p>A efetuar logout</p>
			</div>
		</>
	);
}
