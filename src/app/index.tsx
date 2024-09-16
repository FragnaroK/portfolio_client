import './style.css';
import Provider from '@App/Provider';
import Content from './layout/Content/index';
import BottomBar from './layout/BottomBar/index';

function App() { 

  return (
    <Provider>
      <article id="app">
        <main>
          <Content />
        </main>
        <footer>
          <BottomBar />
        </footer>
      </article>
    </Provider>
  )
}

export default App
