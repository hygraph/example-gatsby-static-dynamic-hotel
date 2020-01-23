import React, { useState, useEffect } from "react"
import { Link, useStaticQuery, graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import { merge } from "../../lodashy"

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
  const { currentPage, chunk, totalPages } = pageContext
  const [hotels, updateHotels] = useState(chunk)
  const [roomsFetched, setRoomsFetched] = useState(false)

  useEffect(() => {
    let isCurrent = true
    ;(async () => {
      const { data } = await postData(process.env.GATSBY_GCMS_URL, {
        query: ` query PaginatedHotels($hotelIds:[ID!]) {
          hotels(where: {
            id_in: $hotelIds
          }) {
            id
            rooms
          }
        }        
        `,
        variables: {
          hotelIds: hotels.map(hotel => hotel.id),
        },
      })
      if (isCurrent) {
        updateHotels(hs => merge(hs, data.hotels))
        setRoomsFetched(true)
      }
    })()
    return () => (isCurrent = false)
  }, [hotels])

  const button = "py-4 px-6 bg-yellow-400 text-xl font-serif font-bold"

  const previous =
    currentPage === 0
      ? null
      : currentPage === 1
      ? "/demo-three/hotels"
      : `/demo-three/${currentPage}`
  const next =
    currentPage === totalPages - 1 ? null : `/demo-three/${currentPage + 2}`

  return (
    <Layout>
      <SEO title="Demo Three" />
      <div className="flex flex-wrap mb-16">
        {hotels.map((hotel, key) => (
          <HotelBox hotel={hotel} key={key} roomsFetched={roomsFetched} />
        ))}
      </div>
      <div className="flex justify-center mb-16">
        {previous && (
          <Link className={button} to={previous}>
            Previous
          </Link>
        )}
        {next && (
          <Link className={button} to={next}>
            Next
          </Link>
        )}
      </div>
    </Layout>
  )
}

export default Hotels
