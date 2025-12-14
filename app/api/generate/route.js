// import { GoogleGenerativeAI } from "@google/generative-ai";
// import { NextResponse } from "next/server";

// export async function POST(req) {
//   try {
//     // 1. Get data
//     const data = await req.formData();
//     const file = data.get('resume');
//     const jobDesc = data.get('jobDesc');

//     if (!file) {
//       return NextResponse.json({ error: "No resume file found" }, { status: 400 });
//     }

//     // 2. Convert PDF to Base64 string
//     const bytes = await file.arrayBuffer();
//     const buffer = Buffer.from(bytes);
//     const base64Pdf = buffer.toString('base64');

//     // 3. Initialize Gemini
//     const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
//     // Using the latest available model from your list
//     const model = genAI.getGenerativeModel({ model: "gemini-flash-latest" });

//     // 4. Construct the parts (PDF + Text Instructions)
//     // Advanced ATS-Optimized Prompt
//     const prompt = `
//       You are an expert Resume Strategist and ATS (Applicant Tracking System) Specialist.
      
//       Your goal is to write a cover letter that scores 90/100 or higher on automated screening tools.
      
//       INPUT DATA:
//       1. User's Resume Text: "${resumeText}"
//       2. Target Job Description: "${jobDesc}"
      
//       INSTRUCTIONS:
//       1. ANALYZE FIRST: Scan the Job Description for the top 5 most critical "Hard Skills" and "Keywords" (e.g., specific tools, methodologies, certifications).
//       2. MAPPING: Find evidence in the Resume that matches these keywords.
//       3. WRITING: Write a professional cover letter with the following rules:
//          - OPENING: Mention the specific role and company (infer from text if possible, otherwise use placeholders).
//          - BODY PARAGRAPH 1 (The Hook): Connect the user's hardest skill directly to the company's biggest problem mentioned in the JD.
//          - BODY PARAGRAPH 2 (The Proof): Use "Keyword Mirroring". If the JD says "Python", you must use the word "Python". If the JD says "Stakeholder Management", use that exact phrase. Back it up with specific metrics/numbers from the resume (e.g., "900+ problems", "20% efficiency").
//          - CLOSING: Reiterate enthusiasm and request an interview.
//       4. FORMATTING:
//          - Use standard business letter formatting.
//          - Do NOT use specific dates or placeholders like "[Date]" or "[Company Name]" if you can infer them. If you cannot infer the company name, use "Hiring Team".
//          - Use the current date: ${new Date().toLocaleDateString()}.
//       5. TONE: Confident, professional, and action-oriented. Avoid passive voice.
      
//       OUTPUT:
//       Return ONLY the body of the letter in Markdown format. Do not include introductory text like "Here is your letter".
//     `;

//     const result = await model.generateContent([
//       {
//         inlineData: {
//           data: base64Pdf,
//           mimeType: "application/pdf",
//         },
//       },
//       prompt,
//     ]);

//     // 5. Return result
//     const response = await result.response;
//     const coverLetter = response.text();

//     return NextResponse.json({ coverLetter });

//   } catch (error) {
//     console.error("Error processing request:", error);
//     return NextResponse.json({ error: "Gemini Error: " + error.message }, { status: 500 });
//   }
// }
















// import { GoogleGenerativeAI } from "@google/generative-ai";
// import { NextResponse } from "next/server";

// export async function POST(req) {
//   try {
//     const data = await req.formData();
//     const file = data.get('resume');
//     const jobDesc = data.get('jobDesc');

//     if (!file) {
//       return NextResponse.json({ error: "No resume file found" }, { status: 400 });
//     }

//     // 1. Process PDF
//     const bytes = await file.arrayBuffer();
//     const buffer = Buffer.from(bytes);
//     const base64Pdf = buffer.toString('base64');

//     // 2. Initialize Gemini
//     const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    
//     // Switch to 'gemini-1.5-flash' which is the standard free-tier model
//     const model = genAI.getGenerativeModel({ 
//         model: "gemini-exp-1206", 
//         generationConfig: { responseMimeType: "application/json" } 
//     });

//     // 3. The "ATS Score" Prompt
//     const prompt = `
//       You are an expert ATS (Applicant Tracking System) scanner and Resume Strategist.
      
//       Analyze the attached resume against the provided Job Description.
      
//       Job Description:
//       "${jobDesc}"
      
//       Output your response in valid JSON format with this exact structure:
//       {
//         "match_score": (integer 0-100),
//         "missing_keywords": ["list", "of", "critical", "missing", "skills"],
//         "analysis": "A brief 2-sentence explanation of the score.",
//         "cover_letter": "The full markdown text of a tailored cover letter."
//       }

//       Scoring Rules:
//       - Be strict. If key hard skills from the JD are missing, deduct points.
//       - 90-100: Perfect match (All keywords present).
//       - 70-89: Good match (Most keywords present).
//       - <70: Weak match (Critical skills missing).
      
//       For the cover letter:
//       - Use "Keyword Mirroring" (use exact phrasing from JD).
//       - No placeholders.
//       - Professional tone.
//     `;

//     const result = await model.generateContent([
//       {
//         inlineData: {
//           data: base64Pdf,
//           mimeType: "application/pdf",
//         },
//       },
//       prompt,
//     ]);

//     const response = await result.response;
//     const jsonText = response.text();
    
//     // Parse the JSON (Gemini is usually good, but we clean it just in case)
//     const parsedData = JSON.parse(jsonText);

//     return NextResponse.json(parsedData);

//   } catch (error) {
//     console.error("Error processing request:", error);
//     return NextResponse.json({ error: "Analysis failed: " + error.message }, { status: 500 });
//   }
// }







import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

// Initialize the SDK once (this is fine outside)
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export async function POST(req) {
  try {
    const data = await req.formData();
    const file = data.get('resume');
    const jobDesc = data.get('jobDesc');

    if (!file) {
      return NextResponse.json({ error: "No resume file found" }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const base64Pdf = buffer.toString('base64');
    
    const model = genAI.getGenerativeModel({ 
      model: "gemini-flash-latest", 
      generationConfig: { responseMimeType: "application/json" } 
    });

    const prompt = `
      You are an expert ATS (Applicant Tracking System) scanner and Resume Strategist.
      
      Analyze the attached resume against the provided Job Description.
      
      Job Description:
      "${jobDesc}"
      
      Output your response in valid JSON format with this exact structure:
      {
        "match_score": (integer 0-100),
        "missing_keywords": ["list", "of", "critical", "missing", "skills"],
        "analysis": "A brief 2-sentence explanation of the score.",
        "cover_letter": "The full markdown text of a tailored cover letter."
      }

      Scoring Rules:
      - Be strict. If key hard skills from the JD are missing, deduct points.
      - 90-100: Perfect match (All keywords present).
      - 70-89: Good match (Most keywords present).
      - <70: Weak match (Critical skills missing).
      
      For the cover letter:
      - Use "Keyword Mirroring" (use exact phrasing from JD).
      - keep the formatting in humanize manner.
      - No placeholders.
      - Professional tone.
    `;

    const result = await model.generateContent([
      { inlineData: { data: base64Pdf, mimeType: "application/pdf" } },
      prompt,
    ]);

    const response = await result.response;
    const jsonText = response.text();
    const parsedData = JSON.parse(jsonText);

    return NextResponse.json(parsedData);

  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}