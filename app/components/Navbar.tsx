import Link from "next/link";
import Switcher from "@/app/components/Switcher";

export default function Navbar(){
    return (
        <div className="navbar bg-primary text-white">
            <div className="flex-1">
                <Link href="/" className="btn btn-ghost text-xl">askLio</Link>
            </div>
            <div className="flex-none">
                <Switcher/>
            </div>
        </div>

    );
}
