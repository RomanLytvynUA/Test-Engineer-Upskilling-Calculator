function handleRoleSelect(role) {
    $('#selectedRoleFields').empty();
    if (role === "") {
        return;
    }
    $.each(baseRoles[role].reverse(), function (i, field) {
        if (toolsFrameworks.hasOwnProperty(field.name)) {
            createLabeledSelect($('#selectedRoleFields')[0], field.name, field.options, null, false, idPrefix = "");
        } else if (competencyTemplate.hasOwnProperty(field.name)) {
            createSelectedOption($('#selectedRoleFields')[0], field.name, field.options, null, false, idPrefix = "")
        }
    });
};