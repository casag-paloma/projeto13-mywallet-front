import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useState } from "react";
import SignInPage from "./SignInPage";
import SignUpPage from "./SignUpPage";
import MenuPage from "./MenuPage";
import RevenuePage from "./RevenuePage";
import ExpensePage from "./ExpensePage";
import TokenContext from "../contexts/TokenContext";
import GlobalStyle from "./globalStyle";

export default function App(){

    const [token, setToken] = useState("");

    return(
        <TokenContext.Provider value={{token, setToken}}>
            <GlobalStyle/>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<SignInPage/>}/>
                    <Route path="/sign-up" element={<SignUpPage/>}/>
                    <Route path="/menu" element={<MenuPage/>}/>
                    <Route path="/revenue" element={<RevenuePage/>}/>
                    <Route path="/expense" element={<ExpensePage/>}/>
                </Routes>
            </BrowserRouter>
        </TokenContext.Provider>
    )
}


