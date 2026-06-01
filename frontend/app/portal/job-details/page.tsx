import App from "@/src/App";

interface JobDetailsPageProps {
  searchParams?: {
    jobId?: string | string[];
  };
}

export default function JobDetailsPage({ searchParams }: JobDetailsPageProps) {
  const jobId = Array.isArray(searchParams?.jobId)
    ? searchParams?.jobId[0]
    : searchParams?.jobId;

  return <App initialView="job-details" initialSelectedJobId={jobId} />;
}
