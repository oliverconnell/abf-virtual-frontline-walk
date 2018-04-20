var campaignId = 'gb-8097';
var groupId = '0';
var signUpLink = 'https://the-virtual-frontline-walk-2018.everydayhero.com//uk/get-started';

Number.prototype.formatNumber = function (c, d, t) {
    var n = this,
        c = isNaN(c = Math.abs(c)) ? 2 : c,
        d = d == undefined ? "," : d,
        t = t == undefined ? "." : t,
        s = n < 0 ? "-" : "",
        i = parseInt(n = Math.abs(+n || 0).toFixed(c)) + "",
        j = (j = i.length) > 3 ? j % 3 : 0;
    return s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");
};



function totaliser(cId, gName, gId) {


    var url = 'https://everydayhero.com/api/v2/search/totals?campaign_id=' + cId;
    if (gName != '') {
        url += '&group_value=' + encodeURIComponent(gName);
    }

    jQuery.getJSON(url)
        .fail(function (jqxhr, textStatus, error) {
            var err = textStatus + ", " + error;
        })
        .done(function (data) {
            $("#totalamount").html('£' + (data.total_amount_cents.sum / 100).formatNumber(0, '.', ','));

            $(".total-donations-number").html((data.total_amount_cents.count).formatNumber(0, '.', ','));
        });

    url = 'https://everydayhero.com/api/v2/search/pages?type=user&page=1&page_size=1&campaign_id=' + cId;
    if (gName != '') {
        url += '&group_value=' + encodeURIComponent(gName);
    }

    jQuery.getJSON(url)
        .fail(function (jqxhr, textStatus, error) {
            var err = textStatus + ", " + error;
        })
        .done(function (data) {
            $("#totalpages").html(data.meta.pagination.count);
        });

    $("#getstartedlink").attr("href", signUpLink);

}


function leaderboard(htmlDom, gName, limit, gId, cId, searchType) {

    var url, imageUrl, pageName, pageUrl, donateUrl, content;
    var position = 1;
    var counter = 0;

    url = 'https://everydayhero.com/api/v2/search/pages_totals?campaign_id=' + cId;
    url += '&limit=' + limit + '&group_by=' + searchType;


    if (gName != '') {
        url += '&group_value=' + encodeURIComponent(gName);
    }

    if (searchType == 'groups') {
        url += '&group_id=' + gId;
    }


    jQuery.getJSON(url)
        .fail(function (jqxhr, textStatus, error) {
            var err = textStatus + ", " + error;

        })
        .done(function (data) {

            content = '';

            if (data.results.length <= 0) {

                content += '<div class="wall-box">';
                content += '<article class="ptf-item-13">';
                content += '<div class="txt-holder-13">';
                content += '<h2>Sign up today and start fundraising </h2>';
                content += '<div class="subtitle-holder-13">';
                content += '<p class="bottom button"><a href="' + signUpLink + '">Register Now <i class="fas fa-angle-double-right"></i></a></p>';
                content += '</div>';
                content += '</div>';
                content += '<div class="overlay-13"></div><img src="images/placeholder-photo.jpg" alt="">';
                content += '</article>';
                content += '</div>';
            }

            for (var i = 0; i < data.results.length; i++) {


                switch (searchType) {
                    case 'teams':
                        imageUrl = data.results[i].team.image.large_image_url;
                        pageName = data.results[i].team.name;
                        pageUrl = data.results[i].team.url;
                        linkText = 'Support us';
                        break;
                    case 'groups':
                        imageUrl = 'images/placeholder-photo.jpg';
                        pageName = data.results[i].group.value;
                        pageUrl = 'group.html?group=' + encodeURIComponent(pageName);
                        linkText = 'Support us';
                        break;
                    default:


                        imageUrl = data.results[i].page.image.large_image_url;
                        pageName = data.results[i].page.name;
                        pageUrl = data.results[i].page.url;
                        linkText = 'Support Me';


                }

                if (pageName != 'I am not taking part with a company') {



                    raised = (data.results[i].amount_cents / 100).formatNumber(2, '.', ',');

                    content += '<li><a target="_blank" title="' + pageName + ' - fundraising page - opens in new window" href="' + pageUrl + '"><span id="name">' + pageName + '</span></a> <span id="raised">£' + raised + '</span></li>';


                }




            }


            $('#' + htmlDom).html(content);

        });




}



