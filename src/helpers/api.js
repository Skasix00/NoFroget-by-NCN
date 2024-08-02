import axios from "axios";
import { getCurrentUrl } from "../../utils/utils";

const API_URL = await getCurrentUrl();

async function Get(endpoint) {
	try {
		const response = await axios.get(API_URL + endpoint);
		return response.data;
	} catch (error) {
		console.error("Error fetching data:", error);
		throw new Error(error);
	}
}

async function Post(endpoint, data) {
	await axios
		.post(API_URL + endpoint, data)
		.then((response) => {
			console.log(response.data);
		})
		.catch((error) => {
			throw new Error(error);
		});
}

async function Delete() {}

export { Get, Post, Delete };
