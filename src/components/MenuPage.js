import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import axios from 'axios'
import styled from "styled-components";
import { createGlobalStyle } from "styled-components";
import TokenContext from '../contexts/TokenContext';

export default function MenuPage(){

    const URL = 'http://localhost:5000/'

    const {token} = useContext(TokenContext);
    
    const config = {
    headers: {
        "Authorization": `Bearer ${token}`
    }}

    const [ data, setData] = useState('');
    const [ user, setUser] = useState([]);
    const [ loading, setLoading ] = useState(false);

    useEffect(() => {
        const promise = axios.get(URL, config);

        promise.then(handleSucessGetList)
        promise.catch(handleError)

    }, [])

    function handleSucessGetList(response){
        console.log(response.data)
        setUser(response.data.name)
        setData(response.data.files)
    }

    function handleError(err){
        console.log(err.response.data)
    }

    function renderFiles(){
        if(data.length === 0 ) return <p> Não há registros de
        entrada ou saída</p>
        else{
            return
            <></>
        }
    }

    const myFiles = renderFiles()
    
    return(
        <>
            <LocalStyle/>
            <Container>
                <Title> 
                    <h1> Olá, {user} </h1>
                    <Link to='/'>
                        <ion-icon name="log-out-outline"></ion-icon> 
                    </Link>
                </Title>
                <div> {myFiles}</div>
                <div>
                    <Link to='/revenue'>
                    <ion-icon name="add-circle-outline"></ion-icon>
                    <p> Nova entrada</p>
                    </Link>
                    <Link to='/expense'>
                    <ion-icon name="remove-circle-outline"></ion-icon>                   
                    <p> Nova saída</p>
                    </Link>
                </div>
            </Container>

        </>
    )
}


const LocalStyle = createGlobalStyle`
body {
    background-color: #F2F2F2;

    font-family: 'Lexend Deca';
    font-style: normal;
    font-weight: 400;
}
`

const Container = styled.div`
    width: 100%;
    margin: 70px auto 105px auto;
    display: flex;
    flex-direction: column;
    align-items: center;

`
const Title = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 28px 17px 20px 17px;

    h1{
        font-size: 23px;
        line-height: 29px;
        margin-left: 17px;

        color: #126BA5;
    }

    button{
        width: 40px;
        height: 35px;
        padding: 0;
        margin-right: 17px;
    
        background: #52B6FF;
        border-radius: 5px;

        font-size: 27px;
        text-align: center;

        color: #FFFFFF;

        :hover{
            cursor: pointer;
        }
    }

`