function distanceLeaderboard(htmlDom, gName, limit, gId, cId, searchType) {

    var url, imageUrl, pageName, pageUrl, donateUrl, content;
    var position = 1;
    var counter = 0;

    url = 'https://everydayhero.com/api/v2/search/fitness_activities_totals?campaign_id=' + cId;
    url += '&include_manual=true&type[]=walk&type[]=hike&type[]=run&limit=' + limit + '&group_by=' + searchType;

    if (gName != '') {
        url += '&group_value=' + encodeURIComponent(gName);
    }

    if (searchType == 'groups') {
        url += '&group_id=' + gId;
    }

    jQuery.getJSON(url)
        .fail(function (jqxhr, textStatus, error) {
            var err = textStatus + ", " + error;

        })
        .done(function (data) {

            content = '';

            if (data.results.length <= 0) {
                content += '<div class="col-sm-4 firstcontainer">';
                content += '<div class="first">';
                content += '<div class="supporter-place">';
                content += '<div class="supporter-photo"></div>';
                content += '<div class="supporter-name">Sign up today and track your distance </div>';
                content += '<div class="amount-raised"><a href="' + signUpLink + '">Register Now</a></div> ';
                content += '</div>';
                content += '</div>';
                content += '</div>';
            }

            for (var i = 0; i < data.results.length; i++) {

                switch (searchType) {
                    case 'teams':
                        imageUrl = data.results[i].team.image.large_image_url;
                        pageName = data.results[i].team.name;
                        pageUrl = data.results[i].team.url;
                        linkText = 'Support Us';
                        break;
                    case 'groups':
                        imageUrl = 'images/placeholder-photo.jpg';
                        pageName = data.results[i].group.value;
                        pageUrl = 'group.html?group=' + encodeURIComponent(pageName);
                        linkText = 'Support Us';
                        break;
                    default:


                        imageUrl = data.results[i].page.image.large_image_url;
                        pageName = data.results[i].page.name;
                        pageUrl = data.results[i].page.url;
                        linkText = 'Support Me';


                }



                distance = (data.results[i].distance_in_meters / 1000).formatNumber(2, '.', ',');

                content += '<li><a target="_blank" title="' + pageName + ' - fundraising page - opens in new window" href="' + pageUrl + '"><span id="name">' + pageName + '</span></a> <span id="raised">' + distance + ' KM</span></li>';




            }


            $('#' + htmlDom).html(content);

        });




}



