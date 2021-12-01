import Link from "next/link";
import { useRouter } from "next/router";

export default function ProjectFeed({ projects }) {
  return projects
    ? projects.map((project) => <ProjectItem project={project} />)
    : null;
}

function ProjectItem({ project }) {
  const router = useRouter();

  return (
    <>
      {proj.map((proj) => (
        <h1 key={proj}>{proj}</h1>
      ))}
    </>
  );
}
