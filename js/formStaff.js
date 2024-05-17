function createLabeledSelect(parent, label, options, onDelete, addDelete, idPrefix = "LabeledSelect") {
    const inputGroup = $("<div>").addClass("input-group mb-3").attr({ "id": `${label}${idPrefix}` });
    const span = $("<span>").addClass("input-group-text").text(label);
    const btn = $("<button>").addClass("btn btn-danger").text("X").on("click", () => onDelete(label));

    inputGroup.append(span[0]);
    createSelect(inputGroup[0], options, false, "", true);
    if (addDelete) { inputGroup.append(btn[0]) }
    parent.prepend(inputGroup[0]);
}


// Function to create a select input and append it to a parent element
function createSelect(parent, options, small, labelName, selectOnly) {
    const div = document.createElement("div");
    const label = document.createElement("label");
    const select = document.createElement("select");

    div.setAttribute("class", "mb-3")
    label.textContent = labelName;

    if (small) { select.setAttribute("class", "form-select form-select-sm") }
    else { select.setAttribute("class", "form-select"); }

    populateOptions(select, options);

    div.appendChild(label);
    div.appendChild(select);
    if (selectOnly) { parent.appendChild(select); } else { parent.appendChild(div) }
}

// Function to populate options for a select input
function populateOptions(selectElement, data, placeholder = "") {
    const emptyOption = document.createElement("option");
    emptyOption.text = placeholder;
    emptyOption.hidden = true;
    selectElement.add(emptyOption);

    for (const value of data) {
        const option = document.createElement("option");
        option.textContent = value;
        selectElement.add(option);
    };
}

function createSelectedOption(parent, label, values, onDelete, addDelete = true, idPrefix = "SelectedOption") {
    const div = $("<div>").addClass("mb-3").attr({ 'id': `${label}${idPrefix}` });
    const inputGroup = $("<div>").addClass("input-group");
    const input = $("<input>").attr({
        "id": "input" + label,
        "class": "form-control",
        "readonly": true,
        "value": label,
        "style": "border-bottom-left-radius: 0; border-bottom-right-radius: 0;",
    });
    const btn = $("<button>").attr({
        "class": "btn btn-danger",
        "style": "border-bottom-right-radius: 0;",
    }).on("click", () => onDelete(label));
    btn.html("X")

    const card = $("<div>").addClass("card").attr({
        "style": "border-top-left-radius: 0; border-top-right-radius: 0;",
    });
    const cardBody = $("<div>").addClass("card-body").attr({
        "style": "padding-top: 10px; padding-right: 10px; padding-bottom: 0px; padding-left: 10px;",
    });

    $.each(values, function (index, value) {
        if (typeof (value) == 'object') {
            createSelect(cardBody[0], value.options, true, value.name, false);
        }
    });

    inputGroup.append(input);
    if (addDelete) { inputGroup.append(btn) }
    parent.prepend(div.append(inputGroup, card.append(cardBody)[0])[0]);

    if (cardBody.children().length === 0) {
        card.remove();
        input.attr({ "style": "" });
        btn.attr({ "style": "" });
    }
}

