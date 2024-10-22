import styled from "styled-components";

interface Props {
  arabicSurahName: string;
  englishSurahName: string;
  isCorrect: boolean;
  onClick: () => void;
  backgroundColor: string;
  isAnswered: boolean;
  children?: React.ReactNode;
}

const AnswerWrapper = styled.button<{
  isCorrect: boolean;
  backgroundColor: string;
  isAnswered: boolean;
  children?: React.ReactNode;
  onClick: () => void
}>`
  all: unset;
  display: flex;
  width: 100px;
  flex-wrap: wrap;
  flex-direction: column;
  margin: 12px;
  padding: 20px;
  border-radius: 5px;
  colour: white;
  background: #cad2c5;
  align-items: center;
  background: ${(props) => props.backgroundColor};
  cursor: pointer;

  flex-basis: 50%;

  @media (max-width: 600px) {
    flex-basis: 100%;
  }
`;

const ArabicSurahName = styled.p`
  font-size: 20px;
`;
const EnglishSurahName = styled.p`
  font-size: 14px;
`;

export function AnswerCard(props: Props) {
  return (
    <AnswerWrapper
      backgroundColor={props.backgroundColor}
      onClick={props.onClick}
      isCorrect={props.isCorrect}
      isAnswered={props.isAnswered}
    >
      <ArabicSurahName>{props.arabicSurahName}</ArabicSurahName>
      <EnglishSurahName>{props.englishSurahName}</EnglishSurahName>
    </AnswerWrapper>
  );
}
