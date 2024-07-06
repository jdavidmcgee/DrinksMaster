import axios from "axios";
import { useLoaderData } from "react-router-dom";
import CocktailList from "../Components/CocktailList";
import SearchForm from "../Components/SearchForm";

const cocktailSearchUrl =
	'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';

export const loader = async ({ request }) => {
	const url = new URL(request.url);
	const searchTerm = url.searchParams.get('search') || ''; // an empty string will return all drinks
	const response = await axios.get(`${cocktailSearchUrl}${searchTerm}`);
	return { drinks: response.data.drinks, searchTerm };
};

const Landing = () => {

	const {drinks, searchTerm} = useLoaderData();
	
  return (
		<>
			<SearchForm searchTerm={searchTerm} />
			<CocktailList drinks={drinks} />
		</>
		
  );
}

export default Landing
