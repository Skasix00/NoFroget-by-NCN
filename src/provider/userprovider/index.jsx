import React, { createContext, useContext, useState } from "react";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
	const [jwt, setJwt] = useState(sessionStorage.getItem("jwt"));
	const authValue = { jwt, setJwt };

	return <AuthContext.Provider value={authValue}>{children}</AuthContext.Provider>;
};

function useAuth() {
	const context = useContext(AuthContext);

	if (context === undefined) {
		throw new Error("useAuth must be used inside a AuthProvider");
	}

	return context;
}

export { useAuth, AuthProvider };
