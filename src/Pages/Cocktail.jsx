import axios from 'axios';
import { useLoaderData, Link, Navigate } from 'react-router-dom';
import Wrapper from '../assets/wrappers/CocktailPage';

const singleCocktailUrl =
	'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=';

import { useQuery } from '@tanstack/react-query';

const singleCocktailQuery = id => {
	return {
		queryKey: ['cocktail', id],
		queryFn: async () => {
			const { data } = await axios.get(`${singleCocktailUrl}${id}`);
			return data;
		},
	};
};

export const loader =
	queryClient =>
	async ({ params }) => {
		const { id } = params;
		await queryClient.ensureQueryData(singleCocktailQuery(id));
		return { id };
	};

const Cocktail = () => {
	const { id } = useLoaderData();

	const { data } = useQuery(singleCocktailQuery(id));

	// this is a fallback in case the data is not available.  The first is a simple message approach, the second is a redirect approach...using Navigate from react-router-dom.  If there is no data, we will redirect to the home page.
	//if (!data) return <h2>No cocktail to display</h2>;
	if (!data) return <Navigate to="/" />;

	const singleDrink = data.drinks[0];
	const {
		strDrink: name,
		strDrinkThumb: image,
		strAlcoholic: info,
		strGlass: glass,
		strCategory: category,
		strInstructions: instructions,
	} = singleDrink;

	const getIngredients = item => {
		let ingredients = [];
		for (let i = 1; i <= 15; i++) {
			if (item[`strIngredient${i}`] && item[`strMeasure${i}`]) {
				ingredients.push(
					`${item[`strIngredient${i}`]} - ${item[`strMeasure${i}`]}`
				);
			} else {
				if (item[`strIngredient${i}`]) {
					ingredients.push(`${item[`strIngredient${i}`]}`);
				} else {
					break;
				}
			}
		}
		return ingredients;
	};

	// John's solution:
	const validIngredients = Object.keys(singleDrink)
		.filter(
			key => key.startsWith('strIngredient') && singleDrink[key] !== null
		)
		.map(key => singleDrink[key]);
	// john then maps through validIngredients, ignores the measurements, and just returns the ingredients.  He uses the same ternary operator to add a comma after each ingredient except the last one.  I like our solution better since it adds the amounts of each ingredient as well.

	return (
		<Wrapper>
			<header>
				<Link to="/" className="btn">
					back home
				</Link>
				<h3>{name}</h3>
			</header>
			<div className="drink">
				<img src={image} alt={name} className="img" />
				<div className="drink-info">
					<p>
						<span className="drink-data">name: </span> {name}
					</p>
					<p>
						<span className="drink-data">category: </span> {category}
					</p>
					<p>
						<span className="drink-data">info: </span> {info}
					</p>
					<p>
						<span className="drink-data">glass: </span> {glass}
					</p>
					{singleDrink.strIngredient1 && (
						<p>
							<span className="drink-data">ingredients: </span>
							{getIngredients(singleDrink).map((item, index, arr) => {
								return (
									<span key={index} className="ing">
										{item}
										{index < arr.length - 1 ? ', ' : ''}
									</span>
								);
							})}
						</p>
					)}
					<p>
						<span className="drink-data">instructions: </span>
						{instructions}
					</p>
				</div>
			</div>
		</Wrapper>
	);
};

export default Cocktail;
