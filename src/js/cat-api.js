import axios from 'axios';

axios.defaults.headers.common['x-api-key'] =
  'live_8CoVBLC9aZolICXzvyyxeEAcUbJcBLCBfeHB03Q0jVss9sHPS8qokxRh5dbP8Kg4';

const listUrl = 'https://api.thecatapi.com/v1/breeds';
const catUrl = 'https://api.thecatapi.com/v1/images/search?';

function fetchBreeds() {
  return axios({ url:listUrl }).then(res => {
    if (res.status !== 200)
      throw new Error('Sorry, but cats have been finished!!');
    return res.data;
  });
}

function fetchCatByBreed(breed_ids) {
  const url = `${catUrl}breed_ids=${breed_ids}`;
  return axios({ url }).then(res => {
    if (res.status !== 200)
      throw new Error('Sorry, but cats have been finished!!');
    return res.data[0];
  });
}

export { fetchBreeds, fetchCatByBreed };
