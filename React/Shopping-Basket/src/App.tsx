import * as React from 'react';
import { Box } from 'grid-styled';
import styled from './theme';
import NavBar from './components/NavBar';
import FurnitureList from './components/FurnitureList';

interface IAppProps {
	className?: string;
}

class App extends React.Component<IAppProps> {

	public render() {
		return (
			<Box className={this.props.className}>
				<NavBar />
				<FurnitureList />
			</Box>
		);
	}
}

export default styled(App)``;
