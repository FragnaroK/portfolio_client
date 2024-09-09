import { useCallback, useRef } from 'react';
import { getDownloadURL, ref } from 'firebase/storage';
import { storage } from '@Firebase';
import Logger from 'node-logger-web';

interface DownloadFileProps {
  firebaseStorageUrl?: string;
  fileName?: string;
  anchor: HTMLAnchorElement | null;
}

const useDownloadFirebaseFile = ({ firebaseStorageUrl, fileName, anchor = document.createElement('a')}: DownloadFileProps) => {

  const log = new Logger("useDownloadFirebaseFile::hook", import.meta.env.DEV); 
  const downloadURL = useRef<string>('null');

  const onDownloadTrigger = useCallback(() => new Promise<HTMLAnchorElement>((res, rej) => {
    if (anchor?.href === downloadURL.current) return;
    if (!fileName || !firebaseStorageUrl || !anchor) return;

    const fileRef = ref(storage, `${firebaseStorageUrl}/${fileName}`);
    log.d("Getting file: ", firebaseStorageUrl, fileName)

    getDownloadURL(fileRef)
      .then((url) => {
        log.d("Download URL retrieved: ", url)
        downloadURL.current = url;
        anchor.href = url;
        anchor.download = fileName;
        res(anchor)
      })
      .catch((error) => {
        log.e("Could not retrieve download URL", error) 
        rej(new Error(error))
      });
  }), [anchor, downloadURL.current, fileName, firebaseStorageUrl])

  return {
    downloadURL,
    onDownloadTrigger
  };
};

export default useDownloadFirebaseFile;
