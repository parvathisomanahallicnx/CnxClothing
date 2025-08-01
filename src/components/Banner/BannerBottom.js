import React from "react";
import { MdLocalShipping } from "react-icons/md";
import { CgRedo } from "react-icons/cg";
import useHomePageContent from "../../constants/AEM_content/homePage_content";


function extractBannerBottomTexts(pageData) {
  try {
    const items =
      pageData[":items"]?.root?.[":items"]?.container?.[":items"]?.container?.[":items"];
    return {
      warranty: items?.["two years warranty"]?.text?.trim() || "Two years warranty",
      shipping: items?.["free shipping"]?.text?.trim() || "Free shipping",
      returnPolicy: items?.["return policy"]?.text?.trim() || "Return policy in 30 days",
    };
  } catch {
    return {
      warranty: "Two years warranty",
      shipping: "Free shipping",
      returnPolicy: "Return policy in 30 days",
    };
  }
}

const BannerBottom = () => {
  const { pageData, loading } = useHomePageContent();
  const { warranty, shipping, returnPolicy } = pageData
    ? extractBannerBottomTexts(pageData)
    : {};

  return (
    <div className="w-full bg-white border-b-[1px] py-4 border-b-gray-200 px-4">
      <div className="max-w-container mx-auto h-20 flex flex-col md:flex-row justify-between items-center">
        <div className="flex items-center gap-2 w-72 shadow-sm hover:shadow-md duration-300">
          <span className="font-bold font-titleFont w-6 text-center">2</span>
          <p className="text-lightText text-base">{warranty}</p>
        </div>
        <div className="flex md:w-auto items-center gap-2 w-72 shadow-sm hover:shadow-md duration-300">
          <span className="text-xl text-center w-6 ml-1">
            <MdLocalShipping />
          </span>
          <p className="text-lightText text-base">{shipping}</p>
        </div>
        <div className="flex md:w-auto items-center gap-2 w-72 shadow-sm hover:shadow-md duration-300">
          <span className="text-2xl text-center w-6">
            <CgRedo />
          </span>
          <p className="text-lightText text-base">{returnPolicy}</p>
        </div>
      </div>
    </div>
  );
};

export default BannerBottom;