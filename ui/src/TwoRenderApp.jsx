import React, { useState, useEffect } from "react";
import { parseMathTextToHtml, parseMathText } from "./functions";

function TwoRenderApp() {
    const getInitialTheme = () => localStorage.getItem("theme") || "system";

    const [theme, setTheme] = useState(getInitialTheme());
    const [note, setNote] = useState("Voici un exemple d'équation : $\\displaystyle f'(x) = \\lim_{\\Delta x \\to 0} \\frac{f(x+\\Delta x) - f(x)}{\\Delta x}$");
    const [copied, setCopied] = useState(false);
    const [fullscreen, setFullscreen] = useState(true);

    useEffect(() => {
        const applyTheme = (selectedTheme) => {
            if (selectedTheme === "system") {
                const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
                document.documentElement.setAttribute("data-bs-theme", systemPrefersDark ? "dark" : "light");
            } else {
                document.documentElement.setAttribute("data-bs-theme", selectedTheme);
            }
        };

        applyTheme(theme);
        localStorage.setItem("theme", theme);
    }, [theme]);

    const handleThemeChange = (event) => setTheme(event.target.value);
    const handleChange = (e) => setNote(e.target.value);
    const toggleFullscreen = () => setFullscreen(!fullscreen);

    const copyToClipboard = () => {
        if (note !== ""){
            navigator.clipboard.writeText(note).then(() => {
                setCopied(true);
                setTimeout(() => setCopied(false), 6000);
            });
        }
    };

    return (
        <div className={fullscreen ? "container-fluid h-100" : "container mt-5"} style={fullscreen ? { padding: '0rem' } : {}}>
            <div className={fullscreen ? "card h-100" : "card"}>
                <div className="card-header d-flex align-items-center justify-content-between">
                    <div className="d-flex gap-2">
                        {/* Hide fullscreen toggle button on mobile */}
                        <button className="btn btn-sm btn-outline-secondary" onClick={copyToClipboard}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-copy" viewBox="0 0 16 16">
                                <path fillRule="evenodd" d="M4 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2zm2-1a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1zM2 5a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1v-1h1v1a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h1v1z"/>
                            </svg>
                        </button>
                        {/* Hide fullscreen toggle button on mobile */}
                        <button className="btn btn-sm btn-outline-secondary d-none d-sm-inline" onClick={toggleFullscreen}>
                            {fullscreen ? (
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-fullscreen-exit" viewBox="0 0 16 16">
                                    <path d="M5.5 0a.5.5 0 0 1 .5.5v4A1.5 1.5 0 0 1 4.5 6h-4a.5.5 0 0 1 0-1h4a.5.5 0 0 0 .5-.5v-4a.5.5 0 0 1 .5-.5m5 0a.5.5 0 0 1 .5.5v4a.5.5 0 0 0 .5.5h4a.5.5 0 0 1 0 1h-4A1.5 1.5 0 0 1 10 4.5v-4a.5.5 0 0 1 .5-.5M0 10.5a.5.5 0 0 1 .5-.5h4A1.5 1.5 0 0 1 6 11.5v4a.5.5 0 0 1-1 0v-4a.5.5 0 0 0-.5-.5h-4a.5.5 0 0 1-.5-.5m10 1a1.5 1.5 0 0 1 1.5-1.5h4a.5.5 0 0 1 0 1h-4a.5.5 0 0 0-.5.5v4a.5.5 0 0 1-1 0z"/>
                                </svg>
                            ) : (
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                     className="bi bi-fullscreen" viewBox="0 0 16 16">
                                    <path
                                        d="M1.5 1a.5.5 0 0 0-.5.5v4a.5.5 0 0 1-1 0v-4A1.5 1.5 0 0 1 1.5 0h4a.5.5 0 0 1 0 1zM10 .5a.5.5 0 0 1 .5-.5h4A1.5 1.5 0 0 1 16 1.5v4a.5.5 0 0 1-1 0v-4a.5.5 0 0 0-.5-.5h-4a.5.5 0 0 1-.5-.5M.5 10a.5.5 0 0 1 .5.5v4a.5.5 0 0 0 .5.5h4a.5.5 0 0 1 0 1h-4A1.5 1.5 0 0 1 0 14.5v-4a.5.5 0 0 1 .5-.5m15 0a.5.5 0 0 1 .5.5v4a1.5 1.5 0 0 1-1.5 1.5h-4a.5.5 0 0 1 0-1h4a.5.5 0 0 0 .5-.5v-4a.5.5 0 0 1 .5-.5"/>
                                </svg>
                            )}
                        </button>
                    </div>
                    <div className="flex-grow-1 d-flex justify-content-center">
                        <h2 className="m-0">{parseMathText("$\\LaTeX$ $\\mathbb{N}otes$")}</h2>
                    </div>
                    <div>
                        <select className="form-select" value={theme} onChange={handleThemeChange}>
                            <option value="system">Système</option>
                            <option value="light">Clair</option>
                            <option value="dark">Sombre</option>
                        </select>
                    </div>
                </div>
                <div className="card-body">
                    <div className="form-control" style={{ minHeight: "100px", whiteSpace: "pre-wrap" }}
                         dangerouslySetInnerHTML={{ __html: parseMathTextToHtml(note) }}
                    />

                    <div className="mt-3">
                        <textarea className="form-control" rows="10" placeholder="Tapez votre note ici..."
                                  value={note} onChange={handleChange} />
                    </div>

                    <small className="form-text text-muted mt-2">
                        Exemple : <code>$e^{'{'}i\pi{'}'}$</code>
                    </small>
                </div>
            </div>

            {copied && (
                <div className="position-fixed bottom-0 end-0 p-3" style={{ zIndex: 11 }}>
                    <div className="toast show" role="alert" aria-live="assertive" aria-atomic="true">
                        <div className="toast-header">
                            <strong className="me-auto">Copié</strong>
                            <button type="button" className="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
                        </div>
                        <div className="toast-body">
                            Le texte a été copié dans le presse-papiers.
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default TwoRenderApp;
