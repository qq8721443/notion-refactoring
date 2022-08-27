export default function Button({ $target, text, className, onClick }) {
  const $button = document.createElement("div");
  if (className) {
    $button.classList.add(className);
  }
  $button.style.cursor = "pointer";
  $target.appendChild($button);

  this.render = () => {
    $button.innerHTML = `
    <div style="flex-shrink: 0; flex-grow: 0; border-radius: 3px; color: rgba(55, 53, 47, 0.65); width: 22px; height: 22px; display: flex; align-items: center; justify-content: center; margin-right: 8px;"><div style="display: flex; align-items: center; justify-content: center;"><svg viewBox="0 0 16 16" class="plus" style="width: 16px; height: 16px; display: block; fill: rgba(55, 53, 47, 0.45); flex-shrink: 0; backface-visibility: hidden;"><path d="M7.977 14.963c.407 0 .747-.324.747-.723V8.72h5.362c.399 0 .74-.34.74-.747a.746.746 0 00-.74-.738H8.724V1.706c0-.398-.34-.722-.747-.722a.732.732 0 00-.739.722v5.529h-5.37a.746.746 0 00-.74.738c0 .407.341.747.74.747h5.37v5.52c0 .399.332.723.739.723z"></path></svg></div></div>
    <div>${text}</div>
    `;
  };

  this.render();

  $button.addEventListener("click", onClick);
}
