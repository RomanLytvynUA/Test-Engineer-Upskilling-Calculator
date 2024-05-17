function handleCompTempSelect() {
    const selectedOption = $('#compTempSelect option:selected').text();
    selectedCompetencyTemplates.push(selectedOption);
    competencyTemplateOptions = competencyTemplateOptions.filter(option => option !== selectedOption);

    $("#compTempSelect").empty();
    populateOptions(compTempSelect, competencyTemplateOptions, "Select competency template to add...");
    createSelectedOption($('#selectedCompTemps')[0], selectedOption, competencyTemplate[selectedOption], handleCompTempDeletion);
};

function handleCompTempDeletion(name) {
    competencyTemplateOptions.push(name);
    selectedCompetencyTemplates = selectedCompetencyTemplates.filter(option => option !== name);
    $("#compTempSelect").empty();
    populateOptions(compTempSelect, competencyTemplateOptions, "Select competency template to add...");
    document.getElementById(`${name}SelectedOption`).remove();
}