import styled from "styled-components";
import { useStore } from "../store";

const HeroContainer = styled.div`
  height: 40vh; /* Adjust the height as needed */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  &::before {
    content: ""; /* Create a pseudo-element */
    background-image: url("https://th.bing.com/th/id/OIP.95WmsdaMmGMRUKIAvk0PBAHaEG?rs=1&pid=ImgDetMain");
    filter: blur(1px); /* Adjust the blur strength as needed */
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 40vh;
    z-index: -1; /* Place it behind the content */
  }
`;

const SearchForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 400px; /* Adjust as needed */
  width: 100%;
`;

const SearchInput = styled.input`
  flex: 1;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
  outline: none;
`;

const PriceInput = styled.div`
  display: flex;
  align-items: center;
  margin-top: 20px;
`;

const Label = styled.span`
  font-size: 16px;
  color: white;
  margin: 0 10px;
  text-shadow: 1px 1px black;
`;

const PriceField = styled.input`
  width: 50px;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
  outline: none;
`;

const HeroSection = () => {
  const setSearch = useStore((state: any) => state.setSearch);
  const setMinPrice = useStore((state: any) => state.setMinPrice);
  const setMaxPrice = useStore((state: any) => state.setMaxPrice);
  const searchValues = useStore((state: any) => state.search);

  const handleSearchSubmit = (e: any) => {
    e.preventDefault();

    setSearch(e.currentTarget.elements[0].value);
  };

  return (
    <HeroContainer>
      <SearchForm onSubmit={handleSearchSubmit}>
        <div style={{ display: "flex", alignItems: "center" }}>
          <Label>Title or Writer: </Label>
          <SearchInput
            type="text"
            placeholder="Search for books..."
            onChange={(e: any) => setSearch(e.target.value)}
          />
        </div>

        <PriceInput>
          <Label>Price: </Label>
          <PriceField
            type="number"
            min="0"
            onChange={(e) => setMinPrice(e.target.value)}
          />
          <Label>-</Label>
          <PriceField
            type="number"
            min="0"
            onChange={(e) => setMaxPrice(e.target.value)}
          />
        </PriceInput>
      </SearchForm>
    </HeroContainer>
  );
};

export default HeroSection;
