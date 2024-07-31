import React from 'react';
import Link from 'next/link';

export default function Menu() {

    return (
        <ul className="menu bg-base-200 lg:menu-horizontal rounded-box">
            <li >
                <Link href="/dashboard">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="size-5">
                        <path d="M10.75 4.75a.75.75 0 0 0-1.5 0v4.5h-4.5a.75.75 0 0 0 0 1.5h4.5v4.5a.75.75 0 0 0 1.5 0v-4.5h4.5a.75.75 0 0 0 0-1.5h-4.5v-4.5Z"/>
                    </svg>
                    New
                </Link>
            </li>
            <li >
                <Link href="/dashboard/history">
                    History
                    <span className="badge badge-xs badge-info text-white">99+</span>
                </Link>
            </li>
        </ul>
    );
}
