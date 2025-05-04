import React, { useEffect, useState } from "react";

function Shop() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const getFakeMerch = async () => {
      try {
        const response = await fetch("https://fakestoreapi.com/products");

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
        setProducts([]);
      }
    };

    getFakeMerch();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-4xl font-bold text-center py-4">
        Support Artists by Buying Their Merch
      </h2>
      <div className="bg-blue-500 w-sm h-3 rounded-full my-3 mx-6"></div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-white rounded-2xl shadow-lg hover:shadow-xl hover:scale-105 transition p-4"
          >
            <img
              src={product.image}
              alt={product.title}
              className="h-40 mx-auto mb-4"
            />
            <h2 className="text-lg font-semibold">{product.title}</h2>
            <p className="text-gray-600">${product.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Shop;
