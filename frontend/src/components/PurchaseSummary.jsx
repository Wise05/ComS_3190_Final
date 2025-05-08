import React from "react";

function PurchaseSummary({ cart, cartTotal, setStep, paymentInfo }) {
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
        <h2>Thank you!</h2>
        <button
          onClick={() => {
            setStep(null);
          }}
          className="ml-auto hover:bg-blue-500 rounded-full px-2"
        >
          X
        </button>
      </div>
      <div className="bg-white shadow-md rounded-lg p-6">
        <h3 className="text-2xl font-semibold mb-4">User Information</h3>
        <p>
          <span className="font-medium">Name:</span> {paymentInfo.name}
        </p>
        <p>
          <span className="font-medium">Email:</span> {paymentInfo.email}
        </p>
        <p>
          <span className="font-medium">Shipping Address:</span>{" "}
          {paymentInfo.address1},{" "}
          {paymentInfo?.address2 && `${paymentInfo.address2}, `}
          {paymentInfo?.city}, {paymentInfo?.state} - {paymentInfo?.pincode}
        </p>
      </div>

      {/* Order Review Section */}
      <div className="max-h-80 text-black overflow-y-auto">
        {groupedItems.map((item) => {
          return (
            <div
              className="relative flex gap-5 my-2 px-2 py-3 bg-white rounded-lg h-lg"
              key={item.id}
            >
              <div className="flex gap-3 max-h-40 overflow-y-auto">
                <p>{item.title}</p>
                <div className="w-auto ml-auto text-right">
                  <p>x{item.quantity}</p>
                  <p>${item.price}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="flex text-white">
        <div>
          <p>Base pay: ${cartTotal}</p>
          <p>Tax: {"$" + (Number(cartTotal) * 0.07).toFixed(2)}</p>
          <p>
            Total:{" "}
            {"$" + (Number(cartTotal) + Number(cartTotal) * 0.07).toFixed(2)}
          </p>
        </div>
        <button
          onClick={() => {
            setStep(null);
          }}
          className="ml-auto bg-blue-500 max-h-8 hover:bg-blue-400 py-1 px-2 rounded-full"
        >
          Done
        </button>
      </div>
    </div>
  );
}

export default PurchaseSummary;
