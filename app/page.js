import { redirect } from "next/navigation";

export default function RootPage() {
  // Redirect ke halaman login
  redirect("/login");

export default function HomePage() {
  const [selectedDate, setSelectedDate] = useState(null);
  const [showCalendar, setShowCalendar] = useState(false);
  const [showTimeDropdowns, setShowTimeDropdowns] = useState(false);
  const [fromTime, setFromTime] = useState("");
  const [untilTime, setUntilTime] = useState("");

  const handleDateChange = (date) => {
    setSelectedDate(date);
    setShowCalendar(false);
  };

  return (
    <div className="home-container">
      {/* Bagian Header */}
      <Header />

      {/* Bagian Reservation */}
      <section id="reservation" className="section">
        <div className="reservation-box">
          <div className="input-group">
            <label>Reservation date</label>
            <button
              className="placeholder"
              onClick={() => setShowCalendar(!showCalendar)}
            >
              {selectedDate ? selectedDate.toDateString() : "Add dates"}
            </button>
            {showCalendar && (
              <div className="calendar-container">
                <Calendar onChange={handleDateChange} value={selectedDate} />
              </div>
            )}
          </div>
          <div className="input-group">
            <label>Reservation time</label>
            <button
              className="placeholder"
              onClick={() => setShowTimeDropdowns(!showTimeDropdowns)}
            >
              Add times
            </button>
            {showTimeDropdowns && (
              <div className="time-dropdown-container">
                <div className="time-input">
                  <label>From</label>
                  <select
                    className="time-dropdown"
                    value={fromTime}
                    onChange={(e) => setFromTime(e.target.value)}
                  >
                    <option value="">Select</option>
                    {generateTimeOptions()}
                  </select>
                </div>
                <div className="time-input">
                  <label>Until</label>
                  <select
                    className="time-dropdown"
                    value={untilTime}
                    onChange={(e) => setUntilTime(e.target.value)}
                  >
                    <option value="">Select</option>
                    {generateTimeOptions()}
                  </select>
                </div>
              </div>
            )}
          </div>
          <button id="find" className="find-room-button">
            <Link href="/find-room" className="find-room-link">
              Find Room
            </Link>
          </button>
        </div>
      </section>

      {/* Bagian Rules */}
      <section id="rules" className="section rules-section">
        <video
          src="/Neon Sci Fi Gaming YouTube Video Intro (3).mp4"
          className="rules-video"
          autoPlay
          loop
          muted
        >
          Your browser does not support the video tag.
        </video>
      </section>

      {/* Bagian Reviews */}
   <section id="ratingbox" className="rating">
        <div className="rating-left">
          <div className="rating-tittle">Rating</div>
          <div className="rating-score">
            <span className="score-number">4.5</span>
            <span className="score-stars">★</span>
          </div>
          <div className="rating-reviews">Based on 150 reviews</div>
          <div className="rating-breakdown">
            {[5, 4, 3, 2, 1].map((stars, index) => (
              <div key={index} className="breakdown-row">
                <span className="stars-row">
                  {"★".repeat(stars).padEnd(5, "☆")}
                </span>
                <div className="bar-container">
                  <div
                    className="bar-fill"
                    style={{ width: `${[93, 42, 14, 1, 0][index]}%` }}
                  ></div>
                </div>
                <span className="review-count-row">
                  {[93, 42, 14, 1, 0][index]}
                </span>
              </div>
            ))}
          </div>
        </div>
        <div className="review-section">
          {[{
            username: "Fadilahrtk",
            stars: 5,
            image: "/image/review1.png",
            title: "Excellent booking experience!",
            text: "This game house reservation platform is very easy to use and responsive. Fast booking process, intuitive interface, and a wide selection of games. The payment system is secure, and customer support is very helpful. I can immediately choose the game room according to my wishes without any hassle."
          }, {
            username: "Xavierzh",
            stars: 5,
            image: "/image/review2.jpg",
            title: "Excellent Experience, Highly Recommend!",
            text: "Highly recommend this place to anyone looking for a fun and hassle-free gaming experience! I had an amazing time at the gaming venue! The setup was flawless, with all the equipment working perfectly, and the atmosphere was vibrant and exciting."
          }].map((review, index) => (
            <div key={index} className="review">
              <div className="profile-review">
                <img
                  src={review.image}
                  alt="foto"
                  className="profile-review"
                />
                <span className="username-review">{review.username}</span>
                <span className="stars-review">{"★".repeat(review.stars)}</span>
              </div>
              <p><strong>{review.title}</strong></p>
              <p>{review.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Bagian Footer */}
      <Footer />
    </div>
  );
}
