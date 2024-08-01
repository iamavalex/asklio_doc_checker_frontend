'use client';

import React, { FormEvent, useEffect, useState } from 'react';
import { CommodityGroup } from "@/app/api/commodity-groups/route";
import { NewRequest, OrderLine } from "@/app/api/new-requests/route";
import SuccessFormAlert from "@/app/components/SuccessFormAlert";

interface RequestFormProps {
    extractedData?: any;
}

export default function RequestForm({ extractedData }: RequestFormProps) {
    const [commodityGroups, setCommodityGroups] = useState<CommodityGroup[]>([]);
    const [selectedCommodityGroup, setSelectedCommodityGroup] = useState<string>('');

    const [requestorName, setRequestorName] = useState<string>('');
    const [title, setTitle] = useState<string>('');
    const [vendorName, setVendorName] = useState<string>('');
    const [vatId, setVatId] = useState<string>('');
    const [department, setDepartment] = useState<string>('');
    const [totalCost, setTotalCost] = useState<number>(0);

    const [submissionSuccess, setSubmissionSuccess] = useState<boolean>(false);

    const [orderLines, setOrderLines] = useState<OrderLine[]>([
        { description: '', unit_price: 0, quantity: 0, unit: '', total_price: 0 }
    ]);

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

    useEffect(() => {
        if (extractedData) {
            console.log('Extracted Data:', extractedData);
            setVendorName(extractedData.vendorName || '');
            setVatId(extractedData.vatId || '');
            setDepartment(extractedData.requestorDepartment || '');

            if (extractedData.orderLines && extractedData.orderLines.length > 0) {
                const newOrderLines = extractedData.orderLines.map((line: any) => {
                    const unit_price = parseFloat((line.unit_price || '0').replace(/[€,]/g, '')) || 0;
                    const quantity = parseFloat(line.quantity || '0') || 0;
                    const total_price = unit_price * quantity;
                    return {
                        description: line.description || '',
                        unit_price: unit_price,
                        quantity: quantity,
                        unit: '',
                        total_price: total_price,
                    };
                });
                setOrderLines(newOrderLines);
            } else {
                setOrderLines([{ description: '', unit_price: 0, quantity: 0, unit: '', total_price: 0 }]);
            }
        }
    }, [extractedData]);

    const handleOrderLineChange = (index: number, field: keyof OrderLine, value: string | number) => {
        const updatedOrderLines = [...orderLines];
        updatedOrderLines[index] = { ...updatedOrderLines[index], [field]: value };

        if (field === 'unit_price' || field === 'quantity') {
            const unitPrice = updatedOrderLines[index].unit_price || 0;
            const quantity = updatedOrderLines[index].quantity || 0;
            updatedOrderLines[index].total_price = unitPrice * quantity;
        }

        setOrderLines(updatedOrderLines);
        calculateTotalCost(updatedOrderLines);
    };



    const calculateTotalCost = (lines: OrderLine[]) => {
        const totalCost = lines.reduce((sum, line) => sum + (line.unit_price * line.quantity), 0);
        setTotalCost(totalCost);
    };

    const addOrderLine = () => {
        setOrderLines([...orderLines, { description: '', unit_price: 0, quantity: 0, unit: '', total_price: 0 }]);
    };

    const removeOrderLine = (index: number) => {
        const updatedOrderLines = orderLines.filter((_, i) => i !== index);
        setOrderLines(updatedOrderLines);
        calculateTotalCost(updatedOrderLines);
    };

    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault();
        const requestData: NewRequest = {
            requestor_name: requestorName,
            title: title,
            vendor_name: vendorName,
            vat_id: vatId,
            commodity_group: selectedCommodityGroup,
            department: department,
            order_lines: orderLines,
            total_cost: totalCost,
        };

        console.log('Submitting request data:', requestData);

        try {
            const response = await fetch('/api/new-requests', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestData),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(`Failed to submit request: ${JSON.stringify(errorData)}`);
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
            {submissionSuccess && <SuccessFormAlert />}
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
                    {orderLines.map((line, index) => (
                        <div key={index} className="grid grid-cols-1 md:grid-cols-5 gap-2 mb-2">
                            <div className="form-control w-full">
                                <label className="label">
                                    <span className="label-text">Description</span>
                                </label>
                                <input
                                    type="text"
                                    placeholder="Description"
                                    className="input input-bordered input-primary w-full"
                                    value={line.description}
                                    onChange={(e) => handleOrderLineChange(index, 'description', e.target.value)}
                                    required
                                />
                            </div>

                            <div className="form-control w-full">
                                <label className="label">
                                    <span className="label-text">Unit Price</span>
                                </label>
                                <input
                                    type="number"
                                    placeholder="Unit Price"
                                    className="input input-bordered input-primary w-full"
                                    value={line.unit_price}
                                    onChange={(e) => handleOrderLineChange(index, 'unit_price', parseFloat(e.target.value))}
                                    required
                                />
                            </div>

                            <div className="form-control w-full">
                                <label className="label">
                                    <span className="label-text">Quantity</span>
                                </label>
                                <input
                                    type="number"
                                    placeholder="Quantity"
                                    className="input input-bordered input-primary w-full"
                                    value={line.quantity}
                                    onChange={(e) => handleOrderLineChange(index, 'quantity', parseFloat(e.target.value))}
                                    required
                                />
                            </div>

                            <div className="form-control w-full">
                                <label className="label">
                                    <span className="label-text">Unit</span>
                                </label>
                                <input
                                    type="text"
                                    placeholder="Unit"
                                    className="input input-bordered input-primary w-full"
                                    value={line.unit}
                                    onChange={(e) => handleOrderLineChange(index, 'unit', e.target.value)}
                                    required
                                />
                            </div>
                            <div className="form-control w-full">
                                <label className="label">
                                    <span className="label-text">Total Price</span>
                                </label>
                                <input
                                    type="number"
                                    placeholder="Total price"
                                    className="input input-bordered input-primary w-full"
                                    value={line.total_price}
                                    onChange={(e) => handleOrderLineChange(index, 'total_price', parseFloat(e.target.value))}
                                    required
                                />
                            </div>

                            <div className="form-control w-full">
                                <label className="label">
                                    <span className="label-text">&nbsp;</span>
                                </label>
                                <button
                                    type="button"
                                    onClick={() => removeOrderLine(index)}
                                    className="btn btn-error"
                                    disabled={orderLines.length === 1}
                                >
                                    Remove
                                </button>
                            </div>
                        </div>
                    ))}
                    <button type="button" onClick={addOrderLine} className="btn btn-secondary mt-2">
                        Add Order Line
                    </button>

                    <div className="form-control w-full mt-4">
                        <label className="label">
                            <span className="label-text">Total Cost</span>
                        </label>
                        <input
                            type="number"
                            className="input input-bordered input-primary w-full"
                            value={totalCost}
                            readOnly
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
