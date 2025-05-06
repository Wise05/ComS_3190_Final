import React, { useEffect } from "react";

function Cart({ cart, setCart, cartTotal, setStep }) {
  const itemCounts = cart.reduce((acc, item) => {
    if (acc[item.id]) {
      acc[item.id].quantity += 1;
    } else {
      acc[item.id] = { ...item, quantity: 1 };
    }
    return acc;
  }, {});

  const groupedItems = Object.values(itemCounts);

  return (
    <div className="bg-black p-3 min-h-screen z-0 w-120 fixed right-0 top-10 pointer-events-auto">
      <div className="text-white flex min-width-auto font-bold text-2xl pl-4">
        <h2>Cart</h2>
        <button
          onClick={() => {
            setStep(null);
          }}
          className="ml-auto hover:bg-blue-500 rounded-full px-2"
        >
          X
        </button>
      </div>
      <div className="max-h-40 sm:max-h-60 md:max-h-140 text-black overflow-y-auto">
        {groupedItems.map((item) => {
          return (
            <div
              className="flex gap-5 my-2 px-2 py-3 bg-white rounded-lg h-lg"
              key={item.id}
            >
              <img src={item.image} alt={item.title} className="w-20" />
              <div>
                <p>{item.title}</p>
                <p>x{item.quantity}</p>
                <p>${item.price}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Cart;
