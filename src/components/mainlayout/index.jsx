import React from "react";
import Header from "../header";
import Footer from "../footer";
export default function MainLayout({ children }) {
	return (
		<React.Fragment>
			<Header />
			{children}
			<Footer />
		</React.Fragment>
	);
}
