import React, { useEffect } from "react";
import Head from "next/head";
import { useState } from "react";

export default function Book() {
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

  const DEFAULT_PARAMS = {
    model: "text-davinci-002",
    prompt: `suggest 3 books between $ ${priceMin} and $ ${priceMax} for a ${age} years old ${gender} that is into ${hobbies}`,
    temperature: 0.7,
    max_tokens: 256,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
  };
  const fecthAi = async (params = {}) => {
    const params_ = { ...DEFAULT_PARAMS };
    const openai_api_key =
      "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";
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + openai_api_key,
      },
      body: JSON.stringify(params_),
    };
    const response = await fetch(
      "https://api.openai.com/v1/completions",
      requestOptions
    );
    const data = await response.json();
    const final = data["choices"][0]["text"];
    setResult(final);
    return final;
  };

  return (
    <div>
      <div className={mode}>
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

      <main className="main">
        <h3>Books Generator</h3>
        <div className="idkwhathtis">
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
          <button onClick={fecthAi}>Submit</button>
        </div>
        {loading && (
          <div className="loading">
            <h1>Loading...</h1>
          </div>
        )}
        {result && (
          <div className="resultbox">
            <div className="result">
              <p>{result}</p>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
