import React, { useEffect, useState } from "react";
import "./CurrencyTable.css"
import axios from "axios";

function CurrencyTable() {
  const [rates, setRates] = useState({});
  const [base, setBase] = useState(["USD"]);

  useEffect(() => {
    getRates("USD");
    // eslint-disable-next-line
  }, []);

  const getRates = async (base) => {
    const res = await axios.get(
      `https://api.frankfurter.app/latest?from=${base}`
    );
    setRates(res.data.rates);
    console.log(base)
    setBase(res.data.base)
  };

  return (
    <div className="currency-rates">
      <select
        value={base}
        onChange={(e) => {
          getRates(e.target.value);
          setBase(e.target.value);
        }}
      >
        {Object.entries(rates).map(([symbol]) => (
          <option value={symbol} key={symbol}>
            {symbol}
          </option>
        ))}
      </select>
      <ul className="list-group">
        {Object.entries(rates).map(([symbol, rate]) => (
          <li className="list-group-item" key={symbol}>
            {symbol} - {rate}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CurrencyTable;
