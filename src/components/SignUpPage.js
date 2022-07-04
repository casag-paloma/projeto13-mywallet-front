import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';

export default function SignUpPage(){

    const URL = 'http://localhost:5000/sign-up'
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [password2, setPassword2] = useState("");

    const [loading, setLoading] = useState(false);
    
    let navigate = useNavigate();

    function signUp(e){
        e.preventDefault();
        setLoading(true)
        
        const formData = {
            name,
            email,
            password,
            password2
        }

        console.log(formData)

        const promise = axios.post(URL, formData);

        promise.then(handleSuccess);
        promise.catch(handleError);
    }

    function handleSuccess(response){
        console.log(response)
        navigate('/')
    };

    function handleError(err){
        console.log(err)
        setLoading(false);
    }
    
    function renderForm(){
        
        return(
            <form onSubmit={signUp}>
                <input disabled={loading} type='text' placeholder='Nome' value={name} onChange={(e) => setName(e.target.value) } required />
                <input disabled={loading} type='email' placeholder='E-mail' value={email} onChange={(e) => setEmail(e.target.value) } required/>
                <input disabled={loading} type='password' placeholder='Senha' value={password} onChange={(e) => setPassword(e.target.value) } required />
                <input disabled={loading} type='password' placeholder='Confirme a senha' value={password2} onChange={(e) => setPassword2(e.target.value) } required />
                <button type='submit' disabled={loading} > Cadastrar </button>
            </form>
        )
    }

    const signUpForm = renderForm();


    return(
        <>
            <div>My Wallet</div>
            <div> {signUpForm}</div>
            <Link to='/'>
                <p> Já tem uma conta? Faça login!</p>
            </Link>
        </>
    )

}