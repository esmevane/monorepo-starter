import Head from "next/head";
import Link from "next/link";

import { Layout } from "components";

export default function Home() {
  return (
    <Layout>
      <Head>
        <title>Hanging Towers: a Cosmic Fantasy Deckbuilding Game</title>
      </Head>
      <Link href="/posts">Posts</Link>
    </Layout>
  );
}
