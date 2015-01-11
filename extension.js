function getVideoParent()
{
	return document.getElementById('myVideoContainer');
}

function getVideoObject(videoParent)
{
	return $(videoParent).find(".pf-silverlight");
}

function start()
{
	var videoParent = getVideoParent();

	if (!videoParent)
		return;

	var videoObject = getVideoObject(videoParent);

	if (!videoObject)
		return;

	var initParamsObject = videoObject.find('[name="InitParams"]');

	if (!initParamsObject)
		return;

	var initParams = initParamsObject.val();

	if (!initParams)
		return;

	var searchString = 'mediaurl=';

	var start = initParams.indexOf(searchString) + searchString.length;
	var count = initParams.length - start;

	//http://smv.video.mediaset.net/smooth/asset03/2015/01/14aca186030965-08.ism/manifest"

	var mediaURL = initParams.substr(start, count);

	searchString = 'smooth/asset03/';
	
	start = mediaURL.indexOf(searchString) + searchString.length;

	searchString = '.ism';

	var end = mediaURL.indexOf(searchString) - 3;

	count = end - start;

	var videoURL = 'http://prd.video.mediaset.net/mp4/' + mediaURL.substr(start, count) + '-10_0.mp4';
	window.location.replace(videoURL);

	console.log('Video URL: ' + videoURL);
	document.removeEventListener("DOMNodeInserted", start);
}

document.addEventListener("DOMNodeInserted", start);