import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import { AuthProvider } from "./provider/userprovider/index.jsx";
import "@mantine/core/styles.css";
import { MantineProvider } from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import "@mantine/notifications/styles.css";
import '@mantine/core/styles.css';
import '@mantine/dates/styles.css';
import "./common/styles/index.css";
import { BrowserRouter as Router } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<MantineProvider>
			<Notifications position='bottom-center' />
			<AuthProvider>
				<Router>
					<App />
				</Router>
			</AuthProvider>
		</MantineProvider>
	</React.StrictMode>
);
