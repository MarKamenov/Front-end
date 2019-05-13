import React, { Component } from 'react';
import { getReactRepositories } from '../index'
import  ReposList  from '../ReposList';

class App extends Component {
	constructor(props){
		super(props)
		this.state = {
			repos: [],
		}
	}

	async componentDidMount(){
		const repos = await getReactRepositories()
		this.setState({repos})
	}


  render() {
		const {repos} = this.state;	
    return (
				<ReposList data={repos}/>	
    );
  }
}

export default App;

