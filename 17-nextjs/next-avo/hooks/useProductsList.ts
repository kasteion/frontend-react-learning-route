import { useState, useEffect } from "react";

export const useProductsList = () => {
  const [products, setProducts] = useState([] as Array<TProduct>);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      const response = await fetch("/api/avo");
      const { data } = await response.json();
      setProducts(data);
    } catch (err) {
      setError(
        "We had a problem bringing the avocados, please try again later."
      );
    }
    setLoading(false);
  };

  useEffect(() => {
    const ac = new AbortController();
    setError(null);
    setLoading(true);
    fetchData();
    return () => ac.abort();
  }, []);

  return { error, loading, products };
};
