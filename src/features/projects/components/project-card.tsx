import type { Project } from "../types/type"

export function ProjectCard({ project }: { project: Project }) {
  return (
    <div className="group relative aspect-620.5/405 w-full overflow-hidden rounded-none shadow-[0px_4px_4px_0px_#131626]">
      <img
        src={project.image}
        alt={project.title}
        className="absolute inset-0 size-full object-cover"
      />
      <p className="absolute bottom-4 left-5 font-sans text-xl font-normal leading-[1.2] text-[#eef0ff] drop-shadow-[0px_4px_4px_rgba(0,0,0,0.25)] md:bottom-6.75 md:left-7.5 md:text-[29px]">
        {project.title}
      </p>
    </div>
  )
}
