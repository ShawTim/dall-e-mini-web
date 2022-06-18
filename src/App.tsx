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
  ListGroup,
} from 'react-bootstrap';
import useFetch from './hooks/useFetch';

import './App.css';

const LOOP = new Array(9).fill(0);

const GithubIcon = () => (
  <Image
    src='https://github.githubassets.com/favicons/favicon.svg'
    width={20}
    height={20}
  />
);

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
          <Col xs='auto'>
            <Alert variant='danger'>
              Too many traffic, please try again later.
            </Alert>
          </Col>
          <Col xs={12}></Col>
        </Row>
      )}
      <Row className='mb-3'>
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
      <Row className='justify-content-md-center'>
        <Col lg={9} xs={12}>
          {LOOP.map((_, i) => (
            <Image src={images[i]} thumbnail={!!images[i]} />
          ))}
        </Col>
      </Row>
      <Row className='mt-4'>
        <Col>
          <ListGroup horizontal className='justify-content-md-center'>
            <ListGroup.Item>
              <a
                className='text-decoration-none'
                href='https://github.com/shawtim/dall-e-mini-web'
                target='_blank'
              >
                <GithubIcon /> source
              </a>
            </ListGroup.Item>
            <ListGroup.Item>
              Credit:&nbsp;
              <a
                className='text-decoration-none'
                href='https://github.com/borisdayma/dalle-mini'
                target='_blank'
              >
                <GithubIcon /> DALL·E Mini
              </a>
            </ListGroup.Item>
          </ListGroup>
        </Col>
      </Row>
    </Container>
  );
}

export default App;
