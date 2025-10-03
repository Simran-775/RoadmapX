import { useNavigate } from 'react-router-dom';
import '../styles/home.css';
function Home()
{
    const navigate = useNavigate()
    function handleClick()
    {
        navigate("/form")
    }
    return(
        <>
        
    <div className="roadmap-page-background"> {/* This div creates the overall starry background */}
        <div className="roadmap-main-card">
            <div className="roadmap-intro-text">
                <h1>Dreaming bigger, but don’t know the way?</h1>
                <p>Bridge skill gaps, seize opportunities, and grow with an AI-powered development plan.</p>
            </div>

            <div className="roadmap-steps-container">
                <div className="roadmap-step-item">
                    <div className="step-icon">
                        {/* Placeholder for Flag Icon - you'd use an SVG or FontAwesome/ReactIcon here */}
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M5 21V5C5 4.46957 5.21071 3.96086 5.58579 3.58579C5.96086 3.21071 6.46957 3 7 3H16L17 5L16 7H7V14H14L15 16L14 18H7V21H5Z" fill="#6a5acd"/>
                        </svg>
                    </div>
                    <div className="step-content">
                        <h3>Set Milestones</h3>
                        <p>Break down tasks, point at manageable phases.</p>
                    </div>
                </div>

                <div className="roadmap-step-item">
                    <div className="step-icon">
                        {/* Placeholder for Rocket Icon - you'd use an SVG or FontAwesome/ReactIcon here */}
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 2C9.24 2 7 4.24 7 7C7 9.88 12 16 12 16S17 9.88 17 7C17 4.24 14.76 2 12 2ZM12 9C10.9 9 10 8.1 10 7C10 5.9 10.9 5 12 5C13.1 5 14 5.9 14 7C14 8.1 13.1 9 12 9ZM12 17C12 17 5 22 5 22H19C19 22 12 17 12 17Z" fill="#6a5acd"/>
                        </svg>
                    </div>
                    <div className="step-content">
                        <h3>Visualize & Share</h3>
                        <p>Generate your roadmap and collaborate</p>
                    </div>
                </div>
            </div>

            <button className="btn btn-primary roadmap-cta-button" onClick={handleClick}>Start Building Your Roadmap</button>
        </div>
    </div>



        </>
    )
}
export default Home