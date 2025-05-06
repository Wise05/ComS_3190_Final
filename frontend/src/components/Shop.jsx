import React, { useEffect, useState } from "react";
import Cart from "./Cart";

function Shop() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [cartTotal, setCartTotal] = useState(0.0);
  const [step, setStep] = useState(null);
  const [summaryData, setSummaryData] = useState({});

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

  const addToCart = (item) => {
    setCart([...cart, item]);
  };

  const removeFromCart = (item) => {
    let hardCopy = [...cart];
    hardCopy = hardCopy.filter((cartItem) => cartItem.id !== item.id);
    setCart(hardCopy);
  };

  const cartItems = cart.map((item) => (
    <div key={item.id}>
      <img className="img-fluid" src={item.image} width={150} />
      {item.title}${item.price}
    </div>
  ));

  const total = () => {
    let totalVal = 0;
    for (let i = 0; i < cart.length; i++) {
      totalVal += cart[i].price;
    }

    setCartTotal(totalVal.toFixed(2));
  };

  function howManyofThis(id) {
    let hmot = cart.filter((cartItem) => cartItem.id === id);
    return hmot.length;
  }

  const handlePayNowButton = () => {
    setStep("payment");
  };

  useEffect(() => {
    total();
  }, [cart]);

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
            <div className="flex">
              <button
                className="bg-blue-500 px-4 py-2 rounded-full font-semi-bold text-white hover:bg-blue-400 mr-auto"
                onClick={() => {
                  addToCart(product);
                  console.log(cart);
                }}
              >
                add to cart
              </button>
              {howManyofThis(product.id)}
            </div>
          </div>
        ))}
      </div>
      {step === null ? (
        <button
          type="button"
          onClick={() => {
            setStep("cart");
          }}
          className="fixed top-12 right-3 flex hover:bg-blue-500 hover:text-white pointer-events-auto z-2 px-3 py-1 gap-2 rounded-full"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
            />
          </svg>
          <p>View Cart</p>
        </button>
      ) : (
        ""
      )}
      {step == "cart" ? (
        <Cart
          cart={cart}
          setCart={setCart}
          cartTotal={cartTotal}
          setStep={setStep}
        />
      ) : (
        ""
      )}
    </div>
  );
}

export default Shop;
