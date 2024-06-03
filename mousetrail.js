// Function to detect touch devices
function isTouchDevice() {
  return "ontouchstart" in document.documentElement;
}

// Hide mouse trail for touch devices
if (isTouchDevice()) {
  $("#mouse-trail").css("visibility", "hidden");
} else {
  $("#mouse-trail").css("visibility", "visible");
}

// Move mouse-trail
function moveBox(e) {
  TweenMax.to("#mouse-trail", 0.35, {
    css: {
      left: e.pageX,
      top: e.pageY,
    },
    ease: SlowMo.easeIn,
  });
}

// Event listener for mouse move
$(window).on("mousemove", moveBox);

// Add event listeners for touch move
$(window).on("touchmove", function (e) {
  var touch = e.touches[0];
  moveBox(touch);
});
