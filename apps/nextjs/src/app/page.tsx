import { AuthShowcase } from "~/components/auth";

export default function Home() {
  return (
    <div className="ui_hero bg-base-200 min-h-screen">
      <div className="ui_hero-content text-center">
        <div className="max-w-md">
          <h1 className="text-5xl font-bold">Web Bookmarker</h1>
          <p className="py-6">
            Webサイトのブックマーク（あとで読む）を行うサイトです。
          </p>
          <AuthShowcase />
        </div>
      </div>
    </div>
  );
}
