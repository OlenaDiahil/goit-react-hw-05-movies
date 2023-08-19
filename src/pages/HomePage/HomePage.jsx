import debounce from "lodash.debounce";
import { MainSection, Title, TopBlock } from "../../app.styled";
import ProductsList from "../../components/ProductsList/ProductsList";
import Search from "../../components/Search/Search";
import { useStateContext } from "../../context/StateContext";

export default function HomePage() {
  const { searchQuery, setSearchQuery } = useStateContext();

  const handleChangeSearchQuery = debounce((searchQuery) => {
    setSearchQuery(searchQuery);
  }, 1000);

  return (
    <MainSection>
      <TopBlock>
        <Title>Products</Title>
        <Search searchQuery={searchQuery} onChange={handleChangeSearchQuery} />
      </TopBlock>

      <ProductsList searchQuery={searchQuery} />
    </MainSection>
  );
}
