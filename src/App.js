import { useMediaQuery } from 'react-responsive';
import './App.css';
import Canvas from './components/canvas';
import Windows from './components/windows';

function App() {
  const isSmallScreen = useMediaQuery({ query: '(max-width: 600px)' })

  const canvasSize = isSmallScreen ? 300 : 400;
  const numberOfWindows = isSmallScreen ? 4 : 8;

  return (
    <div className="app-container">
      {/* animated windows */}
      <Windows canvasSize={canvasSize} numberOfWindows={numberOfWindows} />
      {/* p5 sketch canvas */}
      <Canvas canvasSize={canvasSize} />
    </div>
  );
}

export default App;
