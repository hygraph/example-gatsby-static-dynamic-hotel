import React, { useState, useEffect } from "react"
import { merge } from "../../lodashy"
import Layout from "../components/layout"
import SEO from "../components/seo"

import HotelBox from "../components/HotelBox"

async function postData(url = "", data = {}) {
  // Default options are marked with *
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

  const button = "py-4 px-6 bg-yellow-400 text-xl font-serif font-bold"

  const loadData = () => {
    ;(async () => {
      const { data } = await postData(process.env.GATSBY_GCMS_URL, {
        query: `query {
            hotels {
              id
              rooms
            }
          }`,
      })
      updateHotels(hs => merge(hs, data.hotels))
      setRoomsFetched(true)
    })()
  }

  return (
    <Layout>
      <SEO title="Demo Two" />
      <div className="flex flex-wrap mb-32">
        {hotels.map((hotel, key) => (
          <HotelBox hotel={hotel} key={key} roomsFetched={roomsFetched} />
        ))}
      </div>
      <div className="flex justify-center mb-16">
        <button className={button} onClick={() => loadData()}>
          Look for Rooms
        </button>
      </div>
    </Layout>
  )
}

export default Hotels
