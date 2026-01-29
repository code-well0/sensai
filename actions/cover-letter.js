"use server";

import { db } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/dist/types/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

export async function generateCoverLetter(data) {
    const { userId } = await auth();
    if (!userId) throw new Error("Unauthorized");
    const user = await db.user.findUnique({
        where: {
            clerkUserId: userId,
        },
    });
    if (!user) throw new Error("User not found");

    const prompt = `
        Generate a cover letter for a ${data.jobTitle} position at ${data.companyName}
    `

    try {

        const result = await model.generateContent(prompt);
        const content = result.response.text().trim();

        const coverLetter = await db.coverLetter.create({data:{
            
        }})
        

        return coverLetter;
    } catch (error) {
        console.error("Error Cover Letter:", error);
        throw new Error("Failed to generate Cover Letter");
    }
}