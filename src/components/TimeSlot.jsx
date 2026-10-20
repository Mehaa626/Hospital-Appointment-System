
export default function TimeSlot({ time, selected, onSelect }) {
  return (
    <button
      type="button"
      className={`slot ${selected ? "selected" : ""}`}
      onClick={() => onSelect(time)}
    >
      {time}
    </button>
  );
}
