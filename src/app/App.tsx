import '@App/App.css';
import Introduction from '@Sections/introduction/Introduction';
import AboutMe from '@Sections/AboutMe/AboutMe';
import Projects from '@Sections/Projects/Projects';
import BetterButton from '@Components/Button/BetterButton';
import { faFileWord, faFileDownload, faArrowUp } from '@fortawesome/free-solid-svg-icons';
import { useUtilsContext } from '@Context/UtilsContext/UtilsContextHook';
import Experience from '@Sections/Experience/Experience';
import { useFirebaseContext } from '@Context/FirebaseContext/FirebaseContextHooks';
import useDownloadFirebaseFile from '@Hooks/useDownloadFirebaseFile/useDownloadFirebaseFile';
import { useRef } from 'react';
import classNames from 'classnames';
import { domAnimation, LazyMotion } from 'framer-motion';
import toast from 'react-hot-toast';
import Footer from './sections/Footer/Footer';

function App() {

  const { isOnTop } = useUtilsContext();
  const { database: { snap } } = useFirebaseContext();
  
  const downloadResumeRef = useRef<HTMLAnchorElement>(null);
  const { onDownloadTrigger, downloadURL } = useDownloadFirebaseFile({
    firebaseStorageUrl: snap?.meta?.latest_resume.ref,
    fileName: snap?.meta?.latest_resume.full_filename,
    anchor: downloadResumeRef.current,
  });

  function onResumeDownload() {
    if (downloadResumeRef.current?.href === downloadURL.current) return;

    const promise = onDownloadTrigger();
    toast.promise(promise, {
      loading: 'Retrieving latest resume, please wait...',
      success: (anchor) => {
        anchor.click();
        return 'Done!';
      },
      error: 'Oh no! Something went wrong. No worries! You can also find my resume on my LinkedIn.'
    })
  }

  return (
    <LazyMotion features={domAnimation}>
      <article id="app">
        <main>
          <Introduction />
          <AboutMe />
          <Experience />
          <Projects />
          <Footer />
        </main>
        <footer>
          <BetterButton
            type="download"
            className="floatingButton"
            icon={faFileWord}
            onHoverIcon={faFileDownload}
            ref={downloadResumeRef}
            onClick={onResumeDownload}
          >Resume</BetterButton>
          <BetterButton
            type="anchor"
            href="#introduction"
            className={classNames('floatingButton', 'goToTopTrigger', isOnTop ? "hid" : "")}
            icon={faArrowUp}
          >Top</BetterButton>
        </footer>
      </article>
    </LazyMotion>
  )
}

export default App
