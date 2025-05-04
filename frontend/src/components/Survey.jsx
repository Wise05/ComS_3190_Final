import React, { useState } from "react";

function Survey() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    favoriteArtist: "",
    websiteRating: 0,
    shoppingExperienceRating: 0,
    featuresLiked: "",
    suggestions: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleStarClick = (field, rating) => {
    setFormData((prev) => ({ ...prev, [field]: rating }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:8080/survey", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const result = await response.json();
        console.log("Survey submitted:", result);
        alert("Thank you for your feedback!");

        setFormData({
          name: "",
          email: "",
          favoriteArtist: "",
          websiteRating: 0,
          shoppingExperienceRating: 0,
          featuresLiked: "",
          suggestions: "",
        });
      } else {
        alert("Something went wrong. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting survey:", error);
      alert("Failed to submit survey.");
    }
  };

  return (
    <div className='flex flex-col items-center mt-10'>
      <h1 className='text-2xl font-bold mb-6'>Melodify - User Survey</h1>
      <form
        onSubmit={handleSubmit}
        className='flex flex-col gap-4 w-full max-w-md'>
        <label>
          Name:
          <input
            type='text'
            name='name'
            value={formData.name}
            onChange={handleChange}
            className='border p-2 w-full'
            required
          />
        </label>

        <label>
          Email:
          <input
            type='email'
            name='email'
            value={formData.email}
            onChange={handleChange}
            className='border p-2 w-full'
            required
          />
        </label>

        <label>
          Favorite Artist:
          <input
            type='text'
            name='favoriteArtist'
            value={formData.favoriteArtist}
            onChange={handleChange}
            className='border p-2 w-full'
            required
          />
        </label>

        {/* Website Rating */}
        <label className='flex flex-col'>
          How would you rate our website?
          <div className='flex space-x-2 mt-2'>
            {[1, 2, 3, 4, 5].map((star) => (
              <span
                key={`website-${star}`}
                onClick={() => handleStarClick("websiteRating", star)}
                style={{
                  fontSize: "2rem",
                  cursor: "pointer",
                  color: star <= formData.websiteRating ? "gold" : "gray",
                }}>
                ★
              </span>
            ))}
          </div>
        </label>

        {/* Shopping Experience Rating */}
        <label className='flex flex-col'>
          How would you rate your shopping experience?
          <div className='flex space-x-2 mt-2'>
            {[1, 2, 3, 4, 5].map((star) => (
              <span
                key={`shopping-${star}`}
                onClick={() =>
                  handleStarClick("shoppingExperienceRating", star)
                }
                style={{
                  fontSize: "2rem",
                  cursor: "pointer",
                  color:
                    star <= formData.shoppingExperienceRating ? "gold" : "gray",
                }}>
                ★
              </span>
            ))}
          </div>
        </label>

        <label>
          What features did you like the most?
          <textarea
            name='featuresLiked'
            value={formData.featuresLiked}
            onChange={handleChange}
            className='border p-2 w-full'
            rows='3'
            required
          />
        </label>

        <label>
          Any suggestions for us?
          <textarea
            name='suggestions'
            value={formData.suggestions}
            onChange={handleChange}
            className='border p-2 w-full'
            rows='3'
          />
        </label>

        <button
          type='submit'
          className='bg-blue-500 text-white p-2 rounded hover:bg-blue-600'>
          Submit Survey
        </button>
      </form>
    </div>
  );
}

export default Survey;
