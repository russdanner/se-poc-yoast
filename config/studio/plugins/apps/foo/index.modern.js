var { Component, useState, useEffect, createElement, Fragment } = craftercms.libs.React;var React = craftercms.libs.React && Object.prototype.hasOwnProperty.call(craftercms.libs.React, 'default') ? craftercms.libs.React['default'] : craftercms.libs.React;
var { makeStyles, Dialog, LinearProgress, DialogTitle, AppBar, InputLabel, Select, MenuItem, TextField, ButtonGroup, Button, Grid, Card, CardMedia, CardContent, CardActions, Divider } = craftercms.libs.MaterialUI;
var jss = craftercms.libs.jss && Object.prototype.hasOwnProperty.call(craftercms.libs.jss, 'default') ? craftercms.libs.jss['default'] : craftercms.libs.jss;

/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */
/* global Reflect, Promise */

var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return extendStatics(d, b);
};

function __extends(d, b) {
    extendStatics(d, b);
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};

/* eslint-disable no-undefined,no-param-reassign,no-shadow */

/**
 * Throttle execution of a function. Especially useful for rate limiting
 * execution of handlers on events like resize and scroll.
 *
 * @param  {Number}    delay          A zero-or-greater delay in milliseconds. For event callbacks, values around 100 or 250 (or even higher) are most useful.
 * @param  {Boolean}   [noTrailing]   Optional, defaults to false. If noTrailing is true, callback will only execute every `delay` milliseconds while the
 *                                    throttled-function is being called. If noTrailing is false or unspecified, callback will be executed one final time
 *                                    after the last throttled-function call. (After the throttled-function has not been called for `delay` milliseconds,
 *                                    the internal counter is reset)
 * @param  {Function}  callback       A function to be executed after delay milliseconds. The `this` context and all arguments are passed through, as-is,
 *                                    to `callback` when the throttled-function is executed.
 * @param  {Boolean}   [debounceMode] If `debounceMode` is true (at begin), schedule `clear` to execute after `delay` ms. If `debounceMode` is false (at end),
 *                                    schedule `callback` to execute after `delay` ms.
 *
 * @return {Function}  A new, throttled, function.
 */
function throttle (delay, noTrailing, callback, debounceMode) {
  /*
   * After wrapper has stopped being called, this timeout ensures that
   * `callback` is executed at the proper times in `throttle` and `end`
   * debounce modes.
   */
  var timeoutID;
  var cancelled = false; // Keep track of the last time `callback` was executed.

  var lastExec = 0; // Function to clear existing timeout

  function clearExistingTimeout() {
    if (timeoutID) {
      clearTimeout(timeoutID);
    }
  } // Function to cancel next exec


  function cancel() {
    clearExistingTimeout();
    cancelled = true;
  } // `noTrailing` defaults to falsy.


  if (typeof noTrailing !== 'boolean') {
    debounceMode = callback;
    callback = noTrailing;
    noTrailing = undefined;
  }
  /*
   * The `wrapper` function encapsulates all of the throttling / debouncing
   * functionality and when executed will limit the rate at which `callback`
   * is executed.
   */


  function wrapper() {
    var self = this;
    var elapsed = Date.now() - lastExec;
    var args = arguments;

    if (cancelled) {
      return;
    } // Execute `callback` and update the `lastExec` timestamp.


    function exec() {
      lastExec = Date.now();
      callback.apply(self, args);
    }
    /*
     * If `debounceMode` is true (at begin) this is used to clear the flag
     * to allow future `callback` executions.
     */


    function clear() {
      timeoutID = undefined;
    }

    if (debounceMode && !timeoutID) {
      /*
       * Since `wrapper` is being called for the first time and
       * `debounceMode` is true (at begin), execute `callback`.
       */
      exec();
    }

    clearExistingTimeout();

    if (debounceMode === undefined && elapsed > delay) {
      /*
       * In throttle mode, if `delay` time has been exceeded, execute
       * `callback`.
       */
      exec();
    } else if (noTrailing !== true) {
      /*
       * In trailing throttle mode, since `delay` time has not been
       * exceeded, schedule `callback` to execute `delay` ms after most
       * recent execution.
       *
       * If `debounceMode` is true (at begin), schedule `clear` to execute
       * after `delay` ms.
       *
       * If `debounceMode` is false (at end), schedule `callback` to
       * execute after `delay` ms.
       */
      timeoutID = setTimeout(debounceMode ? clear : exec, debounceMode === undefined ? delay - elapsed : delay);
    }
  }

  wrapper.cancel = cancel; // Return the wrapper function.

  return wrapper;
}

