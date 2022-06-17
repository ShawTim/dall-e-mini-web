import { useCallback, useState } from 'react';

interface DallEResponse {
  images: string[];
}

const fetchDallE = async (words: string) => {
  const response = await fetch('https://bf.dallemini.ai/generate', {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ prompt: words }),
  });
  return (await response.json()) as DallEResponse;
};

const parseImage = (image: string) => {
  const base64 = image.split('\\n').join('\n');
  return `data:image/png;base64,${base64}`;
};

const fetchWithRetry = async (
  words: string,
  retry: number
): Promise<string[]> => {
  try {
    const response = await fetchDallE(words);
    const { images } = response;
    return images.map(parseImage);
  } catch (e) {
    if (retry >= 0) {
      return await fetchWithRetry(words, retry - 1);
    } else {
      return [];
    }
  }
};

function useFetch(): [string[], (words: string) => void] {
  const [images, setImages] = useState<string[]>([]);
  const fetchImages = useCallback(async (words: string) => {
    const response = await fetchWithRetry(words, 10);
    setImages(response);
  }, []);

  return [images, fetchImages];
}

export default useFetch;
