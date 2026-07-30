import type { Project } from "../types/type"

export function ProjectCard({ project }: { project: Project }) {
  const names = (project.credits ?? "")
    .split(",")
    .map((n) => n.trim())
    .filter(Boolean)

  return (
    <div className="flex flex-col gap-3">
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

      {names.length > 0 && (
        <div className="flex flex-col gap-2">
          <p className="font-sans text-xs font-semibold uppercase tracking-wide text-[#3343a5]">
            Credits
          </p>
          <ul className="flex flex-wrap gap-2">
            {names.map((name) => (
              <li
                key={name}
                className="rounded-full border border-[#3343a5]/25 bg-[#eef0ff] px-3 py-1 font-sans text-xs text-[#131626] md:text-sm"
              >
                {name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}
