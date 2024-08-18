# JobDope

JobDope is a powerful open-source resume builder and resume parser.

The goal of JobDope is to provide everyone with free access to a modern professional resume design and enable anyone to apply for jobs with confidence. Additionally, with AI integration, JobDope allows users to tailor their resumes directly to job descriptions in just minutes, ensuring they stand out to employers.

Official site: [https://jobdope.com](https://jobdope.com)

## ⚒️ Resume Builder

JobDope's resume builder allows users to create a modern professional resume easily.

![Resume Builder Demo](#)

It has 5 Core Features:

| **Feature**                         | **Description**                                                                                                                                                                  |
|-------------------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **1. Real-Time UI Update**          | The resume PDF is updated in real-time as you enter your resume information, so you can easily see the final output.                                                              |
| **2. Modern Professional Design**   | The resume PDF features a modern professional design that adheres to U.S. best practices and is ATS-friendly. It automatically formats fonts, sizes, margins, and bullet points. |
| **3. Privacy Focus**                | The app runs locally on your browser, ensuring your personal data's safety. No sign-up is required, and no data ever leaves your browser.                                        |
| **4. Import From Existing Resume**  | Import your existing resume PDF to update its design to a modern professional look in just a few seconds.                                                                        |
| **5. AI-Powered Tailoring**         | Tailor your resume directly to job descriptions using AI, making it possible to create a customized resume in minutes.                                                           |

## 🔍 Resume Parser

JobDope’s second component is the resume parser. For those who have an existing resume, the resume parser can help test and confirm its ATS readability.

![Resume Parser Demo](#)

You can learn more about the resume parser algorithm in the ["Resume Parser Algorithm Deep Dive" section](https://jobdope.com/resume-parser).

## 📚 Tech Stack

| **Category**        | **Choice**                                     | **Descriptions**                                                                                 |
|---------------------|------------------------------------------------|---------------------------------------------------------------------------------------------------|
| **Language**        | [TypeScript](https://github.com/microsoft/TypeScript) | TypeScript is JavaScript with static type checking, helping catch many silly bugs at code time.   |
| **UI Library**      | [React](https://github.com/facebook/react)     | React’s declarative syntax and component-based architecture make it simple to develop reusable components. |
| **State Management**| [Redux Toolkit](https://github.com/reduxjs/redux-toolkit) | Redux Toolkit reduces the boilerplate needed to set up and update a central redux store.          |
| **CSS Framework**   | [Tailwind CSS](https://github.com/tailwindlabs/tailwindcss) | Tailwind speeds up development by providing helpful CSS utilities.                                |
| **Web Framework**   | [NextJS 13](https://github.com/vercel/next.js) | Next.js supports static site generation and helps build efficient React webpages that support SEO.|
| **PDF Reader**      | [PDF.js](https://github.com/mozilla/pdf.js)    | PDF.js reads content from PDF files and is used by the resume parser as the first step.           |
| **PDF Renderer**    | [React-pdf](https://github.com/diegomura/react-pdf) | React-pdf creates PDF files and is used by the resume builder to create a downloadable PDF file.  |

## 📁 Project Structure

JobDope is created with the NextJS web framework and follows its project structure. The source code can be found in `src/app`. There are a total of 4 page routes as shown in the table below. (Code path is relative to `src/app`)

| **Page Route**          | **Code Path**                  | **Description**                                                                                                 |
|-------------------------|--------------------------------|-----------------------------------------------------------------------------------------------------------------|
| /                       | /page.tsx                      | Home page that contains hero, auto typing resume, steps, testimonials, logo cloud, etc.                         |
| /resume-import          | /resume-import/page.tsx        | Resume import page where you can choose to import data from an existing resume PDF.                              |
| /resume-builder         | /resume-builder/page.tsx       | Resume builder page to build and download a resume PDF.                                                          |
| /resume-parser          | /resume-parser/page.tsx        | Resume parser page to test a resume’s ATS readability.                                                           |

## 💻 Local Development

### Method 1: npm

1. Download the repo `git clone https://github.com/xitanggg/jobdope.git`
2. Change the directory `cd jobdope`
3. Install the dependencies `npm install`
4. Start a development server `npm run dev`
5. Open your browser and visit [http://localhost:3000](http://localhost:3000) to see JobDope live

### Method 2: Docker

1. Download the repo `git clone https://github.com/xitanggg/jobdope.git`
2. Change the directory `cd jobdope`
3. Build the container `docker build -t jobdope .`
4. Start the container `docker run -p 3000:3000 jobdope`
5. Open your browser and visit [http://localhost:3000](http://localhost:3000) to see JobDope live