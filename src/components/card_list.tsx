import { useInfiniteQuery } from "@tanstack/react-query";
import InfiniteScroll from "react-infinite-scroll-component";

const getBooks = async ({ pageParam = 0 }) => {
  const res = await fetch(`http://localhost:8000/?page=${pageParam}&limit=10`);
  const data = await res.json();

  console.log("data: ", pageParam);

  return { ...data, prevPage: pageParam };
};

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
      loader={<p>...</p>}
    >
      {books &&
        books?.map((book: any) => (
          <div
            style={{ border: "1px solid black", margin: 14, padding: 15 }}
            key={book.id}
          >
            {book.title}
          </div>
        ))}
    </InfiniteScroll>
  );
}

export default CardList;
