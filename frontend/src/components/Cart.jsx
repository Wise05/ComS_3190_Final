import React, { useEffect } from "react";

function Cart({ cart, cartTotal, setStep, removeFromCart }) {
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
      {cart.length !== 0 ? (
        <div>
          <div className="max-h-60 md:max-h-125 text-black overflow-y-auto">
            {groupedItems.map((item) => {
              return (
                <div
                  className="relative flex gap-5 my-2 px-2 py-3 bg-white rounded-lg h-lg"
                  key={item.id}
                >
                  <img src={item.image} alt={item.title} className="w-20" />
                  <div>
                    <p>{item.title}</p>
                    <p>x{item.quantity}</p>
                    <p>${item.price}</p>
                    <button
                      onClick={() => {
                        removeFromCart(item);
                      }}
                      className="absolute bottom-1 right-1 bg-gray-200 hover:bg-blue-500 hover:text-white rounded-full px-2 py-1"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="flex text-white mt-5">
            <p>Total: ${cartTotal}</p>
            <button
              onClick={() => {
                setStep("form");
              }}
              className="ml-auto bg-blue-500 hover:bg-blue-400 py-1 px-2 rounded-full"
            >
              Go to Payment
            </button>
          </div>
        </div>
      ) : (
        <p className="text-white">Cart is empty</p>
      )}
    </div>
  );
}

export default Cart;
