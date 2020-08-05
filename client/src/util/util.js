import { PI } from "./constant";

export function bindEvent(query, event, handler, capturing = false) {
  const element = document.querySelector(query);
  if (!element) return;

  element.addEventListener(event, handler, capturing);
}

export function bindEventAll(query, event, handler, capturing = false) {
  const elements = [...document.querySelectorAll(query)];
  if (!elements) return;

  elements.forEach((element) => {
    element.addEventListener(event, handler, capturing);
  });
}

export function getRandomColor() {
  return Math.floor(Math.random() * 16777215).toString(16);
}

export const $ = document.querySelector.bind(document);

export const $all = document.querySelectorAll.bind(document);

export const $id = document.getElementById.bind(document);

export function toRadian(degree) {
  return degree * (PI / 180);
} 