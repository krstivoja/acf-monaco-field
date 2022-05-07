(function( $ ) {

    function initialize_code_field( $el ) {

        if ( $el.parents( ".acf-clone" ).length > 0 ) {
            return;
        }

        var $textarea = $el.find( '.acf-input>textarea' );

        var editor = window.CodeMirror.fromTextArea( $textarea[ 0 ], {
            lineNumbers: true,
            fixedGutter: false,
            mode: $textarea.attr( "mode" ),
            theme: $textarea.attr( "theme" ),
            extraKeys: { "Ctrl-Space": "autocomplete" },
            matchBrackets: true,
            styleSelectedText: true,
            autoRefresh: true,
            value: document.documentElement.innerHTML,
            viewportMargin: Infinity
        } );

        editor.on('change', function(){
            editor.save();
        });
    }

    if ( typeof acf.add_action !== 'undefined' ) {
        acf.add_action('ready_field/type=acf_code_field', initialize_code_field);
        acf.add_action('append_field/type=acf_code_field', initialize_code_field);
    } else {
        $( document ).on( 'acf/setup_fields', function( e, postbox ) {

            // find all relevant fields
            $( postbox ).find( '.field[data-field_type="acf_code_field"]' ).each( function() {

                // initialize
                initialize_code_field( $( this ) );

            } );
        } );

    }

})( jQuery );





require.config({ paths: { 'vs': 'https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.27.0/min/vs' }});
require(['vs/editor/editor.main'], function() {
    let theme = "vs";
    if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
        theme = "vs-dark";
    }
    window.editor = monaco.editor.create(document.getElementById('editor'), {
        value: "# Document Header\n\nEnter some text, submit the form with Ctrl-s or Cmd-s shortcut.",
        language: 'markdown',
        lineNumbers: "off",
        wordWrap: "bounded",
        wordWrapColumn: 100,
        wrappingIndent: "same",
        fontSize: 14,
        roundedSelection: false,
        scrollBeyondLastLine: false,
        quickSuggestions: false,
        minimap: {enabled:false},
        theme: theme,
    });

    window.editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KEY_S, function() {
        var inp = document.getElementById('text');
        inp.value = window.editor.getValue();
        document.forms['MyForm'].submit();
    });

    window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", e => {
        if (e.matches) {
            monaco.editor.setTheme("vs-dark");
        } else {
            monaco.editor.setTheme("vs");
        }
    })

    const divElem = document.getElementById('editor');
    const resizeObserver = new ResizeObserver(entries => {
        window.editor.layout();
    });
    resizeObserver.observe(divElem);
});