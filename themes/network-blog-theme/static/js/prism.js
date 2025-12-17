// Prism.js - Lightweight syntax highlighter
// This is a minimal implementation. For full features, use the official Prism.js library

(function() {
    'use strict';

    // Simple syntax highlighting for common patterns
    function highlightCode(code, language) {
        if (!language) language = 'javascript';
        
        // Java highlighting
        if (language === 'java') {
            code = code
                .replace(/(\b(public|private|protected|static|final|class|interface|extends|implements|import|package|void|int|String|boolean|if|else|for|while|return|new|this|super)\b)/g, '<span class="token keyword">$1</span>')
                .replace(/(\/\/.*)/g, '<span class="token comment">$1</span>')
                .replace(/(\/\*[\s\S]*?\*\/)/g, '<span class="token comment">$1</span>')
                .replace(/(\b\d+\.?\d*\b)/g, '<span class="token number">$1</span>')
                .replace(/(&quot;.*?&quot;|'.*?')/g, '<span class="token string">$1</span>');
        }
        
        // JavaScript highlighting
        if (language === 'javascript' || language === 'js') {
            code = code
                .replace(/(\b(const|let|var|function|async|await|return|if|else|for|while|class|extends|import|export|default|new|this|super|try|catch|finally|throw|Promise|console|require|module|exports)\b)/g, '<span class="token keyword">$1</span>')
                .replace(/(\/\/.*)/g, '<span class="token comment">$1</span>')
                .replace(/(\/\*[\s\S]*?\*\/)/g, '<span class="token comment">$1</span>')
                .replace(/(\b\d+\.?\d*\b)/g, '<span class="token number">$1</span>')
                .replace(/(&quot;.*?&quot;|'.*?'|`.*?`)/g, '<span class="token string">$1</span>');
        }

        return code;
    }

    // Highlight all code blocks
    function highlightAll() {
        const codeBlocks = document.querySelectorAll('pre code');
        codeBlocks.forEach(function(block) {
            const language = block.className.replace('language-', '') || 'javascript';
            const code = block.textContent;
            block.innerHTML = highlightCode(code, language);
        });
    }

    // Run on DOM ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', highlightAll);
    } else {
        highlightAll();
    }
})();

