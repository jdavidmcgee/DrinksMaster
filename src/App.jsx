import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
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
import { action as newsletterAction } from './Pages/Newsletter';

// create a new instance of the QueryClient
const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			staleTime: 1000 * 60 * 5, // 5 minutes
		},
	},
});

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
				loader: landingLoader(queryClient), // we are using the loader to fetch data from the API before the page is rendered.  With React query, we can use the useQuery hook to fetch data from the API...invoking in the landing loader function
			},
			{
				path: 'cocktail/:id', // this is a dynamic route
				errorElement: <SinglePageError />,
				loader: singleCocktailLoader(queryClient),
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
	return (
		<QueryClientProvider client={queryClient}>
			<RouterProvider router={router} />;
			<ReactQueryDevtools initialIsOpen={false} />
		</QueryClientProvider>
	);
};
export default App;
