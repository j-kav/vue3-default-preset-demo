import axios from './http';

const prettifyBreedName = (value) => {
    return (value.charAt(0).toUpperCase() + value.slice(1))
        .replace('/', ' ');
}

const baseUrl = 'https://dog.ceo/api';

const fetchAllBreeds = async () => {
    const result = await axios.get(`${baseUrl}/breeds/list/all`);

    if (result.status !== 200 && result.data.status !== 'success') {
        return [new Error('Cannot load breeds'), null];
    }

    const breeds = Object.keys(result.data.message)
        .flatMap((key) =>
            result.data.message[key].length === 0
                ? [key]
                : result.data.message[key].map((breedPostfix) => `${key}/${breedPostfix}`))
        .map((breed) => ({
            displayName: prettifyBreedName(breed),
            id: breed
        }))

    return [null, breeds];
}

const fetchAllBreedImages = async (breedId) => {
    const result = await axios.get(`https://dog.ceo/api/breed/${breedId}/images`);

    if (result.status !== 200 && result.data.status !== 'success') {
        return [new Error('Cannot load breeds'), null];
    }

    const breedImages = result.data.message
        .map((breedImage) => ({
            url: breedImage,
            id: breedId,
            displayName: prettifyBreedName(breedId),
        }));

    return [null, breedImages];
}

const fetchShuffledBreedImages = async (breedId, count = 3) => {
    const result = await axios.get(`https://dog.ceo/api/breed/${breedId}/images/random/${count}`);

    if (result.status !== 200 && result.data.status !== 'success') {
        return [new Error('Cannot load shuffled breed images'), null];
    }

    const breedImages = result.data.message
        .map((breedImage) => ({
            url: breedImage,
            id: breedId,
            displayName: prettifyBreedName(breedId),
        }));

    return [null, breedImages];
}



export {
    fetchAllBreeds,
    fetchAllBreedImages,
    fetchShuffledBreedImages,
};