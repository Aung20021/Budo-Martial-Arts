const GLYPHS =
  "ラドクリフマラソンわたしワタシんょンョたばこタバコとうきょうトウキョウ0123456789±!@#$%^&*()_+ABCDEFGHIJKLMNOPQRSTUVWXYZ";

function applyGlyphEffect(element) {
  const text = element.textContent;
  element.innerHTML = text
    .split("")
    .map((char, index) => {
      return `<span data-char="${char}" style="--index: ${index}; --char-1: '${
        GLYPHS[Math.floor(Math.random() * GLYPHS.length)]
      }'; --char-2: '${
        GLYPHS[Math.floor(Math.random() * GLYPHS.length)]
      }'; --char-3: '${
        GLYPHS[Math.floor(Math.random() * GLYPHS.length)]
      }';">${char}</span>`;
    })
    .join("");
}

document.querySelectorAll(".glyph-hover-effect").forEach((element) => {
  applyGlyphEffect(element);
});

document.querySelectorAll(".glyph-hover-effect").forEach((element) => {
  element.addEventListener("mouseenter", () => {
    element.querySelectorAll("span").forEach((span) => {
      span.style.setProperty(
        "animation",
        "flash calc(var(--speed, 0.25) * 1s) calc(var(--index, 0) * 0.05s) steps(1, end)"
      );
    });
  });

  element.addEventListener("mouseleave", () => {
    element.querySelectorAll("span").forEach((span) => {
      span.style.removeProperty("animation");
    });
  });
});

const nav = document.querySelector(".navbar");
window.addEventListener("scroll", fixNav);

function fixNav() {
  if (window.scrollY > nav.offsetHeight + 5) {
    nav.classList.add("active");
    nav.setAttribute("data-bs-theme", "dark");
    navLogo.classList.add("navbar-toggler-logo-white");
  } else {
    nav.classList.remove("active");
    nav.removeAttribute("data-bs-theme");
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const toggler = document.querySelector(".navbar-toggler");
  const navbar = document.querySelector("#offcanvasNavbar");

  toggler.addEventListener("click", () => {
    toggler.classList.toggle("collapsed");
  });

  // Remove the 'collapsed' class when the navbar is closed
  navbar.addEventListener("hidden.bs.offcanvas", () => {
    toggler.classList.remove("collapsed");
  });
});
