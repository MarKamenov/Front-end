import * as styledComponents from 'styled-components';

const { default: styled, css, keyframes, ThemeProvider } = styledComponents;

export const appColors = ['#152F4E', '#22D1C8', '#eb5d13', '#f9b000', '#0C1C30', '#86878c'];

export const theme = {
	primaryColor: appColors[0],
	secondaryColor: appColors[1],
	tertiaryColor: appColors[2],
	radius: '10px',
};

export { css, keyframes, ThemeProvider };
export default styled;
