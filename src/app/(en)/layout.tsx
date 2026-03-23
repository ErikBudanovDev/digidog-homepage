import { I18nWrapper } from "@/components/I18nWrapper";

export default function ENLayout({ children }: { children: React.ReactNode }) {
  return <I18nWrapper locale="EN">{children}</I18nWrapper>;
}
