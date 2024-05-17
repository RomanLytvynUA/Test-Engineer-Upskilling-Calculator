function handleToolsSelect() {
    const selectedOption = $('#toolsSelect option:selected').text();
    selectedTools.push(selectedOption);
    toolsOptions = toolsOptions.filter(option => option !== selectedOption);

    $("#toolsSelect").empty();
    populateOptions(toolsSelect, toolsOptions, "Select tool\\framework to add...");
    createLabeledSelect($('#selectedTools')[0], selectedOption, toolsFrameworks[selectedOption], handleToolsDeletion, true)
};

function handleToolsDeletion(name) {
    toolsOptions.push(name);
    selectedTools = selectedTools.filter(option => option !== name);

    $("#toolsSelect").empty();
    populateOptions(toolsSelect, toolsOptions, "Select tool\\framework to add...");
    document.getElementById(`${name}LabeledSelect`).remove();
}