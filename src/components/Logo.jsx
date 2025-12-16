import React from "react";
import logoLight from "../assets/logo/polybrand-bartosz-sergot-strony-www-light.png";
import logoDark from "../assets/logo/polybrand-bartosz-sergot-strony-www-dark.png";

function Logo({ theme = "light" }) {
  const handleClick = () => {
    if (window.electronAPI) {
      window.electronAPI.openExternalLink("https://polybrand.eu");
    } else {
      window.open("https://polybrand.eu", "_blank");
    }
  };

  const logoSrc = theme === "dark" ? logoLight : logoDark;

  return (
    <button
      className="company-logo"
      onClick={handleClick}
      aria-label="Odwiedź stronę PolyBrand"
      title="polybrand.eu"
    >
      <img
        src={logoSrc}
        alt="PolyBrand - Bartosz Sergot"
        className="logo-image"
      />
    </button>
  );
}

export default Logo;
