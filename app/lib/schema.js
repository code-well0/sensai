import { z } from "zod";

export const onboardingSchema = z.object({
    industry: z.string({
        required_error: "Please select an industry",
    }),
    subIndustry: z.string({
        required_error: "Please select a specailization",
    }),
    bio: z.string().max(500).optional(),
    experience: z
        .string()
        .transform((val) => parseInt(val, 10))
        .pipe(
            z
                .number()
                .min(0, "Experience must be at least 0 years")
                .max(50, "Experience cannot exceed 50 years")
        ),
    skills: z.string().transform((val) =>
        val
            ? val
                .split(",")
                .map((skill) => skill.trim())
                .filter(Boolean)
            : []
    )
});

export const contactSchema = z.object({
    email: z.string().email("Invalid email address"),
    mobile: z.string().optional(),
    linkedin: z.string().optional(),
    twitter: z.string().optional(),
});

// ================= EXPERIENCE =================
export const experienceSchema = z.object({
  title: z.string().min(1, "Job title is required"),
  organization: z.string().min(1, "Company is required"),
  startDate: z.string().min(1, "Start date is required"),
  endDate: z.string().optional(),
  description: z.string().min(1, "Description is required"),
  current: z.boolean().default(false),
}).refine(
  (data) => data.current || !!data.endDate,
  {
    message: "End date is required unless this is your current role",
    path: ["endDate"],
  }
);

// ================= EDUCATION =================
export const educationSchema = z.object({
  degree: z.string().min(1, "Degree is required"),
  institution: z.string().min(1, "Institution is required"),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
  cgpa: z.string().optional(),
  description: z.string().optional(),
});

// ================= PROJECT =================
export const projectSchema = z.object({
  name: z.string().min(1, "Project name is required"),
  techStack: z.string().optional(),
  link: z.string().optional(),
  description: z.string().min(1, "Description is required"),
});

export const resumeSchema = z.object({
    contactInfo: contactSchema,
    skills: z.string().min(1, "Skills are required"),
    experience: z.array(experienceSchema),
    education: z.array(educationSchema),
    projects: z.array(projectSchema),
});

export const coverLetterSchema = z.object({
  companyName: z.string().min(1, "Company name is required"),
  jobTitle: z.string().min(1, "Job title is required"),
  jobDescription: z.string().min(1, "Job description is required"),
});