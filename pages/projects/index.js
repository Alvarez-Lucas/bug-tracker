// Page with list of projects
import Head from "next/head";
import AuthCheck from "../../components/AuthCheck";
import { firestore, auth, serverTimeStamp } from "../../lib/firebase";
import { useCollection } from "react-firebase-hooks/firestore";
import TicketFeed from "../../components/TicketFeed";
import { UserContext } from "../../lib/context";
import { useRouter } from "next/router";
import { useContext, useState } from "react";
import ProjectFeed from "../../components/ProjectFeed";
import { Button, Card, CssBaseline, Stack, Box, Input } from "@mui/material";

// Firebase call
function ProjectQuery() {
  const projRef = firestore.collection("projects");
  const query = projRef.orderBy("creationDate");
  const [queryProject] = useCollection(query);

  var projects = [];
  queryProject?.docs.forEach(function (doc) {
    projects.push({ data: doc.data(), id: doc.id });
  });

  return projects;
}
function CreateNewProject() {
  const { user } = useContext(UserContext);
  const [pm, setPM] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const createProject = async (e) => {
    e.preventDefault();
    const ref = firestore.collection("projects").doc();

    const data = {
      author: user.uid,
      pm,
      creationDate: serverTimeStamp(),
      lastUpdated: serverTimeStamp(),
      title,
      description,
      status: "Open",
    };
    await ref.set(data);
  };

  return (
    <form onSubmit={createProject}>
      <Box
        component="form"
        sx={{
          "& > :not(style)": { m: 1 },
        }}
        noValidate
        autoComplete="off"
      >
        Title
        <Input value={title} onChange={(e) => setTitle(e.target.value)} />
        Description
        <Input
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        Project Manager
        <Input value={pm} onChange={(e) => setPM(e.target.value)} />
        <Button variant="contained" type="submit">
          Create New Post
        </Button>
      </Box>
    </form>
  );
}

const projects = () => {
  // query function, returns call list of projects
  const projectData = ProjectQuery();

  return (
    <div>
      <AuthCheck>
        <Stack spacing={3}>
          <ProjectFeed projects={projectData} />
        </Stack>
        <CreateNewProject />
      </AuthCheck>
    </div>
  );
};

export default projects;
