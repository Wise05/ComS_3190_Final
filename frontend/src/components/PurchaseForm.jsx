import React, { useState } from "react";

function PurchaseForm({
  cart,
  setCart,
  cartTotal,
  setStep,
  paymentInfo,
  setPaymentInfo,
}) {
  const [errorMessage, setErrorMessage] = useState("");

  // Initialize default values to ensure all inputs are controlled from the start
  const defaultPaymentInfo = {
    name: "",
    email: "",
    address1: "",
    address2: "",
    city: "",
    state: "",
    pincode: "",
    cardNumber: "",
    expiryDate: "",
    cvc: "",
  };

  // Use the provided paymentInfo or fall back to default values
  const formValues = paymentInfo || defaultPaymentInfo;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPaymentInfo({ ...formValues, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!/^\d{16}$/.test(formValues.cardNumber)) {
      setErrorMessage("Invalid card number. It should be 16 digits.");
      return;
    }

    if (!/^\d{2}\/\d{2}$/.test(formValues.expiryDate)) {
      setErrorMessage("Invalid expiry date. Use MM/YY format.");
      return;
    }

    if (!/^\d{3}$/.test(formValues.cvc)) {
      setErrorMessage("Invalid CVC. It should be 3 digits.");
      return;
    }

    try {
      const response = await fetch("http://localhost:8080/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          cart,
          cartTotal,
          paymentInfo: formValues,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Order successful:", data);
        setCart([]);
        setStep("");
        alert(data.message); // Or redirect to a success page
      } else {
        const errorData = await response.json();
        console.error("Order failed:", errorData);
        setErrorMessage(
          errorData.message || "Failed to place order. Please try again."
        );
      }
    } catch (error) {
      console.error("There was an error submitting the order:", error);
      setErrorMessage("Network error. Please check your connection.");
    }
  };

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
        <h2>Payment Info</h2>
        <button
          onClick={() => {
            setStep(null);
          }}
          className="ml-auto hover:bg-blue-500 rounded-full px-2"
        >
          X
        </button>
      </div>
      <div className="max-h-60 text-black overflow-y-auto">
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
      <div className="flex max-h-75 justify-center mt-1 text-white overflow-y-auto">
        <form onSubmit={handleSubmit} className="w-full max-w-5xl px-6">
          {/* Row 1: Name and Email */}
          <div className="flex gap-6 mb-4 ">
            <div className="w-1/2 ">
              <label className="block font-medium">
                Name<span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="name"
                value={formValues.name || ""}
                onChange={handleChange}
                className="border p-2 w-full"
                placeholder="Name"
                required
              />
            </div>
            <div className="w-1/2">
              <label className="block font-medium">
                Email<span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                name="email"
                value={formValues.email || ""}
                onChange={handleChange}
                className="border p-2 w-full"
                placeholder="Email"
                required
              />
            </div>
          </div>

          {/* Row 2: Address 1 and Address 2 */}
          <div className="flex gap-6 mb-4">
            <div className="w-1/2">
              <label className="block font-medium">
                Address Line 1<span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="address1"
                value={formValues.address1 || ""}
                onChange={handleChange}
                className="border p-2 w-full"
                placeholder="Street Address"
                required
              />
            </div>
            <div className="w-1/2">
              <label className="block font-medium">Address Line 2</label>
              <input
                type="text"
                name="address2"
                value={formValues.address2 || ""}
                onChange={handleChange}
                className="border p-2 w-full"
                placeholder="Apt, Suite, etc."
              />
            </div>
          </div>

          {/* Row 3: City, State, Pincode */}
          <div className="flex gap-6 mb-1">
            <div className="w-1/3">
              <label className="block font-medium">
                City<span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="city"
                value={formValues.city || ""}
                onChange={handleChange}
                className="border p-2 w-full"
                placeholder="City"
                required
              />
            </div>
            <div className="w-1/3">
              <label className="block font-medium">
                State<span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="state"
                value={formValues.state || ""}
                onChange={handleChange}
                className="border p-2 w-full"
                placeholder="State"
                required
              />
            </div>
            <div className="w-1/3">
              <label className="block font-medium">
                Pincode<span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="pincode"
                value={formValues.pincode || ""}
                onChange={handleChange}
                className="border p-2 w-full"
                placeholder="Pincode"
                required
              />
            </div>
          </div>

          <br />

          {/* Payment Info */}
          <div>
            <div className="space-y-4">
              <div>
                <label className="font-medium block">
                  Card Number<span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="cardNumber"
                  value={formValues.cardNumber || ""}
                  onChange={handleChange}
                  className="border p-2 w-full"
                  placeholder="1234 5678 9012 3456"
                  required
                />
              </div>
              <div>
                <label className="font-medium block">
                  Expiry Date (MM/YY)<span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="expiryDate"
                  value={formValues.expiryDate || ""}
                  onChange={handleChange}
                  className="border p-2 w-full"
                  placeholder="MM/YY"
                  required
                />
              </div>
              <div>
                <label className="font-medium block">
                  CVC<span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="cvc"
                  value={formValues.cvc || ""}
                  onChange={handleChange}
                  className="border p-2 w-full"
                  placeholder="123"
                  required
                />
              </div>
            </div>

            {errorMessage && (
              <div className="text-red-600 text-sm mt-4">
                <p>{errorMessage}</p>
              </div>
            )}

            <br />
            <div className="flex text-white">
              <div>
                <p>Base pay: ${cartTotal}</p>
                <p>Tax: ${(Number(cartTotal) * 0.07).toFixed(2)}</p>
                <p>
                  Total: $
                  {(Number(cartTotal) + Number(cartTotal) * 0.07).toFixed(2)}
                </p>
              </div>

              <button
                type="submit"
                className="ml-auto bg-blue-500 max-h-8 hover:bg-blue-400 py-1 px-2 rounded-full"
              >
                Pay
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default PurchaseForm;
