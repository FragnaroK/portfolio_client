import { useState, useEffect, useCallback, useMemo } from 'react';
import DOMPurify from 'dompurify';
import * as marked from 'marked';


const useMarkdown = (text: string): string => {

  const [parsedMarkdown, setParsedMarkdown] = useState<string>(""); 

  const parseMarkdown = useCallback(async () => {
    const markdown = await marked.parse(text);
    setParsedMarkdown(DOMPurify.sanitize(markdown, { USE_PROFILES: { html: true }, SANITIZE_DOM: true}));
  }, [text])

  useEffect(() => {
    parseMarkdown();
  }, [parseMarkdown, text])


  return useMemo(() => parsedMarkdown, [parsedMarkdown]);
};

export default useMarkdown;

// Helper functions

