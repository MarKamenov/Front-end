import * as React from 'react';
// import { inject, observer } from 'mobx-react';
import { Box } from 'grid-styled';
import styled from './theme';
import NavBar from './components/NavBar';
import FurnitureList from './components/FurnitureList';

interface IAppProps {
	className?: string;
}

class App extends React.Component<IAppProps> {
	constructor(props: IAppProps) {
		super(props);
	}

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
