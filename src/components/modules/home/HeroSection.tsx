import { HandFist, Zap, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Hero115Props {
  icon?: React.ReactNode;
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
  trustText?: string;
  imageSrc?: string;
  imageAlt?: string;
  about?: string;
}

const HeroSection = ({
  icon = <HandFist className="w-6 h-6" />,
  heading = "Blocks built with Shadcn & Tailwind",
  description = "Finely crafted components built with React, Tailwind and Shadcn UI.",
  about = "Building responsive, efficient, and scalable web applications with React, Node.js, Express, and MongoDB.",
  imageSrc,
  imageAlt = "About Image",
  button = {
    text: "Discover Features",
    icon: <Zap className="ml-2 w-4 h-4" />,
    url: "#",
  },
  button1 = {
    text: "Contact",
    url: "#contact",
  },
  title = "About Me",
}: Hero115Props) => {
  return (
    <section className="overflow-hidden lg:pt-96 pt-32">
      <div className="container mx-auto">
        <div className="flex flex-col gap-5 lg:-mt-28">

          <div className="relative flex flex-col gap-5 text-center">

            <div
              style={{ transform: "translate(-50%, -50%)" }}
              className="absolute left-1/2 top-1/2 -z-10 mx-auto w-[800px] h-[800px] rounded-full border p-16 
              mask-image-[linear-gradient(to_top,transparent,transparent,white,white,white,transparent,transparent)] 
              md:w-[1300px] md:h-[1300px] md:p-32"
            >
              <div className="w-full h-full rounded-full border p-16 md:p-32">
                <div className="w-full h-full rounded-full border"></div>
              </div>
            </div>

       
            <span className="mx-auto flex w-16 h-16 items-center justify-center rounded-full border border-zinc-700 bg-zinc-900 text-white shadow-md md:w-20 md:h-20">
              {icon}
            </span>


            <h2 className="mx-auto max-w-5xl text-center text-3xl font-semibold leading-tight md:text-6xl">
              {heading}
            </h2>


            <p className="text-muted-foreground mx-auto max-w-3xl text-center text-base md:text-lg">
              {description}
            </p>

      
            <div className="flex flex-col items-center justify-center gap-3 pb-12 pt-3">
              <Button size="lg" asChild>
                <a href={button.url}>
                  {button.text} {button.icon}
                </a>
              </Button>
            </div>
          </div>

     
          {about && (
            <div className="mx-auto w-full max-w-6xl rounded-2xl bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900 text-white shadow-xl flex flex-col md:flex-row items-center gap-10 ">
    
              {imageSrc && (
                <img
                  src={imageSrc}
                  alt={imageAlt}
                  className="w-full md:w-1/3 h-auto rounded-2xl object-cover shadow-lg hover:scale-105 transition-transform duration-300"
                />
              )}

             
              <div className="flex flex-col gap-5 md:w-2/3 lg:p-4 p-2">
                <h3 className="text-3xl font-semibold text-white mb-2 border-b border-zinc-700 pb-2 w-fit">
                  {title}
                </h3>

                <p className="text-zinc-300 leading-relaxed text-justify">
                  {about}
                </p>

                <div className="pt-4">
                  <Button
                    className="bg-blue-500 w-52 text-white transition-all flex items-center gap-2"
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
