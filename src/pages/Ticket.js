import React, { useState } from 'react'
import CommingSoon from '../common/CommingSoon'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { createTicket, getAllTicket, resolveTicket } from '../services/services';
import Toast from "../common/Toast"
import { useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import { getUserRole } from '../helper/token.helper';

const Ticket = () => {

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [showResolve, setResolveTicket] = useState(false);
    const handleResolveClose = () => setResolveTicket(false);
    const handleResolveShow = () => setResolveTicket(true);
    const [allticketData, setallTicketData] = useState([])
    const [ticketData, setTicketData] = useState({
        subject: null,
        message: null
    })
    const [resolveModalData, setResolveModalData] = useState({
        name: null,
        subject: null,
        message: null,
        ticket_id: null,
        responseMessage: null

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
                setTicketData({
                    subject: null,
                    message: null
                })
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

    const handleResolveTicket = () => {
        if (!resolveModalData?.responseMessage) {
            Toast(true, "Please enter response message")
        } else {
            let body = {
                ticketId: resolveModalData?.ticket_id,
                feedback: resolveModalData?.responseMessage
            }
            resolveTicket(body).then((res) => {
                handleResolveClose();
                fetchTicket();
                Toast(false, "Ticket Resolved")

            }).catch((err) => {
                console.log(err);
            })
        }

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
                                        <th>Response</th>
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
                                                    <td>{ticket?.feedback ? ticket?.feedback : "-"}</td>
                                                    <td className={ticket.status === 'Pending' ? 'text-warning cursor-pointer' : 'text-success'}>{ticket.status}</td>
                                                    {getUserRole() === "Admin" && <td><button className='btn btn-secondary btn-sm' disabled={ticket.status === "Resolved"} onClick={() => { setResolveModalData((prev) => ({ ...prev, name: ticket?.User?.username, subject: ticket.subject, message: ticket.message, ticket_id: ticket?.id })); handleResolveShow() }}>Resolve</button></td>}

                                                </tr>
                                            )
                                        })

                                    }
                                </tbody>
                            </Table>
                        </div>
                    </div>

                    {/* resolve ticket modal  */}
                    <Modal
                        show={showResolve}
                        onHide={handleResolveClose}
                        backdrop="static"
                        keyboard={false}
                    >
                        <Modal.Header closeButton>
                            <Modal.Title>{resolveModalData?.name?.toUpperCase()}</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <div className='mt-3'>
                                <label className='text-muted fs-12'>Subject</label> <span className='form-control'> {resolveModalData?.subject}</span>
                            </div>
                            <div className='mt-3'>
                                <label className='text-muted fs-12'>Issue</label>  <span className='form-control'> {resolveModalData?.message}</span>
                            </div>
                            <Form.Group
                                className="my-3"
                                controlId="exampleForm.ControlTextarea1"
                            >
                                <Form.Label className='ms-1'>Response Message</Form.Label>
                                <Form.Control as="textarea" placeholder='message...' onChange={(e) => setResolveModalData((prev) => ({ ...prev, responseMessage: e.target.value }))} rows={3} />
                            </Form.Group>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleResolveClose}>
                                Close
                            </Button>
                            <Button variant="primary" onClick={handleResolveTicket}>Resolve</Button>
                        </Modal.Footer>
                    </Modal>


                </div>
            </div>


        </div>
    )
}

export default Ticket