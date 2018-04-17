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
            stop1.setAttribute("stop-color", "#3D8FCC");
            document.getElementById("Gradient1").appendChild(stop1);

            var stop1 = document.createElementNS("http://www.w3.org/2000/svg", "stop");
            stop1.setAttribute("offset", totaliserPercent + "%");
            stop1.setAttribute("stop-color", "#3D8FCC");
            document.getElementById("Gradient1").appendChild(stop1);

            var stop2 = document.createElementNS("http://www.w3.org/2000/svg", "stop");
            stop2.setAttribute("offset","0%");
            stop2.setAttribute("stop-color", "#024D6A");
            document.getElementById("Gradient1").appendChild(stop2);


        });// JavaScript Document