const boxWorld = document.getElementById("box_world");

for (let i = 0; i < 27; i++) {
  const boxWrapper = document.createElement("div");
  boxWrapper.classList.add("box_wrapper");

  for (let j = 0; j < 6; j++) {
    const boxWall = document.createElement("div");
    boxWall.classList.add("box_wall");
    boxWall.style.animation = `borderColor ${Math.random() * 3000 + 1000}ms ${
      Math.random() * 10000
    }ms linear infinite`;
    boxWrapper.appendChild(boxWall);
  }

  boxWorld.appendChild(boxWrapper);
}
