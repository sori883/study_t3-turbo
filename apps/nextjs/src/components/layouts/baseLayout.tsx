import { headers } from "next/headers";

import { TRPCReactProvider } from "~/app/providers";

// Provider設定
export const LayoutProvider = ({ children }: { children: React.ReactNode }) => (
  <TRPCReactProvider headers={headers()}>{children}</TRPCReactProvider>
);

// 取り敢えずのレイアウト
export const BaseLayout = ({ children }: { children: React.ReactNode }) => (
  <LayoutProvider>
    <main className="flex w-full">
      <div className="container mx-auto flex min-h-screen max-w-full flex-1 flex-col">
        {children}
      </div>
    </main>
  </LayoutProvider>
);
