import { Routes,Route } from "react-router-dom";
import TakeInput from "./TakeInput";

import Home from "./Home";

function SiteRoutes(){
    return(
        <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/form" element={<TakeInput/>}></Route>

        </Routes>
    )
}

export default SiteRoutes