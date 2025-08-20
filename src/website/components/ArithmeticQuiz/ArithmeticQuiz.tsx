import {
  forwardRef,
  useCallback,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from 'react';

import Col from 'react-bootstrap/Col';
import FormControl from 'react-bootstrap/FormControl';
import Row from 'react-bootstrap/Row';

export enum Operator {
  Add,
  Substract,
}

export interface ArithmeticQuizInfo {
  value1: number;
  value2: number;
  operator: Operator;
}

export interface ArithmeticQuizState {
  quizInfo: ArithmeticQuizInfo;
  result?: boolean;
}

// Public imperative API (same methods the parent expects to call)
export interface ArithmeticQuizHandle {
  updateQuiz: () => void;
  validateAnswer: () => boolean;
}

// No incoming props were used; keep it empty to match original usage.
export interface ArithmeticQuizProps {}

export const ArithmeticQuiz = forwardRef<ArithmeticQuizHandle, ArithmeticQuizProps>(
  (_props, ref) => {
    const [quizInfo, setQuizInfo] = useState<ArithmeticQuizInfo>(() => createRandomQuiz());
    const [result, setResult] = useState<boolean | undefined>(undefined);
    const answerRef = useRef<HTMLInputElement | null>(null);

    const opSymbol = useMemo(
      () => (quizInfo.operator === Operator.Add ? '+' : '-'),
      [quizInfo.operator]
    );

    const getValidAnswer = useCallback(() => {
      return quizInfo.operator === Operator.Add
        ? quizInfo.value1 + quizInfo.value2
        : quizInfo.value1 - quizInfo.value2;
    }, [quizInfo]);

    const getCurrentAnswer = useCallback((): number | undefined => {
      const raw = answerRef.current?.value ?? '';
      if (typeof raw !== 'string') return undefined;
      const parsed = parseInt(raw, 10);
      return Number.isNaN(parsed) ? undefined : parsed;
    }, []);

    const updateQuiz = useCallback(() => {
      setResult(undefined);
      setQuizInfo(createRandomQuiz());
      if (answerRef.current) {
        answerRef.current.value = '';
      }
    }, []);

    const validateAnswer = useCallback(() => {
      const current = getCurrentAnswer();
      const valid = getValidAnswer();
      const ok = current === valid;
      setResult(ok);
      return ok;
    }, [getCurrentAnswer, getValidAnswer]);

    // Expose imperative methods to the parent (matches class component API)
    useImperativeHandle(ref, () => ({ updateQuiz, validateAnswer }), [updateQuiz, validateAnswer]);

    const inputStyle: React.CSSProperties =
      result !== undefined ? { borderColor: result ? 'green' : 'red' } : {};

    return (
      <Row className="justify-content-md-center center-vertical">
        <Col className="col-md-1">{quizInfo.value1}</Col>
        <Col className="col-md-1">{opSymbol}</Col>
        <Col className="col-md-1">{quizInfo.value2}</Col>
        <Col className="col-md-1">=</Col>
        <Col className="col-md-2">
          <FormControl ref={answerRef} id="addition" type="text" style={inputStyle} />
        </Col>

        {result === undefined && <Col className="col-md-3">&nbsp;</Col>}
        {result === true && <Col className="col-md-3">Correcte!</Col>}
        {result === false && <Col className="col-md-3">Incorrecte!</Col>}
      </Row>
    );
  }
);

ArithmeticQuiz.displayName = 'ArithmeticQuiz';

// --- helpers ---

function createRandomQuiz(): ArithmeticQuizInfo {
  let value1: number, value2: number;
  do {
    value1 = 1 + Math.floor(Math.random() * 8);
    value2 = 1 + Math.floor(Math.random() * 8);
  } while (value1 < value2);
  return { value1, value2, operator: Operator.Add };
}
