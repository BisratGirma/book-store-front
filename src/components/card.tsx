import styled from "styled-components";
import { Book } from "../types";

const StyledCard = styled.div`
  background-color: #ffffff;
  border: 1px solid #e0e0e0;
  padding: 16px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  /* Mobile styles */
  @media (max-width: 600px) {
    padding: 12px;
    h3 {
      font-size: 18px;
    }
    p {
      font-size: 14px;
    }
  }

  /* Tablet styles */
  @media (min-width: 601px) and (max-width: 1024px) {
    padding: 20px;
    h3 {
      font-size: 24px;
    }
    p {
      font-size: 16px;
    }
  }

  /* Larger screens */
  @media (min-width: 1025px) {
    /* Add any additional styling for larger screens */
  }
`;

const Card = ({ writer, point, title, coverImage, tag }: Book) => {
  return (
    <StyledCard>
      <img
        src={
          coverImage ??
          "https://images-na.ssl-images-amazon.com/images/I/51Ga5GuElyL._AC_SX184_.jpg"
        }
        alt={title}
      />
      <h3>{title}</h3>
      <p>{"$" + point}</p>
      <p>{writer}</p>
    </StyledCard>
  );
};

export default Card;
