export const getFormattedCurrentDate = (date=null) => {
    let now = new Date();
    if(date){
        now = new Date(date);
    }
    let day = now.getDate();
    let month = now.getMonth() + 1
    const year = now.getFullYear();
    if (day < 10) {
        day = `0${day}`;
    }
    if (month < 10) {
        month = `0${month}`;
    }
    return `${year}-${month}-${day}`
}

export const getFormattedDate = (date) => {
    if(typeof date === 'number') {
        return getFormattedCurrentDate(date)
    }
    return date
}