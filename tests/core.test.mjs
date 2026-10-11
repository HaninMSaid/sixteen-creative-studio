import test from 'node:test';
import assert from 'node:assert/strict';
import * as THREE from 'three';
import { roomObjects } from '../src/data/collection.ts';
import { calendarCells } from '../src/data/booking.ts';

test('every room corner targets its selectable object silhouette', () => {
  for (const item of roomObjects) {
    const contour = item.polygon.map(([u, v]) => new THREE.Vector2(u, v));
    const vertices = item.polygon.flatMap(([u, v]) => [
      99 * Math.sin(v * Math.PI) * Math.cos(u * Math.PI * 2),
      99 * Math.cos(v * Math.PI),
      99 * Math.sin(v * Math.PI) * Math.sin(u * Math.PI * 2),
    ]);
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
    geometry.setIndex(THREE.ShapeUtils.triangulateShape(contour, []).flat());
    const material = new THREE.MeshBasicMaterial({ side: THREE.DoubleSide });
    const mesh = new THREE.Mesh(geometry, material);
    mesh.updateMatrixWorld();
    const direction = new THREE.Vector3(
      Math.sin(item.y * Math.PI) * Math.cos(item.x * Math.PI * 2),
      Math.cos(item.y * Math.PI),
      Math.sin(item.y * Math.PI) * Math.sin(item.x * Math.PI * 2),
    );
    assert.ok(new THREE.Raycaster(new THREE.Vector3(), direction).intersectObject(mesh).length, item.name);
    geometry.dispose(); material.dispose();
  }
});

test('calendar handles leap years and Monday-first alignment', () => {
  assert.equal(calendarCells(new Date(2028, 1, 1)).filter(Boolean).length, 29);
  assert.equal(calendarCells(new Date(2026, 1, 1)).filter(Boolean).length, 28);
  assert.equal(calendarCells(new Date(2026, 5, 1))[0].day, 1);
  assert.equal(calendarCells(new Date(2026, 1, 1)).filter(day => day === null).length, 6);
});

test('past dates cannot be offered as demo booking dates', () => {
  assert.ok(calendarCells(new Date(2000, 0, 1)).filter(Boolean).every(day => day.past));
});
