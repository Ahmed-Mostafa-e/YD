$(document).ready(function(){
var imagelink;
var width;
var height;
var title;
var totalviews;
var totalsubscribers;
var totalvideos;
var channelid;
var url;
$("form").submit(function(){

	//fetch the values
channelid = $("#search").val();
// we will make the request 

url="https://www.googleapis.com/youtube/v3/channels?key=AIzaSyC5DnYNJCLZrLGLe96UhPr9o_gZEn7IH5k&id=" + channelid + "&part=snippet,contentDetails,statistics";


$.get(url,function(data){
	fetchData(data);
	bindData(imagelink,width,height,title,totalsubscribers,totalviews,totalvideos);
});
setInterval(function(){


url="https://www.googleapis.com/youtube/v3/channels?key=AIzaSyC5DnYNJCLZrLGLe96UhPr9o_gZEn7IH5k&id=" + channelid + "&part=statistics";
$.get(url,function(data){
	updatesubscribers(data);

});
},0);
return false;
});

function fetchData(data)
{
	imagelink = data.items[0].snippet.thumbnails.medium.url;
	width = data.items[0].snippet.thumbnails.medium.url.width;
	height = data.items[0].snippet.thumbnails.medium.url.height;
	title = data.items[0].snippet.title;
	totalsubscribers = data.items[0].statistics.subscriberCount;
	totalviews = data.items[0].statistics.viewCount;
	totalvideos = data.items[0].statistics.videoCount;
}

function bindData(imagelink,width,height,title,totalsubscribers,totalviews,totalvideos)
{
	$("#thumbnail").attr("src",imagelink);
	$("#thumbnail").attr("width",width);
	$("#thumbnail").attr("height",height);
	$("#title").html(title);
	$("#subscriber").html("<h5> subscribers " + totalsubscribers);
	$("#totalviews").html("<h5> totalviews " + totalviews);
	$("#totalvideos").html("<h5> totalvideos " + totalvideos);
}

function updatesubscribers(data)
{
$("#subscriber").html("<h5> subscribers </h5>"+ data.items[0].statistics.subscriberCount);

}
});