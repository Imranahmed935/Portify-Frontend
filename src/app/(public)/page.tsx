import BlogSection from "@/components/modules/home/BlogSection";
import ContactSection from "@/components/modules/home/ContactSection";
import { HeroSection } from "@/components/modules/home/HeroSection";
import ProjectSection from "@/components/modules/home/ProjectSection";
import Skills from "@/components/modules/home/Skills";

export default function Home() {
  return (
    <div>
      <HeroSection
        icon={<span className="text-3xl animate-wave">👋</span>}
        heading1="Hi there!"
        description1="I’m Imran, a full stack developer."
        heading="Crafting Seamless Frontend & Powerful Backend Solutions"
        description="A passionate Full Stack Developer skilled in building modern web applications from front to back, creating seamless user experiences and robust server-side solutions."
        button={{
          text: "Download Resume",
          icon: undefined,
          url: "/full-stack-developer- imran ahmed (1).pdf",
        }}
        button1={{
          text: "Contact",
          url: "#Contact-Section",
        }}
        title="About Me"
        about="A dedicated Full Stack Developer with a focus on building responsive, interactive, and user-centric web interfaces. My expertise spans across React, TailwindCSS, JavaScript, Express, MongoDB, Mongoose, and various modern web technologies. Outside of work, I’m a coffee enthusiast with a deep passion for movies, reading, and continuously expanding my skill set. I’m always eager to connect and collaborate on innovative projects. Let’s build something exceptional together."
        imageSrc="/portify-image.png"
        imageAlt="Full Stack Developer Illustration"
      />
      <Skills />
      <ProjectSection />
      <BlogSection />
      <ContactSection />
    </div>
  );
}
