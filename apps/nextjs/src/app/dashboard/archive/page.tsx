"use client";

import { Suspense } from "react";

import { BookmarkListIsArchives } from "~/components/bookmark/bookmarkList";

export default function ArchiveBookmark() {
  return (
    <div className="w-10/12">
      <Suspense fallback={<p className="mt-4">Loading...</p>}>
        <BookmarkListIsArchives />
      </Suspense>
    </div>
  );
}
