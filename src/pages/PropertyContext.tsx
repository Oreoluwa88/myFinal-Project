import { createContext, useEffect, useState, type ReactNode } from "react";

export interface Property {
  id: number;
  image: string;
  title: string;
  location: string;
  price: number | string;
  status: "Available" | "Occupied";
  beds: number;
  baths: number;
}

interface PropertyContextType {
  properties: Property[];
  addProperty: (property: Omit<Property, "id">) => void;
  deleteProperty: (id: number) => void;
  editProperty: (id: number, updated: Partial<Property>) => void;
}

export const PropertyContext = createContext<PropertyContextType | null>(null);

export function PropertyProvider({ children }: { children: ReactNode }) {
  const [properties, setProperties] = useState<Property[]>(() => {
    try {
      const saved = localStorage.getItem("properties");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("properties", JSON.stringify(properties));
  }, [properties]);

  const addProperty = (property: Omit<Property, "id">) => {
    setProperties((prev) => [
      ...prev,
      { ...property, id: Date.now() },
    ]);
  };

  const deleteProperty = (id: number) => {
    setProperties((prev) => prev.filter((p) => p.id !== id));
  };

  const editProperty = (id: number, updated: Partial<Property>) => {
    setProperties((prev) =>
      prev.map((p) => (p.id === id ? { ...p, ...updated } : p))
    );
  };

  return (
    <PropertyContext.Provider
      value={{ properties, addProperty, deleteProperty, editProperty }}
    >
      {children}
    </PropertyContext.Provider>
  );
}