import { useState, useEffect } from 'react';
import { getDownloadURL, ref } from 'firebase/storage';
import { storage } from '@Firebase';

interface DownloadFileProps {
  firebaseStorageUrl?: string;
  fileName?: string;
  anchor?: HTMLAnchorElement | null;
}

const useDownloadFirebaseFile = ({ firebaseStorageUrl, fileName, anchor = document.createElement('a') }: DownloadFileProps) => {
  const [downloadError, setDownloadError] = useState(null);
  const [downloadUrl, setDownloadUrl] = useState('');

  useEffect(() => {
    if (!fileName || !firebaseStorageUrl) return;
    const fileRef = ref(storage, `${firebaseStorageUrl}/${fileName}`);

    getDownloadURL(fileRef)
      .then((url) => {
        setDownloadUrl(url);
      })
      .catch((error) => {
        setDownloadError(error);
      });
  }, [fileName, firebaseStorageUrl]);

  useEffect(() => {
    if (!downloadUrl || !fileName || !anchor) return;
    anchor.href = downloadUrl;
    anchor.download = fileName;

  }, [anchor, downloadUrl, fileName])

  return {
    downloadError,
    downloadUrl,
  };
};

export default useDownloadFirebaseFile;
