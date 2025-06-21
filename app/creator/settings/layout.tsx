import SettingsSideMenu from "@/components/creator/settings/settings-side-menu";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Settings | My App",
};

interface SettingsLayoutProps {
  children: React.ReactNode;
}

export default function SettingsLayout({ children }: SettingsLayoutProps) {
  return (
    <>
      {/* <SiteHeader /> */}
      <main className="flex flex-1 gap-6 mt-0 w-full">
        <SettingsSideMenu />
        <section className="flex-1 main-container bg-bgColor h-full border-l border-r">
          <div className="w-full">{children}</div>
        </section>
      </main>
    </>
  );
}
