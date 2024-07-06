import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { About, HomeLayout, Error, Landing, Newsletter, Cocktail } from './Pages';

const router = createBrowserRouter([
	// in our HomeLayout component, we have a <Outlet /> component...this will enable us to render the child routes of the home page!
	// if we nest like this, you'll notice that if you go to the 'home page' it will render the HomeLayout component and the Landing component...so we need to set up an index page...or a home page!
	{
		path: '/', // home page route (url)
		element: <HomeLayout />,
		children: [
			// these are the child routes (url) of the home page and are relative to the home page
			// by making the index property true, we are setting the Landing component as the home page
			{
				index: true,
				element: <Landing />,
			},
			{
				path: 'cocktail',
				element: <Cocktail />,
			},
			{
				path: 'newsletter',
				element: <Newsletter />,
			},
			{
				path: 'about',
				element: <About />,
				children: [
					{
						index: true,
						element: <h1>Company</h1>,
					},
					{
						path: 'person',
						element: <h1>Person</h1>,
					},
				],
			},
		],
	},
]);

const App = () => {
	return <RouterProvider router={router} />;
};
export default App;
