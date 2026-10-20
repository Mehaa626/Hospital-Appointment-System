
export default function ErrorMessage({ message, onRetry }) {
  return (
    <div className="error-box">
      <p>{message || "Unable to load data. Please try again."}</p>
      {onRetry && (
        <button className="btn" onClick={onRetry}>
          Retry
        </button>
      )}
    </div>
  );
}
