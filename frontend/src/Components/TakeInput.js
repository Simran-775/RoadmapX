import { useState } from "react"
import { toast } from "react-toastify"
import axios from 'axios';
function TakeInput() {
    const [target_role, settarget_role] = useState("")
    const [leadership, setleadership] = useState(null)
    const [skills, setskills] = useState("")
    const [availproj, setavailproj] = useState("")
    const [resume, setresume] = useState(null)
    const [remarks, setremarks] = useState("")
    const [accom, setaccom] = useState([])

    async function handleSubmit(e){
        e.preventDefault();
        try
        {
           const formdata = new FormData();
        if(resume!=null)
        {
            formdata.append("resume",resume)
        }
        
        formdata.append("skills",skills)
        formdata.append("availproj",availproj)
        formdata.append("leadership",leadership)
        formdata.append("remarks",remarks)
        formdata.append("accom",accom)
        formdata.append("target_role",target_role) 
         const resp = await axios.post("http://localhost:5000",formdata)  
         if (resp.data.success === 1) {
                toast.success("Product updated successfully")
            }
            else if (resp.data.success === 0) {
                toast.info("Product not updated")
            }
            else {
                toast.error("Some error occured,try again")
            } 
        }
        catch
        {

        }
        
    }
    return (
        <>
            <div>
                <form onSubmit={handleSubmit}>
                    <div className="">
                        <div className="">
                            <label for="avp">Enter your Resume</label>

                            <input type="file" accept="application/pdf" onChange={(e) => setresume(e.target.files[0])} />
                        </div>
                    </div>
                    
                    
                    <div className="">
                        <div className="">
                            <label for="avp">Skills</label>

                            <textarea type="text" placeholder="Enter in comma separated format" value={skills} onChange={(e) => setskills(e.target.value)}></textarea>
                        </div>
                    </div>
                    <div className="">
                        <div className="">
                            <label for="avp">Available Projects</label>

                            <textarea type="text" placeholder="" value={availproj} onChange={(e) => setavailproj(e.target.value)}></textarea>
                        </div>
                    </div>
                    <div className="">
                                            <div className="">
                                                <label>Done Leadership Before (ever led a project before)</label>
                                                <label><input type="radio" name="featured" checked={leadership === "1"} value="1" onChange={(e) => setleadership(e.target.value)} />Yes</label> &nbsp; &nbsp;
                                                <label><input type="radio" name="featured" value="0" checked={leadership === "0"} onChange={(e) => setleadership(e.target.value)} />No</label>
                                            </div>
                                        </div>
                    <div className="">
                        <div className="">
                            <label for="avp">Remarks (ever given from senior employee)</label>

                            <textarea type="text" placeholder="" value={remarks} onChange={(e) => setremarks(e.target.value)}></textarea>
                        </div>
                    </div>
                    <div className="">
                        <div className="">
                            <label for="avp">Accomplishments (ever won any title or any make huge impact)</label>

                            <textarea type="text" placeholder="" value={accom} onChange={(e) => setaccom(e.target.value)}></textarea>
                        </div>
                    </div>
                    <div className="">
                        <div className="">
                            <label for="avp">Enter your Target Role</label>

                            <input type="text" value={target_role} onChange={(e)=>settarget_role(e.target.value)}/>
                        </div>
                    </div>
                    <div className="row">
                                                <div className="text-center col-12 col-sm-12 col-md-12 col-lg-12">
                                                    <input type="submit" className="btn mb-3" value="Add Details" />
                                                </div>
                                            </div>
                    
                </form>
            </div>
        </>
    )
}
export default TakeInput