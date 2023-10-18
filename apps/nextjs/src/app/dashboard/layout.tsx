/* eslint-disable jsx-a11y/label-has-associated-control */
import { Suspense } from "react";
import Link from "next/link";

import { CategoryList } from "~/components/category";
import { CreateFormToBookmark } from "~/components/form/createBookmark";
import { BaseLayout } from "~/components/layouts";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <main>
      <div className="ui_navbar bg-base-100">
        <div className="flex-1">
          <span className="btn btn-ghost text-xl normal-case">daisyUI</span>
        </div>
        <div className="flex-none">
          <label
            htmlFor="my-drawer-2"
            className="ui_btn ui_btn-primary ui_drawer-button lg:hidden"
          >
            Open drawer
          </label>
        </div>
      </div>
      <BaseLayout>
        <div className="ui_drawer lg:ui_drawer-open">
          <input
            id="my-drawer-2"
            type="checkbox"
            className="ui_drawer-toggle"
          />
          <div className="ui_drawer-content flex flex-col items-center">
            {children}
          </div>
          <div className="ui_drawer-side">
            <label htmlFor="my-drawer-2" className="ui_drawer-overlay"></label>
            <div className="bg-base-200 text-base-content min-h-full w-80">
              <CreateFormToBookmark />
              <ul className="ui_menu">
                <li>
                  <Link href="/dashboard/archive">アーカイブ</Link>
                </li>
              </ul>
              <Suspense>
                <CategoryList />
              </Suspense>
            </div>
          </div>
        </div>
      </BaseLayout>
    </main>
  );
}
