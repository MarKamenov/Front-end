import * as React from 'react';
import styled  from 'styled-components';
import { Box, Flex } from 'grid-styled';
import * as arrow from '../assets/arrow-icon.png'

export interface IAccordionProps {
	children?: any;
	className?: string;
	initOpen?: boolean;
	title?:string;
}

export interface IAccordionState {
	open?: boolean;
}

class UnstyledAccordion extends React.PureComponent<IAccordionProps, IAccordionState> {
	constructor(props: IAccordionProps) {
		super(props);
		this.state = { open: props.initOpen ? true : false };
	}

	public toggleOpen = () => {
		this.setState({ open: !this.state.open });
	};

	public render() {
		const { children, className, title, initOpen, ...rest } = this.props;
		const { open } = this.state;
		return (
			<Box {...rest} className={className} >
				<Flex p={3} 
					className='click-title'
					justifyContent='space-between' 
					alignItems='center'  
					onClick={this.toggleOpen}>
				<Box className='accordion-title'>{title}</Box>
				<Box>
					<img className={open ? 'open' : ''} role="img" src={arrow} alt="arrow icon"/>
				</Box>
				</Flex>
				<Box className={`accordionContent ${open ? 'accordionOpen' : 'accordionClosed'}`}>
					<Box className={'accordionChildrenContainer'}>{children}</Box>
				</Box>
			</Box>
		);
	}
}

const Accordion = styled(UnstyledAccordion)`
	overflow: hidden;
	img {
		width:15px;
		height:15px;
		transition: transform 0.4s;
		transform: rotate(-90deg);
	}
	.open {
			transform: rotate(0deg);
		}

	.click-title {
		cursor: pointer;
	}

	.accordionContent {
		overflow: hidden;
	}
.accordion-title {
	font-size:1.2rem;
	font-weight:bold;
}
	.accordionClosed {
		max-height: 0;
		transition: max-height 0.5s cubic-bezier(0.5, 0.5, 0, 0.7);
	}
	.accordionOpen {
		max-height: 500px;
		transition: max-height 0.5s cubic-bezier(0.7, 0, 0.5, 0.5);
	}
`;

export default Accordion;
