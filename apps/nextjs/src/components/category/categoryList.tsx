"use client";

import Link from "next/link";

import { api } from "~/utils/api";
import type { RouterOutputs } from "~/utils/api";

export function CategoryList() {
  const [categories] = api.category.all.useSuspenseQuery();

  if (categories.length === 0) {
    return (
      <div className="relative flex w-full flex-col gap-4">
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/10">
          <p className="text-2xl font-bold text-white">No category yet</p>
        </div>
      </div>
    );
  }

  return (
    <div className="ui_collapse bg-base-200 ui_collapse-arrow">
      <input type="checkbox" checked />
      <div className="ui_collapse-title text-xl font-medium">カテゴリー</div>
      <div className="ui_collapse-content">
        <ul className="ui_menu">
          {categories.map((b) => (
            <CategoryItem key={b.id} category={b} />
          ))}
        </ul>
      </div>
    </div>
  );
}

export function CategoryItem(props: {
  category: RouterOutputs["category"]["all"][number];
}) {
  return (
    <li>
      <Link href={`/dashboard/category/${props.category.slug}`}>
        {props.category.title}
      </Link>
    </li>
  );
}
