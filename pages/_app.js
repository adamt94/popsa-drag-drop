import { GlobalStyle } from "../styles/global";
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <GlobalStyle />
      <DndProvider backend={HTML5Backend}>
      <Component {...pageProps} />
      </DndProvider>
    </>
  );
}

export default MyApp;
