import { AnswerCard } from "@/components/answerCard";
import { useEffect, useState } from "react";
import styled from "styled-components";
import getRandomAyahs, { AyahData } from "@/src/api";
import AudioPlayer from "react-audio-player";
import { EndGame } from "@/components/gameEnded";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const Heading = styled.div`
  margin: 20px;
  font-size: 50px;
  color: #fff;
`;

const AyahWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
`;

const AudioWrapper = styled.div`
  margin: 20px 0px;
`;

const ResetGameButton = styled.button<{ children?: React.ReactNode;
  onClick: () => void}>`
  padding: 20px;
  background: #cad2c5;
  border-radius: 5px;
  cursor: pointer;
  font-family: "San Francisco", Helvetica, Arial, san-serif;
`;

const Home = () => {
  const [ayahs, setAyahs] = useState<AyahData[]>([]);
  const [selectedAyah, setSelectedAyah] = useState<AyahData>();
  const [backgroundColor, setBackgroundColor] = useState("#cad2c5");
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [selectedCardIndex, setSelectedCardIndex] = useState<number | null>(
    null
  );
  const [isAnswered, setIsAnswered] = useState(false);
  const [pointsCounter, setPointsCounerter] = useState(0);
  const [round, setRound] = useState(0);

  console.log("selected", selectedAyah);

  useEffect(() => {
    setAyahs([]);
    const randomIndex = Math.floor(Math.random() * 4);
    async function fetchData() {
      const ayahData = await getRandomAyahs();
      setAyahs(ayahData);
      setSelectedAyah(ayahData[randomIndex]);
    }
    fetchData();
  }, []);

  const handleClick = (isCorrect: boolean, index: number) => {
    if (isAnswered) {
      return;
    }

    setIsAnswered(true);
    setIsCorrect(isCorrect);
    setSelectedCardIndex(index);

    if (isCorrect) {
      setPointsCounerter(pointsCounter + 1);
    }
  };

  const cardBackgroundColor = (index: number, englishName: string) => {
    if (selectedCardIndex === null) {
      return backgroundColor;
    } else if (index === selectedCardIndex) {
      return isCorrect ? "#7FFF7F" : "#FF7F7F";
    } else if (
      !isCorrect &&
      index != selectedCardIndex &&
      selectedAyah?.englishName === englishName
    ) {
      setTimeout("3000");
      return "#7FFF7F";
    } else {
      return backgroundColor;
    }
  };

  const generateNewCards = () => {
    setRound(round + 1);
    setIsAnswered(false);
    setSelectedCardIndex(null);
    const randomIndex = Math.floor(Math.random() * 4);
    async function fetchData() {
      const ayahData = await getRandomAyahs();
      setAyahs(ayahData);
      setSelectedAyah(ayahData[randomIndex]);
    }
    fetchData();
  };

  const resetGame = () => {
    setRound(0);
    setPointsCounerter(0);
    setIsAnswered(false);
    setSelectedCardIndex(null);
    const randomIndex = Math.floor(Math.random() * 4);
    async function fetchData() {
      const ayahData = await getRandomAyahs();
      setAyahs(ayahData);
      setSelectedAyah(ayahData[randomIndex]);
    }
    fetchData();
  };

  return (
    <Wrapper>
      {round < 5 ? (
        <>
          <>
            <h1> Points: {pointsCounter}</h1>
          </>
          <Heading>Hafiz 1.0</Heading>
          <p>Guess the surah the ayah is from</p>
          <AyahWrapper>
            {selectedAyah &&
              ayahs.map(({ number, arabicName, englishName }, index) => {
                return (
                  <AnswerCard
                    isCorrect={englishName === selectedAyah.englishName}
                    key={number}
                    arabicSurahName={arabicName}
                    englishSurahName={englishName}
                    backgroundColor={cardBackgroundColor(index, englishName)}
                    onClick={() =>
                      handleClick(
                        englishName === selectedAyah.englishName,
                        index
                      )
                    }
                    isAnswered={isAnswered}
                  />
                );
              })}
          </AyahWrapper>
          <AudioWrapper>
            {selectedAyah && (
              <AudioPlayer
                key={selectedAyah.number}
                autoPlay={true}
                src={selectedAyah.audioUrl}
                controls={true}
              />
            )}
          </AudioWrapper>
          {isAnswered && (
            <ResetGameButton onClick={generateNewCards}>
              Next question
            </ResetGameButton>
          )}
        </>
      ) : (
        <>
          <EndGame totalPoints={pointsCounter} totalRounds={round} />
          <ResetGameButton onClick={resetGame}>Play Again</ResetGameButton>
        </>
      )}
    </Wrapper>
  );
};

export default Home;
