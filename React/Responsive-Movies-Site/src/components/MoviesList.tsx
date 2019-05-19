import * as React from 'react';
import { Box,Flex } from 'grid-styled';
import { IMovieResponse } from '../types'
import styled from 'src/theme';

interface IMoviesItems {
	className?: string;
	movie:IMovieResponse;
}
const imgUrl = 'https://image.tmdb.org/t/p/w500'

const UnstyledMoviesList = (props: IMoviesItems) => {
	const { movie, className } = props;

	return (
			<Flex p='1rem' mb={3} className={className}>
				<Box mr={3}><img src={`${imgUrl}${movie.poster_path}`}/></Box>
				<Flex width={1} flexDirection='column' justifyContent='space-between'>
				<Flex width={1} justifyContent='space-between'>
					<Box className="card-title">{movie.title}</Box>
					<Flex flexDirection='column' justifyContent='center' alignItems='center' className='vote'>{movie.vote_average}</Flex>
				</Flex>
				<Box className='overview'>{movie.overview}</Box>
				<Box className='release'>{movie.release_date}</Box>
				</Flex>
			</Flex>
	);
};

const MoviesList = styled(UnstyledMoviesList)`
color:black;
background-color:white;
min-height:185px;
.card-title {
	font-weight:bold;
	font-size:1.2rem
}
.overview {
max-height:200px;
overflow:hidden;
}

img {
	height:100%;
	width:100px;
}
.release {
	color:${props=>props.theme.textHighLightColor};
}
.vote {
	color:white;
	background-color:${props=>props.theme.textHighLightColor};
	border-radius:${props=>props.theme.radius};
	padding: 2px;
}
`;
export default MoviesList;