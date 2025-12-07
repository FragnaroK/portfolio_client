import { useRef } from 'react';
import toast from 'react-hot-toast';
import classNames from 'classnames';

import { useUtilsContext } from '@Context/Utils/hooks';
import useDownloadFirebaseFile from '@Hooks/useDownloadFirebaseFile';
import BetterButton from '@Component/common/Button';
import useFirebase from '@Hooks/useFirebase';
import { IconMeta } from '@Constants/icons';

const BottomBar = () => {

    const { isOnTop } = useUtilsContext();
    const { database: { snap } } = useFirebase();

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
                icon={IconMeta.faFilePdf}
                onHoverIcon={IconMeta.faFileDownload}
                ref={downloadResumeRef}
                onClick={onResumeDownload}
            >CV</BetterButton>
            <BetterButton
                type="anchor"
                href="#introduction"
                className={classNames('floatingButton', 'goToTopTrigger', isOnTop ? "hid" : "")}
                icon={IconMeta.faArrowUp}
            >Top</BetterButton>
        </>
    )
}


export default BottomBar;