'use strict';

const default_color_schemes = {
	dark: true,
	light: true,
	system: false,
	browser: false,
}

const color_schemes = [
	"dark",
	"light"
]
var selected_scheme = -1;

// We need detection for system color scheme
function detectDarkScheme() {
	return window.matchMedia("(prefers-color-scheme: dark)").matches;
}

function updatePrefs({ include }) {
	const value = color_schemes[selected_scheme]
	color_schemes.splice(0, color_schemes.length, ...Object.keys(default_color_schemes).filter(scheme => include[scheme]))
	updateScheme({ value })
}

function setBadge() {
	browser.browserAction.setTitle({
		title: `Change color scheme to ${color_schemes[(selected_scheme + 1) % color_schemes.length]}`
	});
	const is_dark = detectDarkScheme();
	browser.browserAction.setIcon({
		path: {
			48: `icons/${color_schemes[selected_scheme]}_48x48.png`,
			96: `icons/${color_schemes[selected_scheme]}_96x96.png`,
		}
	});
}

function updateScheme({ value }) {
	// Check whether we are where we expect to be in the color schemes list
	if (selected_scheme < color_schemes.length) {
		const current = color_schemes[selected_scheme];
		if (current === value || ['browser', 'system'].includes(current) && current === 'auto') {
			setBadge();
			return
		}
	}
	// Otherwise, determine a guess for where we are in the list and update the badge.
	// If the value is in the list, EZ
	if (color_schemes.includes(value)) {
		selected_scheme = color_schemes.indexOf(value);
	}
	// the scheme is 'auto' so pick one that is available
	else if (value === 'auto' && color_schemes.includes('system')) {
		selected_scheme = color_schemes.indexOf('system');
	}
	else if (value === 'auto' && color_schemes.includes('browser')) {
		selected_scheme = color_schemes.indexOf('browser');
	}
	// fall back to the correct basic color scheme, as that’s all we can smartly detect
	if (selected_scheme < 0) {
		const basic = detectDarkScheme() ? "dark" : "light";
		selected_scheme = color_schemes.indexOf(basic);
	}
	// this should never happen
	if (selected_scheme < 0) {
		selected_scheme = 0;
	}
	setBadge();
}

function cycleScheme(tabId) {
	selected_scheme = (selected_scheme + 1) % color_schemes.length;
	browser.browserSettings.overrideContentColorScheme.set({ value: color_schemes[selected_scheme] });
}

Promise.all([
	browser.storage.local.get({ include: default_color_schemes }).then(updatePrefs),
	browser.browserSettings.overrideContentColorScheme.get({}).then(updateScheme),
]).then(() => {
	browser.browserSettings.overrideContentColorScheme.onChange.addListener(updateScheme);
	browser.runtime.onMessage.addListener(updatePrefs);
	browser.browserAction.onClicked.addListener(cycleScheme);
}).catch(console.error);

browser.runtime.onInstalled.addListener(({ reason, temporary }) => {
	if (reason === 'install') {
		browser.storage.local.set({ include: default_color_schemes })
	}
});
