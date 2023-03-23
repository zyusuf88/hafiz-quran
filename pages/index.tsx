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

const Home = () => { 
  const [ayahs, setAyahs] = useState<AyahData[]>([]);

  useEffect(() => {
    async function fetchData() {
      const ayahData = await getRandomAyahs();
      setAyahs(ayahData);
    }
    fetchData();
  }, []);


  console.log(ayahs)


  return (
   <Wrapper>
    <Heading>Hafiz</Heading>
    <AyahWrapper>
    {ayahs.map((a) => {
      return (
        <AnswerCard key={a.number} arabicSurahName={a.arabicName} englishSurahName={a.englishName}/>
      )
    })}
    </AyahWrapper>
      <>
      {ayahs.map((a) => {
        if(a.audioUrl){
          return (
            <AudioPlayer src={a.audioUrl} controls={true}/>
          )
        }
          })}
      </>
    
   
   </Wrapper>
  )
}

export default Home;