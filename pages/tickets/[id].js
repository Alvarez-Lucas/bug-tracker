import TicketView from "../../components/TicketView";
import { withRouter, NextRouter, useRouter } from "next/router";

// export const getStaticPaths = async () => {
//     const res = await fetch
// }

const TicketDetails = () => {
  const router = useRouter();

  return (
    <div>
      <h1>Test</h1>
      <p>{console.log(router.query)}</p>
      <TicketView id={router.query} />
    </div>
  );
};

export default TicketDetails;
