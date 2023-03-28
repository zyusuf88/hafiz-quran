import axios from 'axios';

export interface AyahData {
    arabicName: string;
    englishName: string;
    number: number;
    audioUrl?: string;
}

const TOTAL_AYAH_COUNT = 6236;
const MIN_AYAH_NUMBER = 5673;


function generateRandomAyah(numberOfSurahs = 4): number[] {
    const randomNumbers: number[] = [];

    for (let i = 0; i < numberOfSurahs; i++) {
        const randomNumber = Math.floor(Math.random() * (TOTAL_AYAH_COUNT - MIN_AYAH_NUMBER + 1) + MIN_AYAH_NUMBER);
        if (!randomNumbers.includes(randomNumber)) {
            randomNumbers.push(randomNumber);
        }
    }
    return randomNumbers;
}


const getRandomAyahs = async (): Promise<AyahData[]> => {
    const randomNumbers = generateRandomAyah();

    const promises = randomNumbers.map((number) => axios.get(`http://api.alquran.cloud/v1/ayah/${number}/ar.alafasy`));
    const responses = await Promise.all(promises);
    return responses.map((response) => {
        return {
            number: response.data.data.number,
            arabicName: response.data.data.surah.name,
            englishName: response.data.data.surah.englishName,
            audioUrl: response.data.data.audio
        }
    });

    // await Promise.all(
    //     randomNumbers.map((number) =>
    //         axios.get(`http://api.alquran.cloud/v1/ayah/${number}`).then((response) => {
    //             const surah = response.data.data.surah;
    //             const surahDatum: AyahData = {
    //                 number: response.data.data.number,
    //                 arabicName: surah.name,
    //                 englishName: surah.englishName,
    //             };
    //             surahData.push(surahDatum);
    //         })
    //     )
    // );
    //
    // const randomIndex = Math.floor(Math.random() * 4);
    // const ayahToGetAudioFor = surahData[randomIndex];
    // const audioResponse = await axios.get(`http://api.alquran.cloud/v1/ayah/${ayahToGetAudioFor.number}/ar.alafasy`);
    // ayahToGetAudioFor.audioUrl = audioResponse.data.data.audio
    //
    //
    // return surahData;
};


export default getRandomAyahs

 


