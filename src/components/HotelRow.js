import React from "react"

const HotelRow = ({ hotel, roomsFetched }) => {
  return (
    <div className="flex w-full mb-6 border border-gray-300">
      {hotel.photos ? (
        <div
          style={{
            width: 200,
            overflow: "hidden",
          }}
        >
          <img src={hotel.photos[0].url} className="w-full" />
        </div>
      ) : (
        <div className="w-1/12 bg-gray-400 h-32" />
      )}
      <div className="p-4">
        <h1 className="text-xl font-bold">{hotel.name}</h1>
        <p>Rooms: {roomsFetched ? hotel.rooms : "Loading..."}</p>
      </div>
    </div>
  )
}

export default HotelRow
