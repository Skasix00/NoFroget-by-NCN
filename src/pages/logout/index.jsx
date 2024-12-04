import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../provider/userprovider";
import { useDispatch } from "react-redux";
import { logoutUser } from "../../../utils/stateSlice";

export default function Logout() {
	const navigate = useNavigate();
	const auth = useAuth();
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(logoutUser());
		auth.setJwt(null);
		sessionStorage.removeItem("jwt");
		navigate("/");
	}, [auth, dispatch, navigate]);

	return (
		<>
			<div>
				<p>A efetuar logout</p>
			</div>
		</>
	);
}
