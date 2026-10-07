import type { Metadata } from "next";
import { WorkflowPilotPage } from "@/components/campaign/WorkflowPilotPage";
export const metadata: Metadata = { title: "Give your team more capacity to think", description: "Paid discovery and one bounded AI workflow pilot for established B2B teams.", robots: { index: false, follow: false } };
export default function Page() { return <WorkflowPilotPage variant="b" />; }
