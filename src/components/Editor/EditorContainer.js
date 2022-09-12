import Breadcrumb from "./Breadcrumb.js";
import Editor from "./Editor.js";
import RichEditorTitle from "./EditorTitle.js";
import RichEditor from "./RichEditor.js";

export default function EditorContainer({ $target, initialState, onChange }) {
  const $container = document.createElement("div");
  $container.classList.add("editor-container");

  this.state = initialState;

  this.setState = (nextState) => {
    this.state = nextState;

    richEditor.setState({
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
    richEditor.render();
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

  const richEditor = new RichEditor({
    $target: $container,
    initialState: this.state,
    onChange,
  });
}
