import React from 'react';

import { CodeBlock } from '@atlaskit/code';
import GlobalTheme from '@atlaskit/theme/components';

const CodeBlockDefaultExample = ({ language, text , theme}) => {
const mode = theme
  return (
    <GlobalTheme.Provider value={() => ({ mode })}>
      <CodeBlock language={language} text={text} />
    </GlobalTheme.Provider>
  );
};

export default CodeBlockDefaultExample;