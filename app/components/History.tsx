"use client";

import React, { useEffect, useState } from "react";
import { SubmittedRequest } from "@/app/api/submitted-requests/route";

export default function History() {
    const [requests, setRequests] = useState<SubmittedRequest[]>([]);

    useEffect(() => {
        const fetchSubmittedRequests = async () => {
            try {
                const response = await fetch('/api/submitted-requests');
                if (!response.ok) {
                    throw new Error('Failed to fetch submitted requests');
                }
                const data: SubmittedRequest[] = await response.json();
                setRequests(data);
            } catch (error) {
                console.error('Error fetching submitted requests:', error);
            }
        };
        fetchSubmittedRequests();
    }, []);

    return (
        <div className="bg-base-200 p-4">
            <div className="card bg-base-100 shadow-xl w-full">
                <div className="card-body">
                    <h2 className="card-title text-3xl font-bold mb-6">Submitted Request Overview</h2>

                    <div className="overflow-x-auto">
                        <table className="table w-full">
                            <thead>
                            <tr>
                                <th>Title</th>
                                <th>Commodity Group</th>
                                <th>Department</th>
                                <th>Status</th>
                            </tr>
                            </thead>
                            <tbody>
                            {requests.map(request => (
                                <tr key={request.id} className="hover">
                                    <td>{request.title}</td>
                                    <td>{request.commodity_group}</td>
                                    <td>{request.department}</td>
                                    <td>{request.status}</td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}
