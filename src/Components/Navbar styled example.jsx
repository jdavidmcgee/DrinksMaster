import React from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

const StyledBtn = styled.button`
	background: red;
	color: white;
	cursor: pointer;
	font-size: 2rem;
`;

const Navbar = () => {
	return (
		<nav>
			<div className="nav-center">
                <StyledBtn>styled btn</StyledBtn>
				<span className="logo">DrinksMaster</span>
				<div className="nav-links">
					<NavLink to="/" className="nav-link">
						Home
					</NavLink>
					<NavLink to="about" className="nav-link">
						About
					</NavLink>
					<NavLink to="newsletter" className="nav-link">
						Newsletter
					</NavLink>
				</div>
			</div>
		</nav>
	);
};

export default Navbar;
