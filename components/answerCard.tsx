import styled from "styled-components"

interface Props {
    arabicSurahName: string
    englishSurahName: string 
}

const AnswerWrapper = styled.div `
display: flex;
flex-wrap: wrap;
flex-direction: column;
margin: 12px;
padding: 20px;
border-radius: 3px;
border: 2px solid #8E918E;
colour: white;

`

const SurahName = styled.p `
font-size: 14px;
text-align: center;
`
export function AnswerCard(props: Props) {
    return (
        <AnswerWrapper>
            <SurahName>{props.arabicSurahName}</SurahName>
            <SurahName>{props.englishSurahName}</SurahName>
        </AnswerWrapper>
    )
}