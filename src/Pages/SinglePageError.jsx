import { useRouteError } from 'react-router-dom';

const SinglePageError = () => {
	const error = useRouteError();
	return <h2>The error is: {error.message}</h2>;
};

export default SinglePageError;
