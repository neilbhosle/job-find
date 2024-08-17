"use client";
import { getHasUsedAppBefore } from "lib/redux/local-storage";
import { ResumeDropzone } from "components/ResumeDropzone";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function ImportResume() {
  const [hasUsedAppBefore, setHasUsedAppBefore] = useState(false);
  const [hasAddedResume, setHasAddedResume] = useState(false);
  const onFileUrlChange = (fileUrl: string) => {
    setHasAddedResume(Boolean(fileUrl));
  };

  useEffect(() => {
    setHasUsedAppBefore(getHasUsedAppBefore());
  }, []);

  return (
    <main className="bg-gray-100 min-h-screen flex items-center justify-center">
      <div className="mx-auto mt-0/Users/rishabhsharma/Downloads/jobdope-2.ico max-w-3xl rounded-md border border-gray-300 bg-white px-10 py-10 text-center shadow-lg">
        {!hasUsedAppBefore ? (
          <>
            <h1 className="text-2xl font-semibold text-[#212e7c]">
              Import data from an existing resume
            </h1>
            <ResumeDropzone
              onFileUrlChange={onFileUrlChange}
              className="mt-5"
            />
            {!hasAddedResume && (
              <>
                <OrDivider />
                <SectionWithHeadingAndCreateButton
                  heading="Don't have a resume yet?"
                  buttonText="Create from scratch"
                />
              </>
            )}
          </>
        ) : (
          <>
            {!hasAddedResume && (
              <>
                <SectionWithHeadingAndCreateButton
                  heading="You have data saved in the browser from a prior session"
                  buttonText="Continue where I left off"
                />
                <OrDivider />
              </>
            )}
            <h1 className="text-2xl font-semibold text-[#212e7c]">
              Override data with a new resume
            </h1>
            <ResumeDropzone
              onFileUrlChange={onFileUrlChange}
              className="mt-5"
            />
          </>
        )}
      </div>
    </main>
  );
}

const OrDivider = () => (
  <div className="mx-[-2.5rem] flex items-center pb-6 pt-8" aria-hidden="true">
    <div className="flex-grow border-t border-gray-300" />
    <span className="mx-2 mt-[-2px] flex-shrink text-lg text-gray-500">or</span>
    <div className="flex-grow border-t border-gray-300" />
  </div>
);

const SectionWithHeadingAndCreateButton = ({
  heading,
  buttonText,
}: {
  heading: string;
  buttonText: string;
}) => {
  return (
    <>
      <p className="text-lg font-semibold text-[#212e7c]">{heading}</p>
      <div className="mt-5">
        <Link
          href="/resume-builder"
          className="outline-theme-blue inline-block rounded-full bg-[#7788EE] px-6 pb-2 pt-1.5 text-base font-semibold text-white hover:bg-[#212e7c] transition-all duration-300 hover:shadow-lg hover:scale-105"
        >
          {buttonText}
        </Link>
      </div>
    </>
  );
};