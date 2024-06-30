import React, { useState } from "react";

const DiscountCodeGenerator = () => {
  const [apiKey, setApiKey] = useState("");
  const [discountCode, setDiscountCode] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/codeGen", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ apiKey }),
      });

      if (response.ok) {
        const data = await response.json();
        setDiscountCode(data.discountCode);
        setError(null);
      } else {
        setDiscountCode(null);
        setError("An error occurred while creating the discount code.");
      }
    } catch (error) {
      console.error("Error creating discount code:", error);
      setDiscountCode(null);
      setError("An error occurred while creating the discount code.");
    }
  };

  return (
    <div>
      <h2>Discount Code Generator</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Shopify API Key:
          <input
            type="text"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            required
          />
        </label>
        <button type="submit">Generate Discount Code</button>
      </form>
      {discountCode && (
        <div>
          <h3>Generated Discount Code:</h3>
          <p>Code: {discountCode.code}</p>
          <p>Discount: {discountCode.value}</p>
        </div>
      )}
      {error && <p>Error: {error}</p>}
    </div>
  );
};

export default DiscountCodeGenerator;
