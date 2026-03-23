import { I18nWrapper } from "@/components/I18nWrapper";

export default function DELayout({ children }: { children: React.ReactNode }) {
  return <I18nWrapper locale="DE">{children}</I18nWrapper>;
}
