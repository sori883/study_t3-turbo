import { Suspense } from "react";

import { BookmarkList } from "~/components/bookmark/bookmarkList";

export default function Dashboard() {
  return (
    <Suspense fallback={<p className="mt-4">Loading...</p>}>
      <BookmarkList />
    </Suspense>
  );
}
