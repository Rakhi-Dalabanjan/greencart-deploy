// import React, { useEffect, useState } from 'react';
// import { useAppContext } from '../../context/AppContext';
// import toast from 'react-hot-toast';

// const DeliveryDashboard = () => {
//   const { navigate, axios, deliveryUser } = useAppContext();
//   const [orders, setOrders] = useState([]);

//   const fetchDeliveries = async () => {
//     try {
//       const { data } = await axios.get(`/api/delivery/orders/${deliveryUser._id}`);
//       if (data.success) {
//         setOrders(data.orders);
//       } else {
//         toast.error(data.message);
//       }
//     } catch (error) {
//       toast.error(error.message);
//     }
//   };

//   const markAsDelivered = async (orderId) => {
//     try {
//       const { data } = await axios.post(`/api/delivery/mark-delivered`, { orderId });
//       if (data.success) {
//         toast.success("Marked as delivered");
//         fetchDeliveries();
//       } else {
//         toast.error(data.message);
//       }
//     } catch (error) {
//       toast.error(error.message);
//     }
//   };

//   useEffect(() => {
//     if (!deliveryUser) {
//       navigate('/delivery-login');
//     } else {
//       fetchDeliveries();
//     }
//   }, [deliveryUser]);

//   return (
//     <div className='p-4'>
//       <h2 className='text-xl font-bold mb-4'>Assigned Deliveries</h2>
//       <ul className='space-y-4'>
//         {orders.length === 0 && <p>No orders to deliver.</p>}
//         {orders.map(order => (
//           <li key={order._id} className='border p-4 rounded shadow'>
//             <div className='flex justify-between items-center mb-2'>
//               <div>
//                 <p className='font-semibold'>Order ID: {order._id}</p>
//                 <p className='text-sm text-gray-500'>Items: {order.items.length}</p>
//               </div>
//               <div>
//                 <p className='font-semibold'>Payment: {order.paymentType}</p>
//                 <p className='text-sm text-gray-500'>Paid: {order.isPaid ? 'Yes' : 'No'}</p>
//               </div>
//             </div>

//             {/* Address Details */}
//             <div className='bg-gray-50 p-3 rounded-lg mb-3'>
//               <p className='font-semibold'>Delivery Address</p>
//               <p>{order.addrDetails.firstName} {order.addrDetails.lastName}</p>
//               <p>{order.addrDetails.street}, {order.addrDetails.city}</p>
//               <p>{order.addrDetails.state} - {order.addrDetails.zipcode}</p>
//               <p>{order.addrDetails.country}</p>
//               <p className='text-sm text-gray-600'>Phone: {order.addrDetails.phone}</p>
//               <p className='text-sm text-gray-600'>Email: {order.addrDetails.email}</p>
//             </div>

//             <button
//               onClick={() => markAsDelivered(order._id)}
//               className='bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600'
//             >
//               Mark Delivered
//             </button>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default DeliveryDashboard;



import React, { useEffect, useState } from 'react';
import { useAppContext } from '../../context/AppContext';
import toast from 'react-hot-toast';

const DeliveryDashboard = () => {
  const { navigate, axios, deliveryUser } = useAppContext();
  const [orders, setOrders] = useState([]);
  const [refresh, setRefresh] = useState(false); // NEW: State toggle to re-trigger useEffect

  const fetchDeliveries = async () => {
    try {
      const { data } = await axios.get(`/api/delivery/orders/${deliveryUser._id}`);
      if (data.success) {
        setOrders(data.orders);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const markAsDelivered = async (orderId) => {
    try {
      const { data } = await axios.post(`/api/delivery/mark-delivered`, { orderId });
      if (data.success) {
        toast.success("Marked as delivered");
        setRefresh(prev => !prev); // Trigger a refresh after delivery status update
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (!deliveryUser) {
      navigate('/delivery-login');
    } else {
      fetchDeliveries();
    }
  }, [deliveryUser, refresh]); // NEW: add `refresh` dependency

  return (
    <div className='p-4'>
      <h2 className='text-xl font-bold mb-4'>Assigned Deliveries</h2>
      <ul className='space-y-4'>
        {orders.length === 0 && <p>No orders to deliver.</p>}
        {orders.map(order => (
          <li key={order._id} className='border p-4 rounded shadow'>
            <div className='flex justify-between items-center mb-2'>
              <div>
                <p className='font-semibold'>Order ID: {order._id}</p>
                <p className='text-sm text-gray-500'>Items: {order.items.length}</p>
              </div>
              <div>
                <p className='font-semibold'>Payment: {order.paymentType}</p>
                <p className='text-sm text-gray-500'>Paid: {order.isPaid ? 'Yes' : 'No'}</p>
              </div>
            </div>

            {/* Address Details */}
            <div className='bg-gray-50 p-3 rounded-lg mb-3'>
              <p className='font-semibold'>Delivery Address</p>
              <p>{order.addrDetails.firstName} {order.addrDetails.lastName}</p>
              <p>{order.addrDetails.street}, {order.addrDetails.city}</p>
              <p>{order.addrDetails.state} - {order.addrDetails.zipcode}</p>
              <p>{order.addrDetails.country}</p>
              <p className='text-sm text-gray-600'>Phone: {order.addrDetails.phone}</p>
              <p className='text-sm text-gray-600'>Email: {order.addrDetails.email}</p>
            </div>

            <button
              onClick={() => markAsDelivered(order._id)}
              className='bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600'
            >
              Mark Delivered
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DeliveryDashboard;
