import {AnswerCard} from "@/components/answerCard";
import {useEffect, useState} from "react";
import styled from "styled-components"
import getRandomAyahs, {AyahData} from "@/src/api";
import AudioPlayer from 'react-audio-player';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`
const Heading = styled.div`
  margin: 20px;
  font-size: 50px;
  color: #FFF;
`

const AyahWrapper = styled.div`
  display: flex;
`

const AudioWrapper = styled.div`
  margin: 20px 0px
`

const NextQuestionButton = styled.div`
  padding: 10px;
  background: #cad2c5;
  border-radius: 5px;
  cursor: pointer;
`

const Home = () => {
    const [ayahs, setAyahs] = useState<AyahData[]>([]);
    const [selectedAyah, setSelectedAyah] = useState<AyahData>();
    const [backgroundColor, setBackgroundColor] = useState('#cad2c5')
    const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
    const [selectedCardIndex, setSelectedCardIndex] = useState<number | null>(null);
    const [isAnswered, setIsAnswered] = useState(false);


    useEffect(() => {
      setAyahs([])
      const randomIndex = Math.floor(Math.random() * 4);
        async function fetchData() {
            const ayahData = await getRandomAyahs();
            setAyahs(ayahData)
            setSelectedAyah(ayahData[randomIndex])
        }
        fetchData()
    }, []);

    const handleClick = (isCorrect: boolean, index: number) => {
      if (isAnswered) {
        return
      }

      setIsAnswered(true);
      setIsCorrect(isCorrect);
      setSelectedCardIndex(index);

      
    };

    const cardBackgroundColor = (index: number) => {
      if (selectedCardIndex === null) {
        return backgroundColor;
      } else if (index === selectedCardIndex) {
        return isCorrect ? '#7FFF7F' : '#FF7F7F';
      } else {
        return backgroundColor;
      }
    };

    const generateNewCards = () => {
      setIsAnswered(false);
      setSelectedCardIndex(null)
      const randomIndex = Math.floor(Math.random() * 4);
      async function fetchData() {
        const ayahData = await getRandomAyahs();
        setAyahs(ayahData)
        setSelectedAyah(ayahData[randomIndex])
    }
    fetchData() 
    };
  
    return (
        <Wrapper>
            <Heading>Hafiz 1.0</Heading>
            <p>Guess the surah the ayah is from</p>
            <AyahWrapper>
                {selectedAyah && ayahs.map(({number,arabicName,englishName}, index) => {
                    return (
                        <AnswerCard isCorrect={englishName === selectedAyah.englishName} key={number} arabicSurahName={arabicName} englishSurahName={englishName} backgroundColor={cardBackgroundColor(index)} onClick={() => handleClick(englishName === selectedAyah.englishName, index)} isAnswered={isAnswered}/>
                    )
                })}
            </AyahWrapper>
            <AudioWrapper>
                {selectedAyah && <AudioPlayer key={selectedAyah.number} autoPlay={true} src={selectedAyah.audioUrl} controls={true}/> }
            </AudioWrapper>
            {isAnswered &&  <NextQuestionButton onClick={generateNewCards}>Next question</NextQuestionButton>}
            

        </Wrapper>
    )
}

export default Home;