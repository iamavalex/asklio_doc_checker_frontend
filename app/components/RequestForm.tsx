'use client';

import React, {useState, useEffect, FormEvent} from 'react';
import {CommodityGroup} from "@/app/api/commodity-groups/route";
import {NewRequest} from "@/app/api/new-requests/route";
import SuccessFormAlert from "@/app/components/SuccessFormAlert";

export default function RequestForm() {

    const [commodityGroups, setCommodityGroups] = useState<CommodityGroup[]>([]);
    const [selectedCommodityGroup, setSelectedCommodityGroup] = useState<string>('');

    const [requestorName, setRequestorName] = useState<string>('');
    const [title, setTitle] = useState<string>('');
    const [vendorName, setVendorName] = useState<string>('');
    const [vatId, setVatId] = useState<string>('');
    const [department, setDepartment] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [unitPrice, setUnitPrice] = useState<number>(0);
    const [amount, setAmount] = useState<number>(0);
    const [unit, setUnit] = useState<string>('');
    const [totalCost, setTotalCost] = useState<number>(0);

    const [submissionSuccess, setSubmissionSuccess] = useState<boolean>(false);

    useEffect(() => {
        const fetchCommodityGroups = async () => {
            try {
                const response = await fetch('/api/commodity-groups');
                if (!response.ok) {
                    throw new Error('Failed to fetch commodity groups');
                }
                const data: CommodityGroup[] = await response.json();
                setCommodityGroups(data);
            } catch (error) {
                console.error('Error fetching commodity groups:', error);
            }
        };
        fetchCommodityGroups();
    }, []);

    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault();
        const requestData: NewRequest = {
            requestor_name: requestorName,
            title: title,
            vendor_name: vendorName,
            vat_id: vatId,
            commodity_group: selectedCommodityGroup,
            department: department,
            description: description,
            unit_price: unitPrice,
            amount: amount,
            unit: unit,
            total_cost: totalCost,
        };

        try {
            const response = await fetch('/api/manual-requests', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestData),
            });

            if (!response.ok) {
                throw new Error('Failed to submit request');
            }

            const data = await response.json();
            console.log('Request submitted successfully:', data);
            setSubmissionSuccess(true);
            setTimeout(() => {
                setSubmissionSuccess(false);
            }, 3000);
        } catch (error) {
            console.error('Error submitting request:', error);
        }
    };
    return (
        <div className="bg-base-200 p-2">
            {submissionSuccess && <SuccessFormAlert/>}
            <form className="card bg-base-100 shadow-xl w-full max-w-4xl" onSubmit={handleSubmit}>
                <div className="card-body">
                    <h2 className="card-title text-3xl font-bold mb-6">New Procurement Request</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text">Requestor Name</span>
                            </label>
                            <input
                                type="text"
                                placeholder="e.g. John Smith"
                                className="input input-bordered input-primary w-full"
                                value={requestorName}
                                onChange={(e) => setRequestorName(e.target.value)}
                                required
                            />
                        </div>

                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text">Title</span>
                            </label>
                            <input
                                type="text"
                                placeholder="e.g. Adobe Creative Cloud Subscription"
                                className="input input-bordered input-primary w-full"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                required
                            />
                        </div>

                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text">Vendor Name</span>
                            </label>
                            <input
                                type="text"
                                placeholder="e.g. Adobe Systems"
                                className="input input-bordered input-primary w-full"
                                value={vendorName}
                                onChange={(e) => setVendorName(e.target.value)}
                                required
                            />
                        </div>

                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text">VAT ID</span>
                            </label>
                            <input
                                type="text"
                                placeholder="e.g. DE123456789"
                                className="input input-bordered input-primary w-full"
                                value={vatId}
                                onChange={(e) => setVatId(e.target.value)}
                                required
                            />
                        </div>

                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text">Commodity Group</span>
                            </label>
                            <select
                                value={selectedCommodityGroup}
                                onChange={(e) => setSelectedCommodityGroup(e.target.value)}
                                className="select select-bordered select-primary w-full"
                                required
                            >
                                <option value="">Select a Commodity Group</option>
                                {commodityGroups.map((group) => (
                                    <option key={group.id} value={group.id}>
                                        {group.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text">Department</span>
                            </label>
                            <input
                                type="text"
                                placeholder="e.g. Marketing"
                                className="input input-bordered input-primary w-full"
                                value={department}
                                onChange={(e) => setDepartment(e.target.value)}
                                required
                            />
                        </div>
                    </div>

                    <div className="divider">Order Lines</div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text">Description</span>
                            </label>
                            <input
                                type="text"
                                placeholder="e.g. Adobe Creative Cloud License"
                                className="input input-bordered input-primary w-full"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                required
                            />
                        </div>

                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text">Unit Price</span>
                            </label>
                            <input
                                type="number"
                                placeholder="e.g. 600"
                                className="input input-bordered input-primary w-full"
                                value={unitPrice}
                                onChange={(e) => setUnitPrice(parseFloat(e.target.value))}
                                required
                            />
                        </div>

                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text">Amount</span>
                            </label>
                            <input
                                type="number"
                                placeholder="e.g. 5"
                                className="input input-bordered input-primary w-full"
                                value={amount}
                                onChange={(e) => setAmount(parseInt(e.target.value))}
                                required
                            />
                        </div>

                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text">Unit</span>
                            </label>
                            <input
                                type="text"
                                placeholder="e.g. licenses"
                                className="input input-bordered input-primary w-full"
                                value={unit}
                                onChange={(e) => setUnit(e.target.value)}
                                required
                            />
                        </div>
                    </div>

                    <div className="form-control w-full mt-4">
                        <label className="label">
                            <span className="label-text">Total Cost</span>
                        </label>
                        <input
                            type="number"
                            placeholder="e.g. 3000"
                            className="input input-bordered input-primary w-full"
                            value={totalCost}
                            onChange={(e) => setTotalCost(parseFloat(e.target.value))}
                            required
                        />
                    </div>

                    <div className="card-actions justify-end mt-6">
                        <button
                            type="submit"
                            className="btn btn-primary text-white"
                        >
                            Submit Request
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
}
