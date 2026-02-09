import "./Invoice.css";
import { useDispatch, useSelector } from 'react-redux';
import { fetchOrderByIdAsync, selectSelectedOrder } from '../order/orderSlice';
import { useParams } from 'react-router-dom';
import React, { useEffect } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";




const Invoice = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const order = useSelector(selectSelectedOrder);
  const printRef = React.useRef(null)


  useEffect(() => {
    // if (params.id) {
    dispatch(fetchOrderByIdAsync(params.id));
    // }
  }, [dispatch, params.id]);

  if (!order) {
    return <p>Loading...</p>;
  }

  console.log("orderdeta", order);

  const handlePdf = async () => {
    const priny = printRef.current
    if (!priny) {
      return
    }
    const canvas = await html2canvas(priny, { scale: 2 })
    const data = canvas.toDataURL("/img/png")

    const doc = new jsPDF({
      orientation: "portrait",
      unit: "px",
      format: "a4"
    });


    const imgProperties = doc.getImageProperties(data);
    const pdfWidth = doc.internal.pageSize.getWidth()

    const pdfHeight = (imgProperties.height * pdfWidth) / imgProperties.width;
    doc.addImage(data, 'PNG', 0, 0, pdfWidth, pdfHeight);
    doc.save(`${order.id}.pdf`)
    console.log(priny)
  }

  return (
    <>
      <div ref={printRef} className="invoice">



        <div className="invoice-header">
          <h1>Tech Solutions Inc.</h1>
          <p>123 Main St, Bengaluru</p>
          <p>info@techsolutions.com</p>
        </div>
        <div className="invoice-details">
          <p>
            <strong>Invoice #{order.id}:</strong>
          </p>
          <p>
            <strong>Date:</strong> 01-Feb-2026
          </p>
        </div>
        <div className="client-details">
          <h3>Bill To:</h3>
          <p>{order.SelectedAddress[0].phone}</p>
          <p>{order.SelectedAddress[0].fullname}</p>
          <p>{order.SelectedAddress[0].state},{order.SelectedAddress[0].city},{order.SelectedAddress[0].streetaddress} {order.SelectedAddress[0].postalcode}</p>
          <p>{order.SelectedAddress[0].email}</p>
        </div>
        <table className="invoice-table">
          <thead>
            <tr>
              <th>Description</th>
              <th>Qty</th>
              <th>Price</th>
              <th>Discount</th>
            </tr>
          </thead>
          <tbody>

            {order.products.map(p => (
              <tr key={p.id}>
                <td>{p.product.title}</td>
                <td>{p.quantity}</td>
                <td>₹ {p.product.price}</td>
                {/* <td>{p.product.discountPercentage} % OFF</td> */}
                <td><p className="text-xs text-blue-500 font-medium">
                  You save ₹{(p.product.price - p.product.discountPercentage).toFixed(2)}
                  ({(((p.product.price - p.product.discountPercentage) / p.product.price) * 100).toFixed(2)}% OFF)
                </p>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="invoice-summary">
          <p>
            <strong>Subtotal:</strong> {order.totalAmount.toFixed(2)}
          </p>
          <p>
            <strong>Tax (18%):</strong> {order.totalAmount * 0.18}
          </p>
          <p>
            <strong>Total:</strong> ₹ {(order.totalAmount + order.totalAmount * 0.18).toFixed(2)}
          </p>
        </div>
        <div className="invoice-footer">
          <p>Thank you for your business!</p>
        </div>


      </div>
      <div className="botm-btn">
        <button onClick={handlePdf}>
          Download Invoice ⬇️
        </button>
      </div>
    </>
  )
}

export default Invoice