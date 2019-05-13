import React from 'react';
import styled from './Theme'

const UnstyedReposList = ({data,className}) => <ul className={className}>
{
	data && data.map(({name,stars,forks},i) => <li key={`${name}${i}`}>
	<span>{name} </span><b> - </b><span><span role="img" aria-label="star image">🌟</span> {stars}</span><b> - </b><span><span role="img" aria-label="forks image">🍴</span>  {forks}</span>
 </li>
	)}
</ul>
	const ReposList = styled(UnstyedReposList)`
	width:30vw;
	padding-left: 30px;
	list-style-type: square;
	border: 2px solid blue;
  background-color: lightblue;
	& > li {
		 	background-color: white;
			margin: 5px 0px;
			padding:5px;
    	border-radius:  ${props => props.theme.radius};
			& span:first-of-type {
				text-transform:capitalize;
			}
	}
 
	`;
	export default ReposList;
