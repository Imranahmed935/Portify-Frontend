import {
  SiReact,
  SiNextdotjs,
  SiMongodb,
  SiMongoose,
  SiPrisma,
  SiPostgresql,
  SiExpress,
  SiTypescript,
  SiJavascript,
  SiNextra,
  SiFirebase,
  SiTailwindcss,
  SiGithub,
} from "react-icons/si";

const Skills = () => {
  const techs = [
    { icon: <SiReact className="text-sky-400" />, name: "React" },
    { icon: <SiNextdotjs className="text-white" />, name: "Next.js" },
    { icon: <SiMongodb className="text-green-500" />, name: "MongoDB" },
    { icon: <SiMongoose className="text-red-500" />, name: "Mongoose" },
    { icon: <SiPrisma className="text-cyan-400" />, name: "Prisma" },
    { icon: <SiPostgresql className="text-blue-500" />, name: "PostgreSQL" },
    { icon: <SiExpress className="text-gray-400" />, name: "Express" },
    { icon: <SiTypescript className="text-blue-400" />, name: "TypeScript" },
    { icon: <SiJavascript className="text-yellow-400" />, name: "JavaScript" },
    { icon: <SiNextra className="text-emerald-400" />, name: "NextAuth" },
    { icon: <SiFirebase className="text-orange-400" />, name: "Firebase" },
    { icon: <SiTailwindcss className="text-blue-400" />, name: "TailwindCss" },
  ];

  return (
    <div className="lg:py-32 py-20 px-4 max-w-7xl mx-auto text-white space-y-6">
      <h1 className="text-center font-bold text-3xl">Skills</h1>
      <p className="text-center text-muted-foreground mt-2 text-sm md:text-base">
        Technologies and tools I use to craft modern, scalable web applications.
      </p>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2 text-center">
        {techs.map((tech, index) => (
          <div
            key={index}
            className="flex flex-col items-center gap-2 p-4 rounded-xl bg-zinc-900 hover:bg-zinc-800 transition-all duration-300 hover:scale-105 shadow-md"
          >
            <div className="text-5xl">{tech.icon}</div>
            <p className="text-sm font-medium">{tech.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Skills;
