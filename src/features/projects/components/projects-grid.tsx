"use client"

import { motion } from "framer-motion"
import { useProjects } from "@/integrations/supabase/use-content"
import { ProjectCard } from "./project-card"

export function ProjectsGrid() {
  const { data: projects } = useProjects()

  return (
    <div className="mx-auto max-w-360 px-5 py-8 md:px-8 md:py-10 lg:px-25 lg:py-15">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:gap-x-12 md:gap-y-8 lg:gap-x-25 lg:gap-y-10.75">
        {projects.map((project, index) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, x: index % 2 === 0 ? -60 : 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <ProjectCard
              project={{
                id: index + 1,
                image: project.image_url || "/Bwtnd.png",
                title: project.title,
                credits: project.credits ?? "",
              }}
            />
          </motion.div>
        ))}
      </div>
    </div>
  )
}
