import './App.css';
import axios from 'axios';
import Data from './Data';
import { useEffect, useState } from 'react';
import { MapContainer, Marker, Popup, TileLayer, } from 'react-leaflet';

function App() {
  const [formData, setFormData] = useState({
    ip_address: ""
  })
  const [apiData, setApiData] = useState(null)
  const ipRegExp = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/

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
  
  /*Fetch new data from api and change map view
  It checks for a valid IP address before making a GET request
  Doesn't change map view in it's current state*/
  function changeCenter(){
    if(formData.ip_address === "") {
      alert("Enter a valid IP Address")
    } else if(!ipRegExp.test(formData.ip_address)) {
      alert("Enter a valid IP Address")
    } else {
      axios.get(`http://ipwho.is/${formData.ip_address}`)
      .then((response) => {
        setApiData(response.data)
      })
    }
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
          <button type='button' onClick={changeCenter}>></button>
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
