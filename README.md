# Job-Hunter-AI 🚀

An intelligent career assistant built with **Next.js** and **Google Gemini AI**. This tool helps job seekers optimize their applications by analyzing resumes against specific job descriptions (JD) and generating high-converting cover letters.

## ✨ Key Features

* **ATS Score Checker:** detailed analysis of how well your resume matches a specific Job Description (0-100%).
* **Keyword Gap Analysis:** Automatically detects and lists critical "Missing Keywords" that are present in the JD but absent from your resume.
* **Tailored Cover Letters:** Generates professional, markdown-formatted cover letters that use "Keyword Mirroring" to boost ATS ranking.
* **Local History:** Automatically saves your recent scans and letters using LocalStorage so you never lose your work.
* **Modern UI:** Features a 3D Glassmorphism interface with animated gradients and interactive elements.

## 🛠️ Tech Stack

* **Framework:** Next.js 15 (App Router)
* **Language:** TypeScript
* **AI Model:** Google Gemini (via `google-generative-ai` SDK)
* **Styling:** CSS Modules (Custom Glassmorphism Design)
* **Markdown:** `react-markdown` for rendering generated letters.

## 🚀 Getting Started

If you want to run this locally:

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

4.  **Run the server**
    ```bash
    npm run dev
    ```

5.  Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📸 Usage

1.  **Upload Resume:** Select your PDF resume.
2.  **Paste Job Description:** Copy the full text from LinkedIn/Indeed.
3.  **Analyze:** Click "Launch Analysis."
4.  **Review:** See your ATS Match Score and missing keywords.
5.  **Copy:** One-click copy the generated cover letter to your clipboard.

---
*Created by Sparsh Bansal*
