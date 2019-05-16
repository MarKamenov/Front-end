import * as React from 'react';
import styled from 'styled-components';
import { Flex } from 'grid-styled';

export interface IKpiPanelProps {
	className?: string;
	children?: any;
}

const UnstyledKpiPanel: React.SFC<IKpiPanelProps> = ({ className, children }) => (
	<Flex className={className} justifyContent='center' flexDirection="column" alignItems="center">
	<Flex className='wrapper' width={1}  >
		{children}
	</Flex>
	</Flex>
);

const KpiPanel = styled(UnstyledKpiPanel)`
  min-height: 70vh;
.wrapper{
	padding: 2rem;
	display: flex;
  flex-flow: row wrap;
  justify-content: space-evenly;
}	
`;

export default KpiPanel;
