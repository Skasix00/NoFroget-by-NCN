import React from "react";
import "./index.css";

export default function Footer() {
	const currentDate = new Date();
	const currentYear = currentDate.getFullYear();
	return (
		<div className='footer pt-3 ps-2'>
			<footer>
				<p className='footer-brand-text'>BCS {currentYear} ™</p>
			</footer>
		</div>
	);
}
