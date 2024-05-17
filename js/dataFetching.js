async function fetchData() {
    trainings = await fetchJSONFromFile('trainings');
    baseRoles = await fetchJSONFromFile('Base Roles');
    competencyTemplate = await fetchJSONFromFile('Competency template');
    toolsFrameworks = await fetchJSONFromFile('Tools/Frameworks');
}

async function fetchJSONFromFile(fileName) {
    fileName = fileName.replace(/[<>:"/\\|?*]/g, '_');

    const response = await fetch('./data/' + fileName + '.json');
    if (!response.ok) {
        throw new Error('Failed to fetch data');
    }
    const data = await response.json();
    return data;
}
