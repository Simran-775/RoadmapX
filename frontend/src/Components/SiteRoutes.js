import { Routes,Route } from "react-router-dom";
import TakeInput from "./TakeInput";
import Login from "./Register";
import Signup from "./Signup";
import Home from "./Home";

function SiteRoutes(){
    return(
        <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/form" element={<TakeInput/>}></Route>
            <Route path="/register" element={<Login/>}></Route>
            <Route path="/signup" element={<Signup/>}></Route>
        </Routes>
    )
}

export default SiteRoutes