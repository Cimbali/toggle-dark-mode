![Toggle color schemes](icons/system_96x96.png)

# Toggle color schemes! [![Mozilla Add-on](https://img.shields.io/amo/v/toggle-dark-mode)](https://addons.mozilla.org/en-US/firefox/addon/toggle-dark-mode/)

**For Firefox version > 95.**

## Minimal add-on

This is the simplest possible add-on with the least possible permissions.

Clicking the add-on action in your toolbar cycles the color scheme preference _for browser content_, between the following 4 values:
1. dark colors
2. light colors
3. inherit browser colors (dark or light)
4. inherit system colors (dark or light)

You can enable or disable values in the cycle from the add-on content.

## Website support

This add-on relies on the fact that websites have their own proper stylesheets for dark and light modes, for example [DuckDuckGo](https://duckduckgo.com/).<br>
An increasing number of websites now offer light and dark schemes, though you may need to select a specific option to inherit your browser’s colors, e.g. google, github, stackoverflow, and many more.

If you want to add your own dark mode to other websites, you can use user style sheet addons such as e.g. Stylus. Then you can wrap the CSS in a [`prefers-color-scheme` media feature](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-color-scheme) so it responds to this add-on’s toggle. For example:

```css
@media (prefers-color-scheme: dark) {
	/* CSS that ony applies to dark mode */
	body { background: black; color:  #ddd; }
}

@media (prefers-color-scheme: light) {
	/* CSS that ony applies to light mode */
	body { background: white; color: black; }
}
```

## Links

https://addons.mozilla.org/en-US/firefox/addon/toggle-dark-mode/

Sun, Moon, and Solar Eclipse icons by [MarkieAnn Packer from the Noun Project](https://thenounproject.com/MarkieAnn) (under CCBY2.0).
