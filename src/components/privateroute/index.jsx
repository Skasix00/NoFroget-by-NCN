import React, { useState } from "React";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../provider/userprovider";
import { getAPIUrl } from "../../helpers/helpers";

export default function PrivateRoute({ children }) {
	const apiUrl = getAPIUrl();
	const user = useAuth();
	const [isValid, setIsValid] = useState(null);
	const [isLoading, setIsLoading] = useState(true);

	if (user && user.jwt) {
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
