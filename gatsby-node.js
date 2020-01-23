const path = require(`path`)
const { chunk, merge } = require("./lodashy")
const { createFilePath } = require(`gatsby-source-filesystem`)

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions

  const hotelIndexPage = path.resolve(`./src/templates/hotel-index.js`)
  const hotelIndexPageManual = path.resolve(
    `./src/templates/hotel-index-manual.js`
  )
  const hotelPagination = path.resolve(`./src/templates/hotel-pagination.js`)
  const hotelLoadMore = path.resolve(`./src/templates/hotel-load-more.js`)
  const individualHotel = path.resolve(`./src/templates/hotel-single.js`)

  const minimalQuery = await graphql(
    `
      query {
        gcms {
          hotels {
            id
            slug
            name
          }
        }
      }
    `
  )

  if (minimalQuery.errors) {
    throw result.errors
  }

  const minHotels = minimalQuery.data.gcms.hotels

  const extendedQuery = await graphql(
    `
      query {
        gcms {
          hotels {
            id
            description
            photos {
              url
            }
          }
        }
      }
    `
  )

  if (extendedQuery.errors) {
    throw result.errors
  }

  const extendedHotels = extendedQuery.data.gcms.hotels

  // Create a merged data set, what would essentially be one large query"
  const hotels = merge(minHotels, extendedHotels)

  /*
Demo One!
Creating a single large index from the content
*/

  createPage({
    // path: index === 0 ? "/" : `/page/${index + 1}`,
    path: "/demo-one/hotels",
    component: hotelIndexPage,
    context: {
      hotels,
    },
  })

  /*
Demo Two!
Creating a single large index from the content, manual data-fetch
*/

  createPage({
    // path: index === 0 ? "/" : `/page/${index + 1}`,
    path: "/demo-two/hotels",
    component: hotelIndexPageManual,
    context: {
      hotels,
    },
  })

  /*
Demo Three!
Classic Pagination
*/

  const hotelChunks = chunk(hotels, 4)

  hotelChunks.forEach((chunk, index) => {
    createPage({
      path: index === 0 ? "/demo-three/hotels" : `/demo-three/${index + 1}`,
      component: hotelPagination,
      context: {
        totalPages: hotelChunks.length,
        currentPage: index,
        chunk,
      },
    })
  })

  /*
Demo Four!
Creating a fast loading indx page with minimal data.
*/

  createPage({
    path: "/demo-four/hotels",
    component: hotelLoadMore,
    context: {
      hotels: minHotels,
    },
  })

  hotels.forEach((hotel, index) => {
    const next = index === hotels.length - 1 ? null : hotels[index + 1]
    const previous = index === 0 ? null : hotels[index - 1]

    createPage({
      path: `hotels/${hotel.slug}`,
      component: individualHotel,
      context: {
        hotel,
        previous,
        next,
      },
    })
  })
}
