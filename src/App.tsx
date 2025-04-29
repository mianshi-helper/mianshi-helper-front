import PlayGroundLogo from './components/PlaygroundLogo';
import { BACKGROUND_COLOR } from './contstants/colors';
import RouterIndex from './routers';
import { css } from "@emotion/css";
import './App.css';


function App() {
  const BackgroundCSS = css`
    background-color: ${BACKGROUND_COLOR};
    width: 100%;
    height: 100%;
`;

  return (
    <div className={BackgroundCSS}>
      <PlayGroundLogo />
      <RouterIndex />
    </div>
    
  )
}

export default App;
