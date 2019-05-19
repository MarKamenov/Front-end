import * as styledComponents from 'styled-components';

const { default: styled, css, keyframes, ThemeProvider } = styledComponents;

export const appColors = ['#001e2d', '#d9e021','#F6F7F9'];

export const theme = {
	bckgColor: appColors[0],
	textHighLightColor: appColors[1],
	bckgGreyColor:appColors[2],
	radius: '5px',
};

export { css, keyframes, ThemeProvider };
export default styled;
