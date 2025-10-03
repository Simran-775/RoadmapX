import {Link, Links, useNavigate} from 'react-router-dom'
function Footer(){
    const navigate = useNavigate()
    function handlelogin()
    {
        navigate("/register")
    }
    function handlesignup()
    {
        navigate("/signup")
    }
    return(
        <>
         <header>
        

    <footer>
        <p>&copy; 2024 RoadmapX. All rights reserved.</p>
    </footer>

    </header>
        </>
    )
}
export default Footer