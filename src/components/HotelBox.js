import React, { useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCircle } from "@fortawesome/free-solid-svg-icons"
import { Link } from "gatsby"

const HotelBox = ({ hotel, roomsFetched }) => {
  const [currentImage, setCurrentImage] = useState(0)
  const [hasImages] = useState(hotel.photos)

  return (
    <div
      key={hotel.id}
      className="bg-cover flex w-1/2 bg-no-repeat"
      style={{
        height: "48rem",
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.15) 0%, rgba(0, 0, 0, 0.15) 45%, rgba(0, 0, 0,1) 100%), url(${hotel.photos[currentImage].url})`,
      }}
    >
      <Link
        to={"/hotels/" + hotel.slug}
        className="self-end text-gray-100 p-24"
      >
        <div>
          <h1 className="text-5xl border-b-4 border-yellow-400 mb-6 pb-2">
            {hotel.name}
          </h1>
          <p>Rooms: {roomsFetched ? hotel.rooms : "Loading…"}</p>
          <p>{hotel.description}</p>
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
      </Link>
    </div>
  )
}

export default HotelBox