function completeLeaderboard(htmlDom, gName, limit, pageSize, gId, cId, searchType) {

    var url, imageUrl, pageName, pageUrl, donateUrl, content;
    var position = 1;
    var counter = 0;
    var pages = 1;
    var pageCounter=1;

    url = 'https://everydayhero.com/api/v2/search/pages_totals?campaign_id=' + cId;
    url += '&limit=' + limit + '&group_by=' + searchType;


    if (gName != '') {
        url += '&group_value=' + encodeURIComponent(gName);
    }

    if (searchType == 'groups') {
        url += '&group_id=' + gId;
    }


    jQuery.getJSON(url)
        .fail(function (jqxhr, textStatus, error) {
            var err = textStatus + ", " + error;

        })
        .done(function (data) {

            content = '';

            if (data.results.length <= 0) {

                content += '<div class="wall-box">';
                content += '<article class="ptf-item-13">';
                content += '<div class="txt-holder-13">';
                content += '<h2>Sign up today and start fundraising </h2>';
                content += '<div class="subtitle-holder-13">';
                content += '<p class="bottom button"><a href="' + signUpLink + '">Register Now <i class="fas fa-angle-double-right"></i></a></p>';
                content += '</div>';
                content += '</div>';
                content += '<div class="overlay-13"></div><img src="images/placeholder-photo.jpg" alt="">';
                content += '</article>';
                content += '</div>';
            }

            for (var i = 0; i < data.results.length; i++) {


                switch (searchType) {
                    case 'teams':
                        imageUrl = data.results[i].team.image.large_image_url;
                        pageName = data.results[i].team.name;
                        pageUrl = data.results[i].team.url;
                        linkText = 'Support us';
                        break;
                    case 'groups':
                        imageUrl = 'images/placeholder-photo.jpg';
                        pageName = data.results[i].group.value;
                        pageUrl = 'group.html?group=' + encodeURIComponent(pageName);
                        linkText = 'Support us';
                        break;
                    default:


                        imageUrl = data.results[i].page.image.large_image_url;
                        pageName = data.results[i].page.name;
                        pageUrl = data.results[i].page.url;
                        linkText = 'Support Me';


                }


                raised = (data.results[i].amount_cents / 100).formatNumber(2, '.', ',');


                content += '<li data-page="' + pages + '" class="page' + pages;
                if (i == 0) {
                    content += ' first';
                }
                content += '"'; 
                if (pages > 1) {content+= ' style="display:none;"';}
                content +='><span id="position">' + position + '/ </span><a target="_blank" title="' + pageName + ' - fundraising page - opens in new window" href="' + pageUrl + '"><span id="name">' + pageName + '</span></a> <span id="raised">£' + raised + '</span></li>';

                position++;


                if (pageCounter == pageSize) {
                    // IF NOT THE LAST RECORD
                    if (i + 1 < data.results.length) {
                        pages = pages + 1;
                        pageCounter = 1;
                    }
                } else {
                    pageCounter++;
                }

                leaderboardPagination(pages,htmlDom);






            }


            $('#' + htmlDom).html(content);

        });




}


function completeLeaderboardDist(htmlDom, gName, limit, pageSize, gId, cId, searchType) {

    var url, imageUrl, pageName, pageUrl, donateUrl, content;
    var position = 1;
    var counter = 0;
    var pages = 1;
    var pageCounter=1;

    

    url = 'https://everydayhero.com/api/v2/search/fitness_activities_totals?campaign_id=' + cId;
    url += '&include_manual=true&type[]=walk&type[]=hike&type[]=run&limit=' + limit + '&group_by=' + searchType;


    if (gName != '') {
        url += '&group_value=' + encodeURIComponent(gName);
    }

    if (searchType == 'groups') {
        url += '&group_id=' + gId;
    }


    jQuery.getJSON(url)
        .fail(function (jqxhr, textStatus, error) {
            var err = textStatus + ", " + error;

        })
        .done(function (data) {

            content = '';

            if (data.results.length <= 0) {

                content += '<div class="wall-box">';
                content += '<article class="ptf-item-13">';
                content += '<div class="txt-holder-13">';
                content += '<h2>Sign up today and start fundraising </h2>';
                content += '<div class="subtitle-holder-13">';
                content += '<p class="bottom button"><a href="' + signUpLink + '">Register Now <i class="fas fa-angle-double-right"></i></a></p>';
                content += '</div>';
                content += '</div>';
                content += '<div class="overlay-13"></div><img src="images/placeholder-photo.jpg" alt="">';
                content += '</article>';
                content += '</div>';
            }

            for (var i = 0; i < data.results.length; i++) {


                switch (searchType) {
                    case 'teams':
                        imageUrl = data.results[i].team.image.large_image_url;
                        pageName = data.results[i].team.name;
                        pageUrl = data.results[i].team.url;
                        linkText = 'Support us';
                        break;
                    case 'groups':
                        imageUrl = 'images/placeholder-photo.jpg';
                        pageName = data.results[i].group.value;
                        pageUrl = 'group.html?group=' + encodeURIComponent(pageName);
                        linkText = 'Support us';
                        break;
                    default:


                        imageUrl = data.results[i].page.image.large_image_url;
                        pageName = data.results[i].page.name;
                        pageUrl = data.results[i].page.url;
                        linkText = 'Support Me';


                }


                distance = (data.results[i].distance_in_meters / 1000).formatNumber(2, '.', ',');


                content += '<li data-page="' + pages + '" class="page' + pages;
                if (i == 0) {
                    content += ' first';
                }
                content += '"'; 
                if (pages > 1) {content+= ' style="display:none;"';}
                content +='><span id="position">' + position + '/ </span><a target="_blank" title="' + pageName + ' - fundraising page - opens in new window" href="' + pageUrl + '"><span id="name">' + pageName + '</span></a> <span id="raised">' + distance + ' KM</span></li>';

                position++;


                if (pageCounter == pageSize) {
                    // IF NOT THE LAST RECORD
                    if (i + 1 < data.results.length) {
                        pages = pages + 1;
                        pageCounter = 1;
                    }
                } else {
                    pageCounter++;
                }

                leaderboardPagination(pages,htmlDom);






            }


            $('#' + htmlDom).html(content);

        });




}

