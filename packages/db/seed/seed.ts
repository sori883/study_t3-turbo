import { db, schema } from "../";
import type { Category, InsertBookmark, InsertCategory, User } from "../";

async function main() {
  // ユーザを取得する
  const user: User[] = await db.select().from(schema.users).limit(1);
  // ユーザが存在しない場合は処理終了
  // Googleログインのユーザのため削除しない前提
  if (!user[0]) return;

  // ユーザ以外のschemaを削除
  await db.delete(schema.bookmarks);
  await db.delete(schema.categories);

  /*
  カテゴリ
  */
  const categories: InsertCategory[] = [
    {
      title: "カテゴリー壱",
      slug: "slug1",
      userId: user[0].id,
    },
    {
      title: "カテゴリー弐",
      slug: "slug2",
      userId: user[0].id,
    },
    {
      title: "カテゴリー参",
      slug: "slug3",
      userId: user[0].id,
    },
  ];

  const categoriesInserted = await db
    .insert(schema.categories)
    .values(categories);
  console.log(categoriesInserted);

  /*
   ブックマーク
   */
  const cate: Category[] = await db.select().from(schema.categories).limit(1);

  if (!cate[0]) return;

  const bookmarks: InsertBookmark[] = [
    {
      title: "Bookmark1",
      url: "http://localhost:3000/",
      isArchive: false,
      categoryId: cate[0].id,
      userId: user[0].id,
    },
    {
      title: "Bookmark2",
      url: "http://localhost:3000/",
      isArchive: false,
      categoryId: cate[0].id,
      userId: user[0].id,
    },
    {
      title: "Bookmark3",
      url: "http://localhost:3000/",
      isArchive: false,
      categoryId: cate[0].id,
      userId: user[0].id,
    },
  ];

  const bookmarkInserted = await db.insert(schema.bookmarks).values(bookmarks);
  console.log(bookmarkInserted);
}

void main();
