import React, { Component } from 'react'
import { connect } from 'react-redux';
import { getDataCartAction } from './../Redux/Actions/Data'

class admin extends Component {
    render() {
        this.props.getCartData();
        return (
            <div className="m-2">
                <p style={{ fontSize: "32px", color: "504F5A" }}>Orders ready for shipment</p>
                <div>
                    <table className="table table-hover">
                        <thead className="thead-light">
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Placed On</th>
                                <th scope="col">Customer</th>
                                <th scope="col">Payment status </th>
                                <th scope="col">Order status </th>
                                <th scope="col">Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.props.cartData.map((item, index) => {
                                
                                return (<tr key={index} style={{ cursor: "pointer" }} onClick={() => {
                                    this.props.history.push('/detailorder/' + item.id)
                                }}>
                                    <th scope="row">#447{item.id}</th>
                                    <td>{item.time}</td>
                                    <td>{item.customer}</td>
                                    {item.status ? <td style={{ color: "#375975" }}>UnCheck</td> : <td style={{ color: "lightgray" }}>Checked</td>}

                                    <td style={{ color: "green" }}>Fullfilled</td>
                                    <td>$ {item.totalPrice}.00</td>
                                </tr>)
                            })}

                        </tbody>
                    </table>
                </div>

            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        cartData: state.rootReducer.cartData
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        getCartData: () => {
            dispatch(getDataCartAction())
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(admin)
