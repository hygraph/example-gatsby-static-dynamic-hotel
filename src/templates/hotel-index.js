import React, { useState, useEffect } from "react"
import { merge } from "../../lodashy"
import Layout from "../components/layout"
import SEO from "../components/seo"

import HotelBox from "../components/HotelBox"

async function postData(url = "", data = {}) {
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
  return await response.json()
}

const Hotels = ({ pageContext }) => {
  const [hotels, updateHotels] = useState(pageContext.hotels)
  const [roomsFetched, setRoomsFetched] = useState(false)

  useEffect(() => {
    let isCurrent = true
    ;(async () => {
      const { data } = await postData(process.env.GATSBY_GCMS_URL, {
        query: `query {
            hotels {
              id
              rooms
            }
          }`,
      })
      if (isCurrent) {
        updateHotels(hs => merge(hs, data.hotels))
        setRoomsFetched(true)
      }
    })()
    return () => (isCurrent = false)
  }, [])

  return (
    <Layout>
      <SEO title="Demo One" />
      <div className="flex flex-wrap">
        {hotels.map((hotel, key) => (
          <HotelBox hotel={hotel} key={key} roomsFetched={roomsFetched} />
        ))}
      </div>
    </Layout>
  )
}

export default Hotels
