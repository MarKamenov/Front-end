import { Box, Flex } from 'grid-styled';
import { IReactionDisposer, observable, reaction, } from 'mobx';
import { inject, observer } from 'mobx-react';
import * as React from 'react';
import Movies from '../store/Movies';
import styled from '../theme';
import * as search from '../assets/search-icon-yellow.png';
import * as year from '../assets/year-icon.png';
import HamburgerMenu from '../assets/HamburgerMenu';

interface IRightMenuProps {
	className?: string;
}

@inject('movies')
@observer
class UnstyledRightMenu extends React.Component<IRightMenuProps> {

	@observable private queryText: string = '';
	private disposables: IReactionDisposer[] = [];

	get injected() {
		return this.props as {
			movies: Movies;
		};
	}

	constructor(props: IRightMenuProps) {
		super(props);
		this.disposables.push(
			reaction(
				() => this.queryText,
				(query: string) => {
					query ? this.injected.movies.searchMovies(query) : this.injected.movies.fetchMovies();
				},
				{
					delay: 500,
				},
			),
		);
	}

	componentWillUnmount() {
		this.disposables.forEach(d => d());
	}

	public render() {
		return (
			<Box className={this.props.className}>
				<Flex px={2} className='input-wrapper' flexDirection='column' flexWrap="wrap" mb={2}>
						<Flex>
						<Flex className="select" width={1} ml={2}>
							<Box>
								<img role="img" src={search} alt="search icon"/>
							</Box>
							<input
								placeholder="Search movies"
								value={this.queryText}
								onChange={(e:any) => {
									this.queryText = e.target.value;
								}}
							/>
							</Flex>
							<Box ml={1} className='svg-wrapper'>
							 <HamburgerMenu color='#d9e021' />
							</Box>
						</Flex>
						

						<Box className="select second" width={1} ml={2}>
						<span>
							<img role="img" src={year} alt="calendar icon"/>
						</span>
						<input placeholder="Year of release" />
						</Box>				
				</Flex>
			</Box>
		);
	}
}

const RightMenu = styled(UnstyledRightMenu)`
  min-width: 15rem;
.input-wrapper {
	background-color:white;
}
.select{
	border-bottom: ${props => `2px solid ${props.theme.textHighLightColor}`};
	margin-left:0;
	margin-bottom:10px;
	padding:.5rem;
	color:${props => props.theme.textHighLightColor};
	padding-left:0;
	& span {
		margin-right:5px;
	}
	& img {
		vertical-align: bottom;
    height: 20px;
		}
		+ div svg {
			width:15px;
			height:15px;
		}
}

.svg-wrapper {
	  border-bottom: 2px solid #d9e021;
    margin-bottom: 10px;
    padding: .5rem;
    color: #d9e021;
    padding: 10px 0 0 0;
		@media (min-width: 768px) {
			display:none;
		}
}

.second {
	display:none;
	@media (min-width: 768px) {
			display:block;
		}
	}


input, input::placeholder {
  color: ${props => props.theme.textHighLightColor};
	font-weight:bold;
}

input {
	border:none;
	background-color:transparent;
	outline:none;
}`;

export default RightMenu;
