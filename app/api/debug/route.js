import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    
    // This usually works to list models, but we need the admin interface 
    // Since the SDK doesn't have a simple "listModels" helper exposed easily in all versions,
    // let's try the fallback model "gemini-1.5-pro" directly.
    
    return NextResponse.json({ message: "Debug route active." });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}