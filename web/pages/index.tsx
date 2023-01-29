import Head from "next/head";
import React from "react";
import Descirption from "../components/Description";
import MainMap from "../components/MainMap";
import styles from "../styles/Home.module.css";

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>小野地区獣害マッピング</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <div style={{ height: "80vh" }}>
          <MainMap />
        </div>
        <Descirption />
      </main>
    </div>
  );
}
