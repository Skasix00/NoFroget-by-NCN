import React from "react";
import { BrowserRouter as Router, Link } from "react-router-dom";
import { Navbar, Nav } from "react-bootstrap";
import { FaInfoCircle, FaPhone, FaDoorOpen, FaDoorClosed, FaAddressBook } from "react-icons/fa";
import { useAuth } from "../../provider/userprovider";
import { notifications } from "@mantine/notifications";
import "./index.css";
import { useTranslation } from "react-i18next";
export default function Header() {
	const { t } = useTranslation();
	const user = useAuth();
	return (
		<Navbar className='navbar-bg' expand='lg'>
			<Navbar.Brand>
				<h1 className='navbar-brand-text ps-1'>
					<Link to='/' className='brand-link'>
						NoFroget
					</Link>
				</h1>
			</Navbar.Brand>
			<Navbar.Toggle aria-controls='basic-navbar-nav' />
			<Navbar.Collapse id='basic-navbar-nav'>
				<Nav className='ml-auto'>
					<Nav.Link as={Link} to='/about' className='nav-link'>
						<FaInfoCircle /> {t("Navbar_About_Title")}
					</Nav.Link>
					<Nav.Link as={Link} to='/contact' className='nav-link'>
						<FaPhone /> {t("Navbar_About_Title2")}
					</Nav.Link>
					<Nav.Link as={Link} to='/management' className='nav-link'>
						<FaAddressBook /> {t("Navbar_About_Title3")}
					</Nav.Link>
					{!user.jwt ? (
						<Nav.Link as={Link} to='/login' className='nav-link'>
							<FaDoorOpen /> {t("Navbar_About_Title4")}
						</Nav.Link>
					) : (
						<Nav.Link
							as={Link}
							to='/logout'
							className='nav-link'
							onClick={() => {
								notifications.show({
									title: "Volte Sempre!",
									message: "Obrigado pela sua visita! Disponha.",
									autoClose: 3000,
									color: "green",
									className: "notification",
									withBorder: true,
								});
							}}
						>
							<FaDoorClosed /> {t("Navbar_About_Title5")}
						</Nav.Link>
					)}
				</Nav>
			</Navbar.Collapse>
		</Navbar>
	);
}
