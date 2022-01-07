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

// Firebase call
function ProjectQuery() {
  const projRef = firestore.collection("projects");
  const [queryProject] = useCollection(projRef);

  var projects = [];
  queryProject?.docs.forEach(function (doc) {
    projects.push(doc.id);
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
  // query function, returns call list of projects
  const projects = ProjectQuery();
  

  return (
    <div>
      <AuthCheck>
        <ProjectFeed projects={projects} />
        <CreateNewProject />
      </AuthCheck>
    </div>
  );
};

export default projects;
