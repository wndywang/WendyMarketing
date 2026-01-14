import { Presentation } from './components/Presentation';
import { slides } from './data/slides';
import './styles/animations.css';
import './App.css';

function App() {
  return (
    <Presentation 
      slides={slides}
      initialLanguage="en"
      initialSlide={0}
    />
  );
}

export default App;
