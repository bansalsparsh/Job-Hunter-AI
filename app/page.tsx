"use client";

import { useState, useEffect, ChangeEvent } from 'react';
import ReactMarkdown from 'react-markdown';
import { jsPDF } from "jspdf"; // <--- NEW IMPORT

// 1. Define Types
interface AnalysisResult {
  match_score: number;
  missing_keywords: string[];
  analysis: string;
  cover_letter: string;
  timestamp?: string;
  jobSnippet?: string;
}

export default function Home() {
  // --- STATE LOGIC ---
  const [file, setFile] = useState<File | null>(null);
  const [jobDesc, setJobDesc] = useState<string>('');
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);
  const [history, setHistory] = useState<AnalysisResult[]>([]);

  // Load History on Startup
  useEffect(() => {
    const saved = localStorage.getItem('jobHunterHistory');
    if (saved) {
      setHistory(JSON.parse(saved));
    }
  }, []);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async () => {
    if (!file || !jobDesc) {
      alert("Please provide both a resume PDF and a job description.");
      return;
    }

    setLoading(true);
    setResult(null);
    setCopied(false);

    const formData = new FormData();
    formData.append('resume', file);
    formData.append('jobDesc', jobDesc);

    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        body: formData,
      });
      
      const data = await response.json();
      
      if (response.ok) {
        const newResult: AnalysisResult = {
          ...data,
          timestamp: new Date().toLocaleDateString(),
          jobSnippet: jobDesc.slice(0, 40) + "..."
        };

        setResult(newResult);
        addToHistory(newResult);
      } else {
        alert(data.error || "An error occurred");
      }
    } catch (err) {
      console.error(err);
      alert("Failed to connect to the server.");
    } finally {
      setLoading(false);
    }
  };

  const addToHistory = (item: AnalysisResult) => {
    const updatedHistory = [item, ...history].slice(0, 5); 
    setHistory(updatedHistory);
    localStorage.setItem('jobHunterHistory', JSON.stringify(updatedHistory));
  };

  const clearHistory = () => {
    setHistory([]);
    localStorage.removeItem('jobHunterHistory');
  };

  const copyToClipboard = () => {
    if (result?.cover_letter) {
      navigator.clipboard.writeText(result.cover_letter);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  // --- NEW PDF FUNCTION ---
  const downloadPDF = () => {
    if (!result?.cover_letter) return;

    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    const margin = 20;
    const maxLineWidth = pageWidth - (margin * 2);
    
    doc.setFont("helvetica", "normal");
    doc.setFontSize(11);

    // Split text into lines that fit the page width
    // We replace markdown symbols to make it look clean in PDF
    const cleanText = result.cover_letter
      .replace(/\*\*/g, "") // Remove bold markers
      .replace(/#/g, "");   // Remove header markers

    const lines = doc.splitTextToSize(cleanText, maxLineWidth);
    
    doc.text(lines, margin, 20);
    doc.save("Cover_Letter.pdf");
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return '#10b981'; 
    if (score >= 60) return '#f59e0b'; 
    return '#ef4444'; 
  };

  // --- UI RENDER ---
  return (
    <div className="container">
      <header className="header">
        <h1>Job Hunter AI 🚀</h1>
        <p>Your 3D Powered Career Assistant</p>
      </header>

      <div className="main-grid">
        {/* LEFT COLUMN: Inputs & History */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '25px' }}>
          
          <div className="card">
            <h2>1. Mission Control</h2>
            
            <div style={{ marginBottom: '20px' }}>
              <label>Upload Resume (PDF)</label>
              <input type="file" accept=".pdf" onChange={handleFileChange} />
              {file && <p style={{fontSize: '13px', color: '#10b981', marginTop: '8px', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '5px'}}>
                ✅ Ready: {file.name}
              </p>}
            </div>

            <div>
              <label>Target Job Description</label>
              <textarea 
                value={jobDesc} 
                onChange={(e) => setJobDesc(e.target.value)} 
                placeholder="Paste the full job description here (Responsibilities, Requirements)..."
                rows={6}
              />
            </div>

            <button className="btn-primary" onClick={handleSubmit} disabled={loading}>
              {loading ? "SCANNING ORBIT..." : "LAUNCH ANALYSIS 🚀"}
            </button>
          </div>

          {history.length > 0 && (
            <div className="card">
              <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px'}}>
                <h3 style={{margin: 0, fontSize: '1.2rem'}}>🕒 Recent Scans</h3>
                <button onClick={clearHistory} style={{background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer', fontWeight: 'bold', fontSize: '12px', letterSpacing: '0.5px'}}>CLEAR HISTORY</button>
              </div>
              
              <div style={{display: 'flex', flexDirection: 'column', gap: '12px'}}>
                {history.map((item, index) => (
                  <div 
                    key={index} 
                    onClick={() => setResult(item)}
                    className="history-item"
                  >
                    <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: '6px'}}>
                      <span style={{fontWeight: '800', fontSize: '14px', color: getScoreColor(item.match_score)}}>
                        {item.match_score}% Match
                      </span>
                      <span style={{fontSize: '11px', color: '#64748b', fontWeight: '600'}}>{item.timestamp}</span>
                    </div>
                    <div style={{fontSize: '13px', color: '#334155', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis'}}>
                      {item.jobSnippet || "Job Description..."}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* RIGHT COLUMN: Results */}
        <div className="card" style={{ minHeight: '600px', display: 'flex', flexDirection: 'column' }}>
          
          {!result && !loading && (
            <div style={{ textAlign: 'center', color: '#64748b', marginTop: 'auto', marginBottom: 'auto' }}>
              <div style={{ fontSize: '60px', marginBottom: '20px', opacity: 0.5 }}>🛰️</div>
              <h3 style={{color: '#475569'}}>Waiting for Mission Data</h3>
              <p>Upload a resume and job description to initialize the system.</p>
            </div>
          )}

          {loading && (
            <div style={{ textAlign: 'center', marginTop: 'auto', marginBottom: 'auto' }}>
              <div className="spinner"></div>
              <p style={{fontWeight: 'bold', color: '#4f46e5', marginTop: '20px'}}>Analyzing Keywords...</p>
              <p style={{fontSize: '14px', color: '#64748b'}}>Calculating ATS Score...</p>
            </div>
          )}

          {result && (
            <div className="result-area-inner">
              <div style={{ 
                marginBottom: '30px', 
                padding: '25px', 
                background: 'rgba(255,255,255,0.6)', 
                borderRadius: '16px', 
                border: `2px solid ${getScoreColor(result.match_score)}`,
                backdropFilter: 'blur(5px)'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div style={{ flex: 1, paddingRight: '20px' }}>
                    <h3 style={{ margin: 0, fontSize: '1.4rem', color: '#1e293b' }}>ATS Match Score</h3>
                    <p style={{ margin: '8px 0', fontSize: '15px', color: '#475569', lineHeight: '1.5' }}>{result.analysis}</p>
                  </div>
                  
                  <div className="score-circle" style={{ 
                    color: getScoreColor(result.match_score), 
                    border: `5px solid ${getScoreColor(result.match_score)}` 
                  }}>
                    {result.match_score}%
                  </div>
                </div>

                {result.missing_keywords.length > 0 && (
                  <div style={{ marginTop: '20px', paddingTop: '20px', borderTop: '1px dashed #cbd5e1' }}>
                    <p style={{ fontWeight: '800', fontSize: '12px', color: '#ef4444', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '10px' }}>⚠️ Missing Keywords Detected:</p>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                      {result.missing_keywords.map((kw, i) => (
                        <span key={i} style={{ 
                          background: '#fee2e2', 
                          color: '#991b1b', 
                          padding: '6px 12px', 
                          borderRadius: '20px', 
                          fontSize: '13px',
                          fontWeight: '700',
                          boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
                        }}>
                          {kw}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* COVER LETTER HEADER + BUTTONS */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', marginTop: '40px' }}>
                <h3 style={{fontSize: '1.5rem', margin: 0}}>Tailored Cover Letter</h3>
                <div style={{ display: 'flex', gap: '10px' }}>
                  <button onClick={downloadPDF} className="copy-btn" style={{ background: '#3b82f6', color: 'white' }}>
                    ⬇️ Download PDF
                  </button>
                  <button onClick={copyToClipboard} className="copy-btn">
                    {copied ? "✅ Copied!" : "📋 Copy Text"}
                  </button>
                </div>
              </div>
              
              <div className="markdown-content" style={{ fontSize: '16px', lineHeight: '1.8', color: '#334155' }}>
                <ReactMarkdown>{result.cover_letter}</ReactMarkdown>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}