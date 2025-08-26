import { ReactNode } from "react";

import StreamVideoProvider from "@/providers/StreamClientProvider";

const RootLayout = ({ children }: Readonly<{ children: ReactNode }>) => {
  return (
    <main className="bg-dark-2">
      <StreamVideoProvider>{children}</StreamVideoProvider>
      {/* {children} */}
    </main>
  );
};

export default RootLayout;
