import { useRef } from 'react';
import { useUtilsContext } from '@Context/Utils/hooks';
import { useFirebaseContext } from '@Context/Firebase/hooks';

import useDownloadFirebaseFile from '@Hooks/useDownloadFirebaseFile';

import toast from 'react-hot-toast';
import BetterButton from '@Component/Button';
import { faFileWord, faFileDownload, faArrowUp } from '@fortawesome/free-solid-svg-icons';
import classNames from 'classnames';

const BottomBar = () => {


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
        <>
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
        </>
    )
}


export default BottomBar;