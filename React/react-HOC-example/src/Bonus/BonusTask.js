import React, { Component } from 'react';
import { getReactRepositories } from '../index'
import ReposList from '../ReposList';
import styled from '../Theme'
import { WithLoader } from './HocLoader'
import { withExpand } from '../Task2/HocExpand'


const ListWithLoading = WithLoader(ReposList);
const MAX_ITEMS = 4;

class UnstyledHocLoading extends Component {
	constructor(props) {
		super(props)
		this.state = {
			repos: [],
			loading: false
		}
	}

	async componentDidMount() {
		this.setState({ loading: true });
		const repos = await getReactRepositories()
		this.setState({ repos, loading: false })
	}

	getRenderedItems = () => {
		const initRepos = this.state.repos.slice(0, MAX_ITEMS);
		return this.props.expanded ? initRepos : initRepos.slice(0, this.props.reposToShow)
	}

	render() {
		const { className, expanded, collapse, expand } = this.props
		return (
			<div className={className}>
				<ListWithLoading data={this.getRenderedItems()} isLoading={this.state.loading} />
				<button onClick={expanded ? collapse : expand}>
					{expanded ? 'See less' : 'See more'}
				</button>
			</div>
		);
	}
}

const HocLoading = styled(UnstyledHocLoading)`
	ul {
	width:30vw;
	padding-left: 30px;
	list-style-type: square;
	border: 2px solid blue;
  background-color: lightblue;
	}
	button {
		background-color:${props => props.theme.secondaryColor};
		border-radius: ${props => props.theme.radius};
		outline:none;
	}
`;
const AppLoading = withExpand(HocLoading)
export default AppLoading;

