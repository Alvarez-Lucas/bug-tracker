import { Breadcrumbs, Typography } from "@mui/material";
import Link from "next/link";

export default function TicketGarlicBread({ data }) {
  return (
    <>
      {data.ticketData && data.projectName && data.projectID && data.ticketID && (
        <Breadcrumbs aria-label="breadcrumb">
          <Link
            underline="hover"
            color="inherit"
            href={`/projects/${data.projectID}/tickets`}
          >
            {data.projectName}
          </Link>

          <Link
            underline="hover"
            color="inherit"
            href={`/projects/${data.projectID}/tickets/${data.ticketID}`}
          >
            {data.ticketData.title}
          </Link>
        </Breadcrumbs>
      )}
    </>
  );
}
