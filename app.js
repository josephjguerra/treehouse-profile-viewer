$(document).ready(function(){

  $("#profile-form").submit(function(event){
    // variables
    var profileName = $('input[name=profileInput]').val();
    var treehouseProfileURL = "https://teamtreehouse.com/" + profileName + ".json";

    //ajax function to get teamtreehouse profile and info into html
    $.ajax({
      url: treehouseProfileURL,
      dataType: "json",
      success: function(profile) {
        // show the full json object for troubleshooting
        console.log(profile);

        // variables to parse the json object for name, badge, etcs
        var name        = profile.name;
        var avatarImage = profile.gravatar_url;
        var totalPoints = profile.points.total;
        var totalBadges = profile.badges.length;

        // fill in the appropriate elements with the json profile data
        $("#name").html(name);
        $("#avatar").attr("src", avatarImage);
        $("#total-points").html(totalPoints);
        $("#total-badges").html(totalBadges);

        // loop through all the badges and display them in html
        var badgesList = '';
        for (var i = 0; i < totalBadges; i++) {
          badgesList +=
            '<div class="badge">' +
              '<img class="badge-img" src="' + profile.badges[i].icon_url + '" alt="' + profile.badges[i].name + ' Badge" />' +
              '<p>' + profile.badges[i].name + '</p>' +
              '<p>Earned on ' + profile.badges[i].earned_date.slice(0,10) + '</p>' +
            '</div>';
        }
        $("#badges").html(badgesList);

      } // end success

    }); // end ajax

  }); // end submit function

}); // end document ready
