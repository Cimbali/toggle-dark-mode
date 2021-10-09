'use strict';

const color_schemes = [
	"dark",
	"light",
	"system"
]
var selected_scheme = -1;

// We need detection for system color scheme
function detectDarkScheme() {
	return window.matchMedia("(prefers-color-scheme: dark)").matches;
}

function updatePrefs({ include_system }) {
	if (!include_system && color_schemes.length === 3) {
		color_schemes.pop();
		if (selected_scheme === 2) {
			selected_scheme = detectDarkScheme() ? 0 : 1;
		}
	} else if (include_system && color_schemes.length === 2) {
		color_schemes.push("system");
	}
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
	selected_scheme = color_schemes.indexOf(value);
	if (selected_scheme < 0) {
		selected_scheme = 2;
	}
	setBadge();
}

function cycleScheme(tabId) {
	selected_scheme = (selected_scheme + 1) % color_schemes.length;
	browser.browserSettings.overrideContentColorScheme.set({ value: color_schemes[selected_scheme] });
}

Promise.all([
    browser.storage.local.get({ include_system: false }).then(updatePrefs),
	browser.browserSettings.overrideContentColorScheme.get({}).then(updateScheme),
]).then(() => {
	browser.browserSettings.overrideContentColorScheme.onChange.addListener(updateScheme)
	browser.runtime.onMessage.addListener(updatePrefs);
	browser.browserAction.onClicked.addListener(cycleScheme)
}).catch(console.error);

browser.runtime.onInstalled.addListener(({ reason, temporary }) => {
	if (reason === 'install') {
		browser.storage.local.get({ include_system: false })
    }
});
