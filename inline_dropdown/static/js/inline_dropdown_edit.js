/* Javascript for Inline Dropdown XBlock. */
function InlineDropdownXBlockInitEdit(runtime, element) {

    var xmlEditorTextarea = $('.block-xml-editor', element),
        xmlEditor = CodeMirror.fromTextArea(xmlEditorTextarea[0], { mode: 'xml', lineWrapping: true });

    $(element).find('.action-cancel').bind('click', function() {
        runtime.notify('cancel', {});
    });

    $(element).find('.action-save').bind('click', function() {
        var data = {
            'display_name': $('#inline_dropdown_edit_display_name').val(),
            'weight': $('#inline_dropdown_edit_weight').val(),
            'data': xmlEditor.getValue()
        };
        
        runtime.notify('save', {state: 'start'});
        
        var handlerUrl = runtime.handlerUrl(element, 'studio_submit');
        $.post(handlerUrl, JSON.stringify(data)).done(function(response) {
            if (response.result === 'success') {
                runtime.notify('save', {state: 'end'});
                //Reload the page
                //window.location.reload(false);
            } else {
                runtime.notify('error', {msg: response.message})
            }
        });
    });
}

