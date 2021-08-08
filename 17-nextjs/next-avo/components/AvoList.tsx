import React from "react";
import styled from "styled-components";
import AvoCard from "./AvoCard";

const GridContainer = styled.section`
  display: flex;
  justify-content: center;
  padding-top: 50px;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 350px 350px;
  justify-items: center;
  align-items: center;
`;

const AvoList = ({ avos }: { avos: Array<TProduct> }) => {
  return (
    <GridContainer>
      <Grid>
        {avos.map((avo) => (
          <AvoCard key={avo.id} avocado={avo}></AvoCard>
        ))}
      </Grid>
    </GridContainer>
  );
};

export default AvoList;
