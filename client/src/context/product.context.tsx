import {
  createContext,
  useState,
  useEffect,
  useContext,
  PropsWithChildren,
} from "react";

// Define the structure of a Product
export interface Product {
  _id: string;
  title: string;
  description: string;
  price: number;
  image: string;
  inStock: number;
  categories: string[];
}

// Define the structure of a new product (for creating)
export interface NewProduct {
  title: string;
  description: string;
  price: number;
  image: string;
  inStock: number;
}

// Define the context for product-related operations
interface ProductContext {
  products: Product[];
  getAllProducts: () => Promise<void>;
  deleteProduct: (id: string) => Promise<void>;
  getProductById: (id: string) => Promise<Product | undefined>;
}

// Create the ProductContext with initial empty values and function stubs
const ProductContext = createContext<ProductContext>({
  products: [],
  getAllProducts: async () => {},
  deleteProduct: async () => {},
  getProductById: async () => undefined,
});

// Custom hook for using the ProductContext
export const useProductContext = () => useContext(ProductContext);

// ProductProvider component responsible for managing product-related state
const ProductProvider = ({ children }: PropsWithChildren) => {
  // State to hold the list of products
  const [products, setProducts] = useState<Product[]>([]);

  // Function to fetch all products from the server
  // I added the reverse just because I liked the last products better!!
  const getAllProducts = async () => {
    try {
      const response = await fetch("api/products");
      const data = await response.json();
      setProducts(data.reverse());
    } catch (err) {
      console.log(err);
    }
  };

  // Function to delete a product by ID from the server
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

  // Function to fetch a product by ID from the server
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

  // Fetch all products when the component mounts
  useEffect(() => {
    getAllProducts();
  }, []);

  // Provide the ProductContext with values to the components in the tree
  return (
    <ProductContext.Provider
      value={{ products, getAllProducts, deleteProduct, getProductById }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export default ProductProvider;
