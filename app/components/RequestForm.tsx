'use client';

import React, { FormEvent, useEffect, useState } from 'react';
import { CommodityGroup } from "@/app/api/commodity-groups/route";
import { NewRequest, OrderLine } from "@/app/api/new-requests/route";
import SuccessFormAlert from "@/app/components/SuccessFormAlert";

interface RequestFormProps {
    extractedData?: any;
}

interface RequestFormState {
    commodity_groups: CommodityGroup[];
    selected_commodity_group: string;
    requestor_name: string;
    title: string;
    vendor_name: string;
    vat_id: string;
    department: string;
    total_cost: number;
    submission_success: boolean;
    order_lines: OrderLine[];
}

export default function RequestForm({ extractedData }: RequestFormProps) {
    const [state, setState] = useState<RequestFormState>({
        commodity_groups: [],
        selected_commodity_group: '',
        requestor_name: '',
        title: '',
        vendor_name: '',
        vat_id: '',
        department: '',
        total_cost: 0,
        submission_success: false,
        order_lines: [{ description: '', unit_price: 0, quantity: 0, unit: '', total_price: 0 }],
    });

    useEffect(() => {
        fetchCommodityGroups();
    }, []); // Empty dependencies array because we only want to fetch commodity groups once on component mount

    useEffect(() => {
        if (extractedData) {
            console.log('Extracted Data:', extractedData);
            setState((prevState) => ({
                ...prevState,
                vendor_name: extractedData.vendorName || '',
                vat_id: extractedData.vatId || '',
                department: extractedData.requestorDepartment || '',
                selected_commodity_group: extractedData.commodity_group_id || '',
                order_lines: extractedData.orderLines && extractedData.orderLines.length > 0
                    ? extractedData.orderLines.map((line: any) => ({
                        description: line.description || '',
                        unit_price: parseFloat((line.unit_price || '0').replace(/[€,]/g, '')) || 0,
                        quantity: parseFloat(line.quantity || '0') || 0,
                        unit: '',
                        total_price: (parseFloat((line.unit_price || '0').replace(/[€,]/g, '')) || 0) * (parseFloat(line.quantity || '0') || 0),
                    }))
                    : [{ description: '', unit_price: 0, quantity: 0, unit: '', total_price: 0 }],
            }));
        }
    }, [extractedData]); // Include extractedData as a dependency so the effect runs whenever it changes

    const fetchCommodityGroups = async () => {
        try {
            const response = await fetch('/api/commodity-groups');
            if (!response.ok) {
                throw new Error('Failed to fetch commodity groups');
            }
            const data: CommodityGroup[] = await response.json();
            setState((prevState) => ({ ...prevState, commodity_groups: data }));
        } catch (error) {
            console.error('Error fetching commodity groups:', error);
            // Add error handling, e.g., show an error message to the user
        }
    };

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = event.target;
        setState((prevState) => ({ ...prevState, [name]: value }));
    };

    const handleOrderLineChange = (index: number, field: keyof OrderLine, value: string | number) => {
        const updatedOrderLines = [...state.order_lines];
        updatedOrderLines[index] = { ...updatedOrderLines[index], [field]: value };

        if (field === 'unit_price' || field === 'quantity') {
            const unit_price = updatedOrderLines[index].unit_price || 0;
            const quantity = updatedOrderLines[index].quantity || 0;
            updatedOrderLines[index].total_price = unit_price * quantity;
        }

        setState((prevState) => ({ ...prevState, order_lines: updatedOrderLines }));
        calculateTotalCost(updatedOrderLines);
    };

    const calculateTotalCost = (lines: OrderLine[]) => {
        const total_cost = lines.reduce((sum, line) => sum + (line.unit_price * line.quantity), 0);
        setState((prevState) => ({ ...prevState, total_cost }));
    };

    const addOrderLine = () => {
        setState((prevState) => ({
            ...prevState,
            order_lines: [...prevState.order_lines, { description: '', unit_price: 0, quantity: 0, unit: '', total_price: 0 }],
        }));
    };

    const removeOrderLine = (index: number) => {
        const updatedOrderLines = state.order_lines.filter((_, i) => i !== index);
        setState((prevState) => ({ ...prevState, order_lines: updatedOrderLines }));
        calculateTotalCost(updatedOrderLines);
    };

    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault();
        const requestData: NewRequest = {
            requestor_name: state.requestor_name,
            title: state.title,
            vendor_name: state.vendor_name,
            vat_id: state.vat_id,
            commodity_group: state.selected_commodity_group,
            department: state.department,
            order_lines: state.order_lines,
            total_cost: state.total_cost,
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
            setState((prevState) => ({ ...prevState, submission_success: true }));
            setTimeout(() => {
                setState((prevState) => ({ ...prevState, submission_success: false }));
            }, 3000);
        } catch (error) {
            console.error('Error submitting request:', error);
            // Add error handling, e.g., show an error message to the user
        }
    };

    return (
        <div className="bg-base-200 p-2">
            {state.submission_success && <SuccessFormAlert />}
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
                                name="requestor_name"
                                value={state.requestor_name}
                                onChange={handleInputChange}
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
                                name="title"
                                value={state.title}
                                onChange={handleInputChange}
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
                                name="vendor_name"
                                value={state.vendor_name}
                                onChange={handleInputChange}
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
                                name="vat_id"
                                value={state.vat_id}
                                onChange={handleInputChange}
                                required
                            />
                        </div>

                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text">Commodity Group</span>
                            </label>
                            <select
                                name="selected_commodity_group"
                                value={state.selected_commodity_group}
                                onChange={handleInputChange}
                                className="select select-bordered select-primary w-full"
                                required
                            >
                                <option value="">Select a Commodity Group</option>
                                {state.commodity_groups.map((group) => (
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
                                name="department"
                                value={state.department}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                    </div>

                    <div className="divider">Order Lines</div>
                    {state.order_lines.map((line, index) => (
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
                                    disabled={state.order_lines.length === 1}
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
                            value={state.total_cost}
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
