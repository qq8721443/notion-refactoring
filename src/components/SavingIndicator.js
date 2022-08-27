export default function SavingIndicator({ $target, initialState }) {
  const $indicator = document.createElement("div");
  $indicator.classList.add("indicator");
  $target.appendChild($indicator);

  this.state = initialState;

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  this.render = () => {
    $indicator.innerHTML = `
            <div>${this.state.isSaving ? "Saving..." : ""}</div>
        `;
  };
  this.render();
}
