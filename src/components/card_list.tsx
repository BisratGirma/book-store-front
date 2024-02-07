import { useState, useEffect } from "react";
import axios from "axios";

const Base_URL = "https://jsonplaceholder.typicode.com/albums";

function CardList() {
  const [movies, setMovies] = useState<any[]>([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const getMovies = (page: number) => {
      axios
        .get(`${Base_URL}&s=avengers&page=${page}`)
        .then((response) => {
          if (page > 1) {
            let arr = [...movies, ...response.data.Search];
            setMovies(arr);
          } else {
            setMovies(response.data.Search);
          }
        })
        .catch((error) => {
          console.log("GET request failed");
        });
    };

    getMovies(page);
  }, [page]);
  return <div>CardList</div>;
}

export default CardList;
