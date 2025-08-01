import React from "react";
import { Link } from "react-router-dom";
import Image from "../../designLayouts/Image";
import useHomePageContent from "../../../constants/AEM_content/homePage_content";

function extractSaleImages(pageData) {
  const AEM_DOMAIN = "https://publish-p92368-e968987.adobeaemcloud.com";
  try {
    const items =
      pageData[":items"]?.root?.[":items"]?.container?.[":items"]?.container?.[":items"];
    const getImg = (key) => {
      const imgObj = items?.[key];
      if (!imgObj?.src) return "";
      return imgObj.src.startsWith("/")
        ? AEM_DOMAIN + imgObj.src
        : imgObj.src;
    };
    return {
      saleImgOne: getImg("left image"),
      saleImgTwo: getImg("right top image"),
      saleImgThree: getImg("right bottom image"),
    };
  } catch {
    return {
      saleImgOne: "",
      saleImgTwo: "",
      saleImgThree: "",
    };
  }
}

const Sale = () => {
  const { pageData } = useHomePageContent();
  const { saleImgOne, saleImgTwo, saleImgThree } = pageData
    ? extractSaleImages(pageData)
    : {};

  return (
    <div className="py-20 flex flex-col md:flex-row items-center justify-between gap-4 lg:gap-10">
      <div className="w-full md:w-2/3 lg:w-1/2 h-full">
        <Link to="/shop">
          <Image className="h-full w-full object-cover" imgSrc={saleImgOne} />
        </Link>
      </div>
      <div className="w-full md:w-2/3 lg:w-1/2 h-auto flex flex-col gap-4 lg:gap-10">
        <div className="h-1/2 w-full">
          <Link to="/shop">
            <Image className="h-full w-full object-cover" imgSrc={saleImgTwo} />
          </Link>
        </div>
        <div className="h-1/2 w-full">
          <Link to="/shop">
            <Image className="h-full w-full object-cover" imgSrc={saleImgThree} />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Sale;
