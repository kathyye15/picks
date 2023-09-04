import React from "react";
import Image from "next/image";

export default function Header() {
  return (
    <header>
      <Image
        src="/svg/picksIcon.svg"
        alt="picks icon"
        width={100}
        height={100}
      />
      <span>Picks</span>
    </header>
  );
}
