import React from "react";
import { navLinks } from "../utils/data";
import Link from "next/link";

export default function Navbar() {
  return (
    <header>
      <div>
        <h1>Picks</h1>
      </div>
      <nav>
        {navLinks.map((link, index) => {
          return (
            <ul>
              <Link href={link.path}>
                <li key={index}>{link.name}</li>
              </Link>
            </ul>
          );
        })}
      </nav>
    </header>
  );
}