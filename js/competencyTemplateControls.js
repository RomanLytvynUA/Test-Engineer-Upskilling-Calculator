function handleCompTempSelect() {
    const selectedOption = $('#compTempSelect option:selected').text();
    $('#compTempSelect option:first-child')[0].selected = true;
    selectedCompetencyTemplates.push(selectedOption);

    createSelectedOption($('#selectedCompTemps')[0], selectedOption, competencyTemplate[selectedOption], handleCompTempDeletion);
};

function handleCompTempDeletion(element, name) {
    selectedCompetencyTemplates.splice(selectedCompetencyTemplates.indexOf(name), 1);

    element.remove();
}