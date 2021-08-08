import React from "react";
import { Card } from "semantic-ui-react";
import Image from "next/image";
import { useRouter } from "next/router";

const AvoCard = ({ avocado }: { avocado: TProduct }) => {
  const router = useRouter();

  const handleClick = (id: string) => {
    router.push(`/product/${id}`);
  };

  return (
    <Card link onClick={() => handleClick(avocado.id)}>
      <Image src={avocado.image} alt={avocado.name} width={333} height={333} />
      <Card.Content>
        <Card.Header>{avocado.name}</Card.Header>
        <Card.Description>{avocado.price}</Card.Description>
      </Card.Content>
    </Card>
  );
};

export default AvoCard;
