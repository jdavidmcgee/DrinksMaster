import Wrapper from '../assets/wrappers/CocktailList'
import CocktailCard from './CocktailCard'

const CocktailList = ({drinks}) => {
  if(!drinks){
    return <h4>No Matching cocktails</h4>
  }
  const formattedDrinks = drinks.map(item => {
    // this pulls out the data we need from the drinks object
    const {idDrink, strDrink, strDrinkThumb, strAlcoholic, strGlass} = item;
    // this refactors the data into a more traditional naming convention
    return {id: idDrink, name: strDrink, image: strDrinkThumb, info: strAlcoholic, glass: strGlass}
  })
  return <Wrapper>
    {formattedDrinks.map(drink => {
      return <CocktailCard key={drink.id} {...drink} />
    })}
    </Wrapper>;
}

export default CocktailList
