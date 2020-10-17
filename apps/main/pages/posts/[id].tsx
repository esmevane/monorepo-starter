import { GetStaticPaths, GetStaticProps } from "next";
import Head from "next/head";
import Link from "next/link";

import { DisplayDate, Layout } from "components";
import { getPostIds, getPublishedMarkdownPost } from "lib";
import { Post } from "types";

export const getStaticPaths: GetStaticPaths = async () => ({
  paths: await getPostIds(),
  fallback: false,
});

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const post = await getPublishedMarkdownPost(String(params?.id));

  return {
    props: {
      post: {
        ...post,
        date: String(post?.date),
      },
    },
  };
};

export default function PostPage({ post }: ReactProps<{ post: Post }>) {
  return (
    <Layout>
      <Head>
        <title>Hanging Towers Blog - {post.title}</title>
      </Head>

      <nav>
        <Link href="/">Home</Link>
        <Link href="/posts">Posts</Link>
      </nav>
      <article>
        <header>
          <h1>{post.title}</h1>
        </header>
        <section>
          <div>{post.id}</div>
          <div>
            <DisplayDate date={post.date} />
          </div>
        </section>
        <section dangerouslySetInnerHTML={{ __html: post.contentHtml }} />
      </article>
    </Layout>
  );
}
