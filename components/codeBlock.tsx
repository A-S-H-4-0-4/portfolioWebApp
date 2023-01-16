import { CodeBlock, dracula } from "react-code-blocks";

const MyCoolCodeBlock = ({ code, language }) => {
  return (
    <CodeBlock
      text={code}
      language={language}
      theme={dracula}
    />
  );
}


export default MyCoolCodeBlock