import React, { useState } from "react";

import "./ReviewForm.css";
import logo from "../img/logo.png";
import girl from "../img/girl.jpg";

const API_BASE_URL =
  process.env.NODE_ENV === "production"
    ? process.env.REACT_APP_API_BACKEND_URL
    : process.env.REACT_APP_API_BASE_URL;

const ReviewForm = () => {
  const [form, setForm] = useState({
    staff: "",
    shishaQuality: null,
    staffQuality: null,
    venueQuality: null,
    feedback: "",
    visitDate: "",
  });

  const [message, setMessage] = useState(null);

  const getTodayDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: name.includes("Quality") ? Number(value) : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      form.shishaQuality === null ||
      form.staffQuality === null ||
      form.venueQuality === null
    ) {
      setMessage({
        type: "error",
        text: "Пожалуйста, выберите оценку для всех категорий.",
      });
      setTimeout(() => setMessage(null), 3000);
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/reviews`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (response.ok) {
        setMessage({
          type: "success",
          text: "Ваш отзыв успешно отправлен. Спасибо!",
        });
        setForm({
          staff: "",
          shishaQuality: null,
          staffQuality: null,
          venueQuality: null,
          feedback: "",
          visitDate: "",
        });
      } else {
        setMessage({
          type: "error",
          text: "Произошла ошибка. Пожалуйста, попробуйте позже.",
        });
      }
    } catch (error) {
      setMessage({
        type: "error",
        text: "Произошла ошибка при отправке отзыва.",
      });
    }

    setTimeout(() => {
      setMessage(null);
    }, 3000);
  };

  return (
    <div className="container">
      <header>
        <img src={logo} alt="Логотип Кальянной" className="logo" />
        <h1>Добро пожаловать в PLAYBOX</h1>
        <p>Насладитесь лучшими кальянами в уютной атмосфере!</p>
        <div className="photos">
          <img src={girl} alt="Фото заведения 1" className="girlPic" />
        </div>
      </header>
      <section className="reviews">
        <h2>Оцените наш сервис</h2>

        {message && (
          <div className={`popup-message ${message.type}`}>{message.text}</div>
        )}

        <form onSubmit={handleSubmit}>
          {/* Branch selection */}
          <label htmlFor="staff">
            Выберите филиал: <span className="required-icon">*</span>
          </label>
          <select
            id="staff"
            name="staff"
            value={form.staff}
            onChange={handleChange}
            required
          >
            <option value="">Выберите...</option>
            <option value="Ул.Николая Ершова 78Б">Ул.Николая Ершова 78Б</option>
            <option value="Ул.Пушкина 17">Ул.Пушкина 17</option>
            <option value="Ул.Ямашева 92А">Ул.Ямашева 92А</option>
          </select>

          {/* Visit date */}
          <label htmlFor="visitDate">
            Дата посещения: <span className="required-icon">*</span>
          </label>
          <input
            type="date"
            id="visitDate"
            name="visitDate"
            value={form.visitDate}
            onChange={handleChange}
            max={getTodayDate()}
            required
          />

          {/* Shisha quality */}
          <fieldset>
            <legend>
              Качество кальяна: <span className="required-icon">*</span>
            </legend>
            <div className="star-rating">
              {[5, 4, 3, 2, 1].map((rating) => (
                <React.Fragment key={`shisha-${rating}`}>
                  <input
                    type="radio"
                    id={`shisha-${rating}`}
                    name="shishaQuality"
                    value={rating}
                    checked={form.shishaQuality === rating}
                    onChange={handleChange}
                  />
                  <label htmlFor={`shisha-${rating}`} className="star">
                    &#9733;
                  </label>
                </React.Fragment>
              ))}
            </div>
          </fieldset>

          {/* Staff quality */}
          <fieldset>
            <legend>
              Уровень обслуживания: <span className="required-icon">*</span>
            </legend>
            <div className="star-rating">
              {[5, 4, 3, 2, 1].map((rating) => (
                <React.Fragment key={`staff-${rating}`}>
                  <input
                    type="radio"
                    id={`staff-${rating}`}
                    name="staffQuality"
                    value={rating}
                    checked={form.staffQuality === rating}
                    onChange={handleChange}
                  />
                  <label htmlFor={`staff-${rating}`} className="star">
                    &#9733;
                  </label>
                </React.Fragment>
              ))}
            </div>
          </fieldset>

          {/* Venue quality */}
          <fieldset>
            <legend>
              Состояние игровых контроллеров:{" "}
              <span className="required-icon">*</span>
            </legend>
            <div className="star-rating">
              {[5, 4, 3, 2, 1].map((rating) => (
                <React.Fragment key={`venue-${rating}`}>
                  <input
                    type="radio"
                    id={`venue-${rating}`}
                    name="venueQuality"
                    value={rating}
                    checked={form.venueQuality === rating}
                    onChange={handleChange}
                  />
                  <label htmlFor={`venue-${rating}`} className="star">
                    &#9733;
                  </label>
                </React.Fragment>
              ))}
            </div>
          </fieldset>

          {/* Feedback */}
          <label htmlFor="feedback">Ваши впечатления и пожелания</label>
          <textarea
            id="feedback"
            name="feedback"
            rows="4"
            value={form.feedback}
            onChange={handleChange}
          ></textarea>

          <button type="submit" className="sendButton">
            Отправить отзыв
          </button>
        </form>
      </section>
    </div>
  );
};

export default ReviewForm;
