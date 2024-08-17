"use client";
import { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import logoSrc from "public/assets/jobdope-2.png";
import { cx } from "lib/cx";
import { LoginPopup } from "home/LoginPopup"; 
import { SignUpPopup } from "home/SignupPopup";

export const TopNavBar = () => {
  const pathName = usePathname();
  const isHomePage = pathName === "/";
  const [isLoginOpen, setLoginOpen] = useState(false);
  const [isSignUpOpen, setSignUpOpen] = useState(false);

  const openLogin = () => setLoginOpen(true);
  const closeLogin = () => setLoginOpen(false);
  const openSignUp = () => setSignUpOpen(true);
  const closeSignUp = () => setSignUpOpen(false);

  return (
    <>
      <header
        aria-label="Site Header"
        className={cx(
          "flex h-[var(--top-nav-bar-height)] items-center border-b-2 border-gray-100 px-3 lg:px-12",
          isHomePage && "bg-dot"
        )}
      >
        <div className="flex h-10 w-full items-center justify-between">
          {/* Logo and Left Navigation Links */}
          <div className="flex items-center gap-8">
            <Link href="/">
              <span className="sr-only">JobDope</span>
              <Image
                src={logoSrc}
                alt="JobDope Logo"
                className="h-14 w-full"
                priority
              />
            </Link>
            <nav
              aria-label="Site Nav Bar"
              className="flex items-center gap-8 text-md font-bold"
            >
              <Link
                className="rounded-md px-1.5 py-2 text-black bg-transparent transition-all duration-300 ease-in-out hover:scale-105 hover:text-[#7788EE]"
                href="/resume-builder"
              >
                Resume Builder
              </Link>
              <Link
                className="rounded-md px-1.5 py-2 text-black bg-transparent transition-all duration-300 ease-in-out hover:scale-105 hover:text-[#7788EE]"
                href="/resume-parser"
              >
                ResumeAI
              </Link>
              <Link
                className="rounded-md px-1.5 py-2 text-black bg-transparent transition-all duration-300 ease-in-out hover:scale-105 hover:text-[#7788EE]"
                href="/about"
              >
                About Us
              </Link>
              <Link
                className="rounded-md px-1.5 py-2 text-black bg-transparent transition-all duration-300 ease-in-out hover:scale-105 hover:text-[#7788EE]"
                href="/blog"
              >
                Blog
              </Link>
              <Link
                className="rounded-md px-1.5 py-2 text-black bg-transparent transition-all duration-300 ease-in-out hover:scale-105 hover:text-[#7788EE]"
                href="/pricing"
              >
                Pricing
              </Link>
            </nav>
          </div>
          {/* Right Navigation Links */}
          <nav
            aria-label="User Nav Bar"
            className="flex items-center gap-4 text-md font-bold"
          >
            <button
              className="rounded-md px-1.5 py-2 text-black bg-transparent transition-all duration-300 ease-in-out hover:scale-105 hover:text-[#7788EE]"
              onClick={openLogin}
            >
              Login
            </button>
            <button
              className="rounded-md bg-[#7788EE] px-3 py-2 text-white transition-all duration-300 ease-in-out hover:border hover:border-[#7788EE] hover:text-[#212e7c] hover:scale-105"
              onClick={openSignUp}
            >
              Sign Up
            </button>
          </nav>
        </div>
      </header>
      <LoginPopup isOpen={isLoginOpen} onClose={closeLogin} />
      <SignUpPopup isOpen={isSignUpOpen} onClose={closeSignUp} />
    </>
  );
};