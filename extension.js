function getVideoParent()
{
	return document.getElementById('myVideoContainer');
}

function getSilverlightObject(videoParent)
{
	return $(videoParent).find(".pf-silverlight");
}

function getVideoObject(videoParent)
{
	return $(videoParent).find(".pf-video");
}

function getVideoURL()
{
	var videoURL = tryMP4Method();

	if (!videoURL || videoURL.length == 0)
		videoURL = trySilverlightMethod();

	return videoURL;
}

function tryMP4Method()
{
	console.log('Trying MP4 method...');

	var videoParent = getVideoParent();

	if (!videoParent)
		return;

	var videoObject = getVideoObject(videoParent);

	if (!videoObject)
		return;

	var sourceObject = videoObject.find('source');
	var videoURL = sourceObject.attr('src');

	return videoURL;
}

function trySilverlightMethod()
{
	console.log('Trying Silverlight method...');

	var videoParent = getVideoParent();

	if (!videoParent)
		return;

	var videoObject = getSilverlightObject(videoParent);

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
	return videoURL;
}

function start(event)
{
	if (event.target.className != 'pf-silverlight' &&
		event.target.className != 'pf-video')
		return;

	var videoURL = getVideoURL(videoObject);

	if (!videoURL)
	{
		console.log('Video URL not found.');
		return;
	}

	window.location.replace(videoURL);

	console.log('Video URL: ' + videoURL);
	document.removeEventListener("DOMNodeInserted", start);
}

document.addEventListener("DOMNodeInserted", start);