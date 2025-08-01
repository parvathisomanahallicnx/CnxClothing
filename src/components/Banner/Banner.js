import React, { useState } from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import useHomePageContent from "../../constants/AEM_content/homePage_content";
import Image from "../designLayouts/Image";

const Banner = () => {
  const [dotActive, setDocActive] = useState(0);
  const { pageData, loading, error } = useHomePageContent();

  // Extract banners from AEM data
  const banners = pageData ? extractBannerImages(pageData) : [];

  const settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    beforeChange: (prev, next) => setDocActive(next),
    appendDots: (dots) => (
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "7%",
          transform: "translateY(-50%)",
        }}
      >
        <ul style={{ margin: "0px" }}> {dots} </ul>
      </div>
    ),
    customPaging: (i) => (
      <div
        style={
          i === dotActive
            ? {
                width: "30px",
                color: "#262626",
                borderRight: "3px #262626 solid",
                padding: "8px 0",
                cursor: "pointer",
              }
            : {
                width: "30px",
                color: "transparent",
                borderRight: "3px white solid",
                padding: "8px 0",
                cursor: "pointer",
              }
        }
      >
        0{i + 1}
      </div>
    ),
    responsive: [
      {
        breakpoint: 576,
        settings: {
          dots: true,
          appendDots: (dots) => (
            <div
              style={{
                position: "absolute",
                top: "50%",
                left: "2%",
                transform: "translateY(-50%)",
              }}
            >
              <ul style={{ margin: "0px" }}> {dots} </ul>
            </div>
          ),
          customPaging: (i) => (
            <div
              style={
                i === dotActive
                  ? {
                      width: "25px",
                      color: "#262626",
                      borderRight: "3px #262626 solid",
                      cursor: "pointer",
                      fontSize: "12px",
                    }
                  : {
                      width: "25px",
                      color: "transparent",
                      borderRight: "3px white solid",
                      cursor: "pointer",
                      fontSize: "12px",
                    }
              }
            >
              0{i + 1}
            </div>
          ),
        },
      },
    ],
  };

  if (loading) return <div>Loading banners...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="w-full bg-white">
      <Slider {...settings}>
        {banners.map((banner) => (
          <Link to="/offer" key={banner.id}>
            <div>
              <Image imgSrc={banner.src} alt={banner.alt} />
            </div>
          </Link>
        ))}
      </Slider>
    </div>
  );
};

function extractBannerImages(pageData) {
  const AEM_DOMAIN = "https://publish-p92368-e968987.adobeaemcloud.com";
  try {
    const heroBanner =
      pageData[":items"]?.root?.[":items"]?.container?.[":items"]?.container?.[":items"]?.["hero banner"];
    if (!heroBanner || !heroBanner[":itemsOrder"]) return [];
    return heroBanner[":itemsOrder"]
      .map((bannerKey) => {
        const banner = heroBanner[":items"]?.[bannerKey];
        const imageObj = banner?.[":items"]?.image;
        let src = imageObj?.src || "";
        // Prepend domain if src is relative
        if (src && src.startsWith("/")) {
          src = AEM_DOMAIN + src;
        }
        return imageObj
          ? {
              src,
              alt: imageObj.alt || "",
              id: imageObj.id,
            }
          : null;
      })
      .filter(Boolean);
  } catch (e) {
    return [];
  }
}
export default Banner;
