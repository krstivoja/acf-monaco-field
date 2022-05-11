require.config({ paths: { 'vs': 'https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.27.0/min/vs' }});
    
require(['vs/editor/editor.main'], function() {
    let theme = "vs";
    if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
        theme = "vs-dark";
    }
    window.editor = monaco.editor.create(document.getElementById('monaco-editor'), {
        value: "# Document Header\n\nEnter some text, submit the form with Ctrl-s or Cmd-s shortcut.",
        language: 'html',
        // lineNumbers: "off",
        wordWrap: "bounded",
        wordWrapColumn: 100,
        wrappingIndent: "same",
        fontSize: 16,
        roundedSelection: false,
        scrollBeyondLastLine: false,
        quickSuggestions: false,
        minimap: {enabled:false},
        theme: theme,
    });

    // window.editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KEY_S, function() {
    //     var inp = document.getElementById('text');
    //     inp.value = window.editor.getValue();
    //     document.forms['MyForm'].submit();
    // });

    window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", e => {
        if (e.matches) {
            monaco.editor.setTheme("vs-dark");
        } else {
            monaco.editor.setTheme("vs");
        }
    })

    const divElem = document.getElementById('monaco-editor');
    const resizeObserver = new ResizeObserver(entries => {
        window.editor.layout();
    });
    resizeObserver.observe(divElem);
});