import React, { useState } from 'react';
import { Download, FileText, Shield, RotateCcw, X, Calendar } from 'lucide-react';

const PoliciesPage = () => {
  const [activeTab, setActiveTab] = useState('return');

  // Comprehensive policy data
  const policiesData = {
    return: {
      title: "Return Policy",
      icon: <RotateCcw className="w-6 h-6" />,
      lastUpdated: "December 15, 2024",
      content: {
        overview: "We want you to be completely satisfied with your purchase. Our return policy is designed to provide you with flexibility and peace of mind when shopping with us.",
        sections: [
          {
            title: "Return Window",
            content: [
              "Standard items: 30 days from delivery date",
              "Electronics: 15 days from delivery date",
              "Clothing and accessories: 45 days from delivery date",
              "Seasonal items: 14 days from delivery date",
              "Custom/personalized items: Non-returnable unless defective"
            ]
          },
          {
            title: "Condition Requirements",
            content: [
              "Items must be in original, unused condition",
              "All original packaging, tags, and labels must be intact",
              "Products should include all accessories and documentation",
              "Items showing signs of wear, damage, or alteration may be subject to restocking fees",
              "Hygiene-related products cannot be returned once opened for health and safety reasons"
            ]
          },
          {
            title: "Return Process",
            content: [
              "Step 1: Log into your account and navigate to 'My Orders'",
              "Step 2: Select the order containing items you wish to return",
              "Step 3: Choose 'Return Items' and select specific products",
              "Step 4: Specify the reason for return from the dropdown menu",
              "Step 5: Print the prepaid return shipping label",
              "Step 6: Package items securely in original or suitable packaging",
              "Step 7: Attach the return label and drop off at designated shipping location",
              "Step 8: Track your return using the provided tracking number"
            ]
          },
          {
            title: "Refund Processing",
            content: [
              "Refunds are processed within 3-5 business days after we receive your return",
              "Original payment method will be credited for the full purchase amount",
              "Shipping charges are non-refundable unless the return is due to our error",
              "Gift card purchases will be refunded as store credit",
              "International orders may take 7-10 business days for refund processing"
            ]
          },
          {
            title: "Non-Returnable Items",
            content: [
              "Perishable goods (food, flowers, plants)",
              "Intimate or sanitary goods",
              "Hazardous materials or flammable liquids",
              "Gift cards and promotional items",
              "Software and digital downloads",
              "Custom-made or personalized items",
              "Items damaged by misuse or normal wear"
            ]
          },
          {
            title: "Return Shipping",
            content: [
              "Free return shipping for defective or incorrect items",
              "Customer responsible for return shipping costs for change of mind returns",
              "We recommend using trackable shipping methods for returns over $75",
              "Items lost in return transit are the customer's responsibility",
              "Original shipping charges are only refunded for defective products"
            ]
          },
          {
            title: "International Returns",
            content: [
              "International customers are responsible for return shipping costs",
              "Customs duties and taxes are not refundable",
              "Returns may take 10-14 business days to process",
              "Some restrictions may apply based on local regulations",
              "Contact customer service for guidance on international returns"
            ]
          }
        ]
      }
    },
    replacement: {
      title: "Replacement Policy",
      icon: <Shield className="w-6 h-6" />,
      lastUpdated: "December 15, 2024",
      content: {
        overview: "We stand behind the quality of our products. If you receive a defective, damaged, or incorrect item, we'll make it right with a prompt replacement.",
        sections: [
          {
            title: "Eligible Situations",
            content: [
              "Manufacturing defects discovered within warranty period",
              "Items damaged during shipping or delivery",
              "Incorrect items sent due to fulfillment errors",
              "Missing components or accessories",
              "Products that fail to function as advertised",
              "Items significantly different from product description"
            ]
          },
          {
            title: "Replacement Timeline",
            content: [
              "Standard replacements: 2-3 business days processing",
              "Express replacements: Same day processing for priority items",
              "Out-of-stock items: 5-7 business days or equivalent product offer",
              "International replacements: 7-10 business days",
              "Custom items: 2-3 weeks manufacturing time"
            ]
          },
          {
            title: "Replacement Process",
            content: [
              "Contact customer service within 48 hours of delivery",
              "Provide order number and detailed description of the issue",
              "Upload photos if the item is visibly damaged or defective",
              "Receive replacement authorization and return instructions",
              "Send defective item using provided prepaid shipping label",
              "Receive replacement item via expedited shipping at no charge",
              "Track both return and replacement shipments through your account"
            ]
          },
          {
            title: "Quality Assurance",
            content: [
              "All replacement items undergo additional quality inspection",
              "Items are tested for functionality before shipment",
              "Packaging is reinforced to prevent shipping damage",
              "Priority handling ensures faster processing times",
              "Replacement items come with full warranty coverage"
            ]
          },
          {
            title: "Warranty Coverage",
            content: [
              "Electronics: 1-year manufacturer warranty plus 90-day store warranty",
              "Appliances: 2-year comprehensive warranty coverage",
              "Clothing: 6-month warranty against manufacturing defects",
              "Furniture: 1-year warranty on structure and mechanisms",
              "Accessories: 90-day limited warranty coverage"
            ]
          },
          {
            title: "Advanced Replacement Program",
            content: [
              "Premium members receive replacement before returning defective item",
              "Temporary authorization hold placed on payment method",
              "30 days to return defective item after receiving replacement",
              "Hold released once defective item is received and processed",
              "Available for orders over $100 and active premium memberships"
            ]
          },
          {
            title: "Out of Stock Replacements",
            content: [
              "Offer equivalent or upgraded product at no additional cost",
              "Full refund if no suitable replacement is available",
              "Pre-order option for temporarily out-of-stock items",
              "Email notifications when replacement items become available",
              "Priority access to restocked items for affected customers"
            ]
          }
        ]
      }
    },
    cancellation: {
      title: "Cancellation Policy",
      icon: <X className="w-6 h-6" />,
      lastUpdated: "December 15, 2024",
      content: {
        overview: "We understand that circumstances change. Our cancellation policy provides clear guidelines for modifying or canceling your order at various stages of the fulfillment process.",
        sections: [
          {
            title: "Order Cancellation Windows",
            content: [
              "Standard orders: Cancel within 2 hours of placement",
              "Express orders: Cancel within 30 minutes of placement",
              "Custom orders: Cancel within 24 hours before production begins",
              "Pre-orders: Cancel anytime before item ships",
              "International orders: Cancel within 4 hours due to extended processing"
            ]
          },
          {
            title: "Cancellation Methods",
            content: [
              "Online: Use 'Cancel Order' button in your account dashboard",
              "Phone: Call customer service at 1-800-XXX-XXXX",
              "Email: Send cancellation request to orders@company.com",
              "Live Chat: Available 24/7 for immediate assistance",
              "Mobile App: Cancel directly through the mobile application"
            ]
          },
          {
            title: "Processing Status Guidelines",
            content: [
              "Order Confirmed: Full cancellation available with immediate refund",
              "Processing: Cancellation possible but may incur processing fees",
              "Shipped: Cannot cancel, but return policy applies upon delivery",
              "Out for Delivery: Contact carrier for delivery refusal instructions",
              "Delivered: Cancellation not possible, return process required"
            ]
          },
          {
            title: "Refund Processing",
            content: [
              "Credit card refunds: 3-5 business days",
              "PayPal refunds: 1-2 business days",
              "Bank transfer refunds: 5-7 business days",
              "Gift card refunds: Immediate store credit",
              "Cryptocurrency payments: 7-14 business days"
            ]
          },
          {
            title: "Partial Cancellations",
            content: [
              "Cancel individual items from multi-item orders",
              "Shipping costs adjusted proportionally",
              "Remaining items continue normal processing",
              "Promotional discounts recalculated if minimum order requirements not met",
              "Free shipping thresholds re-evaluated for remaining items"
            ]
          },
          {
            title: "Special Order Types",
            content: [
              "Pre-orders: Cancellable until 24 hours before release date",
              "Back-orders: Cancellable until item comes into stock",
              "Subscription orders: Cancel before next billing cycle",
              "Installment purchases: Contact customer service for cancellation terms",
              "Bundle deals: May require cancellation of entire bundle"
            ]
          },
          {
            title: "Cancellation Fees",
            content: [
              "Standard orders: No fees if cancelled within allowed window",
              "Custom orders: 25% restocking fee if production has begun",
              "Express shipping: Non-refundable if order has been expedited",
              "International orders: Customs and duty fees may be non-refundable",
              "Special handling: Additional fees may apply for specialized services"
            ]
          },
          {
            title: "Subscription Cancellations",
            content: [
              "Cancel anytime before next billing cycle",
              "No cancellation fees for monthly subscriptions",
              "Annual subscriptions: Pro-rated refund available within 30 days",
              "Auto-renewals can be disabled in account settings",
              "Final shipment will be sent if cancellation occurs after billing"
            ]
          }
        ]
      }
    }
  };

  // Function to export content to Word document
  const exportToWord = () => {
    const allContent = Object.values(policiesData).map(policy => {
      let content = `${policy.title.toUpperCase()}\n`;
      content += `Last Updated: ${policy.lastUpdated}\n\n`;
      content += `OVERVIEW\n${policy.content.overview}\n\n`;
      
      policy.content.sections.forEach(section => {
        content += `${section.title.toUpperCase()}\n`;
        section.content.forEach(item => {
          content += `• ${item}\n`;
        });
        content += '\n';
      });
      
      return content;
    }).join('\n' + '='.repeat(80) + '\n\n');

    const blob = new Blob([allContent], { 
      type: 'application/msword;charset=utf-8' 
    });
    
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'Company_Policies_Document.doc';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const PolicyContent = ({ policy }) => (
    <div className="space-y-8">
      <div className="bg-blue-50 border-l-4 border-blue-400 p-6 rounded-r-lg">
        <div className="flex items-center mb-4">
          {policy.icon}
          <h2 className="text-2xl font-bold text-gray-800 ml-3">{policy.title}</h2>
        </div>
        <p className="text-sm text-gray-600 mb-4">Last Updated: {policy.lastUpdated}</p>
        <div className="bg-white p-4 rounded-lg border">
          <h3 className="text-lg font-semibold text-gray-700 mb-2">Overview</h3>
          <p className="text-gray-600 leading-relaxed">{policy.content.overview}</p>
        </div>
      </div>

      {policy.content.sections.map((section, index) => (
        <div key={index} className="bg-white border border-gray-200 rounded-lg shadow-sm">
          <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
            <h3 className="text-xl font-semibold text-gray-800">{section.title}</h3>
          </div>
          <div className="p-6">
            <ul className="space-y-3">
              {section.content.map((item, itemIndex) => (
                <li key={itemIndex} className="flex items-start">
                  <span className="inline-block w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  <span className="text-gray-700 leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Company Policies</h1>
                <p className="mt-2 text-gray-600">Comprehensive information about our return, replacement, and cancellation policies</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8">
            {Object.entries(policiesData).map(([key, policy]) => (
              <button
                key={key}
                onClick={() => setActiveTab(key)}
                className={`flex items-center py-4 px-2 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === key
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {policy.icon}
                <span className="ml-2">{policy.title}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <PolicyContent policy={policiesData[activeTab]} />
      </div>

      {/* Footer */}
      <div className="bg-white border-t mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
            <div className="flex items-center mb-4">
              <FileText className="w-6 h-6 text-yellow-600 mr-3" />
              <h3 className="text-lg font-semibold text-yellow-800">Need Additional Help?</h3>
            </div>
            <div className="grid md:grid-cols-3 gap-6 text-sm">
              <div>
                <h4 className="font-medium text-yellow-800 mb-2">Customer Service</h4>
                <p className="text-yellow-700">Phone: +91 1234567890</p>
                <p className="text-yellow-700">Email: support@CNX_Store.com</p>
                <p className="text-yellow-700">Hours: Mon-Fri 9AM-8PM EST</p>
              </div>
              <div>
                <h4 className="font-medium text-yellow-800 mb-2">Live Chat</h4>
                <p className="text-yellow-700">Available 24/7 on our website</p>
                <p className="text-yellow-700">Average response time: 2 minutes</p>
                <p className="text-yellow-700">Support in multiple languages</p>
              </div>
              <div>
                <h4 className="font-medium text-yellow-800 mb-2">Self-Service</h4>
                <p className="text-yellow-700">FAQ section with 200+ answers</p>
                <p className="text-yellow-700">Video tutorials and guides</p>
                <p className="text-yellow-700">Order tracking and management</p>
              </div>
            </div>
          </div>
          
          <div className="mt-8 text-center text-sm text-gray-500">
            <p>These policies are subject to change without notice. Please check this page regularly for updates.</p>
            <p className="mt-2">© 2024 Company Name. All rights reserved. | Last updated: December 15, 2024</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PoliciesPage;