chrome.tabs.onUpdated.addListener(
	function(id, info, tab)
	{
		chrome.tabs.query(
			{
				'active': true, 
				'lastFocusedWindow': true
			}, 
			function (tabs) 
			{
    			var url = tabs[0].url;

    			if (url.indexOf('wittytv.it') > -1)
	    			chrome.pageAction.show(tab.id);
			});
	});