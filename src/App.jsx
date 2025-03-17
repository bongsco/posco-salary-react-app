import logo from './logo.svg';
import './App.css';
import DatePicker from '#components/DatePicker';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.jsx</code> and save to reload.
          <br />
          Api Server: {process.env.REACT_APP_API_URL}
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
      <DatePicker />
    </div>
  );
}

export default App;
