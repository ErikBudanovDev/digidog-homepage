import type { Metadata } from "next";
import { WorkflowPilotPage } from "@/components/campaign/WorkflowPilotPage";
export const metadata: Metadata = { title: "Put AI intelligence to work in your business", description: "Paid discovery and one bounded AI workflow pilot for established B2B teams.", robots: { index: false, follow: false } };
export default function Page() { return <WorkflowPilotPage variant="a" />; }
