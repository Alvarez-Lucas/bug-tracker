// list of tickets under specific project
import Head from "next/head";
import AuthCheck from "../../../../components/AuthCheck";
import { firestore, auth, serverTimeStamp } from "../../../../lib/firebase";
import { useCollection } from "react-firebase-hooks/firestore";
import TicketFeed from "../../../../components/TicketFeed";
import { UserContext } from "../../../../lib/context";
import { useRouter } from "next/router";
import { useContext, useState } from "react";

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
    <form onSubmit={createTicket}>
      Assignee
      <input value={assignee} onChange={(e) => setAssignee(e.target.value)} />
      Description
      <input
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      Priority
      <input value={priority} onChange={(e) => setPriority(e.target.value)} />
      Reporter
      <input value={reporter} onChange={(e) => setReporter(e.target.value)} />
      Status
      <input value={status} onChange={(e) => setStatus(e.target.value)} />
      Title
      <input value={title} onChange={(e) => setTitle(e.target.value)} />
      <button type="submit">Create New Post</button>
    </form>
  );
}

const tickets = () => {
  const tickets = TicketQuery();

  return (
    <AuthCheck>
      <Head>
        <title>Tickets Page</title>
      </Head>

      <h1>Tickets Page</h1>
      <TicketFeed tickets={tickets} />
      <CreateNewTicket />
    </AuthCheck>
  );
};

export default tickets;
