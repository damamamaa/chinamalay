import React, { useRef, useEffect } from 'react';

const RichTextEditor = ({ value, onChange, placeholder, onImageUpload }) => {
    const contentRef = useRef(null);
    const fileInputRef = useRef(null);

    // Sync value prop changes to innerHTML
    // This allows external updates (like Magic Translate) to reflect in the editor
    useEffect(() => {
        if (contentRef.current && value !== contentRef.current.innerHTML) {
            // Prevent unnecessary updates if content is effectively the same
            // But safeguard for external overwrites
            if (document.activeElement !== contentRef.current) {
                contentRef.current.innerHTML = value || '';
            }
        }
    }, [value]);

    const handleInput = () => {
        if (contentRef.current) {
            onChange(contentRef.current.innerHTML);
        }
    };

    const execCmd = (command, value = null) => {
        document.execCommand(command, false, value);
        if (contentRef.current) {
            contentRef.current.focus();
        }
    };

    const handleImageClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    const handleFileChange = async (e) => {
        const file = e.target.files[0];
        if (file && onImageUpload) {
            try {
                const url = await onImageUpload(file);
                if (url) {
                    execCmd('insertImage', url);
                }
            } catch (error) {
                console.error(error);
                alert('Failed to upload image');
            }
        }
        // Reset inputs
        e.target.value = '';
    };

    return (
        <div className="rich-editor-container">
            <div className="editor-toolbar">
                <button type="button" onClick={() => execCmd('formatBlock', 'H2')} title="Heading 1"><b>H1</b></button>
                <button type="button" onClick={() => execCmd('formatBlock', 'H3')} title="Heading 2"><b>H2</b></button>
                <div className="separator"></div>
                <button type="button" onClick={() => execCmd('bold')} title="Bold"><b>B</b></button>
                <button type="button" onClick={() => execCmd('italic')} title="Italic"><i>I</i></button>
                <button type="button" onClick={() => execCmd('underline')} title="Underline"><u>U</u></button>
                <div className="separator"></div>
                <button type="button" onClick={() => execCmd('insertOrderedList')} title="Ordered List">1.</button>
                <button type="button" onClick={() => execCmd('insertUnorderedList')} title="Bullet List">•</button>
                <div className="separator"></div>
                <button type="button" onClick={() => execCmd('justifyLeft')} title="Align Left">Left</button>
                <button type="button" onClick={() => execCmd('justifyCenter')} title="Align Center">Center</button>
                <div className="separator"></div>
                <button type="button" onClick={() => {
                    const url = prompt('Enter link URL:');
                    if (url) execCmd('createLink', url);
                }} title="Link">🔗</button>

                {/* Image Upload Button */}
                <button type="button" onClick={handleImageClick} title="Insert Image">🖼️</button>
                <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    accept="image/*"
                    style={{ display: 'none' }}
                />
            </div>

            <div
                ref={contentRef}
                className="editor-content"
                contentEditable
                onInput={handleInput}
                onBlur={handleInput}
                placeholder={placeholder}
            />

            <style>{`
        .rich-editor-container {
          border: 1px solid #ddd;
          border-radius: 4px;
          background: white;
          overflow: hidden;
        }
        
        .editor-toolbar {
          background: #f8f9fa;
          padding: 8px;
          border-bottom: 1px solid #ddd;
          display: flex;
          gap: 5px;
          flex-wrap: wrap;
          align-items: center;
        }
        
        .editor-toolbar button {
          background: white;
          border: 1px solid #ccc;
          border-radius: 3px;
          padding: 4px 8px;
          cursor: pointer;
          font-size: 14px;
          min-width: 30px;
          height: 30px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        
        .editor-toolbar button:hover {
          background: #e2e6ea;
        }

        .editor-toolbar .separator {
            width: 1px;
            height: 20px;
            background: #ccc;
            margin: 0 5px;
        }
        
        .editor-content {
          padding: 15px;
          min-height: 250px; /* Taller editor */
          outline: none;
          overflow-y: auto;
          font-size: 16px;
          line-height: 1.6;
        }

        .editor-content:empty:before {
            content: attr(placeholder);
            color: #aaa;
            cursor: text;
        }

        /* Basic Styles inside editor */
        .editor-content h2 { font-size: 1.5em; margin-bottom: 0.5em; border-bottom: 1px solid #eee; padding-bottom: 5px; }
        .editor-content h3 { font-size: 1.25em; margin-bottom: 0.5em; }
        .editor-content ul, .editor-content ol { padding-left: 20px; }
        .editor-content a { color: #2196F3; text-decoration: underline; }
        
        /* Image inside editor */
        .editor-content img {
            max-width: 100%;
            height: auto;
            border-radius: 4px;
            margin: 10px 0;
            box-shadow: 0 2px 5px rgba(0,0,0,0.1);
        }
      `}</style>
        </div>
    );
};

export default RichTextEditor;
