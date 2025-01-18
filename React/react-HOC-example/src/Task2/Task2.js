import React, { Component } from 'react';
import { getReactRepositories } from '../index'
import ReposList from '../ReposList';
import styled from '../Theme'
import { withExpand } from './HocExpand'

const MAX_ITEMS = 4;

class UnstyledHocApp extends Component {
	constructor(props) {
		super(props)
		this.state = {
			repos: [],
		}
	}

	async componentDidMount() {
		const repos = await getReactRepositories()
		this.setState({ repos })
	}

	getRenderedItems = () => {
		const initRepos = this.state.repos.slice(0, MAX_ITEMS);
		return this.props.expanded ? initRepos : initRepos.slice(0, this.props.reposToShow)
	}

	render() {
		const { className, expanded, collapse, expand } = this.props
		return (
			<>
				<ReposList data={this.getRenderedItems()} />
				<button className={className} onClick={expanded ? collapse : expand}>
					{expanded ? 'See less' : 'See more'}
				</button>
			</>
		);
	}
}

const HocApp = styled(UnstyledHocApp)`
		background-color:${props => props.theme.secondaryColor};
		border-radius: ${props => props.theme.radius};
		outline:none;
`;
const App = withExpand(HocApp)
export default App;

