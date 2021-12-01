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
      <h1>{project}</h1>
      <button
        type="button"
        onClick={() => {
          router.push({
            pathname: "/projects/tickets/[id]",
            query: { id: ticket.id },
          });
        }}
      >
        Test{" "}
      </button>
    </>
  );
}
