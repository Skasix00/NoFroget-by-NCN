import React from "react";
import Header from "../header";
import Footer from "../footer";
import { useLocation } from "react-router-dom";
import "../../common/styles/index.css";

export default function MainLayout({ children }) {
	let location = useLocation();

	return (
		<React.Fragment>
			<Header />
			{location.pathname === "/login" ? <div className='container-default'>{children}</div> : <div className='container-default container-default-bg-color shadow-bg'>{children}</div>}
			<Footer />
		</React.Fragment>
	);
}
