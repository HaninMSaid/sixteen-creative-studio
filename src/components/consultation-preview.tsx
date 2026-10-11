"use client";
import { useState, type FormEvent } from "react";
import { consultationServices } from "@/data/studio";
import { demoTimes, monthLabel, calendarCells } from "@/data/booking";
import type { ConsultationRequest } from "@/types/content";

const emptyDetails: ConsultationRequest = {
  name: "",
  email: "",
  phone: "",
  location: "",
  area: "",
  brief: "",
  projectType: "Residential",
  stage: "New build",
};
export function ConsultationPreview() {
  const [service, setService] = useState(consultationServices[0]);
  const [step, setStep] = useState(1);
  const [month, setMonth] = useState(() => {
    const now = new Date();
    return new Date(now.getFullYear(), now.getMonth(), 1);
  });
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [details, setDetails] = useState(emptyDetails);
  const [fileNames, setFileNames] = useState<string[]>([]);
  const [reviewed, setReviewed] = useState(false);
  const cells = calendarCells(month);
  function changeMonth(offset: number) {
    setMonth(new Date(month.getFullYear(), month.getMonth() + offset, 1));
    setDate("");
    setTime("");
  }
  function update<K extends keyof ConsultationRequest>(
    key: K,
    value: ConsultationRequest[K],
  ) {
    setDetails((previous) => ({ ...previous, [key]: value }));
  }
  function review(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStep(4);
  }
  return (
    <div className="consultation-preview booking-flow">
      <div className="preview-progress" aria-label={`Step ${step} of 4`}>
        {["Service", "Date & time", "Your project", "Review"].map(
          (label, i) => (
            <span key={label} className={step === i + 1 ? "active" : ""}>
              {String(i + 1).padStart(2, "0")} / {label}
            </span>
          ),
        )}
      </div>
      {step === 1 && (
        <>
          <h2>A place to begin.</h2>
          <p>Select the conversation you would like to have.</p>
          <fieldset>
            <legend className="sr-only">Consultation type</legend>
            {consultationServices.map((s) => (
              <label
                className={`service-option ${service === s ? "selected" : ""}`}
                key={s}
              >
                <input
                  type="radio"
                  name="service"
                  value={s}
                  checked={service === s}
                  onChange={() => setService(s)}
                />
                <span>{s}</span>
              </label>
            ))}
          </fieldset>
          <button className="solid-button" onClick={() => setStep(2)}>
            Choose a date
          </button>
        </>
      )}
      {step === 2 && (
        <>
          <h2>Make a little time.</h2>
          <p className="booking-note">
            Demonstration availability · Doha time (UTC+3)
          </p>
          <div className="calendar">
            <div className="calendar-header">
              <button
                onClick={() => changeMonth(-1)}
                aria-label="Previous month"
              >
                Previous
              </button>
              <h3>{monthLabel(month)}</h3>
              <button onClick={() => changeMonth(1)} aria-label="Next month">
                Next
              </button>
            </div>
            <div className="calendar-grid">
              {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => (
                <span className="weekday" key={day}>
                  {day}
                </span>
              ))}
              {cells.map((day, i) =>
                day ? (
                  <button
                    key={day.key}
                    disabled={day.past}
                    aria-label={day.label}
                    aria-pressed={date === day.key}
                    className={date === day.key ? "chosen" : ""}
                    onClick={() => {
                      setDate(day.key);
                      setTime("");
                    }}
                  >
                    {day.day}
                  </button>
                ) : (
                  <span key={`empty-${i}`} />
                ),
              )}
            </div>
          </div>
          {date && (
            <fieldset className="time-options">
              <legend>Choose a time</legend>
              {demoTimes.map((t) => (
                <label key={t} className={time === t ? "chosen" : ""}>
                  <input
                    type="radio"
                    name="time"
                    checked={time === t}
                    onChange={() => setTime(t)}
                  />
                  {t}
                </label>
              ))}
            </fieldset>
          )}
          <button
            className="solid-button"
            disabled={!date || !time}
            onClick={() => setStep(3)}
          >
            Tell us about your project
          </button>
          <button className="quiet-button" onClick={() => setStep(1)}>
            Back to service
          </button>
        </>
      )}
      {step === 3 && (
        <form onSubmit={review}>
          <h2>The space you imagine.</h2>
          <p>Share a few details ahead of your consultation.</p>
          <div className="form-fields">
            <label>
              Your name
              <input
                required
                autoComplete="name"
                value={details.name}
                onChange={(e) => update("name", e.target.value)}
              />
            </label>
            <label>
              Email address
              <input
                required
                type="email"
                autoComplete="email"
                value={details.email}
                onChange={(e) => update("email", e.target.value)}
              />
            </label>
            <label>
              Mobile number
              <input
                required
                type="tel"
                autoComplete="tel"
                value={details.phone}
                onChange={(e) => update("phone", e.target.value)}
              />
            </label>
            <label>
              Property / location
              <input
                required
                value={details.location}
                onChange={(e) => update("location", e.target.value)}
              />
            </label>
            <div className="form-pair">
              <label>
                Project type
                <select
                  value={details.projectType}
                  onChange={(e) => update("projectType", e.target.value)}
                >
                  <option>Residential</option>
                  <option>Commercial</option>
                  <option>Other</option>
                </select>
              </label>
              <label>
                Approximate area (m²)
                <input
                  type="number"
                  min="1"
                  value={details.area}
                  onChange={(e) => update("area", e.target.value)}
                />
              </label>
            </div>
            <label>
              Project stage
              <select
                value={details.stage}
                onChange={(e) => update("stage", e.target.value)}
              >
                <option>New build</option>
                <option>Renovation</option>
                <option>Styling an existing space</option>
              </select>
            </label>
            <label>
              Your vision
              <textarea
                required
                rows={4}
                value={details.brief}
                onChange={(e) => update("brief", e.target.value)}
                placeholder="The space, your priorities, your hoped-for timeline…"
              />
            </label>
            <label>
              Plans or inspiration (optional)
              <input
                type="file"
                multiple
                accept=".pdf,.jpg,.jpeg,.png,.webp"
                onChange={(e) =>
                  setFileNames(
                    Array.from(e.target.files ?? []).map((file) => file.name),
                  )
                }
              />
              <span className="small">
                Preview: filenames only; files are not uploaded.
              </span>
            </label>
          </div>
          <button className="solid-button" type="submit">
            Review your consultation
          </button>
          <button
            type="button"
            className="quiet-button"
            onClick={() => setStep(2)}
          >
            Back to calendar
          </button>
        </form>
      )}
      {step === 4 && (
        <div>
          <p className="eyebrow">Your consultation</p>
          <h2>{service}</h2>
          <dl className="booking-summary">
            {[
              ["When", `${date} · ${time} (Doha)`],
              ["Name", details.name],
              ["Email", details.email],
              ["Mobile", details.phone],
              ["Location", details.location],
              [
                "Project",
                `${details.projectType} · ${details.stage}${details.area ? ` · ${details.area} m²` : ""}`,
              ],
              ["Your vision", details.brief],
              ["References", fileNames.join(", ") || "None selected"],
            ].map(([key, value]) => (
              <div key={key}>
                <dt>{key}</dt>
                <dd>{value}</dd>
              </div>
            ))}
          </dl>
          <p className="preview-notice">
            This is a working preview. Dates are illustrative. The studio’s
            calendar and email will be connected after prototype approval. Your
            details stay in this page and are not sent or saved.
          </p>
          {reviewed ? (
            <p role="status" className="review-complete">
              Preview complete. No booking has been made.
            </p>
          ) : (
            <button className="solid-button" onClick={() => setReviewed(true)}>
              Complete the preview
            </button>
          )}
          <button
            className="quiet-button"
            onClick={() => {
              setReviewed(false);
              setStep(3);
            }}
          >
            Edit your details
          </button>
        </div>
      )}
      <p className="small booking-footnote">
        Prototype · Calendar and studio notifications to be connected.
      </p>
    </div>
  );
}
