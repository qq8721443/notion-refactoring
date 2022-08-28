import Breadcrumb from "./Breadcrumb.js";
import Editor from "./Editor.js";
import RichEditorTitle from "./EditorTitle.js";

export default function EditorContainer({ $target, initialState, onChange }) {
  const $container = document.createElement("div");
  $container.classList.add("editor-container");

  this.state = initialState;

  this.setState = (nextState) => {
    this.state = nextState;
    editor.setState({
      ...this.state,
    });
    editorTitle.setState({
      ...this.state,
    });
    breadcrumb.setState({
      ...this.state,
    });
  };

  this.init = () => {
    $target.appendChild($container);
  };

  const breadcrumb = new Breadcrumb({
    $target: $container,
    initialState,
  });

  const editorTitle = new RichEditorTitle({
    $target: $container,
    initialState: this.state,
    onChange,
  });

  const editor = new Editor({
    $target: $container,
    initialState,
    onChange,
  });
}
