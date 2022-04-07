const getUrlForCoffeeStores = (latLong, query, limit) => {
  return `https://api.foursquare.com/v3/places/nearby?ll=${latLong}&query=${query}&limit=${limit}`
}

export const fetchCoffeeStores = async (
  latLong = "43.65267326999575,-79.39545615725015",
  limit = 8
) => {
  const response = await fetch(
    getUrlForCoffeeStores(latLong, "coffee stores", limit),
    {
      headers: {
        Authorization: process.env.NEXT_PUBLIC_FOURSQUARE_API_KEY,
      },
    }
  );
  
  const data = await response.json();
  
  console.log(data.results);

  return data.results;
}