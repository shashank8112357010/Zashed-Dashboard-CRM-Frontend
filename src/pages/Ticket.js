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
import { getClientUser } from '../services/services';

const Ticket = () => {

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => {
        setTicketData((prev) => ({...prev ,subject:"Invoice" }))
        setShow(true);
    };
    const [showResolve, setResolveTicket] = useState(false);
    const handleResolveClose = () => setResolveTicket(false);
    const handleResolveShow = () => setResolveTicket(true);
    const [responseAdminToggle, setResponseAdminMessage] = useState(false);
    const [adminTicketId, setAdminTicketId] = useState(null)
    const [allticketData, setallTicketData] = useState([])
    const [clients, setClients] = useState([])
    const [responsemessage, setresponsetoAdmin] = useState(null)
    const [ticketData, setTicketData] = useState({
        subject: 'Invoice',
        message: null,
        userId: null,
        adminMessage: null

    })
    const [resolveModalData, setResolveModalData] = useState({
        name: null,
        subject: null,
        message: null,
        ticket_id: null,
        responseMessage: null

    })
    const handleTicketSubmit = () => {
        if (getUserRole() === "Admin") {
            if (ticketData.adminMessage === null) {
                Toast(true, "Fill message")
            }
            else if (ticketData.userId === null) {
                Toast(true, "Select User");
            }
        } else if (getUserRole() === "Client") {
            if (ticketData.subject === null) {
                Toast(true, "Fill Subject");
            } else if (ticketData.message === null) {
                Toast(true, "Fill message");
            }
        }


        let adminBody = {
            userId: ticketData?.userId,
            adminMessage: ticketData?.adminMessage
        }
        let clientBody = {
            subject: ticketData?.subject,
            message: ticketData?.message
        }
        const role = getUserRole()
        createTicket(role === "Admin" ? adminBody : clientBody).then((res) => {
            fetchTicket();
            Toast(false, "Ticket Created Successfull");
            setTicketData({
                subject: null,
                message: null
            })
            handleClose();
        })
    }
    const fetchTicket = () => {
        getAllTicket().then((res) => {
            console.log(res);
            setallTicketData(res?.data?.results)
        }).catch((err) => {
            console.log(err);
        })
    }

    const handleResolveTicket = (e) => {
        console.log("res", e.target.innerText);
        var body
        if (e.target.innerText === 'Resolve') {
            if (!resolveModalData?.responseMessage) {
                Toast(true, "Please enter response message")
               
            }else {
                body = {
                    ticketId: resolveModalData?.ticket_id,
                    feedback: resolveModalData?.responseMessage
                }
                resolveTicket(body).then((res) => {
                    handleResolveClose();
                    fetchTicket();
                    setAdminTicketId(null);
                    setresponsetoAdmin(null);
                    setResponseAdminMessage(false)
                    setResolveModalData({
                        name: null,
                        subject: null,
                        message: null,
                        ticket_id: null,
                        responseMessage: null
    
                    })
                    Toast(false, "Ticket Resolved")
    
                }).catch((err) => {
                    console.log(err);
                })
            }
        } else if (e.target.innerText === 'Respond') {
            if (!responsemessage) {
                Toast(true, "Please enter response message")
            } else { 
                body = {
                    ticketId: adminTicketId,
                    message: responsemessage
                }

                resolveTicket(body).then((res) => {
                    handleResolveClose();
                    fetchTicket();
                    setAdminTicketId(null);
                    setresponsetoAdmin(null);
                    setResponseAdminMessage(false)
                    setResolveModalData({
                        name: null,
                        subject: null,
                        message: null,
                        ticket_id: null,
                        responseMessage: null
    
                    })
                    Toast(false, "Respond send to admin ")
    
                }).catch((err) => {
                    console.log(err);
                })
            }
          
        }
     

    }
    const fetchClients = () => {
        getClientUser().then((res) => {
            console.log(res, "response");
            const cliientData = res.data?.results?.map((item) => {
                return {
                    name: item?.User.username,
                    user_id: item?.User.id
                }

            })
            setClients(cliientData)
        }).catch((err) => console.log(err));
    }
    const filteruserId = (e) => {
        const user = clients.filter((item) => item.name === e.target.value);
        setTicketData((prev) => ({ ...prev, userId: user[0]?.user_id }))
    }
    useEffect(() => {
        fetchTicket();
        fetchClients();
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
                    <Modal show={show} onHide={handleClose} backdrop="static">
                        <Modal.Header closeButton>
                            <Modal.Title>Ticket</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Form>
                                <Form.Group
                                    className="mb-3"
                                    controlId="exampleForm.ControlTextarea1"
                                >
                                    {
                                        getUserRole() === "Admin" &&
                                        <select className="form-select" onClick={(e) => filteruserId(e)} aria-label="Default select example">
                                            <option selected  >Select User</option>
                                            {
                                                clients?.map((item) => {
                                                    return (
                                                        <option id={item.id} value={item.name}>{item.name}</option>
                                                    )
                                                })
                                            }

                                        </select>
                                    }

                                </Form.Group>
                                {
                                    getUserRole() === "Client" &&
                                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                        <Form.Label>Subject</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder="subject..."
                                            autoFocus
                                            defaultValue='Invoice'
                                            onChange={(e) => setTicketData((prev) => ({ ...prev, subject: e.target.value }))}
                                        />
                                    </Form.Group>

                                }

                                <Form.Group
                                    className="mb-3"
                                    controlId="exampleForm.ControlTextarea1"
                                >
                                    <Form.Label>Message</Form.Label>
                                    {
                                        getUserRole() === "Admin" ?
                                            <Form.Control as="textarea" placeholder='message...' onChange={(e) => setTicketData((prev) => ({ ...prev, adminMessage: e.target.value }))} rows={3} />
                                            :
                                            <Form.Control as="textarea" placeholder='message...' onChange={(e) => setTicketData((prev) => ({ ...prev, message: e.target.value }))} rows={3} />

                                    }

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
                                        
                                        <th>Sellor Response</th>
                                        <th>Response</th>
                                        <th>Status</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        allticketData && allticketData.map((ticket, index) => {
                                            return (
                                                <tr>
                                                    <td>{index}</td>
                                                    {getUserRole() === "Admin" && <td>{ticket?.User?.username}</td>}
                                                    <td>{ticket.subject || 'Admin'}</td>
                                                    <td>{ticket.message || ticket?.admin_message}</td>
                                                    <td>{new Date(ticket.createdAt).toDateString()}</td>
                                                    <td>{ticket?.admin_message ? ticket?.admin_message : "-"}</td>
                                                    <td>{ticket?.feedback ? ticket?.feedback : "-"}</td>

                                                    <td className={ticket.status === 'Pending' ? 'text-warning cursor-pointer' : 'text-success'}>{ticket.status}</td>
                                                    {getUserRole() === "Admin" && <td><button className='btn btn-secondary btn-sm' disabled={ticket.status === "Resolved"} onClick={() => { setResolveModalData((prev) => ({ ...prev, name: ticket?.User?.username, subject: ticket?.subject, message: ticket?.message ||ticket?.admin_message, ticket_id: ticket?.id })); handleResolveShow() }}>Resolve</button></td>}
                                                    {getUserRole() === "Client" && ticket?.admin_message != null ? <td><button className='btn btn-primary btn-md' disabled={ticket.message != null} onClick={(e) => { setResponseAdminMessage(true); setAdminTicketId(ticket?.id) }}>{ticket.message != null ? "Replied" : "Reply"}</button></td> : <td> - </td>}
                                                </tr>
                                            )
                                        })

                                    }
                                </tbody>
                            </Table>
                        </div>
                    </div>

                    {/* resolve ticket modal admin  */}
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
                                <label className='text-muted fs-12'>Subject</label> <span className='form-control'> {resolveModalData?.subject || "Admin"}</span>
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

                    {/* response to admin by client  */}
                    <Modal
                        show={responseAdminToggle}
                        onHide={() => setResponseAdminMessage(false)}
                        backdrop="static"
                        keyboard={false}
                    >
                        <Modal.Header closeButton>
                            <Modal.Title>{"Admin response"}</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>

                            <Form.Group
                                className="my-3"
                                controlId="exampleForm.ControlTextarea1"
                            >
                                <Form.Label className='ms-1'>Response Message</Form.Label>
                                <Form.Control as="textarea" placeholder='message...' onChange={(e) => setresponsetoAdmin(e.target.value)} rows={3} />
                            </Form.Group>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={() => setResponseAdminMessage(false)}>
                                Close
                            </Button>
                            <Button variant="primary" onClick={handleResolveTicket}>Respond</Button>
                        </Modal.Footer>
                    </Modal>




                </div>
            </div>


        </div>
    )
}

export default Ticket