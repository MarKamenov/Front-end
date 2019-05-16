import * as React from 'react';
import styled from 'styled-components';
import {  Box } from 'grid-styled';

export interface IKpiPanelItemProps {
	className?: string;
	title:string
	currency?:boolean;
	content: () => any;
}

const UnstyledKpiPanelItem: React.SFC<any> = ({ className, title, currency, content }) => <Box className={className}>
<Box className='title'>{title}</Box>
<Box>{content} {currency && <span>£GBP</span>} </Box>

</Box>
	

const KpiPanelItem = styled(UnstyledKpiPanelItem)`
	background-color:  ${props=>props.theme.backgroundSecond};
	color:  ${props=>props.theme.foregroundSecond};
	max-width:20%;
	text-align: center;
	padding: 1.25rem 0;
	font-size: 2rem;
	font-weight: bold;
	width:100%;
.title {
font-size:1.2rem;
color:${props=> props.theme.foregroundFirst}
}
.title + div span {
	font-size:.75rem;
	color:${props=> props.theme.foregroundFirst}
}
`;

export default KpiPanelItem;
