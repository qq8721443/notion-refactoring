export default function RichEditor({ $target, initialState, onChange }) {
  const $richEditor = document.createElement("div");
  $richEditor.setAttribute("contenteditable", true);
  $richEditor.setAttribute("name", "content");
  $richEditor.setAttribute(
    "placeholder",
    "/ 를 입력해서 명령어를 사용해보세요."
  );
  $target.appendChild($richEditor);

  this.state = initialState;

  this.setState = (nextState) => {
    this.state = nextState;
  };

  this.render = () => {
    $richEditor.innerHTML = this.state.content;
  };

  this.render();

  $richEditor.addEventListener("input", onChange);
}
