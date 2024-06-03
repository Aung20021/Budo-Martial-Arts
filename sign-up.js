import { gsap } from "https://cdn.skypack.dev/gsap@3.11.0";

gsap.registerPlugin(ScrambleTextPlugin, MorphSVGPlugin);

const BLINK_SPEED = 0.075;
const TOGGLE_SPEED = 0.125;
const ENCRYPT_SPEED = 1;

let busy = false;

const EYE = document.querySelector(".eye");
const TOGGLE = document.querySelector("button");
const INPUT = document.querySelector("#password");
const PROXY = document.createElement("div");

// 'upperAndLowerCase'
const chars =
  'abcdefghijklmnopqrstuvwxyzあいうえおかきくけこさしすせそまみむめもツシカマタABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789`~,.<>?/;":][}{+_)(*&^%$#@!±=-§';

let blinkTl;
const BLINK = () => {
  const delay = gsap.utils.random(2, 8);
  const duration = BLINK_SPEED;
  const repeat = Math.random() > 0.5 ? 3 : 1;
  blinkTl = gsap
    .timeline({
      delay,
      onComplete: () => BLINK(),
      repeat,
      yoyo: true,
    })
    .to(".lid--upper", {
      morphSVG: ".lid--lower",
      duration,
    })
    .to(
      "#eye-open path",
      {
        morphSVG: "#eye-closed path",
        duration,
      },
      0
    );
};

BLINK();

const posMapper = gsap.utils.mapRange(-100, 100, 30, -30);
let reset;
const MOVE_EYE = ({ x, y }) => {
  if (reset) reset.kill();
  reset = gsap.delayedCall(2, () => {
    gsap.to(".eye", { xPercent: 0, yPercent: 0, duration: 0.2 });
  });
  const BOUNDS = EYE.getBoundingClientRect();
  // Get distance and angle between two points
  gsap.set(".eye", {
    xPercent: gsap.utils.clamp(-30, 30, posMapper(BOUNDS.x - x)),
    yPercent: gsap.utils.clamp(-30, 30, posMapper(BOUNDS.y - y)),
  });
};

window.addEventListener("pointermove", MOVE_EYE);

// Trick is to animate from discs and to discs.

TOGGLE.addEventListener("click", () => {
  if (busy) return;
  const isText = INPUT.type === "password"; // Check the input type directly
  const val = INPUT.value;
  busy = true;
  TOGGLE.setAttribute("aria-pressed", !isText); // Toggle the aria-pressed attribute

  if (isText) {
    if (blinkTl) blinkTl.kill();

    gsap
      .timeline({
        onComplete: () => {
          busy = false;
        },
      })
      .to(".lid--upper", {
        morphSVG: ".lid--lower",
        duration: TOGGLE_SPEED,
      })
      .to(
        "#eye-open path",
        {
          morphSVG: "#eye-closed path",
          duration: TOGGLE_SPEED,
        },
        0
      );

    // Change the input type to password
    INPUT.type = "password";
    PROXY.innerHTML = "";
    INPUT.value = val.replace(/./g, "•"); // Replace all characters with dots
  } else {
    gsap
      .timeline({
        onComplete: () => {
          BLINK();
          busy = false;
        },
      })
      .to(".lid--upper", {
        morphSVG: ".lid--upper",
        duration: TOGGLE_SPEED,
      })
      .to(
        "#eye-open path",
        {
          morphSVG: "#eye-open path",
          duration: TOGGLE_SPEED,
        },
        0
      );

    // Change the input type to text
    INPUT.type = "text";
    PROXY.innerHTML = val; // Set the proxy to the actual value
    INPUT.value = val; // Set the input value to the actual value
  }
});

const FORM = document.querySelector("form");
FORM.addEventListener("submit", (event) => event.preventDefault());
