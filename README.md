# SensAI - Your AI-Powered Career Growth Platform

## 📚 About SensAI

SensAI is an intelligent career development platform powered by Google Gemini AI that helps job seekers excel in their career journey. Whether you're preparing for interviews, building your professional resume, or crafting compelling cover letters, SensAI provides AI-driven tools and personalized insights to boost your career success.

## ✨ Key Features

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

### 📊 Career Dashboard
- Personalized industry insights
- Salary range data by role and location
- Market trends and growth rates
- Demand level analysis
- Recommended skills for career advancement
- Performance analytics and progress tracking

### 👤 User Profiling & Onboarding
- Seamless Clerk authentication
- Industry-specific profile setup
- Experience level tracking
- Skills management
- Personalized recommendations

## 🛠️ Tech Stack

### Frontend
- **Next.js 16** - React framework for production
- **React 19** - UI library
- **TailwindCSS 4** - Utility-first CSS framework
- **Shadcn/UI** - High-quality React components
  - Accordion, Alert Dialog, Dialog, Dropdown Menu, Label, Progress, Radio Group, Select, Tabs
- **Lucide React** - Beautiful icon library
- **Recharts** - Composable charting library for analytics
- **React Hook Form** - Efficient form state management
- **Zod** - TypeScript-first schema validation

### Backend & Database
- **Next.js API Routes** - Serverless backend
- **Prisma ORM** - Database toolkit and ORM
- **PostgreSQL** - Relational database
- **Neon** - Serverless PostgreSQL platform
- **Prisma Adapter for Neon** - Optimized Neon integration

### AI & External Services
- **Google Generative AI** - Gemini API for AI-powered features
- **Clerk** - Authentication and user management
- **Inngest** - Background job processing

### UI & UX Enhancements
- **Next Themes** - Dark/light mode support
- **Sonner** - Toast notifications
- **React Spinners** - Loading indicators
- **UIW MD Editor** - Markdown editor component
- **html2pdf.js** - PDF generation for resumes/cover letters

### Development Tools
- **ESLint** - Code linting
- **PostCSS** - CSS processing
- **Babel React Compiler** - React compilation optimization

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn
- PostgreSQL database (or Neon serverless)

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

## 🎯 Pages & Features

| Page | Purpose |
|------|---------|
| `/` | Landing page with features and CTA |
| `/dashboard` | User dashboard with industry insights |
| `/interview` | Interview prep with mock quizzes |
| `/interview/mock` | Interactive mock interview |
| `/resume` | Resume builder and optimizer |
| `/ai-cover-letter` | Cover letter management |
| `/ai-cover-letter/new` | Create new cover letter |
| `/onboarding` | User profile setup |

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

[Deploy on Vercel](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme)

## 📖 Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Prisma Documentation](https://www.prisma.io/docs/)
- [Clerk Documentation](https://clerk.com/docs)
- [Google Generative AI](https://ai.google.dev/)
- [TailwindCSS Documentation](https://tailwindcss.com/docs)

## 📝 Scripts

```bash
npm run dev       # Start development server
npm run build     # Build for production
npm run start     # Start production server
npm run lint      # Run ESLint
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License.

## 🌟 Future Roadmap

- [ ] Video interview practice with recording
- [ ] Real-time AI coaching and feedback
- [ ] LinkedIn profile optimization
- [ ] Job matching and recommendations
- [ ] Salary negotiation guides
- [ ] Community discussions and peer learning

--- 

Built with ❤️ using Next.js and Powered by Google Gemini AI