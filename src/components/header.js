import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faArchway } from "@fortawesome/free-solid-svg-icons"

const Header = ({ siteTitle }) => (
  <header className="py-4 w-full border-b border-gray-300 mb-6 relative z-10">
    <div className="flex container items-center">
      <h1 className="text-current">
        <Link to="/">
          <span className="font-bold text-2xl">
            <FontAwesomeIcon icon={faArchway} /> Gotell
          </span>
        </Link>
      </h1>
      <a
        to="https://app.graphcms.com/signup"
        className="ml-auto px-4 py-2 bg-yellow-600 rounded-sm font-bold"
      >
        Free GraphCMS Account!
      </a>
    </div>
  </header>
)

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
