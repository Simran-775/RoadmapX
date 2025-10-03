import {Link, Links, useNavigate} from 'react-router-dom'
function Navbar(){
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
        <nav>
            <div className="site-logo">RoadmapX</div>
            <ul className="nav-links">
                <li><Link to="/">Home</Link></li>
                <li><Link to="/roadmap"> Create Roadmap</Link></li>
                {/* <li><Link to="/register">Register</Link></li>
                <li><Link to="/signup">Contact</Link></li> */}
            </ul>
            <div className="auth-buttons">
                <button className="btn login" onClick={handlelogin}>Login</button>
                <button className="btn signup" onClick={handlesignup}>Sign Up</button>
            </div>
        </nav>

    {/* <main>
        <section id="home" className="hero-section">
            <h1>RoadmapX: Build Your Future</h1>
            <p>Join us for an exciting hackathon to innovate, collaborate, and create!</p>
            <button className="btn primary-btn">Register Now!</button>
        </section>

        <section id="roadmap" className="content-section">
            <h2>Our Journey: Roadmap</h2>
            <div className="roadmap-item">
                <h3>Phase 1: Registration Opens</h3>
                <p>Date: October 1 - November 1</p>
                <p>Secure your spot and start forming your teams!</p>
            </div>
            <div className="roadmap-item">
                <h3>Phase 2: Hackathon Begins</h3>
                <p>Date: November 15</p>
                <p>Dive into coding, get mentorship, and develop your ideas.</p>
            </div>
            <div className="roadmap-item">
                <h3>Phase 3: Submissions & Judging</h3>
                <p>Date: December 1 - December 5</p>
                <p>Submit your projects for evaluation by our expert panel.</p>
            </div>
            <div className="roadmap-item">
                <h3>Phase 4: Winners Announced</h3>
                <p>Date: December 10</p>
                <p>Celebrate innovation and discover the winning teams!</p>
            </div>
        </section>

        <section id="register" className="content-section">
            <h2>Register for RoadmapX</h2>
            <form className="registration-form">
                <label for="name">Full Name:</label>
                <input type="text" id="name" name="name" required>

                <label for="email">Email:</label>
                <input type="email" id="email" name="email" required>

                <label for="team">Team Name (Optional):</label>
                <input type="text" id="team" name="team">

                <label for="skills">Key Skills (e.g., React, Python):</label>
                <input type="text" id="skills" name="skills">

                <button type="submit" className="btn primary-btn">Submit Registration</button>
            </form>
        </section>

        <section id="contact" className="content-section">
            <h2>Get in Touch</h2>
            <p>Have questions? Reach out to us!</p>
            <p>Email: <a href="mailto:info@roadmapx.com">info@roadmapx.com</a></p>
            <p>Follow us on: [Social Media Icons/Links]</p>
        </section>
    </main> */}

    

    </header>
        </>
    )
}
export default Navbar