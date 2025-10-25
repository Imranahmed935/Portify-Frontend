"use client";

import { Zap, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Hero115Props {
  icon?: React.ReactNode;
  heading1?: string;
  description1?: string;
  heading: string;
  description: string;
  button: {
    text: string;
    icon?: React.ReactNode;
    url: string;
  };
  button1?: {
    text: string;
    url?: string;
  };
  title?: string;
  imageSrc?: string;
  imageAlt?: string;
  about?: string;
}

const HeroSection = ({
  icon = <span className="text-3xl animate-wave">👋</span>,
  heading1 = "Hi there!",
  description1 = "I’m Imran, a full stack developer.",
  heading = "Blocks built with Shadcn & Tailwind",
  description = "Finely crafted components built with React, Tailwind and Shadcn UI.",
  about = "Building responsive, efficient, and scalable web applications with React, Node.js, Express, and MongoDB.",
  imageSrc,
  imageAlt = "About Image",
  button = {
    text: "Discover Features",
    icon: <Zap className="ml-2 w-4 h-4" />,
    url: "/full-stack-developer-imran-ahmed.pdf",
  },
  button1 = {
    text: "Contact",
    url: "#Contact-Section",
  },
  title = "About Me",
}: Hero115Props) => {
  return (
    <section className="overflow-hidden sm:pt-32 lg:pt-52 xl:pt-52 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-24">
      <div className="container mx-auto lg:mt-0 mt-32">
        <div className="flex flex-col gap-8 md:gap-10 lg:gap-16">
         
          <div className="relative flex flex-col gap-5 text-center px-2 sm:px-4 md:px-8">
   
            <div
              style={{ transform: "translate(-50%, -50%)" }}
              className="absolute left-1/2 top-1/2 -z-10 mx-auto w-[600px] sm:w-[800px] md:w-[1100px] lg:w-[1300px] h-[600px] sm:h-[800px] md:h-[1100px] lg:h-[1300px] rounded-full border p-12 sm:p-16 md:p-24 lg:p-32 
              mask-image-[linear-gradient(to_top,transparent,transparent,white,white,white,transparent,transparent)]"
            >
              <div className="w-full h-full rounded-full border p-12 sm:p-16 md:p-24 lg:p-32">
                <div className="w-full h-full rounded-full border"></div>
              </div>
            </div>

          
            <span className="mx-auto flex w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 items-center justify-center rounded-full border border-zinc-700 bg-zinc-900 text-white shadow-md">
              {icon}
            </span>

            
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold">
              {heading1}
            </h2>
            <p className="text-gray-400 text-sm sm:text-base md:text-lg">
              {description1}
            </p>

     
            <h2 className="mx-auto max-w-4xl sm:max-w-5xl text-center text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold leading-snug md:leading-tight">
              {heading}
            </h2>

       
            <p className="text-muted-foreground mx-auto max-w-2xl sm:max-w-3xl text-center text-sm sm:text-base md:text-lg px-2">
              {description}
            </p>

       
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pb-10 pt-3">
              <Button size="lg" asChild>
                <a href={button.url} download>
                  {button.text} {button.icon}
                </a>
              </Button>
            </div>
          </div>

    
          {about && (
            <div className="mx-auto w-full max-w-6xl rounded-2xl bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900 text-white shadow-xl flex flex-col md:flex-row items-center px-4 sm:px-6 md:px-8 gap-6">
              {imageSrc && (
                <img
                  src={imageSrc}
                  alt={imageAlt}
                  className="w-full md:w-1/3 h-auto rounded-2xl object-cover shadow-lg hover:scale-105 transition-transform duration-300"
                />
              )}

              <div className="flex flex-col gap-5 md:w-2/3 px-2 sm:px-4 md:px-6">
                <h3 className="text-2xl sm:text-3xl font-semibold text-white mb-2 border-b border-zinc-700 pb-2 w-fit">
                  {title}
                </h3>

                <p className="text-zinc-300 leading-relaxed text-justify text-sm sm:text-base md:text-lg">
                  {about}
                </p>

                <div className="pt-4">
                  <Button
                    className="bg-blue-500 w-full sm:w-52 text-white transition-all flex items-center justify-center gap-2"
                    asChild
                  >
                    <a href={button1.url}>
                      <Mail className="w-4 h-4" /> {button1.text}
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export { HeroSection };