function leaderboardPagination(total_pages,htmldom)
{
           

            if (total_pages > 1)
              {

                  var pagination = '';

                  for (var i = 1; i <= total_pages; i++) {    

                        pagination += '<li><a onclick="pageResults(' + total_pages + ',this,\''+ htmldom + '\')" data-page="' + i + '"';

                        if (i==1)
                        {
                          pagination += 'class="current"';
                        }
                        

                        pagination += '>' + i + '</a></li>';

                  }

                  
                  $('#pg-' + htmldom + ' ul').html(pagination);

                  $('#pg-' + htmldom).show();
              }
}

function pageResults( total_pages, element,htmldom)
{

    

    $('#pg-' + htmldom + ' ul li a').removeClass('current');
    $(element).addClass('current');

    for (var i = 1; i <= total_pages; i++)     
    {
        $('#' + htmldom + ' .page' + i).hide();
    }

    $('#' + htmldom + ' .page' + element.getAttribute('data-page')).show();

}




function stories(htmlDom) {
    url = 'js/stories.json';


    jQuery.getJSON(url)
        .fail(function (jqxhr, textStatus, error) {
            var err = textStatus + ", " + error;

        })
        .done(function (data) {

            var ran_key = Math.floor(Math.random() * data.stories.length);
            var content = '';

            content = '<div class="row">';
            content += '<div class="col-lg-6 col-md-12 photo">';
            content += '<img alt="' + data.stories[ran_key].name + '" src="images/stories/' + data.stories[ran_key].image + '"/>';
            content += '</div>';
            content += '<div class="col-lg-6 col-md-12 text">';
            content += '<div class="text-container">';
            content += '<h4>' + data.stories[ran_key].name + '</h4>';
            content += '<p class="regiment">' + data.stories[ran_key].servicenumber + '</p>';
            content += data.stories[ran_key].story;
            content += '</div></div></div>';


            $('#' + htmlDom).html(content);


        });
}



