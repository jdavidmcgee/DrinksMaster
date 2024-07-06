import { Form, redirect, useNavigation } from 'react-router-dom';
import Wrapper from '../assets/wrappers/SearchForm';

const SearchForm = ({searchTerm}) => {
	const navigation = useNavigation();
	const isSubmitting = navigation.state === 'submitting'; // checks if the form is submitting and returns a boolean value.  if it is submitting, it will return true, otherwise it will return false

	return (
		<Wrapper>
			<Form className="form">
				<input
					type="search"
					name="search"
					className="form-input"
          placeholder='search cocktails'
					defaultValue={searchTerm}
				/>
				<button type="submit" disabled={isSubmitting} className="btn">
					{isSubmitting ? 'Searching...' : 'Search'}
				</button>
			</Form>
		</Wrapper>
	);
};

export default SearchForm;
