import { Form, redirect, useNavigation } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

// this is how we can submit a form with react-router-dom (latest version)
// using formData to get and then send data to the server
// Object.fromEntries() method transforms a list of key-value pairs into an object
// Object.entries() method returns an array of a given object's own enumerable string-keyed property [key, value] pairs

const newsletterUrl = 'https://www.course-api.com/cocktails-newsletter';

export const action = async ({ request }) => {
	const formData = await request.formData();
	const data = Object.fromEntries(formData); // Object.fromEntries() method transforms a list of key-value pairs into an object. {name: 'David', lastName: 'Smith', email: 'test@test.com'}
	// make a POST request
	try {
		const response = await axios.post(newsletterUrl, data);
		toast.success(response.data.msg);
		return redirect('/'); // redirect to the home page
	} catch (error) {
		toast.error(error?.response?.data?.msg || 'An error occurred');
		return error;
	}
};

const Newsletter = () => {
	const navigation = useNavigation();
	const isSubmitting = navigation.state === 'submitting'; // checks if the form is submitting and returns a boolean value.  if it is submitting, it will return true, otherwise it will return false

	return (
		<Form className="form" method="POST">
			<h4 style={{ textAlign: 'center', marginBottom: '2rem' }}>
				Our Newsletter
			</h4>
			{/* name */}
			<div className="form-row">
				<label htmlFor="name" className="form-label">
					name
				</label>
				<input
					type="text"
					className="form-input"
					name="name"
					id="name"
					required
				/>
			</div>
			{/* lastName */}
			<div className="form-row">
				<label htmlFor="lastName" className="form-label">
					last Name
				</label>
				<input
					type="text"
					className="form-input"
					name="lastName"
					id="lastName"
					required
				/>
			</div>
			{/* email */}
			<div className="form-row">
				<label htmlFor="email" className="form-label">
					email
				</label>
				<input
					type="email"
					className="form-input"
					name="email"
					id="email"
					required
					defaultValue="test@test.com"
				/>
			</div>
			<button
				type="submit"
				className="btn btn-block"
				style={{ marginTop: '1rem' }}
				disabled={isSubmitting}>
				{isSubmitting ? 'Submitting...' : 'Submit'}
			</button>
		</Form>
	);
};

export default Newsletter;
