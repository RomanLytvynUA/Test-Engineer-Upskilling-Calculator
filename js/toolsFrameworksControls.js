function handleToolsSelect() {
    const selectedOption = $('#toolsSelect option:selected').text();
    $('#toolsSelect option:first-child')[0].selected = true;
    selectedTools.push(selectedOption);

    createLabeledSelect($('#selectedTools')[0], selectedOption, toolsFrameworks[selectedOption], handleToolsDeletion, true)
};

function handleToolsDeletion(element, name) {
    selectedTools = selectedTools.filter(option => option !== name);
    element.remove();
}