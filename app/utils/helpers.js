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
        if(element.DeletedAt != typeof ndefined){
            if(element.DeletedAt != null){
                element.deleted_at = readableDateHour(element.DeletedAt);
            }
        }
    });
    return dataList;
}