"use client"
import { NavbarDefault } from "./components/Navbar";
import { CardPrice } from "./components/Card";
import { CardRate } from "./components/Rate";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
export default function Home() {
  const { data: session } = useSession();
  const router = useRouter();
  if (session) {
    return (<>
      <NavbarDefault />
      <div className="grid grid-cols-4 justify-center">
        <CardPrice />
        <CardRate />
      </div>
    </>
    )
  } else {
    return (
      <>
        <NavbarDefault />
        <div className="grid grid-cols-4 justify-center">
          Need Login to see Stock Price
        </div></>
    )
  }
}
