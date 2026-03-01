# SensAI - Your AI-Powered Career Growth Platform

## 📚 About SensAI

SensAI is an intelligent career development platform powered by Google Gemini AI that helps job seekers excel in their career journey. Whether you're preparing for interviews, building your professional resume, or crafting compelling cover letters, SensAI provides AI-driven tools and personalized insights to boost your career success.

## ✨ Key Features

### 📊 Career Dashboard
- Personalized industry insights
- Salary range data by role and location
- Market trends and growth rates
- Demand level analysis
- Recommended skills for career advancement
- Performance analytics and progress tracking

### 🎤 Mock Interview Preparation
- Industry-specific interview questions covering 50+ industries
- 1000+ curated interview questions
- Real-time AI feedback and performance tracking
- Detailed analytics with improvement suggestions
- 95% success rate for interview preparation
- 24/7 AI support

### 📄 Resume Builder & Optimizer
- AI-powered resume generation and optimization
- ATS (Applicant Tracking System) score analysis
- Intelligent feedback and improvement tips
- Professional resume templates
- One-click resume management

### 💌 AI Cover Letter Generator
- Tailored cover letter generation for job applications
- Company and job-specific customization
- Job description analysis
- Professional formatting and templates
- Quick create and manage multiple cover letters

### 👤 User Profiling & Onboarding
- Seamless Clerk authentication
- Industry-specific profile setup
- Experience level tracking
- Skills management
- Personalized recommendations

## 🛠️ Tech Stack

### Frontend
- **Next.js 16 & React 19** - Modern React framework and UI library
- **TailwindCSS 4** - Utility-first CSS framework
- **Shadcn/UI** - Prebuilt accessible React components
- **Lucide React** - Icon library
- **Recharts** - Charting library for analytics
- **React Hook Form + Zod** - Form state management and validation

### Backend & Database
- **Next.js API Routes** - Serverless backend functions
- **Prisma ORM** - Database ORM and toolkit
- **PostgreSQL** - Relational database
- **Neon** - Serverless PostgreSQL hosting
- **Prisma Neon Adapter** - Optimized Neon integration

### AI & External Services
- **Google Generative AI** - Gemini API for AI-powered features
- **Clerk** - Authentication and user management
- **Inngest** - Background job processing
- 
## Getting Started

### Installation

1. Clone the repository:
```bash
git clone https://github.com/code-well0/sensai.git
cd sensai
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
Create a `.env.local` file in the root directory:
```env
# Database
DATABASE_URL=your_postgresql_url

# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_key
CLERK_SECRET_KEY=your_clerk_secret

# Google Gemini API
GOOGLE_API_KEY=your_google_ai_key

# Inngest
INNGEST_EVENT_KEY=your_inngest_key
```

4. Generate Prisma client:
```bash
npx prisma generate
```

5. Run database migrations:
```bash
npx prisma migrate dev
```

6. Start the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 Project Structure

```
sensai/
├── app/                      # Next.js app directory
│   ├── (main)/              # Main application routes
│   │   ├── dashboard/       # User dashboard
│   │   ├── interview/       # Interview preparation
│   │   ├── resume/          # Resume builder
│   │   └── ai-cover-letter/ # Cover letter generator
│   ├── (auth)/              # Authentication pages
│   │   ├── sign-in/
│   │   └── sign-up/
│   └── page.jsx             # Landing page
├── components/              # Reusable UI components
├── hooks/                   # Custom React hooks
├── lib/                     # Utility functions
├── actions/                 # Server actions
├── data/                    # Static data (FAQs, features, testimonials)
├── prisma/                  # Database schema
├── public/                  # Static assets
└── middleware.js            # Next.js middleware
```

## 📊 Database Schema

### Key Models
- **User** - User profiles with industry and skills
- **Assessment** - Interview quiz results and performance
- **Resume** - Saved resumes with ATS scores and feedback
- **CoverLetter** - Generated cover letters
- **IndustryInsight** - Market data, salary ranges, trends, and skills

## 🔐 Authentication

SensAI uses **Clerk** for secure authentication and user management. Features include:
- Sign up and login
- OAuth integration
- User profile management
- Session management

## 🚀 Deployment

Deploy easily on Vercel:

```bash
npm run build
npm run start
```

Or use Vercel directly:
- Push to GitHub
- Connect repository to Vercel
- Set environment variables
- Deploy!
