import axios from 'axios';
import { useLoaderData } from 'react-router-dom';
import CocktailList from '../Components/CocktailList';
import SearchForm from '../Components/SearchForm';

const cocktailSearchUrl =
	'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';

import { useQuery } from '@tanstack/react-query';

const searchCocktailsQuery = searchTerm => {
	return {
		queryKey: ['search', searchTerm || ''],
		queryFn: async () => {
			const response = await axios.get(`${cocktailSearchUrl}${searchTerm}`);
			return response.data.drinks;
		},
	};
};

export const loader =
	queryClient =>
	async ({ request }) => {
		const url = new URL(request.url);
		const searchTerm = url.searchParams.get('search') || ''; // an empty string will return all drinks
		await queryClient.ensureQueryData(searchCocktailsQuery(searchTerm)); // this will fetch the data from the API, if it hasn't been fetched already

		return { searchTerm };
	};

const Landing = () => {
	const { searchTerm } = useLoaderData();
	// set up the useQuery hook
	const { data: drinks } = useQuery(searchCocktailsQuery(searchTerm));

	return (
		<>
			<SearchForm searchTerm={searchTerm} />
			<CocktailList drinks={drinks} />
		</>
	);
};

export default Landing;
