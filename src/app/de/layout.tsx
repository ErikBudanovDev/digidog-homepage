import { I18nWrapper } from "@/components/I18nWrapper";
import { RootShell } from "@/app/RootShell";
import { metadataDE } from "@/app/site-metadata";

export const metadata = metadataDE;

export default function DELayout({ children }: { children: React.ReactNode }) {
  return (
    <RootShell lang="de">
      <I18nWrapper locale="DE">{children}</I18nWrapper>
    </RootShell>
  );
}
