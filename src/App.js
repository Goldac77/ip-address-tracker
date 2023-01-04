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

  //Receive the client's IP Address info from ipwhois
  useEffect(() => {
    axios.get("http://ipwho.is/")
    .then((response) => {
      setApiData(response.data)
    })
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
  console.log(apiData)

  if(apiData == null){
    return <p>Loading...</p>
  } else {

    const position = [apiData.latitude, apiData.longitude]

    return (
      <div className="App">
  
        <form>
          <input type="text" placeholder='Enter IP Address' name='ip_address' onChange={handleChange} />
          <button onClick={changeCenter}>></button>
        </form>
  
        <Data
          ip={apiData.ip}
          region={apiData.region}
          country={apiData.country}
          timezone={apiData.timezone.utc}
          isp={apiData.connection.isp}
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
