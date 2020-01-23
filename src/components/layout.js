import React from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faSlack,
  faGithub,
  faTwitter,
  faLinkedin,
} from "@fortawesome/free-brands-svg-icons"

import Header from "./header"
import "./layout.css"

const Layout = ({ children, backgroundImage, inverted }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  return (
    <div
      className={`bg-gray-200 min-h-screen h-full overflow-hidden flex flex-col w-screen overflow-hidden max-w-full ${
        inverted ? "text-gray-100" : "text-gray-900"
      }`}
    >
      <Header siteTitle={data.site.siteMetadata.title} />
      <div className="container relative z-10">
        <main>{children}</main>
      </div>
      <footer className="w-full mt-auto border-t border-gray-300 bg-black h-24 text-gray-200 relative z-10">
        <div className="container flex items-center h-full">
          <p className="font-sans text-md">
            © {new Date().getFullYear()}, Built with
            {` `}
            <a href="https://www.graphcms.com">GraphCMS + Gatsby</a>, content
            from Cónde Nast
          </p>
          <div className="flex ml-auto text-2xl">
            <a href="https://slack.graphcms.com/" className="mr-4">
              <FontAwesomeIcon icon={faSlack} />
            </a>
            <a href="https://github.com/GraphCMS/" className="mr-4">
              <FontAwesomeIcon icon={faGithub} />
            </a>
            <a href="https://twitter.com/GraphCMS" className="mr-4">
              <FontAwesomeIcon icon={faTwitter} />
            </a>
            <a
              href="https://www.linkedin.com/company/graphcms/"
              className="mr-4"
            >
              <FontAwesomeIcon icon={faLinkedin} />
            </a>
          </div>
        </div>
      </footer>
      {backgroundImage && (
        <div
          className="fixed top-0 left-0 right-0 bottom-0 z-0"
          style={{
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.15) 0%, rgba(0, 0, 0, 0.15) 75%, rgba(0, 0, 0,1) 90%), url(${backgroundImage})`,
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
          }}
        />
      )}
    </div>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
