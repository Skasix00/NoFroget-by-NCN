import React from "react";
import { Route, Routes, Outlet } from "react-router-dom";
import Home from "../pages/home";
import About from "../pages/about";
import Contacts from "../pages/contacts";
import Login from "../pages/login";
import NotFound from "../pages/notfound";
import PrivateRoute from "../components/privateroute";
import Logout from "../pages/logout";
import "../common/styles/index.css";

export default function Routing() {
	return (
		<div className='wrapper mt-4'>
			<Routes>
				<Route path='/' element={<Outlet />}>
					<Route
						index
						element={
							<PrivateRoute>
								<Home />
							</PrivateRoute>
						}
					/>
					<Route path='/about' element={<About />} />
					<Route path='/contact' element={<Contacts />} />
					<Route path='/login' element={<Login />} />
					<Route path='/logout' element={<Logout />} />
					<Route path='*' element={<NotFound />} />
				</Route>
			</Routes>
		</div>
	);
}
