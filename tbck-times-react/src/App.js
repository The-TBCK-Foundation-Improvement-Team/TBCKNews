
import './css/App.css';
import { MuiNavBar } from './components/MuiNavBar';
import { MuiFooter } from './components/MuiFooter';



function App() {
  return (
    <div className="App">
      <MuiNavBar />
        <p>
          TBCK Times
        </p>
      <MuiFooter />
    </div>
  );
}

export default App;
