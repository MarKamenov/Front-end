import * as React from 'react';
import {Box, Flex } from 'grid-styled';
import styled from './theme';
import NavBar from './components/NavBar';
import Menu from './components/Menu'
import {BrowserRouter as Router,  Route} from 'react-router-dom'
import {routes} from './routes'

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
			<Router>
			<Flex className='menu' py={2} flexDirection="column" alignItems="center">
			<NavBar>
				<Menu />
			</NavBar>
		</Flex>	
	
			  {routes.map((route, index) => (
            <Route
              key={index}
              path={route.path}
              component={route.main}
            />
					))}
				
	</Router>
	</Box>
		);
	}
}

export default styled(App)`
    min-height: 98vh;
		overflow-y:hidden;
`;
