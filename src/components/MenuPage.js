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

    const [ data, setData] = useState([]);
    const [ user, setUser] = useState([]);
    let balance = 0;
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

    function renderBalance(){
        let color;

        const valuesList = data.map(e =>{
            if(e.type === 'revenue') return e.value*1
            else return (e.value *(-1))
        })
        console.log(valuesList)

        for(let i =0; i < valuesList.length; i++){
            balance+= valuesList[i]
        }

        if(balance >= 0) color = true;
        else color = false;
        console.log(color, balance)

        return (
            <>
                <p>SALDO</p>
                <h6 color={color}>{balance.toFixed(2).replace('.',',')}</h6>
            </>)
    }

    const mybalance = renderBalance()

    function renderFiles(){

        if(data.length != 0 ) {

            const dataList= data.map((e, index) => {
                if(e.type === 'revenue'){
                    return {...e, isRevenue: true}
                } else{
                    return {...e, isRevenue: false}
                }
            })

            return(
                <MyFiles>
                    {dataList.map((e, index) => <File key={index} date={e.date} description={e.description} value={e.value} type={e.type} isRevenue={e.isRevenue}/>)}
                    <MyBalance>{mybalance}</MyBalance>
                </MyFiles>
            )

        }else{
            return(
                <NoFiles>
                    <p> Não há registros de entrada ou saída</p>
                </NoFiles>

            ) 
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
                <MyFilesBox> {myFiles}</MyFilesBox>
                <div>
                    <NavLink to='/revenue'>
                    <ion-icon name="add-circle-outline"></ion-icon>
                    <p> Nova entrada</p>
                    </NavLink>
                    <NavLink to='/expense'>
                    <ion-icon name="remove-circle-outline"></ion-icon>                   
                    <p> Nova saída</p>
                    </NavLink>
                </div>
            </Container>

        </>
    )
}

function File({date, description, value, type, isRevenue}){
    
    const numberValue = Number(value).toFixed(2)
    console.log(type, isRevenue, value, typeof(value), numberValue)
    
    return (
        <MyFile> 
            <Date>{date}</Date>
            <Description>{description}</Description>
            <Value color={isRevenue}> {numberValue.replace('.',',')}</Value>
        </MyFile>
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

    div{
        width:100%;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
    }

`
const Title = styled.div`
    width: 100%;
    margin: 25px auto 22px auto;

    font-family: 'Raleway';
    font-style: normal;
    font-weight: 700;
    font-size: 26px;
    line-height: 31px;
    color: #FFFFFF;
    
    display: flex;
    flex-direction: row;
    justify-content: space-between;

    ion-icon{
        color: #FFFFFF;
        width: 23px;
        height: 24px;
    }

`
const NavLink = styled(Link)`
    box-sizing: border-box;

    display:flex;
    flex-direction:column;
    justify-content: space-between;

    width: 155px;
    height: 114px;
    
    background: #A328D6;
    border-radius: 5px;

    font-family: 'Raleway';
    font-style: normal;
    font-weight: 700;
    font-size: 17px;
    line-height: 20px;
    text-decoration: none;
    color: #FFFFFF;

    ion-icon{
        margin: 9px 0 0 10px;
        width: 22px;
        height: 22px;
        color: #FFFFFF;
    }

    p{
        width: 64px;
        margin: 0 0 9px 10px;
    }

`
const NoFiles = styled.div`
    display: flex;
    align-items: center;
    margin: auto 73px auto 73px;

    p{
        width: 100%;
        font-family: 'Raleway';
        font-style: normal;
        font-weight: 400;
        font-size: 20px;
        line-height: 23px;
        text-align: center;

        color: #868686;


    }

`
const MyFilesBox = styled.div`
    width: 326px;
    min-height: 446px;
    
    background: #FFFFFF;
    border-radius: 5px;
    margin-bottom: 13px;

    display: flex;
    justify-content: center;
    align-items: flex-start;
    position: relative;
`

const MyFiles = styled.div`
    box-sizing: border-box;
    width: 100%;
    padding: 23px 11px 20px 12px;
    display:flex;
    flex-direction: column;
    flex-wrap: wrap;

`
const MyFile = styled.div`
    height: 20px;
    margin-bottom: 18px;
`
const Date = styled.p`
    width: 48px;
    font-family: 'Raleway';
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 19px;

    color: #C6C6C6;
`
const Description = styled.p`
    width:193px;
    font-family: 'Raleway';
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 19px;
    text-align: start;

    color: #000000;

`
const Value = styled.p`
    width: 50px;
    font-family: 'Raleway';
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 19px;
    text-align: right;

    color: ${props => props.color? '#03AC00': '#C70000'};


`
const MyBalance = styled.div`
background-color:green;
    display:flex;
    flex-direction: row;
    position: absolute;
    bottom: 10px;
    left: 15px;

    p{

        font-family: 'Raleway';
        font-style: normal;
        font-weight: 700;
        font-size: 17px;
        line-height: 20px;
            
        color: #000000;
    }

    h6{

        font-family: 'Raleway';
        font-style: normal;
        font-weight: 400;
        font-size: 17px;
        line-height: 20px;
        text-align: right;

        color: ${props => props.color? '#C70000': ''};
    }

`