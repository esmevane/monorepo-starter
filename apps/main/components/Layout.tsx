import Head from "next/head";

import { Modules } from "styles";

export function Layout({ children }: ReactProps) {
  return (
    <div className={Modules.Home.container}>
      <Head>
        <title>Hanging Towers</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={Modules.Home.main}>{children}</main>
      <footer className={Modules.Home.footer}></footer>
    </div>
  );
}
