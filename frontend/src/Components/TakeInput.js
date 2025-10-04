import { useState } from "react";
import { toast } from "react-toastify";
import axios from 'axios';
// ADD THIS IMPORT:
import RoadmapDisplay from './RoadmapDisplay'; // Assuming RoadmapDisplay.js is in the same directory

function TakeInput() {
    const [target_role, settarget_role] = useState("");
    const [leadership, setleadership] = useState(null);
    const [known_skills, setskills] = useState("");
    const [available_projects, setavailproj] = useState("");
    const [resume, setresume] = useState(null);
    const [generate_roadmap, setGeneratedRoadmap] = useState(null);
    const [remarks, setremarks] = useState("");
    const [accomplishments, setaccom] = useState("");
    const [resumeFileName, setResumeFileName] = useState("No file chosen"); // State for file name display

    async function handleSubmit(e){
        e.preventDefault();
        try {
            const formdata = new FormData();
            if(resume !== null) {
                formdata.append("resume", resume);
            }
            formdata.append("known_skills", known_skills);
            formdata.append("available_projects", available_projects);
            formdata.append("leadership", leadership);
            formdata.append("remarks", remarks);
            formdata.append("accomplishments", accomplishments);
            formdata.append("target_role", target_role);

            const resp = await axios.post("http://localhost:8000/submit", formdata);

            if (resp.data.success === 1) {
                toast.success("Details added successfully!");
                console.log("Roadmap:", resp.data.roadmap); // <- show in UI
                setGeneratedRoadmap(resp.data.roadmap); // you can store it in state
            } else {
                toast.error("Error generating roadmap");
                setGeneratedRoadmap(null); // Clear roadmap on error
            }
        } catch (error) {
            console.error("Submission error:", error);
            toast.error("Network error or server issue.");
            setGeneratedRoadmap(null); // Clear roadmap on network error
        }
    }

    const handleResumeChange = (e) => {
        const file = e.target.files[0];
        setresume(file);
        setResumeFileName(file ? file.name : "No file chosen");
    };

    return (
 
        <div className="app-main-content-wrapper">
            <div className="form-container">
                <form onSubmit={handleSubmit} className="simple-form">
                    <h2>Submit Your Profile Details</h2>

                    <div className="form-group full-width">
                        <label htmlFor="resume-upload">Upload Your Resume (PDF only)</label>
                        <div className="form-control-file-wrapper">
                            <label htmlFor="resume-upload" className="custom-file-button">Choose File</label>
                            <input
                                type="file"
                                id="resume-upload"
                                accept="application/pdf"
                                onChange={handleResumeChange}
                            />
                            <span className="file-name-display">{resumeFileName}</span>
                        </div>
                    </div>

                    <div className="form-group">
                        <label htmlFor="known_skills">known_skills</label>
                        <textarea
                            id="known_skills"
                            placeholder="Enter in comma separated format (e.g., React, Node.js, Python)"
                            value={known_skills}
                            onChange={(e) => setskills(e.target.value)}
                            className="form-control"
                            rows="3"
                        ></textarea>
                    </div>

                    <div className="form-group">
                        <label htmlFor="availproj">Available Projects (Links or descriptions of projects you've worked on)</label>
                        <textarea
                            id="availproj"
                            placeholder="List your projects or portfolios here."
                            value={available_projects}
                            onChange={(e) => setavailproj(e.target.value)}
                            className="form-control"
                            rows="4"
                        ></textarea>
                    </div>

                    <div className="form-group">
                        <label>Done Leadership Before? (Ever led a project?)</label>
                        <div className="radio-group">
                            <label className="radio-label">
                                <input
                                    type="radio"
                                    name="leadership"
                                    checked={leadership === "1"}
                                    value="1"
                                    onChange={(e) => setleadership(e.target.value)}
                                />
                                Yes
                            </label>
                            <label className="radio-label">
                                <input
                                    type="radio"
                                    name="leadership"
                                    value="0"
                                    checked={leadership === "0"}
                                    onChange={(e) => setleadership(e.target.value)}
                                />
                                No
                            </label>
                        </div>
                    </div>

                    <div className="form-group">
                        <label htmlFor="remarks">Remarks (Any feedback from senior employees?)</label>
                        <textarea
                            id="remarks"
                            placeholder="Enter any relevant remarks or feedback."
                            value={remarks}
                            onChange={(e) => setremarks(e.target.value)}
                            className="form-control"
                            rows="3"
                        ></textarea>
                    </div>

                    <div className="form-group">
                        <label htmlFor="accomplishments">Accomplishments (Awards, titles, or significant impacts)</label>
                        <textarea
                            id="accomplishments"
                            placeholder="List your accomplishments here."
                            value={accomplishments}
                            onChange={(e) => setaccom(e.target.value)}
                            className="form-control"
                            rows="4"
                        ></textarea>
                    </div>

                    <div className="form-group">
                        <label htmlFor="target_role">Enter your Target Role</label>
                        <input
                            type="text"
                            id="target_role"
                            placeholder="e.g., Senior Developer, Project Lead"
                            value={target_role}
                            onChange={(e)=>settarget_role(e.target.value)}
                            className="form-control"
                        />
                    </div>

                    <div className="form-action">
                        <input type="submit" className="btn btn-primary" value="Submit Profile" />
                    </div>
                </form>
            </div>

            
            {generate_roadmap ? (
                <RoadmapDisplay roadmap={generate_roadmap} />
            ) : (
                <div className="roadmap-container">No roadmap generated yet.</div>
            )}
        </div>
    );
}
export default TakeInput;