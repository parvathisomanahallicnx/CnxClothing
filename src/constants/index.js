import { newArrFour, spfFour, spfOne, spfThree } from "../assets/images/index";
import { getPaginationItems } from "./fetchProducts";

// =================== NavBarList Start here ====================
export const navBarList = [
  // {
  //   _id: 1001,
  //   title: "Home",
  //   link: "/",
  // },
  {
    _id: 1002,
    title: "Shop",
    link: "/shop",
  },
  {
    _id: 1003,
    title: "About",
    link: "/about",
  },
  {
    _id: 1004,
    title: "Contact",
    link: "contact",
  },
  {
    _id: 1005,
    title: "News",
    link: "/news",
  },
    {
    _id: 1006,
    title: "Offers",
    link: "/offers",
  },
    {
    _id: 1007,
    title: "Orders",
    link: "/orders",
  },
  {
    _id: 1008,
    title: "Policies",
    link: "/policies",
  },
];
// =================== NavBarList End here ======================
// =================== Special Offer data Start here ============
export const SplOfferData = [
  {
    _id: "201",
    img: spfOne,
    productName: "Cap for Boys",
    price: "35.00",
    color: "Blank and White",
    badge: true,
    des: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic excepturi quibusdam odio deleniti reprehenderit facilis.",
  },
  {
    _id: "202",
    img: newArrFour,
    productName: "Tea Table",
    price: "180.00",
    color: "Gray",
    badge: true,
    des: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic excepturi quibusdam odio deleniti reprehenderit facilis.",
  },
  {
    _id: "203",
    img: spfThree,
    productName: "Headphones",
    price: "25.00",
    color: "Mixed",
    badge: true,
    des: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic excepturi quibusdam odio deleniti reprehenderit facilis.",
  },
  {
    _id: "204",
    img: spfFour,
    productName: "Sun glasses",
    price: "220.00",
    color: "Black",
    badge: true,
    des: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic excepturi quibusdam odio deleniti reprehenderit facilis.",
  },
];
// =================== Special Offer data End here ==============
export const paginationItems = [];

export const loadpaginationItems = async () => {
  const products = await getPaginationItems();
  paginationItems.push(...products);
  console.log("Pagination items loaded:", paginationItems);
};
