import { motion } from "framer-motion";
import React, { useState } from "react";
import {
  FaEnvelope,
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaMapMarkerAlt,
  FaPhone,
  FaTwitter,
  FaYoutube,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import { paymentCard } from "../../../assets/images";
import Image from "../../designLayouts/Image";
import FooterListTitle from "./FooterListTitle";

const Footer = () => {
  const [emailInfo, setEmailInfo] = useState("");
  const [subscription, setSubscription] = useState(false);
  const [errMsg, setErrMsg] = useState("");

  const emailValidation = () => {
    return String(emailInfo)
      .toLocaleLowerCase()
      .match(/^\w+([-]?\w+)*@\w+([-]?\w+)*(\.\w{2,3})+$/);
  };

  const handleSubscription = () => {
    if (emailInfo === "") {
      setErrMsg("Please provide an Email !");
    } else if (!emailValidation(emailInfo)) {
      setErrMsg("Please give a valid Email!");
    } else {
      setSubscription(true);
      setErrMsg("");
      setEmailInfo("");
    }
  };

  const socialLinks = [
    {
      icon: <FaFacebook />,
      url: "https://www.facebook.com/CNXStoreOfficial",
      label: "Facebook",
    },
    {
      icon: <FaInstagram />,
      url: "https://www.instagram.com/cnx_store/",
      label: "Instagram",
    },
    {
      icon: <FaTwitter />,
      url: "https://twitter.com/CNXStore",
      label: "Twitter",
    },
    {
      icon: <FaLinkedin />,
      url: "https://www.linkedin.com/company/cnx-store-private-limited",
      label: "LinkedIn",
    },
    {
      icon: <FaYoutube />,
      url: "https://www.youtube.com/@CNXStoreOfficial",
      label: "YouTube",
    },
  ];

  return (
    <div className="w-full bg-[#F5F5F3] py-20">
      <div className="max-w-container mx-auto grid grid-cols-1 md:grid-cols-2 xl:grid-cols-6 px-4 gap-10">
        {/* Company Info Section */}
        <div className="col-span-2">
          <FooterListTitle title="CNX Store - Style. Value. Trust." />
          <div className="flex flex-col gap-6">
            <p className="text-base w-full xl:w-[90%] text-lightText">
              Your premier fashion destination since 2018. We curate exceptional
              clothing collections that blend contemporary fashion with classic
              elegance, serving 2M+ customers worldwide with quality, style, and
              unmatched customer satisfaction.
            </p>

            {/* Contact Info */}
            <div className="space-y-2 text-sm text-lightText">
              <div className="flex items-center gap-2">
                <FaPhone className="text-primeColor" />
                <span>24/7 Support: 1800-123-4567</span>
              </div>
              <div className="flex items-center gap-2">
                <FaEnvelope className="text-primeColor" />
                <span>info@cnxstore.com</span>
              </div>
              <div className="flex items-center gap-2">
                <FaMapMarkerAlt className="text-primeColor" />
                <span>Gurugram, India | 50+ Cities</span>
              </div>
            </div>

            {/* Social Media Links */}
            <div>
              <p className="text-sm font-semibold text-primeColor mb-3">
                Follow Us
              </p>
              <ul className="flex items-center gap-2">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.url}
                    target="_blank"
                    rel="noreferrer"
                    title={social.label}
                  >
                    <li className="w-8 h-8 bg-primeColor text-gray-100 hover:text-white cursor-pointer text-lg rounded-full flex justify-center items-center hover:bg-black duration-300">
                      {social.icon}
                    </li>
                  </a>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Shop Categories */}
        <div>
          <FooterListTitle title="Shop Categories" />
          <ul className="flex flex-col gap-2">
            <Link to="/shop">
              <li className="font-titleFont text-base text-lightText hover:text-black hover:underline decoration-[1px] decoration-gray-500 underline-offset-2 cursor-pointer duration-300">
                Women's Fashion
              </li>
            </Link>
            <Link to="/shop">
              <li className="font-titleFont text-base text-lightText hover:text-black hover:underline decoration-[1px] decoration-gray-500 underline-offset-2 cursor-pointer duration-300">
                Men's Essentials
              </li>
            </Link>
            <Link to="/shop">
              <li className="font-titleFont text-base text-lightText hover:text-black hover:underline decoration-[1px] decoration-gray-500 underline-offset-2 cursor-pointer duration-300">
                Kids Collection
              </li>
            </Link>
            <Link to="/shop">
              <li className="font-titleFont text-base text-lightText hover:text-black hover:underline decoration-[1px] decoration-gray-500 underline-offset-2 cursor-pointer duration-300">
                Accessories
              </li>
            </Link>
            <Link to="/shop">
              <li className="font-titleFont text-base text-lightText hover:text-black hover:underline decoration-[1px] decoration-gray-500 underline-offset-2 cursor-pointer duration-300">
                New Arrivals
              </li>
            </Link>
          </ul>
        </div>

        {/* Customer Support */}
        <div>
          <FooterListTitle title="Customer Support" />
          <ul className="flex flex-col gap-2">
            <Link to="/signin">
              <li className="font-titleFont text-base text-lightText hover:text-black hover:underline decoration-[1px] decoration-gray-500 underline-offset-2 cursor-pointer duration-300">
                My Account
              </li>
            </Link>
            <Link to="/orders">
              <li className="font-titleFont text-base text-lightText hover:text-black hover:underline decoration-[1px] decoration-gray-500 underline-offset-2 cursor-pointer duration-300">
                Order Tracking
              </li>
            </Link>
            <Link to="/orders">
              <li className="font-titleFont text-base text-lightText hover:text-black hover:underline decoration-[1px] decoration-gray-500 underline-offset-2 cursor-pointer duration-300">
                Size Guide
              </li>
            </Link>
            <Link to="/policies">
              <li className="font-titleFont text-base text-lightText hover:text-black hover:underline decoration-[1px] decoration-gray-500 underline-offset-2 cursor-pointer duration-300">
                Return Policy
              </li>
            </Link>
            <Link to="/orders">
              <li className="font-titleFont text-base text-lightText hover:text-black hover:underline decoration-[1px] decoration-gray-500 underline-offset-2 cursor-pointer duration-300">
                Shipping Info
              </li>
            </Link>
          </ul>
        </div>

        {/* Newsletter Subscription */}
        <div className="col-span-2 flex flex-col items-center w-full px-4">
          <FooterListTitle title="Stay Updated with CNX Store" />
          <div className="w-full">
            <p className="text-center mb-4 text-lightText">
              Subscribe to get exclusive offers, style tips, and be the first to
              know about our latest collections and special deals.
            </p>
            {subscription ? (
              <motion.div
                initial={{ x: 20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="text-center"
              >
                <p className="w-full text-center text-base font-titleFont font-semibold text-green-600 mb-2">
                  🎉 Welcome to CNX Store Family!
                </p>
                <p className="text-sm text-lightText">
                  You'll receive exclusive offers and style updates straight to
                  your inbox.
                </p>
              </motion.div>
            ) : (
              <div className="w-full flex-col xl:flex-row flex justify-between items-center gap-4">
                <div className="flex flex-col w-full">
                  <input
                    onChange={(e) => setEmailInfo(e.target.value)}
                    value={emailInfo}
                    className="w-full h-12 border-b border-gray-400 bg-transparent px-4 text-primeColor text-lg placeholder:text-base outline-none"
                    type="email"
                    placeholder="Your email for exclusive offers...*"
                  />
                  {errMsg && (
                    <p className="text-red-600 text-sm font-semibold font-titleFont text-center animate-bounce mt-2">
                      {errMsg}
                    </p>
                  )}
                </div>
                <button
                  onClick={handleSubscription}
                  className="bg-primeColor text-white w-full xl:w-[30%] h-12 hover:bg-black duration-300 text-base tracking-wide rounded-md font-medium"
                >
                  Subscribe
                </button>
              </div>
            )}

            {/* Payment Methods */}
            <div className="mt-6">
              <p className="text-center text-sm text-lightText mb-3">
                Secure Payment Methods
              </p>
              <Image
                className={`w-[80%] lg:w-[60%] mx-auto ${
                  subscription ? "mt-2" : ""
                }`}
                imgSrc={paymentCard}
                alt="Accepted payment methods"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
