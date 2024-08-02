import bcrypt from "bcryptjs-react";

const ISDEBUG = import.meta.env.VITE_ISDEBUG;

async function encryptPassword(password) {
	const salt = await bcrypt.genSalt(12);
	const hash = await bcrypt.hash(password, salt);
	return hash;
}

function getCurrentUrl() {
	if (ISDEBUG === true) {
		return "http://localhost:5000/api/";
	} else {
		return "http://localhost:5000/api/";
	}
}

export { encryptPassword, getCurrentUrl };
