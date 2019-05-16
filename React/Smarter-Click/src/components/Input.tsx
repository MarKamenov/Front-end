import * as React from 'react';
import styled from 'styled-components';
import { Flex } from 'grid-styled';

interface INavBarProps {
	className?: string;
	name:string;
	type:string;
	value:string;
	onChange: (value: any) => void;
	label?:string
}

const UnstyledInput:React.SFC<INavBarProps> = ({className, name, type, value, onChange, label}) => (
            <Flex justifyContent='space-between'>
                <label htmlFor="new-email">{label}</label>
                <input
                    className={className}
                    onChange={onChange}
                    name={name}
                    id={name}
                    type={type}
                    value={value} />
            </Flex>
)
const Input = styled(UnstyledInput)`
:invalid {
  background-color: ${props=>props.theme.foregroundError};
}
:valid {
  background-color: ${props=>props.theme.foregroundSuccess};
}

`

export default Input;
 
   
 
