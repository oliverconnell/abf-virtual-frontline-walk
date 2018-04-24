var edh_campaign_id = 'gb-8171';



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
			  
	
          });

}



  

  function escapeRegExp(str) {
  return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
  }

  function replaceAll(find, replace, str2) {
    return str2.replace(new RegExp(escapeRegExp(find), 'g'), replace);
  }

  Number.prototype.formatMoney = function(c, d, t){
    var n = this, c = isNaN(c = Math.abs(c)) ? 2 : c, d = d == undefined ? "," : d, t = t == undefined ? "." : t, s = n < 0 ? "-" : "", i = parseInt(n = Math.abs(+n || 0).toFixed(c)) + "", j = (j = i.length) > 3 ? j % 3 : 0;
    return s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");
  };

  function getParameterByName(name) {

    var url = location.search;
    //url = url.replace('&amp;','&');
    url = url.replace(/&amp;/g, '&')
    url = decodeURIComponent(url);


    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
             results = regex.exec(url);
    return results == null ? "" : results[1].replace(/\+/g, " ");
  }




  function funds_raised()
  {

 
    var campaign_id = getParameterByName("id");
    var offset_amount = getParameterByName("offset");
    var fundraiser_target_pence = getParameterByName("target");

    if (offset_amount == ''){offset_amount=0;}

    var edh_API = "https://everydayhero.com/api/v2/search/totals.jsonp?campaign_id[]=" + campaign_id + "&callback=?"
    var edh_fundsraised = 0;

    // GET PAGES 
    jQuery.getJSON( edh_API)
    .fail(function( jqxhr, textStatus, error ) {
      var err = textStatus + ", " + error;
      console.log( "Request Failed: " + err );
    })
    .done(function( data ) {
  



      if (data.total_amount_cents.sum != null)
        {
            edh_fundsraised = (parseInt(offset_amount) + data.total_amount_cents.sum)/100;
        }
        else
        {
          edh_fundsraised = 0 + parseInt(offset_amount);

        }

        fundraiser_target_percent = (edh_fundsraised / (fundraiser_target_pence/100)) * 100;
        if (fundraiser_target_percent > 100){fundraiser_target_percent=100;}


        jQuery(".total-amount").html("&pound;" + edh_fundsraised.formatMoney(0, '.', ','));
        jQuery(".total-bar").css("height", fundraiser_target_percent + '%');
        jQuery(".totalgoal").html('&pound;' + (fundraiser_target_pence/100).formatMoney(0, '.', ',') + '!');

          //$( ".total-bar" ).progressbar({value: 37});


    })
    


    }







 


