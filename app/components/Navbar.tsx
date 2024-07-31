import Link from "next/link";

export default function Navbar(){
    return (
        <div className="navbar bg-primary text-white">
            <Link href="/" className="btn btn-ghost text-xl">askLio</Link>
        </div>
    );
}
