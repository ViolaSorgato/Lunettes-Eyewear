import {
  createContext,
  useState,
  useEffect,
  useContext,
  PropsWithChildren,
} from "react";

export interface Product {
  _id: string;
  title: string;
  description: string;
  price: number;
  image: string;
  inStock: number;
  categories: string[];
}

export interface NewProduct {
  title: string;
  description: string;
  price: number;
  image: string;
  inStock: number;
}

interface ProductContext {
  products: Product[];
  getAllProducts: () => Promise<void>;
  deleteProduct: (id: string) => Promise<void>;
  getProductById: (id: string) => Promise<Product | undefined>;
}

const ProductContext = createContext<ProductContext>({
  products: [],
  getAllProducts: async () => {},
  deleteProduct: async () => {},
  getProductById: async () => undefined,
});

export const useProductContext = () => useContext(ProductContext);

const ProductProvider = ({ children }: PropsWithChildren) => {
  const [products, setProducts] = useState<Product[]>([]);

  const getAllProducts = async () => {
    try {
      const response = await fetch("api/products");
      const data = await response.json();
      setProducts(data.reverse());
    } catch (err) {
      console.log(err);
    }
  };

  const deleteProduct = async (id: string) => {
    const url = "api/products/" + id;
    try {
      const response = await fetch(url, { method: "DELETE" });
      if (!response) {
        throw new Error(
          "ERROR - Something went wrong, the product with " +
            id +
            " is not deleted"
        );
      }
      await getAllProducts(); // Refresh the list after deletion
    } catch (e) {
      console.log(e);
    }
  };

  const getProductById = async (id: string): Promise<Product | undefined> => {
    try {
      const response = await fetch(`api/products/${id}`);
      const data = await response.json();
      return data;
    } catch (err) {
      console.log(err);
      return undefined;
    }
  };

  useEffect(() => {
    getAllProducts();
  }, []);

  return (
    <ProductContext.Provider
      value={{ products, getAllProducts, deleteProduct, getProductById }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export default ProductProvider;
