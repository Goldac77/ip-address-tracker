import './App.css';
import axios from 'axios';
import Data from './Data';
import { useEffect, useRef, useState } from 'react';
import { MapContainer, Marker, Popup, TileLayer, } from 'react-leaflet';

function App() {
  const [formData, setFormData] = useState({
    ip_address: ""
  })
  const [apiData, setApiData] = useState(null)
  let ipAddress = useRef("")
  

  const requestOne = axios.get('https://api.ipify.org?format=json')
  const requestTwo = axios.get(`https://geo.ipify.org/api/v2/country,city?apiKey=at_8J8AJvFhxoGg3zlFER17GFYquOMiu&ipAddress=${ipAddress.current}`)

  //Receive the client's IP Address from ipify api AND Receive Geolocation data from api
  useEffect(() => {
    axios.all([requestOne, requestTwo])
    .then(axios.spread((...responses) => {
      ipAddress.current = responses[0].data.ip
      setApiData(responses[1].data)
    }))
  }, [])

  function handleChange(event) {
    setFormData((prevFormData) => {
      return {...prevFormData,
        [event.target.name]: event.target.value
      }
    })
  }
  
  /*Change map center and view based on new lat and lng
  from new api request*/
  function changeCenter(){
    //TODO...
  }

  console.log(formData)
  console.log(ipAddress.current)
  console.log(apiData)

  if(apiData == null){
    return <p>Loading...</p>
  } else {

    const position = [apiData.location.lat, apiData.location.lng]

    return (
      <div className="App">
  
        <form>
          <input type="text" placeholder='Enter IP Address' name='ip_address' onChange={handleChange} />
          <button onClick={changeCenter}>></button>
        </form>
  
        <Data
          ip={apiData.ip}
          region={apiData.location.region}
          country={apiData.location.country}
          timezone={apiData.location.timezone}
          isp={apiData.isp}
        />
  
        <MapContainer center={position} zoom={13} scrollWheelZoom={false}>
          
          <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"/>
          <Marker position={position}>
            <Popup>
              A Pretty CSS3 Popup
            </Popup>
          </Marker>
        </MapContainer>
  
      </div>
    );
  }

}

export default App;
