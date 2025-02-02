
import './css/App.css';
import { MuiNavBar } from './components/MuiNavBar';
import { MuiFooter } from './components/MuiFooter';
import { MuiCategoryBar } from './components/MuiCategoryBar';
import { HomePage } from './pages/HomePage';



function App() {
  return (
    <div className="App">
      <MuiNavBar />
      <MuiCategoryBar />
      <HomePage />
      <MuiFooter />
    </div>
  );
}

export default App;
