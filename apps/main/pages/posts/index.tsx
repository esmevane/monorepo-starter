import { GetStaticProps } from "next";
import Head from "next/head";
import Link from "next/link";

import { DisplayDate, Layout } from "components";
import { getSortedPostsData } from "lib";
import { Post } from "types";

export const getStaticProps: GetStaticProps = async () => ({
  props: { posts: await getSortedPostsData() },
});

export default function Posts({ posts }: ReactProps<{ posts: Post[] }>) {
  return (
    <Layout>
      <Head>
        <title>Hanging Towers Blog</title>
      </Head>

      <Link href="/">Home</Link>
      <section>
        <header>
          <h1>Posts</h1>
        </header>
        <section>
          <ul>
            {posts.map(({ id, title, date }) => (
              <li key={id}>
                <Link href={`/posts/${id}`}>
                  <a>
                    {title} - <DisplayDate date={date} />
                  </a>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </section>
    </Layout>
  );
}
