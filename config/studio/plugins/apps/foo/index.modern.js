var { useEffect, useState, createElement, Fragment } = craftercms.libs.React;
var { Dialog, DialogTitle } = craftercms.libs.MaterialUI;
var jss = craftercms.libs.jss && Object.prototype.hasOwnProperty.call(craftercms.libs.jss, 'default') ? craftercms.libs.jss['default'] : craftercms.libs.jss;

var ReactComponent = function (_a) {
    // const dataSortPhotos = () => {
    //   // @ts-ignore
    //   CrafterCMSNext.util.ajax.get('/api/process-photos.json').subscribe((response) => {
    //       setImageIndex(response.response)//JSON.parse(response.response))
    //     })
    // }
    var doMyStuff = function () {
        // @ts-ignore
        window.location = window.location + "?SEO=on";
    };
    //let [imageIndex, setImageIndex] = React.useState(null);
    useEffect(function () {
    }, []);
    var _b = useState(false), open = _b[0], setOpen = _b[1];
    // const [state, setState] = React.useState({ items: {}, hasMore: true, curPage: 0, itemsPerPage: 10, itemSize: 1 });
    return (createElement(Fragment, null,
        createElement("div", { className: "MuiButtonBase-root MuiListItem-root MuiListItem-gutters MuiListItem-button" },
            createElement("div", { className: "MuiListItemIcon-root" },
                createElement("svg", { className: "MuiSvgIcon-root", focusable: "false", viewBox: "0 0 24 24", "aria-hidden": "true" },
                    createElement("path", { d: "M4 13h6c.55 0 1-.45 1-1V4c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1v8c0 .55.45 1 1 1zm0 8h6c.55 0 1-.45 1-1v-4c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1v4c0 .55.45 1 1 1zm10 0h6c.55 0 1-.45 1-1v-8c0-.55-.45-1-1-1h-6c-.55 0-1 .45-1 1v8c0 .55.45 1 1 1zM13 4v4c0 .55.45 1 1 1h6c.55 0 1-.45 1-1V4c0-.55-.45-1-1-1h-6c-.55 0-1 .45-1 1z" }))),
            createElement("div", { className: "MuiListItemText-root" },
                createElement("span", { className: "MuiTypography-root MuiListItemText-primary MuiTypography-body1 MuiTypography-noWrap MuiTypography-displayBlock", onClick: function () { return doMyStuff(); } }, "YOST SEO Analysis")),
            createElement("svg", { className: "MuiSvgIcon-root", focusable: "false", viewBox: "0 0 24 24", "aria-hidden": "true" },
                createElement("path", { d: "M9.29 6.71c-.39.39-.39 1.02 0 1.41L13.17 12l-3.88 3.88c-.39.39-.39 1.02 0 1.41.39.39 1.02.39 1.41 0l4.59-4.59c.39-.39.39-1.02 0-1.41L10.7 6.7c-.38-.38-1.02-.38-1.41.01z" })),
            createElement("span", { className: "MuiTouchRipple-root" })),
        createElement(Dialog, { fullWidth: true, maxWidth: "xl", onClose: function () { return setOpen(false); }, "aria-labelledby": "simple-dialog-title", open: open },
            createElement(DialogTitle, { id: "max-width-dialog-title" }, "YOST SEO Analysis"),
            createElement("div", { id: "root" }))));
};

var NonReactComponent = {
    main: function (_a) {
        var craftercms = _a.craftercms, element = _a.element, configuration = _a.configuration;
        var store = craftercms.getStore();
        var stylesheet = jss.createStyleSheet({
            root: {
                margin: '.5em',
                padding: '.5em',
                border: '2px solid #000',
                'text-align': 'center',
                color: configuration.fontColor || 'green'
            }
        });
        var classes = stylesheet.attach().classes;
        var user = store.getState().user.username;
        element.classList.add(classes.root);
        element.innerHTML = "Hello from the non-react world, " + user + ". " + craftercms.getIntl().formatMessage({
            id: 'myTestTranslation',
            defaultMessage: 'Showing the default translation'
        }) + ".";
        return function () {
            // Component destruction logic
            stylesheet.detach();
        };
    }
};

var myTestTranslation = "Hello, this is a test translation";
var en = {
	myTestTranslation: myTestTranslation
};

var myTestTranslation$1 = "Hola, esta es una traducción de prueba";
var es = {
	myTestTranslation: myTestTranslation$1
};

// var PluginDescriptor = craftercms.libs.StudioUI && Object.prototype.hasOwnProperty.call(craftercms.libs.StudioUI, 'default') ? craftercms.libs.StudioUI['default'] : craftercms.libs.StudioUI
var plugin /*: PluginDescriptor */ = {
    id: 'org.craftercms.sampleComponentLibraryPlugin',
    name: 'Sample component library',
    description: 'An example plugin of a component library',
    author: 'Roy Art',
    logo: null,
    locales: {
        en: en,
        es: es
    },
    apps: [
        {
            route: '/yada-yada',
            widget: { id: 'org.craftercms.sampleComponentLibraryPlugin.components.reactComponent' }
        }
    ],
    widgets: {
        'org.craftercms.sampleComponentLibraryPlugin.components.reactComponent': ReactComponent,
        'org.craftercms.sampleComponentLibraryPlugin.components.nonReactComponent': NonReactComponent
    },
    scripts: [
        {
            src: 'https://code.jquery.com/jquery-3.5.1.min.js',
            integrity: 'sha256-9/aliU8dGd2tb6OSsuzixeV4y/faTqgFtohetphbbj0=',
            crossorigin: 'anonymous'
        },
        'script.js'
    ],
    stylesheets: ['index.css'],
    themes: []
};

export default plugin;
