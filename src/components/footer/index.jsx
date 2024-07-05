import "./index.css";

export default function Footer() {
	const currentDate = new Date();
	const currentYear = currentDate.getFullYear();
	return (
		<div className='footer pt-4 ps-2'>
			<footer>NiceNails {currentYear} ™</footer>
		</div>
	);
}
