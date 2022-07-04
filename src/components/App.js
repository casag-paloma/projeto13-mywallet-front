import { BrowserRouter, Route, Routes } from "react-router-dom";
import SignInPage from "./SignInPage";
import SignUpPage from "./SignUpPage";
import MenuPage from "./MenuPage";
import RevenuePage from "./RevenuePage";
import ExpensePage from "./ExpensePage";

export default function App(){

    return(
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<SignInPage/>}/>
                <Route path="/sign-up" element={<SignUpPage/>}/>
                <Route path="/menu" element={<MenuPage/>}/>
                <Route path="/revenue" element={<RevenuePage/>}/>
                <Route path="/expense" element={<ExpensePage/>}/>
            </Routes>
        </BrowserRouter>
    )
}


