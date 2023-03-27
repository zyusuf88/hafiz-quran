import { AnswerCard } from "@/components/answerCard";
import { useEffect, useState } from "react";
import styled from "styled-components"
import getRandomAyahs, {AyahData} from "@/src/api";
import AudioPlayer from 'react-audio-player';

const Wrapper = styled.div `
display: flex;
flex-direction: column;
align-items: center;
`
const Heading = styled.div `
margin: 20px;
font-size: 50px;
color: #FFF;
`

const AyahWrapper = styled.div `
display: flex;
`

const AudioWrapper = styled.div `
margin: 20px 0px
`

const Home = () => { 
  const [ayahs, setAyahs] = useState<AyahData[]>([]);

  useEffect(() => {
    async function fetchData() {
      const ayahData = await getRandomAyahs();
      setAyahs(ayahData);
    }
    fetchData();
  }, []);



  return (
   <Wrapper>
    <Heading>Hafiz 1.0</Heading>
    <p>Guess the surah the ayah is from</p>
    <AyahWrapper>
    {ayahs.map((a) => {
      return (
        <AnswerCard isCorrect={a.audioUrl ? true : false} key={a.number} arabicSurahName={a.arabicName} englishSurahName={a.englishName}/>
      )
    })}
    </AyahWrapper>
      <AudioWrapper>
      {ayahs.map((a) => {
        if(a.audioUrl){
          return (
            <AudioPlayer key={a.number} autoPlay={true} src={a.audioUrl} controls={true}/>
          )
        }
          })}
      </AudioWrapper>
    
   
   </Wrapper>
  )
}

export default Home;