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

const Home = () => {
    const [ayahs, setAyahs] = useState<AyahData[]>([]);
    const [selectedAyah, setSelectedAyah] = useState<AyahData>();

    useEffect(() => {
        async function fetchData() {
            const ayahData = await getRandomAyahs();
            setAyahs(ayahData);
        }


        fetchData().then(() => {
            setSelectedAyah(ayahs[Math.floor(Math.random() * ayahs.length)]);
            console.log({selectedAyah, ayahs})
        });

    }, []);


    return (
        <Wrapper>
            <Heading>Hafiz 1.0</Heading>
            <p>Guess the surah the ayah is from</p>
            <AyahWrapper>
                {selectedAyah && ayahs.map(({number,arabicName,englishName}) => {
                    return (
                        <AnswerCard isCorrect={englishName === selectedAyah.englishName} key={number} arabicSurahName={arabicName} englishSurahName={englishName}/>
                    )
                })}
            </AyahWrapper>
            <AudioWrapper>
                { selectedAyah && <AudioPlayer key={selectedAyah.number} autoPlay={false} src={selectedAyah.audioUrl} controls={true}/> }
            </AudioWrapper>


        </Wrapper>
    )
}

export default Home;