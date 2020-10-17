import fs from "fs";
import path from "path";
import matter from "gray-matter";
import remark from "remark";
import html from "remark-html";

import { Post, PublishablePost } from "types";
import { formatISO, parseISO } from "date-fns";

const postsDirectory = path.join(process.cwd(), "posts");
const hasPublishedPost = (
  postCandidate: any
): postCandidate is { data: PublishablePost } =>
  "date" in postCandidate.data &&
  "title" in postCandidate.data &&
  "content" in postCandidate;

const toHtml = async (content: string) => {
  const processed = await remark().use(html).process(content);

  return processed.toString();
};

export const getPublishedMarkdownPost = async (
  id: string
): Promise<Post | null> => {
  const fullPath = path.join(postsDirectory, `${id}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");

  const matterResult = matter(fileContents);

  return hasPublishedPost(matterResult)
    ? {
        id,
        ...matterResult.data,
        contentHtml: await toHtml(matterResult.content),
        date:
          typeof matterResult.data.date === "string"
            ? matterResult.data.date
            : formatISO(matterResult.data.date),
      }
    : null;
};

const publishedPosts = (fileNames: string[]) => ({
  map: async <ReturnedValue extends any>(
    transform: (post: Post) => Promise<ReturnedValue>
  ): Promise<ReturnedValue[]> => {
    const posts = [] as ReturnedValue[];

    for (const fileName of fileNames) {
      const id = fileName.replace(/\.md$/, "");
      const post = await getPublishedMarkdownPost(id);

      if (post) {
        posts.push(await transform(post));
      }
    }

    return posts;
  },
});

export async function getPostIds() {
  const fileNames = fs.readdirSync(postsDirectory);
  return publishedPosts(fileNames).map(async ({ id }) => ({ params: { id } }));
}

export async function getSortedPostsData() {
  const fileNames = fs.readdirSync(postsDirectory);
  const posts = await publishedPosts(fileNames).map(async (post) => post);

  return posts.sort((currentPost, nextPost) =>
    parseISO(String(currentPost.date)) < parseISO(String(nextPost.date))
      ? 1
      : -1
  );
}
