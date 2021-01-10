import React from 'react';
import './sign-up.scss';

import FormInput from '../form-input/form-input.jsx';
import CustomButton from '../custom-button/custom-button.jsx';
import { auth, createUserProfileDocument } from '../../firebase/firebase.utils.js';

class SignUp extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            displayName: '',
            email: '',
            password: '',
            confirmPassword: ''
        }
    }

    handleSubmit = async (event) => {
        event.preventDefault();
        const {displayName, email, password, confirmPassword} = this.state;
        //verifica se as senhas sao iguais
        if(password !== confirmPassword){
            alert("passwords don't match");
            return;
        }

        try{
            //cria novo usuario no banco de dados
            const {user} = await auth.createUserWithEmailAndPassword(email, password);
            //cria o userDocument
           await createUserProfileDocument(user, {displayName});

           //seta o estado com string vazias para limpar o form
           this.setState({
               displayName: '',
               email: '',
               password: '',
               confirmPassword: ''
           })

        }catch(error){
            //imprime erro no console
            console.log(error);
        }
    };

    handleChange = (event) => {
        //funçao que atualiza os dados do state sempre que os dados do input mudarem
        const {name, value} = event.target;
        this.setState({[name]: value});
    }

    render(){
        const {displayName, email, password, confirmPassword } = this.state;

        return(
            <div className='sign-up'>
                <h2 className='title'>I do not have an account</h2>
                <span>sign up with your email and password</span>
                <form className='sign-up-form' onSubmit={this.handleSubmit}>
                    <FormInput
                        type='text'
                        name='displayName'
                        value={displayName}
                        onChange={this.handleChange}
                        label='Display Name'
                        required />

                    <FormInput
                        type='email'
                        name='email'
                        value={email}
                        onChange={this.handleChange}
                        label='Email'
                        required />
                    <FormInput
                        type='password'
                        name='password'
                        value={password}
                        onChange={this.handleChange}
                        label='Password'
                        required />
                    <FormInput
                        type='password'
                        name='confirmPassword'
                        value={confirmPassword}
                        onChange={this.handleChange}
                        label='Confirm Password'
                        required />

                    <CustomButton type='submit'>SIGN UP</CustomButton>
                </form>
            </div>
        );
    }
}

export default SignUp;