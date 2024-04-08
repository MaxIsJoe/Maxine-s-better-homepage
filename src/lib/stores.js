import { writable } from 'svelte/store';
import { browser } from '$app/environment';

export const rainbowMode = writable(false);
export const blurryCardMode = writable(true);
export const measurementMode = writable(browser && localStorage.getItem("measurementMode") || "metric");
export const backgroundImg = writable(browser && localStorage.getItem("backgroundImg") || "");
export const textColor = writable(browser && localStorage.getItem("textColor") || "#ffd9f2");
export const fontType = writable(browser && localStorage.getItem("fontType") || "Arial");
export const blurryCardBgColorTop = writable(browser && localStorage.getItem("blurryCardBgColorTop") || "#2c121259");
export const blurryCardBgColorBot = writable(browser && localStorage.getItem("blurryCardBgColorBot") || "#141520");
export const backgroundCoverSetting = writable(browser && localStorage.getItem("backgroundCoverSetting") || "100% 100%");

export function toggleRainbowMode() {
  rainbowMode.update(mode => !mode);
}

export function toggleCardBlurMode() {
  blurryCardMode.update(mode => !mode);
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

export function setblurryCardBgColorTop(newColor) {
  blurryCardBgColorTop.update(()=> newColor);
  browser && localStorage.setItem("blurryCardBgColorTop", newColor)
}

export function setblurryCardBgColorBottom(newColor) {
  blurryCardBgColorBot.update(() => newColor);
  browser && localStorage.setItem("blurryCardBgColorBot", newColor)
}

export function setbackgroundCoverSetting(newSetting) {
  backgroundCoverSetting.update(() => newSetting);
  browser && localStorage.setItem("backgroundCoverSetting", newSetting)
}
