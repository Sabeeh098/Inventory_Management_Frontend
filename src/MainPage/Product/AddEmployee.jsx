import React, { useState } from 'react';
import { adminApiInstance } from '../../api/axios';

const AddEmployee = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [setAsEmployee, setSetAsEmployee] = useState(false);

    const handleSubmit = async () => {
        try {
            const response = await adminApiInstance.post('/admin/addEmployee', {
                email,
                password,
                name,
                role: setAsEmployee ? 'employee' : 'admin',
            });
            console.log("Added Successfully");
            console.log(response.data); 

            setName("");
            setEmail("");
            setPassword("");
            setAsEmployee(false)
        } catch (error) {
            console.error('Error adding employee:', error);
            // Handle the error, e.g., show an error message to the user
        }
    };

    return (
        <>
            <div className="page-wrapper">
                <div className="content">
                    <div className="page-header">
                        <div className="page-title">
                            <h4>Employee Add</h4>
                            <h6>Create new Employee</h6>
                        </div>
                    </div>
                    <div className="card">
                        <div className="card-body">
                            <div className="row">
                                <div className="col-lg-3 col-sm-6 col-12">
                                    <div className="form-group">
                                        <label>Name</label>
                                        <input
                                            type="text"
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                        />
                                    </div>
                                </div>
                                <div className="col-lg-3 col-sm-6 col-12">
                                    <div className="form-group">
                                        <label>Email</label>
                                        <input
                                            type="email"
                                            name="email"
                                            className="form-control"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                        />
                                    </div>
                                </div>
                                <div className="col-lg-3 col-sm-6 col-12">
                                    <div className="form-group">
                                        <label>Password</label>
                                        <input
                                            type="password"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                        />
                                    </div>
                                </div>
                                <div className="col-lg-12">
                                    <div className="form-check">
                                        <input
                                            type="checkbox"
                                            className="form-check-input"
                                            id="setAsEmployee"
                                            checked={setAsEmployee}
                                            onChange={() => setSetAsEmployee(!setAsEmployee)}
                                        />
                                        <label className="form-check-label" htmlFor="setAsEmployee">
                                            Set as Employee
                                        </label>
                                    </div>
                                </div>
                                <div className="col-lg-12">
                                    <button className="btn btn-submit me-2" onClick={handleSubmit}>
                                        Submit
                                    </button>
                                    <button className="btn btn-cancel">
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AddEmployee;
