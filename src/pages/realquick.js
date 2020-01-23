import React from "react"
import { Link } from "gatsby"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faArrowRight } from "@fortawesome/free-solid-svg-icons"
import Layout from "../components/layout"
import SEO from "../components/seo"

import tweet from "../images/tweet.png"

const IndexPage = () => {
  const box =
    "text-gray-200 border border-gray-400 h-32 p-8 flex items-center w-full lg:w-1/2  hover:bg-black transition transition-bg duration-100 ease-out"
  return (
    <Layout
      backgroundImage={"https://media.graphcms.com/Sq40Beh6QubG54rlJuI4"}
      inverted
    >
      <SEO title="Home" />
      <div className="w-full h-full flex">
        <div className="mt-32">
          <h1 className="p-6 bg-black text-white text-5xl font-sans font-bold self-center">
            @motleydev
          </h1>
          <img src={tweet} width="500" />
        </div>
      </div>
    </Layout>
  )
}

export default IndexPage
