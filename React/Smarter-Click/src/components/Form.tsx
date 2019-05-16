import * as React from 'react';
import Input from './Input'
import styled from 'styled-components';
import { Flex } from 'grid-styled';


interface ILoginProps {
	className?: string;
}

interface ILoginState {
	email: string
	password:string;
}


class UnstyledLoginPage extends React.Component<ILoginProps, ILoginState>{
    constructor(props:ILoginProps) {
        super(props);

        this.state = {
            email: '',
            password: ''
        };
    }

    public onChangePasswordHandler = (e:React.ChangeEvent<HTMLInputElement>) => {
			const target = e.target;
            const value = target.value;

                this.setState({
                    password: value
                });
    }

    public onChangeEmailHandler = (e:React.ChangeEvent<HTMLInputElement>) => {
			const target = e.target;
            const value = target.value;

                this.setState({
                    email: value
                });
    }

    public onSubmitHandler = (e:any) => {
        e.preventDefault();
     		 console.log(this.state)  
    }

    public render() {
        return ( 
            <Flex justifyContent='center'>        
            <form className={this.props.className}>
              <ul className="wrapper">
                <li className="form-row">
                  <Input
                       name="email"
                       type="email"
                       value={this.state.email}
                       onChange={this.onChangeEmailHandler}
                       label="E-mail"
                    />
                </li>
                <li className="form-row">
                  <Input
                        name="password"
                        type="password"
                        value={this.state.password}
                        onChange={this.onChangePasswordHandler}
                        label="Password"
                    />
                </li>
                <li className="form-row">
                <Flex className='submit-button' justifyContent='flex-end'>
                  <button type="submit">Submit</button>
                  </Flex>
                </li>
              </ul>
            </form>
            </Flex>
        );
    }
}
const LoginPage = styled(UnstyledLoginPage)`
 .wrapper {
    background-color:  ${props=>props.theme.backgroundSecond};
    list-style-type: none;
    padding: 15px;
    border-radius:${props=>props.theme.radius};
    width:300px; 
  }
  .form-row {
    padding: .5em;
  }
 
  .form-row > input {
    flex: 2;
  }

  .form-row > label {
    padding: .5em 1em .5em 0;
    flex: 1;
  }

  .form-row > input,
  .form-row > button {
    padding: .5em;
  }
  .submit-button button {
   background-color: ${props=>props.theme.foregroundFourth};
   padding: .5em;
   color: white;
   border: 0;
  }
`
export default LoginPage;