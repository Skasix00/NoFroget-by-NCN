import { BrowserRouter as Router, Link } from "react-router-dom";
import { Navbar, Nav } from "react-bootstrap";
import { FaInfoCircle, FaPhone, FaPercent } from "react-icons/fa";
import "./index.css";
import Routing from "../../routes/routes";

export default function Header() {
	return (
		<Router>
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
							<FaInfoCircle /> About
						</Nav.Link>
						<Nav.Link as={Link} to='/contact' className='nav-link'>
							<FaPhone /> Contact
						</Nav.Link>
						<Nav.Link as={Link} to='/login' className='nav-link'>
							<FaPercent /> Login
						</Nav.Link>
					</Nav>
				</Navbar.Collapse>
			</Navbar>
			<Routing />
		</Router>
	);
}
