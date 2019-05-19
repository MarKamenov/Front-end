import * as React from 'react';
import styled from 'styled-components';
import { Flex, Box } from 'grid-styled';
import classNames from 'classnames';

export interface IFormProps {
	children?: any;
	className?: string;
	smallPadding?: boolean;
	initOpen?: boolean;
	title?: string;
}

export interface IFormState {
	open?: boolean;
}

class UnstyledFormExpander extends React.PureComponent<IFormProps, IFormState> {
	constructor(props: IFormProps) {
		super(props);
		this.state = { open: props.initOpen ? true : false };
	}

	public toggleOpen = () => {
		this.setState({ open: !this.state.open });
	};

	public render() {
		const { children, title, className, initOpen, ...rest } = this.props;
		const { open } = this.state;
		const parentClasses = [className, { 'hide-overflow': open }];
		const titleClasses = ['title', { 'title-expanded': open === true, 'title-closed': open === false }];
		const formClasses = ['formContent', { formExpanded: open === true, formClosed: open === false }];
		return (
			<Flex flexDirection="column" {...rest} className={classNames(parentClasses)}>
				<h4 onClick={this.toggleOpen} className={classNames(titleClasses)}>
					{title}
				</h4>
				<Box className={classNames(formClasses)}>
					<Box className={'formContainer'}>{children}</Box>
				</Box>
			</Flex>
		);
	}
}

const FormExpander = styled(UnstyledFormExpander)`
	overflow: hidden;

	&.hide-overflow {
		overflow: visible;
	}

	.title {
		color:${props=>props.theme.bckgColor};
		margin:0;
		cursor: pointer;
	}

	.title-closed::before,
	.title-expanded::before {
		padding-right:.8rem;
	}

	.formContainer {
		padding-left: 2rem;
	}

	.title-closed::before {
		content: '+';
	}

	.title-expanded::before {
		content: '\\2212';
	}

	.formContent {
		overflow: hidden;
	}

	.formClosed {
		max-height: 0;
		transition: max-height 0.5s cubic-bezier(0.5, 0.5, 0, 0.7);
	}
	.formExpanded {
		max-height:500px;
		transition: max-height 0.5s cubic-bezier(0.7, 0, 0.5, 0.5);
		animation-name: toggle;
		animation-fill-mode: forwards;
		animation-delay: 0.5s;
	}
	@keyframes toggle {
		0% {
			overflow: hidden;
		}
		100% {
			overflow: visible;
		}
	}
`;

export default FormExpander;
