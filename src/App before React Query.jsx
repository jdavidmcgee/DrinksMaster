import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import {
	About,
	HomeLayout,
	Error,
	Landing,
	Newsletter,
	Cocktail,
	SinglePageError,
} from './Pages';
// the loader is used to fetch data from an API before the page is rendered
import { loader as landingLoader } from './Pages/Landing';
import { loader as singleCocktailLoader } from './Pages/Cocktail';
import {action as newsletterAction} from './Pages/Newsletter';

const router = createBrowserRouter([
	// in our HomeLayout component, we have a <Outlet /> component...this will enable us to render the child routes of the home page!
	// if we nest like this, you'll notice that if you go to the 'home page' it will render the HomeLayout component and the Landing component...so we need to set up an index page...or a home page!
	{
		path: '/', // home page route (url)
		element: <HomeLayout />,
		errorElement: <Error />,
		children: [
			// these are the child routes (url) of the home page and are relative to the home page
			// by making the index property true, we are setting the Landing component as the home page
			{
				index: true,
				element: <Landing />,
				errorElement: <SinglePageError />,
				loader: landingLoader, // we are using the loader to fetch data from the API before the page is rendered
			},
			{
				path: 'cocktail/:id', // this is a dynamic route
				errorElement: <SinglePageError />,
				loader: singleCocktailLoader,
				element: <Cocktail />,
			},
			{
				path: 'newsletter',
				element: <Newsletter />,
				action: newsletterAction,
			},
			{
				path: 'about',
				element: <About />,
			},
		],
	},
]);

const App = () => {
	return <RouterProvider router={router} />;
};
export default App;
