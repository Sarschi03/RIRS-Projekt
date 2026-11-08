import { Button } from "../common/UI";

const highlights = ["Današnji načrt", "Službeni projekti", "Zaključeno danes"];

export default function DayHighlights() {
  return (
    <section className="day-highlights" aria-labelledby="day-highlights-title">
      <div className="day-highlights-heading">
        <div>
          <h2 id="day-highlights-title">Pregled dneva</h2>
          <p>Tvoje obveznosti.</p>
        </div>
        <Button primary icon action="daily-task">Dodaj</Button>
      </div>
      <div className="day-highlight-track">
        {highlights.map((label, index) => (
          <article
            className={`day-highlight tone-${index + 1}`}
            aria-label={label}
            key={label}
          />
        ))}
      </div>
    </section>
  );
}
