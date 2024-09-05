import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, Button, Container, Row, Col } from 'react-bootstrap';

const AdminDashboard = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const { data } = await axios.get('/api/admin/orders', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        setOrders(data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrders();
  }, []);

  const updateStatus = async (id, status) => {
    try {
      await axios.put(
        `/api/admin/orders/${id}/status`,
        { status },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order._id === id ? { ...order, status } : order
        )
      );
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  const markAsPaid = async (id) => {
    try {
      await axios.put(`/api/admin/orders/${id}/cod-paid`, {}, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order._id === id ? { ...order, isPaid: true, paidAt: Date.now() } : order
        )
      );
    } catch (error) {
      console.error("Error marking as paid:", error);
    }
  };

  return (
    <Container>
      <Row>
        <Col>
          <h1 className="my-4">Admin Dashboard</h1>
          <Table striped bordered hover responsive className='table-sm'>
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Customer</th>
                <th>Status</th>
                <th>Total</th>
                <th>Payment Method</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders.length > 0 ? (
                orders.map((order) => (
                  <tr key={order._id}>
                    <td>{order._id}</td>
                    <td>{order.user ? order.user.name : 'N/A'}</td>
                    <td>
                      <select
                        value={order.status}
                        onChange={(e) => updateStatus(order._id, e.target.value)}
                        className="form-select"
                      >
                        <option value="Processing">Processing</option>
                        <option value="Shipped">Shipped</option>
                        <option value="Delivered">Delivered</option>
                        <option value="Cancelled">Cancelled</option>
                      </select>
                    </td>
                    <td>${order.totalPrice.toFixed(2)}</td>
                    <td>{order.paymentMethod}</td>
                    <td>
                      {order.paymentMethod === 'COD' && !order.isPaid && (
                        <Button
                          variant="success"
                          onClick={() => markAsPaid(order._id)}
                          className="ml-2"
                        >
                          Mark as Paid
                        </Button>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="text-center">No orders to display</td>
                </tr>
              )}
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  );
};

export default AdminDashboard;
