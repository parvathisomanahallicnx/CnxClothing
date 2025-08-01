import { useState, useEffect } from "react";

const useOffersPageContent = () => {
  const [pageData, setPageData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchOffersPageData = async () => {
    const url =
      "http://localhost:3001/api/content/concentrixpartnersandboxprogram/us/en/offers-page.model.json";

    try {
      setLoading(true);
      const response = await fetch(url, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setPageData(data);
      setError(null);
    } catch (error) {
      console.error("Error fetching offers page:", error);
      setError("Failed to load offers page content. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOffersPageData();
    // eslint-disable-next-line
  }, []);

  return { pageData, loading, error, refetch: fetchOffersPageData };
};

// Place this in Offers.js or a utils file
function extractOffersPageTexts(pageData) {
  try {
    // Adjust the path as per your AEM structure
    const items =
      pageData?.[":items"]?.root?.[":items"]?.container?.[":items"]?.container?.[":items"];
    return {
      getExclusiveOffers:
        items?.["title_411834077"]?.text?.trim() || "Get Exclusive Offers!",
      exclusiveOffers:
        items?.["text_99934174"]?.text
          ?.replace(/<[^>]+>/g, "")
          .replace(/\r?\n|\r/g, "")
          .trim() || "Subscribe to our newsletter and never miss a deal",
    };
  } catch {
    return {
      getExclusiveOffers: "Get Exclusive Offers!",
      exclusiveOffers: "Subscribe to our newsletter and never miss a deal",
    };
  }
}

export default useOffersPageContent;