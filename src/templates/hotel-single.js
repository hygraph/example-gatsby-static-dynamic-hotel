import React, { useState, useEffect } from "react"
import { Link, useStaticQuery, graphql } from "gatsby"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCircle } from "@fortawesome/free-solid-svg-icons"

import Layout from "../components/layout"
import SEO from "../components/seo"

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
  const [hotel, updateHotel] = useState(pageContext.hotel)
  const [currentImage, setCurrentImage] = useState(0)
  const [hasImages] = useState(hotel.photos)
  const [roomsFetched, setRoomsFetched] = useState(false)

  useEffect(() => {
    let isCurrent = true
    ;(async () => {
      const { data } = await postData(process.env.GATSBY_GCMS_URL, {
        query: ` query PaginatedHotels($hotelId:ID!) {
                hotel(where: {
                  id: $hotelId
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
          hotelId: hotel.id,
        },
      })
      if (isCurrent) {
        updateHotel(hs => ({ ...hs, ...data.hotel }))
        setRoomsFetched(true)
      }
    })()
    return () => (isCurrent = false)
  }, [])

  return (
    <Layout>
      <SEO title={hotel.name} />
      <div
        key={hotel.id}
        className="bg-cover flex w-full bg-no-repeat mb-12"
        style={{
          height: "48rem",
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.15) 0%, rgba(0, 0, 0, 0.15) 45%, rgba(0, 0, 0,1) 100%), url(${hotel.photos[currentImage].url})`,
        }}
      >
        <div className="max-w-xl self-end text-gray-100 p-16">
          <h1 className="text-5xl border-b-4 border-yellow-400 mb-6 pb-2">
            {hotel.name}
          </h1>
          <p>Rooms: {roomsFetched ? hotel.rooms : "Loading…"}</p>
          <div className="flex w-full -p-4 text-sm">
            {hasImages &&
              hotel.photos.map((image, index) => {
                return (
                  <span onClick={() => setCurrentImage(index)} className="p-4">
                    <FontAwesomeIcon icon={faCircle} />
                  </span>
                )
              })}
          </div>
        </div>
      </div>
      <div className="lg:w-1/2 text-xl text-gray-900 ml-12 mb-12">
        <p>{hotel.description}</p>
      </div>
      <div className="flex flex-wrap mb-12">
        {hotel.photos.map(photo => (
          <div
            className="w-1/2 bg-center"
            style={{ backgroundImage: `url(${photo.url})`, height: 450 }}
          />
        ))}
      </div>
    </Layout>
  )
}

export default Hotels
