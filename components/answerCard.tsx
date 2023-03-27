import styled from "styled-components"

interface Props {
    arabicSurahName: string
    englishSurahName: string 
    isCorrect: boolean
}

const AnswerWrapper = styled.div `
display: flex;
flex-wrap: wrap;
flex-direction: column;
margin: 12px;
padding: 20px;
border-radius: 5px;
width: 100px;
colour: white;
background: #cad2c5;
text-align: center;
`

const SurahName = styled.p `
font-size: 14px;
`
export function AnswerCard(props: Props) {
    return (
        <AnswerWrapper>
            <SurahName>{props.arabicSurahName}</SurahName>
            <SurahName>{props.englishSurahName}</SurahName>
            {props.isCorrect && (<>Correct one</>)}
        </AnswerWrapper>
    )
}