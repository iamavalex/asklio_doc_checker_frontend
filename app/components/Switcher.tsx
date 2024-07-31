"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Switcher() {
    const pathname = usePathname();

    const isAdminPage = pathname.startsWith("/admin");
    const linkHref = isAdminPage ? "/dashboard" : "/admin";
    const linkText = isAdminPage ? "Use as User" : "Use as Admin";

    return (
        <Link href={linkHref} className="btn btn-ghost text-white">
            {linkText}
        </Link>
    );
}
