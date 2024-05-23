let trainingLevelClasses = {
    "Unknown": "bg-secondary",
    "Basic": "bg-success",
    "Advanced": "bg-danger",
}

function handleSubmit() {
    const totalCell = $('#totalCell');

    if (state === "form") {
        const selectedTrainings = collectTrainings();

        duration = createTable(selectedTrainings);
        totalCell.text(duration) // set the total duration value

        state = "results";
        $("#form").hide();
        $("#results").show();
        $("#submitBtn").html("Go back");
    } else {
        state = "form";
        $("#results").hide();
        $("#form").show();
        $("#submitBtn").html("Show required trainings");
    }
}

function collectTrainings() {
    // Need to omit preselected select options and all base role select options
    const valuesToOmit = ['Select competency template to add...', 'Select tool\\framework to add...'];
    $('#roleSelect option').each(function () {
        valuesToOmit.push($(this).val());
    });

    let collectedTrainings = [];

    // Add all default trainings for base role
    $.each(baseRoles[$("#roleSelect").val()], function (i, training) {
        if (typeof training !== 'object' && !collectedTrainings.includes(training) && !valuesToOmit.includes(training)) {
            collectedTrainings.push(training);
        }
    });
    // Add all default trainings for competency templates
    $.each(selectedCompetencyTemplates, function (i, template) {
        $.each(competencyTemplate[template], function (j, training) {
            if (typeof training !== 'object' && !collectedTrainings.includes(training) && !valuesToOmit.includes(training)) {
                collectedTrainings.push(training);
            }
        });
    });
    // Add all selected trainings
    $('#trainingsSelect select').each(function () {
        if (!collectedTrainings.includes($(this).val()) && !valuesToOmit.includes($(this).val())) {
            collectedTrainings.push($(this).val());
        }
    });

    return collectedTrainings;
}

function createTable(trainingsData) {
    duration = 0

    const tb = $('#resultsTableBody');
    tb.find('tr:not(:last-child)').remove();
    $.each(trainingsData, function (i, training) {
        trainingData = trainings.find(currentTraining => currentTraining.name == training)

        const newRow = $('<tr>');
        const checkbox = $('<td>').html('<input class="form-check-input" type=checkbox checked>').addClass("align-middle text-center");
        if (trainingData !== undefined) {
            let duplicatedLink = false;

            newRow.append($('<td>').html(`<a target="_blank" href="${trainingData.link}">${trainingData.name}</a>`).addClass("align-middle text-center"));
            newRow.append($('<td>').html(`
            <div class="progress" role="progressbar" style="width: 100%">
            <div class="progress-bar ${trainingLevelClasses[trainingData.level]} overflow-visible" style="width: 100%">
            ${trainingData.level}
            </div>
            </div>`
            ).addClass("align-middle text-center"));

            // Look for a tr where training link matches current
            tb.find('tr').each(function (i, tr) {
                const link = $(this).find('td:nth-child(2) a').attr('href');
                if (link === trainingData.link) {
                    const checkboxCell = $(tr).find("td:first-child");
                    const durrationCell = $(tr).find("td:last-child");
                    const currentRowspan = parseInt(durrationCell.attr("rowspan")) || 1; // Get the current rowspan value or default to 1 if it doesn't exist
                    durrationCell.attr("rowspan", currentRowspan + 1); // Increment the rowspan attribute
                    checkboxCell.attr("rowspan", currentRowspan + 1);
                    $(newRow).insertAfter($(tr));
                    duplicatedLink = true;
                    return false;
                }
            });

            // Only add to the end of the table, add duration cell and increase total duration if link is unique
            if (!duplicatedLink) {
                newRow.prepend(checkbox);
                setUpCheckBox(checkbox, tb, newRow)
                newRow.append($('<td>').text(trainingData.duration).addClass("align-middle text-center"));


                duration += trainingData.duration;
                tb.prepend(newRow);
            }

        } else {
            // Handles the case if there are no training data
            newRow.append($('<td>').text(training)).addClass("align-middle text-center");
            newRow.append($('<td>').html(`
            <div class="progress" role="progressbar" style="width: 100%">
            <div class="progress-bar ${trainingLevelClasses["Unknown"]} overflow-visible" style="width: 100%">
            Unknown
            </div>
            </div>`
            ).addClass("align-middle text-center"));
            newRow.append($('<td>').text("-").addClass("align-middle text-center"));
            newRow.prepend(checkbox);
            setUpCheckBox(checkbox, tb, newRow)
            tb.prepend(newRow);
        }
    });

    return duration;
}

function setUpCheckBox(checkbox, tb, row) {
    checkbox.find(`input`).change(function () {
        const totalDuration = Number($('#totalCell').text());
        const trainingDuration = Number($(this).closest('tr').find("td:last-child").text());
        const rowspan = row.find('td:first-child')[0].rowSpan;
        const rowIndex = tb.children().index(row) + 1;

        if (this.checked) {
            for (let i = 0; i < rowspan; i++) {
                tb.find(`tr:nth-child(${i + rowIndex})`).css('opacity', '1');
            }
            $('#totalCell').text(isNaN(trainingDuration) ? totalDuration : totalDuration + trainingDuration);
        } else {
            for (let i = 0; i < rowspan; i++) {
                tb.find(`tr:nth-child(${i + rowIndex})`).css('opacity', '0.5');
            }
            $('#totalCell').text(isNaN(trainingDuration) ? totalDuration : totalDuration - trainingDuration);
        }
    });
}