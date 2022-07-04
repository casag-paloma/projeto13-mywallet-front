import { useNavigate } from 'react-router-dom';
import { useState, useContext } from 'react';
import styled from 'styled-components';
import {createGlobalStyle} from 'styled-components';
import axios from 'axios';
import TokenContext from '../contexts/TokenContext';


export default function ExpensePage(){

    const URL = 'https://back-projeto13-mywallet-paloma.herokuapp.com/expense'

    const [value, setValue] = useState("");
    const [description, setDescription] = useState("");

    const {token} = useContext(TokenContext);
    
    const config = {
    headers: {
        "Authorization": `Bearer ${token}`
    }}
    
    const [loading, setLoading] = useState(false);
    
    let navigate = useNavigate();

    function postRevenue(e){
        e.preventDefault();
        setLoading(true)
        
        const formData = {
            value,
            description,
            type: 'expense'
        }

        const promise = axios.post(URL, formData, config);
        promise.then(handleSuccess);
        promise.catch(handleError);
    }

    function handleSuccess(response){
        navigate('/menu')
    };

    function handleError(err){
        alert(err.response.data)
        setLoading(false);
    }

    function renderRevenueForm(){
        
        return(
            <FormData onSubmit={postRevenue}>
                <input disabled={loading} type='number' placeholder='Valor' value={value} onChange={(e) => setValue(e.target.value) } required/>
                <input disabled={loading} type='text' placeholder='Descrição' value={description} onChange={(e) => setDescription(e.target.value) } required />
                <button type='submit' disabled={loading} > Salvar saída </button>
            </FormData>
        )
    }

    const RevenueForm = renderRevenueForm();


    return(
        <Container>
            <LocalStyle/>
            <Title>Nova saída</Title>
            <div> {RevenueForm}</div>
        </Container>
    )

}

const LocalStyle = createGlobalStyle`
body {
    background-color: #8C11BE;
    display:flex;
    justify-content: center;
}
`
const Container = styled.div`
    width: 326px;
    display: flex;
    flex-direction: column;
    justify-content:center;
    align-items: center;

`
const Title = styled.div`
    width: 100%;
    margin: 25px auto 40px auto;

    font-family: 'Raleway';
    font-style: normal;
    font-weight: 700;
    font-size: 26px;
    line-height: 31px;
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