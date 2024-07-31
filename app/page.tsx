import React from "react";
import Link from "next/link";

const Card = ({ title, description, link, badge }: { title: string; description: string; link:string; badge?: string  }) => (
    <div className="card w-96 bg-base-100 shadow-xl m-4">
        <div className="card-body">
            {badge && <div className="badge badge-accent text-white">{badge}</div>}
            <h2 className="card-title">{title}</h2>
            <p>{description}</p>
            <div className="card-actions justify-end">
                <Link href={link} target="_blank" rel="noopener noreferrer"
                      className="btn btn-primary text-white">Visit</Link>
            </div>
        </div>
    </div>
);


export default function Home() {
    return (
        <div className="w-full max-w-6xl p-4 flex flex-col items-center">
            <h1 className="text-4xl font-bold mb-8">Welcome to askLio Suite</h1>
            <div className="mt-8 w-full flex flex-wrap justify-center">
                <Card
                    title="Easy Procurement"
                    description="Streamline your procurement process with our intuitive tools."
                    link="https://www.asklio.ai/"
                />
                <Card
                    title="Cost Savings"
                    description="Optimize your spending and reduce costs with our advanced analytics."
                    link="/dashboard"
                    badge="New!"
                />
                <Card
                    title="Supplier Management"
                    description="Efficiently manage your suppliers and improve relationships."
                    link="/"
                    badge="New!"

                />
            </div>
        </div>
    );
}
