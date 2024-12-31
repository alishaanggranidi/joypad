'use client'
import React, { useState } from 'react';
import debounce from 'lodash/debounce';
import "../../../styles/review.css";
import Header from "../../header.js";
import Footer from "../../footer.js";

const Review = () => {
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [rating, setRating] = useState(0);
  const [reviewTitle, setReviewTitle] = useState('');
  const [reviewContent, setReviewContent] = useState('');

  const ratings = [
    { stars: 5, count: 93 },
    { stars: 4, count: 42 },
    { stars: 3, count: 14 },
    { stars: 2, count: 1 },
    { stars: 1, count: 0 }
  ];

  const [reviews, setReviews] = useState([
    {
      id: 1,
      author: "Fadhilahrtk",
      rating: 5,
      title: "Excellent booking experience!",
      content: "This game house reservation platform is very easy to use and responsive. Fast booking process, intuitive interface, and a wide selection of games. The payment system is secure, and customer support is very helpful. I can immediately choose the game room according to my wishes without any hassle.",
      date: "2 days ago",
      avatar: "/api/placeholder/40/40"
    },
    {
      id: 2,
      author: "Xavierzh",
      rating: 5,
      title: "Excellent Experience, Highly Recommend!",
      content: "Highly recommend this place to anyone looking for a fun and hassle-free gaming experience! I had an amazing time at the gaming venue! The setup was flawless, with all the equipment working perfectly, and the atmosphere was vibrant and exciting.",
      date: "1 week ago",
      avatar: "/api/placeholder/40/40"
    },
    {
      id: 3,
      author: "Angelsxv",
      rating: 4,
      title: "Pretty good reservation system",
      content: "Solid reservation website with many advantages. Attractive design, quite complete game selection, and relatively easy booking process. A little slow during peak hours and sometimes there are connection problems. Prices are still affordable with good service quality.",
      date: "5 week ago",
      avatar: "/api/placeholder/40/40"
    },
    {
      id: 4,
      author: "Bobby ",
      rating: 3,
      title: "My experience at the gaming venue was decent",
      content: "The gaming equipment was mostly in good condition, and the environment was enjoyable. However, there were a few hiccups during gameplay, such as some minor technical glitches that interrupted the flow.",
      date: "7 month ago",
      avatar: "/api/placeholder/40/40"
    },
    {
      id: 5,
      author: "Uncle.dx",
      rating: 2,
      title: "Disappointing Experience at the Gaming Venue",
      content: "My experience at the gaming venue was less than satisfying. While the atmosphere was good, the overall journey during the game was frustrating. The game setup was not smooth, and there were technical issues that disrupted the flow of the experience.",
      date: "7 month ago",
      avatar: "/api/placeholder/40/40"
    },
  ]);
  const addReview = (newReview) => {
    setReviews((prevReviews) => [
      ...prevReviews,
      { ...newReview, id: prevReviews.length + 1, date: "Just now", avatar: "/api/placeholder/40/40" },
    ]);
    console.log("Review submitted:", review);
  };  
  

  const calculateAverageRating = () => {
    const totalStars = ratings.reduce((acc, curr) => acc + (curr.stars * curr.count), 0);
    const totalReviews = ratings.reduce((acc, curr) => acc + curr.count, 0);
    return (totalStars / totalReviews).toFixed(1);
  };

  const renderStars = (count) => (
    <div className="flex gap-1">
      {[...Array(5)].map((_, index) => (
        <span key={index} className="text-yellow-400 text-lg">
          {index < count ? "★" : "☆"}
        </span>
      ))}
    </div>
  );

  const ReviewCard = ({ review, index }) => (
    <div 
    className="rounded-[20px] p-5 mb-4 transition-transform duration-300 hover:scale-[1.02] cursor-pointer"
    style={{
      background: 'rgba(235, 223, 239, 0.95)',
      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)',
      transform: 'scale(1)', // Base scale
    }}
  >
    <div className="flex justify-between items-start mb-3">
      <div className="flex items-center gap-3">
        <img
          src={'image/user.png'}
          alt={`${review.author}'s avatar`}
          className="w-8 h-8 rounded-full"
          style={{ 
            filter: 'brightness(0) saturate(100%) invert(31%) sepia(0%) saturate(0%) hue-rotate(152deg) brightness(98%) contrast(93%)'
          }}
        />
        <div className="flex flex-col -gap-1">
          <h3 className="text-[#686767] font-medium font-weight text-base mb-0 text-shadow-custom">{review.author}</h3>
          <div className="flex">
            {[...Array(5)].map((_, index) => (
              <span key={index} className="text-yellow-400 text-base leading-none">
                {index < review.rating ? "★" : "☆"}
              </span>
            ))}
          </div>
        </div>
      </div>
      <span className="text-[#686767] text-sm mt-2.5">{review.date}</span>
    </div>
    <h4 className="text-base font-semibold text-[#686767] mb-2">{review.title}</h4>
<p className="text-[#686767] text-sm leading-relaxed font-normal">{review.content}</p>
  </div>
  );

  const ReviewModal = () => {
  const [modalRating, setModalRating] = useState(0);
  const [modalReviewTitle, setModalReviewTitle] = useState("");
  const [modalReviewContent, setModalReviewContent] = useState("");

  const isSubmitDisabled = modalRating === 0;
    // Debounced input handlers
    const handleReviewTitleChange = debounce((value) => {
      setReviewTitle(value);
    }, 300);
  
    const handleReviewContentChange = debounce((value) => {
      setReviewContent(value);
    }, 300);
  
    // Cek apakah rating sudah dipilih, dan judul atau isi ulasan bisa kosong
    // const isSubmitDisabled = rating === 0 ;
  
    return (
      showReviewModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-6 w-[500px] max-w-[90%]">
        <h2 className="text-xl font-semibold mb-4">Write a review</h2>

        <div className="mb-4">
          <div className="flex gap-2 mb-4">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                onClick={() => setModalRating(star)}
                className="text-2xl text-yellow-400"
              >
                {star <= modalRating ? "★" : "☆"}
              </button>
            ))}
          </div>
          <div className="mb-4">
            <input
              type="text"
              placeholder="Review Title"
              value={modalReviewTitle}
              onChange={(e) => setModalReviewTitle(e.target.value)}
              className="w-full p-2 border rounded-[10px] mb-2"
            />
          </div>
          <textarea
            placeholder="Tell us about your experience..."
            value={modalReviewContent}
            onChange={(e) => setModalReviewContent(e.target.value)}
            className="w-full p-2 border rounded-[10px] h-32"
          />
        </div>

        <div className="flex justify-end gap-2">
          <button
            onClick={() => setShowReviewModal(false)}
            className="px-4 py-2 rounded-[20px] bg-gray-200"
          >
            Cancel
          </button>

          <button
            onClick={() => {
              addReview({
                author: "New User",
                rating: modalRating,
                title: modalReviewTitle,
                content: modalReviewContent,
              });
              setShowReviewModal(false);
            }}
            disabled={isSubmitDisabled}
            className={`px-4 py-2 rounded-[20px] text-white ${
              isSubmitDisabled ? "bg-gray-300 cursor-not-allowed" : "bg-pink-400"
            }`}
          >
            Submit review
            </button>
            </div>
          </div>
        </div>
      )
    );
  };

  return (
    <div className="min-h-screen bg-purple-50">
      <Header />
      <div className='rating-container'>
        <main className="max-w-4xl mx-auto p-6">
          <section className="rating-card mb-8">
            <h2 className="rating-title">Rating</h2>
            <div className="rating-summary">
              <div className="rating-score">
                <span className="score">{calculateAverageRating()}</span>
                <span className="star-large">★</span>
              </div>
              <p className="review-count">
                Based on {ratings.reduce((acc, curr) => acc + curr.count, 0)} reviews
              </p>
            </div>
            <div className="rating-bars">
              {ratings.map((rating) => (
                <div key={rating.stars} className="rating-bar-row">
                  <div className="star-container">
                    {renderStars(rating.stars)}
                  </div>
                  <div className="progress-bar">
                    <div className="progress-fill" style={{ width: `${(rating.count / 150) * 100}%` }} />
                    </div>
                    <span className="rating-count">{rating.count}</span>
                  </div>,
                  <p className="review-count">
                    Based on {ratings.reduce((acc, curr) => acc + curr.count, 0)} reviews
                  </p>))}
            </div>
            <div className="rating-bars">
              {ratings.map((rating) => (
                <div key={rating.stars} className="rating-bar-row">
                  <div className="star-container">
                    {renderStars(rating.stars)}
                  </div>
                  <div className="progress-bar">
                    <div
                      className="progress-fill"
                      style={{ width: `${(rating.count / 150) * 100}%` }} />
                  </div>
                  <span className="rating-count">{rating.count}</span>
                </div>
              ))}
            </div>
          </section>

          <section>
            {reviews.map((review, index) => (
              <ReviewCard key={review.id} review={review} index={index} />
            ))}

        </section>

        <section>
          {reviews.map((review, index) => (
            <ReviewCard key={review.id} review={review} index={index} />
          ))}
        </section>

        <button onClick={() => setShowReviewModal(true)} className="button">
          <span className="text-xl">✎</span>
          Write a review
        </button>
        {showReviewModal && <ReviewModal />}
      </main>
    </div><Footer />
    </div>
  );
};

export default Review;