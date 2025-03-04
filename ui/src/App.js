import React, { useState } from 'react';
import {parseMathTextToHtml} from "./functions";


function App() {
  const [note, setNote] = useState('');

  const handleChange = (e) => {
    setNote(e.target.value);
  };

  // Conteneur qui englobe la prévisualisation et la zone de saisie
  const containerStyle = {
    position: 'relative',
    height: '200px',
    fontSize: '16px',
    lineHeight: '1.5',
    padding: '10px',
    border: '1px solid #ced4da',
    borderRadius: '0.25rem',
    whiteSpace: 'pre-wrap',
    wordWrap: 'break-word',
  };

  // Couche de prévisualisation qui affiche le rendu HTML (et LaTeX)
  const previewStyle = {
    position: 'absolute',
    pointerEvents: 'none',
    zIndex: 1,
  };

  // La zone de saisie (textarea) qui capte l'input de l'utilisateur
  // Le texte saisi est complètement transparent, seule la caret reste visible
  const textareaStyle = {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    resize: 'none',
    background: 'transparent',
    color: 'transparent', // le texte n'est pas affiché
    caretColor: 'transparent',  // seule la caret est visible
    border: 'none',
    outline: 'none',
    padding: '10px',
    zIndex: 2,
  };

  return (
      <div className="container mt-5">
        <div className="card">
          <div className="card-header">
            <h2>Prise de Note avec LaTeX Inline</h2>
          </div>
          <div className="card-body">
            <div style={containerStyle}>
              {/* Couche de prévisualisation */}
              <div
                  style={previewStyle}
                  dangerouslySetInnerHTML={{ __html: parseMathTextToHtml(note) }}
              />
              {/* Zone de saisie transparente */}
              <textarea
                  value={note}
                  onChange={handleChange}
                  style={textareaStyle}
                  placeholder="Tapez votre note ici. Pour insérer une formule LaTeX, utilisez $...$"
              />
            </div>
            <small className="form-text text-muted mt-2">
              Exemple : <code>$3x+1$</code>
            </small>
          </div>
        </div>
      </div>
  );
}

export default App;
