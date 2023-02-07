import './App.css';
import CurrencyInput from "./CurrencyInput";
import CurrencyTable from "./CurrencyTable"
import {useState, useEffect} from "react";
import axios from "axios";

function App() {

  const [amount1, setAmount1] = useState(1);
  const [amount2, setAmount2] = useState(1);
  const [currency1, setCurrency1] = useState('USD');
  const [currency2, setCurrency2] = useState('GBP');
  const [rates, setRates] = useState([]);

  useEffect(() => {
    axios.get('https://api.frankfurter.app/latest?')
      .then(response => {
        setRates(response.data.rates);
      })
  }, []);

  useEffect(() => {
    if (!!rates) {
      function init() {
        handleAmount1Change(1);
      }
      init();
    }
  // eslint-disable-next-line
  }, [rates]);



  function format(number) {
    return number.toFixed(4);
  }

  function handleAmount1Change(amount1) {
    setAmount2(format(amount1 * rates[currency2] / rates[currency1]));
    setAmount1(amount1);
  }

  function handleCurrency1Change(currency1) {
    setAmount2(format(amount1 * rates[currency2] / rates[currency1]));
    setCurrency1(currency1);
  }

  function handleAmount2Change(amount2) {
    setAmount2(amount2);
  }

  function handleCurrency2Change(currency2) {
    setAmount2(format(amount1 * rates[currency2] / rates[currency1]));
    setCurrency2(currency2);
  }

  const Navbar = () => {
    return (
      <nav className="navbar navbar-expand navbar-light">
        <a className="navbar-brand" href="index.html"><b>Coin Exchange</b></a>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <a className="nav-link" href="index.html">Currency Conversion</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="press.html">Global Trend Analysis</a>
            </li>
          </ul>
        </div>
      </nav>
    );
  }

  const Footer = () => {
    return (
      <div className="foot p-2">
        <a className='foot-links' target="blank" href='https://offszn.io/'>Portfolio</a>
        <a className='foot-links' target="blank" href='https://www.tiktok.com/@offsznsports?lang=en'>Social Media</a>
      </div>
    )
  }

  return (
    <div className='container'>
      <Navbar />
      <div className='converter'>
        <h1 className='pb-4'>Currency Converter</h1>
      <CurrencyInput
        onAmountChange={handleAmount1Change}
        onCurrencyChange={handleCurrency1Change}
        currencies={Object.keys(rates)}
        amount={amount1}
        currency={currency1} />
      <CurrencyInput
        onAmountChange={handleAmount2Change}
        onCurrencyChange={handleCurrency2Change}
        currencies={Object.keys(rates)}
        amount={amount2}
        currency={currency2} />
      </div>
      <div className='rate-table'>
        <CurrencyTable/>
      </div>
      <div className='spacer'></div>
      <Footer/>
    </div>
  );
}

export default App;
