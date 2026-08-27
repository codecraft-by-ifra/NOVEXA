import React, { useState, useEffect } from 'react'

export default function DescriptionBox({ productId }) {
  const [activeTab, setActiveTab] = useState("Description");
  const [reviews, setReviews] = useState([]);
  const [averageRating, setAverageRating] = useState(0);
  const [totalReviews, setTotalReviews] = useState(0);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const fetchReviews = () => {
    if (!productId) return;

    fetch(`http://localhost:4000/reviews/${productId}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setReviews(data.reviews);
          setAverageRating(data.averageRating);
          setTotalReviews(data.totalReviews);
        }
      });
  };

  useEffect(() => {
    fetchReviews();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productId]);

  const submitReview = async () => {
    const token = localStorage.getItem("auth-token");
    if (!token) {
      alert("Please login to write a review");
      return;
    }

    if (rating === 0) {
      alert("Please select a rating");
      return;
    }

    setSubmitting(true);
    try {
      const response = await fetch("http://localhost:4000/addreview", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": token,
        },
        body: JSON.stringify({ productId, rating, comment }),
      });

      const data = await response.json();

      if (data.success) {
        setComment("");
        setRating(0);
        fetchReviews();
      } else {
        alert(data.error || "Failed to submit review");
      }
    } catch (error) {
      alert("Something went wrong. Try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col mt-10 w-full">
      <div className="flex items-center gap-8 border-b border-gray-200">
        <div
          onClick={() => setActiveTab("Description")}
          className={`pb-4 text-sm md:text-base font-semibold cursor-pointer transition-colors border-b-2
            ${activeTab === "Description"
              ? "text-gray-900 border-red-500"
              : "text-gray-400 border-transparent hover:text-gray-600"
            }`}
        >
          Description
        </div>
        <div
          onClick={() => setActiveTab("Reviews")}
          className={`pb-4 text-sm md:text-base font-semibold cursor-pointer transition-colors border-b-2
            ${activeTab === "Reviews"
              ? "text-gray-900 border-red-500"
              : "text-gray-400 border-transparent hover:text-gray-600"
            }`}
        >
          Reviews ({totalReviews})
        </div>
      </div>

      <div className="flex flex-col gap-4 py-6 max-w-3xl">
        {activeTab === "Description" ? (
          <p className="text-gray-500 text-sm md:text-base leading-relaxed m-0">
            An E-commerce website is an online platform that facilitates the buying and selling of products or services over the internet. It serves as a virtual marketplace where businesses and individuals can showcase their products, interact with customers, and conduct transactions without the need for a physical presence.
          </p>
        ) : (
          <div className="flex flex-col gap-6">
            {totalReviews > 0 && (
              <div className="flex items-center gap-2">
                <span className="text-2xl font-bold text-gray-900">{averageRating}</span>
                <span className="text-yellow-400 text-lg">
                  {"★".repeat(Math.round(averageRating))}
                  {"☆".repeat(5 - Math.round(averageRating))}
                </span>
                <span className="text-gray-400 text-sm">({totalReviews} reviews)</span>
              </div>
            )}

            <div className="flex flex-col gap-3 border border-gray-200 rounded-xl p-4">
              <p className="text-sm font-semibold text-gray-700 m-0">Write a review</p>
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <span
                    key={star}
                    onClick={() => setRating(star)}
                    className="text-2xl cursor-pointer"
                    style={{ color: star <= rating ? "#facc15" : "#e5e7eb" }}
                  >
                    ★
                  </span>
                ))}
              </div>
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Share your thoughts about this product..."
                rows={3}
                className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm outline-none focus:border-red-400 resize-none"
              />
              <button
                onClick={submitReview}
                disabled={submitting}
                className="self-start px-5 py-2 rounded-full bg-red-500 text-white text-sm font-semibold cursor-pointer hover:bg-red-600 disabled:opacity-60"
              >
                {submitting ? "Submitting..." : "Submit Review"}
              </button>
            </div>

            <div className="flex flex-col gap-4">
              {reviews.length === 0 && (
                <p className="text-gray-400 text-sm">No reviews yet. Be the first to review!</p>
              )}
              {reviews.map((r) => (
                <div key={r._id} className="border-b border-gray-100 pb-4">
                  <div className="flex items-center gap-2">
                    <span className="text-gray-800 font-semibold text-sm">{r.userName}</span>
                    <span className="text-yellow-400 text-sm">
                      {"★".repeat(r.rating)}
                      {"☆".repeat(5 - r.rating)}
                    </span>
                  </div>
                  <p className="text-gray-500 text-sm mt-1 m-0">{r.comment}</p>
                  <p className="text-gray-300 text-xs mt-1 m-0">
                    {new Date(r.date).toLocaleDateString()}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}