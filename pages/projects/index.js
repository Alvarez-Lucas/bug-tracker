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


function ProjectList() {
  const projRef = firestore.collection("projects");
  const [queryProject] = useCollection(projRef);

  var proj = [];
  queryProject?.docs.forEach(function (doc) {
    proj.push(doc.id);
  });

  return (
    <>
      <ProjectFeed projects={proj}></ProjectFeed>
    </>
  );
}

function CreateNewProject() {
  const { user } = useContext(UserContext);
  const [pm, setPM] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const createProject = async (e) => {
    e.preventDefault();
    const ref = firestore
      .collection("projects")
      .doc();
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
      Title
      <input value={title} onChange={(e) => setTitle(e.target.value)} />
      Description
      <input
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      Project Manager
      <input value={pm} onChange={(e) => setPM(e.target.value)} />
      <button type="submit">Create New Post</button>
    </form>
  );
}

const projects = () => {
  return (
    <div>
      <AuthCheck>
        <ProjectList />
        <CreateNewProject />
      </AuthCheck>
    </div>
  );
};

export default projects;
