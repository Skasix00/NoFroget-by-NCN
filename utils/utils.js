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

const formatDate = (date) => {
	if (!date) return "";
	const year = date.getFullYear();
	const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-based
	const day = String(date.getDate()).padStart(2, "0");
	return `${year}-${month}-${day}`;
};

export { encryptPassword, getCurrentUrl, formatDate };
