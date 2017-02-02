var Metalsmith = require('metalsmith');
var collections = require('metalsmith-collections');
var discoverPartials = require('metalsmith-discover-partials');
var markdown = require('metalsmith-markdown');
var layouts = require('metalsmith-layouts');
var permalinks = require('metalsmith-permalinks');
var sass = require('metalsmith-sass');
var autoprefixer = require('metalsmith-autoprefixer');
var browserSync = require('metalsmith-browser-sync');
var compress = require('metalsmith-gzip');
var uglify = require('metalsmith-uglify');
var handlebars = require('handlebars');

handlebars.registerHelper('is', function(v1, v2, options) {
  if(v1 == v2) {
    return options.fn(this);
  }
  return options.inverse(this);
});
handlebars.registerHelper('getValue', function(property, key, obj) {
  if(obj[key] != 'undefined') {
     return new handlebars.SafeString(obj[key][property]);
  }
});

handlebars.registerHelper('collectionMenu', function(currentCollection, collections, currentPage) {
    var colObj = collections[currentCollection];
    var html = '<menu>' +
                    '<a href="'+collectionsData[currentCollection]['button']['path']+'" class="btn btn--icon dripicons-arrow-thin-left '+currentCollection+'--bg">'+collectionsData[currentCollection]['button']['text']+'</a>'+
                    '<div class="btn btn--icon-after btn--white btn--dropdown mobile-only--inline-flex" onclick="dropdown(\'menuDropdown\', this)">'+currentPage+'</div>'+
                    '<ul id="menuDropdown">',
        i = 0;
    while (i<colObj.length) {
        html += '<a href="/' + colObj[i].path + '"><li>' + colObj[i].title + '</li></a>';
        i++;
    };
    html += '</ul></menu>';
    return new handlebars.SafeString(html);
});


var collectionsData = {
    aginvest : {
        pattern: 'produkter/aginvest/*.md',
        button : {
            text: 'AG-invest',
            path: '/produkter'
        }
    },
    portfoliomanager : {
        path: '/produkter',
        pattern: 'produkter/portfoliomanager/*.md',
        button : {
            text: 'PortfolioManager',
            path: '/produkter'
        }
    },
    om : {
        path: '/',
        pattern: 'om/*.md',
        button : {
            text: 'AG-informatik',
            path: '/'
        }
    },
    posts : {
        pattern: 'blog/*.md',
        button : {
            text: 'Blog',
            path: '/blog'
        }
    }
}


Metalsmith(__dirname)
    .metadata({
        title: "AG-informatik A/S",
        description: "AG-informatik A/S udvikler administrative investeringssystemer og web-baserede porteføljesystemer til den finansielle sektor.",
        url: "http://ag-informatik.dk",
        collectionsData: collectionsData
    })
    .source('./src')
    .destination('./dist')
    .clean(true)
    .use(discoverPartials({
        directory: 'partials'
    }))
    .use(collections(collectionsData))
    .use(markdown())
    .use(permalinks({
        relative: false
    }))
    .use(layouts({
        engine: 'handlebars'
    }))
    .use(sass({
        outputStyle: "compressed"
    }))
    .use(autoprefixer())
    .use(uglify())
    .use(compress())
    .use(browserSync({
        server: "dist",
        files: ["src/**/*.md", "src/**/*.js", "src/**/*.scss", "src/**/*.html", "layouts/**/*.html"]
    }))
    .build(function (err, files) {
        if (err) {
            throw err;
        }
    });
