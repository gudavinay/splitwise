
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
    if(getUserProfile().id){
        return getUserProfile().id;
    }
    if(getUserProfile()._id){
        return getUserProfile()._id
    }
}
export function getUserEmail(){
    return getUserProfile().email.toLowerCase();
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

export function getProfilePicture(){
    return getUserProfile().profilePicture;
}

export function getUserCurrency(){
    return currencyConverter(getUserProfile().currency);
}

export function getMonthFromUtils(date){
    let localDate = new Date(new Date(date).setHours(new Date(date).getHours()-7))
    return months[localDate.getMonth()];
}

export function getDateFromUtils(date){
    let localDate = new Date(new Date(date).setHours(new Date(date).getHours()-7))
    return localDate.getDate();
}

export function getToken(){
    return "JWT "+getUserProfile().token;
}

export function fetchGroupName(group_id){
    let groupData = getGroupsInfo();
    if(groupData && groupData.length!==0){
        return groupData.find(group=>group.group_id === Number(group_id)).name;
    }
}
export function fetchGroupProfilePicture(group_id){
    let groupData = getGroupsInfo();
    if(groupData && groupData.length!==0){
        return groupData.find(group=>group.group_id === Number(group_id)).profilePicture;
    }
}