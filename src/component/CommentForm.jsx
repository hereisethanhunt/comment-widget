import { useState } from "react"

function CommentForm({
  onSubmit,
  autoFocus = false,
  initialValue = "",
}) {
  const [message, setMessage] = useState(initialValue);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(message);
    setMessage("");
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="comment-form-row">
        <textarea
          autoFocus={autoFocus}
          value={message}
          onChange={e => setMessage(e.target.value)}
          className="message-input"
        />
        <button className="btn" type="submit">
          {"Post"}
        </button>
      </div>
    </form>
  )
}

export default CommentForm;