
const months = ['JAN','FEB','MAR','APR','MAY','JUN','JUL','AUG','SEP','OCT','NOV','DEC'];

export function currencyConverter(currency){
    switch(currency.toUpperCase()){
        case 'USD':return '$';
        case 'KWD':return 'KWD';
        case 'BHD':return 'BD';
        case 'GBP':return '£';
        case 'EUR':return '€';
        case 'CAD':return '$';
        default:return currency;
    }
}

export function findUserName(user_id){
    alert("user called")
}

export function getGroupsInfo(){
    return JSON.parse(localStorage.getItem("groupsInfo"));
}

export function getUserProfile(){
    return JSON.parse(localStorage.getItem("userProfile"));
}

export function getUserID(){
    return getUserProfile().id;
}

export function getUserEmail(){
    return getUserProfile().email;
}

export function getUserName(){
    return getUserProfile().name;
}

export function getUserPhone(){
    return getUserProfile().phone;
}

export function getUserCurrencyDesc(){
    return getUserProfile().currency;
}

export function getUserTimezone(){
    return getUserProfile().timezone;
}

export function getUserLanguage(){
    return getUserProfile().language;
}

export function getUserCurrency(){
    return currencyConverter(getUserProfile().currency);
}

export function getMonthFromUtils(date){
    return months[new Date(date).getMonth()];
}

export function getDateFromUtils(date){
    return new Date(date).getDate();
}