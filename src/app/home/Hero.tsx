import Link from "next/link";
import { FlexboxSpacer } from "components/FlexboxSpacer";
import Image from 'next/image';

export const Hero = () => {
  return (
    <section className="lg:flex lg:h-[825px] lg:justify-center">
      <FlexboxSpacer maxWidth={75} minWidth={0} className="hidden lg:block" />
        <div className="mx-auto max-w-xl pt-24 text-center lg:mx-0 lg:grow lg:pt-56 lg:text-left">
        <h1 className="text-primary pb-2 text-4xl font-bold lg:text-5xl">
          Accelerate Your Job Hunt 
          <br />
          with AI-Powered Support
        </h1>
        <Link href="/resume-import" className="btn-primary mt-6 lg:mt-14">
          Get Started <span aria-hidden="true">→</span>
        </Link>
      </div>
      <FlexboxSpacer maxWidth={100} minWidth={50} className="hidden lg:block" />
      <div className="mt-6 flex justify-center lg:mt-4 lg:block lg:grow">
        <Image
            src="/assets/output-onlinegiftools.gif"
            alt="Job Hunt Animation"
            width={650}
            height={300}
            className="rounded-lg"
          />
      </div>
    </section>
  );
};
