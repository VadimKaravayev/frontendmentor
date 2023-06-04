import classNames from "classnames";
import { useState, useRef } from "react";
import { useSelector } from "react-redux";
import { useAddSubscriberMutation, checkAndAddSubscriber } from "../store";
import { useThunk } from "../hooks/useThunk";
import { getSubscriberByEmail, addSubscriber } from "../http/api";

function SubscribeCta() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const inputRef = useRef(null);

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateEmail(email)) {
      const errorMsg = "Please provide a valid email address";
      setError(errorMsg);
      return;
    }
    try {
      setIsLoading(true);
      const fetchedSubscribers = await getSubscriberByEmail(email);

      if (fetchedSubscribers.length) {
        setError(`Subscriber with email: ${email} already exists`);
        setIsLoading(false);
        return;
      }

      await addSubscriber({ email });

      setEmail("");
      setError("");
      inputRef.current.blur();
    } catch ({ message }) {
      setError(message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    setEmail(e.target.value);
    setError("");
  };

  return (
    <div className="subscribe-cta-cmp">
      <h3 className="subscribe-cta-cmp__title">Subscribe and get notified</h3>
      <form className="form" onSubmit={handleSubmit} noValidate>
        <div className="input">
          <input
            className={classNames("input__field", { "error-border": !!error })}
            id="input-email-id"
            type="email"
            value={email}
            ref={inputRef}
            placeholder=" "
            onChange={handleChange}
          />
          <label className="input__label" htmlFor="input-email-id">
            Your email address...
          </label>
        </div>
        {error && <span className="error-msg">{error}</span>}
        <button className="notify-cta" disabled={isLoading}>
          {isLoading ? <div className="spinner"></div> : "Notify Me"}
        </button>
      </form>
    </div>
  );
}

export default SubscribeCta;
