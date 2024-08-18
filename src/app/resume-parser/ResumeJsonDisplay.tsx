import { Fragment } from "react";
import type { Resume } from "lib/redux/types";
import { initialEducation, initialWorkExperience } from "lib/redux/resumeSlice";
import { deepClone } from "lib/deep-clone";

export const ResumeJsonDisplay = ({ resume }: { resume: Resume }) => {
  const educations =
    resume.educations.length === 0
      ? [deepClone(initialEducation)]
      : resume.educations;
  const workExperiences =
    resume.workExperiences.length === 0
      ? [deepClone(initialWorkExperience)]
      : resume.workExperiences;
  const skills = [...resume.skills.descriptions];
  const featuredSkills = resume.skills.featuredSkills
    .filter((item) => item.skill.trim())
    .map((item) => item.skill)
    .join(", ")
    .trim();
  if (featuredSkills) {
    skills.unshift(featuredSkills);
  }

  const resumeData = {
    profile: resume.profile,
    educations: educations,
    workExperiences: workExperiences,
    projects: resume.projects,
    skills: skills,
  };

  const handleDownload = () => {
    const json = JSON.stringify(resumeData, null, 2);
    const blob = new Blob([json], { type: "application/json" });
    const href = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = href;
    link.download = "resume.json";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="p-4">
      <pre className="bg-gray-100 p-4 rounded border text-sm overflow-x-auto">
        {JSON.stringify(resumeData, null, 2)}
      </pre>
      <button
        onClick={handleDownload}
        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
      >
        Download JSON
      </button>
    </div>
  );
};