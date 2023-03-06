import React, { useEffect } from "react";
import Head from "next/head";
import { useState } from "react";
import styles from "./index.module.css";

export default function Home() {
  const [gender, setGender] = useState("man");
  const [age, setAge] = useState(30);
  const [priceMin, setPriceMin] = useState(25);
  const [priceMax, setPriceMax] = useState(100);
  const [hobbies, setHobbies] = useState("");
  const [result, setResult] = useState();
  const [mode, setMode] = useState("dark");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (mode === "white") {
      document.body.style.backgroundColor = "white";
      document.body.style.color = "black";
    } else if (mode === "dark") {
      document.body.style.backgroundColor = "black";
      document.body.style.color = "white";
    }
  }, [mode]);

  const handleclose = () => {
    setResult(null);
  };
  async function onSubmit(event) {
    event.preventDefault();
    if (loading) {
      return;
    }
    setLoading(true);
    try {
      const response = await fetch("/api/generate-books", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ priceMin, priceMax, gender, age, hobbies }),
      });

      const data = await response.json();
      setResult(data.result.replaceAll("\n", "<br/>"));
      if (response.status !== 200) {
        throw (
          data.error ||
          new Error(`Request failed with status ${response.status}`)
        );
      }
    } catch (error) {
      console.error(error);
      alert(error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <Head>
        <title>Books Generator</title>
        <link
          rel="icon"
          href="http://clipart-library.com/newimages/book-clip-art-7.png"
        />
      </Head>

      <div className={styles.mode}>
        <label htmlFor="Mode">Select Mode</label>
        <select
          name="mode"
          onChange={(e) => setMode(e.target.value)}
          placeholder={mode}
          value={mode}
        >
          <option value="white">White</option>
          <option value="dark">Dark</option>
        </select>
      </div>

      <main className={styles.main}>
        <img
          src="http://clipart-library.com/newimages/book-clip-art-7.png"
          className={styles.icon}
        />
        <h3>Books Generator</h3>
        <form onSubmit={onSubmit}>
          <label>For who is the gift?</label>
          <select
            name="gender"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
          >
            <option value="man">Man</option>
            <option value="woman">Woman</option>
          </select>

          <label>Age</label>
          <input
            type="number"
            min={1}
            max={99}
            name="age"
            placeholder="Enter the age"
            value={age}
            onChange={(e) => setAge(Number.parseInt(e.target.value))}
          />

          <label>Price from $</label>
          <input
            type="number"
            min={1}
            name="priceMin"
            placeholder="Enter the minimum price"
            value={priceMin}
            onChange={(e) => setPriceMin(Number.parseInt(e.target.value))}
          />

          <label>Price to $</label>
          <input
            type="number"
            min={1}
            name="priceMax"
            placeholder="Enter the maximum price"
            value={priceMax}
            onChange={(e) => setPriceMax(Number.parseInt(e.target.value))}
          />

          <label>Interest</label>
          <input
            type="text"
            name="hobbies"
            placeholder="Enter the interest"
            value={hobbies}
            onChange={(e) => setHobbies(e.target.value)}
          />
          <input type="submit" value="Generate Books" />
        </form>
        {loading && (
          <div className={styles.loading}>
            <h1>Loading...</h1>
          </div>
        )}
        {result && (
          <div className={styles.resultbox}>
            <div
              className={styles.result}
              dangerouslySetInnerHTML={{ __html: result }}
            />
            <button onClick={handleclose}>Close</button>
          </div>
        )}
      </main>
    </div>
  );
}
