import Head from "next/head";
import AuthCheck from "../components/AuthCheck";
import { firestore, auth, serverTimeStamp } from "../lib/firebase";
import { useCollection } from "react-firebase-hooks/firestore";
import IssueFeed from "../components/IssueFeed";
import { UserContext } from "../lib/context";
import { useRouter } from "next/router";
import { useContext, useState } from "react";

const issues = () => {
  return (
    <AuthCheck>
      <Head>
        <title>Issues</title>
      </Head>

      <h1>Issues Page</h1>
      <TicketList />
      <CreateNewTicket />
    </AuthCheck>
  );
};

function TicketList() {
  const ref = firestore
    .collection("projects")
    .doc("Banana Project")
    .collection("tickets");
  const query = ref.orderBy("creationDate");
  const [querySnapshot] = useCollection(query);

  const tickets = querySnapshot?.docs.map((doc) => doc.data());
  return (
    <>
      <IssueFeed tickets={tickets} />
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

export default issues;
