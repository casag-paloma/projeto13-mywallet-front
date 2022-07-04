import { Link, useNavigate } from 'react-router-dom';
import { useState, useContext } from 'react';
import styled from 'styled-components';
import {createGlobalStyle} from 'styled-components';
import axios from 'axios';
import TokenContext from '../contexts/TokenContext';

export default function SignIpPage(){

    const URL = 'http://localhost:5000/sign-in'
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const {setToken} = useContext(TokenContext);
    
    const [loading, setLoading] = useState(false);
    
    let navigate = useNavigate();

    function signUp(e){
        e.preventDefault();
        setLoading(true)
        
        const formData = {
            email,
            password
        }

        const promise = axios.post(URL, formData);

        promise.then(handleSuccess);
        promise.catch(handleError);
    }

    function handleSuccess(response){
        setToken(response.data.token)
        navigate('/menu')
    };

    function handleError(err){
        alert(err.response.data)
        setLoading(false);
    }
    
    function renderForm(){
        
        return(
            <FormData onSubmit={signUp}>
                <input disabled={loading} type='email' placeholder='E-mail' value={email} onChange={(e) => setEmail(e.target.value) } required/>
                <input disabled={loading} type='password' placeholder='Senha' value={password} onChange={(e) => setPassword(e.target.value) } required />
                <button type='submit' disabled={loading} > Entrar </button>
            </FormData>
        )
    }

    const signUpForm = renderForm();


    return(
        <Container>
            <LocalStyle/>
            <Logo>My Wallet</Logo>
            <div> {signUpForm}</div>
            <BottomLink to='/sign-up'>
                <p> Primeira vez? Cadastre-se!</p>
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
        &&:hover{
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

