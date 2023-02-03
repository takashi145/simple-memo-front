import React from 'react'
import Logo from './../assets/logo.png';

const AppLogo = () => {
  return (
    <a href="#" className="flex items-center">
        <span className="self-center text-xl font-semibold whitespace-nowrap">
          <img src={Logo} className="w-12 h-12" />
        </span>
    </a>
  )
}

export default AppLogo
