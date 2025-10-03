import { useState } from "react";
import { toast } from "react-toastify";
import axios from 'axios';

function TakeInput() {
    const [target_role, settarget_role] = useState("");
    const [leadership, setleadership] = useState(null);
    const [skills, setskills] = useState("");
    const [availproj, setavailproj] = useState("");
    const [resume, setresume] = useState(null);
    const [remarks, setremarks] = useState("");
    const [accom, setaccom] = useState("");
    const [resumeFileName, setResumeFileName] = useState("No file chosen"); // State for file name display

    async function handleSubmit(e){
        e.preventDefault();
        try {
            const formdata = new FormData();
            if(resume !== null) {
                formdata.append("resume", resume);
            }
            formdata.append("skills", skills);
            formdata.append("availproj", availproj);
            formdata.append("leadership", leadership);
            formdata.append("remarks", remarks);
            formdata.append("accom", accom);
            formdata.append("target_role", target_role);
            
            const resp = await axios.post("http://localhost:5000", formdata);
            
            if (resp.data.success === 1) {
                toast.success("Details added successfully!");
                // Optionally clear form fields here
                settarget_role("");
                setleadership(null);
                setskills("");
                setavailproj("");
                setresume(null);
                setResumeFileName("No file chosen");
                setremarks("");
                setaccom("");
            } else if (resp.data.success === 0) {
                toast.info("Details not updated.");
            } else {
                toast.error("Some error occurred, please try again.");
            } 
        } catch (error) {
            console.error("Submission error:", error);
            toast.error("Network error or server issue.");
        }
    }

    const handleResumeChange = (e) => {
        const file = e.target.files[0];
        setresume(file);
        setResumeFileName(file ? file.name : "No file chosen");
    };

    return (
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
                    <label htmlFor="skills">Skills</label>
                    <textarea 
                        id="skills" 
                        placeholder="Enter in comma separated format (e.g., React, Node.js, Python)" 
                        value={skills} 
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
                        value={availproj} 
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
                    <label htmlFor="accom">Accomplishments (Awards, titles, or significant impacts)</label>
                    <textarea 
                        id="accom" 
                        placeholder="List your accomplishments here." 
                        value={accom} 
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
    );
}
export default TakeInput;