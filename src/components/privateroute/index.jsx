import { useState } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../provider/userprovider";
import { getAPIUrl } from "../../helpers/helpers";

export default function PrivateRoute({ children }) {
	const apiUrl = getAPIUrl();
	const user = useAuth();
	const [isValid, setIsValid] = useState(null);
	const [isLoading, setIsLoading] = useState(true);

	if (user && user.jwt && user.jwt !== "null") {
		//const test = user.jwt.substring(3, user.jwt.length - 3);

		if (user.jwt[0] === '"' && user.jwt[user.jwt.length - 1] === '"') {
			return (user.jwt = user.jwt.substring(1, user.jwt.length - 1));
		}
		fetch(apiUrl + `user/verifyToken?token=${encodeURIComponent(user.jwt)}`, { method: "POST" }).then((isValid) => {
			if (isValid.status === 200) {
				setIsValid(true);
				setIsLoading(false);
			}
		});
	} else {
		return <Navigate to='/login' />;
	}

	return isLoading ? <div>Loading...</div> : isValid === true ? children : <Navigate to='/login' />;
}
