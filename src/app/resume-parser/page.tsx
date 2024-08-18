"use client";
import { useState, useEffect } from "react";
import { readPdf } from "lib/parse-resume-from-pdf/read-pdf";
import type { TextItems } from "lib/parse-resume-from-pdf/types";
import { groupTextItemsIntoLines } from "lib/parse-resume-from-pdf/group-text-items-into-lines";
import { groupLinesIntoSections } from "lib/parse-resume-from-pdf/group-lines-into-sections";
import { extractResumeFromSections } from "lib/parse-resume-from-pdf/extract-resume-from-sections";
import { ResumeDropzone } from "components/ResumeDropzone";
import { FlexboxSpacer } from "components/FlexboxSpacer";
import { Heading, Paragraph } from "components/documentation";
import { ResumeJsonDisplay } from "resume-parser/ResumeJsonDisplay";

const defaultFileUrl = "";

export default function ResumeParser() {
  const [fileUrl, setFileUrl] = useState(defaultFileUrl);
  const [textItems, setTextItems] = useState<TextItems>([]);
  const [jobDescription, setJobDescription] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  
  const lines = groupTextItemsIntoLines(textItems || []);
  const sections = groupLinesIntoSections(lines);
  const resume = extractResumeFromSections(sections);

  useEffect(() => {
    async function fetchPdf() {
      if (fileUrl) {
        const textItems = await readPdf(fileUrl);
        setTextItems(textItems);
      }
    }
    fetchPdf();
  }, [fileUrl]);

  useEffect(() => {
    // Log resume data to console
    console.log(resume);
  }, [resume]); // This will run every time `resume` is updated

  return (
    <main className="h-full w-full overflow-hidden">
      <div className="grid md:grid-cols-6">
        <div className="flex justify-center px-2 md:col-span-3 md:h-[calc(100vh-var(--top-nav-bar-height))] md:justify-end">
          <section className="mt-5 grow px-4 md:max-w-[600px] md:px-0">
            <div className="h-full w-full">
              <textarea
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                placeholder="Enter job description here to get started."
                className={`w-full p-4 border-2 rounded-md resize-none focus:outline-none ${
                  isFocused ? "border-purple-500" : "border-gray-300"
                }`}
                style={{ height: "840px" }}  // Adjust the height here
              />
            </div>
          </section>
          <FlexboxSpacer maxWidth={45} className="hidden md:block" />
        </div>
        <div className="flex px-6 text-gray-900 md:col-span-3 md:h-[calc(100vh-var(--top-nav-bar-height))] md:overflow-y-scroll">
          <FlexboxSpacer maxWidth={45} className="hidden md:block" />
          <section className="max-w-[600px] grow">
            <Heading className="text-primary !mt-4">
              Resume Parser
            </Heading>
            <Paragraph smallMarginTop={true}>
              Upload your resume to see how well it can be parsed. The parsing results will be displayed in the table below.
              This is just to give you an idea how your parsed resume will look like.
            </Paragraph>
            <div className="mt-3">
              <ResumeDropzone
                onFileUrlChange={(fileUrl) =>
                  setFileUrl(fileUrl || defaultFileUrl)
                }
                playgroundView={true}
              />
            </div>
            <Heading level={2} className="!mt-[1.2em]">
              Resume Parsing Results
            </Heading>
            {/* <ResumeTable resume={resume} /> */}
            <ResumeJsonDisplay resume={resume} />
            <div className="pt-24" />
          </section>
        </div>
      </div>
    </main>
  );
}