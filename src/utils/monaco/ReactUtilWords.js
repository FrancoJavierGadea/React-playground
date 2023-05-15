

const REACT_PROPERTIES = [
    'useState', 'useEffect', 'useLayoutEffect', 'useCallback', 'useMemo', 'useRef',
    'useContext', 'useReducer', 'useId', 'useImperativeHandle',

    'createContext', 'forwardRef', 'lazy', 'memo'
]

const REACT_EVENTS =  [ 
    'onClick', 'onDoubleClick',

    'onMouseEnter', 'onMouseLeave', 'onMouseOver', 'onMouseOut',

    'onKeyPress', 'onKeyUp', 'onKeyDown',

    'onDragStart', 'onDragEnd', 'onDragEnter', 'onDragLeave', 'onDragOver', 'onDrop',

    'onFocus', 'onBlur', 'onCopy', 'onCut', 'onPaste',

    'onInvalid', 'onSubmit', 'onReset',

    'onInput','onChange', 'onSelect',

    'onScroll', 'onWheel',

    'onContextMenu',
    'onTouchStart',
    'onTouchEnd',
    'onTouchMove',
    'onTouchCancel',   
    'onTransitionEnd',
    'onAnimationStart',
    'onAnimationEnd',
    'onAnimationIteration',
    'onAbort',
    'onCanPlay',
    'onCanPlayThrough',
    'onDurationChange',
    'onEmptied',
    'onEncrypted',
    'onEnded',
    'onError',
    'onLoadedData',
    'onLoadedMetadata',
    'onLoadStart',
    'onPause',
    'onPlay',
    'onPlaying',
    'onProgress',
    'onRateChange',
    'onSeeked',
    'onSeeking',
    'onStalled',
    'onSuspend',
    'onTimeUpdate',
    'onVolumeChange',
    'onWaiting'
];


export function reactUtilWords(monaco){

    const completionItemProvider = {

        provideCompletionItems: (model, position) => {

            return {
                suggestions: [

                    ...REACT_PROPERTIES.map(name => {

                        return {
                            label: name,
                            insertText: name,
                            documentation: `React\n\n${name}`,
                            detail: 'React',
    
                            kind: monaco.languages.CompletionItemKind.Variable,
                            sortText: '0'
                        }
                    }),

                    ...REACT_EVENTS.map(name => {

                        return {
                            label: name,
                            insertText: name,
                            documentation: `React\n\n${name}`,
                            detail: 'React',
    
                            kind: monaco.languages.CompletionItemKind.Event,
                            sortText: '0'
                        }
                    })
                ]
            };
        }
    };

    monaco.languages.registerCompletionItemProvider('javascript', completionItemProvider);
    monaco.languages.registerCompletionItemProvider('typescript', completionItemProvider);
}