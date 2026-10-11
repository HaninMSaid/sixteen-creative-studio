"use client";
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { roomObjects, type RoomObject } from "@/data/collection";

type Props = { onSelect: (item: RoomObject) => void };
/** A standing-position 360° panorama. Object silhouettes live in panorama UV space. */
export function PanoramaRoom({ onSelect }: Props) {
  const host = useRef<HTMLDivElement>(null);
  const selectRef = useRef(onSelect);
  const moveTo = useRef<(item: RoomObject) => void>(() => {});
  const [hovered, setHovered] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [failed, setFailed] = useState(false);
  useEffect(() => {
    selectRef.current = onSelect;
  }, [onSelect]);
  useEffect(() => {
    const element = host.current;
    if (!element) return;
    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
    } catch {
      setFailed(true);
      setLoading(false);
      return;
    }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    element.appendChild(renderer.domElement);
    const scene = new THREE.Scene();
    scene.background = new THREE.Color("#28231c");
    const camera = new THREE.PerspectiveCamera(68, 1, 0.1, 110);
    const geometry = new THREE.SphereGeometry(100, 128, 64);
    geometry.scale(-1, 1, 1);
    const texture = new THREE.TextureLoader().load(
      "/images/antique-panorama.png",
      () => {
        setLoading(false);
        render();
      },
      undefined,
      () => {
        setFailed(true);
        setLoading(false);
      },
    );
    texture.colorSpace = THREE.SRGBColorSpace;
    const material = new THREE.MeshBasicMaterial({ map: texture });
    scene.add(new THREE.Mesh(geometry, material));
    // Polygon silhouettes follow the depicted antiques, rather than visible hotspots.
    const patches = roomObjects.map((item) => {
      const contour = item.polygon.map(([u, v]) => new THREE.Vector2(u, v));
      const triangles = THREE.ShapeUtils.triangulateShape(contour, []);
      const vertices: number[] = [];
      for (const [u, v] of item.polygon) {
        const phi = u * Math.PI * 2,
          theta = v * Math.PI;
        vertices.push(
          99 * Math.sin(theta) * Math.cos(phi),
          99 * Math.cos(theta),
          99 * Math.sin(theta) * Math.sin(phi),
        );
      }
      const shape = new THREE.BufferGeometry();
      shape.setAttribute(
        "position",
        new THREE.Float32BufferAttribute(vertices, 3),
      );
      shape.setIndex(triangles.flat());
      const tint = new THREE.MeshBasicMaterial({
        color: "#dbb77e",
        transparent: true,
        opacity: 0,
        side: THREE.DoubleSide,
        depthTest: false,
      });
      const mesh = new THREE.Mesh(shape, tint);
      mesh.userData.item = item;
      mesh.renderOrder = 2;
      scene.add(mesh);
      return mesh;
    });
    let yaw = 0.38 * Math.PI * 2,
      pitch = -0.12;
    let down = false,
      startX = 0,
      startY = 0,
      startYaw = 0,
      startPitch = 0,
      dragged = false;
    let active: THREE.Mesh | null = null;
    const pointer = new THREE.Vector2(),
      raycaster = new THREE.Raycaster();
    function render() {
      camera.lookAt(
        Math.cos(pitch) * Math.cos(yaw),
        Math.sin(pitch),
        Math.cos(pitch) * Math.sin(yaw),
      );
      renderer.render(scene, camera);
    }
    function resize() {
      const { width, height } = element!.getBoundingClientRect();
      renderer.setSize(width, height);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      render();
    }
    function highlight(mesh: THREE.Mesh | null) {
      if (active === mesh) return;
      patches.forEach(
        (p) =>
          ((p.material as THREE.MeshBasicMaterial).opacity =
            p === mesh ? 0.24 : 0),
      );
      active = mesh;
      setHovered(mesh ? (mesh.userData.item as RoomObject).name : null);
      element!.style.cursor = mesh ? "pointer" : "grab";
      render();
    }
    function pick(x: number, y: number) {
      const rect = element!.getBoundingClientRect();
      pointer.set(
        ((x - rect.left) / rect.width) * 2 - 1,
        (-(y - rect.top) / rect.height) * 2 + 1,
      );
      raycaster.setFromCamera(pointer, camera);
      return (
        (raycaster.intersectObjects(patches)[0]?.object as THREE.Mesh) || null
      );
    }
    function pointerDown(e: PointerEvent) {
      down = true;
      dragged = false;
      startX = e.clientX;
      startY = e.clientY;
      startYaw = yaw;
      startPitch = pitch;
      element!.setPointerCapture(e.pointerId);
    }
    function pointerMove(e: PointerEvent) {
      if (down) {
        const dx = e.clientX - startX,
          dy = e.clientY - startY;
        if (Math.abs(dx) + Math.abs(dy) > 7) dragged = true;
        if (dragged) {
          yaw = startYaw - dx * 0.004;
          pitch = Math.max(-1.05, Math.min(1.05, startPitch + dy * 0.003));
          highlight(null);
          render();
          return;
        }
      }
      highlight(pick(e.clientX, e.clientY));
    }
    function pointerUp(e: PointerEvent) {
      if (!down) return;
      down = false;
      if (element!.hasPointerCapture(e.pointerId))
        element!.releasePointerCapture(e.pointerId);
      if (!dragged) {
        const mesh = pick(e.clientX, e.clientY);
        if (mesh) selectRef.current(mesh.userData.item);
      }
      element!.style.cursor = "grab";
    }
    function pointerCancel() {
      down = false;
      highlight(null);
    }
    function key(e: KeyboardEvent) {
      if (
        ["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown", "Enter"].includes(
          e.key,
        )
      ) {
        e.preventDefault();
        if (e.key === "ArrowLeft") yaw -= 0.12;
        if (e.key === "ArrowRight") yaw += 0.12;
        if (e.key === "ArrowUp") pitch = Math.min(1.05, pitch + 0.1);
        if (e.key === "ArrowDown") pitch = Math.max(-1.05, pitch - 0.1);
        render();
        const r = element!.getBoundingClientRect(),
          mesh = pick(r.left + r.width / 2, r.top + r.height / 2);
        highlight(mesh);
        if (e.key === "Enter" && mesh) selectRef.current(mesh.userData.item);
      }
    }
    moveTo.current = (item) => {
      yaw = item.x * Math.PI * 2;
      pitch = (0.5 - item.y) * Math.PI;
      highlight(null);
      render();
      element!.focus();
    };
    const observer = new ResizeObserver(resize);
    observer.observe(element);
    element.addEventListener("pointerdown", pointerDown);
    element.addEventListener("pointermove", pointerMove);
    element.addEventListener("pointerup", pointerUp);
    element.addEventListener("pointercancel", pointerCancel);
    element.addEventListener("keydown", key);
    resize();
    return () => {
      observer.disconnect();
      element.removeEventListener("pointerdown", pointerDown);
      element.removeEventListener("pointermove", pointerMove);
      element.removeEventListener("pointerup", pointerUp);
      element.removeEventListener("pointercancel", pointerCancel);
      element.removeEventListener("keydown", key);
      texture.dispose();
      geometry.dispose();
      material.dispose();
      patches.forEach((mesh) => {
        mesh.geometry.dispose();
        (mesh.material as THREE.Material).dispose();
      });
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, []);
  return (
    <div className="panorama-experience">
      <div
        ref={host}
        className="panorama-canvas"
        role="application"
        aria-label="360 degree antique room. Drag or use arrow keys to look around. Click an object or press Enter at the centre to discover it."
        tabIndex={0}
      />
      <div className="room-heading">
        <p className="eyebrow">Objects of desire</p>
        <h1>The collector’s room.</h1>
        <p>Stand still. Look around. Find something unexpected.</p>
      </div>
      {loading && (
        <p className="room-loading" role="status">
          Opening the room…
        </p>
      )}
      {failed && (
        <div className="room-fallback" role="status">
          <p>Your browser could not open the 360° view.</p>
          <p>You can still discover every object from the collection below.</p>
        </div>
      )}
      <div className="room-hover" aria-live="polite">
        {hovered && (
          <>
            <span>DISCOVER</span>
            <p>{hovered}</p>
          </>
        )}
      </div>
      <div className="room-controls">
        <span className="room-instructions">
          Drag to look around · Select an object
        </span>
        <div className="corner-controls" aria-label="Look toward a room corner">
          {roomObjects.map((item) => (
            <button key={item.id} onClick={() => moveTo.current(item)}>
              {item.corner}
            </button>
          ))}
        </div>
        <span className="room-degree">360°</span>
      </div>
      <p className="room-concept">
        Illustrative antique interior · Concept imagery
      </p>
    </div>
  );
}
