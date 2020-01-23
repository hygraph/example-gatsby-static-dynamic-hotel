import React from "react"
import { Link } from "gatsby"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faArrowRight } from "@fortawesome/free-solid-svg-icons"
import Layout from "../components/layout"
import SEO from "../components/seo"

const IndexPage = () => {
  const box =
    "text-gray-200 border border-gray-400 h-32 p-8 flex items-center w-full lg:w-1/2  hover:bg-black transition transition-bg duration-100 ease-out"
  return (
    <Layout
      backgroundImage={"https://media.graphcms.com/Sq40Beh6QubG54rlJuI4"}
      inverted
    >
      <SEO title="Content Demos" />
      <div className="flex flex-wrap h-full items-center">
        <div className="mb-16">
          <h1 className="text-5xl font-bold max-w-3xl leading-tight mb-2">
            Content Demos for the Whole Developer Family
          </h1>
          <p>Welcome to your new Gatsby site.</p>
        </div>
        <div className="flex flex-wrap w-full ">
          <Link to="/demo-one/hotels" className={box}>
            <h2 className="text-current group-hover:text-gray-900 text-3xl font-bold inline mr-4 leading-tight">
              Static + Dynamic
            </h2>
            <p className="text-white inline leading-tight">
              <FontAwesomeIcon icon={faArrowRight} />
            </p>
          </Link>
          <Link to="/demo-two/hotels" className={box}>
            <h2 className="text-current text-3xl font-bold inline mr-4 leading-tight">
              Static + Dynamic (Manual)
            </h2>
            <p className="text-white inline leading-tight">
              <FontAwesomeIcon icon={faArrowRight} />
            </p>
          </Link>
          <Link to="/demo-three/hotels" className={box}>
            <h2 className="text-current text-3xl font-bold inline mr-4 leading-tight">
              Classic Pagination
            </h2>
            <p className="text-white inline leading-tight">
              <FontAwesomeIcon icon={faArrowRight} />
            </p>
          </Link>
          <Link to="/demo-four/hotels" className={box}>
            <h2 className="text-current text-3xl font-bold inline mr-4 leading-tight">
              Static + Dynamic Pagination
            </h2>
            <p className="text-white inline leading-tight">
              <FontAwesomeIcon icon={faArrowRight} />
            </p>
          </Link>
        </div>
      </div>
    </Layout>
  )
}

export default IndexPage
