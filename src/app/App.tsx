import '@App/App.css';
import Introduction from '@Sections/introduction/Introduction';
import AboutMe from '@Sections/AboutMe/AboutMe';
import Projects from '@Sections/Projects/Projects';
import Button from '@Components/Button/Button';
import { faFileWord, faFileDownload, faArrowUp } from '@fortawesome/free-solid-svg-icons';
import { useCallback, useEffect, useState } from 'react';

function App() {

  const [isOnTop, setIsOnTop] = useState<boolean>(true);


  const onScroll = useCallback(() => {
    if (document.documentElement.scrollTop < 150) {
      setIsOnTop(true);
    } else {
      setIsOnTop(false);
    }
  }, [])

  useEffect(() => {
    document.documentElement.scrollTo({
      top: 0,
      left: 0,
      behavior: 'instant'
    });

    document.addEventListener('scroll', onScroll);

    return () => {
      document.removeEventListener('scroll', onScroll);
    }
  }, [onScroll])

  return (
    <article id='app'>
      <main>
        <Introduction />
        <AboutMe />
        <Projects />
      </main>
      <footer>
        <Button type="download" href="/FrancoCanalejo_WebDev_24.docx"
          className='floatingButton'
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
