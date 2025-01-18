import React from 'react'
import { render } from 'react-dom'
import axios from 'axios'
import TaskDescription from './TaskDescription'
import { ThemeProvider, theme } from './Theme';

const SEARCH_ENDPOINT = 'https://api.github.com/search/repositories?q=react';

export const getReactRepositories = async () => axios.get(SEARCH_ENDPOINT) // eslint-disable-line
  .then((result) => result.data.items)
  .then((repos) => repos.map(({ forks, name, stargazers_count, html_url }) => ({
    forks,
    name,
    stars: stargazers_count,
    url: html_url,
  })));

const App = () => <ThemeProvider theme={theme}><TaskDescription /></ThemeProvider>;

render(<App />, document.getElementById('root'));
