import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import {
  FaCalendarAlt,
  FaCheckCircle,
  FaClock,
  FaDollarSign,
  FaExclamationTriangle,
  FaShoppingBag,
  FaTruck,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { shopifyGetCustomerOrders } from "../../constants/shopifyAuth";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const accessToken = sessionStorage.getItem("shopifyAccessToken");
    if (!accessToken) {
      navigate("/signin");
      return;
    }
    const fetchOrders = async () => {
      setLoading(true);
      setError("");
      try {
        const res = await shopifyGetCustomerOrders(accessToken);
        const orderEdges = res.data?.customer?.orders?.edges || [];
        console.log(orderEdges);
        setOrders(orderEdges.map((edge) => edge.node));
      } catch (err) {
        setError("Failed to fetch orders.");
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, [navigate]);

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "fulfilled":
        return "bg-green-100 text-green-800 border-green-200";
      case "unfulfilled":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "partial":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "cancelled":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getStatusIcon = (status) => {
    switch (status?.toLowerCase()) {
      case "fulfilled":
        return <FaCheckCircle className="w-4 h-4" />;
      case "unfulfilled":
        return <FaClock className="w-4 h-4" />;
      case "partial":
        return <FaTruck className="w-4 h-4" />;
      case "cancelled":
        return <FaExclamationTriangle className="w-4 h-4" />;
      default:
        return <FaClock className="w-4 h-4" />;
    }
  };

  if (loading)
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Loading your orders...</p>
        </div>
      </div>
    );

  if (error)
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <p className="text-red-600 text-lg mb-2">
            Oops! Something went wrong
          </p>
          <p className="text-gray-600">{error}</p>
        </div>
      </div>
    );

  if (!orders.length)
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-gray-400 text-6xl mb-4">📦</div>
          <h2 className="text-2xl font-bold text-gray-700 mb-2">
            No Orders Yet
          </h2>
          <p className="text-gray-600 mb-6">
            Start shopping to see your orders here
          </p>
          <button
            onClick={() => navigate("/shop")}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Start Shopping
          </button>
        </div>
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">My Orders</h1>
          <p className="text-gray-600">Track your order history and status</p>
        </div>

        {/* Orders Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {orders.map((order, index) => (
            <motion.div
              key={order.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow"
            >
              {/* Order Header */}
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 px-6 py-4 border-b border-gray-100">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <FaShoppingBag className="text-blue-600 w-5 h-5" />
                    <span className="font-semibold text-gray-900">
                      {order.name}
                    </span>
                  </div>
                  <div
                    className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(
                      order.fulfillmentStatus
                    )} flex items-center gap-1`}
                  >
                    {getStatusIcon(order.fulfillmentStatus)}
                    {order.fulfillmentStatus || "Pending"}
                  </div>
                </div>
                <div className="text-sm text-gray-600">
                  Track ID:{" "}
                  <span className="font-mono font-medium">
                    {order.id.slice(20, 33)}
                  </span>
                </div>
              </div>

              {/* Order Details */}
              <div className="p-6 space-y-4">
                {/* Date and Total */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center gap-2 text-sm">
                    <FaCalendarAlt className="text-gray-400 w-4 h-4" />
                    <div>
                      <p className="text-gray-500">Order Date</p>
                      <p className="font-medium text-gray-900">
                        {new Date(order.processedAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <FaDollarSign className="text-gray-400 w-4 h-4" />
                    <div>
                      <p className="text-gray-500">Total</p>
                      <p className="font-bold text-gray-900">
                        ₹{order.totalPriceV2.amount}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Items */}
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">
                    Items ({order.lineItems.edges.length})
                  </h4>
                  <div className="space-y-2">
                    {order.lineItems.edges.map(({ node }, idx) => (
                      <div
                        key={idx}
                        className="flex items-center gap-3 p-2 bg-gray-50 rounded-lg"
                      >
                        {node.variant?.image?.src && (
                          <img
                            src={node.variant.image.src}
                            alt=""
                            className="w-10 h-10 object-cover rounded-md border border-gray-200"
                          />
                        )}
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900 truncate">
                            {node.title}
                          </p>
                          <p className="text-xs text-gray-500">
                            Qty: {node.quantity} • ₹
                            {node.variant?.priceV2?.amount}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Action Button */}
                {/* <button className="w-full mt-4 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 text-sm font-medium">
                  <FaEye className="w-4 h-4" />
                  View Details
                </button> */}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Summary */}
        <div className="mt-8 bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Order Summary
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div>
              <p className="text-2xl font-bold text-blue-600">
                {orders.length}
              </p>
              <p className="text-sm text-gray-600">Total Orders</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-green-600">
                {
                  orders.filter((o) => o.fulfillmentStatus === "FULFILLED")
                    .length
                }
              </p>
              <p className="text-sm text-gray-600">Fulfilled</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-yellow-600">
                {
                  orders.filter((o) => o.fulfillmentStatus === "UNFULFILLED")
                    .length
                }
              </p>
              <p className="text-sm text-gray-600">Pending</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-600">
                {orders
                  .reduce(
                    (sum, order) => sum + parseFloat(order.totalPriceV2.amount),
                    0
                  )
                  .toFixed(2)}
              </p>
              <p className="text-sm text-gray-600">Total Spent</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Orders;
