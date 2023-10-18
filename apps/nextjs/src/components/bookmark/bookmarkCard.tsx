"use client";

import Link from "next/link";

import {
  EditFormToBookmark,
  EditFormToBookmarkCategory,
} from "~/components/form/editBookmark";
import { IconArchive, IconBin } from "~/components/icons";
import { api } from "~/utils/api";
import type { RouterOutputs } from "~/utils/api";

export function BookmarkCard(props: {
  bookmark: RouterOutputs["bookmark"]["all"][number];
}) {
  return (
    <div className="ui_card bg-base-100 w-full shadow-xl">
      <div className="ui_card-body">
        <h2 className="ui_card-title">
          <Link href={props.bookmark.url}>{props.bookmark.title}</Link>
        </h2>
        <p>{props.bookmark.category?.title}</p>
        <div className="ui_card-actions justify-end">
          <BookmarkAction bookmark={props.bookmark} />
        </div>
      </div>
    </div>
  );
}

export function BookmarkCardInCategory(props: {
  bookmark: RouterOutputs["bookmark"]["byCategory"][number]["bookmarks"];
  category: RouterOutputs["bookmark"]["byCategory"][number]["categories"];
}) {
  return (
    <div className="ui_card bg-base-100 w-full shadow-xl">
      <div className="ui_card-body">
        <h2 className="ui_card-title">
          <Link href={props.bookmark.url}>{props.bookmark.title}</Link>
        </h2>
        <p>{props.category?.title}</p>
        <div className="ui_card-actions justify-end">
          <BookmarkActionInCategory bookmark={props.bookmark} />
        </div>
      </div>
    </div>
  );
}

export function BookmarkAction(props: {
  bookmark: RouterOutputs["bookmark"]["all"][number];
}) {
  const context = api.useContext();
  const deleteBookmark = api.bookmark.delete.useMutation();
  const toggleBookmark = api.bookmark.toggleArchive.useMutation();

  return (
    <div className="flex gap-2">
      <div className="ui_tooltip" data-tip="Edit">
        <EditFormToBookmark bookmark={props.bookmark} />
      </div>
      <div className="ui_tooltip" data-tip="Archive">
        <button
          className="ui_btn ui_btn-ghost"
          onClick={async () => {
            await toggleBookmark.mutateAsync({
              id: props.bookmark.id,
              isArchive: props.bookmark.isArchive,
            });
            await context.bookmark.all.invalidate();
          }}
        >
          <IconArchive width="1.5em" height="1.5em" />
        </button>
      </div>
      <button
        className="ui_btn ui_btn-ghost"
        onClick={async () => {
          await deleteBookmark.mutateAsync(props.bookmark.id);
          await context.bookmark.all.invalidate();
        }}
      >
        <IconBin width="1.5em" height="1.5em" />
      </button>
    </div>
  );
}

export function BookmarkActionInCategory(props: {
  bookmark: RouterOutputs["bookmark"]["byCategory"][number]["bookmarks"];
}) {
  const context = api.useContext();
  const deleteBookmark = api.bookmark.delete.useMutation();
  const toggleBookmark = api.bookmark.toggleArchive.useMutation();

  return (
    <div>
      <div className="flex gap-2">
        <div className="ui_tooltip" data-tip="Edit">
          <EditFormToBookmarkCategory bookmark={props.bookmark} />
        </div>
        <div className="ui_tooltip" data-tip="Archive">
          <button
            className="ui_btn ui_btn-ghost"
            onClick={async () => {
              await toggleBookmark.mutateAsync({
                id: props.bookmark.id,
                isArchive: props.bookmark.isArchive,
              });
              await context.bookmark.byCategory.invalidate();
            }}
          >
            <IconArchive width="1.5em" height="1.5em" />
          </button>
        </div>
        <button
          className="ui_btn ui_btn-ghost"
          onClick={async () => {
            await deleteBookmark.mutateAsync(props.bookmark.id);
            await context.bookmark.byCategory.invalidate();
          }}
        >
          <IconBin width="1.5em" height="1.5em" />
        </button>
      </div>
    </div>
  );
}
