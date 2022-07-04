import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import styled from 'styled-components';
import {createGlobalStyle} from 'styled-components';
import axios from 'axios';

export default function SignUpPage(){

    const URL = 'https://back-projeto13-mywallet-paloma.herokuapp.com/sign-up'
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

        const promise = axios.post(URL, formData);

        promise.then(handleSuccess);
        promise.catch(handleError);
    }

    function handleSuccess(response){
        navigate('/')
    };

    function handleError(err){
        alert(err.response.data)
        setLoading(false);
    }
    
    function renderForm(){
        
        return(
            <FormData onSubmit={signUp}>
                <input disabled={loading} type='text' placeholder='Nome' value={name} onChange={(e) => setName(e.target.value) } required />
                <input disabled={loading} type='email' placeholder='E-mail' value={email} onChange={(e) => setEmail(e.target.value) } required/>
                <input disabled={loading} type='password' placeholder='Senha' value={password} onChange={(e) => setPassword(e.target.value) } required />
                <input disabled={loading} type='password' placeholder='Confirme a senha' value={password2} onChange={(e) => setPassword2(e.target.value) } required />
                <button type='submit' disabled={loading} > Cadastrar </button>
            </FormData>
        )
    }

    const signUpForm = renderForm();


    return(
        <Container>
            <LocalStyle/>
            <Logo>My Wallet</Logo>
            <div> {signUpForm}</div>
            <BottomLink to='/'>
                <p> Já tem uma conta? Entre agora!</p>
            </BottomLink>
        </Container>
    )

};

const LocalStyle = createGlobalStyle`
body {
    background-color: #8C11BE;
;
}
`
const Container = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content:center;
    align-items: center;

`
const Logo = styled.div`
    margin: 95px auto 28px auto;

    font-family: 'Saira Stencil One';
    font-style: normal;
    font-weight: 400;
    font-size: 32px;
    line-height: 50px;

    color: #FFFFFF;
`
const FormData = styled.form`
    display:flex;
    flex-direction:column;
    margin-bottom: 32px;

    input{

        box-sizing: border-box;

        width: 326px;
        height: 58px;

        background-color: #FFFFFF;
        border: none;
        border-radius: 5px;
        margin-bottom: 13px;
        padding-left: 15px;

        font-family: 'Raleway';
        font-style: normal;
        font-weight: 400;
        font-size: 20px;
        line-height: 23px;
                    
        color: #000000;
        

        ::placeholder{

            font-family: 'Raleway';
            font-style: normal;
            font-weight: 400;
            font-size: 20px;
            line-height: 23px;
                    
            color: #000000;
        }
    }

    button{

        width: 326px;
        height: 46px;        
        background: #A328D6;
        border: none;
        border-radius: 5px;
    
        font-family: 'Raleway';
        font-style: normal;
        font-weight: 700;
        font-size: 20px;
        line-height: 23px;

        color: #FFFFFF;
        :hover{
            cursor: pointer;
        }

    }

`
const BottomLink = styled(Link)`
 text-decoration: none;

 p{
        width: 227px;
        height: 18px;
            
        font-family: 'Raleway';
        font-style: normal;
        font-weight: 700;
        font-size: 15px;
        line-height: 18px;
        color: #FFFFFF;

        :hover{
            cursor: pointer;
        }
    }
`

