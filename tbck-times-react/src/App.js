
import './css/App.css';
import { MuiNavBar } from './components/MuiNavBar';
import { MuiFooter } from './components/MuiFooter';
import { MuiCategoryBar } from './components/MuiCategoryBar';



function App() {
  return (
    <div className="App">
      <MuiNavBar />
      <MuiCategoryBar />
        <p>
          TBCK Times
        </p>
      <MuiFooter />
    </div>
  );
}

export default App;
