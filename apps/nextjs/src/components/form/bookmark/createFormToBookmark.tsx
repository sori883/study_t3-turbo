"use client";

import { Suspense, useState } from "react";

import { CategorySelect } from "~/components/form/bookmark";
import { api } from "~/utils/api";

export function CreateFormToBookmark() {
  const context = api.useContext();

  const [url, setUrl] = useState("");
  const [categoryId, setCategory] = useState<number | null>(null);

  const { mutateAsync: createBookmark, error } =
    api.bookmark.create.useMutation({
      async onSuccess() {
        setUrl("");
        setCategory(null);
        await context.bookmark.all.invalidate();
      },
    });

  return (
    <form
      className="flex w-full max-w-2xl flex-col"
      onSubmit={async (e) => {
        e.preventDefault();
        try {
          await createBookmark({
            url,
            categoryId,
          });
          setUrl("");
          setCategory(null);
          await context.bookmark.all.invalidate();
        } catch {
          // noop
        }
      }}
    >
      <input
        className="mb-2 rounded bg-white/10 p-2 text-white"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        placeholder="Url"
      />
      {error?.data?.zodError?.fieldErrors.url && (
        <span className="mb-2 text-red-500">
          {error.data.zodError.fieldErrors.url}
        </span>
      )}
      <Suspense>
        <CategorySelect onChange={setCategory} />
        {error?.data?.zodError?.fieldErrors.categoryId && (
          <span className="mb-2 text-red-500">
            {error.data.zodError.fieldErrors.categoryId}
          </span>
        )}
      </Suspense>
      <button type="submit" className="btn btn-accent">
        Create
      </button>
    </form>
  );
}
