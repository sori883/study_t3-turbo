import { Suspense } from "react";

import { BookmarkListInCategory } from "~/components/bookmark/bookmarkList";

export default function CategoryBookmark({
  params,
}: {
  params: { slug: string };
}) {
  return (
    <Suspense fallback={<p className="mt-4">Loading...</p>}>
      <BookmarkListInCategory slug={params.slug} />
    </Suspense>
  );
}
