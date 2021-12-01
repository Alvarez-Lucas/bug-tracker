import Head from "next/head";
import AuthCheck from "../../components/AuthCheck";
import { firestore, auth, serverTimeStamp } from "../../lib/firebase";
import { useCollection } from "react-firebase-hooks/firestore";
import TicketFeed from "../../components/TicketFeed";
import { UserContext } from "../../lib/context";
import { useRouter } from "next/router";
import { useContext, useState } from "react";
import ProjectFeed from "../../../components/ProjectFeed";

const projects = () => {
  return (
    <div>
      <ProjectList />
    </div>
  );
};

function ProjectList() {
  const projRef = firestore.collection("projects");
  const [queryProject] = useCollection(projRef);

  var proj = [];
  queryProject?.docs.forEach(function (doc) {
    proj.push(doc.id);
  });

  return (
    <>
      {/* <form action="">
                <select>
                {proj.map((x) => (
                    <option key={x}>{x}</option>
                ))}
                </select>
                <input type="submit" value="Submit"></input>
            </form> */}
      {/* <h1>{ticket.data.title}</h1>

            <p>{ticket.data.description}</p>
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
            </button> */}

      {/* {proj.map((proj) => (
        <h1 key={proj}>{proj}</h1>
      ))} */}
      <ProjectFeed projects={proj}></ProjectFeed>
    </>
  );
}
export default projects;
