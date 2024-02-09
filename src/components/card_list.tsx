import { useInfiniteQuery } from "@tanstack/react-query";
import InfiniteScroll from "react-infinite-scroll-component";
import { Book } from "../types/index";

import Card from "./card";
import styled from "styled-components";
import LoadingSpinner from "./loading";

// 3.75.158.163
// 3.125.183.140
// 35.157.117.28
// const [];
const getBooks = async ({
  pageParam = 0,
  queryKey,
}: {
  pageParam: number;
  queryKey: string[];
}) => {
  let url = `https://bookstore-backend-d3x5.onrender.com/api/books/paginate/?page=${pageParam}&limit=10`;

  if (queryKey[1].length) url += `&search=${queryKey[1]}`;

  const res = await fetch(url);
  const data = await res.json();

  return { ...data, prevPage: pageParam };
};

const CardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 16px;
`;

function CardList({ search }: { search: string }) {
  const { data, fetchNextPage, hasNextPage } = useInfiniteQuery({
    initialPageParam: 1,
    queryKey: ["books", search],
    queryFn: getBooks,
    getNextPageParam: (lastPage) => {
      console.log(
        "this true: ",
        lastPage.prevPage * lastPage.itemsPerPage > lastPage.totalCount
      );
      if (lastPage.prevPage * lastPage.itemsPerPage > lastPage.totalCount)
        return false;

      console.log("this page: ", lastPage.prevPage + 1);
      return lastPage.prevPage + 1;
    },
  });

  console.log("has more: ", hasNextPage);

  const books = data?.pages.reduce((acc, page) => {
    if (page?.documents?.length > 1) return [...acc, ...page.documents];
    else if (Array.isArray(page?.documents) && page?.documents?.length === 1)
      return page.documents;
    else return [];
  }, []);

  return (
    <InfiniteScroll
      dataLength={books?.Length ?? 0}
      next={() => fetchNextPage()}
      hasMore={hasNextPage}
      loader={LoadingSpinner()}
      endMessage={<p>Nothing more to show</p>}
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
