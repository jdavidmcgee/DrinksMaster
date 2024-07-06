import axios from 'axios';
import { useLoaderData, Link } from 'react-router-dom';
import Wrapper from '../assets/wrappers/CocktailPage';

const singleCocktailUrl =
	'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=';

export const loader = async ({}) => {
	const cockTailId = '11007';
	const response = await axios.get(`${singleCocktailUrl}${cockTailId}`);
	console.log('response data', response.data);
	return { drink: response.data.drinks, cockTailId };
};
const Cocktail = () => {
	const { drink, cockTailId } = useLoaderData();

	const { idDrink: id, strDrink: name, strDrinkThumb: image, strAlchoholic: info, strGlass: glass } = drink[0];

	return (
		<Wrapper>
			<div className="img-container">
				<img src={image} alt={name} className="img" />
			</div>
			<div className="footer">
				<h4>{name}</h4>
				<h5>{glass}</h5>
				<p>{info}</p>
			</div>
		</Wrapper>
	);
};

export default Cocktail;
