import * as styledComponents from 'styled-components';

const { default: styled, css, keyframes, ThemeProvider } = styledComponents;

export const appColors = ['#EDF3F9', '#F0F6FC', '#80A4CE', '#4E96DD', '#2B67AD', '#7EA0B7', '#9BC1BC', '#D39292'];

export const theme = {
	backgroundFirst: appColors[0],
	backgroundSecond: appColors[1],
	foregroundFirst: appColors[2],
	foregroundSecond: appColors[3],
	foregroundThird: appColors[4],
	foregroundFourth: appColors[5],
	foregroundSuccess: appColors[6],
	foregroundError: appColors[7],
	radius: '5px',
	menuBoxShadow: '0px 0px 8px #80A4CE',
};

export { css, keyframes, ThemeProvider };
export default styled;
