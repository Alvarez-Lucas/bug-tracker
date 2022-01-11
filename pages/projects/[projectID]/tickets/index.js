// list of tickets under specific project
import Head from "next/head";
import AuthCheck from "../../../../components/AuthCheck";
import { firestore, auth, serverTimeStamp } from "../../../../lib/firebase";
import { useCollection } from "react-firebase-hooks/firestore";
import TicketFeed from "../../../../components/TicketFeed";
import { UserContext } from "../../../../lib/context";
import { useRouter } from "next/router";
import { useContext, useState } from "react";
import {
  Button,
  Card,
  CssBaseline,
  Stack,
  Box,
  Input,
  Typography,
} from "@mui/material";

function TicketQuery() {
  const router = useRouter();

  const projectID = router.query.projectID;

  const ref = firestore
    .collection("projects")
    .doc(projectID)
    .collection("tickets");
  const query = ref.orderBy("creationDate");
  const [querySnapshot] = useCollection(query);

  var tickets = [];
  querySnapshot?.docs.forEach(function (doc) {
    tickets.push({ data: doc.data(), id: doc.id });
  });

  return tickets;
}

function CreateNewTicket() {
  const router = useRouter();
  const { username } = useContext(UserContext);
  const [assignee, setAssignee] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("");
  const [reporter, setReporter] = useState("");
  const [status, setStatus] = useState("");
  const [title, setTitle] = useState("");
  const [project, setProject] = useState("");

  const projectID = router.query.projectID;

  const createTicket = async (e) => {
    e.preventDefault();
    // const uid = auth.currentUser.uid;
    const ref = firestore
      .collection("projects")
      .doc(projectID)
      .collection("tickets")
      .doc();

    const data = {
      assignee,
      creationDate: serverTimeStamp(),
      description,
      lastUpdated: serverTimeStamp(),
      priority,
      reporter,
      status,
      title,
    };

    await ref.set(data);
  };

  return (
    // <form onSubmit={createTicket}>
    <Box
      component="form"
      sx={{
        "& > :not(style)": { m: 1 },
      }}
      noValidate
      autoComplete="off"
      onSubmit={createTicket}
    >
      Assignee
      <Input value={assignee} onChange={(e) => setAssignee(e.target.value)} />
      Description
      <Input
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      Priority
      <Input value={priority} onChange={(e) => setPriority(e.target.value)} />
      Reporter
      <Input value={reporter} onChange={(e) => setReporter(e.target.value)} />
      Status
      <Input value={status} onChange={(e) => setStatus(e.target.value)} />
      Title
      <Input value={title} onChange={(e) => setTitle(e.target.value)} />
      <Button variant="contained" type="submit">
        Create New Post
      </Button>
    </Box>
    // </form>
  );
}

const tickets = () => {
  const tickets = TicketQuery();

  return (
    <AuthCheck>
      <Head>
        <title>Tickets Page</title>
      </Head>

      <Typography variant="h3">Tickets Page</Typography>
      <TicketFeed tickets={tickets} />
      <CreateNewTicket />
    </AuthCheck>
  );
};

export default tickets;
