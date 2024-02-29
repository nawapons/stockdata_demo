import Image from "next/image";
import { NavbarDefault } from "./components/Navbar";
import { CardPrice } from "./components/Card";
import { CardRate } from "./components/Rate";
export default function Home() {
  return (
    <>
      <NavbarDefault />
      <div className="grid grid-cols-4 justify-center">
        <CardPrice />
        <CardRate />
      </div>
    </>
  );
}
