import React, { useState, useEffect } from "react";
import Link from "next/link";
import Navbar from "../components/Navbar";
import styled from "styled-components";

const Title = styled.h1`
  color: ${({ theme }) => theme.colors.primary};
`;
const HomePage = () => {
  const [productList, setProductList] = useState([] as Array<TProduct>);
  useEffect(() => {
    fetch("/api/avo")
      .then((response) => response.json())
      .then((response: TAPIAvoResponse) => {
        setProductList(response.data as Array<TProduct>);
      });
  }, []);

  return (
    <div>
      <Navbar />
      <Title>Home</Title>
      {productList.map((avo) => (
        <div key={avo.id}>
          <Link href={`/product/${avo.id}`}>{avo.name}</Link>
        </div>
      ))}
    </div>
  );
};

export default HomePage;
