
import CodeBlockEditor from "./CodeBlockEditor";


function CustomCodeBlock({node, inline, className, children, ...props}) {

    const match = /language-(\w+)/.exec(className || '');

    return (<>

        { !inline && match ? 
 
            <CodeBlockEditor value={children[0]} lang={match[1]} />
        :
            <code {...props} className={className}>{children}</code>
        }

    </>);
}

export default CustomCodeBlock;