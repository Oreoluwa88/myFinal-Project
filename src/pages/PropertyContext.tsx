import { createContext, useEffect, useState, type ReactNode } from "react";
import {
  getProperties,
  createProperty,
  approvePropertyApi,
} from "../api/propertyApi";

export interface Property {
  id: number;
  image: string;
  title: string;
  location: string;
  price: number;
  status: "Available" | "Occupied";
  approval: "Pending" | "Approved" | "Rejected";
  beds: number;
  baths: number;
}

interface PropertyContextType {
  properties: Property[];
  fetchProperties: () => Promise<void>;
  addProperty: (property: Omit<Property, "id">) => Promise<void>;
  approveProperty: (id: number) => Promise<void>;
}

export const PropertyContext = createContext<PropertyContextType | null>(null);

export function PropertyProvider({ children }: { children: ReactNode }) {
  const [properties, setProperties] = useState<Property[]>([]);

  // ✅ FETCH FROM API
  const fetchProperties = async () => {
    try {
      const data = await getProperties();
      setProperties(data);
    } catch (err) {
      console.error("Error fetching properties:", err);
    }
  };

  // ✅ ADD PROPERTY (API)
  const addProperty = async (property: Omit<Property, "id">) => {
    try {
      await createProperty(property);
      await fetchProperties(); // refresh list
    } catch (err) {
      console.error("Error adding property:", err);
    }
  };

  // ✅ APPROVE PROPERTY (API)
  const approveProperty = async (id: number) => {
    try {
      await approvePropertyApi(id);
      await fetchProperties();
    } catch (err) {
      console.error("Error approving property:", err);
    }
  };

  useEffect(() => {
    fetchProperties();
  }, []);

  return (
    <PropertyContext.Provider
      value={{
        properties,
        fetchProperties,
        addProperty,
        approveProperty,
      }}
    >
      {children}
    </PropertyContext.Provider>
  );
}
