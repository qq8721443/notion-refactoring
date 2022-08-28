export default function HomePage({ $target, initialState }) {
  const $homePage = document.createElement("div");
  $target.appendChild($homePage);

  this.state = initialState;

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  this.init = () => {
    $target.appendChild($homePage);
    this.render();
  };

  this.render = () => {
    $homePage.innerHTML = "homepage!";
  };
}
