import { useState } from "react"

export default function useTrackLocation() {
  const [locationErrorMessage, setLocationErrorMessage] = useState("")
  const [latLong, setLatLong] = useState("")

  const success = (position) => {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;

    setLatLong(`${latitude},${longitude}`)
    setLocationErrorMessage("")
  }

  const error = () => {
    setLocationErrorMessage("Geolocation is not supported in your browser")
  }
  
  const handleTrackLocation = () => {
    if(!navigator.geolocation) {
      setLocationErrorMessage("Geolocation is not supported in your browser")
    } else {
      navigator.geolocation.getCurrentPosition(success, error)
    }
  }

  return {
    latLong,
    handleTrackLocation,
    locationErrorMessage
  }
}