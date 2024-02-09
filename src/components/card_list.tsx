import { useInfiniteQuery } from "@tanstack/react-query";
import InfiniteScroll from "react-infinite-scroll-component";
import { Book } from "../types/index";

import Card from "./card";
import styled from "styled-components";
import LoadingSpinner from "./loading";

const getBooks = async ({ pageParam = 0 }) => {
  const res = await fetch(`http://localhost:8000/?page=${pageParam}&limit=10`);
  const data = await res.json();

  console.log("data: ", pageParam);

  return { ...data, prevPage: pageParam };
};

const CardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 16px;
`;

function CardList() {
  const { data, fetchNextPage, hasNextPage } = useInfiniteQuery({
    initialPageParam: 1,
    queryKey: ["books"],
    queryFn: getBooks,
    getNextPageParam: (lastPage) => {
      if (lastPage.prevPage * lastPage.itemsPerPage > lastPage.totalCount)
        return false;

      console.log("true");

      return lastPage.prevPage + 1;
    },
  });

  const books = data?.pages.reduce((acc, page) => {
    return [...acc, ...page.documents];
  }, []);

  return (
    <InfiniteScroll
      dataLength={books?.Length ?? 0}
      next={() => fetchNextPage()}
      hasMore={hasNextPage}
      loader={LoadingSpinner()}
    >
      <CardGrid>
        {books &&
          books.map((book: Book) => (
            <div key={book.id}>{<Card {...book} />}</div>
          ))}
      </CardGrid>
    </InfiniteScroll>
  );
}

export default CardList;
