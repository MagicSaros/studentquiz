
export let capitalize = string => string ? string.charAt(0).toUpperCase() + string.substr(1).toLowerCase() : string;

export let toFullDateTimeFormat = dateString => {
    let date = new Date(dateString);
    let dateFormatted = `${date.getFullYear()}/${date.getMonth()}/${date.getDay()}, ${date.toLocaleTimeString('eu')}`;
    return dateFormatted;
}