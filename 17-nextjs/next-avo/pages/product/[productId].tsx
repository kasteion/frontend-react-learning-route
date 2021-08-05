import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";

const ProductItem = () => {
  const {
    query: { productId },
  } = useRouter();
  const [product, setProduct] = useState({} as TProduct);
  useEffect(() => {
    fetch(`/api/avo/${productId}`)
      .then((response) => response.json())
      .then((data) => setProduct(data));
  }, [productId]);

  if (product.attributes) {
    return (
      <div>
        <h1>ProductItem {product.id}</h1>
        <p>{product.name}</p>
        <p>{product.sku}</p>
        <p>{product.price}</p>
        <img src={product.image} alt={product.name} />
        <p>{product.attributes.description}</p>
        <p>{product.attributes.hardiness}</p>
        <p>{product.attributes.shape}</p>
        <p>{product.attributes.taste}</p>
      </div>
    );
  }

  return <div></div>;
};

export default ProductItem;
