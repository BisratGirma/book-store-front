import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useStore } from "../store";
import { useNavigate } from "react-router";

const OrderBookList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const OrderBookItem = styled.li`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
  width: 400px;
  border-bottom: 1px solid #eee;
`;

const BookTitle = styled.span`
  font-size: 18px;
  font-weight: bold;
  margin-right: 10px;
  color: black;
`;

const BookAuthor = styled.span`
  font-size: 16px;
  color: gray;
`;

const BookPrice = styled.span`
  font-size: 18px;
  color: green;
`;

function OrderBookComponent() {
  const [orderBooks, setOrderBooks] = useState([]);
  const navigate = useNavigate();
  const authenticated = useStore((state: any) => state.user?.jwt);
  const [errorMessage, setErrorMessage] = useState("");

  const cancelOrder = async (bookID: number) => {
    try {
      let url = `https://bookstore-backend-d3x5.onrender.com/api/order/${bookID}`;

      var myHeaders = new Headers();
      myHeaders.append("Authorization", `Bearer ${authenticated}`);
      myHeaders.append("Content-Type", "application/json");

      const requestOptions: RequestInit = {
        method: "DELETE",
        headers: myHeaders,
        redirect: "follow",
      };

      const response = await fetch(url, requestOptions);
      const data = await response.json();

      if (response.status === 200)
        setOrderBooks(orderBooks.filter((_book: any) => _book.id !== bookID));
      else navigate("/");
    } catch (error) {}
  };

  // Fetch the order books from an API when the component mounts
  useEffect(() => {
    async function fetchOrderBooks() {
      try {
        let url = `https://bookstore-backend-d3x5.onrender.com/api/order/paginate`;

        var myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${authenticated}`);
        myHeaders.append("Content-Type", "application/json");

        const requestOptions: RequestInit = {
          method: "GET",
          headers: myHeaders,
          redirect: "follow",
        };

        const response = await fetch(url, requestOptions);
        const data = await response.json();

        if (response.status === 200) setOrderBooks(data.order);
        else setErrorMessage(data.message ?? "please try again later");
      } catch (error) {
        setErrorMessage("server error");
      }
    }
    fetchOrderBooks();
  }, []);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        marginTop: 70,
      }}
    >
      {errorMessage.length > 0 && ErrorMessage({ message: errorMessage })}
      <h1>My Orders</h1>
      <OrderBookList>
        {orderBooks.length ? (
          orderBooks?.map((book: any) => (
            <OrderBookItem key={book.id}>
              <div>
                <BookTitle>{book.title}</BookTitle>
                <BookAuthor>by {book.writer}</BookAuthor>
              </div>
              <BookPrice>${book.point}</BookPrice>

              <RemoveButton onClick={() => cancelOrder(book._id)}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 50 50"
                  width="50px"
                  height="50px"
                >
                  <path d="M 21 0 C 19.355469 0 18 1.355469 18 3 L 18 5 L 10.1875 5 C 10.0625 4.976563 9.9375 4.976563 9.8125 5 L 8 5 C 7.96875 5 7.9375 5 7.90625 5 C 7.355469 5.027344 6.925781 5.496094 6.953125 6.046875 C 6.980469 6.597656 7.449219 7.027344 8 7 L 9.09375 7 L 12.6875 47.5 C 12.8125 48.898438 14.003906 50 15.40625 50 L 34.59375 50 C 35.996094 50 37.1875 48.898438 37.3125 47.5 L 40.90625 7 L 42 7 C 42.359375 7.003906 42.695313 6.816406 42.878906 6.503906 C 43.058594 6.191406 43.058594 5.808594 42.878906 5.496094 C 42.695313 5.183594 42.359375 4.996094 42 5 L 32 5 L 32 3 C 32 1.355469 30.644531 0 29 0 Z M 21 2 L 29 2 C 29.5625 2 30 2.4375 30 3 L 30 5 L 20 5 L 20 3 C 20 2.4375 20.4375 2 21 2 Z M 11.09375 7 L 38.90625 7 L 35.3125 47.34375 C 35.28125 47.691406 34.910156 48 34.59375 48 L 15.40625 48 C 15.089844 48 14.71875 47.691406 14.6875 47.34375 Z M 18.90625 9.96875 C 18.863281 9.976563 18.820313 9.988281 18.78125 10 C 18.316406 10.105469 17.988281 10.523438 18 11 L 18 44 C 17.996094 44.359375 18.183594 44.695313 18.496094 44.878906 C 18.808594 45.058594 19.191406 45.058594 19.503906 44.878906 C 19.816406 44.695313 20.003906 44.359375 20 44 L 20 11 C 20.011719 10.710938 19.894531 10.433594 19.6875 10.238281 C 19.476563 10.039063 19.191406 9.941406 18.90625 9.96875 Z M 24.90625 9.96875 C 24.863281 9.976563 24.820313 9.988281 24.78125 10 C 24.316406 10.105469 23.988281 10.523438 24 11 L 24 44 C 23.996094 44.359375 24.183594 44.695313 24.496094 44.878906 C 24.808594 45.058594 25.191406 45.058594 25.503906 44.878906 C 25.816406 44.695313 26.003906 44.359375 26 44 L 26 11 C 26.011719 10.710938 25.894531 10.433594 25.6875 10.238281 C 25.476563 10.039063 25.191406 9.941406 24.90625 9.96875 Z M 30.90625 9.96875 C 30.863281 9.976563 30.820313 9.988281 30.78125 10 C 30.316406 10.105469 29.988281 10.523438 30 11 L 30 44 C 29.996094 44.359375 30.183594 44.695313 30.496094 44.878906 C 30.808594 45.058594 31.191406 45.058594 31.503906 44.878906 C 31.816406 44.695313 32.003906 44.359375 32 44 L 32 11 C 32.011719 10.710938 31.894531 10.433594 31.6875 10.238281 C 31.476563 10.039063 31.191406 9.941406 30.90625 9.96875 Z" />
                </svg>
              </RemoveButton>
            </OrderBookItem>
          ))
        ) : (
          <>
            <p>No Items added yet</p>
          </>
        )}
      </OrderBookList>
      <button
        style={{
          backgroundColor: "#007bff",
          color: "#fff",
          border: "none",
          borderRadius: 4,
          padding: "10px 20px",
          cursor: "pointer",
          marginTop: "20px",
        }}
        onClick={() => navigate("/")}
      >
        Browse more Books
      </button>
    </div>
  );
}

export default OrderBookComponent;

const RemoveButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border: none;
  border-radius: 50%;
  background-color: #ff4500;
  color: white;
  cursor: pointer;
  fill: white;
`;

const ErrorMessage = ({ message }: { message: string }) => (
  <div
    style={{ backgroundColor: "#ffcccc", padding: "10px", textAlign: "center" }}
  >
    <p style={{ color: "#cc0000", fontWeight: "bold" }}>Login Failed:</p>
    <p style={{ color: "#cc0000" }}>{message}</p>
  </div>
);
