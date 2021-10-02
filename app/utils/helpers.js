/**
 * Get readable date from format 2021-08-22T10:55:43.859+07:00
 *
 * @param {string} val
 * 
 * @return {string} readable date in Indonesian
 */
export const readableDate =  (val) => {
    var thedate = new Date(val);
    var month = ["Januari", "Februari", "Maret", "April", "Mei", "Juni",
    "Juli", "Agustus", "September", "Oktober", "November", "Desember"][thedate.getMonth()];
    var str = thedate.getDate() + ' ' + month + ' ' + thedate.getFullYear();
    return str;
}

/**
 * Get readable date hour from format 2021-08-22T10:55:43.859+07:00
 *
 * @param {string} val
 * 
 * @return {string} readable date and hour in Indonesian
 */
export const readableDateHour =  (val) => {
    var thedate = new Date(val);
    var month = ["Januari", "Februari", "Maret", "April", "Mei", "Juni",
    "Juli", "Agustus", "September", "Oktober", "November", "Desember"][thedate.getMonth()];
    var str = thedate.getDate() + ' ' + month + ' ' + thedate.getFullYear() + ' Jam ' + thedate.getHours();
    return str;
}

/**
 * Get object clone from object
 *
 * @param {object} val
 * 
 * @return {object} the copy object
 */
export const deepClone = (val) => {
    return JSON.parse(JSON.stringify(val));
}

/**
 * Get string date time now
 * 
 * @return {string} the date time string
 */
 export const dateTimeNow = () => {
    let d = new Date()
    let str = "";
    let mt = d.getMonth();
    if(mt < 10)
        mt = "0" + mt
    let dt = d.getDate()
    if(dt < 10)
        dt = "0" + dt
    let hr = d.getHours()
    if(hr < 10)
        hr = "0" + hr
    let mn = d.getHours()
    if(mn < 10)
        mn = "0" + mn
    str += d.getFullYear() + "-" + mt + "-" + dt + "T" + hr + ":" + mn;
    return str;
}

/**
 * Normalize Data From Server for consumed in table
 *
 * @param {object} val
 * 
 * @return {object} the normalized data
 */
export const normalizeData = (val) => {
    const dataList = deepClone(val);
    let i = 0;
    const fromIndex = val.from;
    dataList.data.forEach(element => {
        element.Number = fromIndex + i;
        i++;
        element.updated_at = readableDateHour(element.UpdatedAt);
        element.created_at = readableDateHour(element.CreatedAt);
        if(element.DeletedAt != typeof undefined){
            if(element.DeletedAt != null){
                element.deleted_at = readableDateHour(element.DeletedAt);
            }
        }
    });
    return dataList;
}

/**
 * Get all query params from current url
 * 
 * @return {object} the query param object
 */
 export const getAllQueryParams = () => {
    const url = window.location.search;
    const params = new URLSearchParams(url);
    let paramObj = {};
    for(var value of params.keys()) {
        paramObj[value] = params.get(value);
    }
    return paramObj;
}