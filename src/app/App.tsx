import '@App/App.css';
import Introduction from '@Sections/introduction/Introduction';
import AboutMe from '@Sections/AboutMe/AboutMe';
import Projects from '@Sections/Projects/Projects';
import BetterButton from '@/components/Button/BetterButton';
import { faFileWord, faFileDownload, faArrowUp } from '@fortawesome/free-solid-svg-icons';
import { useUtilsContext } from '@Context/UtilsContext/UtilsContextHook';
import Experience from '@Sections/Experience/Experience';
import { useNotificationContext } from '@Context/NotificationContext/NotificationContextHook';
import { useFirebaseContext } from '@Context/FirebaseContext/FirebaseContextHooks';
import useDownloadFirebaseFile from '@Hooks/useDownloadFirebaseFile/useDownloadFirebaseFile';
import { useRef } from 'react';

function App() {

  const { isOnTop } = useUtilsContext();
  const { database: { snap } } = useFirebaseContext();
  const { fakeLoadingNotify } = useNotificationContext();
  
  const downloadResumeRef = useRef<HTMLAnchorElement>(null);
  useDownloadFirebaseFile({
    firebaseStorageUrl: snap?.meta?.latest_resume.ref,
    fileName: snap?.meta?.latest_resume.full_filename,
    anchor: downloadResumeRef.current
  });

  return (
    <article id="app">
      <main>
        <Introduction />
        <AboutMe />
        <Experience />
        <Projects />
      </main>
      <footer>
        <BetterButton
          type="download"
          className="floatingButton"
          icon={faFileWord}
          onHoverIcon={faFileDownload}
          ref={downloadResumeRef}
          onClick={() => { fakeLoadingNotify("success", "Your download should start in a few seconds...", "Thanks for downloading my resume!", 2500) }}
        >Resume</BetterButton>
        <BetterButton
          type="anchor"
          href="#introduction"
          className={`floatingButton goToTopTrigger ${isOnTop ? "hid" : ""}`}
          icon={faArrowUp}
        >Top</BetterButton>
      </footer>
    </article>
  )
}

export default App
