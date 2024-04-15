import { useEffect, useState } from "react";
import { Product } from "../types/Product";

const useDebounceSearch = <T>(
  searchFunction: (items: T[], searchTerm: string) => T[],
  items: T[],
  delayTime: number = 1000
) => {
  const [searchResults, setSearchResults] = useState(items);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const searchTimer = setTimeout(() => {
      setSearchResults(searchFunction(items, searchTerm));
    }, delayTime);

    return () => clearTimeout(searchTimer);
  }, [searchTerm, searchFunction, items, delayTime]);

  const handleSearchInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSearchTerm(event.target.value);
  };

  return { handleSearchInputChange, searchTerm, searchResults };
};

const filterProductsByTitle = (products: Product[], searchTerm: string) => {
  return products.filter((product) =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase())
  );
};

export { useDebounceSearch, filterProductsByTitle };
