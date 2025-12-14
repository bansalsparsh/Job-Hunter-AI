# Job Hunter AI 🚀

An intelligent career assistant built with **Next.js 15** and **Google Gemini AI**. This tool helps job seekers optimize their applications by analyzing resumes against specific job descriptions (JD), calculating ATS match scores, and generating tailored, keyword-optimized cover letters.

![Project Status](https://img.shields.io/badge/Status-Live-success)
![Tech](https://img.shields.io/badge/Built%20With-Next.js-black)
![AI](https://img.shields.io/badge/Powered%20By-Google%20Gemini-blue)

## 🔗 Live Demo
[**Click here to view the Live Application**](https://job-hunter-ai-puce.vercel.app)

---

## ✨ Key Features

* **📊 Smart ATS Scoring:** detailed analysis of how well your resume matches a specific Job Description (0-100% Score).
* **🔍 Keyword Gap Analysis:** Automatically detects and highlights critical "Missing Keywords" that are present in the JD but absent from your resume.
* **✍️ Tailored Cover Letters:** Generates professional, markdown-formatted cover letters that use "Keyword Mirroring" to boost ATS ranking.
* **📄 PDF Export:** One-click download of your generated cover letter as a formatted `.pdf` file.
* **💾 Local History:** Automatically saves your last 5 scans to the sidebar using LocalStorage, so you never lose your progress.
* **🎨 Modern UI:** Features a premium "Glassmorphism" design with 3D interactive buttons, animated gradients, and responsive layouts.

## 🛠️ Tech Stack

* **Framework:** Next.js 15 (App Router)
* **Language:** TypeScript
* **AI Model:** Google Gemini 1.5 Flash (via `google-generative-ai` SDK)
* **Styling:** CSS Modules (Custom Glassmorphism & Animations)
* **Utilities:**
    * `jspdf` (Client-side PDF generation)
    * `react-markdown` (Rendering formatted AI responses)

## 🚀 Getting Started Locally

If you want to run this project on your own machine:

1.  **Clone the repository**
    ```bash
    git clone [https://github.com/bansalsparsh/Job-Hunter-AI.git](https://github.com/bansalsparsh/Job-Hunter-AI.git)
    cd Job-Hunter-AI
    ```

2.  **Install dependencies**
    ```bash
    npm install
    ```

3.  **Set up Environment Variables**
    Create a `.env.local` file in the root directory and add your Google Gemini API key:
    ```bash
    GEMINI_API_KEY=your_api_key_here
    ```

4.  **Run the development server**
    ```bash
    npm run dev
    ```

5.  Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📸 Usage Workflow

1.  **Upload Resume:** Select your PDF resume from your computer.
2.  **Paste Job Description:** Copy the full text from LinkedIn, Indeed, or the company site.
3.  **Launch Analysis:** Click the 3D button to start the AI agent.
4.  **Review Results:**
    * Check your **ATS Match Score** (Green/Yellow/Red).
    * See which **Keywords** you are missing.
    * Read the **Tailored Cover Letter**.
5.  **Export:**
    * Click **"Download PDF"** to save the file instantly.
    * Or click **"Copy Text"** to paste it elsewhere.
6.  **History:** Use the sidebar to switch between your recent applications quickly.

---

### 🛡️ Privacy Note
This application processes resumes using the Google Gemini API. No personal data is permanently stored on the server; history is stored locally in your browser.

---
*Created by Sparsh Bansal*