function supporterStory(htmlDom, gName, limit, gId, cId, searchType) {

    var url, imageUrl, pageName, pageUrl, donateUrl, content, amount;
    var searchDate = new Date();
    var position = 1;

    url = 'https://everydayhero.com/api/v2/pages.jsonp?callback=?&page=1&limit=130&type=individual&start_updated_at=' + searchDate.getFullYear();
    url += '-' + (searchDate.getMonth()) + '-' + searchDate.getDate() + '&campaign_id[]=' + cId;


    jQuery.getJSON(url)
        .fail(function (jqxhr, textStatus, error) {
            var err = textStatus + ", " + error;

        })
        .done(function (data) {

            content = '';

            var filtered_data = jQuery.grep(data.pages, function (element, index) {
                return element.image.large_image_url.indexOf('avatar') <= 0 && element.story.indexOf('I’m taking part in ') <= 0;
            });

            if (filtered_data.length > 0) {



                var ranKey = Math.floor(Math.random() * filtered_data.length);


                imageUrl = filtered_data[ranKey].image.large_image_url;
                pageName = filtered_data[ranKey].name;
                pageUrl = filtered_data[ranKey].url;
                amount = (filtered_data[ranKey].amount.cents / 100).formatNumber(0, '.', ',');
                story = filtered_data[ranKey].story;

                if (story.length > 350) {
                    story = story.substring(0, 350) + "...";
                }



                content += '<div class="row">';
                content += '<div class="col-lg-6 col-md-12 photo">';
                content += '<img src="' + imageUrl + '">';
                content += '</div>';
                content += '<div class="col-lg-6 col-md-12 text">';
                content += '<div class="text-container"><h4>' + pageName + '</h4><p class="regiment">Virtual Frontline Walk Fundraiser</p><p>' + story + '</p><p><a class="btn btn-secondary" target="_blank" title="' + pageName + ' fundraising page - opens in a new window" href="' + pageUrl + '" role="button">Visit my page <i class="fas fa-angle-double-right"></i></a></p></div>';
                content += '</div></div>';





            }

            $('#' + htmlDom).html(content);

        });




}




function supporterWall(htmlDom, gName, limit, pageSize, gId, cId, searchType) {

    var url, imageUrl, pageName, pageUrl, donateUrl, content, amount;
    var position = 1;
    var pageCounter = 1;
    var pages = 0;
    var percentage = 0;

    url = 'https://everydayhero.com/api/v2/search/pages?';
    url += 'campaign_id=' + cId;
    url += '&limit=' + limit;



    jQuery.getJSON(url)
        .fail(function (jqxhr, textStatus, error) {
            var err = textStatus + ", " + error;

        })
        .done(function (data) {

            content = '';

            if (data.pages.length <= 0) {


            }

            for (var i = 0; i < data.pages.length; i++) {

                switch (searchType) {
                    case 'teams':
                        imageUrl = data.teams[i].team.image.medium_image_url;
                        pageName = data.teams[i].team.name;
                        pageUrl = data.teams[i].team.url;
                        amount = (data.teams[i].amount.cents / 100).formatNumber(0, '.', ',');
                        break;
                    case 'groups':
                        imageUrl = 'images/missing.jpg';
                        pageName = data.pages[i].group.value;
                        pageUrl = '';
                        break;
                    default:

                        imageUrl = data.pages[i].image.medium_image_url;
                        pageName = data.pages[i].name;
                        pageUrl = data.pages[i].url;
                        amount = (data.pages[i].amount.cents / 100).formatNumber(0, '.', ',');




                }


                content += '<div class="box supporterGallery page' + pages + '"';
                if (pages > 0) {
                    content += ' style="display:none"';
                }
                content += '><article class="ptf-item-6">';
                content += '<div class="txt-holder-primary"></div><div class="txt-holder-secondary"><div class="description"><div class="inner-description">';
                content += '<p><a href="' + pageUrl + '"><span id="name">' + pageName + '</span></p><p> and raised £<span class="raised">' + amount + '</span></p><p><i class="fas fa-angle-double-right"></i></a></p></div></div> </div>';
                content += '<div class="overlay-6"></div><img src="' + imageUrl + '"/></article></div>';


                if (pageCounter >= pageSize) {

                    // IF NOT THE LAST RECORD
                    if (i < data.pages.length) {
                        pages = pages + 1;
                        pageCounter = 1;
                    }

                } else {
                    pageCounter++;
                }



            }


            $('#' + htmlDom).html(content);
            $('#supporterGalleryPageMax').val(pages);

            if (pages <= 1) {
                $("#supporterGalleryNext").hide();
            }

        });




}















