import * as React from 'react';
import styled from 'styled-components';
import { Flex, Box } from 'grid-styled';
import classNames from 'classnames';

export interface ICheckboxProps extends React.InputHTMLAttributes<any> {
	checked?: boolean;
	className?: string;
	name?: string;
	label?: string;
}

const UnstyledCheckbox = ({
	disabled = false,
	checked,
	className,
	name,
	label,
	onChange,
	...rest
}: ICheckboxProps) => (
	<label className={classNames(className, 'field')} {...rest}>
		<Flex my={3} alignItems="center">
			<input type="checkbox" {...{ disabled, checked, name, onChange }} />
			<Box className='box' />
			{label && <Box className='label'>{label}</Box>}
		</Flex>
	</label>
);

const StyledCheckbox = styled(UnstyledCheckbox)`
	display: block;
	&:hover {
			cursor: pointer;
		}
	.box {
		margin-right: 0.5rem;
		width: 15px;
		height: 15px;
		border: 1px solid grey;
		border-radius: 2px;
		border-radius:${props=>props.theme.radius};
		transition: background-color 200ms;
	}

	input {
		height: 0;
		width: 0;
		visibility: hidden;
		position: absolute;
	}

	.label {
		color:black;
	}

	input:checked + .box {
		position: relative;
		border-color: transparent;
		background-color:${props=>props.theme.bckgColor};
	}
`;

export default StyledCheckbox;
