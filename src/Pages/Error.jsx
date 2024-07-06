import Wrapper from '../assets/wrappers/ErrorPage';
import { Link, useRouteError } from 'react-router-dom';
import img from '../assets/not-found.svg';

const Error = () => {
	const error = useRouteError();
	if (error.status === 404) {
		return (
			<Wrapper>
				<div>
					<img src={img} alt="not found" />
					<h3>Ooops! so sorry!</h3>
					<p>The page you tried cannot be found</p>
					<Link to="/">Back Home</Link>
				</div>
			</Wrapper>
		);
	}

	return (
		<Wrapper>
			<div>
				<h3>something went wrong: {error.message}</h3>
			</div>
		</Wrapper>
	);
};

export default Error;
