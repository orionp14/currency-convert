import React, { useEffect, useState } from "react";
import axios from "axios";
import "./CurrencyTable.css";

function CurrencyTable() {
  const [ratesList, setRatesList] = useState([]);

  useEffect(() => {
    getRates("USD");
  });

  const getRates = async (base) => {
    const res = await axios.get(
      ` https://api.frankfurter.app/latest?from=USD `
    );
    const { rates } = res.data;

    const ratesTemp = [];
    for (const [symbol, rate] of Object.entries(rates)) {
      ratesTemp.push({ symbol, rate });
    }
    setRatesList(ratesTemp);
  };

  return (
    <div className="currency-rates">
      <ul className="list-group">
      <li className="list-group-item active header">USD - 1</li>
        {ratesList.map((d) => (
          <li className="list-group-item" key={d.symbol}>
            {d.symbol} - {d.rate}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CurrencyTable;