

var edh_campaign_id = 'gb-5338';


Number.prototype.formatMoney = function(c, d, t){
    var n = this, c = isNaN(c = Math.abs(c)) ? 2 : c, d = d == undefined ? "," : d, t = t == undefined ? "." : t, s = n < 0 ? "-" : "", i = parseInt(n = Math.abs(+n || 0).toFixed(c)) + "", j = (j = i.length) > 3 ? j % 3 : 0;
    return s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");
  };



function getTotalisers()
{


          var edh_API = 'https://everydayhero.com/api/v2/campaigns/' + edh_campaign_id + '.json';
          
	// checking api call
	console.log(edh_API);
	
	
	
	
	
          jQuery.getJSON(edh_API)
          .fail(function( jqxhr, textStatus, error ) {
            var err = textStatus + ", " + error;
          })
          .done(function( data ) {

console.log(data);
			  
	//to add totaliser
			  $("#totalamount").html((data.campaign.funds_raised.cents/100).formatMoney(2, '.', ','));
			  
	//to add page count	
			  $("#totalpages").html(data.campaign.page_count);
			  
	// to add link
			  $("#getstartedlink").attr("href", data.campaign.get_started_url);
			  
			  
			  
			  
			  
          });

}









/* LEADERBOARD RAISED */
  function leaderboards_raised(searchtype,htmldom,limit,page_size)
    {
        var edh_API = 'https://everydayhero.com/api/v2/search/pages_totals?limit=' + limit + '&campaign_id=' + edh_campaign_id;
        edh_API += '&group_by=' + searchtype;
 
        jQuery.getJSON(edh_API)
          .fail(function( jqxhr, textStatus, error ) {
            var err = textStatus + ", " + error;
 
          })
          .done(function( data ) {
 
                leaderboard_display_raised(data,htmldom,searchtype,limit,page_size);
          });
 
    }
 
   // RAISED
function leaderboard_display_raised(data,htmldom,searchType,limit,page_size)
  {
       
        var position = 1;
        var lb_content = '';
        var image_url = '';
 
        var page_counter=1;
        var pages = 1;
 

        // IF NO RESULTS FOR LEADERBOARD
        if (data.results.length <= 0)
        {
 lb_content +='<li>Be the first on the board - <a href="https://registration.everydayhero.com/ps/event/TheVirtualFrontlineWalk2018/">register now</a></li>';
        }
 
        for (var i = 0; i < data.results.length; i++) {
 
                        switch(searchType) {
                            case 'teams':
                                image_url = data.results[i].team.image.medium_image_url;
                                page_name = data.results[i].team.name;
                                page_url = data.results[i].team.url;
                                page_id = data.results[i].team.id;
                                break;
                            default:
                                image_url = data.results[i].page.image.medium_image_url;
                                page_name = data.results[i].page.name;
                                page_url = data.results[i].page.url;
                                page_id = data.results[i].page.id;
                            }
 
                       
                        raised = (data.results[i].amount_cents/100).formatMoney(2, '.', ',');

 						lb_content +='<li><a href="' + page_url + '"><span id="name">' + page_name + '</span></a> <span id="raised">£' + raised + '</span></li>';
    
                      
                        
 
        }
       
        lb_content +='</div>';
       
        
        $('#'+ htmldom).html(lb_content);
  }
 




// supporter wall

