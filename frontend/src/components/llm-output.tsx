import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { type LLMOutputComponent } from "@llm-ui/react";
import { markdownLookBack } from "@llm-ui/markdown";
import { useLLMOutput, useStreamExample } from "@llm-ui/react";

interface LlmOutputProps {
    report: string;
}

export default function LlmOutput({ report }: LlmOutputProps) {
    const { isStreamFinished, output } = useStreamExample(report, {
        delayMultiplier: 0.001,
    });

    const { blockMatches } = useLLMOutput({
        llmOutput: output,
        fallbackBlock: {
            component: MarkdownComponent,
            lookBack: markdownLookBack(),
        },
        isStreamFinished,
    });

    return (
        <div>
            {/* Template string part */}
            {blockMatches.map((blockMatch, index) => {
                const Component = blockMatch.block.component;
                return <Component key={index} blockMatch={blockMatch} />;
            })}
            {/* Ai generated report part */}
        </div>
    );
}

// Customize this component with your own styling
const MarkdownComponent: LLMOutputComponent = ({ blockMatch }) => {
    const markdown = blockMatch.output;
    return (
        <ReactMarkdown className="markdown" remarkPlugins={[remarkGfm]}>
            {markdown}
        </ReactMarkdown>
    );
};
