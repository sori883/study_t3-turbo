"use client";

import { Suspense, useState } from "react";
import { Dialog } from "@headlessui/react";

import { CategorySelect } from "~/components/form/categorySelect";
import { IconEdit } from "~/components/icons";
import { BaseModal, useModal } from "~/components/modal";
import { api } from "~/utils/api";
import type { RouterOutputs } from "~/utils/api";

export function EditFormToBookmark(props: {
  bookmark: RouterOutputs["bookmark"]["all"][number];
}) {
  const { open, close, isOpen } = useModal();
  return (
    <div>
      <BaseModal isOpen={isOpen} closeHandler={close}>
        <EditForm
          id={props.bookmark.id}
          title={props.bookmark.title}
          category={props.bookmark.categoryId}
          closeHandler={close}
        />
      </BaseModal>
      <button className="ui_btn ui_btn-ghost" onClick={open}>
        <IconEdit width="1.5em" height="1.5em" />
      </button>
    </div>
  );
}

export function EditFormToBookmarkCategory(props: {
  bookmark: RouterOutputs["bookmark"]["byCategory"][number]["bookmarks"];
}) {
  const { open, close, isOpen } = useModal();
  return (
    <div>
      <BaseModal isOpen={isOpen} closeHandler={close}>
        <EditForm
          id={props.bookmark.id}
          title={props.bookmark.title}
          category={props.bookmark.categoryId}
          closeHandler={close}
        />
      </BaseModal>
      <button className="ui_btn ui_btn-ghost" onClick={open}>
        <IconEdit width="1.5em" height="1.5em" />
      </button>
    </div>
  );
}

export function EditForm(props: {
  title: string;
  id: number;
  closeHandler: () => void;
  category?: number | null;
}) {
  const context = api.useContext();
  const [title, setTitle] = useState(props.title);
  const [categoryId, setCategory] = useState<number | null>(
    props.category ? props.category : null,
  );

  const { mutateAsync: updateBookmark, error } =
    api.bookmark.update.useMutation({
      async onSuccess() {
        setTitle("");
        setCategory(null);
        await context.bookmark.all.invalidate();
        await context.bookmark.byCategory.invalidate();
      },
    });

  return (
    <div>
      <Dialog.Title>編集</Dialog.Title>
      <form
        className="flex w-full max-w-2xl flex-col"
        onSubmit={async (e) => {
          e.preventDefault();
          try {
            await updateBookmark({
              id: props.id,
              title,
              categoryId,
            });
            setTitle("");
            setCategory(null);
            props.closeHandler();
            await context.bookmark.all.invalidate();
            await context.bookmark.byCategory.invalidate();
          } catch {
            // noop
          }
        }}
      >
        <input
          className="mb-2 rounded bg-white/10 p-2 text-white"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
        />
        {error?.data?.zodError?.fieldErrors.title && (
          <span className="mb-2 text-red-500">
            {error.data.zodError.fieldErrors.title}
          </span>
        )}
        <Suspense>
          <CategorySelect
            onChange={setCategory}
            defaultValue={props.category}
          />
          {error?.data?.zodError?.fieldErrors.categoryId && (
            <span className="mb-2 text-red-500">
              {error.data.zodError.fieldErrors.categoryId}
            </span>
          )}
        </Suspense>
        <button type="submit" className="ui_btn ui_btn-accent">
          edit
        </button>
      </form>
    </div>
  );
}
