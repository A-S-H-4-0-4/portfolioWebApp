import CopyToClipboard from "react-copy-to-clipboard";
import SyntaxHighlighter from "react-syntax-highlighter";
// import { docco } from "react-syntax-highlighter/dist/esm/styles/hljs";
import swal from "sweetalert";

const CodeBlockDefaultExample = ({ language, text, theme,textc }) => {
  return (
    <div className="h-full w-1/2 flex flex-col justify-center items-center">
      <CopyToClipboard text={text}>
        <button
          onClick={() => {
            swal("code copied successfully");
          }}
        >
          Copy Code
        </button>
      </CopyToClipboard>
      <SyntaxHighlighter language={language} showLineNumbers={true} customStyle={{
        background: theme,
        color: textc
      }} >{text}</SyntaxHighlighter>
    </div>
  );
};

export default CodeBlockDefaultExample;
