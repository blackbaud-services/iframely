export default {

    re: /^https?:\/\/(?:\w{2,3}\.)?pinterest(?:\.com?)?\.\w{2,3}\/((?!pin)[a-zA-Z0-9%_]+|pinterest)\/([a-zA-Z0-9%\-]+)\/?(?:$|\?|#)/i,

    mixins: [
        "*"
    ],

    // https://developers.pinterest.com/tools/widget-builder/?type=board
    getLink: function(url, meta, options) {
        var og = meta.og;

        if (/pinboard/.test(og.type) || // this check sometimes when Pinterest misses cache hits: og.type is 'website' in those cases
            (meta.twitter && meta.twitter.app && meta.twitter.app.url && /\/board\//i.test(meta.twitter.app.url.iphone))) {

            var height = options.getRequestOptions('pinterest.height', options.maxHeight || 600);
            var width = options.getRequestOptions('pinterest.width', options.maxWidth || 600);
            var pinWidth = options.getRequestOptions('pinterest.pinWidth', 120);

            return {
                type: CONFIG.T.text_html,
                rel: [CONFIG.R.app, CONFIG.R.ssl, CONFIG.R.inline, CONFIG.R.html5],
                template: "pinterest.widget",
                template_context: {
                    url: og.url || url,
                    title: "Pinterest Board",
                    type: "embedBoard",
                    width: width,
                    height: height,
                    pinWidth: pinWidth
                },
                options: {
                    pinWidth: {
                        label: 'Pin Width',
                        value: pinWidth,
                        placeholder: 'ex.: 120, in px'
                    },
                    width: {
                        label: CONFIG.L.width,
                        value: width,
                        placeholder: 'ex.: 600, in px'
                    },
                    height: {
                        label: CONFIG.L.height,
                        value: height,
                        placeholder: 'ex.: 600, in px'
                    }
                },
                'max-width': width, // inline HTML should come only with height now
                height: height + 120
            };
        }
    },

    tests: [{
        // No Test Feed here not to violate "scrapping" restrictions of Pinterest
        noFeeds: true
    },
        "http://pinterest.com/bcij/art-mosaics/",
        "http://pinterest.com/bcij/aging-gracefully/",
        "https://www.pinterest.com/pinterest/official-news/",
        "https://www.pinterest.com/mimimememe/office-humor-work-jokes/"
    ]
};