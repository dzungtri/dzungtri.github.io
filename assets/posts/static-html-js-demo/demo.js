const staticDemo = document.querySelector("[data-static-demo]");

if (staticDemo) {
  const valueNode = staticDemo.querySelector("[data-static-demo-value]");
  const statusNode = staticDemo.querySelector("[data-static-demo-status]");
  const stepButtons = staticDemo.querySelectorAll("[data-static-demo-step]");
  const resetButton = staticDemo.querySelector("[data-static-demo-reset]");
  let count = 0;

  const render = () => {
    valueNode.textContent = String(count);
    statusNode.textContent = count === 0 ? "Ready." : `Current value: ${count}.`;
  };

  stepButtons.forEach((button) => {
    button.addEventListener("click", () => {
      count += Number(button.dataset.staticDemoStep || 0);
      render();
    });
  });

  resetButton?.addEventListener("click", () => {
    count = 0;
    render();
  });

  render();
}
