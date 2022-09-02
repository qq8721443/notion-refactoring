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
    $homePage.innerHTML = `
      <div class="rich-editor-container">
        <div class="rich-editor">
          <div style="font-size: 40px; font-weight: bold; padding-top: 20px">Vanilla JS 노션 클로닝 프로젝트</div>
          <div style="margin-top: 48px;">자바스크립트를 사용해 만든 노션 클로닝 페이지입니다.</div>
        </div>
      </div>
    `;
  };
}
