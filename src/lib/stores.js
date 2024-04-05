import { writable } from 'svelte/store';
import { browser } from '$app/environment';

export const rainbowMode = writable(false);
export const measurementMode = writable(browser && localStorage.getItem("measurementMode") || "metric");
export const backgroundImg = writable(browser && localStorage.getItem("backgroundImg") || "");
export const textColor = writable(browser && localStorage.getItem("textColor") || "white");
export const fontType = writable(browser && localStorage.getItem("fontType") || "Arial");

export function toggleRainbowMode() {
  rainbowMode.update(mode => !mode);
}

export function toggleMeasurementMode(mode) {
  measurementMode.update(() => mode);
  browser && localStorage.setItem("measurementMode", mode);
}

export function setBackgroundImg(img) {
  backgroundImg.update(() => img);
  browser && localStorage.setItem("backgroundImg", img);
}

export function setTextColor(color) {
  textColor.update(() => color);
  browser && localStorage.setItem("textColor", color);
}

export function setFontType(font) {
  fontType.update(() => font);
  browser && localStorage.setItem("fontType", font);
}