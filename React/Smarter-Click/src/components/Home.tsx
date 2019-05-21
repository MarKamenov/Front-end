import * as React from 'react';
import styled from 'styled-components';
import {Flex } from 'grid-styled';
import * as smart from "../assets/smart-click.png"

export interface IHomeProps {
	className?: string;
}

const HomePage: React.SFC<IHomeProps> = ({className}) => (
		<Flex className={className} flexDirection='column' justifyContent='center'>
       <h1 style={{backgroundColor:"#7EA0B7", marginTop:"0"}}><img role="img" src={smart} alt="logo"/></h1>
      <h2>Smarter Click</h2>
		</Flex>
);

export default styled(HomePage)`
h2 {
	font-weight:bold;
	color: ${props=>props.theme.foregroundFourth};
	align-self:center;
}
`
