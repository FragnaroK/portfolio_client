import './style.css';
import Provider from '@/app/Provider';
import Content from '@Layout/Content/index';
import BottomBar from '@Layout/BottomBar/index';
import useFirebase from '@/hooks/useFirebase';

function App() {

  useFirebase({ enableFetch: true })

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
