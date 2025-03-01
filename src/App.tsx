import { ErrorBoundary } from 'react-error-boundary';
import { createGlobalStyle } from 'styled-components';
import MatchTracker from './components/MatchTracker';

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  :root {
    font-family: system-ui, Avenir, Helvetica, Arial, sans-serif;
    line-height: 1.5;
    font-weight: 400;
    color-scheme: light dark;
    color: rgba(255, 255, 255, 0.87);
    background-color: #242424;
    font-synthesis: none;
    text-rendering: optimizeLegibility;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  html {
    font-size: 16px;
    
    @media (max-width: 768px) {
      font-size: 14px;
    }
  }

  #root {
    width: 100%;
  }

  body {
    display: flex;
    min-width: 320px;
    min-height: 100vh;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    background-color: black;
  }

  img {
    max-width: 100%;
    height: auto;
  }

  button {
    cursor: pointer;
    border: none;
    background: none;
    font: inherit;
    color: inherit;
    
    &:disabled {
      cursor: not-allowed;
      opacity: 0.6;
    }
  }
`;

function ErrorFallback({ error, resetErrorBoundary }: { error: Error; resetErrorBoundary: () => void }) {
  return (
    <div role="alert" style={{ padding: '20px', color: 'white' }}>
      <h2>Что-то пошло не так:</h2>
      <pre style={{ color: 'red' }}>{error.message}</pre>
      <button onClick={resetErrorBoundary}>Попробовать снова</button>
    </div>
  );
}

function App() {
  return (
    <>
      <GlobalStyle />
      <ErrorBoundary
        FallbackComponent={ErrorFallback}
        onReset={() => {
          // Сброс состояния приложения
          window.location.reload();
        }}
      >
        <MatchTracker />
      </ErrorBoundary>
    </>
  );
}

export default App;
