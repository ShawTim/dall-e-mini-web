import React, { useCallback, useEffect, useState } from 'react';
import {
  Container,
  InputGroup,
  FormControl,
  Button,
  Image,
  Row,
  Col,
  Spinner,
  Alert,
} from 'react-bootstrap';
import useFetch from './hooks/useFetch';

import './App.css';

const LOOP = new Array(3).fill(0);

function App() {
  const [hasFetched, setHasFetched] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [words, setWords] = useState<string>('');
  const [images, fetchImages] = useFetch();

  useEffect(() => setLoading(false), [images]);

  const handleWordsChange = useCallback(
    (ev: React.ChangeEvent<HTMLInputElement>) => setWords(ev.target.value),
    [setWords]
  );
  const handleBtnClick = useCallback(() => {
    fetchImages(words);
    setLoading(true);
    setHasFetched(true);
  }, [words, fetchImages]);

  return (
    <Container fluid='sm' className='App'>
      {!loading && hasFetched && !images.length && (
        <Row>
          <Col>
            <Alert variant='danger'>
              Too many traffic, please try again later.
            </Alert>
          </Col>
        </Row>
      )}
      <Row class='mb-3'>
        <InputGroup>
          <FormControl
            value={words}
            placeholder='keywords'
            aria-label='keywords'
            onChange={handleWordsChange}
          />
          <Button variant='primary' onClick={handleBtnClick} disabled={loading}>
            {loading ? <Spinner animation='border' size='sm' /> : 'Submit'}
          </Button>
        </InputGroup>
      </Row>
      {LOOP.map((_, i) => (
        <Row>
          <Col>
            <Image src={images[i * 3]} thumbnail={!!images[i * 3]} />
            <Image src={images[i * 3 + 1]} thumbnail={!!images[i * 3 + 1]} />
            <Image src={images[i * 3 + 2]} thumbnail={!!images[i * 3 + 2]} />
          </Col>
        </Row>
      ))}
    </Container>
  );
}

export default App;
