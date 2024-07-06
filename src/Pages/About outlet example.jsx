import React from 'react';
import { Outlet } from 'react-router-dom';

const About = () => {
	return (
		<div>
			<h1>About</h1>
			{/* this code below creates <a href='/'>Home Page</a> in the HTML */}
			<Outlet /> 
			{/* this will enable us to navigate to: about/company */}
		</div>
	);
};

export default About;
