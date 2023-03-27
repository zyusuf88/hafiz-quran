import axios from 'axios';

export interface AyahData {
  arabicName: string;
  englishName: string;
  number: number;
  audioUrl?: string;
}

function generateRandomNumbers(): number[] {
    const randomNumbers: number[] = [];
  
    while (randomNumbers.length < 4) {
      const randomNumber = Math.floor(Math.random() * (6236 - 5673 + 1) + 5673);
      if (!randomNumbers.includes(randomNumber)) {
        randomNumbers.push(randomNumber);
      }
    }
  
    return randomNumbers;
  }


const getRandomAyahs = async (): Promise<AyahData[]> => {
    const randomNumbers = generateRandomNumbers();
    const surahData: AyahData[] = [];
  
    await Promise.all(
      randomNumbers.map((number) =>
        axios.get(`http://api.alquran.cloud/v1/ayah/${number}`).then((response) => {
          const surah = response.data.data.surah;
          const surahDatum: AyahData = {
            number: response.data.data.number,
            arabicName: surah.name,
            englishName: surah.englishName,
          };
          surahData.push(surahDatum);
        })
      )
    );

  const randomIndex = Math.floor(Math.random() * 4);
  const ayahToGetAudioFor = surahData[randomIndex];
  const audioResponse = await axios.get(`http://api.alquran.cloud/v1/ayah/${ayahToGetAudioFor.number}/ar.alafasy`);
  ayahToGetAudioFor.audioUrl = audioResponse.data.data.audio


    return surahData;
  };



  export default getRandomAyahs

 


