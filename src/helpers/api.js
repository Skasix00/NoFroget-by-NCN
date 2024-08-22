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
	try {
		const response = await axios.post(API_URL + endpoint, data);
		if (response.status === 200) {
			return "OK";
		} else {
			return "Unexpected status code: " + response.status;
		}
	} catch (error) {
		throw new Error(error);
	}
}

async function Delete(endpoint) {
	try {
		const response = await axios.delete(API_URL + endpoint);
		if (response.status === 200) {
			return "OK";
		} else {
			return "Unexpected status code: " + response.status;
		}
	} catch (error) {
		throw new Error(error);
	}
}

export { Get, Post, Delete };
