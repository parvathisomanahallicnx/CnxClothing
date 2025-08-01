import { AnimatePresence, motion } from "framer-motion";
import React from "react";
import ReactMarkdown from "react-markdown";

const CHAT_HISTORY_KEY = "chatWidgetHistory";

const getInitialMessages = () => [
  { from: "bot", text: "Hi! How can I help you today?" },
];

const ChatWidget = () => {
  const [open, setOpen] = React.useState(false);
  const [messages, setMessages] = React.useState(getInitialMessages);
  const [input, setInput] = React.useState("");
  const [context, setContext] = React.useState(null); // 'orders', 'products', 'support', etc.
  const [selectedOption, setSelectedOption] = React.useState(null);
  const [products, setProducts] = React.useState([]); // For product search results
  const [selectedVariants, setSelectedVariants] = React.useState([]); // For multi-select
  const [ordering, setOrdering] = React.useState(false);
  const [orderedVariantsDetails, setOrderedVariantsDetails] = React.useState(
    []
  ); // Store ordered variants for display
  const [loadingProducts, setLoadingProducts] = React.useState(false);
  const [orderResult, setOrderResult] = React.useState(null); // Store order API response
  const [showProductGrid, setShowProductGrid] = React.useState(false); // NEW: control product grid visibility

  // Option sets
  const contextOptions = [
    { label: "General Queries", value: "support" },
    { label: "Search And Order", value: "products" },
    { label: "Orders Status", value: "orders_status" },
  ];

  React.useEffect(() => {
    // Open chat automatically after login+reload if flag is set
    if (localStorage.getItem("openChatAfterReload") === "true") {
      setOpen(true);
      localStorage.removeItem("openChatAfterReload");
    }
    const handler = () => {
      // Always open chat without login requirement
      setOpen(true);
      // Set dummy email for API calls
      localStorage.setItem("userEmail", "kiran@gmail.com");
    };
    window.addEventListener("openChatWidget", handler);
    return () => window.removeEventListener("openChatWidget", handler);
  }, []);

  const clearChatHistory = () => {
    setMessages(getInitialMessages());
    setContext(null);
    setSelectedOption(null);
  };

  // Handle context option selection
  const handleContextSelect = (option) => {
    setContext(option.value);
    setSelectedOption(option.value);
    setProducts([]);
    setSelectedVariants([]);
    setOrderedVariantsDetails([]);
    setOrderResult(null);
    setShowProductGrid(false);
    
    // Clear all messages and start fresh for the new context
    if (option.value === "products") {
      setMessages([
        { from: "bot", text: "Please enter your search to find products." },
      ]);
    } else if (option.value === "orders_status") {
      setMessages([
        {
          from: "bot",
          text: "Please provide your order ID to check the status.",
        },
      ]);
    } else if (option.value === "support") {
      setMessages([
        {
          from: "bot",
          text: "How can I assist you? Please enter your query below.",
        },
      ]);
    }
  };

  // Handle user sending a message
  const handleSend = async (customInput) => {
    const userInput = customInput !== undefined ? customInput : input;
    if (!userInput.trim()) return;
    // If context is not selected, do nothing (force user to pick context first)
    if (!context) return;
    // --- Product Search Flow ---
    if (context === "products") {
      // Add user message and a bot loading message
      setMessages((msgs) => [
        ...msgs,
        { from: "user", text: userInput },
        { from: "bot", text: "Searching for products...", isLoading: true },
      ]);
      setInput("");
      setLoadingProducts(true);

      let products = [];
      
      try {
        // Call the webhook to get products
        const response = await fetch(
          "https://somanparv.app.n8n.cloud/webhook/get-shopify-products",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
            },
            body: `query=${encodeURIComponent(userInput)}`,
          }
        );
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log("Webhook response:", data);
        
        // Extract products from the webhook response
        if (data && Array.isArray(data) && data.length > 0) {
          const firstItem = data[0];
          if (firstItem.output && firstItem.output.products) {
            products = firstItem.output.products;
          }
        }
        
        // If no products found from webhook, use fallback products
        if (!Array.isArray(products) || products.length === 0) {
          console.log("No products found from webhook, using fallback");
          products = [
            {
              id: 9257124200665,
              title: "Example T-Shirt",
              product_type: "Shirts",
              variants: [
                {
                  id: 46818115715289,
                  title: 'Lithograph - Height: 9" x Width: 12"',
                  price: "25.00",
                },
                { id: 46818115748057, title: "Small", price: "19.99" },
                { id: 46818115780825, title: "Medium", price: "19.99" },
              ],
              images: [
                {
                  id: 45822922850521,
                  src: "https://cdn.shopify.com/s/files/1/0755/5419/3625/files/green-t-shirt.jpg?v=1752674862",
                },
              ],
            },
            {
              id: 9257123905753,
              title: "Black Beanbag",
              product_type: "Indoor",
              variants: [
                { id: 46818113716441, title: "Default Title", price: "69.99" },
              ],
              images: [
                {
                  id: 45822919770329,
                  src: "https://cdn.shopify.com/s/files/1/0755/5419/3625/files/comfortable-living-room-cat_925x_cac032a2-6215-4cac-b02f-01e45f24dbe8.jpg?v=1752674759",
                },
              ],
            },
          ];
        }
      } catch (error) {
        console.error("Error fetching products from webhook:", error);
        // Use fallback products on error
        products = [
          {
            id: 9257124200665,
            title: "Example T-Shirt",
            product_type: "Shirts",
            variants: [
              {
                id: 46818115715289,
                title: "Extra Small",
                price: "25.00",
              },
              { id: 46818115748057, title: "Small", price: "19.99" },
              { id: 46818115780825, title: "Medium", price: "19.99" },
            ],
            images: [
              {
                id: 45822922850521,
                src: "https://cdn.shopify.com/s/files/1/0755/5419/3625/files/green-t-shirt.jpg?v=1752674862",
              },
            ],
          },
          {
            id: 9257123905753,
            title: "Black Beanbag",
            product_type: "Indoor",
            variants: [
              { id: 46818113716441, title: "Plain", price: "69.99" },
            ],
            images: [
              {
                id: 45822919770329,
                src: "https://cdn.shopify.com/s/files/1/0755/5419/3625/files/comfortable-living-room-cat_925x_cac032a2-6215-4cac-b02f-01e45f24dbe8.jpg?v=1752674759",
              },
            ],
          },
        ];
      }

      setLoadingProducts(false);
      setProducts(products);
      setShowProductGrid(true);
      setMessages((msgs) => {
        const newMsgs = [...msgs];
        const lastLoadingIdx = newMsgs
          .map((m) => m.isLoading)
          .lastIndexOf(true);
        if (lastLoadingIdx !== -1) {
          if (products.length > 0 && products[0].id !== 9257124200665) {
            // Real products found from webhook
            newMsgs[lastLoadingIdx] = {
              from: "bot",
              text: "Here are the products matching your search:",
              searchResults: products, // Store products in the message
              searchQuery: userInput, // Store the search query
            };
          } else {
            // Using fallback products
            newMsgs[lastLoadingIdx] = {
              from: "bot",
              text: "Sorry, No products found for your search. Here are some products for you to choose from",
              searchResults: products, // Store fallback products in the message
              searchQuery: userInput, // Store the search query
            };
          }
        }
        return newMsgs;
      });
      return;
    }
    if (context === "orders_status") {
      // Order Status: send order ID as message
      // Show loading message
      setMessages((msgs) => [
        ...msgs,
        { from: "user", text: userInput },
        {
          from: "bot",
          text: "Getting your order status, please wait...",
          isLoading: true,
        },
      ]);
      setInput("");
      try {
        // Call the webhook to get order status
        const response = await fetch(
          "https://somanparv.app.n8n.cloud/webhook/order-status-shopify",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
            },
            body: `query=Track my order ${userInput}`,
          }
        );
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log("Order Status Webhook Response:", data);
        
        // Extract order status from the webhook response
        let orderObj = null;
        let isOrderStatus = false;
        
        if (data && Array.isArray(data) && data.length > 0) {
          const firstItem = data[0];
          if (firstItem.output && firstItem.output.order_status) {
            orderObj = firstItem.output.order_status;
            isOrderStatus = true;
          } else if (firstItem.output && firstItem.output.order) {
            orderObj = firstItem.output.order;
            isOrderStatus = true;
          } else if (firstItem.output && firstItem.output.order_id) {
            // Direct order data in output object
            orderObj = firstItem.output;
            isOrderStatus = true;
          }
        } else if (data && data.order_status) {
          orderObj = data.order_status;
          isOrderStatus = true;
        } else if (data && data.order) {
          orderObj = data.order;
          isOrderStatus = true;
        } else if (data && data.order_id) {
          // Direct order data
          orderObj = data;
          isOrderStatus = true;
        }
        
        // Replace the loading message with the result
        setMessages((msgs) => {
          const newMsgs = [...msgs];
          const lastLoadingIdx = newMsgs
            .map((m) => m.isLoading)
            .lastIndexOf(true);
          if (lastLoadingIdx !== -1) {
            newMsgs.splice(lastLoadingIdx, 1);
          }
          if (isOrderStatus && orderObj) {
            newMsgs.push({ from: "bot", isOrderStatus: true, orderObj });
          } else {
            newMsgs.push({ 
              from: "bot", 
              text: data.message || "Order status not found. Please check your order ID and try again." 
            });
          }
          return newMsgs;
        });
        return;
      } catch (error) {
        console.error("Error fetching order status from webhook:", error);
        setMessages((msgs) => [
          ...msgs.filter((m) => !m.isLoading),
          {
            from: "bot",
            text: "Sorry, there was an error checking order status.",
          },
        ]);
      }
      return;
    }
    if (context === "support") {
      const apiUrl = "https://agent-prod.studio.lyzr.ai/v3/inference/chat/";
      setMessages((msgs) => [
        ...msgs,
        { from: "user", text: userInput },
        { from: "bot", text: "Let me check that for you...", isLoading: true },
      ]);
      setInput("");
      try {
        const response = await fetch(apiUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-api-key": "sk-default-Z356WiepycVLZRfVcTvyUMmkBL0lIC6n",
          },
          body: JSON.stringify({
            user_id: "parvathisomanahalli@gmail.com",
            agent_id: "688b2d834bb02b79e0fc9be7",
            session_id: "688b2d834bb02b79e0fc9be7-1of90dp2fyq",
            message: userInput,
          }),
        });
        const data = await response.json();
        let botMessage =
          data.response ||
          data.message ||
          data.title ||
          data.body ||
          "Received response from API.";
        // Replace the waiting message with the actual response
        setMessages((msgs) => {
          const newMsgs = [...msgs];
          const lastLoadingIdx = newMsgs
            .map((m) => m.isLoading)
            .lastIndexOf(true);
          if (lastLoadingIdx !== -1) {
            newMsgs.splice(lastLoadingIdx, 1);
          }
          newMsgs.push({
            from: "bot",
            text:
              typeof botMessage === "string"
                ? botMessage
                : JSON.stringify(botMessage),
          });
          return newMsgs;
        });
        return;
      } catch (error) {
        setMessages((msgs) => [
          ...msgs.filter((m) => !m.isLoading),
          {
            from: "bot",
            text: "Sorry, there was an error contacting the API.",
          },
        ]);
      }
      return;
    } else {
      setMessages((msgs) => [...msgs, { from: "user", text: userInput }]);
      setInput("");
    }
  };

  // Handle product variant selection
  const handleVariantToggle = (variantId, messageIndex) => {
    setMessages((msgs) => {
      const newMsgs = [...msgs];
      const message = newMsgs[messageIndex];
      
      if (message && message.searchResults) {
        // Initialize selectedVariants if it doesn't exist
        if (!message.selectedVariants) {
          message.selectedVariants = [];
        }
        
        // Toggle the variant selection
        if (message.selectedVariants.includes(variantId)) {
          message.selectedVariants = message.selectedVariants.filter(id => id !== variantId);
        } else {
          message.selectedVariants = [...message.selectedVariants, variantId];
        }
      }
      
      return newMsgs;
    });
  };

  // Handle order button click
  const handleOrder = async (productsToOrder, selectedVariantsToOrder) => {
    setOrdering(true);
    // Find selected product/variant details
    const selectedDetails = [];
    productsToOrder.forEach((product) => {
      product.variants.forEach((variant) => {
        if (selectedVariantsToOrder.includes(variant.id)) {
          selectedDetails.push({
            productTitle: product.title,
            variantTitle: variant.title,
            price: variant.price,
            variantId: variant.id,
          });
        }
      });
    });
    // Log selected variants to console
    console.log("Selected variants:", selectedDetails);
    // Show selected variants below the product grid
    setOrderedVariantsDetails(selectedDetails);

    // Build order message for webhook
    const variantIds = selectedDetails.map((detail) => detail.variantId).join(", ");
    const orderMessage = `Order This product: variant ID = ${variantIds}, email = kiran@gmail.com`;

    // Call the webhook to create order
    try {
      const response = await fetch(
        "https://somanparv.app.n8n.cloud/webhook/create-order-shopify",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            query: orderMessage
          }),
        }
      );
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      console.log("Webhook Order Response:", data); // Debug log

      // Check if order was created successfully
      let orderCreatedData = null;

      // Handle different response structures from n8n webhook
      if (Array.isArray(data) && data.length > 0 && data[0].output && data[0].output.order_created) {
        // n8n response wrapped in output object within an array
        orderCreatedData = data[0].output.order_created;
      } else if (data && data.output && data.output.order_created) {
        // n8n response wrapped in output object (direct)
        orderCreatedData = data.output.order_created;
      } else if (data && data.order_created) {
        // Direct order_created response
        orderCreatedData = data.order_created;
      } else if (data && data.order) {
        // If the webhook returns the order directly
        orderCreatedData = {
          id: data.order.id,
          order_id: data.order.name,
          product: selectedDetails.map(d => d.productTitle).join(", "),
          total_paid: data.order.total_price,
          message: "Order placed successfully!"
        };
      }

      if (orderCreatedData) {
        console.log("Order created successfully:", orderCreatedData); // Debug log

        setMessages((msgs) => {
          let newMsgs = [...msgs];
          while (newMsgs.length && newMsgs[newMsgs.length - 1].isLoading) {
            newMsgs.pop();
          }
          newMsgs.push({
            from: "bot",
            isOrderCreated: true,
            orderCreatedObj: orderCreatedData,
          });
          newMsgs.push({
            from: "bot",
            text: "You can search for more products by entering a query below.",
          });
          return newMsgs;
        });
        setOrderResult(null);
      } else {
        console.log("Order creation failed:", data); // Debug log
        setOrderResult(
          data.message || "Failed to place order. Please try again."
        );
      }
    } catch (error) {
      console.error("Error creating order:", error);
      setOrderResult("Failed to place order. Please try again.");
    }
    setOrdering(false);
    // Optionally, clear selected variants after ordering
    // setSelectedVariants([]);
  };

  // Handler to go back to main menu
  const handleBackToMainMenu = () => {
    setContext(null);
    setSelectedOption(null);
    setProducts([]);
    setSelectedVariants([]);
    setOrderedVariantsDetails([]);
    setOrderResult(null);
    setShowProductGrid(false);
    setMessages(getInitialMessages());
  };

  // Helper to render order status card
  const renderOrderStatusCard = (order) => (
    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 max-w-md">
      <div className="font-semibold text-blue-900 mb-2">
        Order #{order.order_number}
      </div>
      <div className="text-blue-900 mb-1">
        Product: <span className="font-medium">{order.product}</span>
      </div>
      <div className="text-blue-900 mb-1">
        Quantity: <span className="font-medium">{order.quantity}</span>
      </div>
      <div className="text-blue-900 mb-1">
        Total Paid: <span className="font-medium">{order.total_paid}</span>
      </div>
      <div className="text-blue-900 mb-1">
        Status: <span className="font-medium">{order.status}</span>
      </div>
      <div className="text-blue-900 mb-1">
        Fulfillment:{" "}
        <span className="font-medium">{order.fulfillment_status}</span>
      </div>
      <div className="text-blue-900 mb-1">
        Order Date: <span className="font-medium">{order.order_date}</span>
      </div>
    </div>
  );

  // Helper to render order created card
  const renderOrderCreatedCard = (order) => (
    <div className="bg-green-50 border border-green-200 rounded-lg p-4 max-w-md">
      <div className="font-semibold text-green-900 mb-2">
        Order Placed Successfully!
      </div>
      <div className="text-green-900 mb-1">
        Track ID: <span className="font-medium">{order.id}</span>
      </div>
      <div className="text-green-900 mb-1">
        Order ID: <span className="font-medium">{order.order_id}</span>
      </div>
      <div className="text-green-900 mb-1">
        Product: <span className="font-medium">{order.product}</span>
      </div>
      <div className="text-green-900 mb-1">
        Total Paid: <span className="font-medium">{order.total_paid}</span>
      </div>
      <div className="text-green-900 mt-2">{order.message}</div>
    </div>
  );

  return (
    <>
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/30"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Centered Chat Modal with larger size and off-white background */}
            <motion.div
              className="relative w-[900px] h-[700px] max-h-[calc(100vh-6rem)] bg-[#f8f9fa] rounded-3xl shadow-2xl flex flex-col overflow-hidden border border-white/20"
              initial={{ opacity: 0, scale: 0.95, y: 40 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 40 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
            >
              {/* Back to Main Menu Icon Button */}
              {context && (
                <button
                  className="absolute left-4 top-4 bg-white text-blue-900 p-2 rounded-full shadow hover:bg-blue-100 border border-blue-200 transition flex items-center justify-center z-20"
                  onClick={handleBackToMainMenu}
                  title="Back to Main Menu"
                  aria-label="Back to Main Menu"
                  style={{ width: 36, height: 36 }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    className="w-5 h-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 19l-7-7 7-7"
                    />
                  </svg>
                </button>
              )}
              {/* Close Button Top Right */}
              <button
                className="absolute top-4 right-4 text-gray-700 bg-gray-200 hover:bg-gray-300 rounded-full p-2 z-10"
                onClick={() => setOpen(false)}
                aria-label="Close"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
              {/* Chat Messages */}
              {/* Add extra padding to chat content to avoid overlap */}
              <div className="flex-1 overflow-y-auto px-6 pt-16 pb-8 space-y-8 font-bodyFont">
                {messages.map((msg, idx) => (
                  <React.Fragment key={idx}>
                    <div
                      className={`flex ${
                        msg.from === "user" ? "justify-end" : "justify-start"
                      }`}
                    >
                      {msg.from === "bot" ? (
                        <div className="flex items-start gap-3">
                          <span className="mt-1 text-xl">✨</span>
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <span className="text-blue-900 font-semibold text-base">
                                CNX AI
                              </span>
                            </div>
                            {msg.isOrderCreated && msg.orderCreatedObj ? (
                              renderOrderCreatedCard(msg.orderCreatedObj)
                            ) : msg.isOrderStatus && msg.orderObj ? (
                              renderOrderStatusCard(msg.orderObj)
                            ) : msg.from === "bot" &&
                              msg.text &&
                              msg.text.match(/[#*\-`]/) ? (
                              <span className="inline-block px-5 py-3 rounded-2xl font-bodyFont text-base bg-white text-blue-900 shadow-md max-w-[540px] whitespace-pre-line">
                                <ReactMarkdown>{msg.text}</ReactMarkdown>
                              </span>
                            ) : (
                              <span className="inline-block px-5 py-3 rounded-2xl font-bodyFont text-base bg-white text-blue-900 shadow-md max-w-[540px] whitespace-pre-line">
                                {msg.text}
                              </span>
                            )}
                            {/* Insert product grid immediately after the search result message */}
                            {(msg.text ===
                              "Here are the products matching your search:" ||
                              msg.text ===
                                "Sorry, No products found for your search. Here are some products for you to choose from") &&
                              msg.searchResults && msg.searchResults.length > 0 && (
                                <div className="mt-6">
                                  <div className="mb-2 font-semibold text-blue-900">
                                    Select products to order:
                                  </div>
                                  <div className="grid grid-cols-2 gap-4">
                                    {msg.searchResults.map((product) => (
                                      <div
                                        key={product.id}
                                        className="bg-white rounded-lg shadow p-4 flex flex-col items-center"
                                      >
                                        <img
                                          src={
                                            product.images &&
                                            product.images[0] &&
                                            product.images[0].src
                                              ? product.images[0].src
                                              : "https://via.placeholder.com/96x96?text=No+Image"
                                          }
                                          alt={product.title}
                                          className="w-24 h-24 object-cover rounded mb-2"
                                        />
                                        <div className="font-semibold text-primeColor mb-1 text-center">
                                          {product.title}
                                        </div>
                                        <div className="text-sm text-gray-700 mb-2 text-center">
                                          {product.product_type}
                                        </div>
                                        <div className="w-full flex flex-col gap-1">
                                          {product.variants.map((variant) => (
                                            <label
                                              key={variant.id}
                                              className="flex items-center gap-2 cursor-pointer"
                                            >
                                              <input
                                                type="checkbox"
                                                checked={msg.selectedVariants && msg.selectedVariants.includes(
                                                  variant.id
                                                )}
                                                onChange={() =>
                                                  handleVariantToggle(
                                                    variant.id,
                                                    idx
                                                  )
                                                }
                                              />
                                              <span>
                                                {variant.title} - $
                                                {variant.price}
                                              </span>
                                            </label>
                                          ))}
                                        </div>
                                      </div>
                                    ))}
                                  </div>
                                  {msg.selectedVariants && msg.selectedVariants.length > 0 && (
                                    <div className="w-full flex justify-center mt-6">
                                                                              <button
                                          className="bg-blue-500 text-white px-8 py-3 rounded-lg font-bold text-lg hover:bg-blue-600 transition"
                                          onClick={() => handleOrder(msg.searchResults, msg.selectedVariants || [])}
                                          disabled={ordering}
                                        >
                                        {ordering ? "Ordering..." : "Order"}
                                      </button>
                                    </div>
                                  )}
                                  {/* Show ordered variants details below the product grid */}
                                  {orderedVariantsDetails.length > 0 && (
                                    <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
                                      <div className="font-semibold text-blue-900 mb-2">
                                        You have selected:
                                      </div>
                                      <ul className="list-disc pl-5">
                                        {orderedVariantsDetails.map((d, i) => (
                                          <li key={i} className="text-blue-900">
                                            {d.productTitle} - {d.variantTitle}{" "}
                                            (${d.price})
                                          </li>
                                        ))}
                                      </ul>
                                      {/* Show order API result below the selected variants */}
                                      {orderResult && (
                                        <div className="mt-4 text-green-700 font-semibold">
                                          {orderResult}
                                        </div>
                                      )}
                                    </div>
                                  )}
                                </div>
                              )}
                            {/* Restore main menu (context selection buttons) when context is null and this is the first message */}
                            {idx === 0 && !context && (
                              <div className="flex flex-col gap-3 mt-3 items-center">
                                {contextOptions.map((option) => (
                                  <button
                                    key={option.value}
                                    className="w-full max-w-xs px-4 py-2 rounded-full bg-blue-100 text-blue-900 text-sm font-semibold shadow hover:bg-blue-200 border border-blue-300 transition"
                                    onClick={() => handleContextSelect(option)}
                                  >
                                    {option.label}
                                  </button>
                                ))}
                              </div>
                            )}
                          </div>
                        </div>
                      ) : (
                        <span className="inline-block px-5 py-3 rounded-2xl font-bodyFont text-base bg-blue-400/80 text-white shadow-md max-w-[540px] whitespace-pre-line">
                          {msg.text}
                        </span>
                      )}
                    </div>
                  </React.Fragment>
                ))}
              </div>
              {/* Input Area */}
              <div className="px-4 py-4 bg-gray-100 border-t border-gray-200 flex items-center gap-3">
                <input
                  className="flex-1 bg-white border-none rounded-full px-5 py-2 font-bodyFont text-blue-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-300 text-base shadow"
                  placeholder="Ask me anything"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSend()}
                  disabled={!context} // Disable input until context is selected
                />
                <button
                  type="button"
                  className="bg-blue-400 text-white rounded-full p-3 flex items-center justify-center hover:bg-blue-500 transition shadow"
                  onClick={handleSend}
                  aria-label="Send"
                  disabled={!input.trim() || !context} // Only enable if input is not empty and context is selected
                >
                  {/* Arrow Send Icon SVG */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    className="w-5 h-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4 12l16-6m0 0l-6 16m6-16L4 12"
                    />
                  </svg>
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ChatWidget;
