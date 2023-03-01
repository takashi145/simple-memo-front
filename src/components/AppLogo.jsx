import React from 'react'
import { Link } from 'react-router-dom';
import Logo from './../assets/logo.png';

const AppLogo = () => {
  return (
    <div className="flex items-center">
        <Link to="/" className="self-center text-lg font-semibold whitespace-nowrap">
          <img src={Logo} className="w-24" />
        </Link>
    </div>
  )
}

export default AppLogo
