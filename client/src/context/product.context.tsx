import {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useEffect,
  useState,
  PropsWithChildren,
} from "react";

//INTERFACES
export interface Product {
  id: string;
  name: string;
  description: string;
  images: [];
  default_price: Price;
  price: Price;
}

export interface Price {
  id: string;
  unit_amount: string;
  currency: string;
}

//CONTEXT
export interface ProductContext {
  products: Product[];
  setProducts: Dispatch<SetStateAction<Product[]>>;
  fetchProducts: () => void;
}

//DEFAULT VALUES
const defaultValues = {
  products: [],
  setProducts: () => {},
  fetchProducts: () => {},
};

//CREATE AND USE CONTEXT
export const ProductContext = createContext<ProductContext>(defaultValues);
export const useProductContext = () => useContext(ProductContext);

//PROVIDER
export const ProductProvider = ({ children }: PropsWithChildren<{}>) => {
  const [products, setProducts] = useState<Product[]>([]);

  //GET LIST OF PRODUCTS
  const fetchProducts = async () => {
    try {
      const response = await fetch("api/products");
      const data = await response.json();

      const productList = data.data.map((product: Product) => ({
        name: product.name,
        description: product.description,
        images: product.images,
        id: product.id,
        price: {
          currency: product.default_price.currency,
          unit_amount: (
            parseFloat(product.default_price.unit_amount) / 100
          ).toFixed(2),
          id: product.default_price.id,
        },
      }));

      setProducts(productList);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <ProductContext.Provider value={{ products, setProducts, fetchProducts }}>
      {children}
    </ProductContext.Provider>
  );
};

export default ProductProvider;
