import { Outlet, useLocation } from "react-router-dom";
import ScrollToTop from "../components/ScrollToTop";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";

export const Layout = () => {
	const location = useLocation();

	// aquí decides dónde NO mostrar el navbar
	const hideNavbarRoutes = ["/"];

	const hideNavbar = hideNavbarRoutes.includes(location.pathname);

	return (
		<ScrollToTop>
			{!hideNavbar && <Navbar />}

			<Outlet />

			<Footer />
		</ScrollToTop>
	);
};