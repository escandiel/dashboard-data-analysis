import { collection, getDocs, getDoc, doc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import type { Product } from "@/types/product";

export async function getProducts(): Promise<Product[]> {
  const productsRef = collection(db, "products");
  const snapshot = await getDocs(productsRef);

  return snapshot.docs.map((docSnap) => {
    const data = docSnap.data() as Omit<Product, "id">;

    return {
      id: docSnap.id,
      ...data,
    };
  });
}

export async function getProductById(id: string): Promise<Product | null> {
  const productRef = doc(db, "products", id);
  const docSnap = await getDoc(productRef);

  if (!docSnap.exists()) {
    return null;
  }

  const data = docSnap.data() as Omit<Product, "id">;

  return {
    id: docSnap.id,
    ...data,
  };
}
