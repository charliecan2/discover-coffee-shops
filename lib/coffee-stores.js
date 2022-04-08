import { createApi } from 'unsplash-js'

const getUrlForCoffeeStores = (latLong, query, limit) => {
  return `https://api.foursquare.com/v3/places/nearby?ll=${latLong}&query=${query}&limit=${limit}`
}

const unsplashApi = createApi({
  accessKey: process.env.UNSPLASH_ACCESS_KEY,
})

export const getCoffeeStorePhotos = async () => {
  const photos = await unsplashApi.search.getPhotos({
    query: 'coffee shop',
    perPage: 10,
  });

  const unsplashResults = photos.response.results;

  const photosUrls = unsplashResults.map(result => result.urls['small'])

  return photosUrls
}

export const fetchCoffeeStores = async (
  latLong = "43.65267326999575,-79.39545615725015",
  limit = 8
) => {
  const photoResponse = getCoffeeStorePhotos();
  
  const response = await fetch(
    getUrlForCoffeeStores(latLong, "coffee stores", limit),
    {
      headers: {
        Authorization: process.env.NEXT_PUBLIC_FOURSQUARE_API_KEY,
      },
    }
  );
  
  const data = await response.json();

  return data.results;
}