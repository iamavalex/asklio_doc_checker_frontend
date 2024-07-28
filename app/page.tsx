import Image from "next/image";
import Navbar from "@/app/components/Navbar";
import Criteria from "@/app/components/Criteria";

export default function Home() {
  return (
      <>
          <h1 className="">Welcome to askLio Document validation!</h1>
          <Criteria />
      </>
  );
}
