import * as React from 'react';
import { Box, Flex } from 'grid-styled';
import styled from 'styled-components';
import { NavLink} from 'react-router-dom'

interface IMenuProps {
	className?: string;
}

class Menu extends React.Component<IMenuProps> {

	constructor(props: IMenuProps) {
		super(props);
	}

	public render() {

		return (
			<Flex className={this.props.className} py={2} flexDirection="column" alignItems="center">
			<Box className='links'><NavLink to='/'>Home</NavLink></Box>
			<Box className='links'><NavLink to='/photo'>Photo</NavLink></Box>
			<Box className='links'><NavLink to='/user' exact>Login</NavLink></Box>
			<Box className='links'><NavLink to='/dashboard' exact>Dashboard</NavLink></Box>
		</Flex>	
		);
	}
}

export default styled(Menu)`
	background-color: ${props => props.theme.backgroundSecond}
	box-shadow: ${props => props.theme.menuBoxShadow};
	border-radius: ${props => props.theme.radius};
	width: 100px;
	.links{
		width:100%;
		text-align:center;
		a {
			display:block;
			color:${props => props.theme.foregroundFourth};
			text-decoration:none;
			&:hover {
				font-weight:bold;
				background-color: ${props => props.theme.foregroundFourth}
				color: ${props => props.theme.backgroundFirst}
			}
		}
	}
`;
