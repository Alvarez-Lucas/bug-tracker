import Link from "next/link";
import { useRouter } from "next/router";
import {
  Button,
  Card,
  Stack,
  CssBaseline,
  Typography,
  CardContent,
  CardActionArea,
  CardHeader,
  CardMedia,
  Grid,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import { query } from "firebase/firestore";
import { Box } from "@mui/system";

export default function ProjectFeed({ projects }) {
  return projects
    ? projects.map((project) => (
        <Grid item xs={12} lg={6} fullWidth key={project.id}>
          <ProjectItem project={project} key={project.id} />
        </Grid>
      ))
    : null;
}

function ProjectItem({ project }) {
  const router = useRouter();
  console.log("project.data", project.data);

  return (
    <Card>
      <CardActionArea
        onClick={() => {
          router.push({
            pathname: "/projects/[id]/tickets",
            query: { id: project.id },
          });
        }}
      >
        <CardHeader title={project.data.title} />
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            {project.data.description}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
