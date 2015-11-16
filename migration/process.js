(function (_, Parse, fetchJSONP) {

	/* Initialization
	****************************************************/

	Parse.initialize(
		'1HjpKS0k6054RdvGjmEwFtCbglfycTkTIqd1k22y',
		'BTXQ11uqQEtihjZAIGMxUr8ZSdVJKXn8KadbC0iJ'
	);

	var Indicator = Parse.Object.extend('Indicator');
	var IndicatorCountrySeries = Parse.Object.extend('IndicatorCountrySeries');

	var STATE = {
		LOAD_INDICATORS: new Parse.Promise()
	};

	/* Indicators
	****************************************************/

	var indicators = JSON.parse(localStorage.getItem('indicators')) || {};

	if (_.isEmpty(indicators)) {

		(new Parse.Query(Indicator))
			.each(function (indicator) {
				indicators[indicator.attributes.key] = { id: indicator.id, loaded: false };
				if (_.size(indicators) % 500 === 0) {
					console.log('%d/13,149 indicators loaded.', _.size(indicators));
				}
			})
			.then(function () {
				console.log('COMPLETE: %d/13,149 indicators loaded.', _.size(indicators));
				localStorage.setItem('indicators', JSON.stringify(indicators));
				STATE.LOAD_INDICATORS.resolve(indicators);
			})
			.fail(console.error.bind(console));

	} else {
		STATE.LOAD_INDICATORS.resolve(indicators);
	}

	/* Main process
	****************************************************/

	var LIMIT = 20000;
	var PATH = 'http://api.worldbank.org/countries/all/indicators/{key}?format=jsonp&per_page=' + LIMIT;

	var index = 0;
	var loadIndicator = function (key) {

		if (indicators[key].loaded || indicators[key].error) {
			loadIndicator(_.keys(indicators)[index++]);
			return;
		}

		fetchJSONP(PATH.replace('{key}', key), {timeout: 45000, jsonpCallback: 'prefix'})
			.then(function (response) { return response.json(); })
			.then(function (response) {
				if (response[0].pages > 1) {
					say('Overflow on key: ' + key);
					console.error('Overflow on key: ' + key);
				}
				return _(response[1])
					.filter(function (row) { return row.value !== null; })
					.groupBy('country.id')
					.map(function (series, countryKey) {
						var instance = new IndicatorCountrySeries();
						instance.set('indicatorKey', key);
						instance.set('countryKey', countryKey);
						instance.set('series', series.map(function(year) {
							return {date: Number(year.date), value: Number(year.value)};
						}));
						return instance;
					})
					.value();
			})
			.then(function (instances) {
				IndicatorCountrySeries.saveAll(instances).then(function () {
					indicators[key].loaded = true;
					localStorage.setItem('indicators', JSON.stringify(indicators));
					if (index % 10 === 0) {
						tick(index);
						console.table([{
							Loaded: _.filter(indicators, 'loaded').length,
							Errors: _.filter(indicators, 'error').length,
							Total: _.size(indicators)
						}]);
					}

					if (index + 1 < _.size(indicators)) {
						setTimeout(function () {
							loadIndicator(_.keys(indicators)[index++]);
						}, 2000);
					} else {
						say('Process complete');
						console.log('COMPLETE: %d/%d indicators.', index, _.size(indicators));
					}
				});
			})
			.catch(function (error) {
				console.error(error);
				indicators[key].error = true;
				localStorage.setItem('indicators', JSON.stringify(indicators));

				say('Beep');

				if (index + 1 < _.size(indicators)) {
					loadIndicator(_.keys(indicators)[index++]);
				} else {
					console.log('COMPLETE: %d/%d indicators.', index, _.size(indicators));
				}
			});
	};

	STATE.LOAD_INDICATORS.then(function () {
		loadIndicator(_.keys(indicators)[index++]);
	});

	/* Utility
	****************************************************/

	function say (message) {
		window.speechSynthesis.speak(new window.SpeechSynthesisUtterance(message));
	}

	function tick (index) {
		var percent = Math.floor(100 * index / _.size(indicators));
		document.querySelector('#progress').textContent = percent + '%';
	}

}(window._, window.Parse, window.fetchJsonp));