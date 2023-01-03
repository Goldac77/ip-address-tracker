import './App.css';
import { useState } from 'react';

function App() {
  const [formData, setFormData] = useState({
    ip_address: ""
  })

  function handleChange(event) {
    setFormData((prevFormData) => {
      return {...prevFormData,
        [event.target.name]: event.target.value
      }
    })
  } 

  console.log(formData)

  return (
    <div className="App">
      <form>
        <input type="text" placeholder='Enter IP Address' name='ip_address' onChange={handleChange} />
      </form>
    </div>
  );
}

export default App;
