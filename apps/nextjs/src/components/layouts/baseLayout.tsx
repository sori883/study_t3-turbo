// 取り敢えずのレイアウト
export const BaseLayout = ({ children }: { children: React.ReactNode }) => (
  <div className="flex w-full">
    <div className="container mx-auto flex min-h-screen max-w-full flex-1 flex-col">
      {children}
    </div>
  </div>
);
