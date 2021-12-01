import TicketView from "../../components/TicketFeed";
import { withRouter, NextRouter, useRouter } from "next/router";

// export const getStaticPaths = async () => {
//     const res = await fetch
// }

const ProjectDetails = () => {
  const router = useRouter();

  return (
    <div>
      <h1>Test</h1>
      <p>{console.log(router.query)}</p>
      <TicketFeed>{router.query}</TicketFeed>
    </div>
  );
};

export default ProjectDetails;
