import Head from "next/head";
import { useState } from "react";
import styles from "./index.module.css";

export default function Home() {
  const [topicInput, setTopicInput] = useState("");
  const [result, setResult] = useState();

  async function onSubmit(event) {
    event.preventDefault();
    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ topic: topicInput }),
      });

      const data = await response.json();
      if (response.status !== 200) {
        throw data.error || new Error(`Request failed with status ${response.status}`);
      }

      setResult(data.result);
      setTopicInput("");
    } catch(error) {
      // Consider implementing your own error handling logic here
      console.error(error);
      alert(error.message);
    }
  }

  return (
    <div>
      <Head>
        <title>OpenAI Creative Writing</title>
        <link rel="icon" href="/quill.png" />
      </Head>
      <main className={styles.main}>
        <img src="/quill.png" className={styles.icon} />
        <h3>Cre(AI)tive Writing</h3>
        <form onSubmit={onSubmit}>
          <input
            type="text"
            name="Topic"
            placeholder="Enter a topic"
            value={topicInput}
            onChange={(e) => setTopicInput(e.target.value)} 
          />
          <input type="submit" value="Generate creative writing prompt" />
        </form>
        <div className={styles.result}>{result}</div>
      </main>
    </div>
  );
}