function supporter_wall_display(data)
    {
                
 
                  wall_content = ''; 
                  pages = 1;
                  page_size = 8;
                  page_counter=1;
                 
                  for (var i = 1; i < data.length; i++) {   
                    
                    page_name = data[i].name;
                    page_url = data[i].url;
                    page_image = data[i].image.large_image_url;
					  amount = (data.pages[i].amount.cents / 100).formatNumber(0, '.', ',');
 

                    wall_content+='<div class="col-md-2 col-xs-6 box page' + pages + '";'
                    if (pages > 1) {wall_content+= ' style="display:none;"';}
                    wall_content+= '>';
   
					  
					wall_content+='<div class="box"><article class="ptf-item-6">';
  					wall_content+='<div class="txt-holder-primary"></div><div class="txt-holder-secondary"><div class="description"><div class="inner-description">';
					wall_content+='<p><a href="' + page_url + '"><span id="name">' + page_name + '</span></p><p>has walked <span id="distance">0</span>km and raised £<span class="raised">' + amount + '</span></p><p><i class="fas fa-angle-double-right"></i></a></p></div></div> </div>';
					wall_content+='<div class="overlay-6"></div><img src="' + page_image + '"/></article></div>';
                  
                  
 
                  if (page_counter > page_size)
                  {
 
                    // IF NOT THE LAST RECORD
                    if (i < data.length)
                    {
                    pages = pages+1;
                    page_counter = 1;
                    }
                    
                  }
                  else
                  {
                    page_counter++;
                  }
 
                  }
 

                  $('#edhSupporterWall').html(wall_content);
 
                  supporter_wall_pagination(pages);
                 
 

                 
 
    } 
 

    function supporter_wall(limit)
    {
   
      
      var edh_API = 'https://everydayhero.com/api/v2/search/pages?campaign_id=' + edh_campaign_id;
      edh_API+= '&type=user&limit=' + limit;
     
      
      jQuery.getJSON(edh_API)
          .fail(function( jqxhr, textStatus, error ) {
            var err = textStatus + ", " + error;
          })
          .done(function( data ) {
             
        var filtered_data = jQuery.grep(data.pages, function (element, index) {
            return element.active==true && element.image.large_image_url.indexOf('avatar') <= 0 && element.image.large_image_url.indexOf('missing') <= 0; 
          });
 
              supporter_wall_display(filtered_data);
          });
 
    }
 
    function supporter_wall_pagination(total_pages)
    {
              
 
                if (total_pages > 1)
                  {
 
                      var pagination = '';
 
                      for (var i = 1; i <= total_pages; i++) {   
 
                            pagination += '<li><a onclick="pageResults(' + total_pages + ',this)" data-page="' + i + '"';
 
                            if (i==1)
                            {
                              pagination += 'class="current"';
                            }
                           
 
                            pagination += '>' + i + '</a></li>';
 
                      }
 
                     
                      $('#pg-supporterwall ul').html(pagination);
 
                      $('#pg-supporterwall').show();
                  }
    }



function pageResults( total_pages, element)
{
 
  $('#pg-supporterwall ul li a').removeClass('current');
  $(element).addClass('current');
 
  $(element).addClass('current');
 
  for (var i = 1; i <= total_pages; i++)    
  {
    $('#edhSupporterWall .page' + i).hide();
  }
 
  $('#edhSupporterWall .page' + element.getAttribute('data-page')).show();
 
}



    // donor list
    url = 'https://everydayhero.com/api/v2/search/feed?page_id=' + pId + '&type=OnlineDonation&limit=15';
    var content = '';

    
    jQuery.getJSON(url)
        .fail(function (jqxhr, textStatus, error) {
            var err = textStatus + ", " + error;

        })
        .done(function (data) {
            console.log(data);

            var nickName;
            var donationAmount;

            for (var i = 0; i < data.results.length; i++) {
                nickName = data.results[i].nickname;
                donationAmount = data.results[i].amount.cents / 100;

content += '<li><span id="donor-name">' + nickName + '</span> <span id="donor-amount">£' + donationAmount.formatNumber(2, '.', ',') + '</span></li>';


            }
            $("#donationList").html(content);

        });





// challenge stats page rank totaliser


//var campaignId = 'gb-6965';
//var campaignId = 'gb-8001';
//var signUpLink = 'https://miles-for-ms.everydayhero.com//uk/get-started';
//var camapaignGoal = 90000000;




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



function totaliser(cId) {


    var url = 'https://everydayhero.com/api/v2/search/totals?campaign_id=' + cId;
    var offset = 0;
    var percentage =0;
    var totaliserPercent=0;


    jQuery.getJSON(url)
        .fail(function (jqxhr, textStatus, error) {
            var err = textStatus + ", " + error;
        })
        .done(function (data) {
            $("#totalRaised").html((data.total_amount_cents.sum / 100).formatNumber(0, '.', ','));

            //84% is a full totaliser.
            //12% is an empty totaliser. 
            percentage = Math.floor((data.total_amount_cents.sum / camapaignGoal) * 100);
            
            $("#totalPercent").html(percentage.formatNumber(0, '.', ',') + '%');

            
            totaliserPercent = 84-(percentage/100)*72;


            var stop1 = document.createElementNS("http://www.w3.org/2000/svg", "stop");
            stop1.setAttribute("offset", "0%");
            stop1.setAttribute("stop-color", "#ef4b3e");
            document.getElementById("Gradient1").appendChild(stop1);

            var stop1 = document.createElementNS("http://www.w3.org/2000/svg", "stop");
            stop1.setAttribute("offset", totaliserPercent + "%");
            stop1.setAttribute("stop-color", "#ef4b3e");
            document.getElementById("Gradient1").appendChild(stop1);

            var stop2 = document.createElementNS("http://www.w3.org/2000/svg", "stop");
            stop2.setAttribute("offset","0%");
            stop2.setAttribute("stop-color", "transparent");
            document.getElementById("Gradient1").appendChild(stop2);


        });





}

