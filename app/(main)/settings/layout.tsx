import SettingsSideMenu from "@/components/main/settings/settings-side-menu";
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
      <main className="flex flex-row gap-6 mt-0 sm:max-w-7xl mx-auto">
        <SettingsSideMenu />
        <section className="main-container bg-bgColor h-full border-l border-r">
          <div className="w-full">{children}</div>
        </section>
      </main>
    </>
  );
}
