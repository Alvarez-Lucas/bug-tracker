// list of tickets under specific project
import Head from "next/head";
import AuthCheck from "../../../../components/AuthCheck";
import { firestore, auth, serverTimeStamp } from "../../../../lib/firebase";
import { useCollection } from "react-firebase-hooks/firestore";
import TicketFeed from "../../../../components/TicketFeed";
import { UserContext } from "../../../../lib/context";
import { useRouter } from "next/router";
import { useContext, useState } from "react";

const tickets = () => {
  return (
    <AuthCheck>
      <Head>
        <title>Tickets Page</title>
      </Head>

      <h1>Tickets Page</h1>

      <TicketList />
      <CreateNewTicket />
    </AuthCheck>
  );
};

function TicketList() {
  const [project, setProject] = useState("");
  const router = useRouter();

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

  return (
    <>
      <TicketFeed tickets={tickets} />
    </>
  );
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

  cons;

  const createTicket = async (e) => {
    e.preventDefault();
    // const uid = auth.currentUser.uid;
    const ref = firestore
      .collection("projects")
      .doc("Banana Project")
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
      <input value={assignee} onChange={(e) => setAssignee(e.target.value)} />
      <input
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <input value={priority} onChange={(e) => setPriority(e.target.value)} />
      <input value={reporter} onChange={(e) => setReporter(e.target.value)} />
      <input value={status} onChange={(e) => setStatus(e.target.value)} />
      <input value={title} onChange={(e) => setTitle(e.target.value)} />
      <button type="submit">Create New Post</button>
    </form>
  );
}

export default tickets;
