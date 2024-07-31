export default function History(){
    return (
        <div className="bg-base-200 p-4">
            <div className="card bg-base-100 shadow-xl w-full">
                <div className="card-body">
                    <h2 className="card-title text-3xl font-bold mb-6">Incoming Request Overview</h2>

                    <div className="overflow-x-auto">
                        <table className="table w-full">
                            <thead>
                            <tr>
                                <th>Request ID</th>
                                <th>Reviewer</th>
                                <th>Description</th>
                                <th>Commodity Group</th>
                                <th>Total Cost</th>
                                <th>Status</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr className="hover">
                                <td>PR001</td>
                                <td>John Smith</td>
                                <td>Office Supplies Restock</td>
                                <td>Office Supplies</td>
                                <td>$1,500.00</td>
                                <td><span className="badge badge-success">Approved</span></td>
                            </tr>
                            <tr className="hover">
                                <td>PR002</td>
                                <td>Jane Doe</td>
                                <td>Software Licenses Renewal</td>
                                <td>IT Software</td>
                                <td>$5,000.00</td>
                                <td><span className="badge badge-warning">Pending</span></td>
                            </tr>
                            <tr className="hover">
                                <td>PR003</td>
                                <td>Bob Johnson</td>
                                <td>Marketing Campaign Materials</td>
                                <td>Marketing</td>
                                <td>$3,200.00</td>
                                <td><span className="badge badge-error">Rejected</span></td>
                            </tr>
                            <tr className="hover">
                                <td>PR004</td>
                                <td>Alice Brown</td>
                                <td>New Laptops for IT Department</td>
                                <td>IT Hardware</td>
                                <td>$8,000.00</td>
                                <td><span className="badge badge-info">In Review</span></td>
                            </tr>
                            <tr className="hover">
                                <td>PR005</td>
                                <td>Charlie Davis</td>
                                <td>Office Furniture</td>
                                <td>Facilities</td>
                                <td>$2,500.00</td>
                                <td><span className="badge badge-success">Approved</span></td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}
