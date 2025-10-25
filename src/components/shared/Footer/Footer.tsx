import Link from "next/link";
import { Linkedin, Github } from "lucide-react";
import LogoMark from "../LogoMark";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative w-full overflow-hidden pt-16 pb-10 bg-gray-900">
      {/* Background Layer */}
      <div
        className="absolute inset-0 z-0"
        style={{
          background:
            "radial-gradient(125% 125% at 50% 60%, #0f0f0f 40%, #1a1a2e 100%)",
        }}
      />

     
      <div className="relative z-10 container mx-auto px-6 sm:px-8 md:px-12 lg:px-20 xl:px-28 text-white">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8 text-center md:text-left">
      
          <div>
            <LogoMark/>
            <p className="text-gray-400 text-sm">Full Stack Developer Portfolio</p>
          </div>

      
          <div className="flex flex-wrap justify-center md:justify-start gap-6 text-sm font-medium">
            <Link href="/" className="hover:text-blue-500 transition-colors">
              Home
            </Link>
            <Link href="#Projects" className="hover:text-blue-500 transition-colors">
              Projects
            </Link>
            <Link href="#BlogSection" className="hover:text-blue-500 transition-colors">
              Blog
            </Link>
            <Link href="#Contact-Section" className="hover:text-blue-500 transition-colors">
              Contact
            </Link>
          </div>

        
          <div className="flex items-center gap-4 mt-4 md:mt-0">
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-blue-500 transition-colors"
            >
              <Linkedin className="w-5 h-5" />
            </a>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-blue-500 transition-colors"
            >
              <Github className="w-5 h-5" />
            </a>
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="mt-8 text-center text-gray-500 text-sm">
          © {currentYear} Portify. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
