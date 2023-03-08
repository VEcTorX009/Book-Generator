import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Book from "../components/Books";

const Home: NextPage = () => {
  return (
    <div className="">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Book />
      </main>
    </div>
  );
};

export default Home;