var ThresholdUnits = {
    Pixel: 'Pixel',
    Percent: 'Percent',
};
var defaultThreshold = {
    unit: ThresholdUnits.Percent,
    value: 0.8,
};
function parseThreshold(scrollThreshold) {
    if (typeof scrollThreshold === 'number') {
        return {
            unit: ThresholdUnits.Percent,
            value: scrollThreshold * 100,
        };
    }
    if (typeof scrollThreshold === 'string') {
        if (scrollThreshold.match(/^(\d*(\.\d+)?)px$/)) {
            return {
                unit: ThresholdUnits.Pixel,
                value: parseFloat(scrollThreshold),
            };
        }
        if (scrollThreshold.match(/^(\d*(\.\d+)?)%$/)) {
            return {
                unit: ThresholdUnits.Percent,
                value: parseFloat(scrollThreshold),
            };
        }
        console.warn('scrollThreshold format is invalid. Valid formats: "120px", "50%"...');
        return defaultThreshold;
    }
    console.warn('scrollThreshold should be string or number');
    return defaultThreshold;
}

var InfiniteScroll = /** @class */ (function (_super) {
    __extends(InfiniteScroll, _super);
    function InfiniteScroll(props) {
        var _this = _super.call(this, props) || this;
        _this.lastScrollTop = 0;
        _this.actionTriggered = false;
        // variables to keep track of pull down behaviour
        _this.startY = 0;
        _this.currentY = 0;
        _this.dragging = false;
        // will be populated in componentDidMount
        // based on the height of the pull down element
        _this.maxPullDownDistance = 0;
        _this.getScrollableTarget = function () {
            if (_this.props.scrollableTarget instanceof HTMLElement)
                return _this.props.scrollableTarget;
            if (typeof _this.props.scrollableTarget === 'string') {
                return document.getElementById(_this.props.scrollableTarget);
            }
            if (_this.props.scrollableTarget === null) {
                console.warn("You are trying to pass scrollableTarget but it is null. This might\n        happen because the element may not have been added to DOM yet.\n        See https://github.com/ankeetmaini/react-infinite-scroll-component/issues/59 for more info.\n      ");
            }
            return null;
        };
        _this.onStart = function (evt) {
            if (_this.lastScrollTop)
                return;
            _this.dragging = true;
            if (evt instanceof MouseEvent) {
                _this.startY = evt.pageY;
            }
            else if (evt instanceof TouchEvent) {
                _this.startY = evt.touches[0].pageY;
            }
            _this.currentY = _this.startY;
            if (_this._infScroll) {
                _this._infScroll.style.willChange = 'transform';
                _this._infScroll.style.transition = "transform 0.2s cubic-bezier(0,0,0.31,1)";
            }
        };
        _this.onMove = function (evt) {
            if (!_this.dragging)
                return;
            if (evt instanceof MouseEvent) {
                _this.currentY = evt.pageY;
            }
            else if (evt instanceof TouchEvent) {
                _this.currentY = evt.touches[0].pageY;
            }
            // user is scrolling down to up
            if (_this.currentY < _this.startY)
                return;
            if (_this.currentY - _this.startY >=
                Number(_this.props.pullDownToRefreshThreshold)) {
                _this.setState({
                    pullToRefreshThresholdBreached: true,
                });
            }
            // so you can drag upto 1.5 times of the maxPullDownDistance
            if (_this.currentY - _this.startY > _this.maxPullDownDistance * 1.5)
                return;
            if (_this._infScroll) {
                _this._infScroll.style.overflow = 'visible';
                _this._infScroll.style.transform = "translate3d(0px, " + (_this.currentY -
                    _this.startY) + "px, 0px)";
            }
        };
        _this.onEnd = function () {
            _this.startY = 0;
            _this.currentY = 0;
            _this.dragging = false;
            if (_this.state.pullToRefreshThresholdBreached) {
                _this.props.refreshFunction && _this.props.refreshFunction();
                _this.setState({
                    pullToRefreshThresholdBreached: false,
                });
            }
            requestAnimationFrame(function () {
                // this._infScroll
                if (_this._infScroll) {
                    _this._infScroll.style.overflow = 'auto';
                    _this._infScroll.style.transform = 'none';
                    _this._infScroll.style.willChange = 'unset';
                }
            });
        };
        _this.onScrollListener = function (event) {
            if (typeof _this.props.onScroll === 'function') {
                // Execute this callback in next tick so that it does not affect the
                // functionality of the library.
                setTimeout(function () { return _this.props.onScroll && _this.props.onScroll(event); }, 0);
            }
            var target = _this.props.height || _this._scrollableNode
                ? event.target
                : document.documentElement.scrollTop
                    ? document.documentElement
                    : document.body;
            // return immediately if the action has already been triggered,
            // prevents multiple triggers.
            if (_this.actionTriggered)
                return;
            var atBottom = _this.props.inverse
                ? _this.isElementAtTop(target, _this.props.scrollThreshold)
                : _this.isElementAtBottom(target, _this.props.scrollThreshold);
            // call the `next` function in the props to trigger the next data fetch
            if (atBottom && _this.props.hasMore) {
                _this.actionTriggered = true;
                _this.setState({ showLoader: true });
                _this.props.next && _this.props.next();
            }
            _this.lastScrollTop = target.scrollTop;
        };
        _this.state = {
            showLoader: false,
            pullToRefreshThresholdBreached: false,
            prevDataLength: props.dataLength,
        };
        _this.throttledOnScrollListener = throttle(150, _this.onScrollListener).bind(_this);
        _this.onStart = _this.onStart.bind(_this);
        _this.onMove = _this.onMove.bind(_this);
        _this.onEnd = _this.onEnd.bind(_this);
        return _this;
    }
    InfiniteScroll.prototype.componentDidMount = function () {
        if (typeof this.props.dataLength === 'undefined') {
            throw new Error("mandatory prop \"dataLength\" is missing. The prop is needed" +
                " when loading more content. Check README.md for usage");
        }
        this._scrollableNode = this.getScrollableTarget();
        this.el = this.props.height
            ? this._infScroll
            : this._scrollableNode || window;
        if (this.el) {
            this.el.addEventListener('scroll', this
                .throttledOnScrollListener);
        }
        if (typeof this.props.initialScrollY === 'number' &&
            this.el &&
            this.el instanceof HTMLElement &&
            this.el.scrollHeight > this.props.initialScrollY) {
            this.el.scrollTo(0, this.props.initialScrollY);
        }
        if (this.props.pullDownToRefresh && this.el) {
            this.el.addEventListener('touchstart', this.onStart);
            this.el.addEventListener('touchmove', this.onMove);
            this.el.addEventListener('touchend', this.onEnd);
            this.el.addEventListener('mousedown', this.onStart);
            this.el.addEventListener('mousemove', this.onMove);
            this.el.addEventListener('mouseup', this.onEnd);
            // get BCR of pullDown element to position it above
            this.maxPullDownDistance =
                (this._pullDown &&
                    this._pullDown.firstChild &&
                    this._pullDown.firstChild.getBoundingClientRect()
                        .height) ||
                    0;
            this.forceUpdate();
            if (typeof this.props.refreshFunction !== 'function') {
                throw new Error("Mandatory prop \"refreshFunction\" missing.\n          Pull Down To Refresh functionality will not work\n          as expected. Check README.md for usage'");
            }
        }
    };
    InfiniteScroll.prototype.componentWillUnmount = function () {
        if (this.el) {
            this.el.removeEventListener('scroll', this
                .throttledOnScrollListener);
            if (this.props.pullDownToRefresh) {
                this.el.removeEventListener('touchstart', this.onStart);
                this.el.removeEventListener('touchmove', this.onMove);
                this.el.removeEventListener('touchend', this.onEnd);
                this.el.removeEventListener('mousedown', this.onStart);
                this.el.removeEventListener('mousemove', this.onMove);
                this.el.removeEventListener('mouseup', this.onEnd);
            }
        }
    };
    InfiniteScroll.prototype.componentDidUpdate = function (prevProps) {
        // do nothing when dataLength is unchanged
        if (this.props.dataLength === prevProps.dataLength)
            return;
        this.actionTriggered = false;
        // update state when new data was sent in
        this.setState({
            showLoader: false,
        });
    };
    InfiniteScroll.getDerivedStateFromProps = function (nextProps, prevState) {
        var dataLengthChanged = nextProps.dataLength !== prevState.prevDataLength;
        // reset when data changes
        if (dataLengthChanged) {
            return __assign(__assign({}, prevState), { prevDataLength: nextProps.dataLength });
        }
        return null;
    };
    InfiniteScroll.prototype.isElementAtTop = function (target, scrollThreshold) {
        if (scrollThreshold === void 0) { scrollThreshold = 0.8; }
        var clientHeight = target === document.body || target === document.documentElement
            ? window.screen.availHeight
            : target.clientHeight;
        var threshold = parseThreshold(scrollThreshold);
        if (threshold.unit === ThresholdUnits.Pixel) {
            return (target.scrollTop <=
                threshold.value + clientHeight - target.scrollHeight + 1);
        }
        return (target.scrollTop <=
            threshold.value / 100 + clientHeight - target.scrollHeight + 1);
    };
    InfiniteScroll.prototype.isElementAtBottom = function (target, scrollThreshold) {
        if (scrollThreshold === void 0) { scrollThreshold = 0.8; }
        var clientHeight = target === document.body || target === document.documentElement
            ? window.screen.availHeight
            : target.clientHeight;
        var threshold = parseThreshold(scrollThreshold);
        if (threshold.unit === ThresholdUnits.Pixel) {
            return (target.scrollTop + clientHeight >= target.scrollHeight - threshold.value);
        }
        return (target.scrollTop + clientHeight >=
            (threshold.value / 100) * target.scrollHeight);
    };
    InfiniteScroll.prototype.render = function () {
        var _this = this;
        var style = __assign({ height: this.props.height || 'auto', overflow: 'auto', WebkitOverflowScrolling: 'touch' }, this.props.style);
        var hasChildren = this.props.hasChildren ||
            !!(this.props.children &&
                this.props.children instanceof Array &&
                this.props.children.length);
        // because heighted infiniteScroll visualy breaks
        // on drag down as overflow becomes visible
        var outerDivStyle = this.props.pullDownToRefresh && this.props.height
            ? { overflow: 'auto' }
            : {};
        return (React.createElement("div", { style: outerDivStyle, className: "infinite-scroll-component__outerdiv" },
            React.createElement("div", { className: "infinite-scroll-component " + (this.props.className || ''), ref: function (infScroll) { return (_this._infScroll = infScroll); }, style: style },
                this.props.pullDownToRefresh && (React.createElement("div", { style: { position: 'relative' }, ref: function (pullDown) { return (_this._pullDown = pullDown); } },
                    React.createElement("div", { style: {
                            position: 'absolute',
                            left: 0,
                            right: 0,
                            top: -1 * this.maxPullDownDistance,
                        } }, this.state.pullToRefreshThresholdBreached
                        ? this.props.releaseToRefreshContent
                        : this.props.pullDownToRefreshContent))),
                this.props.children,
                !this.state.showLoader &&
                    !hasChildren &&
                    this.props.hasMore &&
                    this.props.loader,
                this.state.showLoader && this.props.hasMore && this.props.loader,
                !this.props.hasMore && this.props.endMessage)));
    };
    return InfiniteScroll;
}(Component));

