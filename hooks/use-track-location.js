import { useState, useContext } from "react"
import { ACTION_TYPES, StoreContext } from '../store/store-context';

export default function useTrackLocation() {
  const [locationErrorMessage, setLocationErrorMessage] = useState("")
  const [findingLocation, setFindingLocation] = useState(false)

  const { dispatch } = useContext(StoreContext)

  const success = (position) => {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;

    dispatch({
      type: ACTION_TYPES.SET_LAT_LONG,
      payload: {latLong: `${latitude},${longitude}`}
    })
    setLocationErrorMessage("")
    setFindingLocation(false)
  }

  const error = () => {
    setFindingLocation(false)
    setLocationErrorMessage("Geolocation is not supported in your browser")
  }
  
  const handleTrackLocation = () => {
    setFindingLocation(true);
    if(!navigator.geolocation) {
      setLocationErrorMessage("Geolocation is not supported in your browser")
      setFindingLocation(false)
    } else {
      navigator.geolocation.getCurrentPosition(success, error)
    }
  }

  return {
    handleTrackLocation,
    locationErrorMessage,
    findingLocation
  }
}