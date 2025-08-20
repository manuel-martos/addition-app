import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import PageHeader from '../../components/PageHeader/PageHeader';
import PageBody from '../../components/PageBody/PageBody';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { ArithmeticQuiz } from '../../components/ArithmeticQuiz/ArithmeticQuiz';
import type { ArithmeticQuizHandle } from '../../components/ArithmeticQuiz/ArithmeticQuiz';
import type { PageProps } from '../../components/Page/Page';

const MAX_ARITHMETIC_QUIZS = 4;

export function Additions(props: PageProps) {
  const [showResult, setShowResult] = useState(false);
  const quizRefs = useRef<Array<ArithmeticQuizHandle | null>>([]);

  const pageHeader = useMemo(
    () => ({
      title: 'Fem sumes!',
      lead: 'Les sumes son molt divertides.',
      description: 'Escriu el resultat de les sumes:',
    }),
    []
  );

  const onResultModalRefresh = useCallback(() => {
    setShowResult(false);
    quizRefs.current.forEach((q) => q?.updateQuiz());
  }, []);

  const onResultModalFinish = useCallback(() => {
    const remote = (window as any).require?.('electron')?.remote;
    const win = remote?.getCurrentWindow?.();
    win?.close?.();
  }, []);

  const onValidateAnswers = useCallback(() => {
    let allCorrect = true;
    for (let i = 0; i < MAX_ARITHMETIC_QUIZS; i++) {
      const ok = quizRefs.current[i]?.validateAnswer() ?? false;
      allCorrect = allCorrect && ok;
    }
    if (allCorrect) setShowResult(true);
  }, []);

  // Set up navigation buttons (componentDidMount equivalent)
  useEffect(() => {
    const rightButton = {
      visible: true,
      text: 'Corretgir',
      onClick: onValidateAnswers,
    };
    props.initNavigationButtons?.(undefined, rightButton);
  }, [props.initNavigationButtons, onValidateAnswers]);

  // Render quizzes and keep refs in sync
  const quizElements = useMemo(() => {
    quizRefs.current.length = MAX_ARITHMETIC_QUIZS;
    return Array.from({ length: MAX_ARITHMETIC_QUIZS }, (_, idx) => (
      <ArithmeticQuiz
        key={idx}
        ref={(ref) => {
          quizRefs.current[idx] = ref;
        }}
      />
    ));
  }, []);

  return (
    <>
      <PageHeader info={pageHeader} />
      <PageBody>
        <Form>
          <Container>{quizElements}</Container>
        </Form>
      </PageBody>

      <Modal show={showResult}>
        <Modal.Body>
          <p>Totes les respostes son correctes. Molt ben fet!</p>
          <p>Ara pots decidir si vols acabar o si vols tornar a fer mes sumes.</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onResultModalFinish}>
            Acabar
          </Button>
          <Button variant="primary" onClick={onResultModalRefresh}>
            Tornar a fer sumes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Additions;
