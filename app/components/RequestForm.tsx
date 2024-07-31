import React from 'react';

export default function RequestForm() {
    return (
        <div className="bg-base-200 p-2">
            <form className="card bg-base-100 shadow-xl w-full max-w-4xl">
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
                            />
                        </div>

                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text">Commodity Group</span>
                            </label>
                            <input
                                type="text"
                                placeholder="e.g. Software Licenses"
                                className="input input-bordered input-primary w-full"
                            />
                        </div>

                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text">Department</span>
                            </label>
                            <input
                                type="text"
                                placeholder="e.g. Marketing"
                                className="input input-bordered input-primary w-full"
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
