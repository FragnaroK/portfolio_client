import '@App/App.css';
import Introduction from '@Sections/introduction/Introduction';
import AboutMe from '@Sections/AboutMe/AboutMe';
import Projects from '@Sections/Projects/Projects';
import Button from '@Components/Button/Button';
import { faFileWord, faFileDownload, faArrowUp } from '@fortawesome/free-solid-svg-icons';
import { useUtilsContext } from '@/context/UtilsContext/UtilsContextHook';
import Experience from './sections/Experience/Experience';

function App() {

  const { isOnTop } = useUtilsContext();

  return (
    <article id="app">
      <main>
        <Introduction />
        <AboutMe />
        <Experience />
        <Projects />
      </main>
      <footer>
        <Button type="download" href="/FrancoCanalejo_WebDev_24.docx"
          className="floatingButton"
          icon={faFileWord}
          onHoverIcon={faFileDownload}
        >Resume</Button>
        <Button
          type="anchor"
          href="#introduction"
          className={`floatingButton goToTopTrigger ${isOnTop ? "hid" : ""}`}
          icon={faArrowUp}
        >Top</Button>
      </footer>
    </article>
  )
}

export default App
