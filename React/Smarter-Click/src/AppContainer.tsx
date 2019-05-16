import * as React from 'react';
import App from './App';
import { ThemeProvider, theme } from './theme';

const AppContainer = () => (
		<ThemeProvider theme={theme}>
			<App />
		</ThemeProvider>
);

export default AppContainer;
