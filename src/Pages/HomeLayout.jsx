import { Outlet, useNavigation } from 'react-router-dom';
import Navbar from '../Components/Navbar';
// this HomeLayout component will render the child routes of the home page
// it's purpose is to layout the home page and render the child routes of the home page.  If we want a navbar or footer on the home page, we can add it here.
// this layout will be shared all across the children of the home page
// technically, this is NOT a page...but a layout of the pages

const HomeLayout = () => {
	const navigation = useNavigation(); // gives us access to the useNavigate hook, which tells us about the state of the navigation
	const isPageLoading = navigation.state === 'loading'; // checks if the page is loading and returns a boolean value.  if it is loading, it will return true, otherwise it will return false
	return (
		<>
			<Navbar />
			<section className="page">
				{isPageLoading ? <div className="loading" /> : <Outlet />}
			</section>
		</>
	);
};

export default HomeLayout;
