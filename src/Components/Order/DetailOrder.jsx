import React, { Component } from 'react'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from "@material-ui/core/Button";
import "./Style.css";
import axios from 'axios';
import firebase from 'firebase';
import Swal from 'sweetalert2'

export default class DetailOrder extends Component {
    constructor(props) {
        super(props);
        this.state = { item: {} };

        this.getDetailOrder();
    }
    mail = {
        subject: '',
        name: '',
        email: '',
        massage: ''
    }
    id = this.props.match.params.id;
    getDetailOrder = () => {
        axios({
            url: 'https://shoponline-5fa44.firebaseio.com/ShoppingCart/' + this.id + '.json',
            method: 'GET'
        }).then(result => {

            this.setState({
                item: result.data
            })
        }).catch(error => {
            console.log(error.data);

        })
    }
    updateStatusCart(id) {
        firebase.database().ref('ShoppingCart/' + id + '/status').set(false).then(() => {

            Swal.fire({
                type: 'success',
                title: 'Check Bill Successfull',
                showConfirmButton: false,
                timer: 1500
            })
        }).catch((error) => {
            var errorMessage = error.message;
            Swal.fire({
                type: 'error',
                title: 'Oops...',
                text: errorMessage,
            })
        });
    }

    componentWillUpdate() {
        this.getDetailOrder();
    }
    
    render() {
        var nodemailer = require('nodemailer');
        var transporter = nodemailer.createTransport({
            service: 'gmail',
            type: 'SMTP', 
            host: 'smtp.gmail.com',
            auth: {
                user: 'loctran0397@gmail.com',
                pass: 'lokmad1615232'
            }
        });

        var mailOptions = {
            from: 'loctran0397g@mail.com',
            to: 'loccoc193@gmail.com',
            subject: 'Sending Email using Node.js',
            text: 'That was easy!'
        };

      
        if (!this.state.item || !this.state.item.listProduct) {
            return <p style={{ margin: "20px" }}> </p>;
        }
        return (
            <div className="m-2 ">
                <p style={{ fontSize: "32px", color: "#504F5A" }}>Detail</p>
                {/* div left  */}
                <div className="d-flex">
                    <div className="col-md-8">
                        <div className=" d-flex justify-content-between">
                            <p style={{ fontSize: 23 }}>Order #447{this.state.item.id} <br /> <span style={{ fontSize: 15, color: "gray" }}>Placed on {this.state.item.time}</span></p>
                            <p style={{ fontSize: 15, color: "gray", paddingTop: 10 }}>FULFILLED</p>
                        </div>

                        <Paper>
                            <Table className="mb-5">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Item</TableCell>
                                        <TableCell align="right">Price</TableCell>
                                        <TableCell align="right">Quantity</TableCell>
                                        <TableCell align="right">Total</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {this.state.item.listProduct.map((item, index) => {
                                        return <TableRow key={index}>
                                            <TableCell style={{ color: "#2EA5D4" }}>{item.name}</TableCell>
                                            <TableCell align="right">$ {item.price}.00</TableCell>
                                            <TableCell align="right">{item.quantity}</TableCell>
                                            <TableCell align="right">$ {item.price * item.quantity}.00</TableCell>
                                        </TableRow>
                                    })}
                                    <TableRow>
                                        <TableCell className="row-border" rowSpan={4} />
                                        <TableCell className="row-border" colSpan={2} >Subtotal</TableCell>
                                        <TableCell className="row-border"  >${this.state.item.totalPrice}.00</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell className="row-border" colSpan={2} >Shipping</TableCell>
                                        <TableCell className="row-border"  >$ 0.00</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell className="row-border" colSpan={2} >Taxes</TableCell>
                                        <TableCell className="row-border"   >$ 0.00</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell className="row-border" style={{ fontSize: 17, color: "#2EA5D4" }} colSpan={2}>Grand total</TableCell>
                                        <TableCell className="row-border" style={{ fontSize: 15, color: "#2EA5D4" }} >$ {this.state.item.totalPrice}.00</TableCell>
                                    </TableRow >

                                </TableBody>
                            </Table>
                            <button className=" w-100 btn btn-dark" onClick={() => this.props.history.replace('/admin')}>Back Admin Page</button>
                        </Paper>
                    </div> {/* end div left  */}
                    {/* div right  */}
                    <div className="col-md-4">
                        <p style={{ fontSize: 23 }}>Customer <br /> <span style={{ fontSize: 15, color: "gray" }}>{this.state.item.name}</span></p>
                        <Paper>
                            <Table className="mb-5">
                                <TableBody>
                                    <TableRow>
                                        <TableCell>Email</TableCell>
                                        <TableCell align="right">{this.state.item.customer}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>Shipping address</TableCell>
                                        <TableCell align="right">{this.state.item.address}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>Number Phone</TableCell>
                                        <TableCell align="right">{this.state.item.phone}</TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </Paper>
                        <Button
                            variant="outlined"
                            color="primary"
                            disabled={!this.state.item.status}
                            onClick={() => {
                                this.updateStatusCart(this.state.item.id);
                            }}
                        >
                            Checked Bill
                        </Button>
                        <Button
                            style={{ marginLeft: "30px" }}
                            variant="outlined"
                            color="secondary"
                            onClick={ () => transporter.sendMail(mailOptions, (info, error )=> {
                                console.log("aa");
                                if (error) {
                                    console.log(error);
                                } else {
                                    console.log('Email sent: ' + info.response);
                                }
                            })}
                        >
                            Send Email Notification
                        </Button>

                    </div>
                    {/* end div right */}
                </div>

            </div>
        )
    }
}
