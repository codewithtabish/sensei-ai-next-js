"use client"
import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";
import { useEffect, useRef } from "react";
import HeroVideoDialog from "../ui/hero-video-dialog";
import HeroVideoDialogDemo from "./hero-video";

export default function HeroSection() {
    const imageRef = useRef(null);

    useEffect(() => {
      const imageElement = imageRef.current;
  
      const handleScroll = () => {
        const scrollPosition = window.scrollY;
        const scrollThreshold = -20;
  
        if (scrollPosition > scrollThreshold) {
            // @ts-ignore
          imageElement.classList.add("scrolled");
        } else {
                        // @ts-ignore

          imageElement.classList.remove("scrolled");
        }
      };
  
      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
    }, []);
  
  return (
    <section className="container mx-auto 
    md:mt-0 mt-10
    ">
      <div className="container mx-auto flex px-5 py-24 md:flex-row flex-col items-center justify-center">
        {/* Left Content */}
        <div className="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
          <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium ">
          Your AI Career Coach for
            <br className="hidden lg:inline-block" /> 
            Professional Success
          </h1>
          <p className="mb-8 leading-relaxed">
          Advance your career with personalized guidance, interview prep, and
          AI-powered tools for job success..
          </p>
          {/* Buttons */}
          <div className="flex justify-center space-x-4">
          <Link href="/dashboard">
            <Button size="lg" className="px-8">
              Get Started
            </Button>
          </Link>
          {/* <Link href="https://www.youtube.com/roadsidecoder"> */}
          <HeroVideoDialogDemo/>
          {/* </Link> */}
        </div>
        </div>

        <div className="hero-image-wrapper mt-5 md:mt-0">
          <div ref={imageRef} className="hero-image">
            <Image
              src="/herotwo.svg"
              width={520}
              height={500}
              alt="Dashboard Preview"
              className="object-contain"
              priority
            />
          </div>
        </div>

        {/* Right Image
        <div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6">
          <Image
            className="object-cover object-center rounded"
            src="https://dummyimage.com/720x600"
            alt="hero"
            width={720}
            height={600}
            priority
          />
        </div> */}
      </div>
    </section>
  );
}
