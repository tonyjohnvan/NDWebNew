/*!
Theme Name: TheONE
Theme URI: http://themeforest.net/user/Pooyaa/portfolio
Author: Pooyaa
Author URI: http://themeforest.net/user/Pooyaa
Description: TheONE coming soon page
*/
var styles=[{featureType:'all',stylers:[{"visibility":"off"}]},{featureType:'landscape',stylers:[{'visibility':'on'},{color:'#999999'}]},{featureType:'water',stylers:[{'visibility':'on'},{color:'#333333'}]}];var options={mapTypeControlOptions:{mapTypeIds:['Styled']},center:new google.maps.LatLng(60.500525,-164.318849),zoom:6,scrollwheel:false,disableDefaultUI:true,mapTypeId:'Styled'};var div=document.getElementById('map');var map=new google.maps.Map(div,options);var styledMapType=new google.maps.StyledMapType(styles,{name:'Styled'});map.mapTypes.set('Styled',styledMapType);var marker=new google.maps.Marker({position:new google.maps.LatLng(60.500525,-164.318849),map:map,icon:"asset/img/marker.png",animation:google.maps.Animation.BOUNCE});