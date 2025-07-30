import { useState, useEffect } from "react";

const useAboutPageContent = () => {
  const [pageData, setPageData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchAboutPageData = async () => {
    const url =
      "http://localhost:3001/api/content/concentrixpartnersandboxprogram/us/en/about-page.model.json";

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
      console.error("Error fetching about page:", error);
      setError("Failed to load page content. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAboutPageData();
    // eslint-disable-next-line
  }, []);

  return { pageData, loading, error, refetch: fetchAboutPageData };
};

export default useAboutPageContent;