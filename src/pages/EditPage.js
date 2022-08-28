import EditorContainer from "../components/Editor/EditorContainer.js";

export default function EditPage({ $target, initialState, onChange }) {
  this.state = initialState;

  this.setState = (nextState) => {
    this.state = nextState;
    editorContainer.setState(this.state);
  };

  this.init = () => {
    editorContainer.init();
  };

  const editorContainer = new EditorContainer({
    $target,
    initialState: this.state,
    onChange,
  });
}
