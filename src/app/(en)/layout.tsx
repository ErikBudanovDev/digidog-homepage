import { I18nWrapper } from "@/components/I18nWrapper";
import { RootShell } from "@/app/RootShell";
import { metadataEN } from "@/app/site-metadata";

export const metadata = metadataEN;

export default function ENLayout({ children }: { children: React.ReactNode }) {
  return (
    <RootShell lang="en">
      <I18nWrapper locale="EN">{children}</I18nWrapper>
    </RootShell>
  );
}
