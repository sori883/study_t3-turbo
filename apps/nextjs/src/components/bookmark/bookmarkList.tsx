"use client";

import { api } from "~/utils/api";
import { BookmarkCard, BookmarkCardInCategory } from "./bookmarkCard";

export function BookmarkList() {
  const [bookmarks] = api.bookmark.all.useSuspenseQuery({ isArchive: false });

  if (bookmarks.length === 0) {
    return <NoBookmarkYet />;
  }

  return (
    <div className="flex w-3/4 flex-col gap-4 p-4">
      {bookmarks.map((b) => {
        return <BookmarkCard key={b.id} bookmark={b} />;
      })}
    </div>
  );
}

export function BookmarkListIsArchives() {
  const [bookmarks] = api.bookmark.all.useSuspenseQuery({ isArchive: true });

  if (bookmarks.length === 0) {
    return <NoBookmarkYet />;
  }

  return (
    <div className="flex w-3/4 flex-col gap-4 p-4">
      {bookmarks.map((b) => {
        return <BookmarkCard key={b.id} bookmark={b} />;
      })}
    </div>
  );
}

export function BookmarkListInCategory(props: { slug: string }) {
  const [results] = api.bookmark.byCategory.useSuspenseQuery(props);

  if (results.length === 0) {
    return <NoBookmarkYet />;
  }

  return (
    <div className="flex w-3/4 flex-col gap-4 p-4">
      {results.map((b) => {
        return (
          <BookmarkCardInCategory
            key={b.bookmarks.id}
            bookmark={b.bookmarks}
            category={b.categories}
          />
        );
      })}
    </div>
  );
}

export function NoBookmarkYet() {
  return (
    <div className="relative flex w-full flex-col gap-4">
      <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/10">
        <p className="text-2xl font-bold text-white">No bookmark yet</p>
      </div>
    </div>
  );
}
