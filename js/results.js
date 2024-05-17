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

        if (trainingData !== undefined) {
            const newRow = $('<tr>');
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
                const link = $(this).find('td:first-child a').attr('href');
                if (link === trainingData.link) {
                    const durrationCell = $(tr).find("td:last-child");
                    const currentRowspan = parseInt(durrationCell.attr("rowspan")) || 1; // Get the current rowspan value or default to 1 if it doesn't exist
                    durrationCell.attr("rowspan", currentRowspan + 1); // Increment the rowspan attribute

                    $(newRow).insertAfter($(tr));
                    duplicatedLink = true;
                    return false;
                }
            });

            // Only add to the end of the table, add duration cell and increase total duration if link is unique
            if (!duplicatedLink) {
                newRow.append($('<td>').text(trainingData.duration).addClass("align-middle text-center"));

                duration += trainingData.duration;
                tb.prepend(newRow);
            }
        } else {
            // Handles the case if there are no training data
            const newRow = $('<tr>');

            newRow.append($('<td>').text(training)).addClass("align-middle text-center");
            newRow.append($('<td>').html(`
                <div class="progress" role="progressbar" style="width: 100%">
                <div class="progress-bar ${trainingLevelClasses["Unknown"]} overflow-visible" style="width: 100%">
                Unknown
                </div>
                </div>`
            ).addClass("align-middle text-center"));
            newRow.append($('<td>').text("-").addClass("align-middle text-center"));
            tb.prepend(newRow);
        }
    });

    return duration;
}