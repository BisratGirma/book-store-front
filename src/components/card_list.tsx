import { useInfiniteQuery } from "@tanstack/react-query";
import InfiniteScroll from "react-infinite-scroll-component";
import { Book } from "../types/index";

import Card from "./card";
import styled from "styled-components";
import LoadingSpinner from "./loading";
import { useStore } from "../store";

const getBooks = async ({
  pageParam = 0,
  queryKey,
}: {
  pageParam: number | false;
  queryKey: string[];
}) => {
  let url = `https://bookstore-backend-d3x5.onrender.com/api/books/paginate/?page=${pageParam}&limit=10`;

  if (queryKey[0].length) url += `&search=${queryKey[0]}`;
  if (queryKey[1]) url += `&minPrice=${queryKey[1]}`;
  if (queryKey[2]) url += `&maxPrice=${queryKey[2]}`;

  console.log("url: ", url);

  const res = await fetch(url);
  const data = await res.json();

  return { ...data, prevPage: pageParam };
};

const CardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 16px;
  margin: 21px;
  padding-right: 27px;
  padding-left: 27px;
`;

function CardList() {
  const searchKey = useStore((state: any) => state.search);
  const minPrice = useStore((state: any) => state.minPrice);
  const maxPrice = useStore((state: any) => state.maxPrice);

  const { data, fetchNextPage, hasNextPage } = useInfiniteQuery({
    initialPageParam: 1,
    queryKey: [searchKey, minPrice, maxPrice],
    queryFn: getBooks,
    getNextPageParam: (lastPage) => {
      if (lastPage.prevPage * lastPage.itemsPerPage > lastPage.totalCount)
        return false;

      return lastPage.prevPage + 1;
    },
  });

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
      endMessage={<p>...</p>}
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
