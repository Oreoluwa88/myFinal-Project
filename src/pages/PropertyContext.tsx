import { createContext, useEffect, useState } from "react";

export const PropertyContext = createContext<any>(null);

export function PropertyProvider({ children }: any) {
  const [properties, setProperties] = useState<any[]>(() => {
    const saved = localStorage.getItem("properties");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("properties", JSON.stringify(properties));
  }, [properties]);

  const addProperty = (property: any) => {
    setProperties((prev) => [
      ...prev,
      { ...property, id: Date.now() }
    ]);
  };

  const deleteProperty = (id: number) => {
    setProperties((prev) => prev.filter((p) => p.id !== id));
  };


  const editProperty = (id: number, updatedData: any) => {
    setProperties((prev) =>
      prev.map((p) =>
        p.id === id ? { ...p, ...updatedData } : p
      )
    );
  };

  return (
    <PropertyContext.Provider
      value={{
        properties,
        addProperty,
        deleteProperty,
        editProperty,
      }}
    >
      {children}
    </PropertyContext.Provider>
  );
}