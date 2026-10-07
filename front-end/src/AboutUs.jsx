import { useState, useEffect } from 'react'
import axios from 'axios'
import loadingIcon from './loading.gif'
import './AboutUs.css'

const AboutUs = props => {
  const [data, setData] = useState(null)
  const [error, setError] = useState('')

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_SERVER_HOSTNAME}/about`)
      .then(response => setData(response.data))
      .catch(err => {
        console.error(err)
        setError('Could not load the About Us content.')
      })
  }, [])

  if (error) return <p className="AboutUs-error">{error}</p>
  if (!data) return <img src={loadingIcon} alt="loading" />

  return (
    <>
      <h1>{data.title}</h1>
      <img
        className="AboutUs-photo"
        src={data.imageUrl}
        alt="Portrait"
        referrerPolicy="no-referrer"
      />
      {data.paragraphs.map((text, i) => (
        <p className="AboutUs-paragraph" key={i}>
          {text}
        </p>
      ))}
    </>
  )
}

export default AboutUs
