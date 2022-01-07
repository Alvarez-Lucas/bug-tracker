import Link from "next/link";
import { useRouter } from "next/router";
import { Button, Card, Stack, CssBaseline, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";

export default function ProjectFeed({ projects }) {
  return projects
    ? projects.map((project) => (
        <ProjectItem project={project} key={project.id} />
      ))
    : null;
}

function ProjectItem({ project }) {
  const router = useRouter();

  const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
  }));

  return (
    <Item>
      <CssBaseline />
      <Typography variant="h6">{project.data.title}</Typography>
      <Button
        variant="outlined"
        type="button"
        onClick={() => {
          router.push({
            pathname: "/projects/[id]/tickets",
            query: { id: project.id },
          });
        }}
      >
        View
      </Button>
    </Item>
  );
}
