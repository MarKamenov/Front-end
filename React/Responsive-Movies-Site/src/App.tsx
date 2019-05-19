import * as React from 'react';
import styled from './theme';
import {  observer, inject } from "mobx-react";
import { Flex, Box } from 'grid-styled';
import Movies from './store/Movies';
import UI from './store/Ui';
import LeftMenu from './components/LeftMenu';
import LeftMenuMob from './components/LeftMenuMob';
import MoviesList from './components/MoviesList';
import RightMenu from './components/RightMenu'
import StyledCheckbox from './components/CheckBoxFields'
import FormExpander from './components/FormExpander';
import HamburgerButton from './components/ButtonHamburger'

interface IAppProps {
	className?: string;
}

const genres = [
	'Action','Adventure','Animation', 'Comedy', 'Crime film','Documentary','Drama','Erotic', 'Family', 'Fanatasy', 'History', 'Horror'
]
@inject('movies','ui')
@observer
class UnstyledApp extends React.Component<IAppProps> {
	constructor(props: IAppProps) {
		super(props);
	}

	get injected() {
		return this.props as {
			movies: Movies;
			ui: UI;
		};
	}

	public render() {
		const {list, total} = this.injected.movies
		const {toggle, toggleMenu} = this.injected.ui
		const show = toggleMenu && window.innerWidth < 768;
		return (
			<Flex width={1} flexDirection="column" className={this.props.className}>
						<Flex flex={1} className="content-wrapper">
						<Box className='menu-items'>
						  <Flex className='menu-wrapper' mb={2} pt='3rem' pl='55px'>
								<HamburgerButton onClick={() => toggle()}/>	
								<h1>Discover</h1>	
							</Flex>		
							<LeftMenu/>
						{show && <Flex p={5} pb={0}><LeftMenuMob/></Flex>}
						</Box>
							<Box className='app-content'>
							<Flex className='main-wrapper' p={5} >
								<Box mr='1rem' className='middle'>
								{	list.length ? (
										<Box className='movies-wrapper'>
											<span className='total'>{total} movies</span>
											{list && list.slice(0,3).map((movie:any) => (
											<MoviesList key={movie.id} movie={movie}  />
											))}
										</Box>
										) : (	<Flex pt='5rem' justifyContent='center' width={1}><b>No movies</b></Flex>	)
								}
								</Box>
							<Box className='right'>
								<RightMenu />
								<Box p={2} className='expander-box'>
								<FormExpander initOpen={true} title='Select genre(s)'>
								{
									genres.map((g,i) => <StyledCheckbox key={`${g}${i}`} label={g}/>)
								}
								</FormExpander>
								<FormExpander title='Select min. vote' />
								<FormExpander title='Select language' />
								</Box>
							</Box>
						</Flex>
						</Box>

					</Flex>
			</Flex>
		);
	}
}

const App = styled(UnstyledApp)`

.app-content {
		width: 100%;
		height: 100%;
		background-color: ${props=>props.theme.bckgGreyColor};
		overflow-y: auto;
		overflow-x: hidden;
		flex-grow: 1;
	}

.content-wrapper{
	display:flex;
	flex-direction:column;
	@media (min-width: 768px) {
		flex-direction:row;
		
		}
}
.main-wrapper{
		flex-grow:2;
		min-height: 97vh;
		justify-content: flex-end;
		flex-direction:column-reverse;
		@media (min-width: 768px) {
		flex-direction:row;
		
		}
}

.menu-wrapper {
	svg {
		width:35px;
		height:25px;
	}
	@media (min-width: 768px) {
		display:none;		
		}
}

.middle {
		margin-right:0;
		margin-top:3rem;
		@media (min-width: 768px) {
		margin-right:1rem;
		margin-top:0;	
		flex-grow:1;	
		}
}

h1 {
	margin:0 0 0 1rem;;
}

.menu-items {
	background-color: ${props=>props.theme.bckgGreyColor};
}

	.movies-wrapper {
		position:relative;
	}

	.expander-box {
		display:none;
		@media (min-width: 768px) {
			background-color:white;
			display:block;
		}
	}

	.total {
		position:absolute;
		top: -1.2rem;
		color:black;
		font-size: 0.8rem;
	}

`;

export default App;
