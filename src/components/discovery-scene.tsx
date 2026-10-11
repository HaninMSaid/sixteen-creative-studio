"use client";
import { useRef, useState } from "react";
import dynamic from "next/dynamic";
import { roomObjects, type RoomObject } from "@/data/collection";
const PanoramaRoom = dynamic(
  () =>
    import("@/components/panorama-room").then((module) => module.PanoramaRoom),
  {
    ssr: false,
    loading: () => (
      <div className="panorama-placeholder">Opening the collector’s room…</div>
    ),
  },
);
export function DiscoveryScene() {
  const [selected, setSelected] = useState<RoomObject>(roomObjects[0]);
  const [enquiry, setEnquiry] = useState(false);
  const dialog = useRef<HTMLDialogElement>(null);
  function openObject(item: RoomObject) {
    setSelected(item);
    setEnquiry(false);
    dialog.current?.showModal();
  }
  return (
    <>
      <PanoramaRoom onSelect={openObject} />
      <details className="collection-index">
        <summary>View the collection</summary>
        <div className="object-index" aria-label="Accessible collection list">
          {roomObjects.map((item) => (
            <button key={item.id} onClick={() => openObject(item)}>
              <span>{item.id}</span>
              {item.name}
            </button>
          ))}
        </div>
      </details>
      <dialog
        ref={dialog}
        className="object-dialog"
        aria-labelledby="object-title"
        onClick={(event) => {
          if (event.target === event.currentTarget) dialog.current?.close();
        }}
      >
        <div className="object-panel">
          <button
            className="close-dialog"
            onClick={() => dialog.current?.close()}
          >
            Close
          </button>
          <p className="eyebrow">
            Object {selected.id} / {selected.category}
          </p>
          <h2 id="object-title">{selected.name}</h2>
          <p>{selected.description}</p>
          <dl>
            {[
              ["Material", selected.material],
              ["Dimensions", selected.dimensions],
              ["Availability", selected.edition],
              ["Lead time", selected.leadTime],
            ].map(([label, value]) => (
              <div key={label}>
                <dt>{label}</dt>
                <dd>{value}</dd>
              </div>
            ))}
          </dl>
          <div className="object-price">{selected.price}</div>
          <button className="solid-button" onClick={() => setEnquiry(true)}>
            Enquire about this piece
          </button>
          {enquiry && (
            <p role="status" className="enquiry-feedback">
              An enquiry would identify “{selected.name}” for the studio.
              Sending will be connected to the studio email after prototype
              approval. Nothing has been sent.
            </p>
          )}
          <p className="small">
            Concept piece. Final collection details to follow.
          </p>
        </div>
      </dialog>
    </>
  );
}
