import {useRef, useEffect} from "react";

export function escapeHtml(text) {
    if (!text) return text;
    return text
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;");
}

export function parseMathTextToHtml(text) {
    if (typeof text !== 'string') return text;
    // Découpe le texte en morceaux en séparant les portions $...$
    const parts = text.split(/(\$[^$]+\$)/g);
    return parts.map((part) => {
        if (part.startsWith('$') && part.endsWith('$')) {
            const latex = part.slice(1, -1);
            try {
                // Rendu LaTeX avec Katex si disponible
                return window.katex
                    ? window.katex.renderToString(latex, {
                        throwOnError: false,
                        strict: false,
                    })
                    : escapeHtml(part);
            } catch (e) {
                return escapeHtml(part);
            }
        } else {
            return escapeHtml(part);
        }
    }).join('');
}

const MathComponent = ({ latex }) => {
    const mathRef = useRef(null);

    useEffect(() => {
        if (window.katex && mathRef.current) {
            window.katex.render(latex, mathRef.current, {
                throwOnError: false,
                strict: false,
            });
        }
    }, [latex]);

    return (
        <span ref={mathRef} style={{ whiteSpace: "nowrap", display: "inline-block" }} />
    );
};

// Transforme un texte contenant des portions LaTeX délimitées par $...$
export const parseMathText = (text) => {
    if (typeof text !== "string") return text;
    const parts = text.split(/(\$[^$]+\$)/g);
    return parts.map((part, index) =>
        part.startsWith("$") && part.endsWith("$") ? (
            <MathComponent key={index} latex={part.slice(1, -1)} />
        ) : (
            part
        )
    );
};
