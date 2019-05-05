import * as React from 'react';
import App from './App';
import { Provider as MobxProvider } from 'mobx-react';
import { ThemeProvider, theme } from './theme';
import mobxStore from './store';

const AppContainer = () => (
	<MobxProvider {...mobxStore}>
		<ThemeProvider theme={theme}>
			<App />
		</ThemeProvider>
	</MobxProvider>
);

export default AppContainer;
