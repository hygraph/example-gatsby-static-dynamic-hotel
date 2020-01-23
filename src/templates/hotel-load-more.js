import React, { useState, useEffect } from "react"
import { Link, useStaticQuery, graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import { merge, chunk } from "../../lodashy"

import HotelRow from "../components/HotelRow"

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
  const hotelPages = chunk(pageContext.hotels, 5)
  const [hotels, updateHotels] = useState(hotelPages[0])
  const [pageIndex, updatePageIndex] = useState(0)
  const [roomsFetched, setRoomsFetched] = useState(false)

  const fetchHotelData = page => {
    ;(async () => {
      const { data } = await postData(process.env.GATSBY_GCMS_URL, {
        query: ` query PaginatedHotels($hotelIds:[ID!]) {
                hotels(where: {
                  id_in: $hotelIds
                }) {
                  id
                  photos {
                      url
                  }
                  rooms
                }
              }        
              `,
        variables: {
          hotelIds: hotelPages[pageIndex].map(hotel => hotel.id),
        },
      })
      updatePageIndex(index => index + 1)
      updateHotels(hs => merge(hs, data.hotels))
      setRoomsFetched(true)
    })()
  }

  const loadMoreHotels = index => {
    const nextPage = hotelPages[index]
    updateHotels(hs => [...hs, ...nextPage])
    fetchHotelData()
  }

  useEffect(() => {
    let isCurrent = true
    fetchHotelData()
    return () => (isCurrent = false)
  }, [])

  const button = "py-4 px-6 bg-yellow-400 text-xl font-serif font-bold"

  return (
    <Layout>
      <SEO title="Demo Four" />
      <div className="w-full">
        <div className="flex flex-wrap mb-16 w-full">
          {hotels.map((hotel, key) => (
            <HotelRow hotel={hotel} key={key} roomsFetched={roomsFetched} />
          ))}
        </div>
        <div className="flex justify-center mb-16">
          <button className={button} onClick={() => loadMoreHotels(pageIndex)}>
            Load More
          </button>
        </div>
      </div>
    </Layout>
  )
}

export default Hotels