var ReactComponent = function (_a) {
    var handleImgLb = function (image, open) {
        setLightBoxImage(image);
        setLightBoxOpen(open);
    };
    var handleCollectionName = function (event) {
        setCollectionName(event.target.value);
    };
    var handleMoveImage = function (currentCollectionName, image) {
        indexOpMoveImageToCollection(currentCollectionName, image.name, collectionName);
        setRender(r + 1);
    };
    var handleMoveImageAll = function (collectionId) {
        // @ts-ignore
        var collection = imageIndex[collectionId];
        for (var _i = 0, _a = Object.entries(collection); _i < _a.length; _i++) {
            var key = _a[_i][0];
            indexOpMoveImageToCollection(collectionId, key, collectionName);
        }
        setRender(r + 1);
    };
    var handleCopyImage = function (currentCollectionName, image) {
        indexOpCopyImageToCollection(currentCollectionName, image.name, collectionName);
        setRender(r + 1);
    };
    var handleCopyImageAll = function (collectionId) {
        // @ts-ignore
        var collection = imageIndex[collectionId];
        for (var _i = 0, _a = Object.entries(collection); _i < _a.length; _i++) {
            var key = _a[_i][0];
            indexOpCopyImageToCollection(collectionId, key, collectionName);
        }
        setRender(r + 1);
    };
    var indexOpToggleCollectionDeleted = function (value) {
        value.deleted = !value.deleted;
        setRender(r + 1);
    };
    var indexOpToggleImageDeleted = function (value) {
        value.deleted = !value.deleted;
        setRender(r + 1);
    };
    var indexOpCopyImageToCollection = function (collectionId, imageId, targetCollectionId) {
        // @ts-ignore
        var collection = imageIndex[collectionId];
        var image = collection[imageId];
        // @ts-ignore
        var targetCollection = imageIndex[targetCollectionId];
        if (!targetCollection) {
            targetCollection = {};
            // @ts-ignore
            imageIndex[targetCollectionId] = targetCollection;
        }
        targetCollection[imageId] = image;
    };
    var indexOpMoveImageToCollection = function (collectionId, imageId, targetCollectionId) {
        // @ts-ignore
        var collection = imageIndex[collectionId];
        var image = collection[imageId];
        delete collection[imageId];
        // @ts-ignore
        if (Object.keys(imageIndex[collectionId]).length == 0) {
            // @ts-ignore
            delete imageIndex[collectionId];
        }
        // @ts-ignore
        var targetCollection = imageIndex[targetCollectionId];
        if (!targetCollection) {
            targetCollection = {};
            // @ts-ignore
            imageIndex[targetCollectionId] = targetCollection;
        }
        targetCollection[imageId] = image;
    };
    var dataSendPhotosToAws = function () {
        // @ts-ignore
        //CrafterCMSNext.util.ajax.get('/api/upload-photos-s3.json').subscribe((response) => {
        craftercms.getStore().dispatch({ type: 'SHOW_UPLOAD_DIALOG',
            payload: { path: '/static-assets/images/t1', site: 'qr-image-sort' }
        });
        //    })
        //    setRender(r+1)
    };
    var dataLoadIndex = function () {
        // @ts-ignore
        CrafterCMSNext.util.ajax.get('/api/get-index.json').subscribe(function (response) {
            imageIndex = response.response; //JSON.parse(response.response)
            setImageIndex(imageIndex);
            fetchMoreData();
            setRender(r + 1);
        });
    };
    var dataSaveIndex = function () {
        // @ts-ignore  
        CrafterCMSNext.util.ajax.post('/api/save-index.json', JSON.stringify(imageIndex), { 'Content-Type': 'application/json' }).subscribe(function (response) {
        });
    };
    var dataProcessPhotos = function () {
        setWorkingOpen(true);
        // @ts-ignore
        CrafterCMSNext.util.ajax.get('/api/process-photos.json').subscribe(function (response) {
            setImageIndex(response.response); //JSON.parse(response.response))
            setWorkingOpen(false);
            setRender(r + 1);
        });
    };
    var dataSortPhotos = function () {
        // @ts-ignore
        CrafterCMSNext.util.ajax.get('/api/process-photos.json').subscribe(function (response) {
            setImageIndex(response.response); //JSON.parse(response.response))
        });
    };
    var useStyles = makeStyles(function (theme) { return ({
        root: {
            maxWidth: 345,
        },
        media: {
            height: 0,
            paddingTop: '56.25%',
        },
        expand: {
            transform: 'rotate(0deg)',
            marginLeft: 'auto',
            transition: theme.transitions.create('transform', {
                duration: theme.transitions.duration.shortest,
            }),
        },
        expandOpen: {
            transform: 'rotate(180deg)',
        }
    }); });
    var _b = useState(0), r = _b[0], setRender = _b[1];
    var _c = useState(""), collectionName = _c[0], setCollectionName = _c[1];
    var classes = useStyles();
    var _d = useState(null), imageIndex = _d[0], setImageIndex = _d[1];
    useEffect(function () {
        dataLoadIndex();
    }, []);
    var _e = useState(false), open = _e[0], setOpen = _e[1];
    var _f = useState(false), workingOpen = _f[0], setWorkingOpen = _f[1];
    var _g = useState(false), lightBoxOpen = _g[0], setLightBoxOpen = _g[1];
    var _h = useState(""), lightBoxImage = _h[0], setLightBoxImage = _h[1];
    var oddEven = 0;
    var _j = useState({ items: {}, hasMore: true, curPage: 0, itemsPerPage: 10, itemSize: 1 }), state = _j[0], setState = _j[1];
    var fetchMoreData = function () {
        // @ts-ignore
        setState({ items: {}, hasMore: true, curPage: 0, itemsPerPage: 10, itemSize: 1 });
        var tags = [];
        var tagIdx = 0;
        // @ts-ignore
        for (var j in imageIndex) {
            // @ts-ignore
            tags[tagIdx] = "" + j;
            tagIdx++;
        }
        // @ts-ignore
        state.itemSize = tags.length;
        // @ts-ignore
        var curidx = state.curPage * state.itemsPerPage;
        // @ts-ignore
        state.index = {};
        for (var i = curidx; i < (curidx + state.itemsPerPage); i++) {
            // @ts-ignore
            //if( imageIndex[tags[i]] ) {
            // @ts-ignore
            state.items[tags[i]] = imageIndex[tags[i]];
            //console.log(tags[i]+":"+state.items[tags[i]])
            // @ts-ignore
            state.itemSize++;
            // @ts-ignore
            state.hasMore = true;
            //}
        }
        // @ts-ignore
        state.curPage++;
        setState(state);
        console.log(state);
        setRender(r + 1);
    };
    return (createElement(Fragment, null,
        createElement("div", { className: "MuiButtonBase-root MuiListItem-root MuiListItem-gutters MuiListItem-button" },
            createElement("div", { className: "MuiListItemIcon-root" },
                createElement("svg", { className: "MuiSvgIcon-root", focusable: "false", viewBox: "0 0 24 24", "aria-hidden": "true" },
                    createElement("path", { d: "M4 13h6c.55 0 1-.45 1-1V4c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1v8c0 .55.45 1 1 1zm0 8h6c.55 0 1-.45 1-1v-4c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1v4c0 .55.45 1 1 1zm10 0h6c.55 0 1-.45 1-1v-8c0-.55-.45-1-1-1h-6c-.55 0-1 .45-1 1v8c0 .55.45 1 1 1zM13 4v4c0 .55.45 1 1 1h6c.55 0 1-.45 1-1V4c0-.55-.45-1-1-1h-6c-.55 0-1 .45-1 1z" }))),
            createElement("div", { className: "MuiListItemText-root" },
                createElement("span", { className: "MuiTypography-root MuiListItemText-primary MuiTypography-body1 MuiTypography-noWrap MuiTypography-displayBlock", onClick: function () { return setOpen(true); } }, "Classify and Sort Images")),
            createElement("svg", { className: "MuiSvgIcon-root", focusable: "false", viewBox: "0 0 24 24", "aria-hidden": "true" },
                createElement("path", { d: "M9.29 6.71c-.39.39-.39 1.02 0 1.41L13.17 12l-3.88 3.88c-.39.39-.39 1.02 0 1.41.39.39 1.02.39 1.41 0l4.59-4.59c.39-.39.39-1.02 0-1.41L10.7 6.7c-.38-.38-1.02-.38-1.41.01z" })),
            createElement("span", { className: "MuiTouchRipple-root" })),
        createElement(Dialog, { fullWidth: false, maxWidth: "lg", onClose: function () { return setLightBoxOpen(false); }, open: lightBoxOpen },
            createElement("img", { width: "1000px", src: "/static-assets/images/t1/" + lightBoxImage })),
        createElement(Dialog, { onClose: function () { return setWorkingOpen(false); }, open: workingOpen },
            createElement(LinearProgress, null),
            createElement(LinearProgress, { color: "secondary" })),
        createElement(Dialog, { fullWidth: true, maxWidth: "xl", onClose: function () { return setOpen(false); }, "aria-labelledby": "simple-dialog-title", open: open },
            createElement(DialogTitle, { id: "max-width-dialog-title" }, "Image Classification and Sorting"),
            createElement(AppBar, { position: "fixed" },
                createElement(InputLabel, { id: "label" }, "Detection Mode"),
                createElement(Select, { labelId: "label", id: "select", value: "10" },
                    createElement(MenuItem, { value: "10" }, "Text"),
                    createElement(MenuItem, { value: "40" }, "Labels"),
                    createElement(MenuItem, { value: "20" }, "Faces"),
                    createElement(MenuItem, { value: "30" }, "Celebrities")),
                createElement(TextField, { id: "standard-basic", label: "Source Folder", inputProps: { maxLength: 10, size: 10 } }),
                createElement(ButtonGroup, { variant: "contained", color: "primary" },
                    createElement(Button, { onClick: function () { dataSendPhotosToAws(); } }, "Upload"),
                    createElement(Button, { onClick: function () { dataProcessPhotos(); } }, "Analyze"),
                    createElement(Button, { onClick: function () { dataLoadIndex(); } }, "Load Sort"),
                    createElement(Button, { onClick: function () { dataSaveIndex(); } }, "Save Sort"),
                    createElement(Button, { onClick: function () { dataSortPhotos(); } }, "Publish Event"))),
            createElement(Grid, null,
                createElement(InfiniteScroll, { dataLength: state.itemSize, next: fetchMoreData, hasMore: state.hasMore, loader: createElement("h1", null), height: 400, endMessage: createElement("p", { style: { textAlign: "center" } },
                        createElement("b", null, "Yay! You have seen it all")) }, state.items && Object
                    .entries(state.items)
                    .map(function (_a) {
                    var key = _a[0], value = _a[1];
                    var color = ((oddEven++) % 2 == 0) ? "#F8F8F8" : "#F8F8F8";
                    var rowDeleted = (value) ? (value.deleted === true) : false;
                    var deleteLabel = (rowDeleted == true) ? "Undelete" : "Delete";
                    color = (rowDeleted == true) ? "3px solid red" : "";
                    var idRow = value && Object
                        .entries(value)
                        .map(function (_a) {
                        var imageK = _a[0], imageV = _a[1];
                        var imgDeleted = (imageV.deleted === true);
                        var imgDeleteLabel = (imgDeleted == true) ? "Undelete" : "Delete";
                        var imgColor = (imgDeleted == true) ? "3px solid red" : "";
                        var foundText = [];
                        var tags = createElement("li", null, "unknown");
                        // @ts-ignore
                        if (imageV.tags) {
                            // @ts-ignore
                            tags = imageV.tags.map(function (tag) {
                                // @ts-ignore
                                var hitKey = tag.tag + "-" + tag.confidence;
                                // @ts-ignore
                                if (foundText.includes(hitKey)) {
                                    return ("");
                                }
                                else {
                                    // @ts-ignore
                                    foundText.push(hitKey);
                                    return (createElement("li", null,
                                        tag.tag,
                                        " (",
                                        Math.round(tag.confidence),
                                        "%)"));
                                }
                            });
                        }
                        return (createElement(Card, { style: { margin: 10, display: "inline-block", border: imgColor } },
                            createElement(CardMedia, { className: classes.media, image: "/static-assets/images/t1/" + imageK, title: imageK, onClick: function () { return handleImgLb(imageK, true); } }),
                            createElement(CardContent, null,
                                createElement("ul", null, tags)),
                            createElement(CardActions, null,
                                createElement(TextField, { style: { paddingRight: 10 }, inputProps: { maxLength: 10, size: 10 }, onChange: function () { return handleCollectionName(event); }, size: "small" }),
                                createElement(ButtonGroup, { variant: "contained", color: "primary" },
                                    createElement(Button, { size: "small", color: "primary", onClick: function () { return indexOpToggleImageDeleted(imageV); } }, imgDeleteLabel),
                                    createElement(Button, { size: "small", color: "primary", onClick: function () { return handleMoveImage(key, imageV); } }, "Move"),
                                    createElement(Button, { size: "small", color: "primary", onClick: function () { return handleCopyImage(key, imageV); } }, "Copy")))));
                    });
                    return (createElement(Grid, null,
                        createElement(Divider, null),
                        createElement(Grid, { style: { padding: 10 } },
                            createElement("span", { style: { fontSize: 32, padding: 10 } }, key),
                            createElement(TextField, { inputProps: { maxLength: 10, size: 10 }, style: { paddingRight: 10 }, onChange: function () { return handleCollectionName(event); }, size: "small" }),
                            createElement(ButtonGroup, { variant: "contained", color: "primary" },
                                createElement(Button, { size: "small", color: "primary", onClick: function () { return indexOpToggleCollectionDeleted(value); } },
                                    deleteLabel,
                                    " All"),
                                createElement(Button, { size: "small", color: "primary", onClick: function () { return handleMoveImageAll(key); } }, "Move All"),
                                createElement(Button, { size: "small", color: "primary", onClick: function () { return handleCopyImageAll(key); } }, "Copy All"))),
                        createElement(Grid, { style: { border: color, padding: 10 }, item: true, xs: 12, spacing: 6 }, idRow)));
                }))))));
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
