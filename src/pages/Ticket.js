import React, { useState } from 'react'
import CommingSoon from '../common/CommingSoon'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { createTicket, getAllTicket } from '../services/services';
import Toast from "../common/Toast"
import { useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import { getUserRole } from '../helper/token.helper';

const Ticket = () => {

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [allticketData, setallTicketData] = useState([])
    const [ticketData, setTicketData] = useState({
        subject: null,
        message: null
    })
    const handleTicketSubmit = () => {
        if (ticketData.subject === null) {
            Toast(true, "Fill Subject");
        } else if (ticketData.message === null) {
            Toast(true, "Fill message");
        }
        else if (ticketData.subject && ticketData.message) {
            createTicket(ticketData).then((res) => {
                fetchTicket()
                Toast(false, "Ticket Created Successfull");
                handleClose();
            })
        }
    }
    const fetchTicket = () => {
        getAllTicket().then((res) => {
            console.log(res);
            setallTicketData(res?.data?.results)
        }).catch((err) => {
            console.log(err);
        })
    }
    useEffect(() => {
        fetchTicket();
        return () => {
            console.log("clenup");
            setallTicketData([])
        }
    }, [])
    return (
        <div className="main-content">
            <div className="page-content">
                <div className="container-fluid">
                    {/* <!-- start page title --> */}
                    <div className="row">
                        <div className="col-12">
                            <div className="page-title-box d-sm-flex align-items-center justify-content-between">
                                <h4 className="mb-sm-0 font-size-18">Ticket</h4>
                                <Button variant="primary" onClick={handleShow}>
                                    Raise Ticket
                                </Button>
                            </div>
                        </div>
                    </div>
                    <Modal show={show} onHide={handleClose}>
                        <Modal.Header closeButton>
                            <Modal.Title>Ticket</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Form>
                                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                    <Form.Label>Subject</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="subject..."
                                        autoFocus
                                        onChange={(e) => setTicketData((prev) => ({ ...prev, subject: e.target.value }))}
                                    />
                                </Form.Group>
                                <Form.Group
                                    className="mb-3"
                                    controlId="exampleForm.ControlTextarea1"
                                >
                                    <Form.Label>Message</Form.Label>
                                    <Form.Control as="textarea" placeholder='message...' onChange={(e) => setTicketData((prev) => ({ ...prev, message: e.target.value }))} rows={3} />
                                </Form.Group>
                            </Form>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleClose}>
                                Close
                            </Button>
                            <Button variant="primary" onClick={() => { handleTicketSubmit() }}>
                                Raise
                            </Button>
                        </Modal.Footer>
                    </Modal>
                    <div className='row'>
                        <div className='col-12'>
                            <Table striped bordered hover size="sm">
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        {getUserRole() === "Admin" && <th>Name</th>}

                                        <th>Subject</th>
                                        <th>Message</th>
                                        <th>Created At</th>
                                        <th>Status</th>
                                        {getUserRole() === "Admin" && <th>Action</th>}
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        allticketData && allticketData.map((ticket, index) => {
                                            console.log(ticket);
                                            return (
                                                <tr>
                                                    <td>{index}</td>
                                                    {getUserRole() === "Admin" && <td>{ticket?.User?.username}</td>}

                                                    <td>{ticket.subject}</td>
                                                    <td>{ticket.message}</td>
                                                    <td>{new Date(ticket.createdAt).toDateString()}</td>
                                                    <td className={ticket.status === 'Pending' ? 'text-warning cursor-pointer' : 'text-success'}>{ticket.status}</td>
                                        {getUserRole() === "Admin" && <td><button className='btn btn-secondary btn-sm'>Resolve</button></td>}

                                                </tr>
                                            )
                                        })

                                    }
                                </tbody>
                            </Table>
                        </div>
                    </div>

                </div>
            </div>


        </div>
    )
}

export default Ticket