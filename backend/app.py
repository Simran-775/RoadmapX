from fastapi import FastAPI, UploadFile, File, Form
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
import PyPDF2
import io
import google.generativeai as genai
import logging # Import logging

# --- Configure logging ---
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')

# --- API key directly in code (as per your request, but insecure) ---
genai.configure(api_key="your api key")

# --- Initialize the Generative Model once globally ---
text_generation_model = genai.GenerativeModel("models/gemini-2.5-flash-preview-05-20")

stored_data = {}

app = FastAPI(
    title="RoadmapX API",
    description="Backend API for generating employee development roadmap",
    version="1.0.0"
)

@app.get("/")
def root():
    logging.info("Root endpoint accessed.")
    return {"message": "RoadmapX Backend is running!"}

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

role_skills_database = {
    # ... (your role_skills_database)
}

def extract_text_from_pdf(file):
    logging.info("Extracting text from PDF.")
    pdf_reader = PyPDF2.PdfReader(file)
    text = ""
    for page in pdf_reader.pages:
        page_text = page.extract_text()
        if page_text:
            text += page_text + "\n"
    return text

async def generate_roadmap_internal(user_data):
    logging.info("Starting generate_roadmap_internal function.")

    resume_text = user_data.get("resume_text", "") 
    known_skills_list = [s.strip() for s in user_data["known_skills"].split(",") if s.strip()]
    available_projects_list = [p.strip() for p in user_data["available_projects"].split(",") if p.strip()]
    accomplishments_list = [a.strip() for a in user_data["accomplishments"].split(",") if a.strip()]
    target_role = user_data["target_role"]
    leadership = user_data["leadership"]
    remarks = user_data["remarks"]

    target_role_skills = role_skills_database.get(target_role, [])
    missing_skills = [skill for skill in target_role_skills if skill not in known_skills_list]

    prompt = f"""
    You are an expert career development advisor. Generate a clear, quarter-wise roadmap (Q1–Q4) for professional growth based on the provided information. Each quarter should outline specific skill goals (targeting missing skills), project ideas, and leadership improvements. The roadmap should be actionable and concise.

    Resume Extract (Summary):
    {resume_text[:1000]}

    🎯 Target Role: {target_role}
    🧑‍💻 Current Skills: {known_skills_list}
    ❌ Missing Skills: {missing_skills}
    📂 Available Projects: {available_projects_list}
    🏆 Accomplishments: {accomplishments_list}
    👥 Leadership: {leadership}
    💬 Remarks: {remarks}

    Please provide the roadmap in a structured, readable format, potentially using bullet points or numbered lists for each quarter's goals.
    """
    logging.info(f"Prompt created for Gemini API. Target role: {target_role}")

    try:
        response = text_generation_model.generate_content(
            [prompt],
            request_options={"timeout": 60} # Set a 60-second timeout
        )
        logging.info("Successfully received response from Gemini API.")
        return response.text
    except genai.types.BlockedPromptException as e:
        logging.error(f"Gemini API blocked prompt: {e.block_reason.name} - {e.block_reason_message}")
        raise ValueError("Prompt was blocked by the safety system. Please revise your input.")
    except Exception as e:
        logging.error(f"Error calling Gemini API: {e}", exc_info=True)
        raise RuntimeError(f"Failed to generate roadmap from AI: {str(e)}")


@app.post("/submit")
async def submit_details(
    resume: UploadFile = File(None),
    known_skills: str = Form(...),
    available_projects: str = Form(...),
    leadership: str = Form(...),
    remarks: str = Form(...),
    accomplishments: str = Form(...),
    target_role: str = Form(...)
):
    logging.info("Received /submit request.")
    try:
        resume_text = ""
        if resume is not None:
            logging.info(f"Processing uploaded resume: {resume.filename}")
            contents = await resume.read()
            resume_text = extract_text_from_pdf(io.BytesIO(contents))
            logging.info("Resume text extracted.")
        else:
            logging.info("No resume file uploaded.")

        stored_data["latest"] = {
            "resume_text": resume_text,
            "known_skills": known_skills,
            "available_projects": available_projects,
            "leadership": leadership,
            "remarks": remarks,
            "accomplishments": accomplishments,
            "target_role": target_role
        }
        logging.info("User data parsed and stored.")

        # 🔹 Auto-generate roadmap
        roadmap = await generate_roadmap_internal(stored_data["latest"])
        logging.info("Roadmap generated successfully.")

        return {"success": 1, "msg": "Details stored + roadmap generated", "roadmap": roadmap}

    except ValueError as ve: # Catch specific value errors from prompt blocking
        logging.error(f"Client error during /submit: {ve}")
        return JSONResponse({"success": 0, "msg": str(ve)}, status_code=400)
    except RuntimeError as re: # Catch errors from AI generation
        logging.error(f"AI generation error during /submit: {re}")
        return JSONResponse({"success": -1, "msg": str(re)}, status_code=500)
    except Exception as e:
        logging.error(f"General error during /submit: {e}", exc_info=True)
        return JSONResponse({"success": -1, "msg": "Internal server error", "detail": str(e)}, status_code=500)
    
