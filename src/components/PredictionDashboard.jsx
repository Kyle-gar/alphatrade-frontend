import React, { useState } from "react";

const API_URL = "https://YOUR_BACKEND_URL.onrender.com/predict"; // Replace with your backend URL

export default function PredictionDashboard() {
  const [symbol, setSymbol] = useState("AAPL");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchPrediction = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);
    const res = await fetch(`${API_URL}?symbol=${symbol}`);
    const data = await res.json();
    setResult(data);
    setLoading(false);
  };

  return (
    <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md">
      <h1 className="text-2xl font-bold mb-4">AlphaPulse Prediction</h1>
      <form onSubmit={fetchPrediction} className="mb-4 flex gap-2">
        <input
          className="flex-1 p-2 rounded bg-gray-700 text-white"
          value={symbol}
          onChange={e => setSymbol(e.target.value.toUpperCase())}
          placeholder="Enter symbol (e.g. AAPL)"
        />
        <button
          className="bg-blue-500 px-4 py-2 rounded text-white font-bold"
          type="submit"
          disabled={loading}
        >
          {loading ? "Loading..." : "Predict"}
        </button>
      </form>
      {result && !result.error && (
        <div className="mt-4">
          <div className="text-lg">Symbol: <b>{result.symbol}</b></div>
          <div>Last Close: <b>${result.last_close.toFixed(2)}</b></div>
          <div>Predicted Close: <b>${result.predicted_close.toFixed(2)}</b></div>
          <div>
            Recommendation:{" "}
            <span className={
              result.recommendation === "Buy" ? "text-green-400 font-bold" :
              result.recommendation === "Sell" ? "text-red-400 font-bold" :
              "text-yellow-400 font-bold"
            }>
              {result.recommendation}
            </span>
          </div>
        </div>
      )}
      {result && result.error && (
        <div className="text-red-400 mt-4">{result.error}</div>
      )}
    </div>
  );
}
