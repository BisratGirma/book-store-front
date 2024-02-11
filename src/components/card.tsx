import styled from "styled-components";
import { Book } from "../types";
import { useStore } from "../store";
import { useState } from "react";
import { useNavigate } from "react-router";

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

const Card = ({ id, writer, point, title, coverImage, tag }: Book) => {
  const authenticated = useStore((state: any) => state.user.jwt);
  const [ordered, setOrdered] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  let cleanStr = tag.replace(/["{}]/g, "");
  const navigate = useNavigate();

  // Split the string by commas
  let arrayTags = cleanStr.split(",");

  const handleBuy = async () => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${authenticated}`);
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({});

    var requestOptions: RequestInit = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };
    try {
      const response = await fetch(
        "https://bookstore-backend-d3x5.onrender.com/api/order/" + id,
        requestOptions
      );
      const result = await response.json();

      if (response.status === 201 || response.status === 200) setOrdered(true);
      else if (response.status === 401) navigate("/login");
      else setErrorMessage(result.message ?? "please try again!");
    } catch (error) {
      setErrorMessage("Login Failed");
    }
  };

  return (
    <StyledCard>
      {errorMessage.length > 0 && ErrorMessage({ message: errorMessage })}
      <img
        src={
          coverImage ??
          "https://images-na.ssl-images-amazon.com/images/I/51Ga5GuElyL._AC_SX184_.jpg"
        }
        alt={title}
      />
      <h3>{title}</h3>
      <p style={{ color: "#B12704" }}>{point ? "$" + point : "not setted"}</p>
      <p>{writer}</p>
      <div style={{ display: "flex", justifyContent: "center" }}>
        {arrayTags?.map((_tag, i) => (
          <p>{`${i > 0 ? "," : ""} ${_tag}`}</p>
        ))}
      </div>

      <BuyButton onClick={() => handleBuy()}>
        {ordered ? "Buy more" : "Buy"}
      </BuyButton>
    </StyledCard>
  );
};

export default Card;

const BuyButton = styled.button`
  background-color: #ffbd03;
  color: #000;
  border: none;
  border-radius: 4px;
  padding: 10px 20px;
  cursor: pointer;
  margin-top: 10px;
`;

const ErrorMessage = ({ message }: { message: string }) => (
  <div
    style={{
      backgroundColor: "#ffcccc",
      padding: "10px",
      textAlign: "center",
      top: "10px",
    }}
  >
    <p style={{ color: "#cc0000", fontWeight: "bold" }}>Login Failed:</p>
    <p style={{ color: "#cc0000" }}>{message}</p>
  </div>
);
