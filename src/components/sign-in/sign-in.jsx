import React from 'react';

import FormInput from '../../components/form-input/form-input.jsx';
import CustomButton from '../custom-button/custom-button.jsx';
import { auth, signInGoogle} from '../../firebase/firebase.utils.js';
import './sign-in.scss';

class SignIn extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            email: '',
            password: ''
        };
    }

    handleSubmit = async (event) => {
        event.preventDefault();

        const { email, password } = this.state;

        try{
            //tenta fazer login com email e senha
            await auth.signInWithEmailAndPassword(email, password);
            //se o login for bem sucedido limpa o state
            this.setState({email: '', password: ''});
        }catch(error){
            //caso aconteça error mostra mensagem ao usuario informando o erro 
            alert('sign in failed');
            console.log(error);
        }


        
    }

    handlechange = (event) => {
        //funçao que atualiza os dados do state sempre que os dados do input mudarem
        const {value, name} = event.target;
        this.setState({[name]: value});
    }

    render(){
        
        return (
            <div className='sign-in'>
                <h2>I  already have an account</h2>
                <span>sign in with your email and password</span>

                
                <form onSubmit={this.handleSubmit}>
                    <FormInput 
                        name='email' 
                        type='email'
                        handleChange={this.handlechange} 
                        value={this.state.email} 
                        label='Email'
                        required/>
            
                    <FormInput 
                        name='password' 
                        type='password'
                        handleChange={this.handlechange} 
                        value={this.state.password}
                        label='Password' 
                        required/>

                    <div className='buttons'>
                        <CustomButton type='submit'> Sign In </CustomButton>
                        <CustomButton onClick={signInGoogle} isGoogleSignIn>
                            Sign In with Google
                        </CustomButton>
                    </div>
                </form>
            </div>
        );
    }
}

export default SignIn;