from fastapi import FastAPI, UploadFile, File, Form
from fastapi.middleware.cors import CORSMiddleware
import PyPDF2
import openai

# --------------------------
# Step 1: Initialize FastAPI
# --------------------------
app = FastAPI(
    title="RoadmapX API",
    description="Backend API for generating employee development roadmap",
    version="1.0.0"
)

# --------------------------
# Root route (health check)
# --------------------------
@app.get("/")
def root():
    return {"message": "RoadmapX Backend is running!"}

# --------------------------
# Step 2: Enable CORS for frontend
# --------------------------
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Change to your frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --------------------------
# Step 3: Set OpenAI API Key
# --------------------------
openai.api_key = "AIzaSyDUC2lXBIw_oHe7_enuGoqc3ocyKGPg3M0"  # Replace with a valid OpenAI GPT key

# --------------------------
# Step 4: Role skills database
# --------------------------
role_skills_database = {
    "Data Scientist": ["Python", "Machine Learning", "Data Analysis", "Statistics", "SQL", "Leadership", "Data Visualization"],
    "Software Engineer": ["Python", "Java", "C++", "Algorithms", "Data Structures", "Project Management", "Version Control"],
    "Product Manager": ["Product Strategy", "Market Analysis", "Roadmap Planning", "Agile Methodology", "Leadership", "Stakeholder Management"],
    "Cybersecurity Analyst": ["Network Security", "Penetration Testing", "Incident Response", "Python", "Security Policies", "Risk Assessment"],
    "DevOps Engineer": ["CI/CD", "Docker", "Kubernetes", "AWS", "Linux", "Monitoring Tools", "Automation"],
    "UX/UI Designer": ["Wireframing", "Prototyping", "Figma", "Adobe XD", "User Research", "Interaction Design"],
    "Business Analyst": ["Requirements Gathering", "Process Mapping", "SQL", "Excel", "Stakeholder Management", "Data Analysis"],
    "AI/ML Engineer": ["Python", "Deep Learning", "TensorFlow", "PyTorch", "Data Preprocessing", "Model Deployment", "Leadership"],
    "Marketing Manager": ["Digital Marketing", "SEO", "Content Strategy", "Analytics", "Leadership", "Campaign Management"],
    "HR Manager": ["Recruitment", "Employee Engagement", "HR Policies", "Conflict Resolution", "Leadership", "Performance Management"]
}

# --------------------------
# Step 5: Extract text from PDF resume
# --------------------------
def extract_skills_from_resume(file):
    pdf_reader = PyPDF2.PdfReader(file)
    text = ""
    for page in pdf_reader.pages:
        page_text = page.extract_text()
        if page_text:
            text += page_text
    return text

# --------------------------
# Step 6: Generate employee roadmap
# --------------------------
@app.post("/employee_roadmap")
async def generate_roadmap(
    name: str = Form(...),
    resume: UploadFile = File(...),
    target_role: str = Form(...),
    leadership: str = Form(...),
    available_projects: str = Form(...),
    known_skills: str = Form(...),
    accomplishments: str = Form(...),
    remarks: str = Form(...)
):
    # Extract resume text
    resume_text = extract_skills_from_resume(resume.file)

    # Convert comma-separated strings to lists
    available_projects_list = [proj.strip() for proj in available_projects.split(",")]
    known_skills_list = [skill.strip() for skill in known_skills.split(",")]
    accomplishments_list = [acc.strip() for acc in accomplishments.split(",")]

    # Determine missing skills for target role
    target_role_skills = role_skills_database.get(target_role, [])
    missing_skills = [skill for skill in target_role_skills if skill not in known_skills_list]

    # Prepare prompt for GPT-4
    prompt = f"""
Employee Name: {name}
Target Role: {target_role}
Leadership Ability: {leadership}
Current Skills: {known_skills_list}
Missing Skills: {missing_skills}
Available Projects: {available_projects_list}
Accomplishments: {accomplishments_list}
Remarks: {remarks}

Generate a personalized development roadmap for the employee,
including suggested trainings, project assignments, leadership development steps, 
and recommendations based on their accomplishments.
Format in bullet points with quarters (Q1, Q2, etc.).
"""

    # Call GPT-4 API
    response = openai.ChatCompletion.create(
        model="gpt-4",
        messages=[{"role": "user", "content": prompt}],
        max_tokens=700
    )

    roadmap_text = response.choices[0].message.content

    # Return roadmap and input data
    return {
        "name": name,
        "target_role": target_role,
        "leadership": leadership,
        "available_projects": available_projects_list,
        "known_skills": known_skills_list,
        "accomplishments": accomplishments_list,
        "remarks": remarks,
        "roadmap": roadmap_text
    }

