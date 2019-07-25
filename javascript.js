//retrieve and cache submit button href value
let submitList = $('.qfilter-submit');
let hrefList = [];
for (let i = 0; i < submitList.length; i++) {
    hrefList.push(submitList[i].getAttribute('href'));
}
//categories
let bodystyle = {filterName:"bodystyle",filterValues:[]};
let fueltype = {filterName:"fueltype",filterValues:[]};
let extcolor = {filterName:"extcolor",filterValues:[]};
let features = {filterName:"features",filterValues:[]};
//categories list
const categories = [bodystyle,fueltype,extcolor,features];
//manages options/filters
function sortFilter(option) {
    //interate through each category
    for (let i = 0; i < categories.length; i++) {
        if (option.dataset.filter == categories[i].filterName) {
            //if category doesn't include option, add it
            if (categories[i].filterValues.includes(option) == false) {
                categories[i].filterValues.push(option);
            //if category includes option, find and remove it
            } else {
                for (let n = 0; n < categories[i].filterValues.length; n++) {
                    if (categories[i].filterValues[n] == option) {
                        categories[i].filterValues.splice(n,1);
                    }
                }
            }
        }
    }
}
//builds query string
function buildQuery() {
    let queryString = "";
    let beginBuild = false;
    //interate through each category
    for (let i = 0; i < categories.length; i++) {
        if (categories[i].filterValues.length > 0) {
            //place correct character between categories
            if (beginBuild == false) {
                queryString += "?";
                beginBuild = true;
            } else {
                queryString += "&";
            }
            //add category name and values to querystring
            filterValues = "";
            beginCount = false;
            for (let n = 0; n < categories[i].filterValues.length; n++) {
                if (beginCount == true) {
                    filterValues += ",";
                }
                filterValues += categories[i].filterValues[n].dataset.value;
                beginCount = true;
            }
            //add to total querystring
            queryString += categories[i].filterName+ "=" + filterValues;
        }
    }
    //replace spaces with %20
    queryString = queryString.replace(new RegExp(" ", 'g'), "%20");
    //update submit button href
    for (let i = 0; i < submitList.length; i++) {
        $(submitList[i]).attr('href',hrefList[i] + queryString);
        
    }
}
//onclick
$('.qfilter-option').click(function(){
    $(this).toggleClass('qfilter-selected');
    sortFilter(this);
    buildQuery();
});
