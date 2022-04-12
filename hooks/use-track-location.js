import { useState } from "react"

export default function useTrackLocation() {
  const [locationErrorMessage, setLocationErrorMessage] = useState("")
  const [latLong, setLatLong] = useState("")
  const [findingLocation, setFindingLocation] = useState(false)

  const success = (position) => {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;

    setLatLong(`${latitude},${longitude}`)
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
    latLong,
    handleTrackLocation,
    locationErrorMessage,
    findingLocation
  }
}