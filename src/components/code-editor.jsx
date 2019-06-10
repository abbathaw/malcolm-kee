import Highlight, { defaultProps } from 'prism-react-renderer';
import duotoneLight from 'prism-react-renderer/themes/duotoneLight';
import nightOwl from 'prism-react-renderer/themes/nightOwl';
import React from 'react';
import { LiveEditor, LiveError, LivePreview, LiveProvider } from 'react-live';
import { copyToClipboard } from '../helper';
import { useTheme } from '../theme';
import { Button } from './Button';
import { Popover, PopoverContent } from './popover';
import './code-editor.scss';

function sanitize(data) {
  return Array.isArray(data)
    ? `[${data.map(sanitize).join(',')}]`
    : data instanceof Error
    ? data.toString()
    : typeof data === 'object'
    ? JSON.stringify(data, null, 2)
    : typeof data === 'string'
    ? `"${data}"`
    : data;
}

function shallowConcat(targetArr, item) {
  if (!Array.isArray(targetArr)) return targetArr;

  const newArr = targetArr.slice();
  newArr.push(item);
  return newArr;
}

const isHighlightNextLine = tokens =>
  Array.isArray(tokens) &&
  tokens.some(
    token =>
      token.types[0] === 'comment' && token.content === '// highlight-next-line'
  );

/**
 * wrap js code with a React component that will render
 * list of logs
 */
const wrapJsCode = code => `
  class CodeWrapper extends React.Component {
      constructor(props) {
          super(props);
          this.state = {
            logs: []
          };
      }

      componentDidMount() {
        const log = content => 
          this.setState(prevState => ({
              logs: shallowConcat(prevState.logs, content)
            }));

        const console = {
          log: log,
          info: log,
          error: log
        }
        
        ${code}
      }

      render() {
          return (
              <React.Fragment>
              {this.state.logs.map((log, index) => 
                <div
                  className="log-output" 
                  key={index} 
                  dangerouslySetInnerHTML={{ __html: sanitize(log) }} 
                />)
              }
              </React.Fragment>
          );
      }
  }
`;

export const CodeEditor = ({ children, className }) => {
  const language = className && className.split('-').pop();

  const { value } = useTheme();

  const theme = value === 'dark' ? nightOwl : duotoneLight;

  return language === 'js' ? (
    <CodeLiveEditor code={children} theme={theme} />
  ) : language ? (
    <CodeSnippet code={children} language={language} theme={theme} />
  ) : (
    <code className="language-text">{children}</code>
  );
};

const CodeLiveEditor = ({ code, theme }) => {
  return (
    <div className="code-editor">
      <LiveProvider
        code={code}
        scope={{ sanitize, shallowConcat }}
        transformCode={wrapJsCode}
        theme={theme}
        language="jsx"
      >
        <header>
          <span>Code Editor</span>
          <CopyCodeButton code={code} />
        </header>
        <LiveEditor />
        <LiveError className="code-error" />
        <LivePreview className="code-preview" />
      </LiveProvider>
    </div>
  );
};

const CodeSnippet = React.memo(({ code, language, theme }) => {
  return (
    <div className="code-snippet">
      <header>
        <CopyCodeButton code={code} />
      </header>
      <Highlight
        {...defaultProps}
        theme={theme}
        code={code}
        language={language}
      >
        {({ className, style, tokens, getLineProps, getTokenProps }) => (
          <pre className={className} style={style}>
            {tokens
              .map((currentLine, index, allLines) => ({
                line: currentLine,
                isHighlighted: isHighlightNextLine(allLines[index - 1]),
              }))
              .filter(({ line }) => !isHighlightNextLine(line))
              .map(({ line, isHighlighted }, i) => (
                <div
                  {...getLineProps({
                    line,
                    key: i,
                    className: isHighlighted
                      ? 'highlighted-code-line'
                      : undefined,
                  })}
                >
                  {line.map((token, key) => (
                    <span {...getTokenProps({ token, key })} />
                  ))}
                </div>
              ))}
          </pre>
        )}
      </Highlight>
    </div>
  );
});

function CopyCodeButton({ code }) {
  const [showPopup, setShowPopup] = React.useState(false);

  function copyCode() {
    copyToClipboard(code);
    setShowPopup(true);
  }

  return (
    <Popover
      isOpen={showPopup}
      position="top"
      align="end"
      content={<PopoverContent>Copied to clipboard!</PopoverContent>}
      onClickOutside={() => setShowPopup(false)}
    >
      <Button onClick={copyCode} size="small" raised>
        Copy Code
      </Button>
    </Popover>
  );
}
