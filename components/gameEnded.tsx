import styled from "styled-components";

const Wrapper = styled.h1`
  font-family: "San Francisco", Helvetica, Arial, san-serif;
  font-size: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 50px 0px;
  color: #fff;
  background: #344e41;
  padding: 20px;
  border-radius: 5px;
  justify-content: center;
`;

const ScoreBubble = styled.div`
  background: #a4b494;
  border-radius: 50%;
  height: 50px;
  width: 50px;
  padding: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

interface Props {
  totalPoints: number;
  totalRounds: number;
}

export function EndGame(props: Props) {
  return (
    <Wrapper>
      <p>Congratulations!</p>
      <p>You scored</p>
      <ScoreBubble>
        <p>{props.totalPoints}</p>
      </ScoreBubble>
      <p>out of {props.totalRounds}</p>
    </Wrapper>
  );
}
