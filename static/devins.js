class MathUtils {
    PI = Math.PI;
    PI2 = this.PI * 2;
    HALF_PI = this.PI * .5;
    DEG2RAD = this.PI / 180;
    RAD2DEG = 180 / this.PI;
    step(e, t) {
        return t < e ? 0 : 1
    }
    clamp(e, t, i) {
        return e < t ? t : e > i ? i : e
    }
    mix(e, t, i) {
        return e + (t - e) * i
    }
    cMix(e, t, i) {
        return e + (t - e) * this.clamp(i, 0, 1)
    }
    unMix(e, t, i) {
        return (i - e) / (t - e)
    }
    cUnMix(e, t, i) {
        return this.clamp((i - e) / (t - e), 0, 1)
    }
    linearstep(e, t, i) {
        return this.clamp((i - e) / (t - e), 0, 1)
    }
    saturate(e) {
        return this.clamp(e, 0, 1)
    }
    fit(e, t, i, n, r, o) {
        return e = this.cUnMix(t, i, e),
        o && (e = o(e)),
        n + e * (r - n)
    }
    unClampedFit(e, t, i, n, r, o) {
        return e = this.unMix(t, i, e),
        o && (e = o(e)),
        n + e * (r - n)
    }
    loop(e, t, i) {
        return e -= t,
        i -= t,
        (e < 0 ? (i - Math.abs(e) % i) % i : e % i) + t
    }
    normalize(e, t, i) {
        return Math.max(0, Math.min(1, e - t / i - t))
    }
    smoothstep(e, t, i) {
        return i = this.cUnMix(e, t, i),
        i * i * (3 - i * 2)
    }
    fract(e) {
        return e - Math.floor(e)
    }
    hash(e) {
        return this.fract(Math.sin(e) * 43758.5453123)
    }
    hash2(e, t) {
        return this.fract(Math.sin(e * 12.9898 + t * 4.1414) * 43758.5453)
    }
    sign(e) {
        return e ? e < 0 ? -1 : 1 : 0
    }
    isPowerOfTwo(e) {
        return (e & -e) === e
    }
    powerTwoCeilingBase(e) {
        return Math.ceil(Math.log(e) / Math.log(2))
    }
    powerTwoCeiling(e) {
        return this.isPowerOfTwo(e) ? e : 1 << this.powerTwoCeilingBase(e)
    }
    powerTwoFloorBase(e) {
        return Math.floor(Math.log(e) / Math.log(2))
    }
    powerTwoFloor(e) {
        return this.isPowerOfTwo(e) ? e : 1 << this.powerTwoFloorBase(e)
    }
    latLngBearing(e, t, i, n) {
        let r = Math.sin(n - t) * Math.cos(i)
          , o = Math.cos(e) * Math.sin(i) - Math.sin(e) * Math.cos(i) * Math.cos(n - t);
        return Math.atan2(r, o)
    }
    distanceTo(e, t) {
        return Math.sqrt(e * e + t * t)
    }
    distanceSqrTo(e, t) {
        return e * e + t * t
    }
    distanceTo3(e, t, i) {
        return Math.sqrt(e * e + t * t + i * i)
    }
    distanceSqrTo3(e, t, i) {
        return e * e + t * t + i * i
    }
    latLngDistance(e, t, i, n) {
        let r = Math.sin((i - e) / 2)
          , o = Math.sin((n - t) / 2)
          , a = r * r + Math.cos(e) * Math.cos(i) * o * o;
        return 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
    }
    cubicBezier(e, t, i, n, r) {
        let o = (t - e) * 3
          , a = (i - t) * 3 - o
          , c = n - e - o - a
          , l = r * r
          , u = l * r;
        return c * u + a * l + o * r + e
    }
    cubicBezierFn(e, t, i, n) {
        let r = (t - e) * 3
          , o = (i - t) * 3 - r
          , a = n - e - r - o;
        return c => {
            let l = c * c
              , u = l * c;
            return a * u + o * l + r * c + e
        }
    }
    normalizeAngle(e) {
        return e += this.PI,
        e = e < 0 ? this.PI2 - Math.abs(e % PI2) : e % this.PI2,
        e -= this.PI,
        e
    }
    closestAngleTo(e, t) {
        return e + this.normalizeAngle(t - e)
    }
    randomRange(e, t) {
        return e + Math.random() * (t - e)
    }
    randomRangeInt(e, t) {
        return Math.floor(this.randomRange(e, t + 1))
    }
    padZero(e, t) {
        return e.toString().length >= t ? e : (Math.pow(10, t) + Math.floor(e)).toString().substring(1)
    }
    getSeedRandomFn(e) {
        let t = 1779033703
          , i = 3144134277
          , n = 1013904242
          , r = 2773480762;
        for (let o = 0, a; o < e.length; o++)
            a = e.charCodeAt(o),
            t = i ^ Math.imul(t ^ a, 597399067),
            i = n ^ Math.imul(i ^ a, 2869860233),
            n = r ^ Math.imul(n ^ a, 951274213),
            r = t ^ Math.imul(r ^ a, 2716044179);
        return _sfc32(Math.imul(n ^ t >>> 18, 597399067), Math.imul(r ^ i >>> 22, 2869860233), Math.imul(t ^ n >>> 17, 951274213), Math.imul(i ^ r >>> 19, 2716044179))
    }
}
function _sfc32(s, e, t, i) {
    return function() {
        s |= 0,
        e |= 0,
        t |= 0,
        i |= 0;
        var n = (s + e | 0) + i | 0;
        return i = i + 1 | 0,
        s = e ^ e >>> 9,
        e = t + (t << 3) | 0,
        t = t << 21 | t >>> 11,
        t = t + n | 0,
        (n >>> 0) / 4294967296
    }
}
const math = new MathUtils;
var isSSR = typeof window > "u"
  , DetectUA = function() {
    function s(e) {
        this.userAgent = e || (!isSSR && window.navigator ? window.navigator.userAgent : ""),
        this.isAndroidDevice = !/like android/i.test(this.userAgent) && /android/i.test(this.userAgent),
        this.iOSDevice = this.match(1, /(iphone|ipod|ipad)/i).toLowerCase(),
        !isSSR && navigator.platform === "MacIntel" && navigator.maxTouchPoints > 2 && !window.MSStream && (this.iOSDevice = "ipad")
    }
    return s.prototype.match = function(e, t) {
        var i = this.userAgent.match(t);
        return i && i.length > 1 && i[e] || ""
    }
    ,
    Object.defineProperty(s.prototype, "isMobile", {
        get: function() {
            return !this.isTablet && (/[^-]mobi/i.test(this.userAgent) || this.iOSDevice === "iphone" || this.iOSDevice === "ipod" || this.isAndroidDevice || /nexus\s*[0-6]\s*/i.test(this.userAgent))
        },
        enumerable: !1,
        configurable: !0
    }),
    Object.defineProperty(s.prototype, "isTablet", {
        get: function() {
            return /tablet/i.test(this.userAgent) && !/tablet pc/i.test(this.userAgent) || this.iOSDevice === "ipad" || this.isAndroidDevice && !/[^-]mobi/i.test(this.userAgent) || !/nexus\s*[0-6]\s*/i.test(this.userAgent) && /nexus\s*[0-9]+/i.test(this.userAgent)
        },
        enumerable: !1,
        configurable: !0
    }),
    Object.defineProperty(s.prototype, "isDesktop", {
        get: function() {
            return !this.isMobile && !this.isTablet
        },
        enumerable: !1,
        configurable: !0
    }),
    Object.defineProperty(s.prototype, "isMacOS", {
        get: function() {
            return /macintosh/i.test(this.userAgent) && {
                version: this.match(1, /mac os x (\d+(\.?_?\d+)+)/i).replace(/[_\s]/g, ".").split(".").map(function(e) {
                    return e
                })[1]
            }
        },
        enumerable: !1,
        configurable: !0
    }),
    Object.defineProperty(s.prototype, "isWindows", {
        get: function() {
            return /windows /i.test(this.userAgent) && {
                version: this.match(1, /Windows ((NT|XP)( \d\d?.\d)?)/i)
            }
        },
        enumerable: !1,
        configurable: !0
    }),
    Object.defineProperty(s.prototype, "isiOS", {
        get: function() {
            return !!this.iOSDevice && {
                version: this.match(1, /os (\d+([_\s]\d+)*) like mac os x/i).replace(/[_\s]/g, ".") || this.match(1, /version\/(\d+(\.\d+)?)/i)
            }
        },
        enumerable: !1,
        configurable: !0
    }),
    Object.defineProperty(s.prototype, "isAndroid", {
        get: function() {
            return this.isAndroidDevice && {
                version: this.match(1, /android[ \/-](\d+(\.\d+)*)/i)
            }
        },
        enumerable: !1,
        configurable: !0
    }),
    Object.defineProperty(s.prototype, "browser", {
        get: function() {
            var e = this.match(1, /version\/(\d+(\.\d+)?)/i);
            return /opera/i.test(this.userAgent) ? {
                name: "Opera",
                version: e || this.match(1, /(?:opera|opr|opios)[\s\/](\d+(\.\d+)?)/i)
            } : /opr\/|opios/i.test(this.userAgent) ? {
                name: "Opera",
                version: this.match(1, /(?:opr|opios)[\s\/](\d+(\.\d+)?)/i) || e
            } : /SamsungBrowser/i.test(this.userAgent) ? {
                name: "Samsung Internet for Android",
                version: e || this.match(1, /(?:SamsungBrowser)[\s\/](\d+(\.\d+)?)/i)
            } : /yabrowser/i.test(this.userAgent) ? {
                name: "Yandex Browser",
                version: e || this.match(1, /(?:yabrowser)[\s\/](\d+(\.\d+)?)/i)
            } : /ucbrowser/i.test(this.userAgent) ? {
                name: "UC Browser",
                version: this.match(1, /(?:ucbrowser)[\s\/](\d+(\.\d+)?)/i)
            } : /msie|trident/i.test(this.userAgent) ? {
                name: "Internet Explorer",
                version: this.match(1, /(?:msie |rv:)(\d+(\.\d+)?)/i)
            } : /(edge|edgios|edga|edg)/i.test(this.userAgent) ? {
                name: "Microsoft Edge",
                version: this.match(2, /(edge|edgios|edga|edg)\/(\d+(\.\d+)?)/i)
            } : /firefox|iceweasel|fxios/i.test(this.userAgent) ? {
                name: "Firefox",
                version: this.match(1, /(?:firefox|iceweasel|fxios)[ \/](\d+(\.\d+)?)/i)
            } : /chromium/i.test(this.userAgent) ? {
                name: "Chromium",
                version: this.match(1, /(?:chromium)[\s\/](\d+(?:\.\d+)?)/i) || e
            } : /chrome|crios|crmo/i.test(this.userAgent) ? {
                name: "Chrome",
                version: this.match(1, /(?:chrome|crios|crmo)\/(\d+(\.\d+)?)/i)
            } : /safari|applewebkit/i.test(this.userAgent) ? {
                name: "Safari",
                version: e
            } : {
                name: this.match(1, /^(.*)\/(.*) /),
                version: this.match(2, /^(.*)\/(.*) /)
            }
        },
        enumerable: !1,
        configurable: !0
    }),
    s
}();
const detectUA = new DetectUA
  , userAgent = (navigator.userAgent || navigator.vendor).toLowerCase()
  , browserName = detectUA.browser.name;
class Browser {
    isMobile = detectUA.isMobile || detectUA.isTablet;
    isDesktop = detectUA.isDesktop;
    device = this.isMobile ? "mobile" : "desktop";
    isAndroid = !!detectUA.isAndroid;
    isIOS = !!detectUA.isiOS;
    isMacOS = !!detectUA.isMacOS;
    isWindows = detectUA.isWindows.version !== null;
    isLinux = userAgent.indexOf("linux") != -1;
    ua = userAgent;
    isEdge = browserName === "Microsoft Edge";
    isIE = browserName === "Internet Explorer";
    isFirefox = browserName === "Firefox";
    isChrome = browserName === "Chrome";
    isOpera = browserName === "Opera";
    isSafari = browserName === "Safari";
    isSupportMSAA = !userAgent.match("version/15.4 ");
    isRetina = window.devicePixelRatio && window.devicePixelRatio >= 1.5;
    devicePixelRatio = window.devicePixelRatio || 1;
    cpuCoreCount = navigator.hardwareConcurrency || 1;
    baseUrl = document.location.origin;
    isIFrame = window.self !== window.top
}
const browser$1 = new Browser
  , fromEntries = (s, e) => [...s].reduce( (t, [i,n]) => (t[i] = n === "" && e ? !0 : n,
t), {});
class Settings {
    MODEL_PATH = "assets/models/";
    IMAGE_PATH = "assets/images/";
    TEXTURE_PATH = "assets/textures/";
    AUDIO_PATH = "assets/audios/";
    RENDER_TARGET_FLOAT_TYPE = null;
    DATA_FLOAT_TYPE = null;
    USE_FLOAT_PACKING = !1;
    USE_WEBGL2 = !0;
    DPR = Math.min(1.5, browser$1.devicePixelRatio) || 1;
    USE_PIXEL_LIMIT = !0;
    MAX_PIXEL_COUNT = 2560 * 1440;
    UP_SCALE = 1;
    JUMP_SECTION = "";
    JUMP_OFFSET = 0;
    SCROLL_TEST_VALUES = !1;
    CROSS_ORIGINS = {
        "https://example.com/": "anonymous"
    };
    IS_DEV = !1;
    LOG = !1;
    SKIP_ANIMATION = !1;
    LOOK_DEV_MODE = !1;
    HIDE_UI = !1;
    constructor() {
        this.override(this.parseQuery(window.location.search, !0))
    }
    parseQuery(e, t) {
        return fromEntries(new URLSearchParams(e,t))
    }
    override(e) {
        for (const t in e)
            if (this[t] !== void 0) {
                const i = e[t].toString();
                typeof this[t] == "boolean" ? this[t] = !(i === "0" || i === !1) : typeof this[t] == "number" ? this[t] = parseFloat(i) : typeof this[t] == "string" && (this[t] = i)
            }
    }
}
const settings = new Settings;
/**
 * @license
 * Copyright 2010-2022 Three.js Authors
 * SPDX-License-Identifier: MIT
 */
const REVISION = "148"
  , CullFaceNone = 0
  , CullFaceBack = 1
  , CullFaceFront = 2
  , PCFShadowMap = 1
  , PCFSoftShadowMap = 2
  , VSMShadowMap = 3
  , FrontSide = 0
  , BackSide = 1
  , DoubleSide = 2
  , TwoPassDoubleSide = 3
  , NoBlending = 0
  , NormalBlending = 1
  , AdditiveBlending = 2
  , SubtractiveBlending = 3
  , MultiplyBlending = 4
  , CustomBlending = 5
  , AddEquation = 100
  , SubtractEquation = 101
  , ReverseSubtractEquation = 102
  , MinEquation = 103
  , MaxEquation = 104
  , ZeroFactor = 200
  , OneFactor = 201
  , SrcColorFactor = 202
  , OneMinusSrcColorFactor = 203
  , SrcAlphaFactor = 204
  , OneMinusSrcAlphaFactor = 205
  , DstAlphaFactor = 206
  , OneMinusDstAlphaFactor = 207
  , DstColorFactor = 208
  , OneMinusDstColorFactor = 209
  , SrcAlphaSaturateFactor = 210
  , NeverDepth = 0
  , AlwaysDepth = 1
  , LessDepth = 2
  , LessEqualDepth = 3
  , EqualDepth = 4
  , GreaterEqualDepth = 5
  , GreaterDepth = 6
  , NotEqualDepth = 7
  , MultiplyOperation = 0
  , MixOperation = 1
  , AddOperation = 2
  , NoToneMapping = 0
  , LinearToneMapping = 1
  , ReinhardToneMapping = 2
  , CineonToneMapping = 3
  , ACESFilmicToneMapping = 4
  , CustomToneMapping = 5
  , UVMapping = 300
  , CubeReflectionMapping = 301
  , CubeRefractionMapping = 302
  , EquirectangularReflectionMapping = 303
  , EquirectangularRefractionMapping = 304
  , CubeUVReflectionMapping = 306
  , RepeatWrapping = 1e3
  , ClampToEdgeWrapping = 1001
  , MirroredRepeatWrapping = 1002
  , NearestFilter = 1003
  , NearestMipmapNearestFilter = 1004
  , NearestMipMapNearestFilter = 1004
  , NearestMipmapLinearFilter = 1005
  , NearestMipMapLinearFilter = 1005
  , LinearFilter = 1006
  , LinearMipmapNearestFilter = 1007
  , LinearMipMapNearestFilter = 1007
  , LinearMipmapLinearFilter = 1008
  , LinearMipMapLinearFilter = 1008
  , UnsignedByteType = 1009
  , ByteType = 1010
  , ShortType = 1011
  , UnsignedShortType = 1012
  , IntType = 1013
  , UnsignedIntType = 1014
  , FloatType = 1015
  , HalfFloatType = 1016
  , UnsignedShort4444Type = 1017
  , UnsignedShort5551Type = 1018
  , UnsignedInt248Type = 1020
  , AlphaFormat = 1021
  , RGBFormat = 1022
  , RGBAFormat = 1023
  , LuminanceFormat = 1024
  , LuminanceAlphaFormat = 1025
  , DepthFormat = 1026
  , DepthStencilFormat = 1027
  , RedFormat = 1028
  , RedIntegerFormat = 1029
  , RGFormat = 1030
  , RGIntegerFormat = 1031
  , RGBAIntegerFormat = 1033
  , RGB_S3TC_DXT1_Format = 33776
  , RGBA_S3TC_DXT1_Format = 33777
  , RGBA_S3TC_DXT3_Format = 33778
  , RGBA_S3TC_DXT5_Format = 33779
  , RGB_PVRTC_4BPPV1_Format = 35840
  , RGB_PVRTC_2BPPV1_Format = 35841
  , RGBA_PVRTC_4BPPV1_Format = 35842
  , RGBA_PVRTC_2BPPV1_Format = 35843
  , RGB_ETC1_Format = 36196
  , RGB_ETC2_Format = 37492
  , RGBA_ETC2_EAC_Format = 37496
  , RGBA_ASTC_4x4_Format = 37808
  , RGBA_ASTC_5x4_Format = 37809
  , RGBA_ASTC_5x5_Format = 37810
  , RGBA_ASTC_6x5_Format = 37811
  , RGBA_ASTC_6x6_Format = 37812
  , RGBA_ASTC_8x5_Format = 37813
  , RGBA_ASTC_8x6_Format = 37814
  , RGBA_ASTC_8x8_Format = 37815
  , RGBA_ASTC_10x5_Format = 37816
  , RGBA_ASTC_10x6_Format = 37817
  , RGBA_ASTC_10x8_Format = 37818
  , RGBA_ASTC_10x10_Format = 37819
  , RGBA_ASTC_12x10_Format = 37820
  , RGBA_ASTC_12x12_Format = 37821
  , RGBA_BPTC_Format = 36492
  , LinearEncoding = 3e3
  , sRGBEncoding = 3001
  , BasicDepthPacking = 3200
  , RGBADepthPacking = 3201
  , TangentSpaceNormalMap = 0
  , ObjectSpaceNormalMap = 1
  , SRGBColorSpace = "srgb"
  , LinearSRGBColorSpace = "srgb-linear"
  , KeepStencilOp = 7680
  , AlwaysStencilFunc = 519
  , StaticDrawUsage = 35044
  , GLSL3 = "300 es"
  , _SRGBAFormat = 1035;
class EventDispatcher {
    addEventListener(e, t) {
        this._listeners === void 0 && (this._listeners = {});
        const i = this._listeners;
        i[e] === void 0 && (i[e] = []),
        i[e].indexOf(t) === -1 && i[e].push(t)
    }
    hasEventListener(e, t) {
        if (this._listeners === void 0)
            return !1;
        const i = this._listeners;
        return i[e] !== void 0 && i[e].indexOf(t) !== -1
    }
    removeEventListener(e, t) {
        if (this._listeners === void 0)
            return;
        const n = this._listeners[e];
        if (n !== void 0) {
            const r = n.indexOf(t);
            r !== -1 && n.splice(r, 1)
        }
    }
    dispatchEvent(e) {
        if (this._listeners === void 0)
            return;
        const i = this._listeners[e.type];
        if (i !== void 0) {
            e.target = this;
            const n = i.slice(0);
            for (let r = 0, o = n.length; r < o; r++)
                n[r].call(this, e);
            e.target = null
        }
    }
}
const _lut = ["00", "01", "02", "03", "04", "05", "06", "07", "08", "09", "0a", "0b", "0c", "0d", "0e", "0f", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "1a", "1b", "1c", "1d", "1e", "1f", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "2a", "2b", "2c", "2d", "2e", "2f", "30", "31", "32", "33", "34", "35", "36", "37", "38", "39", "3a", "3b", "3c", "3d", "3e", "3f", "40", "41", "42", "43", "44", "45", "46", "47", "48", "49", "4a", "4b", "4c", "4d", "4e", "4f", "50", "51", "52", "53", "54", "55", "56", "57", "58", "59", "5a", "5b", "5c", "5d", "5e", "5f", "60", "61", "62", "63", "64", "65", "66", "67", "68", "69", "6a", "6b", "6c", "6d", "6e", "6f", "70", "71", "72", "73", "74", "75", "76", "77", "78", "79", "7a", "7b", "7c", "7d", "7e", "7f", "80", "81", "82", "83", "84", "85", "86", "87", "88", "89", "8a", "8b", "8c", "8d", "8e", "8f", "90", "91", "92", "93", "94", "95", "96", "97", "98", "99", "9a", "9b", "9c", "9d", "9e", "9f", "a0", "a1", "a2", "a3", "a4", "a5", "a6", "a7", "a8", "a9", "aa", "ab", "ac", "ad", "ae", "af", "b0", "b1", "b2", "b3", "b4", "b5", "b6", "b7", "b8", "b9", "ba", "bb", "bc", "bd", "be", "bf", "c0", "c1", "c2", "c3", "c4", "c5", "c6", "c7", "c8", "c9", "ca", "cb", "cc", "cd", "ce", "cf", "d0", "d1", "d2", "d3", "d4", "d5", "d6", "d7", "d8", "d9", "da", "db", "dc", "dd", "de", "df", "e0", "e1", "e2", "e3", "e4", "e5", "e6", "e7", "e8", "e9", "ea", "eb", "ec", "ed", "ee", "ef", "f0", "f1", "f2", "f3", "f4", "f5", "f6", "f7", "f8", "f9", "fa", "fb", "fc", "fd", "fe", "ff"]
  , DEG2RAD = Math.PI / 180
  , RAD2DEG = 180 / Math.PI;
function generateUUID() {
    const s = Math.random() * 4294967295 | 0
      , e = Math.random() * 4294967295 | 0
      , t = Math.random() * 4294967295 | 0
      , i = Math.random() * 4294967295 | 0;
    return (_lut[s & 255] + _lut[s >> 8 & 255] + _lut[s >> 16 & 255] + _lut[s >> 24 & 255] + "-" + _lut[e & 255] + _lut[e >> 8 & 255] + "-" + _lut[e >> 16 & 15 | 64] + _lut[e >> 24 & 255] + "-" + _lut[t & 63 | 128] + _lut[t >> 8 & 255] + "-" + _lut[t >> 16 & 255] + _lut[t >> 24 & 255] + _lut[i & 255] + _lut[i >> 8 & 255] + _lut[i >> 16 & 255] + _lut[i >> 24 & 255]).toLowerCase()
}
function clamp(s, e, t) {
    return Math.max(e, Math.min(t, s))
}
function euclideanModulo(s, e) {
    return (s % e + e) % e
}
function lerp(s, e, t) {
    return (1 - t) * s + t * e
}
function isPowerOfTwo(s) {
    return (s & s - 1) === 0 && s !== 0
}
function floorPowerOfTwo(s) {
    return Math.pow(2, Math.floor(Math.log(s) / Math.LN2))
}
function denormalize(s, e) {
    switch (e.constructor) {
    case Float32Array:
        return s;
    case Uint16Array:
        return s / 65535;
    case Uint8Array:
        return s / 255;
    case Int16Array:
        return Math.max(s / 32767, -1);
    case Int8Array:
        return Math.max(s / 127, -1);
    default:
        throw new Error("Invalid component type.")
    }
}
function normalize(s, e) {
    switch (e.constructor) {
    case Float32Array:
        return s;
    case Uint16Array:
        return Math.round(s * 65535);
    case Uint8Array:
        return Math.round(s * 255);
    case Int16Array:
        return Math.round(s * 32767);
    case Int8Array:
        return Math.round(s * 127);
    default:
        throw new Error("Invalid component type.")
    }
}
class Vector2 {
    constructor(e=0, t=0) {
        Vector2.prototype.isVector2 = !0,
        this.x = e,
        this.y = t
    }
    get width() {
        return this.x
    }
    set width(e) {
        this.x = e
    }
    get height() {
        return this.y
    }
    set height(e) {
        this.y = e
    }
    set(e, t) {
        return this.x = e,
        this.y = t,
        this
    }
    setScalar(e) {
        return this.x = e,
        this.y = e,
        this
    }
    setX(e) {
        return this.x = e,
        this
    }
    setY(e) {
        return this.y = e,
        this
    }
    setComponent(e, t) {
        switch (e) {
        case 0:
            this.x = t;
            break;
        case 1:
            this.y = t;
            break;
        default:
            throw new Error("index is out of range: " + e)
        }
        return this
    }
    getComponent(e) {
        switch (e) {
        case 0:
            return this.x;
        case 1:
            return this.y;
        default:
            throw new Error("index is out of range: " + e)
        }
    }
    clone() {
        return new this.constructor(this.x,this.y)
    }
    copy(e) {
        return this.x = e.x,
        this.y = e.y,
        this
    }
    add(e) {
        return this.x += e.x,
        this.y += e.y,
        this
    }
    addScalar(e) {
        return this.x += e,
        this.y += e,
        this
    }
    addVectors(e, t) {
        return this.x = e.x + t.x,
        this.y = e.y + t.y,
        this
    }
    addScaledVector(e, t) {
        return this.x += e.x * t,
        this.y += e.y * t,
        this
    }
    sub(e) {
        return this.x -= e.x,
        this.y -= e.y,
        this
    }
    subScalar(e) {
        return this.x -= e,
        this.y -= e,
        this
    }
    subVectors(e, t) {
        return this.x = e.x - t.x,
        this.y = e.y - t.y,
        this
    }
    multiply(e) {
        return this.x *= e.x,
        this.y *= e.y,
        this
    }
    multiplyScalar(e) {
        return this.x *= e,
        this.y *= e,
        this
    }
    divide(e) {
        return this.x /= e.x,
        this.y /= e.y,
        this
    }
    divideScalar(e) {
        return this.multiplyScalar(1 / e)
    }
    applyMatrix3(e) {
        const t = this.x
          , i = this.y
          , n = e.elements;
        return this.x = n[0] * t + n[3] * i + n[6],
        this.y = n[1] * t + n[4] * i + n[7],
        this
    }
    min(e) {
        return this.x = Math.min(this.x, e.x),
        this.y = Math.min(this.y, e.y),
        this
    }
    max(e) {
        return this.x = Math.max(this.x, e.x),
        this.y = Math.max(this.y, e.y),
        this
    }
    clamp(e, t) {
        return this.x = Math.max(e.x, Math.min(t.x, this.x)),
        this.y = Math.max(e.y, Math.min(t.y, this.y)),
        this
    }
    clampScalar(e, t) {
        return this.x = Math.max(e, Math.min(t, this.x)),
        this.y = Math.max(e, Math.min(t, this.y)),
        this
    }
    clampLength(e, t) {
        const i = this.length();
        return this.divideScalar(i || 1).multiplyScalar(Math.max(e, Math.min(t, i)))
    }
    floor() {
        return this.x = Math.floor(this.x),
        this.y = Math.floor(this.y),
        this
    }
    ceil() {
        return this.x = Math.ceil(this.x),
        this.y = Math.ceil(this.y),
        this
    }
    round() {
        return this.x = Math.round(this.x),
        this.y = Math.round(this.y),
        this
    }
    roundToZero() {
        return this.x = this.x < 0 ? Math.ceil(this.x) : Math.floor(this.x),
        this.y = this.y < 0 ? Math.ceil(this.y) : Math.floor(this.y),
        this
    }
    negate() {
        return this.x = -this.x,
        this.y = -this.y,
        this
    }
    dot(e) {
        return this.x * e.x + this.y * e.y
    }
    cross(e) {
        return this.x * e.y - this.y * e.x
    }
    lengthSq() {
        return this.x * this.x + this.y * this.y
    }
    length() {
        return Math.sqrt(this.x * this.x + this.y * this.y)
    }
    manhattanLength() {
        return Math.abs(this.x) + Math.abs(this.y)
    }
    normalize() {
        return this.divideScalar(this.length() || 1)
    }
    angle() {
        return Math.atan2(-this.y, -this.x) + Math.PI
    }
    distanceTo(e) {
        return Math.sqrt(this.distanceToSquared(e))
    }
    distanceToSquared(e) {
        const t = this.x - e.x
          , i = this.y - e.y;
        return t * t + i * i
    }
    manhattanDistanceTo(e) {
        return Math.abs(this.x - e.x) + Math.abs(this.y - e.y)
    }
    setLength(e) {
        return this.normalize().multiplyScalar(e)
    }
    lerp(e, t) {
        return this.x += (e.x - this.x) * t,
        this.y += (e.y - this.y) * t,
        this
    }
    lerpVectors(e, t, i) {
        return this.x = e.x + (t.x - e.x) * i,
        this.y = e.y + (t.y - e.y) * i,
        this
    }
    equals(e) {
        return e.x === this.x && e.y === this.y
    }
    fromArray(e, t=0) {
        return this.x = e[t],
        this.y = e[t + 1],
        this
    }
    toArray(e=[], t=0) {
        return e[t] = this.x,
        e[t + 1] = this.y,
        e
    }
    fromBufferAttribute(e, t) {
        return this.x = e.getX(t),
        this.y = e.getY(t),
        this
    }
    rotateAround(e, t) {
        const i = Math.cos(t)
          , n = Math.sin(t)
          , r = this.x - e.x
          , o = this.y - e.y;
        return this.x = r * i - o * n + e.x,
        this.y = r * n + o * i + e.y,
        this
    }
    random() {
        return this.x = Math.random(),
        this.y = Math.random(),
        this
    }
    *[Symbol.iterator]() {
        yield this.x,
        yield this.y
    }
}
class Matrix3 {
    constructor() {
        Matrix3.prototype.isMatrix3 = !0,
        this.elements = [1, 0, 0, 0, 1, 0, 0, 0, 1]
    }
    set(e, t, i, n, r, o, a, c, l) {
        const u = this.elements;
        return u[0] = e,
        u[1] = n,
        u[2] = a,
        u[3] = t,
        u[4] = r,
        u[5] = c,
        u[6] = i,
        u[7] = o,
        u[8] = l,
        this
    }
    identity() {
        return this.set(1, 0, 0, 0, 1, 0, 0, 0, 1),
        this
    }
    copy(e) {
        const t = this.elements
          , i = e.elements;
        return t[0] = i[0],
        t[1] = i[1],
        t[2] = i[2],
        t[3] = i[3],
        t[4] = i[4],
        t[5] = i[5],
        t[6] = i[6],
        t[7] = i[7],
        t[8] = i[8],
        this
    }
    extractBasis(e, t, i) {
        return e.setFromMatrix3Column(this, 0),
        t.setFromMatrix3Column(this, 1),
        i.setFromMatrix3Column(this, 2),
        this
    }
    setFromMatrix4(e) {
        const t = e.elements;
        return this.set(t[0], t[4], t[8], t[1], t[5], t[9], t[2], t[6], t[10]),
        this
    }
    multiply(e) {
        return this.multiplyMatrices(this, e)
    }
    premultiply(e) {
        return this.multiplyMatrices(e, this)
    }
    multiplyMatrices(e, t) {
        const i = e.elements
          , n = t.elements
          , r = this.elements
          , o = i[0]
          , a = i[3]
          , c = i[6]
          , l = i[1]
          , u = i[4]
          , h = i[7]
          , d = i[2]
          , m = i[5]
          , g = i[8]
          , p = n[0]
          , f = n[3]
          , x = n[6]
          , S = n[1]
          , v = n[4]
          , M = n[7]
          , y = n[2]
          , A = n[5]
          , P = n[8];
        return r[0] = o * p + a * S + c * y,
        r[3] = o * f + a * v + c * A,
        r[6] = o * x + a * M + c * P,
        r[1] = l * p + u * S + h * y,
        r[4] = l * f + u * v + h * A,
        r[7] = l * x + u * M + h * P,
        r[2] = d * p + m * S + g * y,
        r[5] = d * f + m * v + g * A,
        r[8] = d * x + m * M + g * P,
        this
    }
    multiplyScalar(e) {
        const t = this.elements;
        return t[0] *= e,
        t[3] *= e,
        t[6] *= e,
        t[1] *= e,
        t[4] *= e,
        t[7] *= e,
        t[2] *= e,
        t[5] *= e,
        t[8] *= e,
        this
    }
    determinant() {
        const e = this.elements
          , t = e[0]
          , i = e[1]
          , n = e[2]
          , r = e[3]
          , o = e[4]
          , a = e[5]
          , c = e[6]
          , l = e[7]
          , u = e[8];
        return t * o * u - t * a * l - i * r * u + i * a * c + n * r * l - n * o * c
    }
    invert() {
        const e = this.elements
          , t = e[0]
          , i = e[1]
          , n = e[2]
          , r = e[3]
          , o = e[4]
          , a = e[5]
          , c = e[6]
          , l = e[7]
          , u = e[8]
          , h = u * o - a * l
          , d = a * c - u * r
          , m = l * r - o * c
          , g = t * h + i * d + n * m;
        if (g === 0)
            return this.set(0, 0, 0, 0, 0, 0, 0, 0, 0);
        const p = 1 / g;
        return e[0] = h * p,
        e[1] = (n * l - u * i) * p,
        e[2] = (a * i - n * o) * p,
        e[3] = d * p,
        e[4] = (u * t - n * c) * p,
        e[5] = (n * r - a * t) * p,
        e[6] = m * p,
        e[7] = (i * c - l * t) * p,
        e[8] = (o * t - i * r) * p,
        this
    }
    transpose() {
        let e;
        const t = this.elements;
        return e = t[1],
        t[1] = t[3],
        t[3] = e,
        e = t[2],
        t[2] = t[6],
        t[6] = e,
        e = t[5],
        t[5] = t[7],
        t[7] = e,
        this
    }
    getNormalMatrix(e) {
        return this.setFromMatrix4(e).invert().transpose()
    }
    transposeIntoArray(e) {
        const t = this.elements;
        return e[0] = t[0],
        e[1] = t[3],
        e[2] = t[6],
        e[3] = t[1],
        e[4] = t[4],
        e[5] = t[7],
        e[6] = t[2],
        e[7] = t[5],
        e[8] = t[8],
        this
    }
    setUvTransform(e, t, i, n, r, o, a) {
        const c = Math.cos(r)
          , l = Math.sin(r);
        return this.set(i * c, i * l, -i * (c * o + l * a) + o + e, -n * l, n * c, -n * (-l * o + c * a) + a + t, 0, 0, 1),
        this
    }
    scale(e, t) {
        return this.premultiply(_m3.makeScale(e, t)),
        this
    }
    rotate(e) {
        return this.premultiply(_m3.makeRotation(-e)),
        this
    }
    translate(e, t) {
        return this.premultiply(_m3.makeTranslation(e, t)),
        this
    }
    makeTranslation(e, t) {
        return this.set(1, 0, e, 0, 1, t, 0, 0, 1),
        this
    }
    makeRotation(e) {
        const t = Math.cos(e)
          , i = Math.sin(e);
        return this.set(t, -i, 0, i, t, 0, 0, 0, 1),
        this
    }
    makeScale(e, t) {
        return this.set(e, 0, 0, 0, t, 0, 0, 0, 1),
        this
    }
    equals(e) {
        const t = this.elements
          , i = e.elements;
        for (let n = 0; n < 9; n++)
            if (t[n] !== i[n])
                return !1;
        return !0
    }
    fromArray(e, t=0) {
        for (let i = 0; i < 9; i++)
            this.elements[i] = e[i + t];
        return this
    }
    toArray(e=[], t=0) {
        const i = this.elements;
        return e[t] = i[0],
        e[t + 1] = i[1],
        e[t + 2] = i[2],
        e[t + 3] = i[3],
        e[t + 4] = i[4],
        e[t + 5] = i[5],
        e[t + 6] = i[6],
        e[t + 7] = i[7],
        e[t + 8] = i[8],
        e
    }
    clone() {
        return new this.constructor().fromArray(this.elements)
    }
}
const _m3 = new Matrix3;
function arrayNeedsUint32(s) {
    for (let e = s.length - 1; e >= 0; --e)
        if (s[e] >= 65535)
            return !0;
    return !1
}
function createElementNS(s) {
    return document.createElementNS("http://www.w3.org/1999/xhtml", s)
}
function SRGBToLinear(s) {
    return s < .04045 ? s * .0773993808 : Math.pow(s * .9478672986 + .0521327014, 2.4)
}
function LinearToSRGB(s) {
    return s < .0031308 ? s * 12.92 : 1.055 * Math.pow(s, .41666) - .055
}
const FN = {
    [SRGBColorSpace]: {
        [LinearSRGBColorSpace]: SRGBToLinear
    },
    [LinearSRGBColorSpace]: {
        [SRGBColorSpace]: LinearToSRGB
    }
}
  , ColorManagement = {
    legacyMode: !0,
    get workingColorSpace() {
        return LinearSRGBColorSpace
    },
    set workingColorSpace(s) {
        console.warn("THREE.ColorManagement: .workingColorSpace is readonly.")
    },
    convert: function(s, e, t) {
        if (this.legacyMode || e === t || !e || !t)
            return s;
        if (FN[e] && FN[e][t] !== void 0) {
            const i = FN[e][t];
            return s.r = i(s.r),
            s.g = i(s.g),
            s.b = i(s.b),
            s
        }
        throw new Error("Unsupported color space conversion.")
    },
    fromWorkingColorSpace: function(s, e) {
        return this.convert(s, this.workingColorSpace, e)
    },
    toWorkingColorSpace: function(s, e) {
        return this.convert(s, e, this.workingColorSpace)
    }
}
  , _colorKeywords = {
    aliceblue: 15792383,
    antiquewhite: 16444375,
    aqua: 65535,
    aquamarine: 8388564,
    azure: 15794175,
    beige: 16119260,
    bisque: 16770244,
    black: 0,
    blanchedalmond: 16772045,
    blue: 255,
    blueviolet: 9055202,
    brown: 10824234,
    burlywood: 14596231,
    cadetblue: 6266528,
    chartreuse: 8388352,
    chocolate: 13789470,
    coral: 16744272,
    cornflowerblue: 6591981,
    cornsilk: 16775388,
    crimson: 14423100,
    cyan: 65535,
    darkblue: 139,
    darkcyan: 35723,
    darkgoldenrod: 12092939,
    darkgray: 11119017,
    darkgreen: 25600,
    darkgrey: 11119017,
    darkkhaki: 12433259,
    darkmagenta: 9109643,
    darkolivegreen: 5597999,
    darkorange: 16747520,
    darkorchid: 10040012,
    darkred: 9109504,
    darksalmon: 15308410,
    darkseagreen: 9419919,
    darkslateblue: 4734347,
    darkslategray: 3100495,
    darkslategrey: 3100495,
    darkturquoise: 52945,
    darkviolet: 9699539,
    deeppink: 16716947,
    deepskyblue: 49151,
    dimgray: 6908265,
    dimgrey: 6908265,
    dodgerblue: 2003199,
    firebrick: 11674146,
    floralwhite: 16775920,
    forestgreen: 2263842,
    fuchsia: 16711935,
    gainsboro: 14474460,
    ghostwhite: 16316671,
    gold: 16766720,
    goldenrod: 14329120,
    gray: 8421504,
    green: 32768,
    greenyellow: 11403055,
    grey: 8421504,
    honeydew: 15794160,
    hotpink: 16738740,
    indianred: 13458524,
    indigo: 4915330,
    ivory: 16777200,
    khaki: 15787660,
    lavender: 15132410,
    lavenderblush: 16773365,
    lawngreen: 8190976,
    lemonchiffon: 16775885,
    lightblue: 11393254,
    lightcoral: 15761536,
    lightcyan: 14745599,
    lightgoldenrodyellow: 16448210,
    lightgray: 13882323,
    lightgreen: 9498256,
    lightgrey: 13882323,
    lightpink: 16758465,
    lightsalmon: 16752762,
    lightseagreen: 2142890,
    lightskyblue: 8900346,
    lightslategray: 7833753,
    lightslategrey: 7833753,
    lightsteelblue: 11584734,
    lightyellow: 16777184,
    lime: 65280,
    limegreen: 3329330,
    linen: 16445670,
    magenta: 16711935,
    maroon: 8388608,
    mediumaquamarine: 6737322,
    mediumblue: 205,
    mediumorchid: 12211667,
    mediumpurple: 9662683,
    mediumseagreen: 3978097,
    mediumslateblue: 8087790,
    mediumspringgreen: 64154,
    mediumturquoise: 4772300,
    mediumvioletred: 13047173,
    midnightblue: 1644912,
    mintcream: 16121850,
    mistyrose: 16770273,
    moccasin: 16770229,
    navajowhite: 16768685,
    navy: 128,
    oldlace: 16643558,
    olive: 8421376,
    olivedrab: 7048739,
    orange: 16753920,
    orangered: 16729344,
    orchid: 14315734,
    palegoldenrod: 15657130,
    palegreen: 10025880,
    paleturquoise: 11529966,
    palevioletred: 14381203,
    papayawhip: 16773077,
    peachpuff: 16767673,
    peru: 13468991,
    pink: 16761035,
    plum: 14524637,
    powderblue: 11591910,
    purple: 8388736,
    rebeccapurple: 6697881,
    red: 16711680,
    rosybrown: 12357519,
    royalblue: 4286945,
    saddlebrown: 9127187,
    salmon: 16416882,
    sandybrown: 16032864,
    seagreen: 3050327,
    seashell: 16774638,
    sienna: 10506797,
    silver: 12632256,
    skyblue: 8900331,
    slateblue: 6970061,
    slategray: 7372944,
    slategrey: 7372944,
    snow: 16775930,
    springgreen: 65407,
    steelblue: 4620980,
    tan: 13808780,
    teal: 32896,
    thistle: 14204888,
    tomato: 16737095,
    turquoise: 4251856,
    violet: 15631086,
    wheat: 16113331,
    white: 16777215,
    whitesmoke: 16119285,
    yellow: 16776960,
    yellowgreen: 10145074
}
  , _rgb$1 = {
    r: 0,
    g: 0,
    b: 0
}
  , _hslA = {
    h: 0,
    s: 0,
    l: 0
}
  , _hslB = {
    h: 0,
    s: 0,
    l: 0
};
function hue2rgb(s, e, t) {
    return t < 0 && (t += 1),
    t > 1 && (t -= 1),
    t < 1 / 6 ? s + (e - s) * 6 * t : t < 1 / 2 ? e : t < 2 / 3 ? s + (e - s) * 6 * (2 / 3 - t) : s
}
function toComponents(s, e) {
    return e.r = s.r,
    e.g = s.g,
    e.b = s.b,
    e
}
class Color {
    constructor(e, t, i) {
        return this.isColor = !0,
        this.r = 1,
        this.g = 1,
        this.b = 1,
        t === void 0 && i === void 0 ? this.set(e) : this.setRGB(e, t, i)
    }
    set(e) {
        return e && e.isColor ? this.copy(e) : typeof e == "number" ? this.setHex(e) : typeof e == "string" && this.setStyle(e),
        this
    }
    setScalar(e) {
        return this.r = e,
        this.g = e,
        this.b = e,
        this
    }
    setHex(e, t=SRGBColorSpace) {
        return e = Math.floor(e),
        this.r = (e >> 16 & 255) / 255,
        this.g = (e >> 8 & 255) / 255,
        this.b = (e & 255) / 255,
        ColorManagement.toWorkingColorSpace(this, t),
        this
    }
    setRGB(e, t, i, n=ColorManagement.workingColorSpace) {
        return this.r = e,
        this.g = t,
        this.b = i,
        ColorManagement.toWorkingColorSpace(this, n),
        this
    }
    setHSL(e, t, i, n=ColorManagement.workingColorSpace) {
        if (e = euclideanModulo(e, 1),
        t = clamp(t, 0, 1),
        i = clamp(i, 0, 1),
        t === 0)
            this.r = this.g = this.b = i;
        else {
            const r = i <= .5 ? i * (1 + t) : i + t - i * t
              , o = 2 * i - r;
            this.r = hue2rgb(o, r, e + 1 / 3),
            this.g = hue2rgb(o, r, e),
            this.b = hue2rgb(o, r, e - 1 / 3)
        }
        return ColorManagement.toWorkingColorSpace(this, n),
        this
    }
    setStyle(e, t=SRGBColorSpace) {
        function i(r) {
            r !== void 0 && parseFloat(r) < 1 && console.warn("THREE.Color: Alpha component of " + e + " will be ignored.")
        }
        let n;
        if (n = /^((?:rgb|hsl)a?)\(([^\)]*)\)/.exec(e)) {
            let r;
            const o = n[1]
              , a = n[2];
            switch (o) {
            case "rgb":
            case "rgba":
                if (r = /^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))
                    return this.r = Math.min(255, parseInt(r[1], 10)) / 255,
                    this.g = Math.min(255, parseInt(r[2], 10)) / 255,
                    this.b = Math.min(255, parseInt(r[3], 10)) / 255,
                    ColorManagement.toWorkingColorSpace(this, t),
                    i(r[4]),
                    this;
                if (r = /^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))
                    return this.r = Math.min(100, parseInt(r[1], 10)) / 100,
                    this.g = Math.min(100, parseInt(r[2], 10)) / 100,
                    this.b = Math.min(100, parseInt(r[3], 10)) / 100,
                    ColorManagement.toWorkingColorSpace(this, t),
                    i(r[4]),
                    this;
                break;
            case "hsl":
            case "hsla":
                if (r = /^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a)) {
                    const c = parseFloat(r[1]) / 360
                      , l = parseFloat(r[2]) / 100
                      , u = parseFloat(r[3]) / 100;
                    return i(r[4]),
                    this.setHSL(c, l, u, t)
                }
                break
            }
        } else if (n = /^\#([A-Fa-f\d]+)$/.exec(e)) {
            const r = n[1]
              , o = r.length;
            if (o === 3)
                return this.r = parseInt(r.charAt(0) + r.charAt(0), 16) / 255,
                this.g = parseInt(r.charAt(1) + r.charAt(1), 16) / 255,
                this.b = parseInt(r.charAt(2) + r.charAt(2), 16) / 255,
                ColorManagement.toWorkingColorSpace(this, t),
                this;
            if (o === 6)
                return this.r = parseInt(r.charAt(0) + r.charAt(1), 16) / 255,
                this.g = parseInt(r.charAt(2) + r.charAt(3), 16) / 255,
                this.b = parseInt(r.charAt(4) + r.charAt(5), 16) / 255,
                ColorManagement.toWorkingColorSpace(this, t),
                this
        }
        return e && e.length > 0 ? this.setColorName(e, t) : this
    }
    setColorName(e, t=SRGBColorSpace) {
        const i = _colorKeywords[e.toLowerCase()];
        return i !== void 0 ? this.setHex(i, t) : console.warn("THREE.Color: Unknown color " + e),
        this
    }
    clone() {
        return new this.constructor(this.r,this.g,this.b)
    }
    copy(e) {
        return this.r = e.r,
        this.g = e.g,
        this.b = e.b,
        this
    }
    copySRGBToLinear(e) {
        return this.r = SRGBToLinear(e.r),
        this.g = SRGBToLinear(e.g),
        this.b = SRGBToLinear(e.b),
        this
    }
    copyLinearToSRGB(e) {
        return this.r = LinearToSRGB(e.r),
        this.g = LinearToSRGB(e.g),
        this.b = LinearToSRGB(e.b),
        this
    }
    convertSRGBToLinear() {
        return this.copySRGBToLinear(this),
        this
    }
    convertLinearToSRGB() {
        return this.copyLinearToSRGB(this),
        this
    }
    getHex(e=SRGBColorSpace) {
        return ColorManagement.fromWorkingColorSpace(toComponents(this, _rgb$1), e),
        clamp(_rgb$1.r * 255, 0, 255) << 16 ^ clamp(_rgb$1.g * 255, 0, 255) << 8 ^ clamp(_rgb$1.b * 255, 0, 255) << 0
    }
    getHexString(e=SRGBColorSpace) {
        return ("000000" + this.getHex(e).toString(16)).slice(-6)
    }
    getHSL(e, t=ColorManagement.workingColorSpace) {
        ColorManagement.fromWorkingColorSpace(toComponents(this, _rgb$1), t);
        const i = _rgb$1.r
          , n = _rgb$1.g
          , r = _rgb$1.b
          , o = Math.max(i, n, r)
          , a = Math.min(i, n, r);
        let c, l;
        const u = (a + o) / 2;
        if (a === o)
            c = 0,
            l = 0;
        else {
            const h = o - a;
            switch (l = u <= .5 ? h / (o + a) : h / (2 - o - a),
            o) {
            case i:
                c = (n - r) / h + (n < r ? 6 : 0);
                break;
            case n:
                c = (r - i) / h + 2;
                break;
            case r:
                c = (i - n) / h + 4;
                break
            }
            c /= 6
        }
        return e.h = c,
        e.s = l,
        e.l = u,
        e
    }
    getRGB(e, t=ColorManagement.workingColorSpace) {
        return ColorManagement.fromWorkingColorSpace(toComponents(this, _rgb$1), t),
        e.r = _rgb$1.r,
        e.g = _rgb$1.g,
        e.b = _rgb$1.b,
        e
    }
    getStyle(e=SRGBColorSpace) {
        return ColorManagement.fromWorkingColorSpace(toComponents(this, _rgb$1), e),
        e !== SRGBColorSpace ? `color(${e} ${_rgb$1.r} ${_rgb$1.g} ${_rgb$1.b})` : `rgb(${_rgb$1.r * 255 | 0},${_rgb$1.g * 255 | 0},${_rgb$1.b * 255 | 0})`
    }
    offsetHSL(e, t, i) {
        return this.getHSL(_hslA),
        _hslA.h += e,
        _hslA.s += t,
        _hslA.l += i,
        this.setHSL(_hslA.h, _hslA.s, _hslA.l),
        this
    }
    add(e) {
        return this.r += e.r,
        this.g += e.g,
        this.b += e.b,
        this
    }
    addColors(e, t) {
        return this.r = e.r + t.r,
        this.g = e.g + t.g,
        this.b = e.b + t.b,
        this
    }
    addScalar(e) {
        return this.r += e,
        this.g += e,
        this.b += e,
        this
    }
    sub(e) {
        return this.r = Math.max(0, this.r - e.r),
        this.g = Math.max(0, this.g - e.g),
        this.b = Math.max(0, this.b - e.b),
        this
    }
    multiply(e) {
        return this.r *= e.r,
        this.g *= e.g,
        this.b *= e.b,
        this
    }
    multiplyScalar(e) {
        return this.r *= e,
        this.g *= e,
        this.b *= e,
        this
    }
    lerp(e, t) {
        return this.r += (e.r - this.r) * t,
        this.g += (e.g - this.g) * t,
        this.b += (e.b - this.b) * t,
        this
    }
    lerpColors(e, t, i) {
        return this.r = e.r + (t.r - e.r) * i,
        this.g = e.g + (t.g - e.g) * i,
        this.b = e.b + (t.b - e.b) * i,
        this
    }
    lerpHSL(e, t) {
        this.getHSL(_hslA),
        e.getHSL(_hslB);
        const i = lerp(_hslA.h, _hslB.h, t)
          , n = lerp(_hslA.s, _hslB.s, t)
          , r = lerp(_hslA.l, _hslB.l, t);
        return this.setHSL(i, n, r),
        this
    }
    equals(e) {
        return e.r === this.r && e.g === this.g && e.b === this.b
    }
    fromArray(e, t=0) {
        return this.r = e[t],
        this.g = e[t + 1],
        this.b = e[t + 2],
        this
    }
    toArray(e=[], t=0) {
        return e[t] = this.r,
        e[t + 1] = this.g,
        e[t + 2] = this.b,
        e
    }
    fromBufferAttribute(e, t) {
        return this.r = e.getX(t),
        this.g = e.getY(t),
        this.b = e.getZ(t),
        this
    }
    toJSON() {
        return this.getHex()
    }
    *[Symbol.iterator]() {
        yield this.r,
        yield this.g,
        yield this.b
    }
}
Color.NAMES = _colorKeywords;
let _canvas;
class ImageUtils {
    static getDataURL(e) {
        if (/^data:/i.test(e.src) || typeof HTMLCanvasElement > "u")
            return e.src;
        let t;
        if (e instanceof HTMLCanvasElement)
            t = e;
        else {
            _canvas === void 0 && (_canvas = createElementNS("canvas")),
            _canvas.width = e.width,
            _canvas.height = e.height;
            const i = _canvas.getContext("2d");
            e instanceof ImageData ? i.putImageData(e, 0, 0) : i.drawImage(e, 0, 0, e.width, e.height),
            t = _canvas
        }
        return t.width > 2048 || t.height > 2048 ? (console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons", e),
        t.toDataURL("image/jpeg", .6)) : t.toDataURL("image/png")
    }
    static sRGBToLinear(e) {
        if (typeof HTMLImageElement < "u" && e instanceof HTMLImageElement || typeof HTMLCanvasElement < "u" && e instanceof HTMLCanvasElement || typeof ImageBitmap < "u" && e instanceof ImageBitmap) {
            const t = createElementNS("canvas");
            t.width = e.width,
            t.height = e.height;
            const i = t.getContext("2d");
            i.drawImage(e, 0, 0, e.width, e.height);
            const n = i.getImageData(0, 0, e.width, e.height)
              , r = n.data;
            for (let o = 0; o < r.length; o++)
                r[o] = SRGBToLinear(r[o] / 255) * 255;
            return i.putImageData(n, 0, 0),
            t
        } else if (e.data) {
            const t = e.data.slice(0);
            for (let i = 0; i < t.length; i++)
                t instanceof Uint8Array || t instanceof Uint8ClampedArray ? t[i] = Math.floor(SRGBToLinear(t[i] / 255) * 255) : t[i] = SRGBToLinear(t[i]);
            return {
                data: t,
                width: e.width,
                height: e.height
            }
        } else
            return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),
            e
    }
}
class Source {
    constructor(e=null) {
        this.isSource = !0,
        this.uuid = generateUUID(),
        this.data = e,
        this.version = 0
    }
    set needsUpdate(e) {
        e === !0 && this.version++
    }
    toJSON(e) {
        const t = e === void 0 || typeof e == "string";
        if (!t && e.images[this.uuid] !== void 0)
            return e.images[this.uuid];
        const i = {
            uuid: this.uuid,
            url: ""
        }
          , n = this.data;
        if (n !== null) {
            let r;
            if (Array.isArray(n)) {
                r = [];
                for (let o = 0, a = n.length; o < a; o++)
                    n[o].isDataTexture ? r.push(serializeImage(n[o].image)) : r.push(serializeImage(n[o]))
            } else
                r = serializeImage(n);
            i.url = r
        }
        return t || (e.images[this.uuid] = i),
        i
    }
}
function serializeImage(s) {
    return typeof HTMLImageElement < "u" && s instanceof HTMLImageElement || typeof HTMLCanvasElement < "u" && s instanceof HTMLCanvasElement || typeof ImageBitmap < "u" && s instanceof ImageBitmap ? ImageUtils.getDataURL(s) : s.data ? {
        data: Array.from(s.data),
        width: s.width,
        height: s.height,
        type: s.data.constructor.name
    } : (console.warn("THREE.Texture: Unable to serialize Texture."),
    {})
}
let textureId = 0;
class Texture extends EventDispatcher {
    constructor(e=Texture.DEFAULT_IMAGE, t=Texture.DEFAULT_MAPPING, i=ClampToEdgeWrapping, n=ClampToEdgeWrapping, r=LinearFilter, o=LinearMipmapLinearFilter, a=RGBAFormat, c=UnsignedByteType, l=Texture.DEFAULT_ANISOTROPY, u=LinearEncoding) {
        super(),
        this.isTexture = !0,
        Object.defineProperty(this, "id", {
            value: textureId++
        }),
        this.uuid = generateUUID(),
        this.name = "",
        this.source = new Source(e),
        this.mipmaps = [],
        this.mapping = t,
        this.wrapS = i,
        this.wrapT = n,
        this.magFilter = r,
        this.minFilter = o,
        this.anisotropy = l,
        this.format = a,
        this.internalFormat = null,
        this.type = c,
        this.offset = new Vector2(0,0),
        this.repeat = new Vector2(1,1),
        this.center = new Vector2(0,0),
        this.rotation = 0,
        this.matrixAutoUpdate = !0,
        this.matrix = new Matrix3,
        this.generateMipmaps = !0,
        this.premultiplyAlpha = !1,
        this.flipY = !0,
        this.unpackAlignment = 4,
        this.encoding = u,
        this.userData = {},
        this.version = 0,
        this.onUpdate = null,
        this.isRenderTargetTexture = !1,
        this.needsPMREMUpdate = !1
    }
    get image() {
        return this.source.data
    }
    set image(e) {
        this.source.data = e
    }
    updateMatrix() {
        this.matrix.setUvTransform(this.offset.x, this.offset.y, this.repeat.x, this.repeat.y, this.rotation, this.center.x, this.center.y)
    }
    clone() {
        return new this.constructor().copy(this)
    }
    copy(e) {
        return this.name = e.name,
        this.source = e.source,
        this.mipmaps = e.mipmaps.slice(0),
        this.mapping = e.mapping,
        this.wrapS = e.wrapS,
        this.wrapT = e.wrapT,
        this.magFilter = e.magFilter,
        this.minFilter = e.minFilter,
        this.anisotropy = e.anisotropy,
        this.format = e.format,
        this.internalFormat = e.internalFormat,
        this.type = e.type,
        this.offset.copy(e.offset),
        this.repeat.copy(e.repeat),
        this.center.copy(e.center),
        this.rotation = e.rotation,
        this.matrixAutoUpdate = e.matrixAutoUpdate,
        this.matrix.copy(e.matrix),
        this.generateMipmaps = e.generateMipmaps,
        this.premultiplyAlpha = e.premultiplyAlpha,
        this.flipY = e.flipY,
        this.unpackAlignment = e.unpackAlignment,
        this.encoding = e.encoding,
        this.userData = JSON.parse(JSON.stringify(e.userData)),
        this.needsUpdate = !0,
        this
    }
    toJSON(e) {
        const t = e === void 0 || typeof e == "string";
        if (!t && e.textures[this.uuid] !== void 0)
            return e.textures[this.uuid];
        const i = {
            metadata: {
                version: 4.5,
                type: "Texture",
                generator: "Texture.toJSON"
            },
            uuid: this.uuid,
            name: this.name,
            image: this.source.toJSON(e).uuid,
            mapping: this.mapping,
            repeat: [this.repeat.x, this.repeat.y],
            offset: [this.offset.x, this.offset.y],
            center: [this.center.x, this.center.y],
            rotation: this.rotation,
            wrap: [this.wrapS, this.wrapT],
            format: this.format,
            type: this.type,
            encoding: this.encoding,
            minFilter: this.minFilter,
            magFilter: this.magFilter,
            anisotropy: this.anisotropy,
            flipY: this.flipY,
            generateMipmaps: this.generateMipmaps,
            premultiplyAlpha: this.premultiplyAlpha,
            unpackAlignment: this.unpackAlignment
        };
        return Object.keys(this.userData).length > 0 && (i.userData = this.userData),
        t || (e.textures[this.uuid] = i),
        i
    }
    dispose() {
        this.dispatchEvent({
            type: "dispose"
        })
    }
    transformUv(e) {
        if (this.mapping !== UVMapping)
            return e;
        if (e.applyMatrix3(this.matrix),
        e.x < 0 || e.x > 1)
            switch (this.wrapS) {
            case RepeatWrapping:
                e.x = e.x - Math.floor(e.x);
                break;
            case ClampToEdgeWrapping:
                e.x = e.x < 0 ? 0 : 1;
                break;
            case MirroredRepeatWrapping:
                Math.abs(Math.floor(e.x) % 2) === 1 ? e.x = Math.ceil(e.x) - e.x : e.x = e.x - Math.floor(e.x);
                break
            }
        if (e.y < 0 || e.y > 1)
            switch (this.wrapT) {
            case RepeatWrapping:
                e.y = e.y - Math.floor(e.y);
                break;
            case ClampToEdgeWrapping:
                e.y = e.y < 0 ? 0 : 1;
                break;
            case MirroredRepeatWrapping:
                Math.abs(Math.floor(e.y) % 2) === 1 ? e.y = Math.ceil(e.y) - e.y : e.y = e.y - Math.floor(e.y);
                break
            }
        return this.flipY && (e.y = 1 - e.y),
        e
    }
    set needsUpdate(e) {
        e === !0 && (this.version++,
        this.source.needsUpdate = !0)
    }
}
Texture.DEFAULT_IMAGE = null;
Texture.DEFAULT_MAPPING = UVMapping;
Texture.DEFAULT_ANISOTROPY = 1;
class Vector4 {
    constructor(e=0, t=0, i=0, n=1) {
        Vector4.prototype.isVector4 = !0,
        this.x = e,
        this.y = t,
        this.z = i,
        this.w = n
    }
    get width() {
        return this.z
    }
    set width(e) {
        this.z = e
    }
    get height() {
        return this.w
    }
    set height(e) {
        this.w = e
    }
    set(e, t, i, n) {
        return this.x = e,
        this.y = t,
        this.z = i,
        this.w = n,
        this
    }
    setScalar(e) {
        return this.x = e,
        this.y = e,
        this.z = e,
        this.w = e,
        this
    }
    setX(e) {
        return this.x = e,
        this
    }
    setY(e) {
        return this.y = e,
        this
    }
    setZ(e) {
        return this.z = e,
        this
    }
    setW(e) {
        return this.w = e,
        this
    }
    setComponent(e, t) {
        switch (e) {
        case 0:
            this.x = t;
            break;
        case 1:
            this.y = t;
            break;
        case 2:
            this.z = t;
            break;
        case 3:
            this.w = t;
            break;
        default:
            throw new Error("index is out of range: " + e)
        }
        return this
    }
    getComponent(e) {
        switch (e) {
        case 0:
            return this.x;
        case 1:
            return this.y;
        case 2:
            return this.z;
        case 3:
            return this.w;
        default:
            throw new Error("index is out of range: " + e)
        }
    }
    clone() {
        return new this.constructor(this.x,this.y,this.z,this.w)
    }
    copy(e) {
        return this.x = e.x,
        this.y = e.y,
        this.z = e.z,
        this.w = e.w !== void 0 ? e.w : 1,
        this
    }
    add(e) {
        return this.x += e.x,
        this.y += e.y,
        this.z += e.z,
        this.w += e.w,
        this
    }
    addScalar(e) {
        return this.x += e,
        this.y += e,
        this.z += e,
        this.w += e,
        this
    }
    addVectors(e, t) {
        return this.x = e.x + t.x,
        this.y = e.y + t.y,
        this.z = e.z + t.z,
        this.w = e.w + t.w,
        this
    }
    addScaledVector(e, t) {
        return this.x += e.x * t,
        this.y += e.y * t,
        this.z += e.z * t,
        this.w += e.w * t,
        this
    }
    sub(e) {
        return this.x -= e.x,
        this.y -= e.y,
        this.z -= e.z,
        this.w -= e.w,
        this
    }
    subScalar(e) {
        return this.x -= e,
        this.y -= e,
        this.z -= e,
        this.w -= e,
        this
    }
    subVectors(e, t) {
        return this.x = e.x - t.x,
        this.y = e.y - t.y,
        this.z = e.z - t.z,
        this.w = e.w - t.w,
        this
    }
    multiply(e) {
        return this.x *= e.x,
        this.y *= e.y,
        this.z *= e.z,
        this.w *= e.w,
        this
    }
    multiplyScalar(e) {
        return this.x *= e,
        this.y *= e,
        this.z *= e,
        this.w *= e,
        this
    }
    applyMatrix4(e) {
        const t = this.x
          , i = this.y
          , n = this.z
          , r = this.w
          , o = e.elements;
        return this.x = o[0] * t + o[4] * i + o[8] * n + o[12] * r,
        this.y = o[1] * t + o[5] * i + o[9] * n + o[13] * r,
        this.z = o[2] * t + o[6] * i + o[10] * n + o[14] * r,
        this.w = o[3] * t + o[7] * i + o[11] * n + o[15] * r,
        this
    }
    divideScalar(e) {
        return this.multiplyScalar(1 / e)
    }
    setAxisAngleFromQuaternion(e) {
        this.w = 2 * Math.acos(e.w);
        const t = Math.sqrt(1 - e.w * e.w);
        return t < 1e-4 ? (this.x = 1,
        this.y = 0,
        this.z = 0) : (this.x = e.x / t,
        this.y = e.y / t,
        this.z = e.z / t),
        this
    }
    setAxisAngleFromRotationMatrix(e) {
        let t, i, n, r;
        const c = e.elements
          , l = c[0]
          , u = c[4]
          , h = c[8]
          , d = c[1]
          , m = c[5]
          , g = c[9]
          , p = c[2]
          , f = c[6]
          , x = c[10];
        if (Math.abs(u - d) < .01 && Math.abs(h - p) < .01 && Math.abs(g - f) < .01) {
            if (Math.abs(u + d) < .1 && Math.abs(h + p) < .1 && Math.abs(g + f) < .1 && Math.abs(l + m + x - 3) < .1)
                return this.set(1, 0, 0, 0),
                this;
            t = Math.PI;
            const v = (l + 1) / 2
              , M = (m + 1) / 2
              , y = (x + 1) / 2
              , A = (u + d) / 4
              , P = (h + p) / 4
              , _ = (g + f) / 4;
            return v > M && v > y ? v < .01 ? (i = 0,
            n = .707106781,
            r = .707106781) : (i = Math.sqrt(v),
            n = A / i,
            r = P / i) : M > y ? M < .01 ? (i = .707106781,
            n = 0,
            r = .707106781) : (n = Math.sqrt(M),
            i = A / n,
            r = _ / n) : y < .01 ? (i = .707106781,
            n = .707106781,
            r = 0) : (r = Math.sqrt(y),
            i = P / r,
            n = _ / r),
            this.set(i, n, r, t),
            this
        }
        let S = Math.sqrt((f - g) * (f - g) + (h - p) * (h - p) + (d - u) * (d - u));
        return Math.abs(S) < .001 && (S = 1),
        this.x = (f - g) / S,
        this.y = (h - p) / S,
        this.z = (d - u) / S,
        this.w = Math.acos((l + m + x - 1) / 2),
        this
    }
    min(e) {
        return this.x = Math.min(this.x, e.x),
        this.y = Math.min(this.y, e.y),
        this.z = Math.min(this.z, e.z),
        this.w = Math.min(this.w, e.w),
        this
    }
    max(e) {
        return this.x = Math.max(this.x, e.x),
        this.y = Math.max(this.y, e.y),
        this.z = Math.max(this.z, e.z),
        this.w = Math.max(this.w, e.w),
        this
    }
    clamp(e, t) {
        return this.x = Math.max(e.x, Math.min(t.x, this.x)),
        this.y = Math.max(e.y, Math.min(t.y, this.y)),
        this.z = Math.max(e.z, Math.min(t.z, this.z)),
        this.w = Math.max(e.w, Math.min(t.w, this.w)),
        this
    }
    clampScalar(e, t) {
        return this.x = Math.max(e, Math.min(t, this.x)),
        this.y = Math.max(e, Math.min(t, this.y)),
        this.z = Math.max(e, Math.min(t, this.z)),
        this.w = Math.max(e, Math.min(t, this.w)),
        this
    }
    clampLength(e, t) {
        const i = this.length();
        return this.divideScalar(i || 1).multiplyScalar(Math.max(e, Math.min(t, i)))
    }
    floor() {
        return this.x = Math.floor(this.x),
        this.y = Math.floor(this.y),
        this.z = Math.floor(this.z),
        this.w = Math.floor(this.w),
        this
    }
    ceil() {
        return this.x = Math.ceil(this.x),
        this.y = Math.ceil(this.y),
        this.z = Math.ceil(this.z),
        this.w = Math.ceil(this.w),
        this
    }
    round() {
        return this.x = Math.round(this.x),
        this.y = Math.round(this.y),
        this.z = Math.round(this.z),
        this.w = Math.round(this.w),
        this
    }
    roundToZero() {
        return this.x = this.x < 0 ? Math.ceil(this.x) : Math.floor(this.x),
        this.y = this.y < 0 ? Math.ceil(this.y) : Math.floor(this.y),
        this.z = this.z < 0 ? Math.ceil(this.z) : Math.floor(this.z),
        this.w = this.w < 0 ? Math.ceil(this.w) : Math.floor(this.w),
        this
    }
    negate() {
        return this.x = -this.x,
        this.y = -this.y,
        this.z = -this.z,
        this.w = -this.w,
        this
    }
    dot(e) {
        return this.x * e.x + this.y * e.y + this.z * e.z + this.w * e.w
    }
    lengthSq() {
        return this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w
    }
    length() {
        return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w)
    }
    manhattanLength() {
        return Math.abs(this.x) + Math.abs(this.y) + Math.abs(this.z) + Math.abs(this.w)
    }
    normalize() {
        return this.divideScalar(this.length() || 1)
    }
    setLength(e) {
        return this.normalize().multiplyScalar(e)
    }
    lerp(e, t) {
        return this.x += (e.x - this.x) * t,
        this.y += (e.y - this.y) * t,
        this.z += (e.z - this.z) * t,
        this.w += (e.w - this.w) * t,
        this
    }
    lerpVectors(e, t, i) {
        return this.x = e.x + (t.x - e.x) * i,
        this.y = e.y + (t.y - e.y) * i,
        this.z = e.z + (t.z - e.z) * i,
        this.w = e.w + (t.w - e.w) * i,
        this
    }
    equals(e) {
        return e.x === this.x && e.y === this.y && e.z === this.z && e.w === this.w
    }
    fromArray(e, t=0) {
        return this.x = e[t],
        this.y = e[t + 1],
        this.z = e[t + 2],
        this.w = e[t + 3],
        this
    }
    toArray(e=[], t=0) {
        return e[t] = this.x,
        e[t + 1] = this.y,
        e[t + 2] = this.z,
        e[t + 3] = this.w,
        e
    }
    fromBufferAttribute(e, t) {
        return this.x = e.getX(t),
        this.y = e.getY(t),
        this.z = e.getZ(t),
        this.w = e.getW(t),
        this
    }
    random() {
        return this.x = Math.random(),
        this.y = Math.random(),
        this.z = Math.random(),
        this.w = Math.random(),
        this
    }
    *[Symbol.iterator]() {
        yield this.x,
        yield this.y,
        yield this.z,
        yield this.w
    }
}
class WebGLRenderTarget extends EventDispatcher {
    constructor(e=1, t=1, i={}) {
        super(),
        this.isWebGLRenderTarget = !0,
        this.width = e,
        this.height = t,
        this.depth = 1,
        this.scissor = new Vector4(0,0,e,t),
        this.scissorTest = !1,
        this.viewport = new Vector4(0,0,e,t);
        const n = {
            width: e,
            height: t,
            depth: 1
        };
        this.texture = new Texture(n,i.mapping,i.wrapS,i.wrapT,i.magFilter,i.minFilter,i.format,i.type,i.anisotropy,i.encoding),
        this.texture.isRenderTargetTexture = !0,
        this.texture.flipY = !1,
        this.texture.generateMipmaps = i.generateMipmaps !== void 0 ? i.generateMipmaps : !1,
        this.texture.internalFormat = i.internalFormat !== void 0 ? i.internalFormat : null,
        this.texture.minFilter = i.minFilter !== void 0 ? i.minFilter : LinearFilter,
        this.depthBuffer = i.depthBuffer !== void 0 ? i.depthBuffer : !0,
        this.stencilBuffer = i.stencilBuffer !== void 0 ? i.stencilBuffer : !1,
        this.depthTexture = i.depthTexture !== void 0 ? i.depthTexture : null,
        this.samples = i.samples !== void 0 ? i.samples : 0
    }
    setSize(e, t, i=1) {
        (this.width !== e || this.height !== t || this.depth !== i) && (this.width = e,
        this.height = t,
        this.depth = i,
        this.texture.image.width = e,
        this.texture.image.height = t,
        this.texture.image.depth = i,
        this.dispose()),
        this.viewport.set(0, 0, e, t),
        this.scissor.set(0, 0, e, t)
    }
    clone() {
        return new this.constructor().copy(this)
    }
    copy(e) {
        this.width = e.width,
        this.height = e.height,
        this.depth = e.depth,
        this.viewport.copy(e.viewport),
        this.texture = e.texture.clone(),
        this.texture.isRenderTargetTexture = !0;
        const t = Object.assign({}, e.texture.image);
        return this.texture.source = new Source(t),
        this.depthBuffer = e.depthBuffer,
        this.stencilBuffer = e.stencilBuffer,
        e.depthTexture !== null && (this.depthTexture = e.depthTexture.clone()),
        this.samples = e.samples,
        this
    }
    dispose() {
        this.dispatchEvent({
            type: "dispose"
        })
    }
}
class DataArrayTexture extends Texture {
    constructor(e=null, t=1, i=1, n=1) {
        super(null),
        this.isDataArrayTexture = !0,
        this.image = {
            data: e,
            width: t,
            height: i,
            depth: n
        },
        this.magFilter = NearestFilter,
        this.minFilter = NearestFilter,
        this.wrapR = ClampToEdgeWrapping,
        this.generateMipmaps = !1,
        this.flipY = !1,
        this.unpackAlignment = 1
    }
}
class Data3DTexture extends Texture {
    constructor(e=null, t=1, i=1, n=1) {
        super(null),
        this.isData3DTexture = !0,
        this.image = {
            data: e,
            width: t,
            height: i,
            depth: n
        },
        this.magFilter = NearestFilter,
        this.minFilter = NearestFilter,
        this.wrapR = ClampToEdgeWrapping,
        this.generateMipmaps = !1,
        this.flipY = !1,
        this.unpackAlignment = 1
    }
}
class Quaternion {
    constructor(e=0, t=0, i=0, n=1) {
        this.isQuaternion = !0,
        this._x = e,
        this._y = t,
        this._z = i,
        this._w = n
    }
    static slerpFlat(e, t, i, n, r, o, a) {
        let c = i[n + 0]
          , l = i[n + 1]
          , u = i[n + 2]
          , h = i[n + 3];
        const d = r[o + 0]
          , m = r[o + 1]
          , g = r[o + 2]
          , p = r[o + 3];
        if (a === 0) {
            e[t + 0] = c,
            e[t + 1] = l,
            e[t + 2] = u,
            e[t + 3] = h;
            return
        }
        if (a === 1) {
            e[t + 0] = d,
            e[t + 1] = m,
            e[t + 2] = g,
            e[t + 3] = p;
            return
        }
        if (h !== p || c !== d || l !== m || u !== g) {
            let f = 1 - a;
            const x = c * d + l * m + u * g + h * p
              , S = x >= 0 ? 1 : -1
              , v = 1 - x * x;
            if (v > Number.EPSILON) {
                const y = Math.sqrt(v)
                  , A = Math.atan2(y, x * S);
                f = Math.sin(f * A) / y,
                a = Math.sin(a * A) / y
            }
            const M = a * S;
            if (c = c * f + d * M,
            l = l * f + m * M,
            u = u * f + g * M,
            h = h * f + p * M,
            f === 1 - a) {
                const y = 1 / Math.sqrt(c * c + l * l + u * u + h * h);
                c *= y,
                l *= y,
                u *= y,
                h *= y
            }
        }
        e[t] = c,
        e[t + 1] = l,
        e[t + 2] = u,
        e[t + 3] = h
    }
    static multiplyQuaternionsFlat(e, t, i, n, r, o) {
        const a = i[n]
          , c = i[n + 1]
          , l = i[n + 2]
          , u = i[n + 3]
          , h = r[o]
          , d = r[o + 1]
          , m = r[o + 2]
          , g = r[o + 3];
        return e[t] = a * g + u * h + c * m - l * d,
        e[t + 1] = c * g + u * d + l * h - a * m,
        e[t + 2] = l * g + u * m + a * d - c * h,
        e[t + 3] = u * g - a * h - c * d - l * m,
        e
    }
    get x() {
        return this._x
    }
    set x(e) {
        this._x = e,
        this._onChangeCallback()
    }
    get y() {
        return this._y
    }
    set y(e) {
        this._y = e,
        this._onChangeCallback()
    }
    get z() {
        return this._z
    }
    set z(e) {
        this._z = e,
        this._onChangeCallback()
    }
    get w() {
        return this._w
    }
    set w(e) {
        this._w = e,
        this._onChangeCallback()
    }
    set(e, t, i, n) {
        return this._x = e,
        this._y = t,
        this._z = i,
        this._w = n,
        this._onChangeCallback(),
        this
    }
    clone() {
        return new this.constructor(this._x,this._y,this._z,this._w)
    }
    copy(e) {
        return this._x = e.x,
        this._y = e.y,
        this._z = e.z,
        this._w = e.w,
        this._onChangeCallback(),
        this
    }
    setFromEuler(e, t) {
        const i = e._x
          , n = e._y
          , r = e._z
          , o = e._order
          , a = Math.cos
          , c = Math.sin
          , l = a(i / 2)
          , u = a(n / 2)
          , h = a(r / 2)
          , d = c(i / 2)
          , m = c(n / 2)
          , g = c(r / 2);
        switch (o) {
        case "XYZ":
            this._x = d * u * h + l * m * g,
            this._y = l * m * h - d * u * g,
            this._z = l * u * g + d * m * h,
            this._w = l * u * h - d * m * g;
            break;
        case "YXZ":
            this._x = d * u * h + l * m * g,
            this._y = l * m * h - d * u * g,
            this._z = l * u * g - d * m * h,
            this._w = l * u * h + d * m * g;
            break;
        case "ZXY":
            this._x = d * u * h - l * m * g,
            this._y = l * m * h + d * u * g,
            this._z = l * u * g + d * m * h,
            this._w = l * u * h - d * m * g;
            break;
        case "ZYX":
            this._x = d * u * h - l * m * g,
            this._y = l * m * h + d * u * g,
            this._z = l * u * g - d * m * h,
            this._w = l * u * h + d * m * g;
            break;
        case "YZX":
            this._x = d * u * h + l * m * g,
            this._y = l * m * h + d * u * g,
            this._z = l * u * g - d * m * h,
            this._w = l * u * h - d * m * g;
            break;
        case "XZY":
            this._x = d * u * h - l * m * g,
            this._y = l * m * h - d * u * g,
            this._z = l * u * g + d * m * h,
            this._w = l * u * h + d * m * g;
            break;
        default:
            console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: " + o)
        }
        return t !== !1 && this._onChangeCallback(),
        this
    }
    setFromAxisAngle(e, t) {
        const i = t / 2
          , n = Math.sin(i);
        return this._x = e.x * n,
        this._y = e.y * n,
        this._z = e.z * n,
        this._w = Math.cos(i),
        this._onChangeCallback(),
        this
    }
    setFromRotationMatrix(e) {
        const t = e.elements
          , i = t[0]
          , n = t[4]
          , r = t[8]
          , o = t[1]
          , a = t[5]
          , c = t[9]
          , l = t[2]
          , u = t[6]
          , h = t[10]
          , d = i + a + h;
        if (d > 0) {
            const m = .5 / Math.sqrt(d + 1);
            this._w = .25 / m,
            this._x = (u - c) * m,
            this._y = (r - l) * m,
            this._z = (o - n) * m
        } else if (i > a && i > h) {
            const m = 2 * Math.sqrt(1 + i - a - h);
            this._w = (u - c) / m,
            this._x = .25 * m,
            this._y = (n + o) / m,
            this._z = (r + l) / m
        } else if (a > h) {
            const m = 2 * Math.sqrt(1 + a - i - h);
            this._w = (r - l) / m,
            this._x = (n + o) / m,
            this._y = .25 * m,
            this._z = (c + u) / m
        } else {
            const m = 2 * Math.sqrt(1 + h - i - a);
            this._w = (o - n) / m,
            this._x = (r + l) / m,
            this._y = (c + u) / m,
            this._z = .25 * m
        }
        return this._onChangeCallback(),
        this
    }
    setFromUnitVectors(e, t) {
        let i = e.dot(t) + 1;
        return i < Number.EPSILON ? (i = 0,
        Math.abs(e.x) > Math.abs(e.z) ? (this._x = -e.y,
        this._y = e.x,
        this._z = 0,
        this._w = i) : (this._x = 0,
        this._y = -e.z,
        this._z = e.y,
        this._w = i)) : (this._x = e.y * t.z - e.z * t.y,
        this._y = e.z * t.x - e.x * t.z,
        this._z = e.x * t.y - e.y * t.x,
        this._w = i),
        this.normalize()
    }
    angleTo(e) {
        return 2 * Math.acos(Math.abs(clamp(this.dot(e), -1, 1)))
    }
    rotateTowards(e, t) {
        const i = this.angleTo(e);
        if (i === 0)
            return this;
        const n = Math.min(1, t / i);
        return this.slerp(e, n),
        this
    }
    identity() {
        return this.set(0, 0, 0, 1)
    }
    invert() {
        return this.conjugate()
    }
    conjugate() {
        return this._x *= -1,
        this._y *= -1,
        this._z *= -1,
        this._onChangeCallback(),
        this
    }
    dot(e) {
        return this._x * e._x + this._y * e._y + this._z * e._z + this._w * e._w
    }
    lengthSq() {
        return this._x * this._x + this._y * this._y + this._z * this._z + this._w * this._w
    }
    length() {
        return Math.sqrt(this._x * this._x + this._y * this._y + this._z * this._z + this._w * this._w)
    }
    normalize() {
        let e = this.length();
        return e === 0 ? (this._x = 0,
        this._y = 0,
        this._z = 0,
        this._w = 1) : (e = 1 / e,
        this._x = this._x * e,
        this._y = this._y * e,
        this._z = this._z * e,
        this._w = this._w * e),
        this._onChangeCallback(),
        this
    }
    multiply(e) {
        return this.multiplyQuaternions(this, e)
    }
    premultiply(e) {
        return this.multiplyQuaternions(e, this)
    }
    multiplyQuaternions(e, t) {
        const i = e._x
          , n = e._y
          , r = e._z
          , o = e._w
          , a = t._x
          , c = t._y
          , l = t._z
          , u = t._w;
        return this._x = i * u + o * a + n * l - r * c,
        this._y = n * u + o * c + r * a - i * l,
        this._z = r * u + o * l + i * c - n * a,
        this._w = o * u - i * a - n * c - r * l,
        this._onChangeCallback(),
        this
    }
    slerp(e, t) {
        if (t === 0)
            return this;
        if (t === 1)
            return this.copy(e);
        const i = this._x
          , n = this._y
          , r = this._z
          , o = this._w;
        let a = o * e._w + i * e._x + n * e._y + r * e._z;
        if (a < 0 ? (this._w = -e._w,
        this._x = -e._x,
        this._y = -e._y,
        this._z = -e._z,
        a = -a) : this.copy(e),
        a >= 1)
            return this._w = o,
            this._x = i,
            this._y = n,
            this._z = r,
            this;
        const c = 1 - a * a;
        if (c <= Number.EPSILON) {
            const m = 1 - t;
            return this._w = m * o + t * this._w,
            this._x = m * i + t * this._x,
            this._y = m * n + t * this._y,
            this._z = m * r + t * this._z,
            this.normalize(),
            this._onChangeCallback(),
            this
        }
        const l = Math.sqrt(c)
          , u = Math.atan2(l, a)
          , h = Math.sin((1 - t) * u) / l
          , d = Math.sin(t * u) / l;
        return this._w = o * h + this._w * d,
        this._x = i * h + this._x * d,
        this._y = n * h + this._y * d,
        this._z = r * h + this._z * d,
        this._onChangeCallback(),
        this
    }
    slerpQuaternions(e, t, i) {
        return this.copy(e).slerp(t, i)
    }
    random() {
        const e = Math.random()
          , t = Math.sqrt(1 - e)
          , i = Math.sqrt(e)
          , n = 2 * Math.PI * Math.random()
          , r = 2 * Math.PI * Math.random();
        return this.set(t * Math.cos(n), i * Math.sin(r), i * Math.cos(r), t * Math.sin(n))
    }
    equals(e) {
        return e._x === this._x && e._y === this._y && e._z === this._z && e._w === this._w
    }
    fromArray(e, t=0) {
        return this._x = e[t],
        this._y = e[t + 1],
        this._z = e[t + 2],
        this._w = e[t + 3],
        this._onChangeCallback(),
        this
    }
    toArray(e=[], t=0) {
        return e[t] = this._x,
        e[t + 1] = this._y,
        e[t + 2] = this._z,
        e[t + 3] = this._w,
        e
    }
    fromBufferAttribute(e, t) {
        return this._x = e.getX(t),
        this._y = e.getY(t),
        this._z = e.getZ(t),
        this._w = e.getW(t),
        this
    }
    _onChange(e) {
        return this._onChangeCallback = e,
        this
    }
    _onChangeCallback() {}
    *[Symbol.iterator]() {
        yield this._x,
        yield this._y,
        yield this._z,
        yield this._w
    }
}
class Vector3 {
    constructor(e=0, t=0, i=0) {
        Vector3.prototype.isVector3 = !0,
        this.x = e,
        this.y = t,
        this.z = i
    }
    set(e, t, i) {
        return i === void 0 && (i = this.z),
        this.x = e,
        this.y = t,
        this.z = i,
        this
    }
    setScalar(e) {
        return this.x = e,
        this.y = e,
        this.z = e,
        this
    }
    setX(e) {
        return this.x = e,
        this
    }
    setY(e) {
        return this.y = e,
        this
    }
    setZ(e) {
        return this.z = e,
        this
    }
    setComponent(e, t) {
        switch (e) {
        case 0:
            this.x = t;
            break;
        case 1:
            this.y = t;
            break;
        case 2:
            this.z = t;
            break;
        default:
            throw new Error("index is out of range: " + e)
        }
        return this
    }
    getComponent(e) {
        switch (e) {
        case 0:
            return this.x;
        case 1:
            return this.y;
        case 2:
            return this.z;
        default:
            throw new Error("index is out of range: " + e)
        }
    }
    clone() {
        return new this.constructor(this.x,this.y,this.z)
    }
    copy(e) {
        return this.x = e.x,
        this.y = e.y,
        this.z = e.z,
        this
    }
    add(e) {
        return this.x += e.x,
        this.y += e.y,
        this.z += e.z,
        this
    }
    addScalar(e) {
        return this.x += e,
        this.y += e,
        this.z += e,
        this
    }
    addVectors(e, t) {
        return this.x = e.x + t.x,
        this.y = e.y + t.y,
        this.z = e.z + t.z,
        this
    }
    addScaledVector(e, t) {
        return this.x += e.x * t,
        this.y += e.y * t,
        this.z += e.z * t,
        this
    }
    sub(e) {
        return this.x -= e.x,
        this.y -= e.y,
        this.z -= e.z,
        this
    }
    subScalar(e) {
        return this.x -= e,
        this.y -= e,
        this.z -= e,
        this
    }
    subVectors(e, t) {
        return this.x = e.x - t.x,
        this.y = e.y - t.y,
        this.z = e.z - t.z,
        this
    }
    multiply(e) {
        return this.x *= e.x,
        this.y *= e.y,
        this.z *= e.z,
        this
    }
    multiplyScalar(e) {
        return this.x *= e,
        this.y *= e,
        this.z *= e,
        this
    }
    multiplyVectors(e, t) {
        return this.x = e.x * t.x,
        this.y = e.y * t.y,
        this.z = e.z * t.z,
        this
    }
    applyEuler(e) {
        return this.applyQuaternion(_quaternion$4.setFromEuler(e))
    }
    applyAxisAngle(e, t) {
        return this.applyQuaternion(_quaternion$4.setFromAxisAngle(e, t))
    }
    applyMatrix3(e) {
        const t = this.x
          , i = this.y
          , n = this.z
          , r = e.elements;
        return this.x = r[0] * t + r[3] * i + r[6] * n,
        this.y = r[1] * t + r[4] * i + r[7] * n,
        this.z = r[2] * t + r[5] * i + r[8] * n,
        this
    }
    applyNormalMatrix(e) {
        return this.applyMatrix3(e).normalize()
    }
    applyMatrix4(e) {
        const t = this.x
          , i = this.y
          , n = this.z
          , r = e.elements
          , o = 1 / (r[3] * t + r[7] * i + r[11] * n + r[15]);
        return this.x = (r[0] * t + r[4] * i + r[8] * n + r[12]) * o,
        this.y = (r[1] * t + r[5] * i + r[9] * n + r[13]) * o,
        this.z = (r[2] * t + r[6] * i + r[10] * n + r[14]) * o,
        this
    }
    applyQuaternion(e) {
        const t = this.x
          , i = this.y
          , n = this.z
          , r = e.x
          , o = e.y
          , a = e.z
          , c = e.w
          , l = c * t + o * n - a * i
          , u = c * i + a * t - r * n
          , h = c * n + r * i - o * t
          , d = -r * t - o * i - a * n;
        return this.x = l * c + d * -r + u * -a - h * -o,
        this.y = u * c + d * -o + h * -r - l * -a,
        this.z = h * c + d * -a + l * -o - u * -r,
        this
    }
    project(e) {
        return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)
    }
    unproject(e) {
        return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)
    }
    transformDirection(e) {
        const t = this.x
          , i = this.y
          , n = this.z
          , r = e.elements;
        return this.x = r[0] * t + r[4] * i + r[8] * n,
        this.y = r[1] * t + r[5] * i + r[9] * n,
        this.z = r[2] * t + r[6] * i + r[10] * n,
        this.normalize()
    }
    divide(e) {
        return this.x /= e.x,
        this.y /= e.y,
        this.z /= e.z,
        this
    }
    divideScalar(e) {
        return this.multiplyScalar(1 / e)
    }
    min(e) {
        return this.x = Math.min(this.x, e.x),
        this.y = Math.min(this.y, e.y),
        this.z = Math.min(this.z, e.z),
        this
    }
    max(e) {
        return this.x = Math.max(this.x, e.x),
        this.y = Math.max(this.y, e.y),
        this.z = Math.max(this.z, e.z),
        this
    }
    clamp(e, t) {
        return this.x = Math.max(e.x, Math.min(t.x, this.x)),
        this.y = Math.max(e.y, Math.min(t.y, this.y)),
        this.z = Math.max(e.z, Math.min(t.z, this.z)),
        this
    }
    clampScalar(e, t) {
        return this.x = Math.max(e, Math.min(t, this.x)),
        this.y = Math.max(e, Math.min(t, this.y)),
        this.z = Math.max(e, Math.min(t, this.z)),
        this
    }
    clampLength(e, t) {
        const i = this.length();
        return this.divideScalar(i || 1).multiplyScalar(Math.max(e, Math.min(t, i)))
    }
    floor() {
        return this.x = Math.floor(this.x),
        this.y = Math.floor(this.y),
        this.z = Math.floor(this.z),
        this
    }
    ceil() {
        return this.x = Math.ceil(this.x),
        this.y = Math.ceil(this.y),
        this.z = Math.ceil(this.z),
        this
    }
    round() {
        return this.x = Math.round(this.x),
        this.y = Math.round(this.y),
        this.z = Math.round(this.z),
        this
    }
    roundToZero() {
        return this.x = this.x < 0 ? Math.ceil(this.x) : Math.floor(this.x),
        this.y = this.y < 0 ? Math.ceil(this.y) : Math.floor(this.y),
        this.z = this.z < 0 ? Math.ceil(this.z) : Math.floor(this.z),
        this
    }
    negate() {
        return this.x = -this.x,
        this.y = -this.y,
        this.z = -this.z,
        this
    }
    dot(e) {
        return this.x * e.x + this.y * e.y + this.z * e.z
    }
    lengthSq() {
        return this.x * this.x + this.y * this.y + this.z * this.z
    }
    length() {
        return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z)
    }
    manhattanLength() {
        return Math.abs(this.x) + Math.abs(this.y) + Math.abs(this.z)
    }
    normalize() {
        return this.divideScalar(this.length() || 1)
    }
    setLength(e) {
        return this.normalize().multiplyScalar(e)
    }
    lerp(e, t) {
        return this.x += (e.x - this.x) * t,
        this.y += (e.y - this.y) * t,
        this.z += (e.z - this.z) * t,
        this
    }
    lerpVectors(e, t, i) {
        return this.x = e.x + (t.x - e.x) * i,
        this.y = e.y + (t.y - e.y) * i,
        this.z = e.z + (t.z - e.z) * i,
        this
    }
    cross(e) {
        return this.crossVectors(this, e)
    }
    crossVectors(e, t) {
        const i = e.x
          , n = e.y
          , r = e.z
          , o = t.x
          , a = t.y
          , c = t.z;
        return this.x = n * c - r * a,
        this.y = r * o - i * c,
        this.z = i * a - n * o,
        this
    }
    projectOnVector(e) {
        const t = e.lengthSq();
        if (t === 0)
            return this.set(0, 0, 0);
        const i = e.dot(this) / t;
        return this.copy(e).multiplyScalar(i)
    }
    projectOnPlane(e) {
        return _vector$c.copy(this).projectOnVector(e),
        this.sub(_vector$c)
    }
    reflect(e) {
        return this.sub(_vector$c.copy(e).multiplyScalar(2 * this.dot(e)))
    }
    angleTo(e) {
        const t = Math.sqrt(this.lengthSq() * e.lengthSq());
        if (t === 0)
            return Math.PI / 2;
        const i = this.dot(e) / t;
        return Math.acos(clamp(i, -1, 1))
    }
    distanceTo(e) {
        return Math.sqrt(this.distanceToSquared(e))
    }
    distanceToSquared(e) {
        const t = this.x - e.x
          , i = this.y - e.y
          , n = this.z - e.z;
        return t * t + i * i + n * n
    }
    manhattanDistanceTo(e) {
        return Math.abs(this.x - e.x) + Math.abs(this.y - e.y) + Math.abs(this.z - e.z)
    }
    setFromSpherical(e) {
        return this.setFromSphericalCoords(e.radius, e.phi, e.theta)
    }
    setFromSphericalCoords(e, t, i) {
        const n = Math.sin(t) * e;
        return this.x = n * Math.sin(i),
        this.y = Math.cos(t) * e,
        this.z = n * Math.cos(i),
        this
    }
    setFromCylindrical(e) {
        return this.setFromCylindricalCoords(e.radius, e.theta, e.y)
    }
    setFromCylindricalCoords(e, t, i) {
        return this.x = e * Math.sin(t),
        this.y = i,
        this.z = e * Math.cos(t),
        this
    }
    setFromMatrixPosition(e) {
        const t = e.elements;
        return this.x = t[12],
        this.y = t[13],
        this.z = t[14],
        this
    }
    setFromMatrixScale(e) {
        const t = this.setFromMatrixColumn(e, 0).length()
          , i = this.setFromMatrixColumn(e, 1).length()
          , n = this.setFromMatrixColumn(e, 2).length();
        return this.x = t,
        this.y = i,
        this.z = n,
        this
    }
    setFromMatrixColumn(e, t) {
        return this.fromArray(e.elements, t * 4)
    }
    setFromMatrix3Column(e, t) {
        return this.fromArray(e.elements, t * 3)
    }
    setFromEuler(e) {
        return this.x = e._x,
        this.y = e._y,
        this.z = e._z,
        this
    }
    equals(e) {
        return e.x === this.x && e.y === this.y && e.z === this.z
    }
    fromArray(e, t=0) {
        return this.x = e[t],
        this.y = e[t + 1],
        this.z = e[t + 2],
        this
    }
    toArray(e=[], t=0) {
        return e[t] = this.x,
        e[t + 1] = this.y,
        e[t + 2] = this.z,
        e
    }
    fromBufferAttribute(e, t) {
        return this.x = e.getX(t),
        this.y = e.getY(t),
        this.z = e.getZ(t),
        this
    }
    random() {
        return this.x = Math.random(),
        this.y = Math.random(),
        this.z = Math.random(),
        this
    }
    randomDirection() {
        const e = (Math.random() - .5) * 2
          , t = Math.random() * Math.PI * 2
          , i = Math.sqrt(1 - e ** 2);
        return this.x = i * Math.cos(t),
        this.y = i * Math.sin(t),
        this.z = e,
        this
    }
    *[Symbol.iterator]() {
        yield this.x,
        yield this.y,
        yield this.z
    }
}
const _vector$c = new Vector3
  , _quaternion$4 = new Quaternion;
class Box3 {
    constructor(e=new Vector3(1 / 0,1 / 0,1 / 0), t=new Vector3(-1 / 0,-1 / 0,-1 / 0)) {
        this.isBox3 = !0,
        this.min = e,
        this.max = t
    }
    set(e, t) {
        return this.min.copy(e),
        this.max.copy(t),
        this
    }
    setFromArray(e) {
        let t = 1 / 0
          , i = 1 / 0
          , n = 1 / 0
          , r = -1 / 0
          , o = -1 / 0
          , a = -1 / 0;
        for (let c = 0, l = e.length; c < l; c += 3) {
            const u = e[c]
              , h = e[c + 1]
              , d = e[c + 2];
            u < t && (t = u),
            h < i && (i = h),
            d < n && (n = d),
            u > r && (r = u),
            h > o && (o = h),
            d > a && (a = d)
        }
        return this.min.set(t, i, n),
        this.max.set(r, o, a),
        this
    }
    setFromBufferAttribute(e) {
        let t = 1 / 0
          , i = 1 / 0
          , n = 1 / 0
          , r = -1 / 0
          , o = -1 / 0
          , a = -1 / 0;
        for (let c = 0, l = e.count; c < l; c++) {
            const u = e.getX(c)
              , h = e.getY(c)
              , d = e.getZ(c);
            u < t && (t = u),
            h < i && (i = h),
            d < n && (n = d),
            u > r && (r = u),
            h > o && (o = h),
            d > a && (a = d)
        }
        return this.min.set(t, i, n),
        this.max.set(r, o, a),
        this
    }
    setFromPoints(e) {
        this.makeEmpty();
        for (let t = 0, i = e.length; t < i; t++)
            this.expandByPoint(e[t]);
        return this
    }
    setFromCenterAndSize(e, t) {
        const i = _vector$b.copy(t).multiplyScalar(.5);
        return this.min.copy(e).sub(i),
        this.max.copy(e).add(i),
        this
    }
    setFromObject(e, t=!1) {
        return this.makeEmpty(),
        this.expandByObject(e, t)
    }
    clone() {
        return new this.constructor().copy(this)
    }
    copy(e) {
        return this.min.copy(e.min),
        this.max.copy(e.max),
        this
    }
    makeEmpty() {
        return this.min.x = this.min.y = this.min.z = 1 / 0,
        this.max.x = this.max.y = this.max.z = -1 / 0,
        this
    }
    isEmpty() {
        return this.max.x < this.min.x || this.max.y < this.min.y || this.max.z < this.min.z
    }
    getCenter(e) {
        return this.isEmpty() ? e.set(0, 0, 0) : e.addVectors(this.min, this.max).multiplyScalar(.5)
    }
    getSize(e) {
        return this.isEmpty() ? e.set(0, 0, 0) : e.subVectors(this.max, this.min)
    }
    expandByPoint(e) {
        return this.min.min(e),
        this.max.max(e),
        this
    }
    expandByVector(e) {
        return this.min.sub(e),
        this.max.add(e),
        this
    }
    expandByScalar(e) {
        return this.min.addScalar(-e),
        this.max.addScalar(e),
        this
    }
    expandByObject(e, t=!1) {
        e.updateWorldMatrix(!1, !1);
        const i = e.geometry;
        if (i !== void 0)
            if (t && i.attributes != null && i.attributes.position !== void 0) {
                const r = i.attributes.position;
                for (let o = 0, a = r.count; o < a; o++)
                    _vector$b.fromBufferAttribute(r, o).applyMatrix4(e.matrixWorld),
                    this.expandByPoint(_vector$b)
            } else
                i.boundingBox === null && i.computeBoundingBox(),
                _box$3.copy(i.boundingBox),
                _box$3.applyMatrix4(e.matrixWorld),
                this.union(_box$3);
        const n = e.children;
        for (let r = 0, o = n.length; r < o; r++)
            this.expandByObject(n[r], t);
        return this
    }
    containsPoint(e) {
        return !(e.x < this.min.x || e.x > this.max.x || e.y < this.min.y || e.y > this.max.y || e.z < this.min.z || e.z > this.max.z)
    }
    containsBox(e) {
        return this.min.x <= e.min.x && e.max.x <= this.max.x && this.min.y <= e.min.y && e.max.y <= this.max.y && this.min.z <= e.min.z && e.max.z <= this.max.z
    }
    getParameter(e, t) {
        return t.set((e.x - this.min.x) / (this.max.x - this.min.x), (e.y - this.min.y) / (this.max.y - this.min.y), (e.z - this.min.z) / (this.max.z - this.min.z))
    }
    intersectsBox(e) {
        return !(e.max.x < this.min.x || e.min.x > this.max.x || e.max.y < this.min.y || e.min.y > this.max.y || e.max.z < this.min.z || e.min.z > this.max.z)
    }
    intersectsSphere(e) {
        return this.clampPoint(e.center, _vector$b),
        _vector$b.distanceToSquared(e.center) <= e.radius * e.radius
    }
    intersectsPlane(e) {
        let t, i;
        return e.normal.x > 0 ? (t = e.normal.x * this.min.x,
        i = e.normal.x * this.max.x) : (t = e.normal.x * this.max.x,
        i = e.normal.x * this.min.x),
        e.normal.y > 0 ? (t += e.normal.y * this.min.y,
        i += e.normal.y * this.max.y) : (t += e.normal.y * this.max.y,
        i += e.normal.y * this.min.y),
        e.normal.z > 0 ? (t += e.normal.z * this.min.z,
        i += e.normal.z * this.max.z) : (t += e.normal.z * this.max.z,
        i += e.normal.z * this.min.z),
        t <= -e.constant && i >= -e.constant
    }
    intersectsTriangle(e) {
        if (this.isEmpty())
            return !1;
        this.getCenter(_center),
        _extents.subVectors(this.max, _center),
        _v0$2.subVectors(e.a, _center),
        _v1$7.subVectors(e.b, _center),
        _v2$4.subVectors(e.c, _center),
        _f0.subVectors(_v1$7, _v0$2),
        _f1.subVectors(_v2$4, _v1$7),
        _f2.subVectors(_v0$2, _v2$4);
        let t = [0, -_f0.z, _f0.y, 0, -_f1.z, _f1.y, 0, -_f2.z, _f2.y, _f0.z, 0, -_f0.x, _f1.z, 0, -_f1.x, _f2.z, 0, -_f2.x, -_f0.y, _f0.x, 0, -_f1.y, _f1.x, 0, -_f2.y, _f2.x, 0];
        return !satForAxes(t, _v0$2, _v1$7, _v2$4, _extents) || (t = [1, 0, 0, 0, 1, 0, 0, 0, 1],
        !satForAxes(t, _v0$2, _v1$7, _v2$4, _extents)) ? !1 : (_triangleNormal.crossVectors(_f0, _f1),
        t = [_triangleNormal.x, _triangleNormal.y, _triangleNormal.z],
        satForAxes(t, _v0$2, _v1$7, _v2$4, _extents))
    }
    clampPoint(e, t) {
        return t.copy(e).clamp(this.min, this.max)
    }
    distanceToPoint(e) {
        return _vector$b.copy(e).clamp(this.min, this.max).sub(e).length()
    }
    getBoundingSphere(e) {
        return this.getCenter(e.center),
        e.radius = this.getSize(_vector$b).length() * .5,
        e
    }
    intersect(e) {
        return this.min.max(e.min),
        this.max.min(e.max),
        this.isEmpty() && this.makeEmpty(),
        this
    }
    union(e) {
        return this.min.min(e.min),
        this.max.max(e.max),
        this
    }
    applyMatrix4(e) {
        return this.isEmpty() ? this : (_points[0].set(this.min.x, this.min.y, this.min.z).applyMatrix4(e),
        _points[1].set(this.min.x, this.min.y, this.max.z).applyMatrix4(e),
        _points[2].set(this.min.x, this.max.y, this.min.z).applyMatrix4(e),
        _points[3].set(this.min.x, this.max.y, this.max.z).applyMatrix4(e),
        _points[4].set(this.max.x, this.min.y, this.min.z).applyMatrix4(e),
        _points[5].set(this.max.x, this.min.y, this.max.z).applyMatrix4(e),
        _points[6].set(this.max.x, this.max.y, this.min.z).applyMatrix4(e),
        _points[7].set(this.max.x, this.max.y, this.max.z).applyMatrix4(e),
        this.setFromPoints(_points),
        this)
    }
    translate(e) {
        return this.min.add(e),
        this.max.add(e),
        this
    }
    equals(e) {
        return e.min.equals(this.min) && e.max.equals(this.max)
    }
}
const _points = [new Vector3, new Vector3, new Vector3, new Vector3, new Vector3, new Vector3, new Vector3, new Vector3]
  , _vector$b = new Vector3
  , _box$3 = new Box3
  , _v0$2 = new Vector3
  , _v1$7 = new Vector3
  , _v2$4 = new Vector3
  , _f0 = new Vector3
  , _f1 = new Vector3
  , _f2 = new Vector3
  , _center = new Vector3
  , _extents = new Vector3
  , _triangleNormal = new Vector3
  , _testAxis = new Vector3;
function satForAxes(s, e, t, i, n) {
    for (let r = 0, o = s.length - 3; r <= o; r += 3) {
        _testAxis.fromArray(s, r);
        const a = n.x * Math.abs(_testAxis.x) + n.y * Math.abs(_testAxis.y) + n.z * Math.abs(_testAxis.z)
          , c = e.dot(_testAxis)
          , l = t.dot(_testAxis)
          , u = i.dot(_testAxis);
        if (Math.max(-Math.max(c, l, u), Math.min(c, l, u)) > a)
            return !1
    }
    return !0
}
const _box$2 = new Box3
  , _v1$6 = new Vector3
  , _v2$3 = new Vector3;
class Sphere {
    constructor(e=new Vector3, t=-1) {
        this.center = e,
        this.radius = t
    }
    set(e, t) {
        return this.center.copy(e),
        this.radius = t,
        this
    }
    setFromPoints(e, t) {
        const i = this.center;
        t !== void 0 ? i.copy(t) : _box$2.setFromPoints(e).getCenter(i);
        let n = 0;
        for (let r = 0, o = e.length; r < o; r++)
            n = Math.max(n, i.distanceToSquared(e[r]));
        return this.radius = Math.sqrt(n),
        this
    }
    copy(e) {
        return this.center.copy(e.center),
        this.radius = e.radius,
        this
    }
    isEmpty() {
        return this.radius < 0
    }
    makeEmpty() {
        return this.center.set(0, 0, 0),
        this.radius = -1,
        this
    }
    containsPoint(e) {
        return e.distanceToSquared(this.center) <= this.radius * this.radius
    }
    distanceToPoint(e) {
        return e.distanceTo(this.center) - this.radius
    }
    intersectsSphere(e) {
        const t = this.radius + e.radius;
        return e.center.distanceToSquared(this.center) <= t * t
    }
    intersectsBox(e) {
        return e.intersectsSphere(this)
    }
    intersectsPlane(e) {
        return Math.abs(e.distanceToPoint(this.center)) <= this.radius
    }
    clampPoint(e, t) {
        const i = this.center.distanceToSquared(e);
        return t.copy(e),
        i > this.radius * this.radius && (t.sub(this.center).normalize(),
        t.multiplyScalar(this.radius).add(this.center)),
        t
    }
    getBoundingBox(e) {
        return this.isEmpty() ? (e.makeEmpty(),
        e) : (e.set(this.center, this.center),
        e.expandByScalar(this.radius),
        e)
    }
    applyMatrix4(e) {
        return this.center.applyMatrix4(e),
        this.radius = this.radius * e.getMaxScaleOnAxis(),
        this
    }
    translate(e) {
        return this.center.add(e),
        this
    }
    expandByPoint(e) {
        if (this.isEmpty())
            return this.center.copy(e),
            this.radius = 0,
            this;
        _v1$6.subVectors(e, this.center);
        const t = _v1$6.lengthSq();
        if (t > this.radius * this.radius) {
            const i = Math.sqrt(t)
              , n = (i - this.radius) * .5;
            this.center.addScaledVector(_v1$6, n / i),
            this.radius += n
        }
        return this
    }
    union(e) {
        return e.isEmpty() ? this : this.isEmpty() ? (this.copy(e),
        this) : (this.center.equals(e.center) === !0 ? this.radius = Math.max(this.radius, e.radius) : (_v2$3.subVectors(e.center, this.center).setLength(e.radius),
        this.expandByPoint(_v1$6.copy(e.center).add(_v2$3)),
        this.expandByPoint(_v1$6.copy(e.center).sub(_v2$3))),
        this)
    }
    equals(e) {
        return e.center.equals(this.center) && e.radius === this.radius
    }
    clone() {
        return new this.constructor().copy(this)
    }
}
const _vector$a = new Vector3
  , _segCenter = new Vector3
  , _segDir = new Vector3
  , _diff = new Vector3
  , _edge1 = new Vector3
  , _edge2 = new Vector3
  , _normal$1 = new Vector3;
class Ray {
    constructor(e=new Vector3, t=new Vector3(0,0,-1)) {
        this.origin = e,
        this.direction = t
    }
    set(e, t) {
        return this.origin.copy(e),
        this.direction.copy(t),
        this
    }
    copy(e) {
        return this.origin.copy(e.origin),
        this.direction.copy(e.direction),
        this
    }
    at(e, t) {
        return t.copy(this.direction).multiplyScalar(e).add(this.origin)
    }
    lookAt(e) {
        return this.direction.copy(e).sub(this.origin).normalize(),
        this
    }
    recast(e) {
        return this.origin.copy(this.at(e, _vector$a)),
        this
    }
    closestPointToPoint(e, t) {
        t.subVectors(e, this.origin);
        const i = t.dot(this.direction);
        return i < 0 ? t.copy(this.origin) : t.copy(this.direction).multiplyScalar(i).add(this.origin)
    }
    distanceToPoint(e) {
        return Math.sqrt(this.distanceSqToPoint(e))
    }
    distanceSqToPoint(e) {
        const t = _vector$a.subVectors(e, this.origin).dot(this.direction);
        return t < 0 ? this.origin.distanceToSquared(e) : (_vector$a.copy(this.direction).multiplyScalar(t).add(this.origin),
        _vector$a.distanceToSquared(e))
    }
    distanceSqToSegment(e, t, i, n) {
        _segCenter.copy(e).add(t).multiplyScalar(.5),
        _segDir.copy(t).sub(e).normalize(),
        _diff.copy(this.origin).sub(_segCenter);
        const r = e.distanceTo(t) * .5
          , o = -this.direction.dot(_segDir)
          , a = _diff.dot(this.direction)
          , c = -_diff.dot(_segDir)
          , l = _diff.lengthSq()
          , u = Math.abs(1 - o * o);
        let h, d, m, g;
        if (u > 0)
            if (h = o * c - a,
            d = o * a - c,
            g = r * u,
            h >= 0)
                if (d >= -g)
                    if (d <= g) {
                        const p = 1 / u;
                        h *= p,
                        d *= p,
                        m = h * (h + o * d + 2 * a) + d * (o * h + d + 2 * c) + l
                    } else
                        d = r,
                        h = Math.max(0, -(o * d + a)),
                        m = -h * h + d * (d + 2 * c) + l;
                else
                    d = -r,
                    h = Math.max(0, -(o * d + a)),
                    m = -h * h + d * (d + 2 * c) + l;
            else
                d <= -g ? (h = Math.max(0, -(-o * r + a)),
                d = h > 0 ? -r : Math.min(Math.max(-r, -c), r),
                m = -h * h + d * (d + 2 * c) + l) : d <= g ? (h = 0,
                d = Math.min(Math.max(-r, -c), r),
                m = d * (d + 2 * c) + l) : (h = Math.max(0, -(o * r + a)),
                d = h > 0 ? r : Math.min(Math.max(-r, -c), r),
                m = -h * h + d * (d + 2 * c) + l);
        else
            d = o > 0 ? -r : r,
            h = Math.max(0, -(o * d + a)),
            m = -h * h + d * (d + 2 * c) + l;
        return i && i.copy(this.direction).multiplyScalar(h).add(this.origin),
        n && n.copy(_segDir).multiplyScalar(d).add(_segCenter),
        m
    }
    intersectSphere(e, t) {
        _vector$a.subVectors(e.center, this.origin);
        const i = _vector$a.dot(this.direction)
          , n = _vector$a.dot(_vector$a) - i * i
          , r = e.radius * e.radius;
        if (n > r)
            return null;
        const o = Math.sqrt(r - n)
          , a = i - o
          , c = i + o;
        return a < 0 && c < 0 ? null : a < 0 ? this.at(c, t) : this.at(a, t)
    }
    intersectsSphere(e) {
        return this.distanceSqToPoint(e.center) <= e.radius * e.radius
    }
    distanceToPlane(e) {
        const t = e.normal.dot(this.direction);
        if (t === 0)
            return e.distanceToPoint(this.origin) === 0 ? 0 : null;
        const i = -(this.origin.dot(e.normal) + e.constant) / t;
        return i >= 0 ? i : null
    }
    intersectPlane(e, t) {
        const i = this.distanceToPlane(e);
        return i === null ? null : this.at(i, t)
    }
    intersectsPlane(e) {
        const t = e.distanceToPoint(this.origin);
        return t === 0 || e.normal.dot(this.direction) * t < 0
    }
    intersectBox(e, t) {
        let i, n, r, o, a, c;
        const l = 1 / this.direction.x
          , u = 1 / this.direction.y
          , h = 1 / this.direction.z
          , d = this.origin;
        return l >= 0 ? (i = (e.min.x - d.x) * l,
        n = (e.max.x - d.x) * l) : (i = (e.max.x - d.x) * l,
        n = (e.min.x - d.x) * l),
        u >= 0 ? (r = (e.min.y - d.y) * u,
        o = (e.max.y - d.y) * u) : (r = (e.max.y - d.y) * u,
        o = (e.min.y - d.y) * u),
        i > o || r > n || ((r > i || isNaN(i)) && (i = r),
        (o < n || isNaN(n)) && (n = o),
        h >= 0 ? (a = (e.min.z - d.z) * h,
        c = (e.max.z - d.z) * h) : (a = (e.max.z - d.z) * h,
        c = (e.min.z - d.z) * h),
        i > c || a > n) || ((a > i || i !== i) && (i = a),
        (c < n || n !== n) && (n = c),
        n < 0) ? null : this.at(i >= 0 ? i : n, t)
    }
    intersectsBox(e) {
        return this.intersectBox(e, _vector$a) !== null
    }
    intersectTriangle(e, t, i, n, r) {
        _edge1.subVectors(t, e),
        _edge2.subVectors(i, e),
        _normal$1.crossVectors(_edge1, _edge2);
        let o = this.direction.dot(_normal$1), a;
        if (o > 0) {
            if (n)
                return null;
            a = 1
        } else if (o < 0)
            a = -1,
            o = -o;
        else
            return null;
        _diff.subVectors(this.origin, e);
        const c = a * this.direction.dot(_edge2.crossVectors(_diff, _edge2));
        if (c < 0)
            return null;
        const l = a * this.direction.dot(_edge1.cross(_diff));
        if (l < 0 || c + l > o)
            return null;
        const u = -a * _diff.dot(_normal$1);
        return u < 0 ? null : this.at(u / o, r)
    }
    applyMatrix4(e) {
        return this.origin.applyMatrix4(e),
        this.direction.transformDirection(e),
        this
    }
    equals(e) {
        return e.origin.equals(this.origin) && e.direction.equals(this.direction)
    }
    clone() {
        return new this.constructor().copy(this)
    }
}
class Matrix4 {
    constructor() {
        Matrix4.prototype.isMatrix4 = !0,
        this.elements = [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]
    }
    set(e, t, i, n, r, o, a, c, l, u, h, d, m, g, p, f) {
        const x = this.elements;
        return x[0] = e,
        x[4] = t,
        x[8] = i,
        x[12] = n,
        x[1] = r,
        x[5] = o,
        x[9] = a,
        x[13] = c,
        x[2] = l,
        x[6] = u,
        x[10] = h,
        x[14] = d,
        x[3] = m,
        x[7] = g,
        x[11] = p,
        x[15] = f,
        this
    }
    identity() {
        return this.set(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1),
        this
    }
    clone() {
        return new Matrix4().fromArray(this.elements)
    }
    copy(e) {
        const t = this.elements
          , i = e.elements;
        return t[0] = i[0],
        t[1] = i[1],
        t[2] = i[2],
        t[3] = i[3],
        t[4] = i[4],
        t[5] = i[5],
        t[6] = i[6],
        t[7] = i[7],
        t[8] = i[8],
        t[9] = i[9],
        t[10] = i[10],
        t[11] = i[11],
        t[12] = i[12],
        t[13] = i[13],
        t[14] = i[14],
        t[15] = i[15],
        this
    }
    copyPosition(e) {
        const t = this.elements
          , i = e.elements;
        return t[12] = i[12],
        t[13] = i[13],
        t[14] = i[14],
        this
    }
    setFromMatrix3(e) {
        const t = e.elements;
        return this.set(t[0], t[3], t[6], 0, t[1], t[4], t[7], 0, t[2], t[5], t[8], 0, 0, 0, 0, 1),
        this
    }
    extractBasis(e, t, i) {
        return e.setFromMatrixColumn(this, 0),
        t.setFromMatrixColumn(this, 1),
        i.setFromMatrixColumn(this, 2),
        this
    }
    makeBasis(e, t, i) {
        return this.set(e.x, t.x, i.x, 0, e.y, t.y, i.y, 0, e.z, t.z, i.z, 0, 0, 0, 0, 1),
        this
    }
    extractRotation(e) {
        const t = this.elements
          , i = e.elements
          , n = 1 / _v1$5.setFromMatrixColumn(e, 0).length()
          , r = 1 / _v1$5.setFromMatrixColumn(e, 1).length()
          , o = 1 / _v1$5.setFromMatrixColumn(e, 2).length();
        return t[0] = i[0] * n,
        t[1] = i[1] * n,
        t[2] = i[2] * n,
        t[3] = 0,
        t[4] = i[4] * r,
        t[5] = i[5] * r,
        t[6] = i[6] * r,
        t[7] = 0,
        t[8] = i[8] * o,
        t[9] = i[9] * o,
        t[10] = i[10] * o,
        t[11] = 0,
        t[12] = 0,
        t[13] = 0,
        t[14] = 0,
        t[15] = 1,
        this
    }
    makeRotationFromEuler(e) {
        const t = this.elements
          , i = e.x
          , n = e.y
          , r = e.z
          , o = Math.cos(i)
          , a = Math.sin(i)
          , c = Math.cos(n)
          , l = Math.sin(n)
          , u = Math.cos(r)
          , h = Math.sin(r);
        if (e.order === "XYZ") {
            const d = o * u
              , m = o * h
              , g = a * u
              , p = a * h;
            t[0] = c * u,
            t[4] = -c * h,
            t[8] = l,
            t[1] = m + g * l,
            t[5] = d - p * l,
            t[9] = -a * c,
            t[2] = p - d * l,
            t[6] = g + m * l,
            t[10] = o * c
        } else if (e.order === "YXZ") {
            const d = c * u
              , m = c * h
              , g = l * u
              , p = l * h;
            t[0] = d + p * a,
            t[4] = g * a - m,
            t[8] = o * l,
            t[1] = o * h,
            t[5] = o * u,
            t[9] = -a,
            t[2] = m * a - g,
            t[6] = p + d * a,
            t[10] = o * c
        } else if (e.order === "ZXY") {
            const d = c * u
              , m = c * h
              , g = l * u
              , p = l * h;
            t[0] = d - p * a,
            t[4] = -o * h,
            t[8] = g + m * a,
            t[1] = m + g * a,
            t[5] = o * u,
            t[9] = p - d * a,
            t[2] = -o * l,
            t[6] = a,
            t[10] = o * c
        } else if (e.order === "ZYX") {
            const d = o * u
              , m = o * h
              , g = a * u
              , p = a * h;
            t[0] = c * u,
            t[4] = g * l - m,
            t[8] = d * l + p,
            t[1] = c * h,
            t[5] = p * l + d,
            t[9] = m * l - g,
            t[2] = -l,
            t[6] = a * c,
            t[10] = o * c
        } else if (e.order === "YZX") {
            const d = o * c
              , m = o * l
              , g = a * c
              , p = a * l;
            t[0] = c * u,
            t[4] = p - d * h,
            t[8] = g * h + m,
            t[1] = h,
            t[5] = o * u,
            t[9] = -a * u,
            t[2] = -l * u,
            t[6] = m * h + g,
            t[10] = d - p * h
        } else if (e.order === "XZY") {
            const d = o * c
              , m = o * l
              , g = a * c
              , p = a * l;
            t[0] = c * u,
            t[4] = -h,
            t[8] = l * u,
            t[1] = d * h + p,
            t[5] = o * u,
            t[9] = m * h - g,
            t[2] = g * h - m,
            t[6] = a * u,
            t[10] = p * h + d
        }
        return t[3] = 0,
        t[7] = 0,
        t[11] = 0,
        t[12] = 0,
        t[13] = 0,
        t[14] = 0,
        t[15] = 1,
        this
    }
    makeRotationFromQuaternion(e) {
        return this.compose(_zero, e, _one)
    }
    lookAt(e, t, i) {
        const n = this.elements;
        return _z.subVectors(e, t),
        _z.lengthSq() === 0 && (_z.z = 1),
        _z.normalize(),
        _x.crossVectors(i, _z),
        _x.lengthSq() === 0 && (Math.abs(i.z) === 1 ? _z.x += 1e-4 : _z.z += 1e-4,
        _z.normalize(),
        _x.crossVectors(i, _z)),
        _x.normalize(),
        _y.crossVectors(_z, _x),
        n[0] = _x.x,
        n[4] = _y.x,
        n[8] = _z.x,
        n[1] = _x.y,
        n[5] = _y.y,
        n[9] = _z.y,
        n[2] = _x.z,
        n[6] = _y.z,
        n[10] = _z.z,
        this
    }
    multiply(e) {
        return this.multiplyMatrices(this, e)
    }
    premultiply(e) {
        return this.multiplyMatrices(e, this)
    }
    multiplyMatrices(e, t) {
        const i = e.elements
          , n = t.elements
          , r = this.elements
          , o = i[0]
          , a = i[4]
          , c = i[8]
          , l = i[12]
          , u = i[1]
          , h = i[5]
          , d = i[9]
          , m = i[13]
          , g = i[2]
          , p = i[6]
          , f = i[10]
          , x = i[14]
          , S = i[3]
          , v = i[7]
          , M = i[11]
          , y = i[15]
          , A = n[0]
          , P = n[4]
          , _ = n[8]
          , L = n[12]
          , D = n[1]
          , $ = n[5]
          , R = n[9]
          , T = n[13]
          , C = n[2]
          , F = n[6]
          , U = n[10]
          , z = n[14]
          , B = n[3]
          , Z = n[7]
          , j = n[11]
          , V = n[15];
        return r[0] = o * A + a * D + c * C + l * B,
        r[4] = o * P + a * $ + c * F + l * Z,
        r[8] = o * _ + a * R + c * U + l * j,
        r[12] = o * L + a * T + c * z + l * V,
        r[1] = u * A + h * D + d * C + m * B,
        r[5] = u * P + h * $ + d * F + m * Z,
        r[9] = u * _ + h * R + d * U + m * j,
        r[13] = u * L + h * T + d * z + m * V,
        r[2] = g * A + p * D + f * C + x * B,
        r[6] = g * P + p * $ + f * F + x * Z,
        r[10] = g * _ + p * R + f * U + x * j,
        r[14] = g * L + p * T + f * z + x * V,
        r[3] = S * A + v * D + M * C + y * B,
        r[7] = S * P + v * $ + M * F + y * Z,
        r[11] = S * _ + v * R + M * U + y * j,
        r[15] = S * L + v * T + M * z + y * V,
        this
    }
    multiplyScalar(e) {
        const t = this.elements;
        return t[0] *= e,
        t[4] *= e,
        t[8] *= e,
        t[12] *= e,
        t[1] *= e,
        t[5] *= e,
        t[9] *= e,
        t[13] *= e,
        t[2] *= e,
        t[6] *= e,
        t[10] *= e,
        t[14] *= e,
        t[3] *= e,
        t[7] *= e,
        t[11] *= e,
        t[15] *= e,
        this
    }
    determinant() {
        const e = this.elements
          , t = e[0]
          , i = e[4]
          , n = e[8]
          , r = e[12]
          , o = e[1]
          , a = e[5]
          , c = e[9]
          , l = e[13]
          , u = e[2]
          , h = e[6]
          , d = e[10]
          , m = e[14]
          , g = e[3]
          , p = e[7]
          , f = e[11]
          , x = e[15];
        return g * (+r * c * h - n * l * h - r * a * d + i * l * d + n * a * m - i * c * m) + p * (+t * c * m - t * l * d + r * o * d - n * o * m + n * l * u - r * c * u) + f * (+t * l * h - t * a * m - r * o * h + i * o * m + r * a * u - i * l * u) + x * (-n * a * u - t * c * h + t * a * d + n * o * h - i * o * d + i * c * u)
    }
    transpose() {
        const e = this.elements;
        let t;
        return t = e[1],
        e[1] = e[4],
        e[4] = t,
        t = e[2],
        e[2] = e[8],
        e[8] = t,
        t = e[6],
        e[6] = e[9],
        e[9] = t,
        t = e[3],
        e[3] = e[12],
        e[12] = t,
        t = e[7],
        e[7] = e[13],
        e[13] = t,
        t = e[11],
        e[11] = e[14],
        e[14] = t,
        this
    }
    setPosition(e, t, i) {
        const n = this.elements;
        return e.isVector3 ? (n[12] = e.x,
        n[13] = e.y,
        n[14] = e.z) : (n[12] = e,
        n[13] = t,
        n[14] = i),
        this
    }
    invert() {
        const e = this.elements
          , t = e[0]
          , i = e[1]
          , n = e[2]
          , r = e[3]
          , o = e[4]
          , a = e[5]
          , c = e[6]
          , l = e[7]
          , u = e[8]
          , h = e[9]
          , d = e[10]
          , m = e[11]
          , g = e[12]
          , p = e[13]
          , f = e[14]
          , x = e[15]
          , S = h * f * l - p * d * l + p * c * m - a * f * m - h * c * x + a * d * x
          , v = g * d * l - u * f * l - g * c * m + o * f * m + u * c * x - o * d * x
          , M = u * p * l - g * h * l + g * a * m - o * p * m - u * a * x + o * h * x
          , y = g * h * c - u * p * c - g * a * d + o * p * d + u * a * f - o * h * f
          , A = t * S + i * v + n * M + r * y;
        if (A === 0)
            return this.set(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
        const P = 1 / A;
        return e[0] = S * P,
        e[1] = (p * d * r - h * f * r - p * n * m + i * f * m + h * n * x - i * d * x) * P,
        e[2] = (a * f * r - p * c * r + p * n * l - i * f * l - a * n * x + i * c * x) * P,
        e[3] = (h * c * r - a * d * r - h * n * l + i * d * l + a * n * m - i * c * m) * P,
        e[4] = v * P,
        e[5] = (u * f * r - g * d * r + g * n * m - t * f * m - u * n * x + t * d * x) * P,
        e[6] = (g * c * r - o * f * r - g * n * l + t * f * l + o * n * x - t * c * x) * P,
        e[7] = (o * d * r - u * c * r + u * n * l - t * d * l - o * n * m + t * c * m) * P,
        e[8] = M * P,
        e[9] = (g * h * r - u * p * r - g * i * m + t * p * m + u * i * x - t * h * x) * P,
        e[10] = (o * p * r - g * a * r + g * i * l - t * p * l - o * i * x + t * a * x) * P,
        e[11] = (u * a * r - o * h * r - u * i * l + t * h * l + o * i * m - t * a * m) * P,
        e[12] = y * P,
        e[13] = (u * p * n - g * h * n + g * i * d - t * p * d - u * i * f + t * h * f) * P,
        e[14] = (g * a * n - o * p * n - g * i * c + t * p * c + o * i * f - t * a * f) * P,
        e[15] = (o * h * n - u * a * n + u * i * c - t * h * c - o * i * d + t * a * d) * P,
        this
    }
    scale(e) {
        const t = this.elements
          , i = e.x
          , n = e.y
          , r = e.z;
        return t[0] *= i,
        t[4] *= n,
        t[8] *= r,
        t[1] *= i,
        t[5] *= n,
        t[9] *= r,
        t[2] *= i,
        t[6] *= n,
        t[10] *= r,
        t[3] *= i,
        t[7] *= n,
        t[11] *= r,
        this
    }
    getMaxScaleOnAxis() {
        const e = this.elements
          , t = e[0] * e[0] + e[1] * e[1] + e[2] * e[2]
          , i = e[4] * e[4] + e[5] * e[5] + e[6] * e[6]
          , n = e[8] * e[8] + e[9] * e[9] + e[10] * e[10];
        return Math.sqrt(Math.max(t, i, n))
    }
    makeTranslation(e, t, i) {
        return this.set(1, 0, 0, e, 0, 1, 0, t, 0, 0, 1, i, 0, 0, 0, 1),
        this
    }
    makeRotationX(e) {
        const t = Math.cos(e)
          , i = Math.sin(e);
        return this.set(1, 0, 0, 0, 0, t, -i, 0, 0, i, t, 0, 0, 0, 0, 1),
        this
    }
    makeRotationY(e) {
        const t = Math.cos(e)
          , i = Math.sin(e);
        return this.set(t, 0, i, 0, 0, 1, 0, 0, -i, 0, t, 0, 0, 0, 0, 1),
        this
    }
    makeRotationZ(e) {
        const t = Math.cos(e)
          , i = Math.sin(e);
        return this.set(t, -i, 0, 0, i, t, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1),
        this
    }
    makeRotationAxis(e, t) {
        const i = Math.cos(t)
          , n = Math.sin(t)
          , r = 1 - i
          , o = e.x
          , a = e.y
          , c = e.z
          , l = r * o
          , u = r * a;
        return this.set(l * o + i, l * a - n * c, l * c + n * a, 0, l * a + n * c, u * a + i, u * c - n * o, 0, l * c - n * a, u * c + n * o, r * c * c + i, 0, 0, 0, 0, 1),
        this
    }
    makeScale(e, t, i) {
        return this.set(e, 0, 0, 0, 0, t, 0, 0, 0, 0, i, 0, 0, 0, 0, 1),
        this
    }
    makeShear(e, t, i, n, r, o) {
        return this.set(1, i, r, 0, e, 1, o, 0, t, n, 1, 0, 0, 0, 0, 1),
        this
    }
    compose(e, t, i) {
        const n = this.elements
          , r = t._x
          , o = t._y
          , a = t._z
          , c = t._w
          , l = r + r
          , u = o + o
          , h = a + a
          , d = r * l
          , m = r * u
          , g = r * h
          , p = o * u
          , f = o * h
          , x = a * h
          , S = c * l
          , v = c * u
          , M = c * h
          , y = i.x
          , A = i.y
          , P = i.z;
        return n[0] = (1 - (p + x)) * y,
        n[1] = (m + M) * y,
        n[2] = (g - v) * y,
        n[3] = 0,
        n[4] = (m - M) * A,
        n[5] = (1 - (d + x)) * A,
        n[6] = (f + S) * A,
        n[7] = 0,
        n[8] = (g + v) * P,
        n[9] = (f - S) * P,
        n[10] = (1 - (d + p)) * P,
        n[11] = 0,
        n[12] = e.x,
        n[13] = e.y,
        n[14] = e.z,
        n[15] = 1,
        this
    }
    decompose(e, t, i) {
        const n = this.elements;
        let r = _v1$5.set(n[0], n[1], n[2]).length();
        const o = _v1$5.set(n[4], n[5], n[6]).length()
          , a = _v1$5.set(n[8], n[9], n[10]).length();
        this.determinant() < 0 && (r = -r),
        e.x = n[12],
        e.y = n[13],
        e.z = n[14],
        _m1$2.copy(this);
        const l = 1 / r
          , u = 1 / o
          , h = 1 / a;
        return _m1$2.elements[0] *= l,
        _m1$2.elements[1] *= l,
        _m1$2.elements[2] *= l,
        _m1$2.elements[4] *= u,
        _m1$2.elements[5] *= u,
        _m1$2.elements[6] *= u,
        _m1$2.elements[8] *= h,
        _m1$2.elements[9] *= h,
        _m1$2.elements[10] *= h,
        t.setFromRotationMatrix(_m1$2),
        i.x = r,
        i.y = o,
        i.z = a,
        this
    }
    makePerspective(e, t, i, n, r, o) {
        const a = this.elements
          , c = 2 * r / (t - e)
          , l = 2 * r / (i - n)
          , u = (t + e) / (t - e)
          , h = (i + n) / (i - n)
          , d = -(o + r) / (o - r)
          , m = -2 * o * r / (o - r);
        return a[0] = c,
        a[4] = 0,
        a[8] = u,
        a[12] = 0,
        a[1] = 0,
        a[5] = l,
        a[9] = h,
        a[13] = 0,
        a[2] = 0,
        a[6] = 0,
        a[10] = d,
        a[14] = m,
        a[3] = 0,
        a[7] = 0,
        a[11] = -1,
        a[15] = 0,
        this
    }
    makeOrthographic(e, t, i, n, r, o) {
        const a = this.elements
          , c = 1 / (t - e)
          , l = 1 / (i - n)
          , u = 1 / (o - r)
          , h = (t + e) * c
          , d = (i + n) * l
          , m = (o + r) * u;
        return a[0] = 2 * c,
        a[4] = 0,
        a[8] = 0,
        a[12] = -h,
        a[1] = 0,
        a[5] = 2 * l,
        a[9] = 0,
        a[13] = -d,
        a[2] = 0,
        a[6] = 0,
        a[10] = -2 * u,
        a[14] = -m,
        a[3] = 0,
        a[7] = 0,
        a[11] = 0,
        a[15] = 1,
        this
    }
    equals(e) {
        const t = this.elements
          , i = e.elements;
        for (let n = 0; n < 16; n++)
            if (t[n] !== i[n])
                return !1;
        return !0
    }
    fromArray(e, t=0) {
        for (let i = 0; i < 16; i++)
            this.elements[i] = e[i + t];
        return this
    }
    toArray(e=[], t=0) {
        const i = this.elements;
        return e[t] = i[0],
        e[t + 1] = i[1],
        e[t + 2] = i[2],
        e[t + 3] = i[3],
        e[t + 4] = i[4],
        e[t + 5] = i[5],
        e[t + 6] = i[6],
        e[t + 7] = i[7],
        e[t + 8] = i[8],
        e[t + 9] = i[9],
        e[t + 10] = i[10],
        e[t + 11] = i[11],
        e[t + 12] = i[12],
        e[t + 13] = i[13],
        e[t + 14] = i[14],
        e[t + 15] = i[15],
        e
    }
}
const _v1$5 = new Vector3
  , _m1$2 = new Matrix4
  , _zero = new Vector3(0,0,0)
  , _one = new Vector3(1,1,1)
  , _x = new Vector3
  , _y = new Vector3
  , _z = new Vector3
  , _matrix$1 = new Matrix4
  , _quaternion$3 = new Quaternion;
class Euler {
    constructor(e=0, t=0, i=0, n=Euler.DefaultOrder) {
        this.isEuler = !0,
        this._x = e,
        this._y = t,
        this._z = i,
        this._order = n
    }
    get x() {
        return this._x
    }
    set x(e) {
        this._x = e,
        this._onChangeCallback()
    }
    get y() {
        return this._y
    }
    set y(e) {
        this._y = e,
        this._onChangeCallback()
    }
    get z() {
        return this._z
    }
    set z(e) {
        this._z = e,
        this._onChangeCallback()
    }
    get order() {
        return this._order
    }
    set order(e) {
        this._order = e,
        this._onChangeCallback()
    }
    set(e, t, i, n=this._order) {
        return this._x = e,
        this._y = t,
        this._z = i,
        this._order = n,
        this._onChangeCallback(),
        this
    }
    clone() {
        return new this.constructor(this._x,this._y,this._z,this._order)
    }
    copy(e) {
        return this._x = e._x,
        this._y = e._y,
        this._z = e._z,
        this._order = e._order,
        this._onChangeCallback(),
        this
    }
    setFromRotationMatrix(e, t=this._order, i=!0) {
        const n = e.elements
          , r = n[0]
          , o = n[4]
          , a = n[8]
          , c = n[1]
          , l = n[5]
          , u = n[9]
          , h = n[2]
          , d = n[6]
          , m = n[10];
        switch (t) {
        case "XYZ":
            this._y = Math.asin(clamp(a, -1, 1)),
            Math.abs(a) < .9999999 ? (this._x = Math.atan2(-u, m),
            this._z = Math.atan2(-o, r)) : (this._x = Math.atan2(d, l),
            this._z = 0);
            break;
        case "YXZ":
            this._x = Math.asin(-clamp(u, -1, 1)),
            Math.abs(u) < .9999999 ? (this._y = Math.atan2(a, m),
            this._z = Math.atan2(c, l)) : (this._y = Math.atan2(-h, r),
            this._z = 0);
            break;
        case "ZXY":
            this._x = Math.asin(clamp(d, -1, 1)),
            Math.abs(d) < .9999999 ? (this._y = Math.atan2(-h, m),
            this._z = Math.atan2(-o, l)) : (this._y = 0,
            this._z = Math.atan2(c, r));
            break;
        case "ZYX":
            this._y = Math.asin(-clamp(h, -1, 1)),
            Math.abs(h) < .9999999 ? (this._x = Math.atan2(d, m),
            this._z = Math.atan2(c, r)) : (this._x = 0,
            this._z = Math.atan2(-o, l));
            break;
        case "YZX":
            this._z = Math.asin(clamp(c, -1, 1)),
            Math.abs(c) < .9999999 ? (this._x = Math.atan2(-u, l),
            this._y = Math.atan2(-h, r)) : (this._x = 0,
            this._y = Math.atan2(a, m));
            break;
        case "XZY":
            this._z = Math.asin(-clamp(o, -1, 1)),
            Math.abs(o) < .9999999 ? (this._x = Math.atan2(d, l),
            this._y = Math.atan2(a, r)) : (this._x = Math.atan2(-u, m),
            this._y = 0);
            break;
        default:
            console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: " + t)
        }
        return this._order = t,
        i === !0 && this._onChangeCallback(),
        this
    }
    setFromQuaternion(e, t, i) {
        return _matrix$1.makeRotationFromQuaternion(e),
        this.setFromRotationMatrix(_matrix$1, t, i)
    }
    setFromVector3(e, t=this._order) {
        return this.set(e.x, e.y, e.z, t)
    }
    reorder(e) {
        return _quaternion$3.setFromEuler(this),
        this.setFromQuaternion(_quaternion$3, e)
    }
    equals(e) {
        return e._x === this._x && e._y === this._y && e._z === this._z && e._order === this._order
    }
    fromArray(e) {
        return this._x = e[0],
        this._y = e[1],
        this._z = e[2],
        e[3] !== void 0 && (this._order = e[3]),
        this._onChangeCallback(),
        this
    }
    toArray(e=[], t=0) {
        return e[t] = this._x,
        e[t + 1] = this._y,
        e[t + 2] = this._z,
        e[t + 3] = this._order,
        e
    }
    _onChange(e) {
        return this._onChangeCallback = e,
        this
    }
    _onChangeCallback() {}
    *[Symbol.iterator]() {
        yield this._x,
        yield this._y,
        yield this._z,
        yield this._order
    }
    toVector3() {
        console.error("THREE.Euler: .toVector3() has been removed. Use Vector3.setFromEuler() instead")
    }
}
Euler.DefaultOrder = "XYZ";
Euler.RotationOrders = ["XYZ", "YZX", "ZXY", "XZY", "YXZ", "ZYX"];
class Layers {
    constructor() {
        this.mask = 1
    }
    set(e) {
        this.mask = (1 << e | 0) >>> 0
    }
    enable(e) {
        this.mask |= 1 << e | 0
    }
    enableAll() {
        this.mask = -1
    }
    toggle(e) {
        this.mask ^= 1 << e | 0
    }
    disable(e) {
        this.mask &= ~(1 << e | 0)
    }
    disableAll() {
        this.mask = 0
    }
    test(e) {
        return (this.mask & e.mask) !== 0
    }
    isEnabled(e) {
        return (this.mask & (1 << e | 0)) !== 0
    }
}
let _object3DId = 0;
const _v1$4 = new Vector3
  , _q1 = new Quaternion
  , _m1$1 = new Matrix4
  , _target = new Vector3
  , _position$3 = new Vector3
  , _scale$2 = new Vector3
  , _quaternion$2 = new Quaternion
  , _xAxis = new Vector3(1,0,0)
  , _yAxis = new Vector3(0,1,0)
  , _zAxis = new Vector3(0,0,1)
  , _addedEvent = {
    type: "added"
}
  , _removedEvent = {
    type: "removed"
};
class Object3D extends EventDispatcher {
    constructor() {
        super(),
        this.isObject3D = !0,
        Object.defineProperty(this, "id", {
            value: _object3DId++
        }),
        this.uuid = generateUUID(),
        this.name = "",
        this.type = "Object3D",
        this.parent = null,
        this.children = [],
        this.up = Object3D.DefaultUp.clone();
        const e = new Vector3
          , t = new Euler
          , i = new Quaternion
          , n = new Vector3(1,1,1);
        function r() {
            i.setFromEuler(t, !1)
        }
        function o() {
            t.setFromQuaternion(i, void 0, !1)
        }
        t._onChange(r),
        i._onChange(o),
        Object.defineProperties(this, {
            position: {
                configurable: !0,
                enumerable: !0,
                value: e
            },
            rotation: {
                configurable: !0,
                enumerable: !0,
                value: t
            },
            quaternion: {
                configurable: !0,
                enumerable: !0,
                value: i
            },
            scale: {
                configurable: !0,
                enumerable: !0,
                value: n
            },
            modelViewMatrix: {
                value: new Matrix4
            },
            normalMatrix: {
                value: new Matrix3
            }
        }),
        this.matrix = new Matrix4,
        this.matrixWorld = new Matrix4,
        this.matrixAutoUpdate = Object3D.DefaultMatrixAutoUpdate,
        this.matrixWorldNeedsUpdate = !1,
        this.matrixWorldAutoUpdate = Object3D.DefaultMatrixWorldAutoUpdate,
        this.layers = new Layers,
        this.visible = !0,
        this.castShadow = !1,
        this.receiveShadow = !1,
        this.frustumCulled = !0,
        this.renderOrder = 0,
        this.animations = [],
        this.userData = {}
    }
    onBeforeRender() {}
    onAfterRender() {}
    applyMatrix4(e) {
        this.matrixAutoUpdate && this.updateMatrix(),
        this.matrix.premultiply(e),
        this.matrix.decompose(this.position, this.quaternion, this.scale)
    }
    applyQuaternion(e) {
        return this.quaternion.premultiply(e),
        this
    }
    setRotationFromAxisAngle(e, t) {
        this.quaternion.setFromAxisAngle(e, t)
    }
    setRotationFromEuler(e) {
        this.quaternion.setFromEuler(e, !0)
    }
    setRotationFromMatrix(e) {
        this.quaternion.setFromRotationMatrix(e)
    }
    setRotationFromQuaternion(e) {
        this.quaternion.copy(e)
    }
    rotateOnAxis(e, t) {
        return _q1.setFromAxisAngle(e, t),
        this.quaternion.multiply(_q1),
        this
    }
    rotateOnWorldAxis(e, t) {
        return _q1.setFromAxisAngle(e, t),
        this.quaternion.premultiply(_q1),
        this
    }
    rotateX(e) {
        return this.rotateOnAxis(_xAxis, e)
    }
    rotateY(e) {
        return this.rotateOnAxis(_yAxis, e)
    }
    rotateZ(e) {
        return this.rotateOnAxis(_zAxis, e)
    }
    translateOnAxis(e, t) {
        return _v1$4.copy(e).applyQuaternion(this.quaternion),
        this.position.add(_v1$4.multiplyScalar(t)),
        this
    }
    translateX(e) {
        return this.translateOnAxis(_xAxis, e)
    }
    translateY(e) {
        return this.translateOnAxis(_yAxis, e)
    }
    translateZ(e) {
        return this.translateOnAxis(_zAxis, e)
    }
    localToWorld(e) {
        return this.updateWorldMatrix(!0, !1),
        e.applyMatrix4(this.matrixWorld)
    }
    worldToLocal(e) {
        return this.updateWorldMatrix(!0, !1),
        e.applyMatrix4(_m1$1.copy(this.matrixWorld).invert())
    }
    lookAt(e, t, i) {
        e.isVector3 ? _target.copy(e) : _target.set(e, t, i);
        const n = this.parent;
        this.updateWorldMatrix(!0, !1),
        _position$3.setFromMatrixPosition(this.matrixWorld),
        this.isCamera || this.isLight ? _m1$1.lookAt(_position$3, _target, this.up) : _m1$1.lookAt(_target, _position$3, this.up),
        this.quaternion.setFromRotationMatrix(_m1$1),
        n && (_m1$1.extractRotation(n.matrixWorld),
        _q1.setFromRotationMatrix(_m1$1),
        this.quaternion.premultiply(_q1.invert()))
    }
    add(e) {
        if (arguments.length > 1) {
            for (let t = 0; t < arguments.length; t++)
                this.add(arguments[t]);
            return this
        }
        return e === this ? (console.error("THREE.Object3D.add: object can't be added as a child of itself.", e),
        this) : (e && e.isObject3D ? (e.parent !== null && e.parent.remove(e),
        e.parent = this,
        this.children.push(e),
        e.dispatchEvent(_addedEvent)) : console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.", e),
        this)
    }
    remove(e) {
        if (arguments.length > 1) {
            for (let i = 0; i < arguments.length; i++)
                this.remove(arguments[i]);
            return this
        }
        const t = this.children.indexOf(e);
        return t !== -1 && (e.parent = null,
        this.children.splice(t, 1),
        e.dispatchEvent(_removedEvent)),
        this
    }
    removeFromParent() {
        const e = this.parent;
        return e !== null && e.remove(this),
        this
    }
    clear() {
        for (let e = 0; e < this.children.length; e++) {
            const t = this.children[e];
            t.parent = null,
            t.dispatchEvent(_removedEvent)
        }
        return this.children.length = 0,
        this
    }
    attach(e) {
        return this.updateWorldMatrix(!0, !1),
        _m1$1.copy(this.matrixWorld).invert(),
        e.parent !== null && (e.parent.updateWorldMatrix(!0, !1),
        _m1$1.multiply(e.parent.matrixWorld)),
        e.applyMatrix4(_m1$1),
        this.add(e),
        e.updateWorldMatrix(!1, !0),
        this
    }
    getObjectById(e) {
        return this.getObjectByProperty("id", e)
    }
    getObjectByName(e) {
        return this.getObjectByProperty("name", e)
    }
    getObjectByProperty(e, t) {
        if (this[e] === t)
            return this;
        for (let i = 0, n = this.children.length; i < n; i++) {
            const o = this.children[i].getObjectByProperty(e, t);
            if (o !== void 0)
                return o
        }
    }
    getObjectsByProperty(e, t) {
        let i = [];
        this[e] === t && i.push(this);
        for (let n = 0, r = this.children.length; n < r; n++) {
            const o = this.children[n].getObjectsByProperty(e, t);
            o.length > 0 && (i = i.concat(o))
        }
        return i
    }
    getWorldPosition(e) {
        return this.updateWorldMatrix(!0, !1),
        e.setFromMatrixPosition(this.matrixWorld)
    }
    getWorldQuaternion(e) {
        return this.updateWorldMatrix(!0, !1),
        this.matrixWorld.decompose(_position$3, e, _scale$2),
        e
    }
    getWorldScale(e) {
        return this.updateWorldMatrix(!0, !1),
        this.matrixWorld.decompose(_position$3, _quaternion$2, e),
        e
    }
    getWorldDirection(e) {
        this.updateWorldMatrix(!0, !1);
        const t = this.matrixWorld.elements;
        return e.set(t[8], t[9], t[10]).normalize()
    }
    raycast() {}
    traverse(e) {
        e(this);
        const t = this.children;
        for (let i = 0, n = t.length; i < n; i++)
            t[i].traverse(e)
    }
    traverseVisible(e) {
        if (this.visible === !1)
            return;
        e(this);
        const t = this.children;
        for (let i = 0, n = t.length; i < n; i++)
            t[i].traverseVisible(e)
    }
    traverseAncestors(e) {
        const t = this.parent;
        t !== null && (e(t),
        t.traverseAncestors(e))
    }
    updateMatrix() {
        this.matrix.compose(this.position, this.quaternion, this.scale),
        this.matrixWorldNeedsUpdate = !0
    }
    updateMatrixWorld(e) {
        this.matrixAutoUpdate && this.updateMatrix(),
        (this.matrixWorldNeedsUpdate || e) && (this.parent === null ? this.matrixWorld.copy(this.matrix) : this.matrixWorld.multiplyMatrices(this.parent.matrixWorld, this.matrix),
        this.matrixWorldNeedsUpdate = !1,
        e = !0);
        const t = this.children;
        for (let i = 0, n = t.length; i < n; i++) {
            const r = t[i];
            (r.matrixWorldAutoUpdate === !0 || e === !0) && r.updateMatrixWorld(e)
        }
    }
    updateWorldMatrix(e, t) {
        const i = this.parent;
        if (e === !0 && i !== null && i.matrixWorldAutoUpdate === !0 && i.updateWorldMatrix(!0, !1),
        this.matrixAutoUpdate && this.updateMatrix(),
        this.parent === null ? this.matrixWorld.copy(this.matrix) : this.matrixWorld.multiplyMatrices(this.parent.matrixWorld, this.matrix),
        t === !0) {
            const n = this.children;
            for (let r = 0, o = n.length; r < o; r++) {
                const a = n[r];
                a.matrixWorldAutoUpdate === !0 && a.updateWorldMatrix(!1, !0)
            }
        }
    }
    toJSON(e) {
        const t = e === void 0 || typeof e == "string"
          , i = {};
        t && (e = {
            geometries: {},
            materials: {},
            textures: {},
            images: {},
            shapes: {},
            skeletons: {},
            animations: {},
            nodes: {}
        },
        i.metadata = {
            version: 4.5,
            type: "Object",
            generator: "Object3D.toJSON"
        });
        const n = {};
        n.uuid = this.uuid,
        n.type = this.type,
        this.name !== "" && (n.name = this.name),
        this.castShadow === !0 && (n.castShadow = !0),
        this.receiveShadow === !0 && (n.receiveShadow = !0),
        this.visible === !1 && (n.visible = !1),
        this.frustumCulled === !1 && (n.frustumCulled = !1),
        this.renderOrder !== 0 && (n.renderOrder = this.renderOrder),
        Object.keys(this.userData).length > 0 && (n.userData = this.userData),
        n.layers = this.layers.mask,
        n.matrix = this.matrix.toArray(),
        this.matrixAutoUpdate === !1 && (n.matrixAutoUpdate = !1),
        this.isInstancedMesh && (n.type = "InstancedMesh",
        n.count = this.count,
        n.instanceMatrix = this.instanceMatrix.toJSON(),
        this.instanceColor !== null && (n.instanceColor = this.instanceColor.toJSON()));
        function r(a, c) {
            return a[c.uuid] === void 0 && (a[c.uuid] = c.toJSON(e)),
            c.uuid
        }
        if (this.isScene)
            this.background && (this.background.isColor ? n.background = this.background.toJSON() : this.background.isTexture && (n.background = this.background.toJSON(e).uuid)),
            this.environment && this.environment.isTexture && this.environment.isRenderTargetTexture !== !0 && (n.environment = this.environment.toJSON(e).uuid);
        else if (this.isMesh || this.isLine || this.isPoints) {
            n.geometry = r(e.geometries, this.geometry);
            const a = this.geometry.parameters;
            if (a !== void 0 && a.shapes !== void 0) {
                const c = a.shapes;
                if (Array.isArray(c))
                    for (let l = 0, u = c.length; l < u; l++) {
                        const h = c[l];
                        r(e.shapes, h)
                    }
                else
                    r(e.shapes, c)
            }
        }
        if (this.isSkinnedMesh && (n.bindMode = this.bindMode,
        n.bindMatrix = this.bindMatrix.toArray(),
        this.skeleton !== void 0 && (r(e.skeletons, this.skeleton),
        n.skeleton = this.skeleton.uuid)),
        this.material !== void 0)
            if (Array.isArray(this.material)) {
                const a = [];
                for (let c = 0, l = this.material.length; c < l; c++)
                    a.push(r(e.materials, this.material[c]));
                n.material = a
            } else
                n.material = r(e.materials, this.material);
        if (this.children.length > 0) {
            n.children = [];
            for (let a = 0; a < this.children.length; a++)
                n.children.push(this.children[a].toJSON(e).object)
        }
        if (this.animations.length > 0) {
            n.animations = [];
            for (let a = 0; a < this.animations.length; a++) {
                const c = this.animations[a];
                n.animations.push(r(e.animations, c))
            }
        }
        if (t) {
            const a = o(e.geometries)
              , c = o(e.materials)
              , l = o(e.textures)
              , u = o(e.images)
              , h = o(e.shapes)
              , d = o(e.skeletons)
              , m = o(e.animations)
              , g = o(e.nodes);
            a.length > 0 && (i.geometries = a),
            c.length > 0 && (i.materials = c),
            l.length > 0 && (i.textures = l),
            u.length > 0 && (i.images = u),
            h.length > 0 && (i.shapes = h),
            d.length > 0 && (i.skeletons = d),
            m.length > 0 && (i.animations = m),
            g.length > 0 && (i.nodes = g)
        }
        return i.object = n,
        i;
        function o(a) {
            const c = [];
            for (const l in a) {
                const u = a[l];
                delete u.metadata,
                c.push(u)
            }
            return c
        }
    }
    clone(e) {
        return new this.constructor().copy(this, e)
    }
    copy(e, t=!0) {
        if (this.name = e.name,
        this.up.copy(e.up),
        this.position.copy(e.position),
        this.rotation.order = e.rotation.order,
        this.quaternion.copy(e.quaternion),
        this.scale.copy(e.scale),
        this.matrix.copy(e.matrix),
        this.matrixWorld.copy(e.matrixWorld),
        this.matrixAutoUpdate = e.matrixAutoUpdate,
        this.matrixWorldNeedsUpdate = e.matrixWorldNeedsUpdate,
        this.matrixWorldAutoUpdate = e.matrixWorldAutoUpdate,
        this.layers.mask = e.layers.mask,
        this.visible = e.visible,
        this.castShadow = e.castShadow,
        this.receiveShadow = e.receiveShadow,
        this.frustumCulled = e.frustumCulled,
        this.renderOrder = e.renderOrder,
        this.userData = JSON.parse(JSON.stringify(e.userData)),
        t === !0)
            for (let i = 0; i < e.children.length; i++) {
                const n = e.children[i];
                this.add(n.clone())
            }
        return this
    }
}
Object3D.DefaultUp = new Vector3(0,1,0);
Object3D.DefaultMatrixAutoUpdate = !0;
Object3D.DefaultMatrixWorldAutoUpdate = !0;
const _v0$1 = new Vector3
  , _v1$3 = new Vector3
  , _v2$2 = new Vector3
  , _v3$1 = new Vector3
  , _vab = new Vector3
  , _vac = new Vector3
  , _vbc = new Vector3
  , _vap = new Vector3
  , _vbp = new Vector3
  , _vcp = new Vector3;
class Triangle {
    constructor(e=new Vector3, t=new Vector3, i=new Vector3) {
        this.a = e,
        this.b = t,
        this.c = i
    }
    static getNormal(e, t, i, n) {
        n.subVectors(i, t),
        _v0$1.subVectors(e, t),
        n.cross(_v0$1);
        const r = n.lengthSq();
        return r > 0 ? n.multiplyScalar(1 / Math.sqrt(r)) : n.set(0, 0, 0)
    }
    static getBarycoord(e, t, i, n, r) {
        _v0$1.subVectors(n, t),
        _v1$3.subVectors(i, t),
        _v2$2.subVectors(e, t);
        const o = _v0$1.dot(_v0$1)
          , a = _v0$1.dot(_v1$3)
          , c = _v0$1.dot(_v2$2)
          , l = _v1$3.dot(_v1$3)
          , u = _v1$3.dot(_v2$2)
          , h = o * l - a * a;
        if (h === 0)
            return r.set(-2, -1, -1);
        const d = 1 / h
          , m = (l * c - a * u) * d
          , g = (o * u - a * c) * d;
        return r.set(1 - m - g, g, m)
    }
    static containsPoint(e, t, i, n) {
        return this.getBarycoord(e, t, i, n, _v3$1),
        _v3$1.x >= 0 && _v3$1.y >= 0 && _v3$1.x + _v3$1.y <= 1
    }
    static getUV(e, t, i, n, r, o, a, c) {
        return this.getBarycoord(e, t, i, n, _v3$1),
        c.set(0, 0),
        c.addScaledVector(r, _v3$1.x),
        c.addScaledVector(o, _v3$1.y),
        c.addScaledVector(a, _v3$1.z),
        c
    }
    static isFrontFacing(e, t, i, n) {
        return _v0$1.subVectors(i, t),
        _v1$3.subVectors(e, t),
        _v0$1.cross(_v1$3).dot(n) < 0
    }
    set(e, t, i) {
        return this.a.copy(e),
        this.b.copy(t),
        this.c.copy(i),
        this
    }
    setFromPointsAndIndices(e, t, i, n) {
        return this.a.copy(e[t]),
        this.b.copy(e[i]),
        this.c.copy(e[n]),
        this
    }
    setFromAttributeAndIndices(e, t, i, n) {
        return this.a.fromBufferAttribute(e, t),
        this.b.fromBufferAttribute(e, i),
        this.c.fromBufferAttribute(e, n),
        this
    }
    clone() {
        return new this.constructor().copy(this)
    }
    copy(e) {
        return this.a.copy(e.a),
        this.b.copy(e.b),
        this.c.copy(e.c),
        this
    }
    getArea() {
        return _v0$1.subVectors(this.c, this.b),
        _v1$3.subVectors(this.a, this.b),
        _v0$1.cross(_v1$3).length() * .5
    }
    getMidpoint(e) {
        return e.addVectors(this.a, this.b).add(this.c).multiplyScalar(1 / 3)
    }
    getNormal(e) {
        return Triangle.getNormal(this.a, this.b, this.c, e)
    }
    getPlane(e) {
        return e.setFromCoplanarPoints(this.a, this.b, this.c)
    }
    getBarycoord(e, t) {
        return Triangle.getBarycoord(e, this.a, this.b, this.c, t)
    }
    getUV(e, t, i, n, r) {
        return Triangle.getUV(e, this.a, this.b, this.c, t, i, n, r)
    }
    containsPoint(e) {
        return Triangle.containsPoint(e, this.a, this.b, this.c)
    }
    isFrontFacing(e) {
        return Triangle.isFrontFacing(this.a, this.b, this.c, e)
    }
    intersectsBox(e) {
        return e.intersectsTriangle(this)
    }
    closestPointToPoint(e, t) {
        const i = this.a
          , n = this.b
          , r = this.c;
        let o, a;
        _vab.subVectors(n, i),
        _vac.subVectors(r, i),
        _vap.subVectors(e, i);
        const c = _vab.dot(_vap)
          , l = _vac.dot(_vap);
        if (c <= 0 && l <= 0)
            return t.copy(i);
        _vbp.subVectors(e, n);
        const u = _vab.dot(_vbp)
          , h = _vac.dot(_vbp);
        if (u >= 0 && h <= u)
            return t.copy(n);
        const d = c * h - u * l;
        if (d <= 0 && c >= 0 && u <= 0)
            return o = c / (c - u),
            t.copy(i).addScaledVector(_vab, o);
        _vcp.subVectors(e, r);
        const m = _vab.dot(_vcp)
          , g = _vac.dot(_vcp);
        if (g >= 0 && m <= g)
            return t.copy(r);
        const p = m * l - c * g;
        if (p <= 0 && l >= 0 && g <= 0)
            return a = l / (l - g),
            t.copy(i).addScaledVector(_vac, a);
        const f = u * g - m * h;
        if (f <= 0 && h - u >= 0 && m - g >= 0)
            return _vbc.subVectors(r, n),
            a = (h - u) / (h - u + (m - g)),
            t.copy(n).addScaledVector(_vbc, a);
        const x = 1 / (f + p + d);
        return o = p * x,
        a = d * x,
        t.copy(i).addScaledVector(_vab, o).addScaledVector(_vac, a)
    }
    equals(e) {
        return e.a.equals(this.a) && e.b.equals(this.b) && e.c.equals(this.c)
    }
}
let materialId = 0;
class Material extends EventDispatcher {
    constructor() {
        super(),
        this.isMaterial = !0,
        Object.defineProperty(this, "id", {
            value: materialId++
        }),
        this.uuid = generateUUID(),
        this.name = "",
        this.type = "Material",
        this.blending = NormalBlending,
        this.side = FrontSide,
        this.vertexColors = !1,
        this.opacity = 1,
        this.transparent = !1,
        this.blendSrc = SrcAlphaFactor,
        this.blendDst = OneMinusSrcAlphaFactor,
        this.blendEquation = AddEquation,
        this.blendSrcAlpha = null,
        this.blendDstAlpha = null,
        this.blendEquationAlpha = null,
        this.depthFunc = LessEqualDepth,
        this.depthTest = !0,
        this.depthWrite = !0,
        this.stencilWriteMask = 255,
        this.stencilFunc = AlwaysStencilFunc,
        this.stencilRef = 0,
        this.stencilFuncMask = 255,
        this.stencilFail = KeepStencilOp,
        this.stencilZFail = KeepStencilOp,
        this.stencilZPass = KeepStencilOp,
        this.stencilWrite = !1,
        this.clippingPlanes = null,
        this.clipIntersection = !1,
        this.clipShadows = !1,
        this.shadowSide = null,
        this.colorWrite = !0,
        this.precision = null,
        this.polygonOffset = !1,
        this.polygonOffsetFactor = 0,
        this.polygonOffsetUnits = 0,
        this.dithering = !1,
        this.alphaToCoverage = !1,
        this.premultipliedAlpha = !1,
        this.visible = !0,
        this.toneMapped = !0,
        this.userData = {},
        this.version = 0,
        this._alphaTest = 0
    }
    get alphaTest() {
        return this._alphaTest
    }
    set alphaTest(e) {
        this._alphaTest > 0 != e > 0 && this.version++,
        this._alphaTest = e
    }
    onBuild() {}
    onBeforeRender() {}
    onBeforeCompile() {}
    customProgramCacheKey() {
        return this.onBeforeCompile.toString()
    }
    setValues(e) {
        if (e !== void 0)
            for (const t in e) {
                const i = e[t];
                if (i === void 0) {
                    console.warn("THREE.Material: '" + t + "' parameter is undefined.");
                    continue
                }
                const n = this[t];
                if (n === void 0) {
                    console.warn("THREE." + this.type + ": '" + t + "' is not a property of this material.");
                    continue
                }
                n && n.isColor ? n.set(i) : n && n.isVector3 && i && i.isVector3 ? n.copy(i) : this[t] = i
            }
    }
    toJSON(e) {
        const t = e === void 0 || typeof e == "string";
        t && (e = {
            textures: {},
            images: {}
        });
        const i = {
            metadata: {
                version: 4.5,
                type: "Material",
                generator: "Material.toJSON"
            }
        };
        i.uuid = this.uuid,
        i.type = this.type,
        this.name !== "" && (i.name = this.name),
        this.color && this.color.isColor && (i.color = this.color.getHex()),
        this.roughness !== void 0 && (i.roughness = this.roughness),
        this.metalness !== void 0 && (i.metalness = this.metalness),
        this.sheen !== void 0 && (i.sheen = this.sheen),
        this.sheenColor && this.sheenColor.isColor && (i.sheenColor = this.sheenColor.getHex()),
        this.sheenRoughness !== void 0 && (i.sheenRoughness = this.sheenRoughness),
        this.emissive && this.emissive.isColor && (i.emissive = this.emissive.getHex()),
        this.emissiveIntensity && this.emissiveIntensity !== 1 && (i.emissiveIntensity = this.emissiveIntensity),
        this.specular && this.specular.isColor && (i.specular = this.specular.getHex()),
        this.specularIntensity !== void 0 && (i.specularIntensity = this.specularIntensity),
        this.specularColor && this.specularColor.isColor && (i.specularColor = this.specularColor.getHex()),
        this.shininess !== void 0 && (i.shininess = this.shininess),
        this.clearcoat !== void 0 && (i.clearcoat = this.clearcoat),
        this.clearcoatRoughness !== void 0 && (i.clearcoatRoughness = this.clearcoatRoughness),
        this.clearcoatMap && this.clearcoatMap.isTexture && (i.clearcoatMap = this.clearcoatMap.toJSON(e).uuid),
        this.clearcoatRoughnessMap && this.clearcoatRoughnessMap.isTexture && (i.clearcoatRoughnessMap = this.clearcoatRoughnessMap.toJSON(e).uuid),
        this.clearcoatNormalMap && this.clearcoatNormalMap.isTexture && (i.clearcoatNormalMap = this.clearcoatNormalMap.toJSON(e).uuid,
        i.clearcoatNormalScale = this.clearcoatNormalScale.toArray()),
        this.iridescence !== void 0 && (i.iridescence = this.iridescence),
        this.iridescenceIOR !== void 0 && (i.iridescenceIOR = this.iridescenceIOR),
        this.iridescenceThicknessRange !== void 0 && (i.iridescenceThicknessRange = this.iridescenceThicknessRange),
        this.iridescenceMap && this.iridescenceMap.isTexture && (i.iridescenceMap = this.iridescenceMap.toJSON(e).uuid),
        this.iridescenceThicknessMap && this.iridescenceThicknessMap.isTexture && (i.iridescenceThicknessMap = this.iridescenceThicknessMap.toJSON(e).uuid),
        this.map && this.map.isTexture && (i.map = this.map.toJSON(e).uuid),
        this.matcap && this.matcap.isTexture && (i.matcap = this.matcap.toJSON(e).uuid),
        this.alphaMap && this.alphaMap.isTexture && (i.alphaMap = this.alphaMap.toJSON(e).uuid),
        this.lightMap && this.lightMap.isTexture && (i.lightMap = this.lightMap.toJSON(e).uuid,
        i.lightMapIntensity = this.lightMapIntensity),
        this.aoMap && this.aoMap.isTexture && (i.aoMap = this.aoMap.toJSON(e).uuid,
        i.aoMapIntensity = this.aoMapIntensity),
        this.bumpMap && this.bumpMap.isTexture && (i.bumpMap = this.bumpMap.toJSON(e).uuid,
        i.bumpScale = this.bumpScale),
        this.normalMap && this.normalMap.isTexture && (i.normalMap = this.normalMap.toJSON(e).uuid,
        i.normalMapType = this.normalMapType,
        i.normalScale = this.normalScale.toArray()),
        this.displacementMap && this.displacementMap.isTexture && (i.displacementMap = this.displacementMap.toJSON(e).uuid,
        i.displacementScale = this.displacementScale,
        i.displacementBias = this.displacementBias),
        this.roughnessMap && this.roughnessMap.isTexture && (i.roughnessMap = this.roughnessMap.toJSON(e).uuid),
        this.metalnessMap && this.metalnessMap.isTexture && (i.metalnessMap = this.metalnessMap.toJSON(e).uuid),
        this.emissiveMap && this.emissiveMap.isTexture && (i.emissiveMap = this.emissiveMap.toJSON(e).uuid),
        this.specularMap && this.specularMap.isTexture && (i.specularMap = this.specularMap.toJSON(e).uuid),
        this.specularIntensityMap && this.specularIntensityMap.isTexture && (i.specularIntensityMap = this.specularIntensityMap.toJSON(e).uuid),
        this.specularColorMap && this.specularColorMap.isTexture && (i.specularColorMap = this.specularColorMap.toJSON(e).uuid),
        this.envMap && this.envMap.isTexture && (i.envMap = this.envMap.toJSON(e).uuid,
        this.combine !== void 0 && (i.combine = this.combine)),
        this.envMapIntensity !== void 0 && (i.envMapIntensity = this.envMapIntensity),
        this.reflectivity !== void 0 && (i.reflectivity = this.reflectivity),
        this.refractionRatio !== void 0 && (i.refractionRatio = this.refractionRatio),
        this.gradientMap && this.gradientMap.isTexture && (i.gradientMap = this.gradientMap.toJSON(e).uuid),
        this.transmission !== void 0 && (i.transmission = this.transmission),
        this.transmissionMap && this.transmissionMap.isTexture && (i.transmissionMap = this.transmissionMap.toJSON(e).uuid),
        this.thickness !== void 0 && (i.thickness = this.thickness),
        this.thicknessMap && this.thicknessMap.isTexture && (i.thicknessMap = this.thicknessMap.toJSON(e).uuid),
        this.attenuationDistance !== void 0 && this.attenuationDistance !== 1 / 0 && (i.attenuationDistance = this.attenuationDistance),
        this.attenuationColor !== void 0 && (i.attenuationColor = this.attenuationColor.getHex()),
        this.size !== void 0 && (i.size = this.size),
        this.shadowSide !== null && (i.shadowSide = this.shadowSide),
        this.sizeAttenuation !== void 0 && (i.sizeAttenuation = this.sizeAttenuation),
        this.blending !== NormalBlending && (i.blending = this.blending),
        this.side !== FrontSide && (i.side = this.side),
        this.vertexColors && (i.vertexColors = !0),
        this.opacity < 1 && (i.opacity = this.opacity),
        this.transparent === !0 && (i.transparent = this.transparent),
        i.depthFunc = this.depthFunc,
        i.depthTest = this.depthTest,
        i.depthWrite = this.depthWrite,
        i.colorWrite = this.colorWrite,
        i.stencilWrite = this.stencilWrite,
        i.stencilWriteMask = this.stencilWriteMask,
        i.stencilFunc = this.stencilFunc,
        i.stencilRef = this.stencilRef,
        i.stencilFuncMask = this.stencilFuncMask,
        i.stencilFail = this.stencilFail,
        i.stencilZFail = this.stencilZFail,
        i.stencilZPass = this.stencilZPass,
        this.rotation !== void 0 && this.rotation !== 0 && (i.rotation = this.rotation),
        this.polygonOffset === !0 && (i.polygonOffset = !0),
        this.polygonOffsetFactor !== 0 && (i.polygonOffsetFactor = this.polygonOffsetFactor),
        this.polygonOffsetUnits !== 0 && (i.polygonOffsetUnits = this.polygonOffsetUnits),
        this.linewidth !== void 0 && this.linewidth !== 1 && (i.linewidth = this.linewidth),
        this.dashSize !== void 0 && (i.dashSize = this.dashSize),
        this.gapSize !== void 0 && (i.gapSize = this.gapSize),
        this.scale !== void 0 && (i.scale = this.scale),
        this.dithering === !0 && (i.dithering = !0),
        this.alphaTest > 0 && (i.alphaTest = this.alphaTest),
        this.alphaToCoverage === !0 && (i.alphaToCoverage = this.alphaToCoverage),
        this.premultipliedAlpha === !0 && (i.premultipliedAlpha = this.premultipliedAlpha),
        this.wireframe === !0 && (i.wireframe = this.wireframe),
        this.wireframeLinewidth > 1 && (i.wireframeLinewidth = this.wireframeLinewidth),
        this.wireframeLinecap !== "round" && (i.wireframeLinecap = this.wireframeLinecap),
        this.wireframeLinejoin !== "round" && (i.wireframeLinejoin = this.wireframeLinejoin),
        this.flatShading === !0 && (i.flatShading = this.flatShading),
        this.visible === !1 && (i.visible = !1),
        this.toneMapped === !1 && (i.toneMapped = !1),
        this.fog === !1 && (i.fog = !1),
        Object.keys(this.userData).length > 0 && (i.userData = this.userData);
        function n(r) {
            const o = [];
            for (const a in r) {
                const c = r[a];
                delete c.metadata,
                o.push(c)
            }
            return o
        }
        if (t) {
            const r = n(e.textures)
              , o = n(e.images);
            r.length > 0 && (i.textures = r),
            o.length > 0 && (i.images = o)
        }
        return i
    }
    clone() {
        return new this.constructor().copy(this)
    }
    copy(e) {
        this.name = e.name,
        this.blending = e.blending,
        this.side = e.side,
        this.vertexColors = e.vertexColors,
        this.opacity = e.opacity,
        this.transparent = e.transparent,
        this.blendSrc = e.blendSrc,
        this.blendDst = e.blendDst,
        this.blendEquation = e.blendEquation,
        this.blendSrcAlpha = e.blendSrcAlpha,
        this.blendDstAlpha = e.blendDstAlpha,
        this.blendEquationAlpha = e.blendEquationAlpha,
        this.depthFunc = e.depthFunc,
        this.depthTest = e.depthTest,
        this.depthWrite = e.depthWrite,
        this.stencilWriteMask = e.stencilWriteMask,
        this.stencilFunc = e.stencilFunc,
        this.stencilRef = e.stencilRef,
        this.stencilFuncMask = e.stencilFuncMask,
        this.stencilFail = e.stencilFail,
        this.stencilZFail = e.stencilZFail,
        this.stencilZPass = e.stencilZPass,
        this.stencilWrite = e.stencilWrite;
        const t = e.clippingPlanes;
        let i = null;
        if (t !== null) {
            const n = t.length;
            i = new Array(n);
            for (let r = 0; r !== n; ++r)
                i[r] = t[r].clone()
        }
        return this.clippingPlanes = i,
        this.clipIntersection = e.clipIntersection,
        this.clipShadows = e.clipShadows,
        this.shadowSide = e.shadowSide,
        this.colorWrite = e.colorWrite,
        this.precision = e.precision,
        this.polygonOffset = e.polygonOffset,
        this.polygonOffsetFactor = e.polygonOffsetFactor,
        this.polygonOffsetUnits = e.polygonOffsetUnits,
        this.dithering = e.dithering,
        this.alphaTest = e.alphaTest,
        this.alphaToCoverage = e.alphaToCoverage,
        this.premultipliedAlpha = e.premultipliedAlpha,
        this.visible = e.visible,
        this.toneMapped = e.toneMapped,
        this.userData = JSON.parse(JSON.stringify(e.userData)),
        this
    }
    dispose() {
        this.dispatchEvent({
            type: "dispose"
        })
    }
    set needsUpdate(e) {
        e === !0 && this.version++
    }
}
class MeshBasicMaterial extends Material {
    constructor(e) {
        super(),
        this.isMeshBasicMaterial = !0,
        this.type = "MeshBasicMaterial",
        this.color = new Color(16777215),
        this.map = null,
        this.lightMap = null,
        this.lightMapIntensity = 1,
        this.aoMap = null,
        this.aoMapIntensity = 1,
        this.specularMap = null,
        this.alphaMap = null,
        this.envMap = null,
        this.combine = MultiplyOperation,
        this.reflectivity = 1,
        this.refractionRatio = .98,
        this.wireframe = !1,
        this.wireframeLinewidth = 1,
        this.wireframeLinecap = "round",
        this.wireframeLinejoin = "round",
        this.fog = !0,
        this.setValues(e)
    }
    copy(e) {
        return super.copy(e),
        this.color.copy(e.color),
        this.map = e.map,
        this.lightMap = e.lightMap,
        this.lightMapIntensity = e.lightMapIntensity,
        this.aoMap = e.aoMap,
        this.aoMapIntensity = e.aoMapIntensity,
        this.specularMap = e.specularMap,
        this.alphaMap = e.alphaMap,
        this.envMap = e.envMap,
        this.combine = e.combine,
        this.reflectivity = e.reflectivity,
        this.refractionRatio = e.refractionRatio,
        this.wireframe = e.wireframe,
        this.wireframeLinewidth = e.wireframeLinewidth,
        this.wireframeLinecap = e.wireframeLinecap,
        this.wireframeLinejoin = e.wireframeLinejoin,
        this.fog = e.fog,
        this
    }
}
const _vector$9 = new Vector3
  , _vector2$1 = new Vector2;
class BufferAttribute {
    constructor(e, t, i=!1) {
        if (Array.isArray(e))
            throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");
        this.isBufferAttribute = !0,
        this.name = "",
        this.array = e,
        this.itemSize = t,
        this.count = e !== void 0 ? e.length / t : 0,
        this.normalized = i,
        this.usage = StaticDrawUsage,
        this.updateRange = {
            offset: 0,
            count: -1
        },
        this.version = 0
    }
    onUploadCallback() {}
    set needsUpdate(e) {
        e === !0 && this.version++
    }
    setUsage(e) {
        return this.usage = e,
        this
    }
    copy(e) {
        return this.name = e.name,
        this.array = new e.array.constructor(e.array),
        this.itemSize = e.itemSize,
        this.count = e.count,
        this.normalized = e.normalized,
        this.usage = e.usage,
        this
    }
    copyAt(e, t, i) {
        e *= this.itemSize,
        i *= t.itemSize;
        for (let n = 0, r = this.itemSize; n < r; n++)
            this.array[e + n] = t.array[i + n];
        return this
    }
    copyArray(e) {
        return this.array.set(e),
        this
    }
    applyMatrix3(e) {
        if (this.itemSize === 2)
            for (let t = 0, i = this.count; t < i; t++)
                _vector2$1.fromBufferAttribute(this, t),
                _vector2$1.applyMatrix3(e),
                this.setXY(t, _vector2$1.x, _vector2$1.y);
        else if (this.itemSize === 3)
            for (let t = 0, i = this.count; t < i; t++)
                _vector$9.fromBufferAttribute(this, t),
                _vector$9.applyMatrix3(e),
                this.setXYZ(t, _vector$9.x, _vector$9.y, _vector$9.z);
        return this
    }
    applyMatrix4(e) {
        for (let t = 0, i = this.count; t < i; t++)
            _vector$9.fromBufferAttribute(this, t),
            _vector$9.applyMatrix4(e),
            this.setXYZ(t, _vector$9.x, _vector$9.y, _vector$9.z);
        return this
    }
    applyNormalMatrix(e) {
        for (let t = 0, i = this.count; t < i; t++)
            _vector$9.fromBufferAttribute(this, t),
            _vector$9.applyNormalMatrix(e),
            this.setXYZ(t, _vector$9.x, _vector$9.y, _vector$9.z);
        return this
    }
    transformDirection(e) {
        for (let t = 0, i = this.count; t < i; t++)
            _vector$9.fromBufferAttribute(this, t),
            _vector$9.transformDirection(e),
            this.setXYZ(t, _vector$9.x, _vector$9.y, _vector$9.z);
        return this
    }
    set(e, t=0) {
        return this.array.set(e, t),
        this
    }
    getX(e) {
        let t = this.array[e * this.itemSize];
        return this.normalized && (t = denormalize(t, this.array)),
        t
    }
    setX(e, t) {
        return this.normalized && (t = normalize(t, this.array)),
        this.array[e * this.itemSize] = t,
        this
    }
    getY(e) {
        let t = this.array[e * this.itemSize + 1];
        return this.normalized && (t = denormalize(t, this.array)),
        t
    }
    setY(e, t) {
        return this.normalized && (t = normalize(t, this.array)),
        this.array[e * this.itemSize + 1] = t,
        this
    }
    getZ(e) {
        let t = this.array[e * this.itemSize + 2];
        return this.normalized && (t = denormalize(t, this.array)),
        t
    }
    setZ(e, t) {
        return this.normalized && (t = normalize(t, this.array)),
        this.array[e * this.itemSize + 2] = t,
        this
    }
    getW(e) {
        let t = this.array[e * this.itemSize + 3];
        return this.normalized && (t = denormalize(t, this.array)),
        t
    }
    setW(e, t) {
        return this.normalized && (t = normalize(t, this.array)),
        this.array[e * this.itemSize + 3] = t,
        this
    }
    setXY(e, t, i) {
        return e *= this.itemSize,
        this.normalized && (t = normalize(t, this.array),
        i = normalize(i, this.array)),
        this.array[e + 0] = t,
        this.array[e + 1] = i,
        this
    }
    setXYZ(e, t, i, n) {
        return e *= this.itemSize,
        this.normalized && (t = normalize(t, this.array),
        i = normalize(i, this.array),
        n = normalize(n, this.array)),
        this.array[e + 0] = t,
        this.array[e + 1] = i,
        this.array[e + 2] = n,
        this
    }
    setXYZW(e, t, i, n, r) {
        return e *= this.itemSize,
        this.normalized && (t = normalize(t, this.array),
        i = normalize(i, this.array),
        n = normalize(n, this.array),
        r = normalize(r, this.array)),
        this.array[e + 0] = t,
        this.array[e + 1] = i,
        this.array[e + 2] = n,
        this.array[e + 3] = r,
        this
    }
    onUpload(e) {
        return this.onUploadCallback = e,
        this
    }
    clone() {
        return new this.constructor(this.array,this.itemSize).copy(this)
    }
    toJSON() {
        const e = {
            itemSize: this.itemSize,
            type: this.array.constructor.name,
            array: Array.from(this.array),
            normalized: this.normalized
        };
        return this.name !== "" && (e.name = this.name),
        this.usage !== StaticDrawUsage && (e.usage = this.usage),
        (this.updateRange.offset !== 0 || this.updateRange.count !== -1) && (e.updateRange = this.updateRange),
        e
    }
    copyColorsArray() {
        console.error("THREE.BufferAttribute: copyColorsArray() was removed in r144.")
    }
    copyVector2sArray() {
        console.error("THREE.BufferAttribute: copyVector2sArray() was removed in r144.")
    }
    copyVector3sArray() {
        console.error("THREE.BufferAttribute: copyVector3sArray() was removed in r144.")
    }
    copyVector4sArray() {
        console.error("THREE.BufferAttribute: copyVector4sArray() was removed in r144.")
    }
}
class Uint16BufferAttribute extends BufferAttribute {
    constructor(e, t, i) {
        super(new Uint16Array(e), t, i)
    }
}
class Uint32BufferAttribute extends BufferAttribute {
    constructor(e, t, i) {
        super(new Uint32Array(e), t, i)
    }
}
class Float32BufferAttribute extends BufferAttribute {
    constructor(e, t, i) {
        super(new Float32Array(e), t, i)
    }
}
let _id$1 = 0;
const _m1 = new Matrix4
  , _obj = new Object3D
  , _offset = new Vector3
  , _box$1 = new Box3
  , _boxMorphTargets = new Box3
  , _vector$8 = new Vector3;
class BufferGeometry extends EventDispatcher {
    constructor() {
        super(),
        this.isBufferGeometry = !0,
        Object.defineProperty(this, "id", {
            value: _id$1++
        }),
        this.uuid = generateUUID(),
        this.name = "",
        this.type = "BufferGeometry",
        this.index = null,
        this.attributes = {},
        this.morphAttributes = {},
        this.morphTargetsRelative = !1,
        this.groups = [],
        this.boundingBox = null,
        this.boundingSphere = null,
        this.drawRange = {
            start: 0,
            count: 1 / 0
        },
        this.userData = {}
    }
    getIndex() {
        return this.index
    }
    setIndex(e) {
        return Array.isArray(e) ? this.index = new (arrayNeedsUint32(e) ? Uint32BufferAttribute : Uint16BufferAttribute)(e,1) : this.index = e,
        this
    }
    getAttribute(e) {
        return this.attributes[e]
    }
    setAttribute(e, t) {
        return this.attributes[e] = t,
        this
    }
    deleteAttribute(e) {
        return delete this.attributes[e],
        this
    }
    hasAttribute(e) {
        return this.attributes[e] !== void 0
    }
    addGroup(e, t, i=0) {
        this.groups.push({
            start: e,
            count: t,
            materialIndex: i
        })
    }
    clearGroups() {
        this.groups = []
    }
    setDrawRange(e, t) {
        this.drawRange.start = e,
        this.drawRange.count = t
    }
    applyMatrix4(e) {
        const t = this.attributes.position;
        t !== void 0 && (t.applyMatrix4(e),
        t.needsUpdate = !0);
        const i = this.attributes.normal;
        if (i !== void 0) {
            const r = new Matrix3().getNormalMatrix(e);
            i.applyNormalMatrix(r),
            i.needsUpdate = !0
        }
        const n = this.attributes.tangent;
        return n !== void 0 && (n.transformDirection(e),
        n.needsUpdate = !0),
        this.boundingBox !== null && this.computeBoundingBox(),
        this.boundingSphere !== null && this.computeBoundingSphere(),
        this
    }
    applyQuaternion(e) {
        return _m1.makeRotationFromQuaternion(e),
        this.applyMatrix4(_m1),
        this
    }
    rotateX(e) {
        return _m1.makeRotationX(e),
        this.applyMatrix4(_m1),
        this
    }
    rotateY(e) {
        return _m1.makeRotationY(e),
        this.applyMatrix4(_m1),
        this
    }
    rotateZ(e) {
        return _m1.makeRotationZ(e),
        this.applyMatrix4(_m1),
        this
    }
    translate(e, t, i) {
        return _m1.makeTranslation(e, t, i),
        this.applyMatrix4(_m1),
        this
    }
    scale(e, t, i) {
        return _m1.makeScale(e, t, i),
        this.applyMatrix4(_m1),
        this
    }
    lookAt(e) {
        return _obj.lookAt(e),
        _obj.updateMatrix(),
        this.applyMatrix4(_obj.matrix),
        this
    }
    center() {
        return this.computeBoundingBox(),
        this.boundingBox.getCenter(_offset).negate(),
        this.translate(_offset.x, _offset.y, _offset.z),
        this
    }
    setFromPoints(e) {
        const t = [];
        for (let i = 0, n = e.length; i < n; i++) {
            const r = e[i];
            t.push(r.x, r.y, r.z || 0)
        }
        return this.setAttribute("position", new Float32BufferAttribute(t,3)),
        this
    }
    computeBoundingBox() {
        this.boundingBox === null && (this.boundingBox = new Box3);
        const e = this.attributes.position
          , t = this.morphAttributes.position;
        if (e && e.isGLBufferAttribute) {
            console.error('THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box. Alternatively set "mesh.frustumCulled" to "false".', this),
            this.boundingBox.set(new Vector3(-1 / 0,-1 / 0,-1 / 0), new Vector3(1 / 0,1 / 0,1 / 0));
            return
        }
        if (e !== void 0) {
            if (this.boundingBox.setFromBufferAttribute(e),
            t)
                for (let i = 0, n = t.length; i < n; i++) {
                    const r = t[i];
                    _box$1.setFromBufferAttribute(r),
                    this.morphTargetsRelative ? (_vector$8.addVectors(this.boundingBox.min, _box$1.min),
                    this.boundingBox.expandByPoint(_vector$8),
                    _vector$8.addVectors(this.boundingBox.max, _box$1.max),
                    this.boundingBox.expandByPoint(_vector$8)) : (this.boundingBox.expandByPoint(_box$1.min),
                    this.boundingBox.expandByPoint(_box$1.max))
                }
        } else
            this.boundingBox.makeEmpty();
        (isNaN(this.boundingBox.min.x) || isNaN(this.boundingBox.min.y) || isNaN(this.boundingBox.min.z)) && console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.', this)
    }
    computeBoundingSphere() {
        this.boundingSphere === null && (this.boundingSphere = new Sphere);
        const e = this.attributes.position
          , t = this.morphAttributes.position;
        if (e && e.isGLBufferAttribute) {
            console.error('THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere. Alternatively set "mesh.frustumCulled" to "false".', this),
            this.boundingSphere.set(new Vector3, 1 / 0);
            return
        }
        if (e) {
            const i = this.boundingSphere.center;
            if (_box$1.setFromBufferAttribute(e),
            t)
                for (let r = 0, o = t.length; r < o; r++) {
                    const a = t[r];
                    _boxMorphTargets.setFromBufferAttribute(a),
                    this.morphTargetsRelative ? (_vector$8.addVectors(_box$1.min, _boxMorphTargets.min),
                    _box$1.expandByPoint(_vector$8),
                    _vector$8.addVectors(_box$1.max, _boxMorphTargets.max),
                    _box$1.expandByPoint(_vector$8)) : (_box$1.expandByPoint(_boxMorphTargets.min),
                    _box$1.expandByPoint(_boxMorphTargets.max))
                }
            _box$1.getCenter(i);
            let n = 0;
            for (let r = 0, o = e.count; r < o; r++)
                _vector$8.fromBufferAttribute(e, r),
                n = Math.max(n, i.distanceToSquared(_vector$8));
            if (t)
                for (let r = 0, o = t.length; r < o; r++) {
                    const a = t[r]
                      , c = this.morphTargetsRelative;
                    for (let l = 0, u = a.count; l < u; l++)
                        _vector$8.fromBufferAttribute(a, l),
                        c && (_offset.fromBufferAttribute(e, l),
                        _vector$8.add(_offset)),
                        n = Math.max(n, i.distanceToSquared(_vector$8))
                }
            this.boundingSphere.radius = Math.sqrt(n),
            isNaN(this.boundingSphere.radius) && console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.', this)
        }
    }
    computeTangents() {
        const e = this.index
          , t = this.attributes;
        if (e === null || t.position === void 0 || t.normal === void 0 || t.uv === void 0) {
            console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");
            return
        }
        const i = e.array
          , n = t.position.array
          , r = t.normal.array
          , o = t.uv.array
          , a = n.length / 3;
        this.hasAttribute("tangent") === !1 && this.setAttribute("tangent", new BufferAttribute(new Float32Array(4 * a),4));
        const c = this.getAttribute("tangent").array
          , l = []
          , u = [];
        for (let D = 0; D < a; D++)
            l[D] = new Vector3,
            u[D] = new Vector3;
        const h = new Vector3
          , d = new Vector3
          , m = new Vector3
          , g = new Vector2
          , p = new Vector2
          , f = new Vector2
          , x = new Vector3
          , S = new Vector3;
        function v(D, $, R) {
            h.fromArray(n, D * 3),
            d.fromArray(n, $ * 3),
            m.fromArray(n, R * 3),
            g.fromArray(o, D * 2),
            p.fromArray(o, $ * 2),
            f.fromArray(o, R * 2),
            d.sub(h),
            m.sub(h),
            p.sub(g),
            f.sub(g);
            const T = 1 / (p.x * f.y - f.x * p.y);
            isFinite(T) && (x.copy(d).multiplyScalar(f.y).addScaledVector(m, -p.y).multiplyScalar(T),
            S.copy(m).multiplyScalar(p.x).addScaledVector(d, -f.x).multiplyScalar(T),
            l[D].add(x),
            l[$].add(x),
            l[R].add(x),
            u[D].add(S),
            u[$].add(S),
            u[R].add(S))
        }
        let M = this.groups;
        M.length === 0 && (M = [{
            start: 0,
            count: i.length
        }]);
        for (let D = 0, $ = M.length; D < $; ++D) {
            const R = M[D]
              , T = R.start
              , C = R.count;
            for (let F = T, U = T + C; F < U; F += 3)
                v(i[F + 0], i[F + 1], i[F + 2])
        }
        const y = new Vector3
          , A = new Vector3
          , P = new Vector3
          , _ = new Vector3;
        function L(D) {
            P.fromArray(r, D * 3),
            _.copy(P);
            const $ = l[D];
            y.copy($),
            y.sub(P.multiplyScalar(P.dot($))).normalize(),
            A.crossVectors(_, $);
            const T = A.dot(u[D]) < 0 ? -1 : 1;
            c[D * 4] = y.x,
            c[D * 4 + 1] = y.y,
            c[D * 4 + 2] = y.z,
            c[D * 4 + 3] = T
        }
        for (let D = 0, $ = M.length; D < $; ++D) {
            const R = M[D]
              , T = R.start
              , C = R.count;
            for (let F = T, U = T + C; F < U; F += 3)
                L(i[F + 0]),
                L(i[F + 1]),
                L(i[F + 2])
        }
    }
    computeVertexNormals() {
        const e = this.index
          , t = this.getAttribute("position");
        if (t !== void 0) {
            let i = this.getAttribute("normal");
            if (i === void 0)
                i = new BufferAttribute(new Float32Array(t.count * 3),3),
                this.setAttribute("normal", i);
            else
                for (let d = 0, m = i.count; d < m; d++)
                    i.setXYZ(d, 0, 0, 0);
            const n = new Vector3
              , r = new Vector3
              , o = new Vector3
              , a = new Vector3
              , c = new Vector3
              , l = new Vector3
              , u = new Vector3
              , h = new Vector3;
            if (e)
                for (let d = 0, m = e.count; d < m; d += 3) {
                    const g = e.getX(d + 0)
                      , p = e.getX(d + 1)
                      , f = e.getX(d + 2);
                    n.fromBufferAttribute(t, g),
                    r.fromBufferAttribute(t, p),
                    o.fromBufferAttribute(t, f),
                    u.subVectors(o, r),
                    h.subVectors(n, r),
                    u.cross(h),
                    a.fromBufferAttribute(i, g),
                    c.fromBufferAttribute(i, p),
                    l.fromBufferAttribute(i, f),
                    a.add(u),
                    c.add(u),
                    l.add(u),
                    i.setXYZ(g, a.x, a.y, a.z),
                    i.setXYZ(p, c.x, c.y, c.z),
                    i.setXYZ(f, l.x, l.y, l.z)
                }
            else
                for (let d = 0, m = t.count; d < m; d += 3)
                    n.fromBufferAttribute(t, d + 0),
                    r.fromBufferAttribute(t, d + 1),
                    o.fromBufferAttribute(t, d + 2),
                    u.subVectors(o, r),
                    h.subVectors(n, r),
                    u.cross(h),
                    i.setXYZ(d + 0, u.x, u.y, u.z),
                    i.setXYZ(d + 1, u.x, u.y, u.z),
                    i.setXYZ(d + 2, u.x, u.y, u.z);
            this.normalizeNormals(),
            i.needsUpdate = !0
        }
    }
    merge() {
        return console.error("THREE.BufferGeometry.merge() has been removed. Use THREE.BufferGeometryUtils.mergeBufferGeometries() instead."),
        this
    }
    normalizeNormals() {
        const e = this.attributes.normal;
        for (let t = 0, i = e.count; t < i; t++)
            _vector$8.fromBufferAttribute(e, t),
            _vector$8.normalize(),
            e.setXYZ(t, _vector$8.x, _vector$8.y, _vector$8.z)
    }
    toNonIndexed() {
        function e(a, c) {
            const l = a.array
              , u = a.itemSize
              , h = a.normalized
              , d = new l.constructor(c.length * u);
            let m = 0
              , g = 0;
            for (let p = 0, f = c.length; p < f; p++) {
                a.isInterleavedBufferAttribute ? m = c[p] * a.data.stride + a.offset : m = c[p] * u;
                for (let x = 0; x < u; x++)
                    d[g++] = l[m++]
            }
            return new BufferAttribute(d,u,h)
        }
        if (this.index === null)
            return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),
            this;
        const t = new BufferGeometry
          , i = this.index.array
          , n = this.attributes;
        for (const a in n) {
            const c = n[a]
              , l = e(c, i);
            t.setAttribute(a, l)
        }
        const r = this.morphAttributes;
        for (const a in r) {
            const c = []
              , l = r[a];
            for (let u = 0, h = l.length; u < h; u++) {
                const d = l[u]
                  , m = e(d, i);
                c.push(m)
            }
            t.morphAttributes[a] = c
        }
        t.morphTargetsRelative = this.morphTargetsRelative;
        const o = this.groups;
        for (let a = 0, c = o.length; a < c; a++) {
            const l = o[a];
            t.addGroup(l.start, l.count, l.materialIndex)
        }
        return t
    }
    toJSON() {
        const e = {
            metadata: {
                version: 4.5,
                type: "BufferGeometry",
                generator: "BufferGeometry.toJSON"
            }
        };
        if (e.uuid = this.uuid,
        e.type = this.type,
        this.name !== "" && (e.name = this.name),
        Object.keys(this.userData).length > 0 && (e.userData = this.userData),
        this.parameters !== void 0) {
            const c = this.parameters;
            for (const l in c)
                c[l] !== void 0 && (e[l] = c[l]);
            return e
        }
        e.data = {
            attributes: {}
        };
        const t = this.index;
        t !== null && (e.data.index = {
            type: t.array.constructor.name,
            array: Array.prototype.slice.call(t.array)
        });
        const i = this.attributes;
        for (const c in i) {
            const l = i[c];
            e.data.attributes[c] = l.toJSON(e.data)
        }
        const n = {};
        let r = !1;
        for (const c in this.morphAttributes) {
            const l = this.morphAttributes[c]
              , u = [];
            for (let h = 0, d = l.length; h < d; h++) {
                const m = l[h];
                u.push(m.toJSON(e.data))
            }
            u.length > 0 && (n[c] = u,
            r = !0)
        }
        r && (e.data.morphAttributes = n,
        e.data.morphTargetsRelative = this.morphTargetsRelative);
        const o = this.groups;
        o.length > 0 && (e.data.groups = JSON.parse(JSON.stringify(o)));
        const a = this.boundingSphere;
        return a !== null && (e.data.boundingSphere = {
            center: a.center.toArray(),
            radius: a.radius
        }),
        e
    }
    clone() {
        return new this.constructor().copy(this)
    }
    copy(e) {
        this.index = null,
        this.attributes = {},
        this.morphAttributes = {},
        this.groups = [],
        this.boundingBox = null,
        this.boundingSphere = null;
        const t = {};
        this.name = e.name;
        const i = e.index;
        i !== null && this.setIndex(i.clone(t));
        const n = e.attributes;
        for (const l in n) {
            const u = n[l];
            this.setAttribute(l, u.clone(t))
        }
        const r = e.morphAttributes;
        for (const l in r) {
            const u = []
              , h = r[l];
            for (let d = 0, m = h.length; d < m; d++)
                u.push(h[d].clone(t));
            this.morphAttributes[l] = u
        }
        this.morphTargetsRelative = e.morphTargetsRelative;
        const o = e.groups;
        for (let l = 0, u = o.length; l < u; l++) {
            const h = o[l];
            this.addGroup(h.start, h.count, h.materialIndex)
        }
        const a = e.boundingBox;
        a !== null && (this.boundingBox = a.clone());
        const c = e.boundingSphere;
        return c !== null && (this.boundingSphere = c.clone()),
        this.drawRange.start = e.drawRange.start,
        this.drawRange.count = e.drawRange.count,
        this.userData = e.userData,
        e.parameters !== void 0 && (this.parameters = Object.assign({}, e.parameters)),
        this
    }
    dispose() {
        this.dispatchEvent({
            type: "dispose"
        })
    }
}
const _inverseMatrix$2 = new Matrix4
  , _ray$2 = new Ray
  , _sphere$3 = new Sphere
  , _vA$1 = new Vector3
  , _vB$1 = new Vector3
  , _vC$1 = new Vector3
  , _tempA = new Vector3
  , _morphA = new Vector3
  , _uvA$1 = new Vector2
  , _uvB$1 = new Vector2
  , _uvC$1 = new Vector2
  , _intersectionPoint = new Vector3
  , _intersectionPointWorld = new Vector3;
class Mesh extends Object3D {
    constructor(e=new BufferGeometry, t=new MeshBasicMaterial) {
        super(),
        this.isMesh = !0,
        this.type = "Mesh",
        this.geometry = e,
        this.material = t,
        this.updateMorphTargets()
    }
    copy(e, t) {
        return super.copy(e, t),
        e.morphTargetInfluences !== void 0 && (this.morphTargetInfluences = e.morphTargetInfluences.slice()),
        e.morphTargetDictionary !== void 0 && (this.morphTargetDictionary = Object.assign({}, e.morphTargetDictionary)),
        this.material = e.material,
        this.geometry = e.geometry,
        this
    }
    updateMorphTargets() {
        const t = this.geometry.morphAttributes
          , i = Object.keys(t);
        if (i.length > 0) {
            const n = t[i[0]];
            if (n !== void 0) {
                this.morphTargetInfluences = [],
                this.morphTargetDictionary = {};
                for (let r = 0, o = n.length; r < o; r++) {
                    const a = n[r].name || String(r);
                    this.morphTargetInfluences.push(0),
                    this.morphTargetDictionary[a] = r
                }
            }
        }
    }
    getVertexPosition(e, t) {
        const i = this.geometry
          , n = i.attributes.position
          , r = i.morphAttributes.position
          , o = i.morphTargetsRelative;
        t.fromBufferAttribute(n, e);
        const a = this.morphTargetInfluences;
        if (r && a) {
            _morphA.set(0, 0, 0);
            for (let c = 0, l = r.length; c < l; c++) {
                const u = a[c]
                  , h = r[c];
                u !== 0 && (_tempA.fromBufferAttribute(h, e),
                o ? _morphA.addScaledVector(_tempA, u) : _morphA.addScaledVector(_tempA.sub(t), u))
            }
            t.add(_morphA)
        }
        return this.isSkinnedMesh && this.boneTransform(e, t),
        t
    }
    raycast(e, t) {
        const i = this.geometry
          , n = this.material
          , r = this.matrixWorld;
        if (n === void 0 || (i.boundingSphere === null && i.computeBoundingSphere(),
        _sphere$3.copy(i.boundingSphere),
        _sphere$3.applyMatrix4(r),
        e.ray.intersectsSphere(_sphere$3) === !1) || (_inverseMatrix$2.copy(r).invert(),
        _ray$2.copy(e.ray).applyMatrix4(_inverseMatrix$2),
        i.boundingBox !== null && _ray$2.intersectsBox(i.boundingBox) === !1))
            return;
        let o;
        const a = i.index
          , c = i.attributes.position
          , l = i.attributes.uv
          , u = i.attributes.uv2
          , h = i.groups
          , d = i.drawRange;
        if (a !== null)
            if (Array.isArray(n))
                for (let m = 0, g = h.length; m < g; m++) {
                    const p = h[m]
                      , f = n[p.materialIndex]
                      , x = Math.max(p.start, d.start)
                      , S = Math.min(a.count, Math.min(p.start + p.count, d.start + d.count));
                    for (let v = x, M = S; v < M; v += 3) {
                        const y = a.getX(v)
                          , A = a.getX(v + 1)
                          , P = a.getX(v + 2);
                        o = checkBufferGeometryIntersection(this, f, e, _ray$2, l, u, y, A, P),
                        o && (o.faceIndex = Math.floor(v / 3),
                        o.face.materialIndex = p.materialIndex,
                        t.push(o))
                    }
                }
            else {
                const m = Math.max(0, d.start)
                  , g = Math.min(a.count, d.start + d.count);
                for (let p = m, f = g; p < f; p += 3) {
                    const x = a.getX(p)
                      , S = a.getX(p + 1)
                      , v = a.getX(p + 2);
                    o = checkBufferGeometryIntersection(this, n, e, _ray$2, l, u, x, S, v),
                    o && (o.faceIndex = Math.floor(p / 3),
                    t.push(o))
                }
            }
        else if (c !== void 0)
            if (Array.isArray(n))
                for (let m = 0, g = h.length; m < g; m++) {
                    const p = h[m]
                      , f = n[p.materialIndex]
                      , x = Math.max(p.start, d.start)
                      , S = Math.min(c.count, Math.min(p.start + p.count, d.start + d.count));
                    for (let v = x, M = S; v < M; v += 3) {
                        const y = v
                          , A = v + 1
                          , P = v + 2;
                        o = checkBufferGeometryIntersection(this, f, e, _ray$2, l, u, y, A, P),
                        o && (o.faceIndex = Math.floor(v / 3),
                        o.face.materialIndex = p.materialIndex,
                        t.push(o))
                    }
                }
            else {
                const m = Math.max(0, d.start)
                  , g = Math.min(c.count, d.start + d.count);
                for (let p = m, f = g; p < f; p += 3) {
                    const x = p
                      , S = p + 1
                      , v = p + 2;
                    o = checkBufferGeometryIntersection(this, n, e, _ray$2, l, u, x, S, v),
                    o && (o.faceIndex = Math.floor(p / 3),
                    t.push(o))
                }
            }
    }
}
function checkIntersection(s, e, t, i, n, r, o, a) {
    let c;
    if (e.side === BackSide ? c = i.intersectTriangle(o, r, n, !0, a) : c = i.intersectTriangle(n, r, o, e.side === FrontSide, a),
    c === null)
        return null;
    _intersectionPointWorld.copy(a),
    _intersectionPointWorld.applyMatrix4(s.matrixWorld);
    const l = t.ray.origin.distanceTo(_intersectionPointWorld);
    return l < t.near || l > t.far ? null : {
        distance: l,
        point: _intersectionPointWorld.clone(),
        object: s
    }
}
function checkBufferGeometryIntersection(s, e, t, i, n, r, o, a, c) {
    s.getVertexPosition(o, _vA$1),
    s.getVertexPosition(a, _vB$1),
    s.getVertexPosition(c, _vC$1);
    const l = checkIntersection(s, e, t, i, _vA$1, _vB$1, _vC$1, _intersectionPoint);
    if (l) {
        n && (_uvA$1.fromBufferAttribute(n, o),
        _uvB$1.fromBufferAttribute(n, a),
        _uvC$1.fromBufferAttribute(n, c),
        l.uv = Triangle.getUV(_intersectionPoint, _vA$1, _vB$1, _vC$1, _uvA$1, _uvB$1, _uvC$1, new Vector2)),
        r && (_uvA$1.fromBufferAttribute(r, o),
        _uvB$1.fromBufferAttribute(r, a),
        _uvC$1.fromBufferAttribute(r, c),
        l.uv2 = Triangle.getUV(_intersectionPoint, _vA$1, _vB$1, _vC$1, _uvA$1, _uvB$1, _uvC$1, new Vector2));
        const u = {
            a: o,
            b: a,
            c,
            normal: new Vector3,
            materialIndex: 0
        };
        Triangle.getNormal(_vA$1, _vB$1, _vC$1, u.normal),
        l.face = u
    }
    return l
}
class BoxGeometry extends BufferGeometry {
    constructor(e=1, t=1, i=1, n=1, r=1, o=1) {
        super(),
        this.type = "BoxGeometry",
        this.parameters = {
            width: e,
            height: t,
            depth: i,
            widthSegments: n,
            heightSegments: r,
            depthSegments: o
        };
        const a = this;
        n = Math.floor(n),
        r = Math.floor(r),
        o = Math.floor(o);
        const c = []
          , l = []
          , u = []
          , h = [];
        let d = 0
          , m = 0;
        g("z", "y", "x", -1, -1, i, t, e, o, r, 0),
        g("z", "y", "x", 1, -1, i, t, -e, o, r, 1),
        g("x", "z", "y", 1, 1, e, i, t, n, o, 2),
        g("x", "z", "y", 1, -1, e, i, -t, n, o, 3),
        g("x", "y", "z", 1, -1, e, t, i, n, r, 4),
        g("x", "y", "z", -1, -1, e, t, -i, n, r, 5),
        this.setIndex(c),
        this.setAttribute("position", new Float32BufferAttribute(l,3)),
        this.setAttribute("normal", new Float32BufferAttribute(u,3)),
        this.setAttribute("uv", new Float32BufferAttribute(h,2));
        function g(p, f, x, S, v, M, y, A, P, _, L) {
            const D = M / P
              , $ = y / _
              , R = M / 2
              , T = y / 2
              , C = A / 2
              , F = P + 1
              , U = _ + 1;
            let z = 0
              , B = 0;
            const Z = new Vector3;
            for (let j = 0; j < U; j++) {
                const V = j * $ - T;
                for (let k = 0; k < F; k++) {
                    const K = k * D - R;
                    Z[p] = K * S,
                    Z[f] = V * v,
                    Z[x] = C,
                    l.push(Z.x, Z.y, Z.z),
                    Z[p] = 0,
                    Z[f] = 0,
                    Z[x] = A > 0 ? 1 : -1,
                    u.push(Z.x, Z.y, Z.z),
                    h.push(k / P),
                    h.push(1 - j / _),
                    z += 1
                }
            }
            for (let j = 0; j < _; j++)
                for (let V = 0; V < P; V++) {
                    const k = d + V + F * j
                      , K = d + V + F * (j + 1)
                      , ee = d + (V + 1) + F * (j + 1)
                      , ie = d + (V + 1) + F * j;
                    c.push(k, K, ie),
                    c.push(K, ee, ie),
                    B += 6
                }
            a.addGroup(m, B, L),
            m += B,
            d += z
        }
    }
    static fromJSON(e) {
        return new BoxGeometry(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)
    }
}
function cloneUniforms(s) {
    const e = {};
    for (const t in s) {
        e[t] = {};
        for (const i in s[t]) {
            const n = s[t][i];
            n && (n.isColor || n.isMatrix3 || n.isMatrix4 || n.isVector2 || n.isVector3 || n.isVector4 || n.isTexture || n.isQuaternion) ? e[t][i] = n.clone() : Array.isArray(n) ? e[t][i] = n.slice() : e[t][i] = n
        }
    }
    return e
}
function mergeUniforms(s) {
    const e = {};
    for (let t = 0; t < s.length; t++) {
        const i = cloneUniforms(s[t]);
        for (const n in i)
            e[n] = i[n]
    }
    return e
}
function cloneUniformsGroups(s) {
    const e = [];
    for (let t = 0; t < s.length; t++)
        e.push(s[t].clone());
    return e
}
function getUnlitUniformColorSpace(s) {
    return s.getRenderTarget() === null && s.outputEncoding === sRGBEncoding ? SRGBColorSpace : LinearSRGBColorSpace
}
const UniformsUtils = {
    clone: cloneUniforms,
    merge: mergeUniforms
};
var default_vertex = `void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`
  , default_fragment = `void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;
class ShaderMaterial extends Material {
    constructor(e) {
        super(),
        this.isShaderMaterial = !0,
        this.type = "ShaderMaterial",
        this.defines = {},
        this.uniforms = {},
        this.uniformsGroups = [],
        this.vertexShader = default_vertex,
        this.fragmentShader = default_fragment,
        this.linewidth = 1,
        this.wireframe = !1,
        this.wireframeLinewidth = 1,
        this.fog = !1,
        this.lights = !1,
        this.clipping = !1,
        this.extensions = {
            derivatives: !1,
            fragDepth: !1,
            drawBuffers: !1,
            shaderTextureLOD: !1
        },
        this.defaultAttributeValues = {
            color: [1, 1, 1],
            uv: [0, 0],
            uv2: [0, 0]
        },
        this.index0AttributeName = void 0,
        this.uniformsNeedUpdate = !1,
        this.glslVersion = null,
        e !== void 0 && this.setValues(e)
    }
    copy(e) {
        return super.copy(e),
        this.fragmentShader = e.fragmentShader,
        this.vertexShader = e.vertexShader,
        this.uniforms = cloneUniforms(e.uniforms),
        this.uniformsGroups = cloneUniformsGroups(e.uniformsGroups),
        this.defines = Object.assign({}, e.defines),
        this.wireframe = e.wireframe,
        this.wireframeLinewidth = e.wireframeLinewidth,
        this.fog = e.fog,
        this.lights = e.lights,
        this.clipping = e.clipping,
        this.extensions = Object.assign({}, e.extensions),
        this.glslVersion = e.glslVersion,
        this
    }
    toJSON(e) {
        const t = super.toJSON(e);
        t.glslVersion = this.glslVersion,
        t.uniforms = {};
        for (const n in this.uniforms) {
            const o = this.uniforms[n].value;
            o && o.isTexture ? t.uniforms[n] = {
                type: "t",
                value: o.toJSON(e).uuid
            } : o && o.isColor ? t.uniforms[n] = {
                type: "c",
                value: o.getHex()
            } : o && o.isVector2 ? t.uniforms[n] = {
                type: "v2",
                value: o.toArray()
            } : o && o.isVector3 ? t.uniforms[n] = {
                type: "v3",
                value: o.toArray()
            } : o && o.isVector4 ? t.uniforms[n] = {
                type: "v4",
                value: o.toArray()
            } : o && o.isMatrix3 ? t.uniforms[n] = {
                type: "m3",
                value: o.toArray()
            } : o && o.isMatrix4 ? t.uniforms[n] = {
                type: "m4",
                value: o.toArray()
            } : t.uniforms[n] = {
                value: o
            }
        }
        Object.keys(this.defines).length > 0 && (t.defines = this.defines),
        t.vertexShader = this.vertexShader,
        t.fragmentShader = this.fragmentShader;
        const i = {};
        for (const n in this.extensions)
            this.extensions[n] === !0 && (i[n] = !0);
        return Object.keys(i).length > 0 && (t.extensions = i),
        t
    }
}
class Camera extends Object3D {
    constructor() {
        super(),
        this.isCamera = !0,
        this.type = "Camera",
        this.matrixWorldInverse = new Matrix4,
        this.projectionMatrix = new Matrix4,
        this.projectionMatrixInverse = new Matrix4
    }
    copy(e, t) {
        return super.copy(e, t),
        this.matrixWorldInverse.copy(e.matrixWorldInverse),
        this.projectionMatrix.copy(e.projectionMatrix),
        this.projectionMatrixInverse.copy(e.projectionMatrixInverse),
        this
    }
    getWorldDirection(e) {
        this.updateWorldMatrix(!0, !1);
        const t = this.matrixWorld.elements;
        return e.set(-t[8], -t[9], -t[10]).normalize()
    }
    updateMatrixWorld(e) {
        super.updateMatrixWorld(e),
        this.matrixWorldInverse.copy(this.matrixWorld).invert()
    }
    updateWorldMatrix(e, t) {
        super.updateWorldMatrix(e, t),
        this.matrixWorldInverse.copy(this.matrixWorld).invert()
    }
    clone() {
        return new this.constructor().copy(this)
    }
}
class PerspectiveCamera extends Camera {
    constructor(e=50, t=1, i=.1, n=2e3) {
        super(),
        this.isPerspectiveCamera = !0,
        this.type = "PerspectiveCamera",
        this.fov = e,
        this.zoom = 1,
        this.near = i,
        this.far = n,
        this.focus = 10,
        this.aspect = t,
        this.view = null,
        this.filmGauge = 35,
        this.filmOffset = 0,
        this.updateProjectionMatrix()
    }
    copy(e, t) {
        return super.copy(e, t),
        this.fov = e.fov,
        this.zoom = e.zoom,
        this.near = e.near,
        this.far = e.far,
        this.focus = e.focus,
        this.aspect = e.aspect,
        this.view = e.view === null ? null : Object.assign({}, e.view),
        this.filmGauge = e.filmGauge,
        this.filmOffset = e.filmOffset,
        this
    }
    setFocalLength(e) {
        const t = .5 * this.getFilmHeight() / e;
        this.fov = RAD2DEG * 2 * Math.atan(t),
        this.updateProjectionMatrix()
    }
    getFocalLength() {
        const e = Math.tan(DEG2RAD * .5 * this.fov);
        return .5 * this.getFilmHeight() / e
    }
    getEffectiveFOV() {
        return RAD2DEG * 2 * Math.atan(Math.tan(DEG2RAD * .5 * this.fov) / this.zoom)
    }
    getFilmWidth() {
        return this.filmGauge * Math.min(this.aspect, 1)
    }
    getFilmHeight() {
        return this.filmGauge / Math.max(this.aspect, 1)
    }
    setViewOffset(e, t, i, n, r, o) {
        this.aspect = e / t,
        this.view === null && (this.view = {
            enabled: !0,
            fullWidth: 1,
            fullHeight: 1,
            offsetX: 0,
            offsetY: 0,
            width: 1,
            height: 1
        }),
        this.view.enabled = !0,
        this.view.fullWidth = e,
        this.view.fullHeight = t,
        this.view.offsetX = i,
        this.view.offsetY = n,
        this.view.width = r,
        this.view.height = o,
        this.updateProjectionMatrix()
    }
    clearViewOffset() {
        this.view !== null && (this.view.enabled = !1),
        this.updateProjectionMatrix()
    }
    updateProjectionMatrix() {
        const e = this.near;
        let t = e * Math.tan(DEG2RAD * .5 * this.fov) / this.zoom
          , i = 2 * t
          , n = this.aspect * i
          , r = -.5 * n;
        const o = this.view;
        if (this.view !== null && this.view.enabled) {
            const c = o.fullWidth
              , l = o.fullHeight;
            r += o.offsetX * n / c,
            t -= o.offsetY * i / l,
            n *= o.width / c,
            i *= o.height / l
        }
        const a = this.filmOffset;
        a !== 0 && (r += e * a / this.getFilmWidth()),
        this.projectionMatrix.makePerspective(r, r + n, t, t - i, e, this.far),
        this.projectionMatrixInverse.copy(this.projectionMatrix).invert()
    }
    toJSON(e) {
        const t = super.toJSON(e);
        return t.object.fov = this.fov,
        t.object.zoom = this.zoom,
        t.object.near = this.near,
        t.object.far = this.far,
        t.object.focus = this.focus,
        t.object.aspect = this.aspect,
        this.view !== null && (t.object.view = Object.assign({}, this.view)),
        t.object.filmGauge = this.filmGauge,
        t.object.filmOffset = this.filmOffset,
        t
    }
}
const fov = -90
  , aspect = 1;
class CubeCamera extends Object3D {
    constructor(e, t, i) {
        super(),
        this.type = "CubeCamera",
        this.renderTarget = i;
        const n = new PerspectiveCamera(fov,aspect,e,t);
        n.layers = this.layers,
        n.up.set(0, 1, 0),
        n.lookAt(1, 0, 0),
        this.add(n);
        const r = new PerspectiveCamera(fov,aspect,e,t);
        r.layers = this.layers,
        r.up.set(0, 1, 0),
        r.lookAt(-1, 0, 0),
        this.add(r);
        const o = new PerspectiveCamera(fov,aspect,e,t);
        o.layers = this.layers,
        o.up.set(0, 0, -1),
        o.lookAt(0, 1, 0),
        this.add(o);
        const a = new PerspectiveCamera(fov,aspect,e,t);
        a.layers = this.layers,
        a.up.set(0, 0, 1),
        a.lookAt(0, -1, 0),
        this.add(a);
        const c = new PerspectiveCamera(fov,aspect,e,t);
        c.layers = this.layers,
        c.up.set(0, 1, 0),
        c.lookAt(0, 0, 1),
        this.add(c);
        const l = new PerspectiveCamera(fov,aspect,e,t);
        l.layers = this.layers,
        l.up.set(0, 1, 0),
        l.lookAt(0, 0, -1),
        this.add(l)
    }
    update(e, t) {
        this.parent === null && this.updateMatrixWorld();
        const i = this.renderTarget
          , [n,r,o,a,c,l] = this.children
          , u = e.getRenderTarget()
          , h = e.toneMapping
          , d = e.xr.enabled;
        e.toneMapping = NoToneMapping,
        e.xr.enabled = !1;
        const m = i.texture.generateMipmaps;
        i.texture.generateMipmaps = !1,
        e.setRenderTarget(i, 0),
        e.render(t, n),
        e.setRenderTarget(i, 1),
        e.render(t, r),
        e.setRenderTarget(i, 2),
        e.render(t, o),
        e.setRenderTarget(i, 3),
        e.render(t, a),
        e.setRenderTarget(i, 4),
        e.render(t, c),
        i.texture.generateMipmaps = m,
        e.setRenderTarget(i, 5),
        e.render(t, l),
        e.setRenderTarget(u),
        e.toneMapping = h,
        e.xr.enabled = d,
        i.texture.needsPMREMUpdate = !0
    }
}
class CubeTexture extends Texture {
    constructor(e, t, i, n, r, o, a, c, l, u) {
        e = e !== void 0 ? e : [],
        t = t !== void 0 ? t : CubeReflectionMapping,
        super(e, t, i, n, r, o, a, c, l, u),
        this.isCubeTexture = !0,
        this.flipY = !1
    }
    get images() {
        return this.image
    }
    set images(e) {
        this.image = e
    }
}
class WebGLCubeRenderTarget extends WebGLRenderTarget {
    constructor(e=1, t={}) {
        super(e, e, t),
        this.isWebGLCubeRenderTarget = !0;
        const i = {
            width: e,
            height: e,
            depth: 1
        }
          , n = [i, i, i, i, i, i];
        this.texture = new CubeTexture(n,t.mapping,t.wrapS,t.wrapT,t.magFilter,t.minFilter,t.format,t.type,t.anisotropy,t.encoding),
        this.texture.isRenderTargetTexture = !0,
        this.texture.generateMipmaps = t.generateMipmaps !== void 0 ? t.generateMipmaps : !1,
        this.texture.minFilter = t.minFilter !== void 0 ? t.minFilter : LinearFilter
    }
    fromEquirectangularTexture(e, t) {
        this.texture.type = t.type,
        this.texture.encoding = t.encoding,
        this.texture.generateMipmaps = t.generateMipmaps,
        this.texture.minFilter = t.minFilter,
        this.texture.magFilter = t.magFilter;
        const i = {
            uniforms: {
                tEquirect: {
                    value: null
                }
            },
            vertexShader: `

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,
            fragmentShader: `

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`
        }
          , n = new BoxGeometry(5,5,5)
          , r = new ShaderMaterial({
            name: "CubemapFromEquirect",
            uniforms: cloneUniforms(i.uniforms),
            vertexShader: i.vertexShader,
            fragmentShader: i.fragmentShader,
            side: BackSide,
            blending: NoBlending
        });
        r.uniforms.tEquirect.value = t;
        const o = new Mesh(n,r)
          , a = t.minFilter;
        return t.minFilter === LinearMipmapLinearFilter && (t.minFilter = LinearFilter),
        new CubeCamera(1,10,this).update(e, o),
        t.minFilter = a,
        o.geometry.dispose(),
        o.material.dispose(),
        this
    }
    clear(e, t, i, n) {
        const r = e.getRenderTarget();
        for (let o = 0; o < 6; o++)
            e.setRenderTarget(this, o),
            e.clear(t, i, n);
        e.setRenderTarget(r)
    }
}
const _vector1 = new Vector3
  , _vector2 = new Vector3
  , _normalMatrix = new Matrix3;
class Plane {
    constructor(e=new Vector3(1,0,0), t=0) {
        this.isPlane = !0,
        this.normal = e,
        this.constant = t
    }
    set(e, t) {
        return this.normal.copy(e),
        this.constant = t,
        this
    }
    setComponents(e, t, i, n) {
        return this.normal.set(e, t, i),
        this.constant = n,
        this
    }
    setFromNormalAndCoplanarPoint(e, t) {
        return this.normal.copy(e),
        this.constant = -t.dot(this.normal),
        this
    }
    setFromCoplanarPoints(e, t, i) {
        const n = _vector1.subVectors(i, t).cross(_vector2.subVectors(e, t)).normalize();
        return this.setFromNormalAndCoplanarPoint(n, e),
        this
    }
    copy(e) {
        return this.normal.copy(e.normal),
        this.constant = e.constant,
        this
    }
    normalize() {
        const e = 1 / this.normal.length();
        return this.normal.multiplyScalar(e),
        this.constant *= e,
        this
    }
    negate() {
        return this.constant *= -1,
        this.normal.negate(),
        this
    }
    distanceToPoint(e) {
        return this.normal.dot(e) + this.constant
    }
    distanceToSphere(e) {
        return this.distanceToPoint(e.center) - e.radius
    }
    projectPoint(e, t) {
        return t.copy(this.normal).multiplyScalar(-this.distanceToPoint(e)).add(e)
    }
    intersectLine(e, t) {
        const i = e.delta(_vector1)
          , n = this.normal.dot(i);
        if (n === 0)
            return this.distanceToPoint(e.start) === 0 ? t.copy(e.start) : null;
        const r = -(e.start.dot(this.normal) + this.constant) / n;
        return r < 0 || r > 1 ? null : t.copy(i).multiplyScalar(r).add(e.start)
    }
    intersectsLine(e) {
        const t = this.distanceToPoint(e.start)
          , i = this.distanceToPoint(e.end);
        return t < 0 && i > 0 || i < 0 && t > 0
    }
    intersectsBox(e) {
        return e.intersectsPlane(this)
    }
    intersectsSphere(e) {
        return e.intersectsPlane(this)
    }
    coplanarPoint(e) {
        return e.copy(this.normal).multiplyScalar(-this.constant)
    }
    applyMatrix4(e, t) {
        const i = t || _normalMatrix.getNormalMatrix(e)
          , n = this.coplanarPoint(_vector1).applyMatrix4(e)
          , r = this.normal.applyMatrix3(i).normalize();
        return this.constant = -n.dot(r),
        this
    }
    translate(e) {
        return this.constant -= e.dot(this.normal),
        this
    }
    equals(e) {
        return e.normal.equals(this.normal) && e.constant === this.constant
    }
    clone() {
        return new this.constructor().copy(this)
    }
}
const _sphere$2 = new Sphere
  , _vector$7 = new Vector3;
class Frustum {
    constructor(e=new Plane, t=new Plane, i=new Plane, n=new Plane, r=new Plane, o=new Plane) {
        this.planes = [e, t, i, n, r, o]
    }
    set(e, t, i, n, r, o) {
        const a = this.planes;
        return a[0].copy(e),
        a[1].copy(t),
        a[2].copy(i),
        a[3].copy(n),
        a[4].copy(r),
        a[5].copy(o),
        this
    }
    copy(e) {
        const t = this.planes;
        for (let i = 0; i < 6; i++)
            t[i].copy(e.planes[i]);
        return this
    }
    setFromProjectionMatrix(e) {
        const t = this.planes
          , i = e.elements
          , n = i[0]
          , r = i[1]
          , o = i[2]
          , a = i[3]
          , c = i[4]
          , l = i[5]
          , u = i[6]
          , h = i[7]
          , d = i[8]
          , m = i[9]
          , g = i[10]
          , p = i[11]
          , f = i[12]
          , x = i[13]
          , S = i[14]
          , v = i[15];
        return t[0].setComponents(a - n, h - c, p - d, v - f).normalize(),
        t[1].setComponents(a + n, h + c, p + d, v + f).normalize(),
        t[2].setComponents(a + r, h + l, p + m, v + x).normalize(),
        t[3].setComponents(a - r, h - l, p - m, v - x).normalize(),
        t[4].setComponents(a - o, h - u, p - g, v - S).normalize(),
        t[5].setComponents(a + o, h + u, p + g, v + S).normalize(),
        this
    }
    intersectsObject(e) {
        const t = e.geometry;
        return t.boundingSphere === null && t.computeBoundingSphere(),
        _sphere$2.copy(t.boundingSphere).applyMatrix4(e.matrixWorld),
        this.intersectsSphere(_sphere$2)
    }
    intersectsSprite(e) {
        return _sphere$2.center.set(0, 0, 0),
        _sphere$2.radius = .7071067811865476,
        _sphere$2.applyMatrix4(e.matrixWorld),
        this.intersectsSphere(_sphere$2)
    }
    intersectsSphere(e) {
        const t = this.planes
          , i = e.center
          , n = -e.radius;
        for (let r = 0; r < 6; r++)
            if (t[r].distanceToPoint(i) < n)
                return !1;
        return !0
    }
    intersectsBox(e) {
        const t = this.planes;
        for (let i = 0; i < 6; i++) {
            const n = t[i];
            if (_vector$7.x = n.normal.x > 0 ? e.max.x : e.min.x,
            _vector$7.y = n.normal.y > 0 ? e.max.y : e.min.y,
            _vector$7.z = n.normal.z > 0 ? e.max.z : e.min.z,
            n.distanceToPoint(_vector$7) < 0)
                return !1
        }
        return !0
    }
    containsPoint(e) {
        const t = this.planes;
        for (let i = 0; i < 6; i++)
            if (t[i].distanceToPoint(e) < 0)
                return !1;
        return !0
    }
    clone() {
        return new this.constructor().copy(this)
    }
}
function WebGLAnimation() {
    let s = null
      , e = !1
      , t = null
      , i = null;
    function n(r, o) {
        t(r, o),
        i = s.requestAnimationFrame(n)
    }
    return {
        start: function() {
            e !== !0 && t !== null && (i = s.requestAnimationFrame(n),
            e = !0)
        },
        stop: function() {
            s.cancelAnimationFrame(i),
            e = !1
        },
        setAnimationLoop: function(r) {
            t = r
        },
        setContext: function(r) {
            s = r
        }
    }
}
function WebGLAttributes(s, e) {
    const t = e.isWebGL2
      , i = new WeakMap;
    function n(l, u) {
        const h = l.array
          , d = l.usage
          , m = s.createBuffer();
        s.bindBuffer(u, m),
        s.bufferData(u, h, d),
        l.onUploadCallback();
        let g;
        if (h instanceof Float32Array)
            g = 5126;
        else if (h instanceof Uint16Array)
            if (l.isFloat16BufferAttribute)
                if (t)
                    g = 5131;
                else
                    throw new Error("THREE.WebGLAttributes: Usage of Float16BufferAttribute requires WebGL2.");
            else
                g = 5123;
        else if (h instanceof Int16Array)
            g = 5122;
        else if (h instanceof Uint32Array)
            g = 5125;
        else if (h instanceof Int32Array)
            g = 5124;
        else if (h instanceof Int8Array)
            g = 5120;
        else if (h instanceof Uint8Array)
            g = 5121;
        else if (h instanceof Uint8ClampedArray)
            g = 5121;
        else
            throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: " + h);
        return {
            buffer: m,
            type: g,
            bytesPerElement: h.BYTES_PER_ELEMENT,
            version: l.version
        }
    }
    function r(l, u, h) {
        const d = u.array
          , m = u.updateRange;
        s.bindBuffer(h, l),
        m.count === -1 ? s.bufferSubData(h, 0, d) : (t ? s.bufferSubData(h, m.offset * d.BYTES_PER_ELEMENT, d, m.offset, m.count) : s.bufferSubData(h, m.offset * d.BYTES_PER_ELEMENT, d.subarray(m.offset, m.offset + m.count)),
        m.count = -1),
        u.onUploadCallback()
    }
    function o(l) {
        return l.isInterleavedBufferAttribute && (l = l.data),
        i.get(l)
    }
    function a(l) {
        l.isInterleavedBufferAttribute && (l = l.data);
        const u = i.get(l);
        u && (s.deleteBuffer(u.buffer),
        i.delete(l))
    }
    function c(l, u) {
        if (l.isGLBufferAttribute) {
            const d = i.get(l);
            (!d || d.version < l.version) && i.set(l, {
                buffer: l.buffer,
                type: l.type,
                bytesPerElement: l.elementSize,
                version: l.version
            });
            return
        }
        l.isInterleavedBufferAttribute && (l = l.data);
        const h = i.get(l);
        h === void 0 ? i.set(l, n(l, u)) : h.version < l.version && (r(h.buffer, l, u),
        h.version = l.version)
    }
    return {
        get: o,
        remove: a,
        update: c
    }
}
class PlaneGeometry extends BufferGeometry {
    constructor(e=1, t=1, i=1, n=1) {
        super(),
        this.type = "PlaneGeometry",
        this.parameters = {
            width: e,
            height: t,
            widthSegments: i,
            heightSegments: n
        };
        const r = e / 2
          , o = t / 2
          , a = Math.floor(i)
          , c = Math.floor(n)
          , l = a + 1
          , u = c + 1
          , h = e / a
          , d = t / c
          , m = []
          , g = []
          , p = []
          , f = [];
        for (let x = 0; x < u; x++) {
            const S = x * d - o;
            for (let v = 0; v < l; v++) {
                const M = v * h - r;
                g.push(M, -S, 0),
                p.push(0, 0, 1),
                f.push(v / a),
                f.push(1 - x / c)
            }
        }
        for (let x = 0; x < c; x++)
            for (let S = 0; S < a; S++) {
                const v = S + l * x
                  , M = S + l * (x + 1)
                  , y = S + 1 + l * (x + 1)
                  , A = S + 1 + l * x;
                m.push(v, M, A),
                m.push(M, y, A)
            }
        this.setIndex(m),
        this.setAttribute("position", new Float32BufferAttribute(g,3)),
        this.setAttribute("normal", new Float32BufferAttribute(p,3)),
        this.setAttribute("uv", new Float32BufferAttribute(f,2))
    }
    static fromJSON(e) {
        return new PlaneGeometry(e.width,e.height,e.widthSegments,e.heightSegments)
    }
}
var alphamap_fragment = `#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vUv ).g;
#endif`
  , alphamap_pars_fragment = `#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`
  , alphatest_fragment = `#ifdef USE_ALPHATEST
	if ( diffuseColor.a < alphaTest ) discard;
#endif`
  , alphatest_pars_fragment = `#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`
  , aomap_fragment = `#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vUv2 ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometry.normal, geometry.viewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`
  , aomap_pars_fragment = `#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`
  , begin_vertex = "vec3 transformed = vec3( position );"
  , beginnormal_vertex = `vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`
  , bsdfs = `vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 f0, const in float f90, const in float roughness ) {
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
	float D = D_GGX( alpha, dotNH );
	return F * ( V * D );
}
#ifdef USE_IRIDESCENCE
	vec3 BRDF_GGX_Iridescence( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 f0, const in float f90, const in float iridescence, const in vec3 iridescenceFresnel, const in float roughness ) {
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = mix( F_Schlick( f0, f90, dotVH ), iridescenceFresnel, iridescence );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif`
  , iridescence_fragment = `#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			 return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float R21 = R12;
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`
  , bumpmap_pars_fragment = `#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vUv );
		vec2 dSTdy = dFdy( vUv );
		float Hll = bumpScale * texture2D( bumpMap, vUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = dFdx( surf_pos.xyz );
		vec3 vSigmaY = dFdy( surf_pos.xyz );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`
  , clipping_planes_fragment = `#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#pragma unroll_loop_start
	for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
		plane = clippingPlanes[ i ];
		if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
	}
	#pragma unroll_loop_end
	#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
		bool clipped = true;
		#pragma unroll_loop_start
		for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
		}
		#pragma unroll_loop_end
		if ( clipped ) discard;
	#endif
#endif`
  , clipping_planes_pars_fragment = `#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`
  , clipping_planes_pars_vertex = `#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`
  , clipping_planes_vertex = `#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`
  , color_fragment = `#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`
  , color_pars_fragment = `#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`
  , color_pars_vertex = `#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )
	varying vec3 vColor;
#endif`
  , color_vertex = `#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif`
  , common = `#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
struct GeometricContext {
	vec3 position;
	vec3 normal;
	vec3 viewDir;
#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal;
#endif
};
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
mat3 transposeMat3( const in mat3 m ) {
	mat3 tmp;
	tmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );
	tmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );
	tmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );
	return tmp;
}
float luminance( const in vec3 rgb ) {
	const vec3 weights = vec3( 0.2126729, 0.7151522, 0.0721750 );
	return dot( weights, rgb );
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}`
  , cube_uv_reflection_fragment = `#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_v0 0.339
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_v1 0.276
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_v4 0.046
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_v5 0.016
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_v6 0.0038
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`
  , defaultnormal_vertex = `vec3 transformedNormal = objectNormal;
#ifdef USE_INSTANCING
	mat3 m = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( m[ 0 ], m[ 0 ] ), dot( m[ 1 ], m[ 1 ] ), dot( m[ 2 ], m[ 2 ] ) );
	transformedNormal = m * transformedNormal;
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	vec3 transformedTangent = ( modelViewMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`
  , displacementmap_pars_vertex = `#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`
  , displacementmap_vertex = `#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vUv ).x * displacementScale + displacementBias );
#endif`
  , emissivemap_fragment = `#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vUv );
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`
  , emissivemap_pars_fragment = `#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`
  , encodings_fragment = "gl_FragColor = linearToOutputTexel( gl_FragColor );"
  , encodings_pars_fragment = `vec4 LinearToLinear( in vec4 value ) {
	return value;
}
vec4 LinearTosRGB( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`
  , envmap_fragment = `#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
	#else
		vec4 envColor = vec4( 0.0 );
	#endif
	#ifdef ENVMAP_BLENDING_MULTIPLY
		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_MIX )
		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_ADD )
		outgoingLight += envColor.xyz * specularStrength * reflectivity;
	#endif
#endif`
  , envmap_common_pars_fragment = `#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`
  , envmap_pars_fragment = `#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`
  , envmap_pars_vertex = `#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`
  , envmap_vertex = `#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`
  , fog_vertex = `#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`
  , fog_pars_vertex = `#ifdef USE_FOG
	varying float vFogDepth;
#endif`
  , fog_fragment = `#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`
  , fog_pars_fragment = `#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`
  , gradientmap_pars_fragment = `#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`
  , lightmap_fragment = `#ifdef USE_LIGHTMAP
	vec4 lightMapTexel = texture2D( lightMap, vUv2 );
	vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
	reflectedLight.indirectDiffuse += lightMapIrradiance;
#endif`
  , lightmap_pars_fragment = `#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`
  , lights_lambert_fragment = `LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`
  , lights_lambert_pars_fragment = `varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in GeometricContext geometry, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometry.normal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in GeometricContext geometry, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`
  , lights_pars_begin = `uniform bool receiveShadow;
uniform vec3 ambientLightColor;
uniform vec3 lightProbe[ 9 ];
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	#if defined ( PHYSICALLY_CORRECT_LIGHTS )
		float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
		if ( cutoffDistance > 0.0 ) {
			distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
		}
		return distanceFalloff;
	#else
		if ( cutoffDistance > 0.0 && decayExponent > 0.0 ) {
			return pow( saturate( - lightDistance / cutoffDistance + 1.0 ), decayExponent );
		}
		return 1.0;
	#endif
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, const in GeometricContext geometry, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in GeometricContext geometry, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometry.position;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in GeometricContext geometry, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometry.position;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif`
  , envmap_physical_pars_fragment = `#if defined( USE_ENVMAP )
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#if defined( ENVMAP_TYPE_CUBE_UV )
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#if defined( ENVMAP_TYPE_CUBE_UV )
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
#endif`
  , lights_toon_fragment = `ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`
  , lights_toon_pars_fragment = `varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in GeometricContext geometry, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometry.normal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in GeometricContext geometry, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`
  , lights_phong_fragment = `BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`
  , lights_phong_pars_fragment = `varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in GeometricContext geometry, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometry.normal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometry.viewDir, geometry.normal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in GeometricContext geometry, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`
  , lights_physical_fragment = `PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );
vec3 dxy = max( abs( dFdx( geometryNormal ) ), abs( dFdy( geometryNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULARINTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vUv ).a;
		#endif
		#ifdef USE_SPECULARCOLORMAP
			specularColorFactor *= texture2D( specularColorMap, vUv ).rgb;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = mix( min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = mix( vec3( 0.04 ), diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEENCOLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.07, 1.0 );
	#ifdef USE_SHEENROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vUv ).a;
	#endif
#endif`
  , lights_physical_pars_fragment = `struct PhysicalMaterial {
	vec3 diffuseColor;
	float roughness;
	vec3 specularColor;
	float specularF90;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
};
vec3 clearcoatSpecular = vec3( 0.0 );
vec3 sheenSpecular = vec3( 0.0 );
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float a = roughness < 0.25 ? -339.2 * r2 + 161.4 * roughness - 25.9 : -8.48 * r2 + 14.3 * roughness - 9.95;
	float b = roughness < 0.25 ? 44.0 * r2 - 23.7 * roughness + 3.26 : 1.97 * r2 - 3.27 * roughness + 0.72;
	float DG = exp( a * dotNV + b ) + ( roughness < 0.25 ? 0.0 : 0.1 * ( roughness - 0.25 ) );
	return saturate( DG * RECIPROCAL_PI );
}
vec2 DFGApprox( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	const vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );
	const vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );
	vec4 r = roughness * c0 + c1;
	float a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;
	vec2 fab = vec2( - 1.04, 1.04 ) * a004 + r.zw;
	return fab;
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in GeometricContext geometry, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometry.normal;
		vec3 viewDir = geometry.viewDir;
		vec3 position = geometry.position;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in GeometricContext geometry, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometry.normal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometry.clearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecular += ccIrradiance * BRDF_GGX( directLight.direction, geometry.viewDir, geometry.clearcoatNormal, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecular += irradiance * BRDF_Sheen( directLight.direction, geometry.viewDir, geometry.normal, material.sheenColor, material.sheenRoughness );
	#endif
	#ifdef USE_IRIDESCENCE
		reflectedLight.directSpecular += irradiance * BRDF_GGX_Iridescence( directLight.direction, geometry.viewDir, geometry.normal, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness );
	#else
		reflectedLight.directSpecular += irradiance * BRDF_GGX( directLight.direction, geometry.viewDir, geometry.normal, material.specularColor, material.specularF90, material.roughness );
	#endif
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in GeometricContext geometry, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in GeometricContext geometry, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecular += clearcoatRadiance * EnvironmentBRDF( geometry.clearcoatNormal, geometry.viewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecular += irradiance * material.sheenColor * IBLSheenBRDF( geometry.normal, geometry.viewDir, material.sheenRoughness );
	#endif
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometry.normal, geometry.viewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness, singleScattering, multiScattering );
	#else
		computeMultiscattering( geometry.normal, geometry.viewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );
	#endif
	vec3 totalScattering = singleScattering + multiScattering;
	vec3 diffuse = material.diffuseColor * ( 1.0 - max( max( totalScattering.r, totalScattering.g ), totalScattering.b ) );
	reflectedLight.indirectSpecular += radiance * singleScattering;
	reflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;
	reflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`
  , lights_fragment_begin = `
GeometricContext geometry;
geometry.position = - vViewPosition;
geometry.normal = normal;
geometry.viewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
#ifdef USE_CLEARCOAT
	geometry.clearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometry.viewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnel = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometry, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometry, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometry, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometry, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, geometry, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometry, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometry, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	irradiance += getLightProbeIrradiance( lightProbe, geometry.normal );
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometry.normal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`
  , lights_fragment_maps = `#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vUv2 );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )
		iblIrradiance += getIBLIrradiance( geometry.normal );
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	radiance += getIBLRadiance( geometry.viewDir, geometry.normal, material.roughness );
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometry.viewDir, geometry.clearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`
  , lights_fragment_end = `#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometry, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometry, material, reflectedLight );
#endif`
  , logdepthbuf_fragment = `#if defined( USE_LOGDEPTHBUF ) && defined( USE_LOGDEPTHBUF_EXT )
	gl_FragDepthEXT = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`
  , logdepthbuf_pars_fragment = `#if defined( USE_LOGDEPTHBUF ) && defined( USE_LOGDEPTHBUF_EXT )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`
  , logdepthbuf_pars_vertex = `#ifdef USE_LOGDEPTHBUF
	#ifdef USE_LOGDEPTHBUF_EXT
		varying float vFragDepth;
		varying float vIsPerspective;
	#else
		uniform float logDepthBufFC;
	#endif
#endif`
  , logdepthbuf_vertex = `#ifdef USE_LOGDEPTHBUF
	#ifdef USE_LOGDEPTHBUF_EXT
		vFragDepth = 1.0 + gl_Position.w;
		vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
	#else
		if ( isPerspectiveMatrix( projectionMatrix ) ) {
			gl_Position.z = log2( max( EPSILON, gl_Position.w + 1.0 ) ) * logDepthBufFC - 1.0;
			gl_Position.z *= gl_Position.w;
		}
	#endif
#endif`
  , map_fragment = `#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = vec4( mix( pow( sampledDiffuseColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), sampledDiffuseColor.rgb * 0.0773993808, vec3( lessThanEqual( sampledDiffuseColor.rgb, vec3( 0.04045 ) ) ) ), sampledDiffuseColor.w );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`
  , map_pars_fragment = `#ifdef USE_MAP
	uniform sampler2D map;
#endif`
  , map_particle_fragment = `#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`
  , map_particle_pars_fragment = `#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	uniform mat3 uvTransform;
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`
  , metalnessmap_fragment = `float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vUv );
	metalnessFactor *= texelMetalness.b;
#endif`
  , metalnessmap_pars_fragment = `#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`
  , morphcolor_vertex = `#if defined( USE_MORPHCOLORS ) && defined( MORPHTARGETS_TEXTURE )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`
  , morphnormal_vertex = `#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	#ifdef MORPHTARGETS_TEXTURE
		for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
			if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
		}
	#else
		objectNormal += morphNormal0 * morphTargetInfluences[ 0 ];
		objectNormal += morphNormal1 * morphTargetInfluences[ 1 ];
		objectNormal += morphNormal2 * morphTargetInfluences[ 2 ];
		objectNormal += morphNormal3 * morphTargetInfluences[ 3 ];
	#endif
#endif`
  , morphtarget_pars_vertex = `#ifdef USE_MORPHTARGETS
	uniform float morphTargetBaseInfluence;
	#ifdef MORPHTARGETS_TEXTURE
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
		uniform sampler2DArray morphTargetsTexture;
		uniform ivec2 morphTargetsTextureSize;
		vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
			int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
			int y = texelIndex / morphTargetsTextureSize.x;
			int x = texelIndex - y * morphTargetsTextureSize.x;
			ivec3 morphUV = ivec3( x, y, morphTargetIndex );
			return texelFetch( morphTargetsTexture, morphUV, 0 );
		}
	#else
		#ifndef USE_MORPHNORMALS
			uniform float morphTargetInfluences[ 8 ];
		#else
			uniform float morphTargetInfluences[ 4 ];
		#endif
	#endif
#endif`
  , morphtarget_vertex = `#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	#ifdef MORPHTARGETS_TEXTURE
		for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
			if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
		}
	#else
		transformed += morphTarget0 * morphTargetInfluences[ 0 ];
		transformed += morphTarget1 * morphTargetInfluences[ 1 ];
		transformed += morphTarget2 * morphTargetInfluences[ 2 ];
		transformed += morphTarget3 * morphTargetInfluences[ 3 ];
		#ifndef USE_MORPHNORMALS
			transformed += morphTarget4 * morphTargetInfluences[ 4 ];
			transformed += morphTarget5 * morphTargetInfluences[ 5 ];
			transformed += morphTarget6 * morphTargetInfluences[ 6 ];
			transformed += morphTarget7 * morphTargetInfluences[ 7 ];
		#endif
	#endif
#endif`
  , normal_fragment_begin = `float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	#ifdef USE_TANGENT
		vec3 tangent = normalize( vTangent );
		vec3 bitangent = normalize( vBitangent );
		#ifdef DOUBLE_SIDED
			tangent = tangent * faceDirection;
			bitangent = bitangent * faceDirection;
		#endif
		#if defined( TANGENTSPACE_NORMALMAP ) || defined( USE_CLEARCOAT_NORMALMAP )
			mat3 vTBN = mat3( tangent, bitangent, normal );
		#endif
	#endif
#endif
vec3 geometryNormal = normal;`
  , normal_fragment_maps = `#ifdef OBJECTSPACE_NORMALMAP
	normal = texture2D( normalMap, vUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( TANGENTSPACE_NORMALMAP )
	vec3 mapN = texture2D( normalMap, vUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;
	#ifdef USE_TANGENT
		normal = normalize( vTBN * mapN );
	#else
		normal = perturbNormal2Arb( - vViewPosition, normal, mapN, faceDirection );
	#endif
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`
  , normal_pars_fragment = `#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`
  , normal_pars_vertex = `#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`
  , normal_vertex = `#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`
  , normalmap_pars_fragment = `#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef OBJECTSPACE_NORMALMAP
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( TANGENTSPACE_NORMALMAP ) || defined ( USE_CLEARCOAT_NORMALMAP ) )
	vec3 perturbNormal2Arb( vec3 eye_pos, vec3 surf_norm, vec3 mapN, float faceDirection ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( vUv.st );
		vec2 st1 = dFdy( vUv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : faceDirection * inversesqrt( det );
		return normalize( T * ( mapN.x * scale ) + B * ( mapN.y * scale ) + N * mapN.z );
	}
#endif`
  , clearcoat_normal_fragment_begin = `#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = geometryNormal;
#endif`
  , clearcoat_normal_fragment_maps = `#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	#ifdef USE_TANGENT
		clearcoatNormal = normalize( vTBN * clearcoatMapN );
	#else
		clearcoatNormal = perturbNormal2Arb( - vViewPosition, clearcoatNormal, clearcoatMapN, faceDirection );
	#endif
#endif`
  , clearcoat_pars_fragment = `#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif`
  , iridescence_pars_fragment = `#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`
  , output_fragment = `#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha + 0.1;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`
  , packing = `vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;
const vec3 PackFactors = vec3( 256. * 256. * 256., 256. * 256., 256. );
const vec4 UnpackFactors = UnpackDownscale / vec4( PackFactors, 1. );
const float ShiftRight8 = 1. / 256.;
vec4 packDepthToRGBA( const in float v ) {
	vec4 r = vec4( fract( v * PackFactors ), v );
	r.yzw -= r.xyz * ShiftRight8;	return r * PackUpscale;
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors );
}
vec2 packDepthToRG( in highp float v ) {
	return packDepthToRGBA( v ).yx;
}
float unpackRGToDepth( const in highp vec2 v ) {
	return unpackRGBAToDepth( vec4( v.xy, 0.0, 0.0 ) );
}
vec4 pack2HalfToRGBA( vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float linearClipZ, const in float near, const in float far ) {
	return linearClipZ * ( near - far ) - near;
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float invClipZ, const in float near, const in float far ) {
	return ( near * far ) / ( ( far - near ) * invClipZ - far );
}`
  , premultiplied_alpha_fragment = `#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`
  , project_vertex = `vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`
  , dithering_fragment = `#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`
  , dithering_pars_fragment = `#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`
  , roughnessmap_fragment = `float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vUv );
	roughnessFactor *= texelRoughness.g;
#endif`
  , roughnessmap_pars_fragment = `#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`
  , shadowmap_pars_fragment = `#if NUM_SPOT_LIGHT_COORDS > 0
  varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
  uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		struct SpotLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	float texture2DCompare( sampler2D depths, vec2 uv, float compare ) {
		return step( compare, unpackRGBAToDepth( texture2D( depths, uv ) ) );
	}
	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {
		return unpackRGBATo2Half( texture2D( shadow, uv ) );
	}
	float VSMShadow (sampler2D shadow, vec2 uv, float compare ){
		float occlusion = 1.0;
		vec2 distribution = texture2DDistribution( shadow, uv );
		float hard_shadow = step( compare , distribution.x );
		if (hard_shadow != 1.0 ) {
			float distance = compare - distribution.x ;
			float variance = max( 0.00000, distribution.y * distribution.y );
			float softness_probability = variance / (variance + distance * distance );			softness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );			occlusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );
		}
		return occlusion;
	}
	float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
		float shadow = 1.0;
		shadowCoord.xyz /= shadowCoord.w;
		shadowCoord.z += shadowBias;
		bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
		bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
		if ( frustumTest ) {
		#if defined( SHADOWMAP_TYPE_PCF )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx0 = - texelSize.x * shadowRadius;
			float dy0 = - texelSize.y * shadowRadius;
			float dx1 = + texelSize.x * shadowRadius;
			float dy1 = + texelSize.y * shadowRadius;
			float dx2 = dx0 / 2.0;
			float dy2 = dy0 / 2.0;
			float dx3 = dx1 / 2.0;
			float dy3 = dy1 / 2.0;
			shadow = (
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )
			) * ( 1.0 / 17.0 );
		#elif defined( SHADOWMAP_TYPE_PCF_SOFT )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx = texelSize.x;
			float dy = texelSize.y;
			vec2 uv = shadowCoord.xy;
			vec2 f = fract( uv * shadowMapSize + 0.5 );
			uv -= f * texelSize;
			shadow = (
				texture2DCompare( shadowMap, uv, shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),
						  f.x ),
					 mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),
						  f.x ),
					 f.y )
			) * ( 1.0 / 9.0 );
		#elif defined( SHADOWMAP_TYPE_VSM )
			shadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );
		#else
			shadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );
		#endif
		}
		return shadow;
	}
	vec2 cubeToUV( vec3 v, float texelSizeY ) {
		vec3 absV = abs( v );
		float scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );
		absV *= scaleToCube;
		v *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );
		vec2 planar = v.xy;
		float almostATexel = 1.5 * texelSizeY;
		float almostOne = 1.0 - almostATexel;
		if ( absV.z >= almostOne ) {
			if ( v.z > 0.0 )
				planar.x = 4.0 - v.x;
		} else if ( absV.x >= almostOne ) {
			float signX = sign( v.x );
			planar.x = v.z * signX + 2.0 * signX;
		} else if ( absV.y >= almostOne ) {
			float signY = sign( v.y );
			planar.x = v.x + 2.0 * signY + 2.0;
			planar.y = v.z * signY - 2.0;
		}
		return vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );
	}
	float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );
		vec3 lightToPosition = shadowCoord.xyz;
		float dp = ( length( lightToPosition ) - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );		dp += shadowBias;
		vec3 bd3D = normalize( lightToPosition );
		#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )
			vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;
			return (
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )
			) * ( 1.0 / 9.0 );
		#else
			return texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );
		#endif
	}
#endif`
  , shadowmap_pars_vertex = `#if NUM_SPOT_LIGHT_COORDS > 0
  uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
  varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`
  , shadowmap_vertex = `#if defined( USE_SHADOWMAP ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	#if NUM_DIR_LIGHT_SHADOWS > 0 || NUM_SPOT_LIGHT_COORDS > 0 || NUM_POINT_LIGHT_SHADOWS > 0
		vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		vec4 shadowWorldPosition;
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
		vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
		vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
	#endif
#endif`
  , shadowmask_pars_fragment = `float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`
  , skinbase_vertex = `#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`
  , skinning_pars_vertex = `#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	uniform int boneTextureSize;
	mat4 getBoneMatrix( const in float i ) {
		float j = i * 4.0;
		float x = mod( j, float( boneTextureSize ) );
		float y = floor( j / float( boneTextureSize ) );
		float dx = 1.0 / float( boneTextureSize );
		float dy = 1.0 / float( boneTextureSize );
		y = dy * ( y + 0.5 );
		vec4 v1 = texture2D( boneTexture, vec2( dx * ( x + 0.5 ), y ) );
		vec4 v2 = texture2D( boneTexture, vec2( dx * ( x + 1.5 ), y ) );
		vec4 v3 = texture2D( boneTexture, vec2( dx * ( x + 2.5 ), y ) );
		vec4 v4 = texture2D( boneTexture, vec2( dx * ( x + 3.5 ), y ) );
		mat4 bone = mat4( v1, v2, v3, v4 );
		return bone;
	}
#endif`
  , skinning_vertex = `#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`
  , skinnormal_vertex = `#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`
  , specularmap_fragment = `float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`
  , specularmap_pars_fragment = `#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`
  , tonemapping_fragment = `#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`
  , tonemapping_pars_fragment = `#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return toneMappingExposure * color;
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 OptimizedCineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`
  , transmission_fragment = `#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmission = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmission.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmission.rgb, material.transmission );
#endif`
  , transmission_pars_fragment = `#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float framebufferLod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		#ifdef texture2DLodEXT
			return texture2DLodEXT( transmissionSamplerMap, fragCoord.xy, framebufferLod );
		#else
			return texture2D( transmissionSamplerMap, fragCoord.xy, framebufferLod );
		#endif
	}
	vec3 applyVolumeAttenuation( const in vec3 radiance, const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return radiance;
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance * radiance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
		vec3 refractedRayExit = position + transmissionRay;
		vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
		vec2 refractionCoords = ndcPos.xy / ndcPos.w;
		refractionCoords += 1.0;
		refractionCoords /= 2.0;
		vec4 transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
		vec3 attenuatedColor = applyVolumeAttenuation( transmittedLight.rgb, length( transmissionRay ), attenuationColor, attenuationDistance );
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		return vec4( ( 1.0 - F ) * attenuatedColor * diffuseColor, transmittedLight.a );
	}
#endif`
  , uv_pars_fragment = `#if ( defined( USE_UV ) && ! defined( UVS_VERTEX_ONLY ) )
	varying vec2 vUv;
#endif`
  , uv_pars_vertex = `#ifdef USE_UV
	#ifdef UVS_VERTEX_ONLY
		vec2 vUv;
	#else
		varying vec2 vUv;
	#endif
	uniform mat3 uvTransform;
#endif`
  , uv_vertex = `#ifdef USE_UV
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
#endif`
  , uv2_pars_fragment = `#if defined( USE_LIGHTMAP ) || defined( USE_AOMAP )
	varying vec2 vUv2;
#endif`
  , uv2_pars_vertex = `#if defined( USE_LIGHTMAP ) || defined( USE_AOMAP )
	attribute vec2 uv2;
	varying vec2 vUv2;
	uniform mat3 uv2Transform;
#endif`
  , uv2_vertex = `#if defined( USE_LIGHTMAP ) || defined( USE_AOMAP )
	vUv2 = ( uv2Transform * vec3( uv2, 1 ) ).xy;
#endif`
  , worldpos_vertex = `#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;
const vertex$h = `varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`
  , fragment$h = `uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <encodings_fragment>
}`
  , vertex$g = `varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`
  , fragment$g = `#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <encodings_fragment>
}`
  , vertex$f = `varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`
  , fragment$f = `uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <encodings_fragment>
}`
  , vertex$e = `#include <common>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <skinbase_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`
  , fragment$e = `#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( 1.0 );
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <logdepthbuf_fragment>
	float fragCoordZ = 0.5 * vHighPrecisionZW[0] / vHighPrecisionZW[1] + 0.5;
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#endif
}`
  , vertex$d = `#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <skinbase_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`
  , fragment$d = `#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( 1.0 );
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = packDepthToRGBA( dist );
}`
  , vertex$c = `varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`
  , fragment$c = `uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <encodings_fragment>
}`
  , vertex$b = `uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`
  , fragment$b = `uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <output_fragment>
	#include <tonemapping_fragment>
	#include <encodings_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`
  , vertex$a = `#include <common>
#include <uv_pars_vertex>
#include <uv2_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <uv2_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`
  , fragment$a = `uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <uv2_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vUv2 );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <output_fragment>
	#include <tonemapping_fragment>
	#include <encodings_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`
  , vertex$9 = `#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <uv_pars_vertex>
#include <uv2_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <uv2_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`
  , fragment$9 = `#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <uv2_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <output_fragment>
	#include <tonemapping_fragment>
	#include <encodings_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`
  , vertex$8 = `#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`
  , fragment$8 = `#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <output_fragment>
	#include <tonemapping_fragment>
	#include <encodings_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`
  , vertex$7 = `#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( TANGENTSPACE_NORMALMAP )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( TANGENTSPACE_NORMALMAP )
	vViewPosition = - mvPosition.xyz;
#endif
}`
  , fragment$7 = `#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( TANGENTSPACE_NORMALMAP )
	varying vec3 vViewPosition;
#endif
#include <packing>
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( packNormalToRGB( normal ), opacity );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`
  , vertex$6 = `#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <uv_pars_vertex>
#include <uv2_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <uv2_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`
  , fragment$6 = `#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <uv2_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <output_fragment>
	#include <tonemapping_fragment>
	#include <encodings_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`
  , vertex$5 = `#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <uv_pars_vertex>
#include <uv2_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <uv2_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`
  , fragment$5 = `#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULARINTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
	#ifdef USE_SPECULARCOLORMAP
		uniform sampler2D specularColorMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEENCOLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEENROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <uv2_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <bsdfs>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
		float sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );
		outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecular;
	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometry.clearcoatNormal, geometry.viewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + clearcoatSpecular * material.clearcoat;
	#endif
	#include <output_fragment>
	#include <tonemapping_fragment>
	#include <encodings_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`
  , vertex$4 = `#define TOON
varying vec3 vViewPosition;
#include <common>
#include <uv_pars_vertex>
#include <uv2_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <uv2_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`
  , fragment$4 = `#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <uv2_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <output_fragment>
	#include <tonemapping_fragment>
	#include <encodings_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`
  , vertex$3 = `uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`
  , fragment$3 = `uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <output_fragment>
	#include <tonemapping_fragment>
	#include <encodings_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`
  , vertex$2 = `#include <common>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`
  , fragment$2 = `uniform vec3 color;
uniform float opacity;
#include <common>
#include <packing>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <encodings_fragment>
	#include <fog_fragment>
}`
  , vertex$1 = `uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix * vec4( 0.0, 0.0, 0.0, 1.0 );
	vec2 scale;
	scale.x = length( vec3( modelMatrix[ 0 ].x, modelMatrix[ 0 ].y, modelMatrix[ 0 ].z ) );
	scale.y = length( vec3( modelMatrix[ 1 ].x, modelMatrix[ 1 ].y, modelMatrix[ 1 ].z ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`
  , fragment$1 = `uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <output_fragment>
	#include <tonemapping_fragment>
	#include <encodings_fragment>
	#include <fog_fragment>
}`
  , ShaderChunk = {
    alphamap_fragment,
    alphamap_pars_fragment,
    alphatest_fragment,
    alphatest_pars_fragment,
    aomap_fragment,
    aomap_pars_fragment,
    begin_vertex,
    beginnormal_vertex,
    bsdfs,
    iridescence_fragment,
    bumpmap_pars_fragment,
    clipping_planes_fragment,
    clipping_planes_pars_fragment,
    clipping_planes_pars_vertex,
    clipping_planes_vertex,
    color_fragment,
    color_pars_fragment,
    color_pars_vertex,
    color_vertex,
    common,
    cube_uv_reflection_fragment,
    defaultnormal_vertex,
    displacementmap_pars_vertex,
    displacementmap_vertex,
    emissivemap_fragment,
    emissivemap_pars_fragment,
    encodings_fragment,
    encodings_pars_fragment,
    envmap_fragment,
    envmap_common_pars_fragment,
    envmap_pars_fragment,
    envmap_pars_vertex,
    envmap_physical_pars_fragment,
    envmap_vertex,
    fog_vertex,
    fog_pars_vertex,
    fog_fragment,
    fog_pars_fragment,
    gradientmap_pars_fragment,
    lightmap_fragment,
    lightmap_pars_fragment,
    lights_lambert_fragment,
    lights_lambert_pars_fragment,
    lights_pars_begin,
    lights_toon_fragment,
    lights_toon_pars_fragment,
    lights_phong_fragment,
    lights_phong_pars_fragment,
    lights_physical_fragment,
    lights_physical_pars_fragment,
    lights_fragment_begin,
    lights_fragment_maps,
    lights_fragment_end,
    logdepthbuf_fragment,
    logdepthbuf_pars_fragment,
    logdepthbuf_pars_vertex,
    logdepthbuf_vertex,
    map_fragment,
    map_pars_fragment,
    map_particle_fragment,
    map_particle_pars_fragment,
    metalnessmap_fragment,
    metalnessmap_pars_fragment,
    morphcolor_vertex,
    morphnormal_vertex,
    morphtarget_pars_vertex,
    morphtarget_vertex,
    normal_fragment_begin,
    normal_fragment_maps,
    normal_pars_fragment,
    normal_pars_vertex,
    normal_vertex,
    normalmap_pars_fragment,
    clearcoat_normal_fragment_begin,
    clearcoat_normal_fragment_maps,
    clearcoat_pars_fragment,
    iridescence_pars_fragment,
    output_fragment,
    packing,
    premultiplied_alpha_fragment,
    project_vertex,
    dithering_fragment,
    dithering_pars_fragment,
    roughnessmap_fragment,
    roughnessmap_pars_fragment,
    shadowmap_pars_fragment,
    shadowmap_pars_vertex,
    shadowmap_vertex,
    shadowmask_pars_fragment,
    skinbase_vertex,
    skinning_pars_vertex,
    skinning_vertex,
    skinnormal_vertex,
    specularmap_fragment,
    specularmap_pars_fragment,
    tonemapping_fragment,
    tonemapping_pars_fragment,
    transmission_fragment,
    transmission_pars_fragment,
    uv_pars_fragment,
    uv_pars_vertex,
    uv_vertex,
    uv2_pars_fragment,
    uv2_pars_vertex,
    uv2_vertex,
    worldpos_vertex,
    background_vert: vertex$h,
    background_frag: fragment$h,
    backgroundCube_vert: vertex$g,
    backgroundCube_frag: fragment$g,
    cube_vert: vertex$f,
    cube_frag: fragment$f,
    depth_vert: vertex$e,
    depth_frag: fragment$e,
    distanceRGBA_vert: vertex$d,
    distanceRGBA_frag: fragment$d,
    equirect_vert: vertex$c,
    equirect_frag: fragment$c,
    linedashed_vert: vertex$b,
    linedashed_frag: fragment$b,
    meshbasic_vert: vertex$a,
    meshbasic_frag: fragment$a,
    meshlambert_vert: vertex$9,
    meshlambert_frag: fragment$9,
    meshmatcap_vert: vertex$8,
    meshmatcap_frag: fragment$8,
    meshnormal_vert: vertex$7,
    meshnormal_frag: fragment$7,
    meshphong_vert: vertex$6,
    meshphong_frag: fragment$6,
    meshphysical_vert: vertex$5,
    meshphysical_frag: fragment$5,
    meshtoon_vert: vertex$4,
    meshtoon_frag: fragment$4,
    points_vert: vertex$3,
    points_frag: fragment$3,
    shadow_vert: vertex$2,
    shadow_frag: fragment$2,
    sprite_vert: vertex$1,
    sprite_frag: fragment$1
}
  , UniformsLib = {
    common: {
        diffuse: {
            value: new Color(16777215)
        },
        opacity: {
            value: 1
        },
        map: {
            value: null
        },
        uvTransform: {
            value: new Matrix3
        },
        uv2Transform: {
            value: new Matrix3
        },
        alphaMap: {
            value: null
        },
        alphaTest: {
            value: 0
        }
    },
    specularmap: {
        specularMap: {
            value: null
        }
    },
    envmap: {
        envMap: {
            value: null
        },
        flipEnvMap: {
            value: -1
        },
        reflectivity: {
            value: 1
        },
        ior: {
            value: 1.5
        },
        refractionRatio: {
            value: .98
        }
    },
    aomap: {
        aoMap: {
            value: null
        },
        aoMapIntensity: {
            value: 1
        }
    },
    lightmap: {
        lightMap: {
            value: null
        },
        lightMapIntensity: {
            value: 1
        }
    },
    emissivemap: {
        emissiveMap: {
            value: null
        }
    },
    bumpmap: {
        bumpMap: {
            value: null
        },
        bumpScale: {
            value: 1
        }
    },
    normalmap: {
        normalMap: {
            value: null
        },
        normalScale: {
            value: new Vector2(1,1)
        }
    },
    displacementmap: {
        displacementMap: {
            value: null
        },
        displacementScale: {
            value: 1
        },
        displacementBias: {
            value: 0
        }
    },
    roughnessmap: {
        roughnessMap: {
            value: null
        }
    },
    metalnessmap: {
        metalnessMap: {
            value: null
        }
    },
    gradientmap: {
        gradientMap: {
            value: null
        }
    },
    fog: {
        fogDensity: {
            value: 25e-5
        },
        fogNear: {
            value: 1
        },
        fogFar: {
            value: 2e3
        },
        fogColor: {
            value: new Color(16777215)
        }
    },
    lights: {
        ambientLightColor: {
            value: []
        },
        lightProbe: {
            value: []
        },
        directionalLights: {
            value: [],
            properties: {
                direction: {},
                color: {}
            }
        },
        directionalLightShadows: {
            value: [],
            properties: {
                shadowBias: {},
                shadowNormalBias: {},
                shadowRadius: {},
                shadowMapSize: {}
            }
        },
        directionalShadowMap: {
            value: []
        },
        directionalShadowMatrix: {
            value: []
        },
        spotLights: {
            value: [],
            properties: {
                color: {},
                position: {},
                direction: {},
                distance: {},
                coneCos: {},
                penumbraCos: {},
                decay: {}
            }
        },
        spotLightShadows: {
            value: [],
            properties: {
                shadowBias: {},
                shadowNormalBias: {},
                shadowRadius: {},
                shadowMapSize: {}
            }
        },
        spotLightMap: {
            value: []
        },
        spotShadowMap: {
            value: []
        },
        spotLightMatrix: {
            value: []
        },
        pointLights: {
            value: [],
            properties: {
                color: {},
                position: {},
                decay: {},
                distance: {}
            }
        },
        pointLightShadows: {
            value: [],
            properties: {
                shadowBias: {},
                shadowNormalBias: {},
                shadowRadius: {},
                shadowMapSize: {},
                shadowCameraNear: {},
                shadowCameraFar: {}
            }
        },
        pointShadowMap: {
            value: []
        },
        pointShadowMatrix: {
            value: []
        },
        hemisphereLights: {
            value: [],
            properties: {
                direction: {},
                skyColor: {},
                groundColor: {}
            }
        },
        rectAreaLights: {
            value: [],
            properties: {
                color: {},
                position: {},
                width: {},
                height: {}
            }
        },
        ltc_1: {
            value: null
        },
        ltc_2: {
            value: null
        }
    },
    points: {
        diffuse: {
            value: new Color(16777215)
        },
        opacity: {
            value: 1
        },
        size: {
            value: 1
        },
        scale: {
            value: 1
        },
        map: {
            value: null
        },
        alphaMap: {
            value: null
        },
        alphaTest: {
            value: 0
        },
        uvTransform: {
            value: new Matrix3
        }
    },
    sprite: {
        diffuse: {
            value: new Color(16777215)
        },
        opacity: {
            value: 1
        },
        center: {
            value: new Vector2(.5,.5)
        },
        rotation: {
            value: 0
        },
        map: {
            value: null
        },
        alphaMap: {
            value: null
        },
        alphaTest: {
            value: 0
        },
        uvTransform: {
            value: new Matrix3
        }
    }
}
  , ShaderLib = {
    basic: {
        uniforms: mergeUniforms([UniformsLib.common, UniformsLib.specularmap, UniformsLib.envmap, UniformsLib.aomap, UniformsLib.lightmap, UniformsLib.fog]),
        vertexShader: ShaderChunk.meshbasic_vert,
        fragmentShader: ShaderChunk.meshbasic_frag
    },
    lambert: {
        uniforms: mergeUniforms([UniformsLib.common, UniformsLib.specularmap, UniformsLib.envmap, UniformsLib.aomap, UniformsLib.lightmap, UniformsLib.emissivemap, UniformsLib.bumpmap, UniformsLib.normalmap, UniformsLib.displacementmap, UniformsLib.fog, UniformsLib.lights, {
            emissive: {
                value: new Color(0)
            }
        }]),
        vertexShader: ShaderChunk.meshlambert_vert,
        fragmentShader: ShaderChunk.meshlambert_frag
    },
    phong: {
        uniforms: mergeUniforms([UniformsLib.common, UniformsLib.specularmap, UniformsLib.envmap, UniformsLib.aomap, UniformsLib.lightmap, UniformsLib.emissivemap, UniformsLib.bumpmap, UniformsLib.normalmap, UniformsLib.displacementmap, UniformsLib.fog, UniformsLib.lights, {
            emissive: {
                value: new Color(0)
            },
            specular: {
                value: new Color(1118481)
            },
            shininess: {
                value: 30
            }
        }]),
        vertexShader: ShaderChunk.meshphong_vert,
        fragmentShader: ShaderChunk.meshphong_frag
    },
    standard: {
        uniforms: mergeUniforms([UniformsLib.common, UniformsLib.envmap, UniformsLib.aomap, UniformsLib.lightmap, UniformsLib.emissivemap, UniformsLib.bumpmap, UniformsLib.normalmap, UniformsLib.displacementmap, UniformsLib.roughnessmap, UniformsLib.metalnessmap, UniformsLib.fog, UniformsLib.lights, {
            emissive: {
                value: new Color(0)
            },
            roughness: {
                value: 1
            },
            metalness: {
                value: 0
            },
            envMapIntensity: {
                value: 1
            }
        }]),
        vertexShader: ShaderChunk.meshphysical_vert,
        fragmentShader: ShaderChunk.meshphysical_frag
    },
    toon: {
        uniforms: mergeUniforms([UniformsLib.common, UniformsLib.aomap, UniformsLib.lightmap, UniformsLib.emissivemap, UniformsLib.bumpmap, UniformsLib.normalmap, UniformsLib.displacementmap, UniformsLib.gradientmap, UniformsLib.fog, UniformsLib.lights, {
            emissive: {
                value: new Color(0)
            }
        }]),
        vertexShader: ShaderChunk.meshtoon_vert,
        fragmentShader: ShaderChunk.meshtoon_frag
    },
    matcap: {
        uniforms: mergeUniforms([UniformsLib.common, UniformsLib.bumpmap, UniformsLib.normalmap, UniformsLib.displacementmap, UniformsLib.fog, {
            matcap: {
                value: null
            }
        }]),
        vertexShader: ShaderChunk.meshmatcap_vert,
        fragmentShader: ShaderChunk.meshmatcap_frag
    },
    points: {
        uniforms: mergeUniforms([UniformsLib.points, UniformsLib.fog]),
        vertexShader: ShaderChunk.points_vert,
        fragmentShader: ShaderChunk.points_frag
    },
    dashed: {
        uniforms: mergeUniforms([UniformsLib.common, UniformsLib.fog, {
            scale: {
                value: 1
            },
            dashSize: {
                value: 1
            },
            totalSize: {
                value: 2
            }
        }]),
        vertexShader: ShaderChunk.linedashed_vert,
        fragmentShader: ShaderChunk.linedashed_frag
    },
    depth: {
        uniforms: mergeUniforms([UniformsLib.common, UniformsLib.displacementmap]),
        vertexShader: ShaderChunk.depth_vert,
        fragmentShader: ShaderChunk.depth_frag
    },
    normal: {
        uniforms: mergeUniforms([UniformsLib.common, UniformsLib.bumpmap, UniformsLib.normalmap, UniformsLib.displacementmap, {
            opacity: {
                value: 1
            }
        }]),
        vertexShader: ShaderChunk.meshnormal_vert,
        fragmentShader: ShaderChunk.meshnormal_frag
    },
    sprite: {
        uniforms: mergeUniforms([UniformsLib.sprite, UniformsLib.fog]),
        vertexShader: ShaderChunk.sprite_vert,
        fragmentShader: ShaderChunk.sprite_frag
    },
    background: {
        uniforms: {
            uvTransform: {
                value: new Matrix3
            },
            t2D: {
                value: null
            },
            backgroundIntensity: {
                value: 1
            }
        },
        vertexShader: ShaderChunk.background_vert,
        fragmentShader: ShaderChunk.background_frag
    },
    backgroundCube: {
        uniforms: {
            envMap: {
                value: null
            },
            flipEnvMap: {
                value: -1
            },
            backgroundBlurriness: {
                value: 0
            },
            backgroundIntensity: {
                value: 1
            }
        },
        vertexShader: ShaderChunk.backgroundCube_vert,
        fragmentShader: ShaderChunk.backgroundCube_frag
    },
    cube: {
        uniforms: {
            tCube: {
                value: null
            },
            tFlip: {
                value: -1
            },
            opacity: {
                value: 1
            }
        },
        vertexShader: ShaderChunk.cube_vert,
        fragmentShader: ShaderChunk.cube_frag
    },
    equirect: {
        uniforms: {
            tEquirect: {
                value: null
            }
        },
        vertexShader: ShaderChunk.equirect_vert,
        fragmentShader: ShaderChunk.equirect_frag
    },
    distanceRGBA: {
        uniforms: mergeUniforms([UniformsLib.common, UniformsLib.displacementmap, {
            referencePosition: {
                value: new Vector3
            },
            nearDistance: {
                value: 1
            },
            farDistance: {
                value: 1e3
            }
        }]),
        vertexShader: ShaderChunk.distanceRGBA_vert,
        fragmentShader: ShaderChunk.distanceRGBA_frag
    },
    shadow: {
        uniforms: mergeUniforms([UniformsLib.lights, UniformsLib.fog, {
            color: {
                value: new Color(0)
            },
            opacity: {
                value: 1
            }
        }]),
        vertexShader: ShaderChunk.shadow_vert,
        fragmentShader: ShaderChunk.shadow_frag
    }
};
ShaderLib.physical = {
    uniforms: mergeUniforms([ShaderLib.standard.uniforms, {
        clearcoat: {
            value: 0
        },
        clearcoatMap: {
            value: null
        },
        clearcoatRoughness: {
            value: 0
        },
        clearcoatRoughnessMap: {
            value: null
        },
        clearcoatNormalScale: {
            value: new Vector2(1,1)
        },
        clearcoatNormalMap: {
            value: null
        },
        iridescence: {
            value: 0
        },
        iridescenceMap: {
            value: null
        },
        iridescenceIOR: {
            value: 1.3
        },
        iridescenceThicknessMinimum: {
            value: 100
        },
        iridescenceThicknessMaximum: {
            value: 400
        },
        iridescenceThicknessMap: {
            value: null
        },
        sheen: {
            value: 0
        },
        sheenColor: {
            value: new Color(0)
        },
        sheenColorMap: {
            value: null
        },
        sheenRoughness: {
            value: 1
        },
        sheenRoughnessMap: {
            value: null
        },
        transmission: {
            value: 0
        },
        transmissionMap: {
            value: null
        },
        transmissionSamplerSize: {
            value: new Vector2
        },
        transmissionSamplerMap: {
            value: null
        },
        thickness: {
            value: 0
        },
        thicknessMap: {
            value: null
        },
        attenuationDistance: {
            value: 0
        },
        attenuationColor: {
            value: new Color(0)
        },
        specularIntensity: {
            value: 1
        },
        specularIntensityMap: {
            value: null
        },
        specularColor: {
            value: new Color(1,1,1)
        },
        specularColorMap: {
            value: null
        }
    }]),
    vertexShader: ShaderChunk.meshphysical_vert,
    fragmentShader: ShaderChunk.meshphysical_frag
};
const _rgb = {
    r: 0,
    b: 0,
    g: 0
};
function WebGLBackground(s, e, t, i, n, r, o) {
    const a = new Color(0);
    let c = r === !0 ? 0 : 1, l, u, h = null, d = 0, m = null;
    function g(f, x) {
        let S = !1
          , v = x.isScene === !0 ? x.background : null;
        v && v.isTexture && (v = (x.backgroundBlurriness > 0 ? t : e).get(v));
        const M = s.xr
          , y = M.getSession && M.getSession();
        y && y.environmentBlendMode === "additive" && (v = null),
        v === null ? p(a, c) : v && v.isColor && (p(v, 1),
        S = !0),
        (s.autoClear || S) && s.clear(s.autoClearColor, s.autoClearDepth, s.autoClearStencil),
        v && (v.isCubeTexture || v.mapping === CubeUVReflectionMapping) ? (u === void 0 && (u = new Mesh(new BoxGeometry(1,1,1),new ShaderMaterial({
            name: "BackgroundCubeMaterial",
            uniforms: cloneUniforms(ShaderLib.backgroundCube.uniforms),
            vertexShader: ShaderLib.backgroundCube.vertexShader,
            fragmentShader: ShaderLib.backgroundCube.fragmentShader,
            side: BackSide,
            depthTest: !1,
            depthWrite: !1,
            fog: !1
        })),
        u.geometry.deleteAttribute("normal"),
        u.geometry.deleteAttribute("uv"),
        u.onBeforeRender = function(A, P, _) {
            this.matrixWorld.copyPosition(_.matrixWorld)
        }
        ,
        Object.defineProperty(u.material, "envMap", {
            get: function() {
                return this.uniforms.envMap.value
            }
        }),
        n.update(u)),
        u.material.uniforms.envMap.value = v,
        u.material.uniforms.flipEnvMap.value = v.isCubeTexture && v.isRenderTargetTexture === !1 ? -1 : 1,
        u.material.uniforms.backgroundBlurriness.value = x.backgroundBlurriness,
        u.material.uniforms.backgroundIntensity.value = x.backgroundIntensity,
        u.material.toneMapped = v.encoding !== sRGBEncoding,
        (h !== v || d !== v.version || m !== s.toneMapping) && (u.material.needsUpdate = !0,
        h = v,
        d = v.version,
        m = s.toneMapping),
        u.layers.enableAll(),
        f.unshift(u, u.geometry, u.material, 0, 0, null)) : v && v.isTexture && (l === void 0 && (l = new Mesh(new PlaneGeometry(2,2),new ShaderMaterial({
            name: "BackgroundMaterial",
            uniforms: cloneUniforms(ShaderLib.background.uniforms),
            vertexShader: ShaderLib.background.vertexShader,
            fragmentShader: ShaderLib.background.fragmentShader,
            side: FrontSide,
            depthTest: !1,
            depthWrite: !1,
            fog: !1
        })),
        l.geometry.deleteAttribute("normal"),
        Object.defineProperty(l.material, "map", {
            get: function() {
                return this.uniforms.t2D.value
            }
        }),
        n.update(l)),
        l.material.uniforms.t2D.value = v,
        l.material.uniforms.backgroundIntensity.value = x.backgroundIntensity,
        l.material.toneMapped = v.encoding !== sRGBEncoding,
        v.matrixAutoUpdate === !0 && v.updateMatrix(),
        l.material.uniforms.uvTransform.value.copy(v.matrix),
        (h !== v || d !== v.version || m !== s.toneMapping) && (l.material.needsUpdate = !0,
        h = v,
        d = v.version,
        m = s.toneMapping),
        l.layers.enableAll(),
        f.unshift(l, l.geometry, l.material, 0, 0, null))
    }
    function p(f, x) {
        f.getRGB(_rgb, getUnlitUniformColorSpace(s)),
        i.buffers.color.setClear(_rgb.r, _rgb.g, _rgb.b, x, o)
    }
    return {
        getClearColor: function() {
            return a
        },
        setClearColor: function(f, x=1) {
            a.set(f),
            c = x,
            p(a, c)
        },
        getClearAlpha: function() {
            return c
        },
        setClearAlpha: function(f) {
            c = f,
            p(a, c)
        },
        render: g
    }
}
function WebGLBindingStates(s, e, t, i) {
    const n = s.getParameter(34921)
      , r = i.isWebGL2 ? null : e.get("OES_vertex_array_object")
      , o = i.isWebGL2 || r !== null
      , a = {}
      , c = f(null);
    let l = c
      , u = !1;
    function h(C, F, U, z, B) {
        let Z = !1;
        if (o) {
            const j = p(z, U, F);
            l !== j && (l = j,
            m(l.object)),
            Z = x(C, z, U, B),
            Z && S(C, z, U, B)
        } else {
            const j = F.wireframe === !0;
            (l.geometry !== z.id || l.program !== U.id || l.wireframe !== j) && (l.geometry = z.id,
            l.program = U.id,
            l.wireframe = j,
            Z = !0)
        }
        B !== null && t.update(B, 34963),
        (Z || u) && (u = !1,
        _(C, F, U, z),
        B !== null && s.bindBuffer(34963, t.get(B).buffer))
    }
    function d() {
        return i.isWebGL2 ? s.createVertexArray() : r.createVertexArrayOES()
    }
    function m(C) {
        return i.isWebGL2 ? s.bindVertexArray(C) : r.bindVertexArrayOES(C)
    }
    function g(C) {
        return i.isWebGL2 ? s.deleteVertexArray(C) : r.deleteVertexArrayOES(C)
    }
    function p(C, F, U) {
        const z = U.wireframe === !0;
        let B = a[C.id];
        B === void 0 && (B = {},
        a[C.id] = B);
        let Z = B[F.id];
        Z === void 0 && (Z = {},
        B[F.id] = Z);
        let j = Z[z];
        return j === void 0 && (j = f(d()),
        Z[z] = j),
        j
    }
    function f(C) {
        const F = []
          , U = []
          , z = [];
        for (let B = 0; B < n; B++)
            F[B] = 0,
            U[B] = 0,
            z[B] = 0;
        return {
            geometry: null,
            program: null,
            wireframe: !1,
            newAttributes: F,
            enabledAttributes: U,
            attributeDivisors: z,
            object: C,
            attributes: {},
            index: null
        }
    }
    function x(C, F, U, z) {
        const B = l.attributes
          , Z = F.attributes;
        let j = 0;
        const V = U.getAttributes();
        for (const k in V)
            if (V[k].location >= 0) {
                const ee = B[k];
                let ie = Z[k];
                if (ie === void 0 && (k === "instanceMatrix" && C.instanceMatrix && (ie = C.instanceMatrix),
                k === "instanceColor" && C.instanceColor && (ie = C.instanceColor)),
                ee === void 0 || ee.attribute !== ie || ie && ee.data !== ie.data)
                    return !0;
                j++
            }
        return l.attributesNum !== j || l.index !== z
    }
    function S(C, F, U, z) {
        const B = {}
          , Z = F.attributes;
        let j = 0;
        const V = U.getAttributes();
        for (const k in V)
            if (V[k].location >= 0) {
                let ee = Z[k];
                ee === void 0 && (k === "instanceMatrix" && C.instanceMatrix && (ee = C.instanceMatrix),
                k === "instanceColor" && C.instanceColor && (ee = C.instanceColor));
                const ie = {};
                ie.attribute = ee,
                ee && ee.data && (ie.data = ee.data),
                B[k] = ie,
                j++
            }
        l.attributes = B,
        l.attributesNum = j,
        l.index = z
    }
    function v() {
        const C = l.newAttributes;
        for (let F = 0, U = C.length; F < U; F++)
            C[F] = 0
    }
    function M(C) {
        y(C, 0)
    }
    function y(C, F) {
        const U = l.newAttributes
          , z = l.enabledAttributes
          , B = l.attributeDivisors;
        U[C] = 1,
        z[C] === 0 && (s.enableVertexAttribArray(C),
        z[C] = 1),
        B[C] !== F && ((i.isWebGL2 ? s : e.get("ANGLE_instanced_arrays"))[i.isWebGL2 ? "vertexAttribDivisor" : "vertexAttribDivisorANGLE"](C, F),
        B[C] = F)
    }
    function A() {
        const C = l.newAttributes
          , F = l.enabledAttributes;
        for (let U = 0, z = F.length; U < z; U++)
            F[U] !== C[U] && (s.disableVertexAttribArray(U),
            F[U] = 0)
    }
    function P(C, F, U, z, B, Z) {
        i.isWebGL2 === !0 && (U === 5124 || U === 5125) ? s.vertexAttribIPointer(C, F, U, B, Z) : s.vertexAttribPointer(C, F, U, z, B, Z)
    }
    function _(C, F, U, z) {
        if (i.isWebGL2 === !1 && (C.isInstancedMesh || z.isInstancedBufferGeometry) && e.get("ANGLE_instanced_arrays") === null)
            return;
        v();
        const B = z.attributes
          , Z = U.getAttributes()
          , j = F.defaultAttributeValues;
        for (const V in Z) {
            const k = Z[V];
            if (k.location >= 0) {
                let K = B[V];
                if (K === void 0 && (V === "instanceMatrix" && C.instanceMatrix && (K = C.instanceMatrix),
                V === "instanceColor" && C.instanceColor && (K = C.instanceColor)),
                K !== void 0) {
                    const ee = K.normalized
                      , ie = K.itemSize
                      , X = t.get(K);
                    if (X === void 0)
                        continue;
                    const Te = X.buffer
                      , oe = X.type
                      , ge = X.bytesPerElement;
                    if (K.isInterleavedBufferAttribute) {
                        const ae = K.data
                          , Le = ae.stride
                          , xe = K.offset;
                        if (ae.isInstancedInterleavedBuffer) {
                            for (let me = 0; me < k.locationSize; me++)
                                y(k.location + me, ae.meshPerAttribute);
                            C.isInstancedMesh !== !0 && z._maxInstanceCount === void 0 && (z._maxInstanceCount = ae.meshPerAttribute * ae.count)
                        } else
                            for (let me = 0; me < k.locationSize; me++)
                                M(k.location + me);
                        s.bindBuffer(34962, Te);
                        for (let me = 0; me < k.locationSize; me++)
                            P(k.location + me, ie / k.locationSize, oe, ee, Le * ge, (xe + ie / k.locationSize * me) * ge)
                    } else {
                        if (K.isInstancedBufferAttribute) {
                            for (let ae = 0; ae < k.locationSize; ae++)
                                y(k.location + ae, K.meshPerAttribute);
                            C.isInstancedMesh !== !0 && z._maxInstanceCount === void 0 && (z._maxInstanceCount = K.meshPerAttribute * K.count)
                        } else
                            for (let ae = 0; ae < k.locationSize; ae++)
                                M(k.location + ae);
                        s.bindBuffer(34962, Te);
                        for (let ae = 0; ae < k.locationSize; ae++)
                            P(k.location + ae, ie / k.locationSize, oe, ee, ie * ge, ie / k.locationSize * ae * ge)
                    }
                } else if (j !== void 0) {
                    const ee = j[V];
                    if (ee !== void 0)
                        switch (ee.length) {
                        case 2:
                            s.vertexAttrib2fv(k.location, ee);
                            break;
                        case 3:
                            s.vertexAttrib3fv(k.location, ee);
                            break;
                        case 4:
                            s.vertexAttrib4fv(k.location, ee);
                            break;
                        default:
                            s.vertexAttrib1fv(k.location, ee)
                        }
                }
            }
        }
        A()
    }
    function L() {
        R();
        for (const C in a) {
            const F = a[C];
            for (const U in F) {
                const z = F[U];
                for (const B in z)
                    g(z[B].object),
                    delete z[B];
                delete F[U]
            }
            delete a[C]
        }
    }
    function D(C) {
        if (a[C.id] === void 0)
            return;
        const F = a[C.id];
        for (const U in F) {
            const z = F[U];
            for (const B in z)
                g(z[B].object),
                delete z[B];
            delete F[U]
        }
        delete a[C.id]
    }
    function $(C) {
        for (const F in a) {
            const U = a[F];
            if (U[C.id] === void 0)
                continue;
            const z = U[C.id];
            for (const B in z)
                g(z[B].object),
                delete z[B];
            delete U[C.id]
        }
    }
    function R() {
        T(),
        u = !0,
        l !== c && (l = c,
        m(l.object))
    }
    function T() {
        c.geometry = null,
        c.program = null,
        c.wireframe = !1
    }
    return {
        setup: h,
        reset: R,
        resetDefaultState: T,
        dispose: L,
        releaseStatesOfGeometry: D,
        releaseStatesOfProgram: $,
        initAttributes: v,
        enableAttribute: M,
        disableUnusedAttributes: A
    }
}
function WebGLBufferRenderer(s, e, t, i) {
    const n = i.isWebGL2;
    let r;
    function o(l) {
        r = l
    }
    function a(l, u) {
        s.drawArrays(r, l, u),
        t.update(u, r, 1)
    }
    function c(l, u, h) {
        if (h === 0)
            return;
        let d, m;
        if (n)
            d = s,
            m = "drawArraysInstanced";
        else if (d = e.get("ANGLE_instanced_arrays"),
        m = "drawArraysInstancedANGLE",
        d === null) {
            console.error("THREE.WebGLBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.");
            return
        }
        d[m](r, l, u, h),
        t.update(u, r, h)
    }
    this.setMode = o,
    this.render = a,
    this.renderInstances = c
}
function WebGLCapabilities(s, e, t) {
    let i;
    function n() {
        if (i !== void 0)
            return i;
        if (e.has("EXT_texture_filter_anisotropic") === !0) {
            const P = e.get("EXT_texture_filter_anisotropic");
            i = s.getParameter(P.MAX_TEXTURE_MAX_ANISOTROPY_EXT)
        } else
            i = 0;
        return i
    }
    function r(P) {
        if (P === "highp") {
            if (s.getShaderPrecisionFormat(35633, 36338).precision > 0 && s.getShaderPrecisionFormat(35632, 36338).precision > 0)
                return "highp";
            P = "mediump"
        }
        return P === "mediump" && s.getShaderPrecisionFormat(35633, 36337).precision > 0 && s.getShaderPrecisionFormat(35632, 36337).precision > 0 ? "mediump" : "lowp"
    }
    const o = typeof WebGL2RenderingContext < "u" && s instanceof WebGL2RenderingContext || typeof WebGL2ComputeRenderingContext < "u" && s instanceof WebGL2ComputeRenderingContext;
    let a = t.precision !== void 0 ? t.precision : "highp";
    const c = r(a);
    c !== a && (console.warn("THREE.WebGLRenderer:", a, "not supported, using", c, "instead."),
    a = c);
    const l = o || e.has("WEBGL_draw_buffers")
      , u = t.logarithmicDepthBuffer === !0
      , h = s.getParameter(34930)
      , d = s.getParameter(35660)
      , m = s.getParameter(3379)
      , g = s.getParameter(34076)
      , p = s.getParameter(34921)
      , f = s.getParameter(36347)
      , x = s.getParameter(36348)
      , S = s.getParameter(36349)
      , v = d > 0
      , M = o || e.has("OES_texture_float")
      , y = v && M
      , A = o ? s.getParameter(36183) : 0;
    return {
        isWebGL2: o,
        drawBuffers: l,
        getMaxAnisotropy: n,
        getMaxPrecision: r,
        precision: a,
        logarithmicDepthBuffer: u,
        maxTextures: h,
        maxVertexTextures: d,
        maxTextureSize: m,
        maxCubemapSize: g,
        maxAttributes: p,
        maxVertexUniforms: f,
        maxVaryings: x,
        maxFragmentUniforms: S,
        vertexTextures: v,
        floatFragmentTextures: M,
        floatVertexTextures: y,
        maxSamples: A
    }
}
function WebGLClipping(s) {
    const e = this;
    let t = null
      , i = 0
      , n = !1
      , r = !1;
    const o = new Plane
      , a = new Matrix3
      , c = {
        value: null,
        needsUpdate: !1
    };
    this.uniform = c,
    this.numPlanes = 0,
    this.numIntersection = 0,
    this.init = function(h, d, m) {
        const g = h.length !== 0 || d || i !== 0 || n;
        return n = d,
        t = u(h, m, 0),
        i = h.length,
        g
    }
    ,
    this.beginShadows = function() {
        r = !0,
        u(null)
    }
    ,
    this.endShadows = function() {
        r = !1,
        l()
    }
    ,
    this.setState = function(h, d, m) {
        const g = h.clippingPlanes
          , p = h.clipIntersection
          , f = h.clipShadows
          , x = s.get(h);
        if (!n || g === null || g.length === 0 || r && !f)
            r ? u(null) : l();
        else {
            const S = r ? 0 : i
              , v = S * 4;
            let M = x.clippingState || null;
            c.value = M,
            M = u(g, d, v, m);
            for (let y = 0; y !== v; ++y)
                M[y] = t[y];
            x.clippingState = M,
            this.numIntersection = p ? this.numPlanes : 0,
            this.numPlanes += S
        }
    }
    ;
    function l() {
        c.value !== t && (c.value = t,
        c.needsUpdate = i > 0),
        e.numPlanes = i,
        e.numIntersection = 0
    }
    function u(h, d, m, g) {
        const p = h !== null ? h.length : 0;
        let f = null;
        if (p !== 0) {
            if (f = c.value,
            g !== !0 || f === null) {
                const x = m + p * 4
                  , S = d.matrixWorldInverse;
                a.getNormalMatrix(S),
                (f === null || f.length < x) && (f = new Float32Array(x));
                for (let v = 0, M = m; v !== p; ++v,
                M += 4)
                    o.copy(h[v]).applyMatrix4(S, a),
                    o.normal.toArray(f, M),
                    f[M + 3] = o.constant
            }
            c.value = f,
            c.needsUpdate = !0
        }
        return e.numPlanes = p,
        e.numIntersection = 0,
        f
    }
}
function WebGLCubeMaps(s) {
    let e = new WeakMap;
    function t(o, a) {
        return a === EquirectangularReflectionMapping ? o.mapping = CubeReflectionMapping : a === EquirectangularRefractionMapping && (o.mapping = CubeRefractionMapping),
        o
    }
    function i(o) {
        if (o && o.isTexture && o.isRenderTargetTexture === !1) {
            const a = o.mapping;
            if (a === EquirectangularReflectionMapping || a === EquirectangularRefractionMapping)
                if (e.has(o)) {
                    const c = e.get(o).texture;
                    return t(c, o.mapping)
                } else {
                    const c = o.image;
                    if (c && c.height > 0) {
                        const l = new WebGLCubeRenderTarget(c.height / 2);
                        return l.fromEquirectangularTexture(s, o),
                        e.set(o, l),
                        o.addEventListener("dispose", n),
                        t(l.texture, o.mapping)
                    } else
                        return null
                }
        }
        return o
    }
    function n(o) {
        const a = o.target;
        a.removeEventListener("dispose", n);
        const c = e.get(a);
        c !== void 0 && (e.delete(a),
        c.dispose())
    }
    function r() {
        e = new WeakMap
    }
    return {
        get: i,
        dispose: r
    }
}
class OrthographicCamera extends Camera {
    constructor(e=-1, t=1, i=1, n=-1, r=.1, o=2e3) {
        super(),
        this.isOrthographicCamera = !0,
        this.type = "OrthographicCamera",
        this.zoom = 1,
        this.view = null,
        this.left = e,
        this.right = t,
        this.top = i,
        this.bottom = n,
        this.near = r,
        this.far = o,
        this.updateProjectionMatrix()
    }
    copy(e, t) {
        return super.copy(e, t),
        this.left = e.left,
        this.right = e.right,
        this.top = e.top,
        this.bottom = e.bottom,
        this.near = e.near,
        this.far = e.far,
        this.zoom = e.zoom,
        this.view = e.view === null ? null : Object.assign({}, e.view),
        this
    }
    setViewOffset(e, t, i, n, r, o) {
        this.view === null && (this.view = {
            enabled: !0,
            fullWidth: 1,
            fullHeight: 1,
            offsetX: 0,
            offsetY: 0,
            width: 1,
            height: 1
        }),
        this.view.enabled = !0,
        this.view.fullWidth = e,
        this.view.fullHeight = t,
        this.view.offsetX = i,
        this.view.offsetY = n,
        this.view.width = r,
        this.view.height = o,
        this.updateProjectionMatrix()
    }
    clearViewOffset() {
        this.view !== null && (this.view.enabled = !1),
        this.updateProjectionMatrix()
    }
    updateProjectionMatrix() {
        const e = (this.right - this.left) / (2 * this.zoom)
          , t = (this.top - this.bottom) / (2 * this.zoom)
          , i = (this.right + this.left) / 2
          , n = (this.top + this.bottom) / 2;
        let r = i - e
          , o = i + e
          , a = n + t
          , c = n - t;
        if (this.view !== null && this.view.enabled) {
            const l = (this.right - this.left) / this.view.fullWidth / this.zoom
              , u = (this.top - this.bottom) / this.view.fullHeight / this.zoom;
            r += l * this.view.offsetX,
            o = r + l * this.view.width,
            a -= u * this.view.offsetY,
            c = a - u * this.view.height
        }
        this.projectionMatrix.makeOrthographic(r, o, a, c, this.near, this.far),
        this.projectionMatrixInverse.copy(this.projectionMatrix).invert()
    }
    toJSON(e) {
        const t = super.toJSON(e);
        return t.object.zoom = this.zoom,
        t.object.left = this.left,
        t.object.right = this.right,
        t.object.top = this.top,
        t.object.bottom = this.bottom,
        t.object.near = this.near,
        t.object.far = this.far,
        this.view !== null && (t.object.view = Object.assign({}, this.view)),
        t
    }
}
const LOD_MIN = 4
  , EXTRA_LOD_SIGMA = [.125, .215, .35, .446, .526, .582]
  , MAX_SAMPLES = 20
  , _flatCamera = new OrthographicCamera
  , _clearColor = new Color;
let _oldTarget = null;
const PHI = (1 + Math.sqrt(5)) / 2
  , INV_PHI = 1 / PHI
  , _axisDirections = [new Vector3(1,1,1), new Vector3(-1,1,1), new Vector3(1,1,-1), new Vector3(-1,1,-1), new Vector3(0,PHI,INV_PHI), new Vector3(0,PHI,-INV_PHI), new Vector3(INV_PHI,0,PHI), new Vector3(-INV_PHI,0,PHI), new Vector3(PHI,INV_PHI,0), new Vector3(-PHI,INV_PHI,0)];
class PMREMGenerator {
    constructor(e) {
        this._renderer = e,
        this._pingPongRenderTarget = null,
        this._lodMax = 0,
        this._cubeSize = 0,
        this._lodPlanes = [],
        this._sizeLods = [],
        this._sigmas = [],
        this._blurMaterial = null,
        this._cubemapMaterial = null,
        this._equirectMaterial = null,
        this._compileMaterial(this._blurMaterial)
    }
    fromScene(e, t=0, i=.1, n=100) {
        _oldTarget = this._renderer.getRenderTarget(),
        this._setSize(256);
        const r = this._allocateTargets();
        return r.depthBuffer = !0,
        this._sceneToCubeUV(e, i, n, r),
        t > 0 && this._blur(r, 0, 0, t),
        this._applyPMREM(r),
        this._cleanup(r),
        r
    }
    fromEquirectangular(e, t=null) {
        return this._fromTexture(e, t)
    }
    fromCubemap(e, t=null) {
        return this._fromTexture(e, t)
    }
    compileCubemapShader() {
        this._cubemapMaterial === null && (this._cubemapMaterial = _getCubemapMaterial(),
        this._compileMaterial(this._cubemapMaterial))
    }
    compileEquirectangularShader() {
        this._equirectMaterial === null && (this._equirectMaterial = _getEquirectMaterial(),
        this._compileMaterial(this._equirectMaterial))
    }
    dispose() {
        this._dispose(),
        this._cubemapMaterial !== null && this._cubemapMaterial.dispose(),
        this._equirectMaterial !== null && this._equirectMaterial.dispose()
    }
    _setSize(e) {
        this._lodMax = Math.floor(Math.log2(e)),
        this._cubeSize = Math.pow(2, this._lodMax)
    }
    _dispose() {
        this._blurMaterial !== null && this._blurMaterial.dispose(),
        this._pingPongRenderTarget !== null && this._pingPongRenderTarget.dispose();
        for (let e = 0; e < this._lodPlanes.length; e++)
            this._lodPlanes[e].dispose()
    }
    _cleanup(e) {
        this._renderer.setRenderTarget(_oldTarget),
        e.scissorTest = !1,
        _setViewport(e, 0, 0, e.width, e.height)
    }
    _fromTexture(e, t) {
        e.mapping === CubeReflectionMapping || e.mapping === CubeRefractionMapping ? this._setSize(e.image.length === 0 ? 16 : e.image[0].width || e.image[0].image.width) : this._setSize(e.image.width / 4),
        _oldTarget = this._renderer.getRenderTarget();
        const i = t || this._allocateTargets();
        return this._textureToCubeUV(e, i),
        this._applyPMREM(i),
        this._cleanup(i),
        i
    }
    _allocateTargets() {
        const e = 3 * Math.max(this._cubeSize, 112)
          , t = 4 * this._cubeSize
          , i = {
            magFilter: LinearFilter,
            minFilter: LinearFilter,
            generateMipmaps: !1,
            type: HalfFloatType,
            format: RGBAFormat,
            encoding: LinearEncoding,
            depthBuffer: !1
        }
          , n = _createRenderTarget(e, t, i);
        if (this._pingPongRenderTarget === null || this._pingPongRenderTarget.width !== e) {
            this._pingPongRenderTarget !== null && this._dispose(),
            this._pingPongRenderTarget = _createRenderTarget(e, t, i);
            const {_lodMax: r} = this;
            ({sizeLods: this._sizeLods, lodPlanes: this._lodPlanes, sigmas: this._sigmas} = _createPlanes(r)),
            this._blurMaterial = _getBlurShader(r, e, t)
        }
        return n
    }
    _compileMaterial(e) {
        const t = new Mesh(this._lodPlanes[0],e);
        this._renderer.compile(t, _flatCamera)
    }
    _sceneToCubeUV(e, t, i, n) {
        const a = new PerspectiveCamera(90,1,t,i)
          , c = [1, -1, 1, 1, 1, 1]
          , l = [1, 1, 1, -1, -1, -1]
          , u = this._renderer
          , h = u.autoClear
          , d = u.toneMapping;
        u.getClearColor(_clearColor),
        u.toneMapping = NoToneMapping,
        u.autoClear = !1;
        const m = new MeshBasicMaterial({
            name: "PMREM.Background",
            side: BackSide,
            depthWrite: !1,
            depthTest: !1
        })
          , g = new Mesh(new BoxGeometry,m);
        let p = !1;
        const f = e.background;
        f ? f.isColor && (m.color.copy(f),
        e.background = null,
        p = !0) : (m.color.copy(_clearColor),
        p = !0);
        for (let x = 0; x < 6; x++) {
            const S = x % 3;
            S === 0 ? (a.up.set(0, c[x], 0),
            a.lookAt(l[x], 0, 0)) : S === 1 ? (a.up.set(0, 0, c[x]),
            a.lookAt(0, l[x], 0)) : (a.up.set(0, c[x], 0),
            a.lookAt(0, 0, l[x]));
            const v = this._cubeSize;
            _setViewport(n, S * v, x > 2 ? v : 0, v, v),
            u.setRenderTarget(n),
            p && u.render(g, a),
            u.render(e, a)
        }
        g.geometry.dispose(),
        g.material.dispose(),
        u.toneMapping = d,
        u.autoClear = h,
        e.background = f
    }
    _textureToCubeUV(e, t) {
        const i = this._renderer
          , n = e.mapping === CubeReflectionMapping || e.mapping === CubeRefractionMapping;
        n ? (this._cubemapMaterial === null && (this._cubemapMaterial = _getCubemapMaterial()),
        this._cubemapMaterial.uniforms.flipEnvMap.value = e.isRenderTargetTexture === !1 ? -1 : 1) : this._equirectMaterial === null && (this._equirectMaterial = _getEquirectMaterial());
        const r = n ? this._cubemapMaterial : this._equirectMaterial
          , o = new Mesh(this._lodPlanes[0],r)
          , a = r.uniforms;
        a.envMap.value = e;
        const c = this._cubeSize;
        _setViewport(t, 0, 0, 3 * c, 2 * c),
        i.setRenderTarget(t),
        i.render(o, _flatCamera)
    }
    _applyPMREM(e) {
        const t = this._renderer
          , i = t.autoClear;
        t.autoClear = !1;
        for (let n = 1; n < this._lodPlanes.length; n++) {
            const r = Math.sqrt(this._sigmas[n] * this._sigmas[n] - this._sigmas[n - 1] * this._sigmas[n - 1])
              , o = _axisDirections[(n - 1) % _axisDirections.length];
            this._blur(e, n - 1, n, r, o)
        }
        t.autoClear = i
    }
    _blur(e, t, i, n, r) {
        const o = this._pingPongRenderTarget;
        this._halfBlur(e, o, t, i, n, "latitudinal", r),
        this._halfBlur(o, e, i, i, n, "longitudinal", r)
    }
    _halfBlur(e, t, i, n, r, o, a) {
        const c = this._renderer
          , l = this._blurMaterial;
        o !== "latitudinal" && o !== "longitudinal" && console.error("blur direction must be either latitudinal or longitudinal!");
        const u = 3
          , h = new Mesh(this._lodPlanes[n],l)
          , d = l.uniforms
          , m = this._sizeLods[i] - 1
          , g = isFinite(r) ? Math.PI / (2 * m) : 2 * Math.PI / (2 * MAX_SAMPLES - 1)
          , p = r / g
          , f = isFinite(r) ? 1 + Math.floor(u * p) : MAX_SAMPLES;
        f > MAX_SAMPLES && console.warn(`sigmaRadians, ${r}, is too large and will clip, as it requested ${f} samples when the maximum is set to ${MAX_SAMPLES}`);
        const x = [];
        let S = 0;
        for (let P = 0; P < MAX_SAMPLES; ++P) {
            const _ = P / p
              , L = Math.exp(-_ * _ / 2);
            x.push(L),
            P === 0 ? S += L : P < f && (S += 2 * L)
        }
        for (let P = 0; P < x.length; P++)
            x[P] = x[P] / S;
        d.envMap.value = e.texture,
        d.samples.value = f,
        d.weights.value = x,
        d.latitudinal.value = o === "latitudinal",
        a && (d.poleAxis.value = a);
        const {_lodMax: v} = this;
        d.dTheta.value = g,
        d.mipInt.value = v - i;
        const M = this._sizeLods[n]
          , y = 3 * M * (n > v - LOD_MIN ? n - v + LOD_MIN : 0)
          , A = 4 * (this._cubeSize - M);
        _setViewport(t, y, A, 3 * M, 2 * M),
        c.setRenderTarget(t),
        c.render(h, _flatCamera)
    }
}
function _createPlanes(s) {
    const e = []
      , t = []
      , i = [];
    let n = s;
    const r = s - LOD_MIN + 1 + EXTRA_LOD_SIGMA.length;
    for (let o = 0; o < r; o++) {
        const a = Math.pow(2, n);
        t.push(a);
        let c = 1 / a;
        o > s - LOD_MIN ? c = EXTRA_LOD_SIGMA[o - s + LOD_MIN - 1] : o === 0 && (c = 0),
        i.push(c);
        const l = 1 / (a - 2)
          , u = -l
          , h = 1 + l
          , d = [u, u, h, u, h, h, u, u, h, h, u, h]
          , m = 6
          , g = 6
          , p = 3
          , f = 2
          , x = 1
          , S = new Float32Array(p * g * m)
          , v = new Float32Array(f * g * m)
          , M = new Float32Array(x * g * m);
        for (let A = 0; A < m; A++) {
            const P = A % 3 * 2 / 3 - 1
              , _ = A > 2 ? 0 : -1
              , L = [P, _, 0, P + 2 / 3, _, 0, P + 2 / 3, _ + 1, 0, P, _, 0, P + 2 / 3, _ + 1, 0, P, _ + 1, 0];
            S.set(L, p * g * A),
            v.set(d, f * g * A);
            const D = [A, A, A, A, A, A];
            M.set(D, x * g * A)
        }
        const y = new BufferGeometry;
        y.setAttribute("position", new BufferAttribute(S,p)),
        y.setAttribute("uv", new BufferAttribute(v,f)),
        y.setAttribute("faceIndex", new BufferAttribute(M,x)),
        e.push(y),
        n > LOD_MIN && n--
    }
    return {
        lodPlanes: e,
        sizeLods: t,
        sigmas: i
    }
}
function _createRenderTarget(s, e, t) {
    const i = new WebGLRenderTarget(s,e,t);
    return i.texture.mapping = CubeUVReflectionMapping,
    i.texture.name = "PMREM.cubeUv",
    i.scissorTest = !0,
    i
}
function _setViewport(s, e, t, i, n) {
    s.viewport.set(e, t, i, n),
    s.scissor.set(e, t, i, n)
}
function _getBlurShader(s, e, t) {
    const i = new Float32Array(MAX_SAMPLES)
      , n = new Vector3(0,1,0);
    return new ShaderMaterial({
        name: "SphericalGaussianBlur",
        defines: {
            n: MAX_SAMPLES,
            CUBEUV_TEXEL_WIDTH: 1 / e,
            CUBEUV_TEXEL_HEIGHT: 1 / t,
            CUBEUV_MAX_MIP: `${s}.0`
        },
        uniforms: {
            envMap: {
                value: null
            },
            samples: {
                value: 1
            },
            weights: {
                value: i
            },
            latitudinal: {
                value: !1
            },
            dTheta: {
                value: 0
            },
            mipInt: {
                value: 0
            },
            poleAxis: {
                value: n
            }
        },
        vertexShader: _getCommonVertexShader(),
        fragmentShader: `

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,
        blending: NoBlending,
        depthTest: !1,
        depthWrite: !1
    })
}
function _getEquirectMaterial() {
    return new ShaderMaterial({
        name: "EquirectangularToCubeUV",
        uniforms: {
            envMap: {
                value: null
            }
        },
        vertexShader: _getCommonVertexShader(),
        fragmentShader: `

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,
        blending: NoBlending,
        depthTest: !1,
        depthWrite: !1
    })
}
function _getCubemapMaterial() {
    return new ShaderMaterial({
        name: "CubemapToCubeUV",
        uniforms: {
            envMap: {
                value: null
            },
            flipEnvMap: {
                value: -1
            }
        },
        vertexShader: _getCommonVertexShader(),
        fragmentShader: `

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,
        blending: NoBlending,
        depthTest: !1,
        depthWrite: !1
    })
}
function _getCommonVertexShader() {
    return `

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`
}
function WebGLCubeUVMaps(s) {
    let e = new WeakMap
      , t = null;
    function i(a) {
        if (a && a.isTexture) {
            const c = a.mapping
              , l = c === EquirectangularReflectionMapping || c === EquirectangularRefractionMapping
              , u = c === CubeReflectionMapping || c === CubeRefractionMapping;
            if (l || u)
                if (a.isRenderTargetTexture && a.needsPMREMUpdate === !0) {
                    a.needsPMREMUpdate = !1;
                    let h = e.get(a);
                    return t === null && (t = new PMREMGenerator(s)),
                    h = l ? t.fromEquirectangular(a, h) : t.fromCubemap(a, h),
                    e.set(a, h),
                    h.texture
                } else {
                    if (e.has(a))
                        return e.get(a).texture;
                    {
                        const h = a.image;
                        if (l && h && h.height > 0 || u && h && n(h)) {
                            t === null && (t = new PMREMGenerator(s));
                            const d = l ? t.fromEquirectangular(a) : t.fromCubemap(a);
                            return e.set(a, d),
                            a.addEventListener("dispose", r),
                            d.texture
                        } else
                            return null
                    }
                }
        }
        return a
    }
    function n(a) {
        let c = 0;
        const l = 6;
        for (let u = 0; u < l; u++)
            a[u] !== void 0 && c++;
        return c === l
    }
    function r(a) {
        const c = a.target;
        c.removeEventListener("dispose", r);
        const l = e.get(c);
        l !== void 0 && (e.delete(c),
        l.dispose())
    }
    function o() {
        e = new WeakMap,
        t !== null && (t.dispose(),
        t = null)
    }
    return {
        get: i,
        dispose: o
    }
}
function WebGLExtensions(s) {
    const e = {};
    function t(i) {
        if (e[i] !== void 0)
            return e[i];
        let n;
        switch (i) {
        case "WEBGL_depth_texture":
            n = s.getExtension("WEBGL_depth_texture") || s.getExtension("MOZ_WEBGL_depth_texture") || s.getExtension("WEBKIT_WEBGL_depth_texture");
            break;
        case "EXT_texture_filter_anisotropic":
            n = s.getExtension("EXT_texture_filter_anisotropic") || s.getExtension("MOZ_EXT_texture_filter_anisotropic") || s.getExtension("WEBKIT_EXT_texture_filter_anisotropic");
            break;
        case "WEBGL_compressed_texture_s3tc":
            n = s.getExtension("WEBGL_compressed_texture_s3tc") || s.getExtension("MOZ_WEBGL_compressed_texture_s3tc") || s.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");
            break;
        case "WEBGL_compressed_texture_pvrtc":
            n = s.getExtension("WEBGL_compressed_texture_pvrtc") || s.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");
            break;
        default:
            n = s.getExtension(i)
        }
        return e[i] = n,
        n
    }
    return {
        has: function(i) {
            return t(i) !== null
        },
        init: function(i) {
            i.isWebGL2 ? t("EXT_color_buffer_float") : (t("WEBGL_depth_texture"),
            t("OES_texture_float"),
            t("OES_texture_half_float"),
            t("OES_texture_half_float_linear"),
            t("OES_standard_derivatives"),
            t("OES_element_index_uint"),
            t("OES_vertex_array_object"),
            t("ANGLE_instanced_arrays")),
            t("OES_texture_float_linear"),
            t("EXT_color_buffer_half_float"),
            t("WEBGL_multisampled_render_to_texture")
        },
        get: function(i) {
            const n = t(i);
            return n === null && console.warn("THREE.WebGLRenderer: " + i + " extension not supported."),
            n
        }
    }
}
function WebGLGeometries(s, e, t, i) {
    const n = {}
      , r = new WeakMap;
    function o(h) {
        const d = h.target;
        d.index !== null && e.remove(d.index);
        for (const g in d.attributes)
            e.remove(d.attributes[g]);
        d.removeEventListener("dispose", o),
        delete n[d.id];
        const m = r.get(d);
        m && (e.remove(m),
        r.delete(d)),
        i.releaseStatesOfGeometry(d),
        d.isInstancedBufferGeometry === !0 && delete d._maxInstanceCount,
        t.memory.geometries--
    }
    function a(h, d) {
        return n[d.id] === !0 || (d.addEventListener("dispose", o),
        n[d.id] = !0,
        t.memory.geometries++),
        d
    }
    function c(h) {
        const d = h.attributes;
        for (const g in d)
            e.update(d[g], 34962);
        const m = h.morphAttributes;
        for (const g in m) {
            const p = m[g];
            for (let f = 0, x = p.length; f < x; f++)
                e.update(p[f], 34962)
        }
    }
    function l(h) {
        const d = []
          , m = h.index
          , g = h.attributes.position;
        let p = 0;
        if (m !== null) {
            const S = m.array;
            p = m.version;
            for (let v = 0, M = S.length; v < M; v += 3) {
                const y = S[v + 0]
                  , A = S[v + 1]
                  , P = S[v + 2];
                d.push(y, A, A, P, P, y)
            }
        } else {
            const S = g.array;
            p = g.version;
            for (let v = 0, M = S.length / 3 - 1; v < M; v += 3) {
                const y = v + 0
                  , A = v + 1
                  , P = v + 2;
                d.push(y, A, A, P, P, y)
            }
        }
        const f = new (arrayNeedsUint32(d) ? Uint32BufferAttribute : Uint16BufferAttribute)(d,1);
        f.version = p;
        const x = r.get(h);
        x && e.remove(x),
        r.set(h, f)
    }
    function u(h) {
        const d = r.get(h);
        if (d) {
            const m = h.index;
            m !== null && d.version < m.version && l(h)
        } else
            l(h);
        return r.get(h)
    }
    return {
        get: a,
        update: c,
        getWireframeAttribute: u
    }
}
function WebGLIndexedBufferRenderer(s, e, t, i) {
    const n = i.isWebGL2;
    let r;
    function o(d) {
        r = d
    }
    let a, c;
    function l(d) {
        a = d.type,
        c = d.bytesPerElement
    }
    function u(d, m) {
        s.drawElements(r, m, a, d * c),
        t.update(m, r, 1)
    }
    function h(d, m, g) {
        if (g === 0)
            return;
        let p, f;
        if (n)
            p = s,
            f = "drawElementsInstanced";
        else if (p = e.get("ANGLE_instanced_arrays"),
        f = "drawElementsInstancedANGLE",
        p === null) {
            console.error("THREE.WebGLIndexedBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.");
            return
        }
        p[f](r, m, a, d * c, g),
        t.update(m, r, g)
    }
    this.setMode = o,
    this.setIndex = l,
    this.render = u,
    this.renderInstances = h
}
function WebGLInfo(s) {
    const e = {
        geometries: 0,
        textures: 0
    }
      , t = {
        frame: 0,
        calls: 0,
        triangles: 0,
        points: 0,
        lines: 0
    };
    function i(r, o, a) {
        switch (t.calls++,
        o) {
        case 4:
            t.triangles += a * (r / 3);
            break;
        case 1:
            t.lines += a * (r / 2);
            break;
        case 3:
            t.lines += a * (r - 1);
            break;
        case 2:
            t.lines += a * r;
            break;
        case 0:
            t.points += a * r;
            break;
        default:
            console.error("THREE.WebGLInfo: Unknown draw mode:", o);
            break
        }
    }
    function n() {
        t.frame++,
        t.calls = 0,
        t.triangles = 0,
        t.points = 0,
        t.lines = 0
    }
    return {
        memory: e,
        render: t,
        programs: null,
        autoReset: !0,
        reset: n,
        update: i
    }
}
function numericalSort(s, e) {
    return s[0] - e[0]
}
function absNumericalSort(s, e) {
    return Math.abs(e[1]) - Math.abs(s[1])
}
function WebGLMorphtargets(s, e, t) {
    const i = {}
      , n = new Float32Array(8)
      , r = new WeakMap
      , o = new Vector4
      , a = [];
    for (let l = 0; l < 8; l++)
        a[l] = [l, 0];
    function c(l, u, h, d) {
        const m = l.morphTargetInfluences;
        if (e.isWebGL2 === !0) {
            const p = u.morphAttributes.position || u.morphAttributes.normal || u.morphAttributes.color
              , f = p !== void 0 ? p.length : 0;
            let x = r.get(u);
            if (x === void 0 || x.count !== f) {
                let U = function() {
                    C.dispose(),
                    r.delete(u),
                    u.removeEventListener("dispose", U)
                };
                var g = U;
                x !== void 0 && x.texture.dispose();
                const M = u.morphAttributes.position !== void 0
                  , y = u.morphAttributes.normal !== void 0
                  , A = u.morphAttributes.color !== void 0
                  , P = u.morphAttributes.position || []
                  , _ = u.morphAttributes.normal || []
                  , L = u.morphAttributes.color || [];
                let D = 0;
                M === !0 && (D = 1),
                y === !0 && (D = 2),
                A === !0 && (D = 3);
                let $ = u.attributes.position.count * D
                  , R = 1;
                $ > e.maxTextureSize && (R = Math.ceil($ / e.maxTextureSize),
                $ = e.maxTextureSize);
                const T = new Float32Array($ * R * 4 * f)
                  , C = new DataArrayTexture(T,$,R,f);
                C.type = FloatType,
                C.needsUpdate = !0;
                const F = D * 4;
                for (let z = 0; z < f; z++) {
                    const B = P[z]
                      , Z = _[z]
                      , j = L[z]
                      , V = $ * R * 4 * z;
                    for (let k = 0; k < B.count; k++) {
                        const K = k * F;
                        M === !0 && (o.fromBufferAttribute(B, k),
                        T[V + K + 0] = o.x,
                        T[V + K + 1] = o.y,
                        T[V + K + 2] = o.z,
                        T[V + K + 3] = 0),
                        y === !0 && (o.fromBufferAttribute(Z, k),
                        T[V + K + 4] = o.x,
                        T[V + K + 5] = o.y,
                        T[V + K + 6] = o.z,
                        T[V + K + 7] = 0),
                        A === !0 && (o.fromBufferAttribute(j, k),
                        T[V + K + 8] = o.x,
                        T[V + K + 9] = o.y,
                        T[V + K + 10] = o.z,
                        T[V + K + 11] = j.itemSize === 4 ? o.w : 1)
                    }
                }
                x = {
                    count: f,
                    texture: C,
                    size: new Vector2($,R)
                },
                r.set(u, x),
                u.addEventListener("dispose", U)
            }
            let S = 0;
            for (let M = 0; M < m.length; M++)
                S += m[M];
            const v = u.morphTargetsRelative ? 1 : 1 - S;
            d.getUniforms().setValue(s, "morphTargetBaseInfluence", v),
            d.getUniforms().setValue(s, "morphTargetInfluences", m),
            d.getUniforms().setValue(s, "morphTargetsTexture", x.texture, t),
            d.getUniforms().setValue(s, "morphTargetsTextureSize", x.size)
        } else {
            const p = m === void 0 ? 0 : m.length;
            let f = i[u.id];
            if (f === void 0 || f.length !== p) {
                f = [];
                for (let y = 0; y < p; y++)
                    f[y] = [y, 0];
                i[u.id] = f
            }
            for (let y = 0; y < p; y++) {
                const A = f[y];
                A[0] = y,
                A[1] = m[y]
            }
            f.sort(absNumericalSort);
            for (let y = 0; y < 8; y++)
                y < p && f[y][1] ? (a[y][0] = f[y][0],
                a[y][1] = f[y][1]) : (a[y][0] = Number.MAX_SAFE_INTEGER,
                a[y][1] = 0);
            a.sort(numericalSort);
            const x = u.morphAttributes.position
              , S = u.morphAttributes.normal;
            let v = 0;
            for (let y = 0; y < 8; y++) {
                const A = a[y]
                  , P = A[0]
                  , _ = A[1];
                P !== Number.MAX_SAFE_INTEGER && _ ? (x && u.getAttribute("morphTarget" + y) !== x[P] && u.setAttribute("morphTarget" + y, x[P]),
                S && u.getAttribute("morphNormal" + y) !== S[P] && u.setAttribute("morphNormal" + y, S[P]),
                n[y] = _,
                v += _) : (x && u.hasAttribute("morphTarget" + y) === !0 && u.deleteAttribute("morphTarget" + y),
                S && u.hasAttribute("morphNormal" + y) === !0 && u.deleteAttribute("morphNormal" + y),
                n[y] = 0)
            }
            const M = u.morphTargetsRelative ? 1 : 1 - v;
            d.getUniforms().setValue(s, "morphTargetBaseInfluence", M),
            d.getUniforms().setValue(s, "morphTargetInfluences", n)
        }
    }
    return {
        update: c
    }
}
function WebGLObjects(s, e, t, i) {
    let n = new WeakMap;
    function r(c) {
        const l = i.render.frame
          , u = c.geometry
          , h = e.get(c, u);
        return n.get(h) !== l && (e.update(h),
        n.set(h, l)),
        c.isInstancedMesh && (c.hasEventListener("dispose", a) === !1 && c.addEventListener("dispose", a),
        t.update(c.instanceMatrix, 34962),
        c.instanceColor !== null && t.update(c.instanceColor, 34962)),
        h
    }
    function o() {
        n = new WeakMap
    }
    function a(c) {
        const l = c.target;
        l.removeEventListener("dispose", a),
        t.remove(l.instanceMatrix),
        l.instanceColor !== null && t.remove(l.instanceColor)
    }
    return {
        update: r,
        dispose: o
    }
}
const emptyTexture = new Texture
  , emptyArrayTexture = new DataArrayTexture
  , empty3dTexture = new Data3DTexture
  , emptyCubeTexture = new CubeTexture
  , arrayCacheF32 = []
  , arrayCacheI32 = []
  , mat4array = new Float32Array(16)
  , mat3array = new Float32Array(9)
  , mat2array = new Float32Array(4);
function flatten(s, e, t) {
    const i = s[0];
    if (i <= 0 || i > 0)
        return s;
    const n = e * t;
    let r = arrayCacheF32[n];
    if (r === void 0 && (r = new Float32Array(n),
    arrayCacheF32[n] = r),
    e !== 0) {
        i.toArray(r, 0);
        for (let o = 1, a = 0; o !== e; ++o)
            a += t,
            s[o].toArray(r, a)
    }
    return r
}
function arraysEqual(s, e) {
    if (s.length !== e.length)
        return !1;
    for (let t = 0, i = s.length; t < i; t++)
        if (s[t] !== e[t])
            return !1;
    return !0
}
function copyArray(s, e) {
    for (let t = 0, i = e.length; t < i; t++)
        s[t] = e[t]
}
function allocTexUnits(s, e) {
    let t = arrayCacheI32[e];
    t === void 0 && (t = new Int32Array(e),
    arrayCacheI32[e] = t);
    for (let i = 0; i !== e; ++i)
        t[i] = s.allocateTextureUnit();
    return t
}
function setValueV1f(s, e) {
    const t = this.cache;
    t[0] !== e && (s.uniform1f(this.addr, e),
    t[0] = e)
}
function setValueV2f(s, e) {
    const t = this.cache;
    if (e.x !== void 0)
        (t[0] !== e.x || t[1] !== e.y) && (s.uniform2f(this.addr, e.x, e.y),
        t[0] = e.x,
        t[1] = e.y);
    else {
        if (arraysEqual(t, e))
            return;
        s.uniform2fv(this.addr, e),
        copyArray(t, e)
    }
}
function setValueV3f(s, e) {
    const t = this.cache;
    if (e.x !== void 0)
        (t[0] !== e.x || t[1] !== e.y || t[2] !== e.z) && (s.uniform3f(this.addr, e.x, e.y, e.z),
        t[0] = e.x,
        t[1] = e.y,
        t[2] = e.z);
    else if (e.r !== void 0)
        (t[0] !== e.r || t[1] !== e.g || t[2] !== e.b) && (s.uniform3f(this.addr, e.r, e.g, e.b),
        t[0] = e.r,
        t[1] = e.g,
        t[2] = e.b);
    else {
        if (arraysEqual(t, e))
            return;
        s.uniform3fv(this.addr, e),
        copyArray(t, e)
    }
}
function setValueV4f(s, e) {
    const t = this.cache;
    if (e.x !== void 0)
        (t[0] !== e.x || t[1] !== e.y || t[2] !== e.z || t[3] !== e.w) && (s.uniform4f(this.addr, e.x, e.y, e.z, e.w),
        t[0] = e.x,
        t[1] = e.y,
        t[2] = e.z,
        t[3] = e.w);
    else {
        if (arraysEqual(t, e))
            return;
        s.uniform4fv(this.addr, e),
        copyArray(t, e)
    }
}
function setValueM2(s, e) {
    const t = this.cache
      , i = e.elements;
    if (i === void 0) {
        if (arraysEqual(t, e))
            return;
        s.uniformMatrix2fv(this.addr, !1, e),
        copyArray(t, e)
    } else {
        if (arraysEqual(t, i))
            return;
        mat2array.set(i),
        s.uniformMatrix2fv(this.addr, !1, mat2array),
        copyArray(t, i)
    }
}
function setValueM3(s, e) {
    const t = this.cache
      , i = e.elements;
    if (i === void 0) {
        if (arraysEqual(t, e))
            return;
        s.uniformMatrix3fv(this.addr, !1, e),
        copyArray(t, e)
    } else {
        if (arraysEqual(t, i))
            return;
        mat3array.set(i),
        s.uniformMatrix3fv(this.addr, !1, mat3array),
        copyArray(t, i)
    }
}
function setValueM4(s, e) {
    const t = this.cache
      , i = e.elements;
    if (i === void 0) {
        if (arraysEqual(t, e))
            return;
        s.uniformMatrix4fv(this.addr, !1, e),
        copyArray(t, e)
    } else {
        if (arraysEqual(t, i))
            return;
        mat4array.set(i),
        s.uniformMatrix4fv(this.addr, !1, mat4array),
        copyArray(t, i)
    }
}
function setValueV1i(s, e) {
    const t = this.cache;
    t[0] !== e && (s.uniform1i(this.addr, e),
    t[0] = e)
}
function setValueV2i(s, e) {
    const t = this.cache;
    if (e.x !== void 0)
        (t[0] !== e.x || t[1] !== e.y) && (s.uniform2i(this.addr, e.x, e.y),
        t[0] = e.x,
        t[1] = e.y);
    else {
        if (arraysEqual(t, e))
            return;
        s.uniform2iv(this.addr, e),
        copyArray(t, e)
    }
}
function setValueV3i(s, e) {
    const t = this.cache;
    if (e.x !== void 0)
        (t[0] !== e.x || t[1] !== e.y || t[2] !== e.z) && (s.uniform3i(this.addr, e.x, e.y, e.z),
        t[0] = e.x,
        t[1] = e.y,
        t[2] = e.z);
    else {
        if (arraysEqual(t, e))
            return;
        s.uniform3iv(this.addr, e),
        copyArray(t, e)
    }
}
function setValueV4i(s, e) {
    const t = this.cache;
    if (e.x !== void 0)
        (t[0] !== e.x || t[1] !== e.y || t[2] !== e.z || t[3] !== e.w) && (s.uniform4i(this.addr, e.x, e.y, e.z, e.w),
        t[0] = e.x,
        t[1] = e.y,
        t[2] = e.z,
        t[3] = e.w);
    else {
        if (arraysEqual(t, e))
            return;
        s.uniform4iv(this.addr, e),
        copyArray(t, e)
    }
}
function setValueV1ui(s, e) {
    const t = this.cache;
    t[0] !== e && (s.uniform1ui(this.addr, e),
    t[0] = e)
}
function setValueV2ui(s, e) {
    const t = this.cache;
    if (e.x !== void 0)
        (t[0] !== e.x || t[1] !== e.y) && (s.uniform2ui(this.addr, e.x, e.y),
        t[0] = e.x,
        t[1] = e.y);
    else {
        if (arraysEqual(t, e))
            return;
        s.uniform2uiv(this.addr, e),
        copyArray(t, e)
    }
}
function setValueV3ui(s, e) {
    const t = this.cache;
    if (e.x !== void 0)
        (t[0] !== e.x || t[1] !== e.y || t[2] !== e.z) && (s.uniform3ui(this.addr, e.x, e.y, e.z),
        t[0] = e.x,
        t[1] = e.y,
        t[2] = e.z);
    else {
        if (arraysEqual(t, e))
            return;
        s.uniform3uiv(this.addr, e),
        copyArray(t, e)
    }
}
function setValueV4ui(s, e) {
    const t = this.cache;
    if (e.x !== void 0)
        (t[0] !== e.x || t[1] !== e.y || t[2] !== e.z || t[3] !== e.w) && (s.uniform4ui(this.addr, e.x, e.y, e.z, e.w),
        t[0] = e.x,
        t[1] = e.y,
        t[2] = e.z,
        t[3] = e.w);
    else {
        if (arraysEqual(t, e))
            return;
        s.uniform4uiv(this.addr, e),
        copyArray(t, e)
    }
}
function setValueT1(s, e, t) {
    const i = this.cache
      , n = t.allocateTextureUnit();
    i[0] !== n && (s.uniform1i(this.addr, n),
    i[0] = n),
    t.setTexture2D(e || emptyTexture, n)
}
function setValueT3D1(s, e, t) {
    const i = this.cache
      , n = t.allocateTextureUnit();
    i[0] !== n && (s.uniform1i(this.addr, n),
    i[0] = n),
    t.setTexture3D(e || empty3dTexture, n)
}
function setValueT6(s, e, t) {
    const i = this.cache
      , n = t.allocateTextureUnit();
    i[0] !== n && (s.uniform1i(this.addr, n),
    i[0] = n),
    t.setTextureCube(e || emptyCubeTexture, n)
}
function setValueT2DArray1(s, e, t) {
    const i = this.cache
      , n = t.allocateTextureUnit();
    i[0] !== n && (s.uniform1i(this.addr, n),
    i[0] = n),
    t.setTexture2DArray(e || emptyArrayTexture, n)
}
function getSingularSetter(s) {
    switch (s) {
    case 5126:
        return setValueV1f;
    case 35664:
        return setValueV2f;
    case 35665:
        return setValueV3f;
    case 35666:
        return setValueV4f;
    case 35674:
        return setValueM2;
    case 35675:
        return setValueM3;
    case 35676:
        return setValueM4;
    case 5124:
    case 35670:
        return setValueV1i;
    case 35667:
    case 35671:
        return setValueV2i;
    case 35668:
    case 35672:
        return setValueV3i;
    case 35669:
    case 35673:
        return setValueV4i;
    case 5125:
        return setValueV1ui;
    case 36294:
        return setValueV2ui;
    case 36295:
        return setValueV3ui;
    case 36296:
        return setValueV4ui;
    case 35678:
    case 36198:
    case 36298:
    case 36306:
    case 35682:
        return setValueT1;
    case 35679:
    case 36299:
    case 36307:
        return setValueT3D1;
    case 35680:
    case 36300:
    case 36308:
    case 36293:
        return setValueT6;
    case 36289:
    case 36303:
    case 36311:
    case 36292:
        return setValueT2DArray1
    }
}
function setValueV1fArray(s, e) {
    s.uniform1fv(this.addr, e)
}
function setValueV2fArray(s, e) {
    const t = flatten(e, this.size, 2);
    s.uniform2fv(this.addr, t)
}
function setValueV3fArray(s, e) {
    const t = flatten(e, this.size, 3);
    s.uniform3fv(this.addr, t)
}
function setValueV4fArray(s, e) {
    const t = flatten(e, this.size, 4);
    s.uniform4fv(this.addr, t)
}
function setValueM2Array(s, e) {
    const t = flatten(e, this.size, 4);
    s.uniformMatrix2fv(this.addr, !1, t)
}
function setValueM3Array(s, e) {
    const t = flatten(e, this.size, 9);
    s.uniformMatrix3fv(this.addr, !1, t)
}
function setValueM4Array(s, e) {
    const t = flatten(e, this.size, 16);
    s.uniformMatrix4fv(this.addr, !1, t)
}
function setValueV1iArray(s, e) {
    s.uniform1iv(this.addr, e)
}
function setValueV2iArray(s, e) {
    s.uniform2iv(this.addr, e)
}
function setValueV3iArray(s, e) {
    s.uniform3iv(this.addr, e)
}
function setValueV4iArray(s, e) {
    s.uniform4iv(this.addr, e)
}
function setValueV1uiArray(s, e) {
    s.uniform1uiv(this.addr, e)
}
function setValueV2uiArray(s, e) {
    s.uniform2uiv(this.addr, e)
}
function setValueV3uiArray(s, e) {
    s.uniform3uiv(this.addr, e)
}
function setValueV4uiArray(s, e) {
    s.uniform4uiv(this.addr, e)
}
function setValueT1Array(s, e, t) {
    const i = this.cache
      , n = e.length
      , r = allocTexUnits(t, n);
    arraysEqual(i, r) || (s.uniform1iv(this.addr, r),
    copyArray(i, r));
    for (let o = 0; o !== n; ++o)
        t.setTexture2D(e[o] || emptyTexture, r[o])
}
function setValueT3DArray(s, e, t) {
    const i = this.cache
      , n = e.length
      , r = allocTexUnits(t, n);
    arraysEqual(i, r) || (s.uniform1iv(this.addr, r),
    copyArray(i, r));
    for (let o = 0; o !== n; ++o)
        t.setTexture3D(e[o] || empty3dTexture, r[o])
}
function setValueT6Array(s, e, t) {
    const i = this.cache
      , n = e.length
      , r = allocTexUnits(t, n);
    arraysEqual(i, r) || (s.uniform1iv(this.addr, r),
    copyArray(i, r));
    for (let o = 0; o !== n; ++o)
        t.setTextureCube(e[o] || emptyCubeTexture, r[o])
}
function setValueT2DArrayArray(s, e, t) {
    const i = this.cache
      , n = e.length
      , r = allocTexUnits(t, n);
    arraysEqual(i, r) || (s.uniform1iv(this.addr, r),
    copyArray(i, r));
    for (let o = 0; o !== n; ++o)
        t.setTexture2DArray(e[o] || emptyArrayTexture, r[o])
}
function getPureArraySetter(s) {
    switch (s) {
    case 5126:
        return setValueV1fArray;
    case 35664:
        return setValueV2fArray;
    case 35665:
        return setValueV3fArray;
    case 35666:
        return setValueV4fArray;
    case 35674:
        return setValueM2Array;
    case 35675:
        return setValueM3Array;
    case 35676:
        return setValueM4Array;
    case 5124:
    case 35670:
        return setValueV1iArray;
    case 35667:
    case 35671:
        return setValueV2iArray;
    case 35668:
    case 35672:
        return setValueV3iArray;
    case 35669:
    case 35673:
        return setValueV4iArray;
    case 5125:
        return setValueV1uiArray;
    case 36294:
        return setValueV2uiArray;
    case 36295:
        return setValueV3uiArray;
    case 36296:
        return setValueV4uiArray;
    case 35678:
    case 36198:
    case 36298:
    case 36306:
    case 35682:
        return setValueT1Array;
    case 35679:
    case 36299:
    case 36307:
        return setValueT3DArray;
    case 35680:
    case 36300:
    case 36308:
    case 36293:
        return setValueT6Array;
    case 36289:
    case 36303:
    case 36311:
    case 36292:
        return setValueT2DArrayArray
    }
}
class SingleUniform {
    constructor(e, t, i) {
        this.id = e,
        this.addr = i,
        this.cache = [],
        this.setValue = getSingularSetter(t.type)
    }
}
class PureArrayUniform {
    constructor(e, t, i) {
        this.id = e,
        this.addr = i,
        this.cache = [],
        this.size = t.size,
        this.setValue = getPureArraySetter(t.type)
    }
}
class StructuredUniform {
    constructor(e) {
        this.id = e,
        this.seq = [],
        this.map = {}
    }
    setValue(e, t, i) {
        const n = this.seq;
        for (let r = 0, o = n.length; r !== o; ++r) {
            const a = n[r];
            a.setValue(e, t[a.id], i)
        }
    }
}
const RePathPart = /(\w+)(\])?(\[|\.)?/g;
function addUniform(s, e) {
    s.seq.push(e),
    s.map[e.id] = e
}
function parseUniform(s, e, t) {
    const i = s.name
      , n = i.length;
    for (RePathPart.lastIndex = 0; ; ) {
        const r = RePathPart.exec(i)
          , o = RePathPart.lastIndex;
        let a = r[1];
        const c = r[2] === "]"
          , l = r[3];
        if (c && (a = a | 0),
        l === void 0 || l === "[" && o + 2 === n) {
            addUniform(t, l === void 0 ? new SingleUniform(a,s,e) : new PureArrayUniform(a,s,e));
            break
        } else {
            let h = t.map[a];
            h === void 0 && (h = new StructuredUniform(a),
            addUniform(t, h)),
            t = h
        }
    }
}
class WebGLUniforms {
    constructor(e, t) {
        this.seq = [],
        this.map = {};
        const i = e.getProgramParameter(t, 35718);
        for (let n = 0; n < i; ++n) {
            const r = e.getActiveUniform(t, n)
              , o = e.getUniformLocation(t, r.name);
            parseUniform(r, o, this)
        }
    }
    setValue(e, t, i, n) {
        const r = this.map[t];
        r !== void 0 && r.setValue(e, i, n)
    }
    setOptional(e, t, i) {
        const n = t[i];
        n !== void 0 && this.setValue(e, i, n)
    }
    static upload(e, t, i, n) {
        for (let r = 0, o = t.length; r !== o; ++r) {
            const a = t[r]
              , c = i[a.id];
            c.needsUpdate !== !1 && a.setValue(e, c.value, n)
        }
    }
    static seqWithValue(e, t) {
        const i = [];
        for (let n = 0, r = e.length; n !== r; ++n) {
            const o = e[n];
            o.id in t && i.push(o)
        }
        return i
    }
}
function WebGLShader(s, e, t) {
    const i = s.createShader(e);
    return s.shaderSource(i, t),
    s.compileShader(i),
    i
}
let programIdCount = 0;
function handleSource(s, e) {
    const t = s.split(`
`)
      , i = []
      , n = Math.max(e - 6, 0)
      , r = Math.min(e + 6, t.length);
    for (let o = n; o < r; o++) {
        const a = o + 1;
        i.push(`${a === e ? ">" : " "} ${a}: ${t[o]}`)
    }
    return i.join(`
`)
}
function getEncodingComponents(s) {
    switch (s) {
    case LinearEncoding:
        return ["Linear", "( value )"];
    case sRGBEncoding:
        return ["sRGB", "( value )"];
    default:
        return console.warn("THREE.WebGLProgram: Unsupported encoding:", s),
        ["Linear", "( value )"]
    }
}
function getShaderErrors(s, e, t) {
    const i = s.getShaderParameter(e, 35713)
      , n = s.getShaderInfoLog(e).trim();
    if (i && n === "")
        return "";
    const r = /ERROR: 0:(\d+)/.exec(n);
    if (r) {
        const o = parseInt(r[1]);
        return t.toUpperCase() + `

` + n + `

` + handleSource(s.getShaderSource(e), o)
    } else
        return n
}
function getTexelEncodingFunction(s, e) {
    const t = getEncodingComponents(e);
    return "vec4 " + s + "( vec4 value ) { return LinearTo" + t[0] + t[1] + "; }"
}
function getToneMappingFunction(s, e) {
    let t;
    switch (e) {
    case LinearToneMapping:
        t = "Linear";
        break;
    case ReinhardToneMapping:
        t = "Reinhard";
        break;
    case CineonToneMapping:
        t = "OptimizedCineon";
        break;
    case ACESFilmicToneMapping:
        t = "ACESFilmic";
        break;
    case CustomToneMapping:
        t = "Custom";
        break;
    default:
        console.warn("THREE.WebGLProgram: Unsupported toneMapping:", e),
        t = "Linear"
    }
    return "vec3 " + s + "( vec3 color ) { return " + t + "ToneMapping( color ); }"
}
function generateExtensions(s) {
    return [s.extensionDerivatives || s.envMapCubeUVHeight || s.bumpMap || s.tangentSpaceNormalMap || s.clearcoatNormalMap || s.flatShading || s.shaderID === "physical" ? "#extension GL_OES_standard_derivatives : enable" : "", (s.extensionFragDepth || s.logarithmicDepthBuffer) && s.rendererExtensionFragDepth ? "#extension GL_EXT_frag_depth : enable" : "", s.extensionDrawBuffers && s.rendererExtensionDrawBuffers ? "#extension GL_EXT_draw_buffers : require" : "", (s.extensionShaderTextureLOD || s.envMap || s.transmission) && s.rendererExtensionShaderTextureLod ? "#extension GL_EXT_shader_texture_lod : enable" : ""].filter(filterEmptyLine).join(`
`)
}
function generateDefines(s) {
    const e = [];
    for (const t in s) {
        const i = s[t];
        i !== !1 && e.push("#define " + t + " " + i)
    }
    return e.join(`
`)
}
function fetchAttributeLocations(s, e) {
    const t = {}
      , i = s.getProgramParameter(e, 35721);
    for (let n = 0; n < i; n++) {
        const r = s.getActiveAttrib(e, n)
          , o = r.name;
        let a = 1;
        r.type === 35674 && (a = 2),
        r.type === 35675 && (a = 3),
        r.type === 35676 && (a = 4),
        t[o] = {
            type: r.type,
            location: s.getAttribLocation(e, o),
            locationSize: a
        }
    }
    return t
}
function filterEmptyLine(s) {
    return s !== ""
}
function replaceLightNums(s, e) {
    const t = e.numSpotLightShadows + e.numSpotLightMaps - e.numSpotLightShadowsWithMaps;
    return s.replace(/NUM_DIR_LIGHTS/g, e.numDirLights).replace(/NUM_SPOT_LIGHTS/g, e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g, e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g, t).replace(/NUM_RECT_AREA_LIGHTS/g, e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g, e.numPointLights).replace(/NUM_HEMI_LIGHTS/g, e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g, e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g, e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g, e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g, e.numPointLightShadows)
}
function replaceClippingPlaneNums(s, e) {
    return s.replace(/NUM_CLIPPING_PLANES/g, e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g, e.numClippingPlanes - e.numClipIntersection)
}
const includePattern = /^[ \t]*#include +<([\w\d./]+)>/gm;
function resolveIncludes(s) {
    return s.replace(includePattern, includeReplacer)
}
function includeReplacer(s, e) {
    const t = ShaderChunk[e];
    if (t === void 0)
        throw new Error("Can not resolve #include <" + e + ">");
    return resolveIncludes(t)
}
const unrollLoopPattern = /#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;
function unrollLoops(s) {
    return s.replace(unrollLoopPattern, loopReplacer)
}
function loopReplacer(s, e, t, i) {
    let n = "";
    for (let r = parseInt(e); r < parseInt(t); r++)
        n += i.replace(/\[\s*i\s*\]/g, "[ " + r + " ]").replace(/UNROLLED_LOOP_INDEX/g, r);
    return n
}
function generatePrecision(s) {
    let e = "precision " + s.precision + ` float;
precision ` + s.precision + " int;";
    return s.precision === "highp" ? e += `
#define HIGH_PRECISION` : s.precision === "mediump" ? e += `
#define MEDIUM_PRECISION` : s.precision === "lowp" && (e += `
#define LOW_PRECISION`),
    e
}
function generateShadowMapTypeDefine(s) {
    let e = "SHADOWMAP_TYPE_BASIC";
    return s.shadowMapType === PCFShadowMap ? e = "SHADOWMAP_TYPE_PCF" : s.shadowMapType === PCFSoftShadowMap ? e = "SHADOWMAP_TYPE_PCF_SOFT" : s.shadowMapType === VSMShadowMap && (e = "SHADOWMAP_TYPE_VSM"),
    e
}
function generateEnvMapTypeDefine(s) {
    let e = "ENVMAP_TYPE_CUBE";
    if (s.envMap)
        switch (s.envMapMode) {
        case CubeReflectionMapping:
        case CubeRefractionMapping:
            e = "ENVMAP_TYPE_CUBE";
            break;
        case CubeUVReflectionMapping:
            e = "ENVMAP_TYPE_CUBE_UV";
            break
        }
    return e
}
function generateEnvMapModeDefine(s) {
    let e = "ENVMAP_MODE_REFLECTION";
    if (s.envMap)
        switch (s.envMapMode) {
        case CubeRefractionMapping:
            e = "ENVMAP_MODE_REFRACTION";
            break
        }
    return e
}
function generateEnvMapBlendingDefine(s) {
    let e = "ENVMAP_BLENDING_NONE";
    if (s.envMap)
        switch (s.combine) {
        case MultiplyOperation:
            e = "ENVMAP_BLENDING_MULTIPLY";
            break;
        case MixOperation:
            e = "ENVMAP_BLENDING_MIX";
            break;
        case AddOperation:
            e = "ENVMAP_BLENDING_ADD";
            break
        }
    return e
}
function generateCubeUVSize(s) {
    const e = s.envMapCubeUVHeight;
    if (e === null)
        return null;
    const t = Math.log2(e) - 2
      , i = 1 / e;
    return {
        texelWidth: 1 / (3 * Math.max(Math.pow(2, t), 7 * 16)),
        texelHeight: i,
        maxMip: t
    }
}
function WebGLProgram(s, e, t, i) {
    const n = s.getContext()
      , r = t.defines;
    let o = t.vertexShader
      , a = t.fragmentShader;
    const c = generateShadowMapTypeDefine(t)
      , l = generateEnvMapTypeDefine(t)
      , u = generateEnvMapModeDefine(t)
      , h = generateEnvMapBlendingDefine(t)
      , d = generateCubeUVSize(t)
      , m = t.isWebGL2 ? "" : generateExtensions(t)
      , g = generateDefines(r)
      , p = n.createProgram();
    let f, x, S = t.glslVersion ? "#version " + t.glslVersion + `
` : "";
    t.isRawShaderMaterial ? (f = [g].filter(filterEmptyLine).join(`
`),
    f.length > 0 && (f += `
`),
    x = [m, g].filter(filterEmptyLine).join(`
`),
    x.length > 0 && (x += `
`)) : (f = [generatePrecision(t), "#define SHADER_NAME " + t.shaderName, g, t.instancing ? "#define USE_INSTANCING" : "", t.instancingColor ? "#define USE_INSTANCING_COLOR" : "", t.supportsVertexTextures ? "#define VERTEX_TEXTURES" : "", t.useFog && t.fog ? "#define USE_FOG" : "", t.useFog && t.fogExp2 ? "#define FOG_EXP2" : "", t.map ? "#define USE_MAP" : "", t.envMap ? "#define USE_ENVMAP" : "", t.envMap ? "#define " + u : "", t.lightMap ? "#define USE_LIGHTMAP" : "", t.aoMap ? "#define USE_AOMAP" : "", t.emissiveMap ? "#define USE_EMISSIVEMAP" : "", t.bumpMap ? "#define USE_BUMPMAP" : "", t.normalMap ? "#define USE_NORMALMAP" : "", t.normalMap && t.objectSpaceNormalMap ? "#define OBJECTSPACE_NORMALMAP" : "", t.normalMap && t.tangentSpaceNormalMap ? "#define TANGENTSPACE_NORMALMAP" : "", t.clearcoatMap ? "#define USE_CLEARCOATMAP" : "", t.clearcoatRoughnessMap ? "#define USE_CLEARCOAT_ROUGHNESSMAP" : "", t.clearcoatNormalMap ? "#define USE_CLEARCOAT_NORMALMAP" : "", t.iridescenceMap ? "#define USE_IRIDESCENCEMAP" : "", t.iridescenceThicknessMap ? "#define USE_IRIDESCENCE_THICKNESSMAP" : "", t.displacementMap && t.supportsVertexTextures ? "#define USE_DISPLACEMENTMAP" : "", t.specularMap ? "#define USE_SPECULARMAP" : "", t.specularIntensityMap ? "#define USE_SPECULARINTENSITYMAP" : "", t.specularColorMap ? "#define USE_SPECULARCOLORMAP" : "", t.roughnessMap ? "#define USE_ROUGHNESSMAP" : "", t.metalnessMap ? "#define USE_METALNESSMAP" : "", t.alphaMap ? "#define USE_ALPHAMAP" : "", t.transmission ? "#define USE_TRANSMISSION" : "", t.transmissionMap ? "#define USE_TRANSMISSIONMAP" : "", t.thicknessMap ? "#define USE_THICKNESSMAP" : "", t.sheenColorMap ? "#define USE_SHEENCOLORMAP" : "", t.sheenRoughnessMap ? "#define USE_SHEENROUGHNESSMAP" : "", t.vertexTangents ? "#define USE_TANGENT" : "", t.vertexColors ? "#define USE_COLOR" : "", t.vertexAlphas ? "#define USE_COLOR_ALPHA" : "", t.vertexUvs ? "#define USE_UV" : "", t.uvsVertexOnly ? "#define UVS_VERTEX_ONLY" : "", t.flatShading ? "#define FLAT_SHADED" : "", t.skinning ? "#define USE_SKINNING" : "", t.morphTargets ? "#define USE_MORPHTARGETS" : "", t.morphNormals && t.flatShading === !1 ? "#define USE_MORPHNORMALS" : "", t.morphColors && t.isWebGL2 ? "#define USE_MORPHCOLORS" : "", t.morphTargetsCount > 0 && t.isWebGL2 ? "#define MORPHTARGETS_TEXTURE" : "", t.morphTargetsCount > 0 && t.isWebGL2 ? "#define MORPHTARGETS_TEXTURE_STRIDE " + t.morphTextureStride : "", t.morphTargetsCount > 0 && t.isWebGL2 ? "#define MORPHTARGETS_COUNT " + t.morphTargetsCount : "", t.doubleSided ? "#define DOUBLE_SIDED" : "", t.flipSided ? "#define FLIP_SIDED" : "", t.shadowMapEnabled ? "#define USE_SHADOWMAP" : "", t.shadowMapEnabled ? "#define " + c : "", t.sizeAttenuation ? "#define USE_SIZEATTENUATION" : "", t.logarithmicDepthBuffer ? "#define USE_LOGDEPTHBUF" : "", t.logarithmicDepthBuffer && t.rendererExtensionFragDepth ? "#define USE_LOGDEPTHBUF_EXT" : "", "uniform mat4 modelMatrix;", "uniform mat4 modelViewMatrix;", "uniform mat4 projectionMatrix;", "uniform mat4 viewMatrix;", "uniform mat3 normalMatrix;", "uniform vec3 cameraPosition;", "uniform bool isOrthographic;", "#ifdef USE_INSTANCING", "	attribute mat4 instanceMatrix;", "#endif", "#ifdef USE_INSTANCING_COLOR", "	attribute vec3 instanceColor;", "#endif", "attribute vec3 position;", "attribute vec3 normal;", "attribute vec2 uv;", "#ifdef USE_TANGENT", "	attribute vec4 tangent;", "#endif", "#if defined( USE_COLOR_ALPHA )", "	attribute vec4 color;", "#elif defined( USE_COLOR )", "	attribute vec3 color;", "#endif", "#if ( defined( USE_MORPHTARGETS ) && ! defined( MORPHTARGETS_TEXTURE ) )", "	attribute vec3 morphTarget0;", "	attribute vec3 morphTarget1;", "	attribute vec3 morphTarget2;", "	attribute vec3 morphTarget3;", "	#ifdef USE_MORPHNORMALS", "		attribute vec3 morphNormal0;", "		attribute vec3 morphNormal1;", "		attribute vec3 morphNormal2;", "		attribute vec3 morphNormal3;", "	#else", "		attribute vec3 morphTarget4;", "		attribute vec3 morphTarget5;", "		attribute vec3 morphTarget6;", "		attribute vec3 morphTarget7;", "	#endif", "#endif", "#ifdef USE_SKINNING", "	attribute vec4 skinIndex;", "	attribute vec4 skinWeight;", "#endif", `
`].filter(filterEmptyLine).join(`
`),
    x = [m, generatePrecision(t), "#define SHADER_NAME " + t.shaderName, g, t.useFog && t.fog ? "#define USE_FOG" : "", t.useFog && t.fogExp2 ? "#define FOG_EXP2" : "", t.map ? "#define USE_MAP" : "", t.matcap ? "#define USE_MATCAP" : "", t.envMap ? "#define USE_ENVMAP" : "", t.envMap ? "#define " + l : "", t.envMap ? "#define " + u : "", t.envMap ? "#define " + h : "", d ? "#define CUBEUV_TEXEL_WIDTH " + d.texelWidth : "", d ? "#define CUBEUV_TEXEL_HEIGHT " + d.texelHeight : "", d ? "#define CUBEUV_MAX_MIP " + d.maxMip + ".0" : "", t.lightMap ? "#define USE_LIGHTMAP" : "", t.aoMap ? "#define USE_AOMAP" : "", t.emissiveMap ? "#define USE_EMISSIVEMAP" : "", t.bumpMap ? "#define USE_BUMPMAP" : "", t.normalMap ? "#define USE_NORMALMAP" : "", t.normalMap && t.objectSpaceNormalMap ? "#define OBJECTSPACE_NORMALMAP" : "", t.normalMap && t.tangentSpaceNormalMap ? "#define TANGENTSPACE_NORMALMAP" : "", t.clearcoat ? "#define USE_CLEARCOAT" : "", t.clearcoatMap ? "#define USE_CLEARCOATMAP" : "", t.clearcoatRoughnessMap ? "#define USE_CLEARCOAT_ROUGHNESSMAP" : "", t.clearcoatNormalMap ? "#define USE_CLEARCOAT_NORMALMAP" : "", t.iridescence ? "#define USE_IRIDESCENCE" : "", t.iridescenceMap ? "#define USE_IRIDESCENCEMAP" : "", t.iridescenceThicknessMap ? "#define USE_IRIDESCENCE_THICKNESSMAP" : "", t.specularMap ? "#define USE_SPECULARMAP" : "", t.specularIntensityMap ? "#define USE_SPECULARINTENSITYMAP" : "", t.specularColorMap ? "#define USE_SPECULARCOLORMAP" : "", t.roughnessMap ? "#define USE_ROUGHNESSMAP" : "", t.metalnessMap ? "#define USE_METALNESSMAP" : "", t.alphaMap ? "#define USE_ALPHAMAP" : "", t.alphaTest ? "#define USE_ALPHATEST" : "", t.sheen ? "#define USE_SHEEN" : "", t.sheenColorMap ? "#define USE_SHEENCOLORMAP" : "", t.sheenRoughnessMap ? "#define USE_SHEENROUGHNESSMAP" : "", t.transmission ? "#define USE_TRANSMISSION" : "", t.transmissionMap ? "#define USE_TRANSMISSIONMAP" : "", t.thicknessMap ? "#define USE_THICKNESSMAP" : "", t.decodeVideoTexture ? "#define DECODE_VIDEO_TEXTURE" : "", t.vertexTangents ? "#define USE_TANGENT" : "", t.vertexColors || t.instancingColor ? "#define USE_COLOR" : "", t.vertexAlphas ? "#define USE_COLOR_ALPHA" : "", t.vertexUvs ? "#define USE_UV" : "", t.uvsVertexOnly ? "#define UVS_VERTEX_ONLY" : "", t.gradientMap ? "#define USE_GRADIENTMAP" : "", t.flatShading ? "#define FLAT_SHADED" : "", t.doubleSided ? "#define DOUBLE_SIDED" : "", t.flipSided ? "#define FLIP_SIDED" : "", t.shadowMapEnabled ? "#define USE_SHADOWMAP" : "", t.shadowMapEnabled ? "#define " + c : "", t.premultipliedAlpha ? "#define PREMULTIPLIED_ALPHA" : "", t.physicallyCorrectLights ? "#define PHYSICALLY_CORRECT_LIGHTS" : "", t.logarithmicDepthBuffer ? "#define USE_LOGDEPTHBUF" : "", t.logarithmicDepthBuffer && t.rendererExtensionFragDepth ? "#define USE_LOGDEPTHBUF_EXT" : "", "uniform mat4 viewMatrix;", "uniform vec3 cameraPosition;", "uniform bool isOrthographic;", t.toneMapping !== NoToneMapping ? "#define TONE_MAPPING" : "", t.toneMapping !== NoToneMapping ? ShaderChunk.tonemapping_pars_fragment : "", t.toneMapping !== NoToneMapping ? getToneMappingFunction("toneMapping", t.toneMapping) : "", t.dithering ? "#define DITHERING" : "", t.opaque ? "#define OPAQUE" : "", ShaderChunk.encodings_pars_fragment, getTexelEncodingFunction("linearToOutputTexel", t.outputEncoding), t.useDepthPacking ? "#define DEPTH_PACKING " + t.depthPacking : "", `
`].filter(filterEmptyLine).join(`
`)),
    o = resolveIncludes(o),
    o = replaceLightNums(o, t),
    o = replaceClippingPlaneNums(o, t),
    a = resolveIncludes(a),
    a = replaceLightNums(a, t),
    a = replaceClippingPlaneNums(a, t),
    o = unrollLoops(o),
    a = unrollLoops(a),
    t.isWebGL2 && t.isRawShaderMaterial !== !0 && (S = `#version 300 es
`,
    f = ["precision mediump sampler2DArray;", "#define attribute in", "#define varying out", "#define texture2D texture"].join(`
`) + `
` + f,
    x = ["#define varying in", t.glslVersion === GLSL3 ? "" : "layout(location = 0) out highp vec4 pc_fragColor;", t.glslVersion === GLSL3 ? "" : "#define gl_FragColor pc_fragColor", "#define gl_FragDepthEXT gl_FragDepth", "#define texture2D texture", "#define textureCube texture", "#define texture2DProj textureProj", "#define texture2DLodEXT textureLod", "#define texture2DProjLodEXT textureProjLod", "#define textureCubeLodEXT textureLod", "#define texture2DGradEXT textureGrad", "#define texture2DProjGradEXT textureProjGrad", "#define textureCubeGradEXT textureGrad"].join(`
`) + `
` + x);
    const v = S + f + o
      , M = S + x + a
      , y = WebGLShader(n, 35633, v)
      , A = WebGLShader(n, 35632, M);
    if (n.attachShader(p, y),
    n.attachShader(p, A),
    t.index0AttributeName !== void 0 ? n.bindAttribLocation(p, 0, t.index0AttributeName) : t.morphTargets === !0 && n.bindAttribLocation(p, 0, "position"),
    n.linkProgram(p),
    s.debug.checkShaderErrors) {
        const L = n.getProgramInfoLog(p).trim()
          , D = n.getShaderInfoLog(y).trim()
          , $ = n.getShaderInfoLog(A).trim();
        let R = !0
          , T = !0;
        if (n.getProgramParameter(p, 35714) === !1) {
            R = !1;
            const C = getShaderErrors(n, y, "vertex")
              , F = getShaderErrors(n, A, "fragment");
            console.error("THREE.WebGLProgram: Shader Error " + n.getError() + " - VALIDATE_STATUS " + n.getProgramParameter(p, 35715) + `

Program Info Log: ` + L + `
` + C + `
` + F)
        } else
            L !== "" ? console.warn("THREE.WebGLProgram: Program Info Log:", L) : (D === "" || $ === "") && (T = !1);
        T && (this.diagnostics = {
            runnable: R,
            programLog: L,
            vertexShader: {
                log: D,
                prefix: f
            },
            fragmentShader: {
                log: $,
                prefix: x
            }
        })
    }
    n.deleteShader(y),
    n.deleteShader(A);
    let P;
    this.getUniforms = function() {
        return P === void 0 && (P = new WebGLUniforms(n,p)),
        P
    }
    ;
    let _;
    return this.getAttributes = function() {
        return _ === void 0 && (_ = fetchAttributeLocations(n, p)),
        _
    }
    ,
    this.destroy = function() {
        i.releaseStatesOfProgram(this),
        n.deleteProgram(p),
        this.program = void 0
    }
    ,
    this.name = t.shaderName,
    this.id = programIdCount++,
    this.cacheKey = e,
    this.usedTimes = 1,
    this.program = p,
    this.vertexShader = y,
    this.fragmentShader = A,
    this
}
let _id = 0;
class WebGLShaderCache {
    constructor() {
        this.shaderCache = new Map,
        this.materialCache = new Map
    }
    update(e) {
        const t = e.vertexShader
          , i = e.fragmentShader
          , n = this._getShaderStage(t)
          , r = this._getShaderStage(i)
          , o = this._getShaderCacheForMaterial(e);
        return o.has(n) === !1 && (o.add(n),
        n.usedTimes++),
        o.has(r) === !1 && (o.add(r),
        r.usedTimes++),
        this
    }
    remove(e) {
        const t = this.materialCache.get(e);
        for (const i of t)
            i.usedTimes--,
            i.usedTimes === 0 && this.shaderCache.delete(i.code);
        return this.materialCache.delete(e),
        this
    }
    getVertexShaderID(e) {
        return this._getShaderStage(e.vertexShader).id
    }
    getFragmentShaderID(e) {
        return this._getShaderStage(e.fragmentShader).id
    }
    dispose() {
        this.shaderCache.clear(),
        this.materialCache.clear()
    }
    _getShaderCacheForMaterial(e) {
        const t = this.materialCache;
        let i = t.get(e);
        return i === void 0 && (i = new Set,
        t.set(e, i)),
        i
    }
    _getShaderStage(e) {
        const t = this.shaderCache;
        let i = t.get(e);
        return i === void 0 && (i = new WebGLShaderStage(e),
        t.set(e, i)),
        i
    }
}
class WebGLShaderStage {
    constructor(e) {
        this.id = _id++,
        this.code = e,
        this.usedTimes = 0
    }
}
function WebGLPrograms(s, e, t, i, n, r, o) {
    const a = new Layers
      , c = new WebGLShaderCache
      , l = []
      , u = n.isWebGL2
      , h = n.logarithmicDepthBuffer
      , d = n.vertexTextures;
    let m = n.precision;
    const g = {
        MeshDepthMaterial: "depth",
        MeshDistanceMaterial: "distanceRGBA",
        MeshNormalMaterial: "normal",
        MeshBasicMaterial: "basic",
        MeshLambertMaterial: "lambert",
        MeshPhongMaterial: "phong",
        MeshToonMaterial: "toon",
        MeshStandardMaterial: "physical",
        MeshPhysicalMaterial: "physical",
        MeshMatcapMaterial: "matcap",
        LineBasicMaterial: "basic",
        LineDashedMaterial: "dashed",
        PointsMaterial: "points",
        ShadowMaterial: "shadow",
        SpriteMaterial: "sprite"
    };
    function p(_, L, D, $, R) {
        const T = $.fog
          , C = R.geometry
          , F = _.isMeshStandardMaterial ? $.environment : null
          , U = (_.isMeshStandardMaterial ? t : e).get(_.envMap || F)
          , z = U && U.mapping === CubeUVReflectionMapping ? U.image.height : null
          , B = g[_.type];
        _.precision !== null && (m = n.getMaxPrecision(_.precision),
        m !== _.precision && console.warn("THREE.WebGLProgram.getParameters:", _.precision, "not supported, using", m, "instead."));
        const Z = C.morphAttributes.position || C.morphAttributes.normal || C.morphAttributes.color
          , j = Z !== void 0 ? Z.length : 0;
        let V = 0;
        C.morphAttributes.position !== void 0 && (V = 1),
        C.morphAttributes.normal !== void 0 && (V = 2),
        C.morphAttributes.color !== void 0 && (V = 3);
        let k, K, ee, ie;
        if (B) {
            const Le = ShaderLib[B];
            k = Le.vertexShader,
            K = Le.fragmentShader
        } else
            k = _.vertexShader,
            K = _.fragmentShader,
            c.update(_),
            ee = c.getVertexShaderID(_),
            ie = c.getFragmentShaderID(_);
        const X = s.getRenderTarget()
          , Te = _.alphaTest > 0
          , oe = _.clearcoat > 0
          , ge = _.iridescence > 0;
        return {
            isWebGL2: u,
            shaderID: B,
            shaderName: _.type,
            vertexShader: k,
            fragmentShader: K,
            defines: _.defines,
            customVertexShaderID: ee,
            customFragmentShaderID: ie,
            isRawShaderMaterial: _.isRawShaderMaterial === !0,
            glslVersion: _.glslVersion,
            precision: m,
            instancing: R.isInstancedMesh === !0,
            instancingColor: R.isInstancedMesh === !0 && R.instanceColor !== null,
            supportsVertexTextures: d,
            outputEncoding: X === null ? s.outputEncoding : X.isXRRenderTarget === !0 ? X.texture.encoding : LinearEncoding,
            map: !!_.map,
            matcap: !!_.matcap,
            envMap: !!U,
            envMapMode: U && U.mapping,
            envMapCubeUVHeight: z,
            lightMap: !!_.lightMap,
            aoMap: !!_.aoMap,
            emissiveMap: !!_.emissiveMap,
            bumpMap: !!_.bumpMap,
            normalMap: !!_.normalMap,
            objectSpaceNormalMap: _.normalMapType === ObjectSpaceNormalMap,
            tangentSpaceNormalMap: _.normalMapType === TangentSpaceNormalMap,
            decodeVideoTexture: !!_.map && _.map.isVideoTexture === !0 && _.map.encoding === sRGBEncoding,
            clearcoat: oe,
            clearcoatMap: oe && !!_.clearcoatMap,
            clearcoatRoughnessMap: oe && !!_.clearcoatRoughnessMap,
            clearcoatNormalMap: oe && !!_.clearcoatNormalMap,
            iridescence: ge,
            iridescenceMap: ge && !!_.iridescenceMap,
            iridescenceThicknessMap: ge && !!_.iridescenceThicknessMap,
            displacementMap: !!_.displacementMap,
            roughnessMap: !!_.roughnessMap,
            metalnessMap: !!_.metalnessMap,
            specularMap: !!_.specularMap,
            specularIntensityMap: !!_.specularIntensityMap,
            specularColorMap: !!_.specularColorMap,
            opaque: _.transparent === !1 && _.blending === NormalBlending,
            alphaMap: !!_.alphaMap,
            alphaTest: Te,
            gradientMap: !!_.gradientMap,
            sheen: _.sheen > 0,
            sheenColorMap: !!_.sheenColorMap,
            sheenRoughnessMap: !!_.sheenRoughnessMap,
            transmission: _.transmission > 0,
            transmissionMap: !!_.transmissionMap,
            thicknessMap: !!_.thicknessMap,
            combine: _.combine,
            vertexTangents: !!_.normalMap && !!C.attributes.tangent,
            vertexColors: _.vertexColors,
            vertexAlphas: _.vertexColors === !0 && !!C.attributes.color && C.attributes.color.itemSize === 4,
            vertexUvs: !!_.map || !!_.bumpMap || !!_.normalMap || !!_.specularMap || !!_.alphaMap || !!_.emissiveMap || !!_.roughnessMap || !!_.metalnessMap || !!_.clearcoatMap || !!_.clearcoatRoughnessMap || !!_.clearcoatNormalMap || !!_.iridescenceMap || !!_.iridescenceThicknessMap || !!_.displacementMap || !!_.transmissionMap || !!_.thicknessMap || !!_.specularIntensityMap || !!_.specularColorMap || !!_.sheenColorMap || !!_.sheenRoughnessMap,
            uvsVertexOnly: !(_.map || _.bumpMap || _.normalMap || _.specularMap || _.alphaMap || _.emissiveMap || _.roughnessMap || _.metalnessMap || _.clearcoatNormalMap || _.iridescenceMap || _.iridescenceThicknessMap || _.transmission > 0 || _.transmissionMap || _.thicknessMap || _.specularIntensityMap || _.specularColorMap || _.sheen > 0 || _.sheenColorMap || _.sheenRoughnessMap) && !!_.displacementMap,
            fog: !!T,
            useFog: _.fog === !0,
            fogExp2: T && T.isFogExp2,
            flatShading: !!_.flatShading,
            sizeAttenuation: _.sizeAttenuation,
            logarithmicDepthBuffer: h,
            skinning: R.isSkinnedMesh === !0,
            morphTargets: C.morphAttributes.position !== void 0,
            morphNormals: C.morphAttributes.normal !== void 0,
            morphColors: C.morphAttributes.color !== void 0,
            morphTargetsCount: j,
            morphTextureStride: V,
            numDirLights: L.directional.length,
            numPointLights: L.point.length,
            numSpotLights: L.spot.length,
            numSpotLightMaps: L.spotLightMap.length,
            numRectAreaLights: L.rectArea.length,
            numHemiLights: L.hemi.length,
            numDirLightShadows: L.directionalShadowMap.length,
            numPointLightShadows: L.pointShadowMap.length,
            numSpotLightShadows: L.spotShadowMap.length,
            numSpotLightShadowsWithMaps: L.numSpotLightShadowsWithMaps,
            numClippingPlanes: o.numPlanes,
            numClipIntersection: o.numIntersection,
            dithering: _.dithering,
            shadowMapEnabled: s.shadowMap.enabled && D.length > 0,
            shadowMapType: s.shadowMap.type,
            toneMapping: _.toneMapped ? s.toneMapping : NoToneMapping,
            physicallyCorrectLights: s.physicallyCorrectLights,
            premultipliedAlpha: _.premultipliedAlpha,
            doubleSided: _.side === DoubleSide,
            flipSided: _.side === BackSide,
            useDepthPacking: !!_.depthPacking,
            depthPacking: _.depthPacking || 0,
            index0AttributeName: _.index0AttributeName,
            extensionDerivatives: _.extensions && _.extensions.derivatives,
            extensionFragDepth: _.extensions && _.extensions.fragDepth,
            extensionDrawBuffers: _.extensions && _.extensions.drawBuffers,
            extensionShaderTextureLOD: _.extensions && _.extensions.shaderTextureLOD,
            rendererExtensionFragDepth: u || i.has("EXT_frag_depth"),
            rendererExtensionDrawBuffers: u || i.has("WEBGL_draw_buffers"),
            rendererExtensionShaderTextureLod: u || i.has("EXT_shader_texture_lod"),
            customProgramCacheKey: _.customProgramCacheKey()
        }
    }
    function f(_) {
        const L = [];
        if (_.shaderID ? L.push(_.shaderID) : (L.push(_.customVertexShaderID),
        L.push(_.customFragmentShaderID)),
        _.defines !== void 0)
            for (const D in _.defines)
                L.push(D),
                L.push(_.defines[D]);
        return _.isRawShaderMaterial === !1 && (x(L, _),
        S(L, _),
        L.push(s.outputEncoding)),
        L.push(_.customProgramCacheKey),
        L.join()
    }
    function x(_, L) {
        _.push(L.precision),
        _.push(L.outputEncoding),
        _.push(L.envMapMode),
        _.push(L.envMapCubeUVHeight),
        _.push(L.combine),
        _.push(L.vertexUvs),
        _.push(L.fogExp2),
        _.push(L.sizeAttenuation),
        _.push(L.morphTargetsCount),
        _.push(L.morphAttributeCount),
        _.push(L.numDirLights),
        _.push(L.numPointLights),
        _.push(L.numSpotLights),
        _.push(L.numSpotLightMaps),
        _.push(L.numHemiLights),
        _.push(L.numRectAreaLights),
        _.push(L.numDirLightShadows),
        _.push(L.numPointLightShadows),
        _.push(L.numSpotLightShadows),
        _.push(L.numSpotLightShadowsWithMaps),
        _.push(L.shadowMapType),
        _.push(L.toneMapping),
        _.push(L.numClippingPlanes),
        _.push(L.numClipIntersection),
        _.push(L.depthPacking)
    }
    function S(_, L) {
        a.disableAll(),
        L.isWebGL2 && a.enable(0),
        L.supportsVertexTextures && a.enable(1),
        L.instancing && a.enable(2),
        L.instancingColor && a.enable(3),
        L.map && a.enable(4),
        L.matcap && a.enable(5),
        L.envMap && a.enable(6),
        L.lightMap && a.enable(7),
        L.aoMap && a.enable(8),
        L.emissiveMap && a.enable(9),
        L.bumpMap && a.enable(10),
        L.normalMap && a.enable(11),
        L.objectSpaceNormalMap && a.enable(12),
        L.tangentSpaceNormalMap && a.enable(13),
        L.clearcoat && a.enable(14),
        L.clearcoatMap && a.enable(15),
        L.clearcoatRoughnessMap && a.enable(16),
        L.clearcoatNormalMap && a.enable(17),
        L.iridescence && a.enable(18),
        L.iridescenceMap && a.enable(19),
        L.iridescenceThicknessMap && a.enable(20),
        L.displacementMap && a.enable(21),
        L.specularMap && a.enable(22),
        L.roughnessMap && a.enable(23),
        L.metalnessMap && a.enable(24),
        L.gradientMap && a.enable(25),
        L.alphaMap && a.enable(26),
        L.alphaTest && a.enable(27),
        L.vertexColors && a.enable(28),
        L.vertexAlphas && a.enable(29),
        L.vertexUvs && a.enable(30),
        L.vertexTangents && a.enable(31),
        L.uvsVertexOnly && a.enable(32),
        _.push(a.mask),
        a.disableAll(),
        L.fog && a.enable(0),
        L.useFog && a.enable(1),
        L.flatShading && a.enable(2),
        L.logarithmicDepthBuffer && a.enable(3),
        L.skinning && a.enable(4),
        L.morphTargets && a.enable(5),
        L.morphNormals && a.enable(6),
        L.morphColors && a.enable(7),
        L.premultipliedAlpha && a.enable(8),
        L.shadowMapEnabled && a.enable(9),
        L.physicallyCorrectLights && a.enable(10),
        L.doubleSided && a.enable(11),
        L.flipSided && a.enable(12),
        L.useDepthPacking && a.enable(13),
        L.dithering && a.enable(14),
        L.specularIntensityMap && a.enable(15),
        L.specularColorMap && a.enable(16),
        L.transmission && a.enable(17),
        L.transmissionMap && a.enable(18),
        L.thicknessMap && a.enable(19),
        L.sheen && a.enable(20),
        L.sheenColorMap && a.enable(21),
        L.sheenRoughnessMap && a.enable(22),
        L.decodeVideoTexture && a.enable(23),
        L.opaque && a.enable(24),
        _.push(a.mask)
    }
    function v(_) {
        const L = g[_.type];
        let D;
        if (L) {
            const $ = ShaderLib[L];
            D = UniformsUtils.clone($.uniforms)
        } else
            D = _.uniforms;
        return D
    }
    function M(_, L) {
        let D;
        for (let $ = 0, R = l.length; $ < R; $++) {
            const T = l[$];
            if (T.cacheKey === L) {
                D = T,
                ++D.usedTimes;
                break
            }
        }
        return D === void 0 && (D = new WebGLProgram(s,L,_,r),
        l.push(D)),
        D
    }
    function y(_) {
        if (--_.usedTimes === 0) {
            const L = l.indexOf(_);
            l[L] = l[l.length - 1],
            l.pop(),
            _.destroy()
        }
    }
    function A(_) {
        c.remove(_)
    }
    function P() {
        c.dispose()
    }
    return {
        getParameters: p,
        getProgramCacheKey: f,
        getUniforms: v,
        acquireProgram: M,
        releaseProgram: y,
        releaseShaderCache: A,
        programs: l,
        dispose: P
    }
}
function WebGLProperties() {
    let s = new WeakMap;
    function e(r) {
        let o = s.get(r);
        return o === void 0 && (o = {},
        s.set(r, o)),
        o
    }
    function t(r) {
        s.delete(r)
    }
    function i(r, o, a) {
        s.get(r)[o] = a
    }
    function n() {
        s = new WeakMap
    }
    return {
        get: e,
        remove: t,
        update: i,
        dispose: n
    }
}
function painterSortStable(s, e) {
    return s.groupOrder !== e.groupOrder ? s.groupOrder - e.groupOrder : s.renderOrder !== e.renderOrder ? s.renderOrder - e.renderOrder : s.material.id !== e.material.id ? s.material.id - e.material.id : s.z !== e.z ? s.z - e.z : s.id - e.id
}
function reversePainterSortStable(s, e) {
    return s.groupOrder !== e.groupOrder ? s.groupOrder - e.groupOrder : s.renderOrder !== e.renderOrder ? s.renderOrder - e.renderOrder : s.z !== e.z ? e.z - s.z : s.id - e.id
}
function WebGLRenderList() {
    const s = [];
    let e = 0;
    const t = []
      , i = []
      , n = [];
    function r() {
        e = 0,
        t.length = 0,
        i.length = 0,
        n.length = 0
    }
    function o(h, d, m, g, p, f) {
        let x = s[e];
        return x === void 0 ? (x = {
            id: h.id,
            object: h,
            geometry: d,
            material: m,
            groupOrder: g,
            renderOrder: h.renderOrder,
            z: p,
            group: f
        },
        s[e] = x) : (x.id = h.id,
        x.object = h,
        x.geometry = d,
        x.material = m,
        x.groupOrder = g,
        x.renderOrder = h.renderOrder,
        x.z = p,
        x.group = f),
        e++,
        x
    }
    function a(h, d, m, g, p, f) {
        const x = o(h, d, m, g, p, f);
        m.transmission > 0 ? i.push(x) : m.transparent === !0 ? n.push(x) : t.push(x)
    }
    function c(h, d, m, g, p, f) {
        const x = o(h, d, m, g, p, f);
        m.transmission > 0 ? i.unshift(x) : m.transparent === !0 ? n.unshift(x) : t.unshift(x)
    }
    function l(h, d) {
        t.length > 1 && t.sort(h || painterSortStable),
        i.length > 1 && i.sort(d || reversePainterSortStable),
        n.length > 1 && n.sort(d || reversePainterSortStable)
    }
    function u() {
        for (let h = e, d = s.length; h < d; h++) {
            const m = s[h];
            if (m.id === null)
                break;
            m.id = null,
            m.object = null,
            m.geometry = null,
            m.material = null,
            m.group = null
        }
    }
    return {
        opaque: t,
        transmissive: i,
        transparent: n,
        init: r,
        push: a,
        unshift: c,
        finish: u,
        sort: l
    }
}
function WebGLRenderLists() {
    let s = new WeakMap;
    function e(i, n) {
        const r = s.get(i);
        let o;
        return r === void 0 ? (o = new WebGLRenderList,
        s.set(i, [o])) : n >= r.length ? (o = new WebGLRenderList,
        r.push(o)) : o = r[n],
        o
    }
    function t() {
        s = new WeakMap
    }
    return {
        get: e,
        dispose: t
    }
}
function UniformsCache() {
    const s = {};
    return {
        get: function(e) {
            if (s[e.id] !== void 0)
                return s[e.id];
            let t;
            switch (e.type) {
            case "DirectionalLight":
                t = {
                    direction: new Vector3,
                    color: new Color
                };
                break;
            case "SpotLight":
                t = {
                    position: new Vector3,
                    direction: new Vector3,
                    color: new Color,
                    distance: 0,
                    coneCos: 0,
                    penumbraCos: 0,
                    decay: 0
                };
                break;
            case "PointLight":
                t = {
                    position: new Vector3,
                    color: new Color,
                    distance: 0,
                    decay: 0
                };
                break;
            case "HemisphereLight":
                t = {
                    direction: new Vector3,
                    skyColor: new Color,
                    groundColor: new Color
                };
                break;
            case "RectAreaLight":
                t = {
                    color: new Color,
                    position: new Vector3,
                    halfWidth: new Vector3,
                    halfHeight: new Vector3
                };
                break
            }
            return s[e.id] = t,
            t
        }
    }
}
function ShadowUniformsCache() {
    const s = {};
    return {
        get: function(e) {
            if (s[e.id] !== void 0)
                return s[e.id];
            let t;
            switch (e.type) {
            case "DirectionalLight":
                t = {
                    shadowBias: 0,
                    shadowNormalBias: 0,
                    shadowRadius: 1,
                    shadowMapSize: new Vector2
                };
                break;
            case "SpotLight":
                t = {
                    shadowBias: 0,
                    shadowNormalBias: 0,
                    shadowRadius: 1,
                    shadowMapSize: new Vector2
                };
                break;
            case "PointLight":
                t = {
                    shadowBias: 0,
                    shadowNormalBias: 0,
                    shadowRadius: 1,
                    shadowMapSize: new Vector2,
                    shadowCameraNear: 1,
                    shadowCameraFar: 1e3
                };
                break
            }
            return s[e.id] = t,
            t
        }
    }
}
let nextVersion = 0;
function shadowCastingAndTexturingLightsFirst(s, e) {
    return (e.castShadow ? 2 : 0) - (s.castShadow ? 2 : 0) + (e.map ? 1 : 0) - (s.map ? 1 : 0)
}
function WebGLLights(s, e) {
    const t = new UniformsCache
      , i = ShadowUniformsCache()
      , n = {
        version: 0,
        hash: {
            directionalLength: -1,
            pointLength: -1,
            spotLength: -1,
            rectAreaLength: -1,
            hemiLength: -1,
            numDirectionalShadows: -1,
            numPointShadows: -1,
            numSpotShadows: -1,
            numSpotMaps: -1
        },
        ambient: [0, 0, 0],
        probe: [],
        directional: [],
        directionalShadow: [],
        directionalShadowMap: [],
        directionalShadowMatrix: [],
        spot: [],
        spotLightMap: [],
        spotShadow: [],
        spotShadowMap: [],
        spotLightMatrix: [],
        rectArea: [],
        rectAreaLTC1: null,
        rectAreaLTC2: null,
        point: [],
        pointShadow: [],
        pointShadowMap: [],
        pointShadowMatrix: [],
        hemi: [],
        numSpotLightShadowsWithMaps: 0
    };
    for (let u = 0; u < 9; u++)
        n.probe.push(new Vector3);
    const r = new Vector3
      , o = new Matrix4
      , a = new Matrix4;
    function c(u, h) {
        let d = 0
          , m = 0
          , g = 0;
        for (let $ = 0; $ < 9; $++)
            n.probe[$].set(0, 0, 0);
        let p = 0
          , f = 0
          , x = 0
          , S = 0
          , v = 0
          , M = 0
          , y = 0
          , A = 0
          , P = 0
          , _ = 0;
        u.sort(shadowCastingAndTexturingLightsFirst);
        const L = h !== !0 ? Math.PI : 1;
        for (let $ = 0, R = u.length; $ < R; $++) {
            const T = u[$]
              , C = T.color
              , F = T.intensity
              , U = T.distance
              , z = T.shadow && T.shadow.map ? T.shadow.map.texture : null;
            if (T.isAmbientLight)
                d += C.r * F * L,
                m += C.g * F * L,
                g += C.b * F * L;
            else if (T.isLightProbe)
                for (let B = 0; B < 9; B++)
                    n.probe[B].addScaledVector(T.sh.coefficients[B], F);
            else if (T.isDirectionalLight) {
                const B = t.get(T);
                if (B.color.copy(T.color).multiplyScalar(T.intensity * L),
                T.castShadow) {
                    const Z = T.shadow
                      , j = i.get(T);
                    j.shadowBias = Z.bias,
                    j.shadowNormalBias = Z.normalBias,
                    j.shadowRadius = Z.radius,
                    j.shadowMapSize = Z.mapSize,
                    n.directionalShadow[p] = j,
                    n.directionalShadowMap[p] = z,
                    n.directionalShadowMatrix[p] = T.shadow.matrix,
                    M++
                }
                n.directional[p] = B,
                p++
            } else if (T.isSpotLight) {
                const B = t.get(T);
                B.position.setFromMatrixPosition(T.matrixWorld),
                B.color.copy(C).multiplyScalar(F * L),
                B.distance = U,
                B.coneCos = Math.cos(T.angle),
                B.penumbraCos = Math.cos(T.angle * (1 - T.penumbra)),
                B.decay = T.decay,
                n.spot[x] = B;
                const Z = T.shadow;
                if (T.map && (n.spotLightMap[P] = T.map,
                P++,
                Z.updateMatrices(T),
                T.castShadow && _++),
                n.spotLightMatrix[x] = Z.matrix,
                T.castShadow) {
                    const j = i.get(T);
                    j.shadowBias = Z.bias,
                    j.shadowNormalBias = Z.normalBias,
                    j.shadowRadius = Z.radius,
                    j.shadowMapSize = Z.mapSize,
                    n.spotShadow[x] = j,
                    n.spotShadowMap[x] = z,
                    A++
                }
                x++
            } else if (T.isRectAreaLight) {
                const B = t.get(T);
                B.color.copy(C).multiplyScalar(F),
                B.halfWidth.set(T.width * .5, 0, 0),
                B.halfHeight.set(0, T.height * .5, 0),
                n.rectArea[S] = B,
                S++
            } else if (T.isPointLight) {
                const B = t.get(T);
                if (B.color.copy(T.color).multiplyScalar(T.intensity * L),
                B.distance = T.distance,
                B.decay = T.decay,
                T.castShadow) {
                    const Z = T.shadow
                      , j = i.get(T);
                    j.shadowBias = Z.bias,
                    j.shadowNormalBias = Z.normalBias,
                    j.shadowRadius = Z.radius,
                    j.shadowMapSize = Z.mapSize,
                    j.shadowCameraNear = Z.camera.near,
                    j.shadowCameraFar = Z.camera.far,
                    n.pointShadow[f] = j,
                    n.pointShadowMap[f] = z,
                    n.pointShadowMatrix[f] = T.shadow.matrix,
                    y++
                }
                n.point[f] = B,
                f++
            } else if (T.isHemisphereLight) {
                const B = t.get(T);
                B.skyColor.copy(T.color).multiplyScalar(F * L),
                B.groundColor.copy(T.groundColor).multiplyScalar(F * L),
                n.hemi[v] = B,
                v++
            }
        }
        S > 0 && (e.isWebGL2 || s.has("OES_texture_float_linear") === !0 ? (n.rectAreaLTC1 = UniformsLib.LTC_FLOAT_1,
        n.rectAreaLTC2 = UniformsLib.LTC_FLOAT_2) : s.has("OES_texture_half_float_linear") === !0 ? (n.rectAreaLTC1 = UniformsLib.LTC_HALF_1,
        n.rectAreaLTC2 = UniformsLib.LTC_HALF_2) : console.error("THREE.WebGLRenderer: Unable to use RectAreaLight. Missing WebGL extensions.")),
        n.ambient[0] = d,
        n.ambient[1] = m,
        n.ambient[2] = g;
        const D = n.hash;
        (D.directionalLength !== p || D.pointLength !== f || D.spotLength !== x || D.rectAreaLength !== S || D.hemiLength !== v || D.numDirectionalShadows !== M || D.numPointShadows !== y || D.numSpotShadows !== A || D.numSpotMaps !== P) && (n.directional.length = p,
        n.spot.length = x,
        n.rectArea.length = S,
        n.point.length = f,
        n.hemi.length = v,
        n.directionalShadow.length = M,
        n.directionalShadowMap.length = M,
        n.pointShadow.length = y,
        n.pointShadowMap.length = y,
        n.spotShadow.length = A,
        n.spotShadowMap.length = A,
        n.directionalShadowMatrix.length = M,
        n.pointShadowMatrix.length = y,
        n.spotLightMatrix.length = A + P - _,
        n.spotLightMap.length = P,
        n.numSpotLightShadowsWithMaps = _,
        D.directionalLength = p,
        D.pointLength = f,
        D.spotLength = x,
        D.rectAreaLength = S,
        D.hemiLength = v,
        D.numDirectionalShadows = M,
        D.numPointShadows = y,
        D.numSpotShadows = A,
        D.numSpotMaps = P,
        n.version = nextVersion++)
    }
    function l(u, h) {
        let d = 0
          , m = 0
          , g = 0
          , p = 0
          , f = 0;
        const x = h.matrixWorldInverse;
        for (let S = 0, v = u.length; S < v; S++) {
            const M = u[S];
            if (M.isDirectionalLight) {
                const y = n.directional[d];
                y.direction.setFromMatrixPosition(M.matrixWorld),
                r.setFromMatrixPosition(M.target.matrixWorld),
                y.direction.sub(r),
                y.direction.transformDirection(x),
                d++
            } else if (M.isSpotLight) {
                const y = n.spot[g];
                y.position.setFromMatrixPosition(M.matrixWorld),
                y.position.applyMatrix4(x),
                y.direction.setFromMatrixPosition(M.matrixWorld),
                r.setFromMatrixPosition(M.target.matrixWorld),
                y.direction.sub(r),
                y.direction.transformDirection(x),
                g++
            } else if (M.isRectAreaLight) {
                const y = n.rectArea[p];
                y.position.setFromMatrixPosition(M.matrixWorld),
                y.position.applyMatrix4(x),
                a.identity(),
                o.copy(M.matrixWorld),
                o.premultiply(x),
                a.extractRotation(o),
                y.halfWidth.set(M.width * .5, 0, 0),
                y.halfHeight.set(0, M.height * .5, 0),
                y.halfWidth.applyMatrix4(a),
                y.halfHeight.applyMatrix4(a),
                p++
            } else if (M.isPointLight) {
                const y = n.point[m];
                y.position.setFromMatrixPosition(M.matrixWorld),
                y.position.applyMatrix4(x),
                m++
            } else if (M.isHemisphereLight) {
                const y = n.hemi[f];
                y.direction.setFromMatrixPosition(M.matrixWorld),
                y.direction.transformDirection(x),
                f++
            }
        }
    }
    return {
        setup: c,
        setupView: l,
        state: n
    }
}
function WebGLRenderState(s, e) {
    const t = new WebGLLights(s,e)
      , i = []
      , n = [];
    function r() {
        i.length = 0,
        n.length = 0
    }
    function o(h) {
        i.push(h)
    }
    function a(h) {
        n.push(h)
    }
    function c(h) {
        t.setup(i, h)
    }
    function l(h) {
        t.setupView(i, h)
    }
    return {
        init: r,
        state: {
            lightsArray: i,
            shadowsArray: n,
            lights: t
        },
        setupLights: c,
        setupLightsView: l,
        pushLight: o,
        pushShadow: a
    }
}
function WebGLRenderStates(s, e) {
    let t = new WeakMap;
    function i(r, o=0) {
        const a = t.get(r);
        let c;
        return a === void 0 ? (c = new WebGLRenderState(s,e),
        t.set(r, [c])) : o >= a.length ? (c = new WebGLRenderState(s,e),
        a.push(c)) : c = a[o],
        c
    }
    function n() {
        t = new WeakMap
    }
    return {
        get: i,
        dispose: n
    }
}
class MeshDepthMaterial extends Material {
    constructor(e) {
        super(),
        this.isMeshDepthMaterial = !0,
        this.type = "MeshDepthMaterial",
        this.depthPacking = BasicDepthPacking,
        this.map = null,
        this.alphaMap = null,
        this.displacementMap = null,
        this.displacementScale = 1,
        this.displacementBias = 0,
        this.wireframe = !1,
        this.wireframeLinewidth = 1,
        this.setValues(e)
    }
    copy(e) {
        return super.copy(e),
        this.depthPacking = e.depthPacking,
        this.map = e.map,
        this.alphaMap = e.alphaMap,
        this.displacementMap = e.displacementMap,
        this.displacementScale = e.displacementScale,
        this.displacementBias = e.displacementBias,
        this.wireframe = e.wireframe,
        this.wireframeLinewidth = e.wireframeLinewidth,
        this
    }
}
class MeshDistanceMaterial extends Material {
    constructor(e) {
        super(),
        this.isMeshDistanceMaterial = !0,
        this.type = "MeshDistanceMaterial",
        this.referencePosition = new Vector3,
        this.nearDistance = 1,
        this.farDistance = 1e3,
        this.map = null,
        this.alphaMap = null,
        this.displacementMap = null,
        this.displacementScale = 1,
        this.displacementBias = 0,
        this.setValues(e)
    }
    copy(e) {
        return super.copy(e),
        this.referencePosition.copy(e.referencePosition),
        this.nearDistance = e.nearDistance,
        this.farDistance = e.farDistance,
        this.map = e.map,
        this.alphaMap = e.alphaMap,
        this.displacementMap = e.displacementMap,
        this.displacementScale = e.displacementScale,
        this.displacementBias = e.displacementBias,
        this
    }
}
const vertex = `void main() {
	gl_Position = vec4( position, 1.0 );
}`
  , fragment = `uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
#include <packing>
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ) );
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ) );
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( squared_mean - mean * mean );
	gl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );
}`;
function WebGLShadowMap(s, e, t) {
    let i = new Frustum;
    const n = new Vector2
      , r = new Vector2
      , o = new Vector4
      , a = new MeshDepthMaterial({
        depthPacking: RGBADepthPacking
    })
      , c = new MeshDistanceMaterial
      , l = {}
      , u = t.maxTextureSize
      , h = {
        0: BackSide,
        1: FrontSide,
        2: DoubleSide
    }
      , d = new ShaderMaterial({
        defines: {
            VSM_SAMPLES: 8
        },
        uniforms: {
            shadow_pass: {
                value: null
            },
            resolution: {
                value: new Vector2
            },
            radius: {
                value: 4
            }
        },
        vertexShader: vertex,
        fragmentShader: fragment
    })
      , m = d.clone();
    m.defines.HORIZONTAL_PASS = 1;
    const g = new BufferGeometry;
    g.setAttribute("position", new BufferAttribute(new Float32Array([-1, -1, .5, 3, -1, .5, -1, 3, .5]),3));
    const p = new Mesh(g,d)
      , f = this;
    this.enabled = !1,
    this.autoUpdate = !0,
    this.needsUpdate = !1,
    this.type = PCFShadowMap,
    this.render = function(M, y, A) {
        if (f.enabled === !1 || f.autoUpdate === !1 && f.needsUpdate === !1 || M.length === 0)
            return;
        const P = s.getRenderTarget()
          , _ = s.getActiveCubeFace()
          , L = s.getActiveMipmapLevel()
          , D = s.state;
        D.setBlending(NoBlending),
        D.buffers.color.setClear(1, 1, 1, 1),
        D.buffers.depth.setTest(!0),
        D.setScissorTest(!1);
        for (let $ = 0, R = M.length; $ < R; $++) {
            const T = M[$]
              , C = T.shadow;
            if (C === void 0) {
                console.warn("THREE.WebGLShadowMap:", T, "has no shadow.");
                continue
            }
            if (C.autoUpdate === !1 && C.needsUpdate === !1)
                continue;
            n.copy(C.mapSize);
            const F = C.getFrameExtents();
            if (n.multiply(F),
            r.copy(C.mapSize),
            (n.x > u || n.y > u) && (n.x > u && (r.x = Math.floor(u / F.x),
            n.x = r.x * F.x,
            C.mapSize.x = r.x),
            n.y > u && (r.y = Math.floor(u / F.y),
            n.y = r.y * F.y,
            C.mapSize.y = r.y)),
            C.map === null) {
                const z = this.type !== VSMShadowMap ? {
                    minFilter: NearestFilter,
                    magFilter: NearestFilter
                } : {};
                C.map = new WebGLRenderTarget(n.x,n.y,z),
                C.map.texture.name = T.name + ".shadowMap",
                C.camera.updateProjectionMatrix()
            }
            s.setRenderTarget(C.map),
            s.clear();
            const U = C.getViewportCount();
            for (let z = 0; z < U; z++) {
                const B = C.getViewport(z);
                o.set(r.x * B.x, r.y * B.y, r.x * B.z, r.y * B.w),
                D.viewport(o),
                C.updateMatrices(T, z),
                i = C.getFrustum(),
                v(y, A, C.camera, T, this.type)
            }
            C.isPointLightShadow !== !0 && this.type === VSMShadowMap && x(C, A),
            C.needsUpdate = !1
        }
        f.needsUpdate = !1,
        s.setRenderTarget(P, _, L)
    }
    ;
    function x(M, y) {
        const A = e.update(p);
        d.defines.VSM_SAMPLES !== M.blurSamples && (d.defines.VSM_SAMPLES = M.blurSamples,
        m.defines.VSM_SAMPLES = M.blurSamples,
        d.needsUpdate = !0,
        m.needsUpdate = !0),
        M.mapPass === null && (M.mapPass = new WebGLRenderTarget(n.x,n.y)),
        d.uniforms.shadow_pass.value = M.map.texture,
        d.uniforms.resolution.value = M.mapSize,
        d.uniforms.radius.value = M.radius,
        s.setRenderTarget(M.mapPass),
        s.clear(),
        s.renderBufferDirect(y, null, A, d, p, null),
        m.uniforms.shadow_pass.value = M.mapPass.texture,
        m.uniforms.resolution.value = M.mapSize,
        m.uniforms.radius.value = M.radius,
        s.setRenderTarget(M.map),
        s.clear(),
        s.renderBufferDirect(y, null, A, m, p, null)
    }
    function S(M, y, A, P, _, L) {
        let D = null;
        const $ = A.isPointLight === !0 ? M.customDistanceMaterial : M.customDepthMaterial;
        if ($ !== void 0)
            D = $;
        else if (D = A.isPointLight === !0 ? c : a,
        s.localClippingEnabled && y.clipShadows === !0 && Array.isArray(y.clippingPlanes) && y.clippingPlanes.length !== 0 || y.displacementMap && y.displacementScale !== 0 || y.alphaMap && y.alphaTest > 0 || y.map && y.alphaTest > 0) {
            const R = D.uuid
              , T = y.uuid;
            let C = l[R];
            C === void 0 && (C = {},
            l[R] = C);
            let F = C[T];
            F === void 0 && (F = D.clone(),
            C[T] = F),
            D = F
        }
        return D.visible = y.visible,
        D.wireframe = y.wireframe,
        L === VSMShadowMap ? D.side = y.shadowSide !== null ? y.shadowSide : y.side : D.side = y.shadowSide !== null ? y.shadowSide : h[y.side],
        D.alphaMap = y.alphaMap,
        D.alphaTest = y.alphaTest,
        D.map = y.map,
        D.clipShadows = y.clipShadows,
        D.clippingPlanes = y.clippingPlanes,
        D.clipIntersection = y.clipIntersection,
        D.displacementMap = y.displacementMap,
        D.displacementScale = y.displacementScale,
        D.displacementBias = y.displacementBias,
        D.wireframeLinewidth = y.wireframeLinewidth,
        D.linewidth = y.linewidth,
        A.isPointLight === !0 && D.isMeshDistanceMaterial === !0 && (D.referencePosition.setFromMatrixPosition(A.matrixWorld),
        D.nearDistance = P,
        D.farDistance = _),
        D
    }
    function v(M, y, A, P, _) {
        if (M.visible === !1)
            return;
        if (M.layers.test(y.layers) && (M.isMesh || M.isLine || M.isPoints) && (M.castShadow || M.receiveShadow && _ === VSMShadowMap) && (!M.frustumCulled || i.intersectsObject(M))) {
            M.modelViewMatrix.multiplyMatrices(A.matrixWorldInverse, M.matrixWorld);
            const $ = e.update(M)
              , R = M.material;
            if (Array.isArray(R)) {
                const T = $.groups;
                for (let C = 0, F = T.length; C < F; C++) {
                    const U = T[C]
                      , z = R[U.materialIndex];
                    if (z && z.visible) {
                        const B = S(M, z, P, A.near, A.far, _);
                        s.renderBufferDirect(A, null, $, B, M, U)
                    }
                }
            } else if (R.visible) {
                const T = S(M, R, P, A.near, A.far, _);
                s.renderBufferDirect(A, null, $, T, M, null)
            }
        }
        const D = M.children;
        for (let $ = 0, R = D.length; $ < R; $++)
            v(D[$], y, A, P, _)
    }
}
function WebGLState(s, e, t) {
    const i = t.isWebGL2;
    function n() {
        let I = !1;
        const G = new Vector4;
        let J = null;
        const se = new Vector4(0,0,0,0);
        return {
            setMask: function(ce) {
                J !== ce && !I && (s.colorMask(ce, ce, ce, ce),
                J = ce)
            },
            setLocked: function(ce) {
                I = ce
            },
            setClear: function(ce, Ae, Ne, Ve, Je) {
                Je === !0 && (ce *= Ve,
                Ae *= Ve,
                Ne *= Ve),
                G.set(ce, Ae, Ne, Ve),
                se.equals(G) === !1 && (s.clearColor(ce, Ae, Ne, Ve),
                se.copy(G))
            },
            reset: function() {
                I = !1,
                J = null,
                se.set(-1, 0, 0, 0)
            }
        }
    }
    function r() {
        let I = !1
          , G = null
          , J = null
          , se = null;
        return {
            setTest: function(ce) {
                ce ? Te(2929) : oe(2929)
            },
            setMask: function(ce) {
                G !== ce && !I && (s.depthMask(ce),
                G = ce)
            },
            setFunc: function(ce) {
                if (J !== ce) {
                    switch (ce) {
                    case NeverDepth:
                        s.depthFunc(512);
                        break;
                    case AlwaysDepth:
                        s.depthFunc(519);
                        break;
                    case LessDepth:
                        s.depthFunc(513);
                        break;
                    case LessEqualDepth:
                        s.depthFunc(515);
                        break;
                    case EqualDepth:
                        s.depthFunc(514);
                        break;
                    case GreaterEqualDepth:
                        s.depthFunc(518);
                        break;
                    case GreaterDepth:
                        s.depthFunc(516);
                        break;
                    case NotEqualDepth:
                        s.depthFunc(517);
                        break;
                    default:
                        s.depthFunc(515)
                    }
                    J = ce
                }
            },
            setLocked: function(ce) {
                I = ce
            },
            setClear: function(ce) {
                se !== ce && (s.clearDepth(ce),
                se = ce)
            },
            reset: function() {
                I = !1,
                G = null,
                J = null,
                se = null
            }
        }
    }
    function o() {
        let I = !1
          , G = null
          , J = null
          , se = null
          , ce = null
          , Ae = null
          , Ne = null
          , Ve = null
          , Je = null;
        return {
            setTest: function(Ie) {
                I || (Ie ? Te(2960) : oe(2960))
            },
            setMask: function(Ie) {
                G !== Ie && !I && (s.stencilMask(Ie),
                G = Ie)
            },
            setFunc: function(Ie, Ze, Xe) {
                (J !== Ie || se !== Ze || ce !== Xe) && (s.stencilFunc(Ie, Ze, Xe),
                J = Ie,
                se = Ze,
                ce = Xe)
            },
            setOp: function(Ie, Ze, Xe) {
                (Ae !== Ie || Ne !== Ze || Ve !== Xe) && (s.stencilOp(Ie, Ze, Xe),
                Ae = Ie,
                Ne = Ze,
                Ve = Xe)
            },
            setLocked: function(Ie) {
                I = Ie
            },
            setClear: function(Ie) {
                Je !== Ie && (s.clearStencil(Ie),
                Je = Ie)
            },
            reset: function() {
                I = !1,
                G = null,
                J = null,
                se = null,
                ce = null,
                Ae = null,
                Ne = null,
                Ve = null,
                Je = null
            }
        }
    }
    const a = new n
      , c = new r
      , l = new o
      , u = new WeakMap
      , h = new WeakMap;
    let d = {}
      , m = {}
      , g = new WeakMap
      , p = []
      , f = null
      , x = !1
      , S = null
      , v = null
      , M = null
      , y = null
      , A = null
      , P = null
      , _ = null
      , L = !1
      , D = null
      , $ = null
      , R = null
      , T = null
      , C = null;
    const F = s.getParameter(35661);
    let U = !1
      , z = 0;
    const B = s.getParameter(7938);
    B.indexOf("WebGL") !== -1 ? (z = parseFloat(/^WebGL (\d)/.exec(B)[1]),
    U = z >= 1) : B.indexOf("OpenGL ES") !== -1 && (z = parseFloat(/^OpenGL ES (\d)/.exec(B)[1]),
    U = z >= 2);
    let Z = null
      , j = {};
    const V = s.getParameter(3088)
      , k = s.getParameter(2978)
      , K = new Vector4().fromArray(V)
      , ee = new Vector4().fromArray(k);
    function ie(I, G, J) {
        const se = new Uint8Array(4)
          , ce = s.createTexture();
        s.bindTexture(I, ce),
        s.texParameteri(I, 10241, 9728),
        s.texParameteri(I, 10240, 9728);
        for (let Ae = 0; Ae < J; Ae++)
            s.texImage2D(G + Ae, 0, 6408, 1, 1, 0, 6408, 5121, se);
        return ce
    }
    const X = {};
    X[3553] = ie(3553, 3553, 1),
    X[34067] = ie(34067, 34069, 6),
    a.setClear(0, 0, 0, 1),
    c.setClear(1),
    l.setClear(0),
    Te(2929),
    c.setFunc(LessEqualDepth),
    Ge(!1),
    qe(CullFaceBack),
    Te(2884),
    ze(NoBlending);
    function Te(I) {
        d[I] !== !0 && (s.enable(I),
        d[I] = !0)
    }
    function oe(I) {
        d[I] !== !1 && (s.disable(I),
        d[I] = !1)
    }
    function ge(I, G) {
        return m[I] !== G ? (s.bindFramebuffer(I, G),
        m[I] = G,
        i && (I === 36009 && (m[36160] = G),
        I === 36160 && (m[36009] = G)),
        !0) : !1
    }
    function ae(I, G) {
        let J = p
          , se = !1;
        if (I)
            if (J = g.get(G),
            J === void 0 && (J = [],
            g.set(G, J)),
            I.isWebGLMultipleRenderTargets) {
                const ce = I.texture;
                if (J.length !== ce.length || J[0] !== 36064) {
                    for (let Ae = 0, Ne = ce.length; Ae < Ne; Ae++)
                        J[Ae] = 36064 + Ae;
                    J.length = ce.length,
                    se = !0
                }
            } else
                J[0] !== 36064 && (J[0] = 36064,
                se = !0);
        else
            J[0] !== 1029 && (J[0] = 1029,
            se = !0);
        se && (t.isWebGL2 ? s.drawBuffers(J) : e.get("WEBGL_draw_buffers").drawBuffersWEBGL(J))
    }
    function Le(I) {
        return f !== I ? (s.useProgram(I),
        f = I,
        !0) : !1
    }
    const xe = {
        [AddEquation]: 32774,
        [SubtractEquation]: 32778,
        [ReverseSubtractEquation]: 32779
    };
    if (i)
        xe[MinEquation] = 32775,
        xe[MaxEquation] = 32776;
    else {
        const I = e.get("EXT_blend_minmax");
        I !== null && (xe[MinEquation] = I.MIN_EXT,
        xe[MaxEquation] = I.MAX_EXT)
    }
    const me = {
        [ZeroFactor]: 0,
        [OneFactor]: 1,
        [SrcColorFactor]: 768,
        [SrcAlphaFactor]: 770,
        [SrcAlphaSaturateFactor]: 776,
        [DstColorFactor]: 774,
        [DstAlphaFactor]: 772,
        [OneMinusSrcColorFactor]: 769,
        [OneMinusSrcAlphaFactor]: 771,
        [OneMinusDstColorFactor]: 775,
        [OneMinusDstAlphaFactor]: 773
    };
    function ze(I, G, J, se, ce, Ae, Ne, Ve) {
        if (I === NoBlending) {
            x === !0 && (oe(3042),
            x = !1);
            return
        }
        if (x === !1 && (Te(3042),
        x = !0),
        I !== CustomBlending) {
            if (I !== S || Ve !== L) {
                if ((v !== AddEquation || A !== AddEquation) && (s.blendEquation(32774),
                v = AddEquation,
                A = AddEquation),
                Ve)
                    switch (I) {
                    case NormalBlending:
                        s.blendFuncSeparate(1, 771, 1, 771);
                        break;
                    case AdditiveBlending:
                        s.blendFunc(1, 1);
                        break;
                    case SubtractiveBlending:
                        s.blendFuncSeparate(0, 769, 0, 1);
                        break;
                    case MultiplyBlending:
                        s.blendFuncSeparate(0, 768, 0, 770);
                        break;
                    default:
                        console.error("THREE.WebGLState: Invalid blending: ", I);
                        break
                    }
                else
                    switch (I) {
                    case NormalBlending:
                        s.blendFuncSeparate(770, 771, 1, 771);
                        break;
                    case AdditiveBlending:
                        s.blendFunc(770, 1);
                        break;
                    case SubtractiveBlending:
                        s.blendFuncSeparate(0, 769, 0, 1);
                        break;
                    case MultiplyBlending:
                        s.blendFunc(0, 768);
                        break;
                    default:
                        console.error("THREE.WebGLState: Invalid blending: ", I);
                        break
                    }
                M = null,
                y = null,
                P = null,
                _ = null,
                S = I,
                L = Ve
            }
            return
        }
        ce = ce || G,
        Ae = Ae || J,
        Ne = Ne || se,
        (G !== v || ce !== A) && (s.blendEquationSeparate(xe[G], xe[ce]),
        v = G,
        A = ce),
        (J !== M || se !== y || Ae !== P || Ne !== _) && (s.blendFuncSeparate(me[J], me[se], me[Ae], me[Ne]),
        M = J,
        y = se,
        P = Ae,
        _ = Ne),
        S = I,
        L = !1
    }
    function ke(I, G) {
        I.side === DoubleSide ? oe(2884) : Te(2884);
        let J = I.side === BackSide;
        G && (J = !J),
        Ge(J),
        I.blending === NormalBlending && I.transparent === !1 ? ze(NoBlending) : ze(I.blending, I.blendEquation, I.blendSrc, I.blendDst, I.blendEquationAlpha, I.blendSrcAlpha, I.blendDstAlpha, I.premultipliedAlpha),
        c.setFunc(I.depthFunc),
        c.setTest(I.depthTest),
        c.setMask(I.depthWrite),
        a.setMask(I.colorWrite);
        const se = I.stencilWrite;
        l.setTest(se),
        se && (l.setMask(I.stencilWriteMask),
        l.setFunc(I.stencilFunc, I.stencilRef, I.stencilFuncMask),
        l.setOp(I.stencilFail, I.stencilZFail, I.stencilZPass)),
        Re(I.polygonOffset, I.polygonOffsetFactor, I.polygonOffsetUnits),
        I.alphaToCoverage === !0 ? Te(32926) : oe(32926)
    }
    function Ge(I) {
        D !== I && (I ? s.frontFace(2304) : s.frontFace(2305),
        D = I)
    }
    function qe(I) {
        I !== CullFaceNone ? (Te(2884),
        I !== $ && (I === CullFaceBack ? s.cullFace(1029) : I === CullFaceFront ? s.cullFace(1028) : s.cullFace(1032))) : oe(2884),
        $ = I
    }
    function Ue(I) {
        I !== R && (U && s.lineWidth(I),
        R = I)
    }
    function Re(I, G, J) {
        I ? (Te(32823),
        (T !== G || C !== J) && (s.polygonOffset(G, J),
        T = G,
        C = J)) : oe(32823)
    }
    function je(I) {
        I ? Te(3089) : oe(3089)
    }
    function Ye(I) {
        I === void 0 && (I = 33984 + F - 1),
        Z !== I && (s.activeTexture(I),
        Z = I)
    }
    function E(I, G, J) {
        J === void 0 && (Z === null ? J = 33984 + F - 1 : J = Z);
        let se = j[J];
        se === void 0 && (se = {
            type: void 0,
            texture: void 0
        },
        j[J] = se),
        (se.type !== I || se.texture !== G) && (Z !== J && (s.activeTexture(J),
        Z = J),
        s.bindTexture(I, G || X[I]),
        se.type = I,
        se.texture = G)
    }
    function b() {
        const I = j[Z];
        I !== void 0 && I.type !== void 0 && (s.bindTexture(I.type, null),
        I.type = void 0,
        I.texture = void 0)
    }
    function W() {
        try {
            s.compressedTexImage2D.apply(s, arguments)
        } catch (I) {
            console.error("THREE.WebGLState:", I)
        }
    }
    function Q() {
        try {
            s.compressedTexImage3D.apply(s, arguments)
        } catch (I) {
            console.error("THREE.WebGLState:", I)
        }
    }
    function te() {
        try {
            s.texSubImage2D.apply(s, arguments)
        } catch (I) {
            console.error("THREE.WebGLState:", I)
        }
    }
    function ne() {
        try {
            s.texSubImage3D.apply(s, arguments)
        } catch (I) {
            console.error("THREE.WebGLState:", I)
        }
    }
    function _e() {
        try {
            s.compressedTexSubImage2D.apply(s, arguments)
        } catch (I) {
            console.error("THREE.WebGLState:", I)
        }
    }
    function re() {
        try {
            s.compressedTexSubImage3D.apply(s, arguments)
        } catch (I) {
            console.error("THREE.WebGLState:", I)
        }
    }
    function Y() {
        try {
            s.texStorage2D.apply(s, arguments)
        } catch (I) {
            console.error("THREE.WebGLState:", I)
        }
    }
    function de() {
        try {
            s.texStorage3D.apply(s, arguments)
        } catch (I) {
            console.error("THREE.WebGLState:", I)
        }
    }
    function pe() {
        try {
            s.texImage2D.apply(s, arguments)
        } catch (I) {
            console.error("THREE.WebGLState:", I)
        }
    }
    function le() {
        try {
            s.texImage3D.apply(s, arguments)
        } catch (I) {
            console.error("THREE.WebGLState:", I)
        }
    }
    function fe(I) {
        K.equals(I) === !1 && (s.scissor(I.x, I.y, I.z, I.w),
        K.copy(I))
    }
    function ue(I) {
        ee.equals(I) === !1 && (s.viewport(I.x, I.y, I.z, I.w),
        ee.copy(I))
    }
    function Ee(I, G) {
        let J = h.get(G);
        J === void 0 && (J = new WeakMap,
        h.set(G, J));
        let se = J.get(I);
        se === void 0 && (se = s.getUniformBlockIndex(G, I.name),
        J.set(I, se))
    }
    function Pe(I, G) {
        const se = h.get(G).get(I);
        u.get(G) !== se && (s.uniformBlockBinding(G, se, I.__bindingPointIndex),
        u.set(G, se))
    }
    function Oe() {
        s.disable(3042),
        s.disable(2884),
        s.disable(2929),
        s.disable(32823),
        s.disable(3089),
        s.disable(2960),
        s.disable(32926),
        s.blendEquation(32774),
        s.blendFunc(1, 0),
        s.blendFuncSeparate(1, 0, 1, 0),
        s.colorMask(!0, !0, !0, !0),
        s.clearColor(0, 0, 0, 0),
        s.depthMask(!0),
        s.depthFunc(513),
        s.clearDepth(1),
        s.stencilMask(4294967295),
        s.stencilFunc(519, 0, 4294967295),
        s.stencilOp(7680, 7680, 7680),
        s.clearStencil(0),
        s.cullFace(1029),
        s.frontFace(2305),
        s.polygonOffset(0, 0),
        s.activeTexture(33984),
        s.bindFramebuffer(36160, null),
        i === !0 && (s.bindFramebuffer(36009, null),
        s.bindFramebuffer(36008, null)),
        s.useProgram(null),
        s.lineWidth(1),
        s.scissor(0, 0, s.canvas.width, s.canvas.height),
        s.viewport(0, 0, s.canvas.width, s.canvas.height),
        d = {},
        Z = null,
        j = {},
        m = {},
        g = new WeakMap,
        p = [],
        f = null,
        x = !1,
        S = null,
        v = null,
        M = null,
        y = null,
        A = null,
        P = null,
        _ = null,
        L = !1,
        D = null,
        $ = null,
        R = null,
        T = null,
        C = null,
        K.set(0, 0, s.canvas.width, s.canvas.height),
        ee.set(0, 0, s.canvas.width, s.canvas.height),
        a.reset(),
        c.reset(),
        l.reset()
    }
    return {
        buffers: {
            color: a,
            depth: c,
            stencil: l
        },
        enable: Te,
        disable: oe,
        bindFramebuffer: ge,
        drawBuffers: ae,
        useProgram: Le,
        setBlending: ze,
        setMaterial: ke,
        setFlipSided: Ge,
        setCullFace: qe,
        setLineWidth: Ue,
        setPolygonOffset: Re,
        setScissorTest: je,
        activeTexture: Ye,
        bindTexture: E,
        unbindTexture: b,
        compressedTexImage2D: W,
        compressedTexImage3D: Q,
        texImage2D: pe,
        texImage3D: le,
        updateUBOMapping: Ee,
        uniformBlockBinding: Pe,
        texStorage2D: Y,
        texStorage3D: de,
        texSubImage2D: te,
        texSubImage3D: ne,
        compressedTexSubImage2D: _e,
        compressedTexSubImage3D: re,
        scissor: fe,
        viewport: ue,
        reset: Oe
    }
}
function WebGLTextures(s, e, t, i, n, r, o) {
    const a = n.isWebGL2
      , c = n.maxTextures
      , l = n.maxCubemapSize
      , u = n.maxTextureSize
      , h = n.maxSamples
      , d = e.has("WEBGL_multisampled_render_to_texture") ? e.get("WEBGL_multisampled_render_to_texture") : null
      , m = typeof navigator > "u" ? !1 : /OculusBrowser/g.test(navigator.userAgent)
      , g = new WeakMap;
    let p;
    const f = new WeakMap;
    let x = !1;
    try {
        x = typeof OffscreenCanvas < "u" && new OffscreenCanvas(1,1).getContext("2d") !== null
    } catch {}
    function S(E, b) {
        return x ? new OffscreenCanvas(E,b) : createElementNS("canvas")
    }
    function v(E, b, W, Q) {
        let te = 1;
        if ((E.width > Q || E.height > Q) && (te = Q / Math.max(E.width, E.height)),
        te < 1 || b === !0)
            if (typeof HTMLImageElement < "u" && E instanceof HTMLImageElement || typeof HTMLCanvasElement < "u" && E instanceof HTMLCanvasElement || typeof ImageBitmap < "u" && E instanceof ImageBitmap) {
                const ne = b ? floorPowerOfTwo : Math.floor
                  , _e = ne(te * E.width)
                  , re = ne(te * E.height);
                p === void 0 && (p = S(_e, re));
                const Y = W ? S(_e, re) : p;
                return Y.width = _e,
                Y.height = re,
                Y.getContext("2d").drawImage(E, 0, 0, _e, re),
                console.warn("THREE.WebGLRenderer: Texture has been resized from (" + E.width + "x" + E.height + ") to (" + _e + "x" + re + ")."),
                Y
            } else
                return "data"in E && console.warn("THREE.WebGLRenderer: Image in DataTexture is too big (" + E.width + "x" + E.height + ")."),
                E;
        return E
    }
    function M(E) {
        return isPowerOfTwo(E.width) && isPowerOfTwo(E.height)
    }
    function y(E) {
        return a ? !1 : E.wrapS !== ClampToEdgeWrapping || E.wrapT !== ClampToEdgeWrapping || E.minFilter !== NearestFilter && E.minFilter !== LinearFilter
    }
    function A(E, b) {
        return E.generateMipmaps && b && E.minFilter !== NearestFilter && E.minFilter !== LinearFilter
    }
    function P(E) {
        s.generateMipmap(E)
    }
    function _(E, b, W, Q, te=!1) {
        if (a === !1)
            return b;
        if (E !== null) {
            if (s[E] !== void 0)
                return s[E];
            console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '" + E + "'")
        }
        let ne = b;
        return b === 6403 && (W === 5126 && (ne = 33326),
        W === 5131 && (ne = 33325),
        W === 5121 && (ne = 33321)),
        b === 33319 && (W === 5126 && (ne = 33328),
        W === 5131 && (ne = 33327),
        W === 5121 && (ne = 33323)),
        b === 6408 && (W === 5126 && (ne = 34836),
        W === 5131 && (ne = 34842),
        W === 5121 && (ne = Q === sRGBEncoding && te === !1 ? 35907 : 32856),
        W === 32819 && (ne = 32854),
        W === 32820 && (ne = 32855)),
        (ne === 33325 || ne === 33326 || ne === 33327 || ne === 33328 || ne === 34842 || ne === 34836) && e.get("EXT_color_buffer_float"),
        ne
    }
    function L(E, b, W) {
        return A(E, W) === !0 || E.isFramebufferTexture && E.minFilter !== NearestFilter && E.minFilter !== LinearFilter ? Math.log2(Math.max(b.width, b.height)) + 1 : E.mipmaps !== void 0 && E.mipmaps.length > 0 ? E.mipmaps.length : E.isCompressedTexture && Array.isArray(E.image) ? b.mipmaps.length : 1
    }
    function D(E) {
        return E === NearestFilter || E === NearestMipmapNearestFilter || E === NearestMipmapLinearFilter ? 9728 : 9729
    }
    function $(E) {
        const b = E.target;
        b.removeEventListener("dispose", $),
        T(b),
        b.isVideoTexture && g.delete(b)
    }
    function R(E) {
        const b = E.target;
        b.removeEventListener("dispose", R),
        F(b)
    }
    function T(E) {
        const b = i.get(E);
        if (b.__webglInit === void 0)
            return;
        const W = E.source
          , Q = f.get(W);
        if (Q) {
            const te = Q[b.__cacheKey];
            te.usedTimes--,
            te.usedTimes === 0 && C(E),
            Object.keys(Q).length === 0 && f.delete(W)
        }
        i.remove(E)
    }
    function C(E) {
        const b = i.get(E);
        s.deleteTexture(b.__webglTexture);
        const W = E.source
          , Q = f.get(W);
        delete Q[b.__cacheKey],
        o.memory.textures--
    }
    function F(E) {
        const b = E.texture
          , W = i.get(E)
          , Q = i.get(b);
        if (Q.__webglTexture !== void 0 && (s.deleteTexture(Q.__webglTexture),
        o.memory.textures--),
        E.depthTexture && E.depthTexture.dispose(),
        E.isWebGLCubeRenderTarget)
            for (let te = 0; te < 6; te++)
                s.deleteFramebuffer(W.__webglFramebuffer[te]),
                W.__webglDepthbuffer && s.deleteRenderbuffer(W.__webglDepthbuffer[te]);
        else {
            if (s.deleteFramebuffer(W.__webglFramebuffer),
            W.__webglDepthbuffer && s.deleteRenderbuffer(W.__webglDepthbuffer),
            W.__webglMultisampledFramebuffer && s.deleteFramebuffer(W.__webglMultisampledFramebuffer),
            W.__webglColorRenderbuffer)
                for (let te = 0; te < W.__webglColorRenderbuffer.length; te++)
                    W.__webglColorRenderbuffer[te] && s.deleteRenderbuffer(W.__webglColorRenderbuffer[te]);
            W.__webglDepthRenderbuffer && s.deleteRenderbuffer(W.__webglDepthRenderbuffer)
        }
        if (E.isWebGLMultipleRenderTargets)
            for (let te = 0, ne = b.length; te < ne; te++) {
                const _e = i.get(b[te]);
                _e.__webglTexture && (s.deleteTexture(_e.__webglTexture),
                o.memory.textures--),
                i.remove(b[te])
            }
        i.remove(b),
        i.remove(E)
    }
    let U = 0;
    function z() {
        U = 0
    }
    function B() {
        const E = U;
        return E >= c && console.warn("THREE.WebGLTextures: Trying to use " + E + " texture units while this GPU supports only " + c),
        U += 1,
        E
    }
    function Z(E) {
        const b = [];
        return b.push(E.wrapS),
        b.push(E.wrapT),
        b.push(E.wrapR || 0),
        b.push(E.magFilter),
        b.push(E.minFilter),
        b.push(E.anisotropy),
        b.push(E.internalFormat),
        b.push(E.format),
        b.push(E.type),
        b.push(E.generateMipmaps),
        b.push(E.premultiplyAlpha),
        b.push(E.flipY),
        b.push(E.unpackAlignment),
        b.push(E.encoding),
        b.join()
    }
    function j(E, b) {
        const W = i.get(E);
        if (E.isVideoTexture && je(E),
        E.isRenderTargetTexture === !1 && E.version > 0 && W.__version !== E.version) {
            const Q = E.image;
            if (Q === null)
                console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");
            else if (Q.complete === !1)
                console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");
            else {
                oe(W, E, b);
                return
            }
        }
        t.bindTexture(3553, W.__webglTexture, 33984 + b)
    }
    function V(E, b) {
        const W = i.get(E);
        if (E.version > 0 && W.__version !== E.version) {
            oe(W, E, b);
            return
        }
        t.bindTexture(35866, W.__webglTexture, 33984 + b)
    }
    function k(E, b) {
        const W = i.get(E);
        if (E.version > 0 && W.__version !== E.version) {
            oe(W, E, b);
            return
        }
        t.bindTexture(32879, W.__webglTexture, 33984 + b)
    }
    function K(E, b) {
        const W = i.get(E);
        if (E.version > 0 && W.__version !== E.version) {
            ge(W, E, b);
            return
        }
        t.bindTexture(34067, W.__webglTexture, 33984 + b)
    }
    const ee = {
        [RepeatWrapping]: 10497,
        [ClampToEdgeWrapping]: 33071,
        [MirroredRepeatWrapping]: 33648
    }
      , ie = {
        [NearestFilter]: 9728,
        [NearestMipmapNearestFilter]: 9984,
        [NearestMipmapLinearFilter]: 9986,
        [LinearFilter]: 9729,
        [LinearMipmapNearestFilter]: 9985,
        [LinearMipmapLinearFilter]: 9987
    };
    function X(E, b, W) {
        if (W ? (s.texParameteri(E, 10242, ee[b.wrapS]),
        s.texParameteri(E, 10243, ee[b.wrapT]),
        (E === 32879 || E === 35866) && s.texParameteri(E, 32882, ee[b.wrapR]),
        s.texParameteri(E, 10240, ie[b.magFilter]),
        s.texParameteri(E, 10241, ie[b.minFilter])) : (s.texParameteri(E, 10242, 33071),
        s.texParameteri(E, 10243, 33071),
        (E === 32879 || E === 35866) && s.texParameteri(E, 32882, 33071),
        (b.wrapS !== ClampToEdgeWrapping || b.wrapT !== ClampToEdgeWrapping) && console.warn("THREE.WebGLRenderer: Texture is not power of two. Texture.wrapS and Texture.wrapT should be set to THREE.ClampToEdgeWrapping."),
        s.texParameteri(E, 10240, D(b.magFilter)),
        s.texParameteri(E, 10241, D(b.minFilter)),
        b.minFilter !== NearestFilter && b.minFilter !== LinearFilter && console.warn("THREE.WebGLRenderer: Texture is not power of two. Texture.minFilter should be set to THREE.NearestFilter or THREE.LinearFilter.")),
        e.has("EXT_texture_filter_anisotropic") === !0) {
            const Q = e.get("EXT_texture_filter_anisotropic");
            if (b.magFilter === NearestFilter || b.minFilter !== NearestMipmapLinearFilter && b.minFilter !== LinearMipmapLinearFilter || b.type === FloatType && e.has("OES_texture_float_linear") === !1 || a === !1 && b.type === HalfFloatType && e.has("OES_texture_half_float_linear") === !1)
                return;
            (b.anisotropy > 1 || i.get(b).__currentAnisotropy) && (s.texParameterf(E, Q.TEXTURE_MAX_ANISOTROPY_EXT, Math.min(b.anisotropy, n.getMaxAnisotropy())),
            i.get(b).__currentAnisotropy = b.anisotropy)
        }
    }
    function Te(E, b) {
        let W = !1;
        E.__webglInit === void 0 && (E.__webglInit = !0,
        b.addEventListener("dispose", $));
        const Q = b.source;
        let te = f.get(Q);
        te === void 0 && (te = {},
        f.set(Q, te));
        const ne = Z(b);
        if (ne !== E.__cacheKey) {
            te[ne] === void 0 && (te[ne] = {
                texture: s.createTexture(),
                usedTimes: 0
            },
            o.memory.textures++,
            W = !0),
            te[ne].usedTimes++;
            const _e = te[E.__cacheKey];
            _e !== void 0 && (te[E.__cacheKey].usedTimes--,
            _e.usedTimes === 0 && C(b)),
            E.__cacheKey = ne,
            E.__webglTexture = te[ne].texture
        }
        return W
    }
    function oe(E, b, W) {
        let Q = 3553;
        (b.isDataArrayTexture || b.isCompressedArrayTexture) && (Q = 35866),
        b.isData3DTexture && (Q = 32879);
        const te = Te(E, b)
          , ne = b.source;
        t.bindTexture(Q, E.__webglTexture, 33984 + W);
        const _e = i.get(ne);
        if (ne.version !== _e.__version || te === !0) {
            t.activeTexture(33984 + W),
            s.pixelStorei(37440, b.flipY),
            s.pixelStorei(37441, b.premultiplyAlpha),
            s.pixelStorei(3317, b.unpackAlignment),
            s.pixelStorei(37443, 0);
            const re = y(b) && M(b.image) === !1;
            let Y = v(b.image, re, !1, u);
            Y = Ye(b, Y);
            const de = M(Y) || a
              , pe = r.convert(b.format, b.encoding);
            let le = r.convert(b.type)
              , fe = _(b.internalFormat, pe, le, b.encoding, b.isVideoTexture);
            X(Q, b, de);
            let ue;
            const Ee = b.mipmaps
              , Pe = a && b.isVideoTexture !== !0
              , Oe = _e.__version === void 0 || te === !0
              , I = L(b, Y, de);
            if (b.isDepthTexture)
                fe = 6402,
                a ? b.type === FloatType ? fe = 36012 : b.type === UnsignedIntType ? fe = 33190 : b.type === UnsignedInt248Type ? fe = 35056 : fe = 33189 : b.type === FloatType && console.error("WebGLRenderer: Floating point depth texture requires WebGL2."),
                b.format === DepthFormat && fe === 6402 && b.type !== UnsignedShortType && b.type !== UnsignedIntType && (console.warn("THREE.WebGLRenderer: Use UnsignedShortType or UnsignedIntType for DepthFormat DepthTexture."),
                b.type = UnsignedIntType,
                le = r.convert(b.type)),
                b.format === DepthStencilFormat && fe === 6402 && (fe = 34041,
                b.type !== UnsignedInt248Type && (console.warn("THREE.WebGLRenderer: Use UnsignedInt248Type for DepthStencilFormat DepthTexture."),
                b.type = UnsignedInt248Type,
                le = r.convert(b.type))),
                Oe && (Pe ? t.texStorage2D(3553, 1, fe, Y.width, Y.height) : t.texImage2D(3553, 0, fe, Y.width, Y.height, 0, pe, le, null));
            else if (b.isDataTexture)
                if (Ee.length > 0 && de) {
                    Pe && Oe && t.texStorage2D(3553, I, fe, Ee[0].width, Ee[0].height);
                    for (let G = 0, J = Ee.length; G < J; G++)
                        ue = Ee[G],
                        Pe ? t.texSubImage2D(3553, G, 0, 0, ue.width, ue.height, pe, le, ue.data) : t.texImage2D(3553, G, fe, ue.width, ue.height, 0, pe, le, ue.data);
                    b.generateMipmaps = !1
                } else
                    Pe ? (Oe && t.texStorage2D(3553, I, fe, Y.width, Y.height),
                    t.texSubImage2D(3553, 0, 0, 0, Y.width, Y.height, pe, le, Y.data)) : t.texImage2D(3553, 0, fe, Y.width, Y.height, 0, pe, le, Y.data);
            else if (b.isCompressedTexture)
                if (b.isCompressedArrayTexture) {
                    Pe && Oe && t.texStorage3D(35866, I, fe, Ee[0].width, Ee[0].height, Y.depth);
                    for (let G = 0, J = Ee.length; G < J; G++)
                        ue = Ee[G],
                        b.format !== RGBAFormat ? pe !== null ? Pe ? t.compressedTexSubImage3D(35866, G, 0, 0, 0, ue.width, ue.height, Y.depth, pe, ue.data, 0, 0) : t.compressedTexImage3D(35866, G, fe, ue.width, ue.height, Y.depth, 0, ue.data, 0, 0) : console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()") : Pe ? t.texSubImage3D(35866, G, 0, 0, 0, ue.width, ue.height, Y.depth, pe, le, ue.data) : t.texImage3D(35866, G, fe, ue.width, ue.height, Y.depth, 0, pe, le, ue.data)
                } else {
                    Pe && Oe && t.texStorage2D(3553, I, fe, Ee[0].width, Ee[0].height);
                    for (let G = 0, J = Ee.length; G < J; G++)
                        ue = Ee[G],
                        b.format !== RGBAFormat ? pe !== null ? Pe ? t.compressedTexSubImage2D(3553, G, 0, 0, ue.width, ue.height, pe, ue.data) : t.compressedTexImage2D(3553, G, fe, ue.width, ue.height, 0, ue.data) : console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()") : Pe ? t.texSubImage2D(3553, G, 0, 0, ue.width, ue.height, pe, le, ue.data) : t.texImage2D(3553, G, fe, ue.width, ue.height, 0, pe, le, ue.data)
                }
            else if (b.isDataArrayTexture)
                Pe ? (Oe && t.texStorage3D(35866, I, fe, Y.width, Y.height, Y.depth),
                t.texSubImage3D(35866, 0, 0, 0, 0, Y.width, Y.height, Y.depth, pe, le, Y.data)) : t.texImage3D(35866, 0, fe, Y.width, Y.height, Y.depth, 0, pe, le, Y.data);
            else if (b.isData3DTexture)
                Pe ? (Oe && t.texStorage3D(32879, I, fe, Y.width, Y.height, Y.depth),
                t.texSubImage3D(32879, 0, 0, 0, 0, Y.width, Y.height, Y.depth, pe, le, Y.data)) : t.texImage3D(32879, 0, fe, Y.width, Y.height, Y.depth, 0, pe, le, Y.data);
            else if (b.isFramebufferTexture) {
                if (Oe)
                    if (Pe)
                        t.texStorage2D(3553, I, fe, Y.width, Y.height);
                    else {
                        let G = Y.width
                          , J = Y.height;
                        for (let se = 0; se < I; se++)
                            t.texImage2D(3553, se, fe, G, J, 0, pe, le, null),
                            G >>= 1,
                            J >>= 1
                    }
            } else if (Ee.length > 0 && de) {
                Pe && Oe && t.texStorage2D(3553, I, fe, Ee[0].width, Ee[0].height);
                for (let G = 0, J = Ee.length; G < J; G++)
                    ue = Ee[G],
                    Pe ? t.texSubImage2D(3553, G, 0, 0, pe, le, ue) : t.texImage2D(3553, G, fe, pe, le, ue);
                b.generateMipmaps = !1
            } else
                Pe ? (Oe && t.texStorage2D(3553, I, fe, Y.width, Y.height),
                t.texSubImage2D(3553, 0, 0, 0, pe, le, Y)) : t.texImage2D(3553, 0, fe, pe, le, Y);
            A(b, de) && P(Q),
            _e.__version = ne.version,
            b.onUpdate && b.onUpdate(b)
        }
        E.__version = b.version
    }
    function ge(E, b, W) {
        if (b.image.length !== 6)
            return;
        const Q = Te(E, b)
          , te = b.source;
        t.bindTexture(34067, E.__webglTexture, 33984 + W);
        const ne = i.get(te);
        if (te.version !== ne.__version || Q === !0) {
            t.activeTexture(33984 + W),
            s.pixelStorei(37440, b.flipY),
            s.pixelStorei(37441, b.premultiplyAlpha),
            s.pixelStorei(3317, b.unpackAlignment),
            s.pixelStorei(37443, 0);
            const _e = b.isCompressedTexture || b.image[0].isCompressedTexture
              , re = b.image[0] && b.image[0].isDataTexture
              , Y = [];
            for (let G = 0; G < 6; G++)
                !_e && !re ? Y[G] = v(b.image[G], !1, !0, l) : Y[G] = re ? b.image[G].image : b.image[G],
                Y[G] = Ye(b, Y[G]);
            const de = Y[0]
              , pe = M(de) || a
              , le = r.convert(b.format, b.encoding)
              , fe = r.convert(b.type)
              , ue = _(b.internalFormat, le, fe, b.encoding)
              , Ee = a && b.isVideoTexture !== !0
              , Pe = ne.__version === void 0 || Q === !0;
            let Oe = L(b, de, pe);
            X(34067, b, pe);
            let I;
            if (_e) {
                Ee && Pe && t.texStorage2D(34067, Oe, ue, de.width, de.height);
                for (let G = 0; G < 6; G++) {
                    I = Y[G].mipmaps;
                    for (let J = 0; J < I.length; J++) {
                        const se = I[J];
                        b.format !== RGBAFormat ? le !== null ? Ee ? t.compressedTexSubImage2D(34069 + G, J, 0, 0, se.width, se.height, le, se.data) : t.compressedTexImage2D(34069 + G, J, ue, se.width, se.height, 0, se.data) : console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()") : Ee ? t.texSubImage2D(34069 + G, J, 0, 0, se.width, se.height, le, fe, se.data) : t.texImage2D(34069 + G, J, ue, se.width, se.height, 0, le, fe, se.data)
                    }
                }
            } else {
                I = b.mipmaps,
                Ee && Pe && (I.length > 0 && Oe++,
                t.texStorage2D(34067, Oe, ue, Y[0].width, Y[0].height));
                for (let G = 0; G < 6; G++)
                    if (re) {
                        Ee ? t.texSubImage2D(34069 + G, 0, 0, 0, Y[G].width, Y[G].height, le, fe, Y[G].data) : t.texImage2D(34069 + G, 0, ue, Y[G].width, Y[G].height, 0, le, fe, Y[G].data);
                        for (let J = 0; J < I.length; J++) {
                            const ce = I[J].image[G].image;
                            Ee ? t.texSubImage2D(34069 + G, J + 1, 0, 0, ce.width, ce.height, le, fe, ce.data) : t.texImage2D(34069 + G, J + 1, ue, ce.width, ce.height, 0, le, fe, ce.data)
                        }
                    } else {
                        Ee ? t.texSubImage2D(34069 + G, 0, 0, 0, le, fe, Y[G]) : t.texImage2D(34069 + G, 0, ue, le, fe, Y[G]);
                        for (let J = 0; J < I.length; J++) {
                            const se = I[J];
                            Ee ? t.texSubImage2D(34069 + G, J + 1, 0, 0, le, fe, se.image[G]) : t.texImage2D(34069 + G, J + 1, ue, le, fe, se.image[G])
                        }
                    }
            }
            A(b, pe) && P(34067),
            ne.__version = te.version,
            b.onUpdate && b.onUpdate(b)
        }
        E.__version = b.version
    }
    function ae(E, b, W, Q, te) {
        const ne = r.convert(W.format, W.encoding)
          , _e = r.convert(W.type)
          , re = _(W.internalFormat, ne, _e, W.encoding);
        i.get(b).__hasExternalTextures || (te === 32879 || te === 35866 ? t.texImage3D(te, 0, re, b.width, b.height, b.depth, 0, ne, _e, null) : t.texImage2D(te, 0, re, b.width, b.height, 0, ne, _e, null)),
        t.bindFramebuffer(36160, E),
        Re(b) ? d.framebufferTexture2DMultisampleEXT(36160, Q, te, i.get(W).__webglTexture, 0, Ue(b)) : (te === 3553 || te >= 34069 && te <= 34074) && s.framebufferTexture2D(36160, Q, te, i.get(W).__webglTexture, 0),
        t.bindFramebuffer(36160, null)
    }
    function Le(E, b, W) {
        if (s.bindRenderbuffer(36161, E),
        b.depthBuffer && !b.stencilBuffer) {
            let Q = 33189;
            if (W || Re(b)) {
                const te = b.depthTexture;
                te && te.isDepthTexture && (te.type === FloatType ? Q = 36012 : te.type === UnsignedIntType && (Q = 33190));
                const ne = Ue(b);
                Re(b) ? d.renderbufferStorageMultisampleEXT(36161, ne, Q, b.width, b.height) : s.renderbufferStorageMultisample(36161, ne, Q, b.width, b.height)
            } else
                s.renderbufferStorage(36161, Q, b.width, b.height);
            s.framebufferRenderbuffer(36160, 36096, 36161, E)
        } else if (b.depthBuffer && b.stencilBuffer) {
            const Q = Ue(b);
            W && Re(b) === !1 ? s.renderbufferStorageMultisample(36161, Q, 35056, b.width, b.height) : Re(b) ? d.renderbufferStorageMultisampleEXT(36161, Q, 35056, b.width, b.height) : s.renderbufferStorage(36161, 34041, b.width, b.height),
            s.framebufferRenderbuffer(36160, 33306, 36161, E)
        } else {
            const Q = b.isWebGLMultipleRenderTargets === !0 ? b.texture : [b.texture];
            for (let te = 0; te < Q.length; te++) {
                const ne = Q[te]
                  , _e = r.convert(ne.format, ne.encoding)
                  , re = r.convert(ne.type)
                  , Y = _(ne.internalFormat, _e, re, ne.encoding)
                  , de = Ue(b);
                W && Re(b) === !1 ? s.renderbufferStorageMultisample(36161, de, Y, b.width, b.height) : Re(b) ? d.renderbufferStorageMultisampleEXT(36161, de, Y, b.width, b.height) : s.renderbufferStorage(36161, Y, b.width, b.height)
            }
        }
        s.bindRenderbuffer(36161, null)
    }
    function xe(E, b) {
        if (b && b.isWebGLCubeRenderTarget)
            throw new Error("Depth Texture with cube render targets is not supported");
        if (t.bindFramebuffer(36160, E),
        !(b.depthTexture && b.depthTexture.isDepthTexture))
            throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");
        (!i.get(b.depthTexture).__webglTexture || b.depthTexture.image.width !== b.width || b.depthTexture.image.height !== b.height) && (b.depthTexture.image.width = b.width,
        b.depthTexture.image.height = b.height,
        b.depthTexture.needsUpdate = !0),
        j(b.depthTexture, 0);
        const Q = i.get(b.depthTexture).__webglTexture
          , te = Ue(b);
        if (b.depthTexture.format === DepthFormat)
            Re(b) ? d.framebufferTexture2DMultisampleEXT(36160, 36096, 3553, Q, 0, te) : s.framebufferTexture2D(36160, 36096, 3553, Q, 0);
        else if (b.depthTexture.format === DepthStencilFormat)
            Re(b) ? d.framebufferTexture2DMultisampleEXT(36160, 33306, 3553, Q, 0, te) : s.framebufferTexture2D(36160, 33306, 3553, Q, 0);
        else
            throw new Error("Unknown depthTexture format")
    }
    function me(E) {
        const b = i.get(E)
          , W = E.isWebGLCubeRenderTarget === !0;
        if (E.depthTexture && !b.__autoAllocateDepthBuffer) {
            if (W)
                throw new Error("target.depthTexture not supported in Cube render targets");
            xe(b.__webglFramebuffer, E)
        } else if (W) {
            b.__webglDepthbuffer = [];
            for (let Q = 0; Q < 6; Q++)
                t.bindFramebuffer(36160, b.__webglFramebuffer[Q]),
                b.__webglDepthbuffer[Q] = s.createRenderbuffer(),
                Le(b.__webglDepthbuffer[Q], E, !1)
        } else
            t.bindFramebuffer(36160, b.__webglFramebuffer),
            b.__webglDepthbuffer = s.createRenderbuffer(),
            Le(b.__webglDepthbuffer, E, !1);
        t.bindFramebuffer(36160, null)
    }
    function ze(E, b, W) {
        const Q = i.get(E);
        b !== void 0 && ae(Q.__webglFramebuffer, E, E.texture, 36064, 3553),
        W !== void 0 && me(E)
    }
    function ke(E) {
        const b = E.texture
          , W = i.get(E)
          , Q = i.get(b);
        E.addEventListener("dispose", R),
        E.isWebGLMultipleRenderTargets !== !0 && (Q.__webglTexture === void 0 && (Q.__webglTexture = s.createTexture()),
        Q.__version = b.version,
        o.memory.textures++);
        const te = E.isWebGLCubeRenderTarget === !0
          , ne = E.isWebGLMultipleRenderTargets === !0
          , _e = M(E) || a;
        if (te) {
            W.__webglFramebuffer = [];
            for (let re = 0; re < 6; re++)
                W.__webglFramebuffer[re] = s.createFramebuffer()
        } else {
            if (W.__webglFramebuffer = s.createFramebuffer(),
            ne)
                if (n.drawBuffers) {
                    const re = E.texture;
                    for (let Y = 0, de = re.length; Y < de; Y++) {
                        const pe = i.get(re[Y]);
                        pe.__webglTexture === void 0 && (pe.__webglTexture = s.createTexture(),
                        o.memory.textures++)
                    }
                } else
                    console.warn("THREE.WebGLRenderer: WebGLMultipleRenderTargets can only be used with WebGL2 or WEBGL_draw_buffers extension.");
            if (a && E.samples > 0 && Re(E) === !1) {
                const re = ne ? b : [b];
                W.__webglMultisampledFramebuffer = s.createFramebuffer(),
                W.__webglColorRenderbuffer = [],
                t.bindFramebuffer(36160, W.__webglMultisampledFramebuffer);
                for (let Y = 0; Y < re.length; Y++) {
                    const de = re[Y];
                    W.__webglColorRenderbuffer[Y] = s.createRenderbuffer(),
                    s.bindRenderbuffer(36161, W.__webglColorRenderbuffer[Y]);
                    const pe = r.convert(de.format, de.encoding)
                      , le = r.convert(de.type)
                      , fe = _(de.internalFormat, pe, le, de.encoding, E.isXRRenderTarget === !0)
                      , ue = Ue(E);
                    s.renderbufferStorageMultisample(36161, ue, fe, E.width, E.height),
                    s.framebufferRenderbuffer(36160, 36064 + Y, 36161, W.__webglColorRenderbuffer[Y])
                }
                s.bindRenderbuffer(36161, null),
                E.depthBuffer && (W.__webglDepthRenderbuffer = s.createRenderbuffer(),
                Le(W.__webglDepthRenderbuffer, E, !0)),
                t.bindFramebuffer(36160, null)
            }
        }
        if (te) {
            t.bindTexture(34067, Q.__webglTexture),
            X(34067, b, _e);
            for (let re = 0; re < 6; re++)
                ae(W.__webglFramebuffer[re], E, b, 36064, 34069 + re);
            A(b, _e) && P(34067),
            t.unbindTexture()
        } else if (ne) {
            const re = E.texture;
            for (let Y = 0, de = re.length; Y < de; Y++) {
                const pe = re[Y]
                  , le = i.get(pe);
                t.bindTexture(3553, le.__webglTexture),
                X(3553, pe, _e),
                ae(W.__webglFramebuffer, E, pe, 36064 + Y, 3553),
                A(pe, _e) && P(3553)
            }
            t.unbindTexture()
        } else {
            let re = 3553;
            (E.isWebGL3DRenderTarget || E.isWebGLArrayRenderTarget) && (a ? re = E.isWebGL3DRenderTarget ? 32879 : 35866 : console.error("THREE.WebGLTextures: THREE.Data3DTexture and THREE.DataArrayTexture only supported with WebGL2.")),
            t.bindTexture(re, Q.__webglTexture),
            X(re, b, _e),
            ae(W.__webglFramebuffer, E, b, 36064, re),
            A(b, _e) && P(re),
            t.unbindTexture()
        }
        E.depthBuffer && me(E)
    }
    function Ge(E) {
        const b = M(E) || a
          , W = E.isWebGLMultipleRenderTargets === !0 ? E.texture : [E.texture];
        for (let Q = 0, te = W.length; Q < te; Q++) {
            const ne = W[Q];
            if (A(ne, b)) {
                const _e = E.isWebGLCubeRenderTarget ? 34067 : 3553
                  , re = i.get(ne).__webglTexture;
                t.bindTexture(_e, re),
                P(_e),
                t.unbindTexture()
            }
        }
    }
    function qe(E) {
        if (a && E.samples > 0 && Re(E) === !1) {
            const b = E.isWebGLMultipleRenderTargets ? E.texture : [E.texture]
              , W = E.width
              , Q = E.height;
            let te = 16384;
            const ne = []
              , _e = E.stencilBuffer ? 33306 : 36096
              , re = i.get(E)
              , Y = E.isWebGLMultipleRenderTargets === !0;
            if (Y)
                for (let de = 0; de < b.length; de++)
                    t.bindFramebuffer(36160, re.__webglMultisampledFramebuffer),
                    s.framebufferRenderbuffer(36160, 36064 + de, 36161, null),
                    t.bindFramebuffer(36160, re.__webglFramebuffer),
                    s.framebufferTexture2D(36009, 36064 + de, 3553, null, 0);
            t.bindFramebuffer(36008, re.__webglMultisampledFramebuffer),
            t.bindFramebuffer(36009, re.__webglFramebuffer);
            for (let de = 0; de < b.length; de++) {
                ne.push(36064 + de),
                E.depthBuffer && ne.push(_e);
                const pe = re.__ignoreDepthValues !== void 0 ? re.__ignoreDepthValues : !1;
                if (pe === !1 && (E.depthBuffer && (te |= 256),
                E.stencilBuffer && (te |= 1024)),
                Y && s.framebufferRenderbuffer(36008, 36064, 36161, re.__webglColorRenderbuffer[de]),
                pe === !0 && (s.invalidateFramebuffer(36008, [_e]),
                s.invalidateFramebuffer(36009, [_e])),
                Y) {
                    const le = i.get(b[de]).__webglTexture;
                    s.framebufferTexture2D(36009, 36064, 3553, le, 0)
                }
                s.blitFramebuffer(0, 0, W, Q, 0, 0, W, Q, te, 9728),
                m && s.invalidateFramebuffer(36008, ne)
            }
            if (t.bindFramebuffer(36008, null),
            t.bindFramebuffer(36009, null),
            Y)
                for (let de = 0; de < b.length; de++) {
                    t.bindFramebuffer(36160, re.__webglMultisampledFramebuffer),
                    s.framebufferRenderbuffer(36160, 36064 + de, 36161, re.__webglColorRenderbuffer[de]);
                    const pe = i.get(b[de]).__webglTexture;
                    t.bindFramebuffer(36160, re.__webglFramebuffer),
                    s.framebufferTexture2D(36009, 36064 + de, 3553, pe, 0)
                }
            t.bindFramebuffer(36009, re.__webglMultisampledFramebuffer)
        }
    }
    function Ue(E) {
        return Math.min(h, E.samples)
    }
    function Re(E) {
        const b = i.get(E);
        return a && E.samples > 0 && e.has("WEBGL_multisampled_render_to_texture") === !0 && b.__useRenderToTexture !== !1
    }
    function je(E) {
        const b = o.render.frame;
        g.get(E) !== b && (g.set(E, b),
        E.update())
    }
    function Ye(E, b) {
        const W = E.encoding
          , Q = E.format
          , te = E.type;
        return E.isCompressedTexture === !0 || E.isVideoTexture === !0 || E.format === _SRGBAFormat || W !== LinearEncoding && (W === sRGBEncoding ? a === !1 ? e.has("EXT_sRGB") === !0 && Q === RGBAFormat ? (E.format = _SRGBAFormat,
        E.minFilter = LinearFilter,
        E.generateMipmaps = !1) : b = ImageUtils.sRGBToLinear(b) : (Q !== RGBAFormat || te !== UnsignedByteType) && console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType.") : console.error("THREE.WebGLTextures: Unsupported texture encoding:", W)),
        b
    }
    this.allocateTextureUnit = B,
    this.resetTextureUnits = z,
    this.setTexture2D = j,
    this.setTexture2DArray = V,
    this.setTexture3D = k,
    this.setTextureCube = K,
    this.rebindTextures = ze,
    this.setupRenderTarget = ke,
    this.updateRenderTargetMipmap = Ge,
    this.updateMultisampleRenderTarget = qe,
    this.setupDepthRenderbuffer = me,
    this.setupFrameBufferTexture = ae,
    this.useMultisampledRTT = Re
}
function WebGLUtils(s, e, t) {
    const i = t.isWebGL2;
    function n(r, o=null) {
        let a;
        if (r === UnsignedByteType)
            return 5121;
        if (r === UnsignedShort4444Type)
            return 32819;
        if (r === UnsignedShort5551Type)
            return 32820;
        if (r === ByteType)
            return 5120;
        if (r === ShortType)
            return 5122;
        if (r === UnsignedShortType)
            return 5123;
        if (r === IntType)
            return 5124;
        if (r === UnsignedIntType)
            return 5125;
        if (r === FloatType)
            return 5126;
        if (r === HalfFloatType)
            return i ? 5131 : (a = e.get("OES_texture_half_float"),
            a !== null ? a.HALF_FLOAT_OES : null);
        if (r === AlphaFormat)
            return 6406;
        if (r === RGBAFormat)
            return 6408;
        if (r === LuminanceFormat)
            return 6409;
        if (r === LuminanceAlphaFormat)
            return 6410;
        if (r === DepthFormat)
            return 6402;
        if (r === DepthStencilFormat)
            return 34041;
        if (r === RGBFormat)
            return console.warn("THREE.WebGLRenderer: THREE.RGBFormat has been removed. Use THREE.RGBAFormat instead. https://github.com/mrdoob/three.js/pull/23228"),
            6408;
        if (r === _SRGBAFormat)
            return a = e.get("EXT_sRGB"),
            a !== null ? a.SRGB_ALPHA_EXT : null;
        if (r === RedFormat)
            return 6403;
        if (r === RedIntegerFormat)
            return 36244;
        if (r === RGFormat)
            return 33319;
        if (r === RGIntegerFormat)
            return 33320;
        if (r === RGBAIntegerFormat)
            return 36249;
        if (r === RGB_S3TC_DXT1_Format || r === RGBA_S3TC_DXT1_Format || r === RGBA_S3TC_DXT3_Format || r === RGBA_S3TC_DXT5_Format)
            if (o === sRGBEncoding)
                if (a = e.get("WEBGL_compressed_texture_s3tc_srgb"),
                a !== null) {
                    if (r === RGB_S3TC_DXT1_Format)
                        return a.COMPRESSED_SRGB_S3TC_DXT1_EXT;
                    if (r === RGBA_S3TC_DXT1_Format)
                        return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;
                    if (r === RGBA_S3TC_DXT3_Format)
                        return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;
                    if (r === RGBA_S3TC_DXT5_Format)
                        return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT
                } else
                    return null;
            else if (a = e.get("WEBGL_compressed_texture_s3tc"),
            a !== null) {
                if (r === RGB_S3TC_DXT1_Format)
                    return a.COMPRESSED_RGB_S3TC_DXT1_EXT;
                if (r === RGBA_S3TC_DXT1_Format)
                    return a.COMPRESSED_RGBA_S3TC_DXT1_EXT;
                if (r === RGBA_S3TC_DXT3_Format)
                    return a.COMPRESSED_RGBA_S3TC_DXT3_EXT;
                if (r === RGBA_S3TC_DXT5_Format)
                    return a.COMPRESSED_RGBA_S3TC_DXT5_EXT
            } else
                return null;
        if (r === RGB_PVRTC_4BPPV1_Format || r === RGB_PVRTC_2BPPV1_Format || r === RGBA_PVRTC_4BPPV1_Format || r === RGBA_PVRTC_2BPPV1_Format)
            if (a = e.get("WEBGL_compressed_texture_pvrtc"),
            a !== null) {
                if (r === RGB_PVRTC_4BPPV1_Format)
                    return a.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;
                if (r === RGB_PVRTC_2BPPV1_Format)
                    return a.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;
                if (r === RGBA_PVRTC_4BPPV1_Format)
                    return a.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;
                if (r === RGBA_PVRTC_2BPPV1_Format)
                    return a.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG
            } else
                return null;
        if (r === RGB_ETC1_Format)
            return a = e.get("WEBGL_compressed_texture_etc1"),
            a !== null ? a.COMPRESSED_RGB_ETC1_WEBGL : null;
        if (r === RGB_ETC2_Format || r === RGBA_ETC2_EAC_Format)
            if (a = e.get("WEBGL_compressed_texture_etc"),
            a !== null) {
                if (r === RGB_ETC2_Format)
                    return o === sRGBEncoding ? a.COMPRESSED_SRGB8_ETC2 : a.COMPRESSED_RGB8_ETC2;
                if (r === RGBA_ETC2_EAC_Format)
                    return o === sRGBEncoding ? a.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC : a.COMPRESSED_RGBA8_ETC2_EAC
            } else
                return null;
        if (r === RGBA_ASTC_4x4_Format || r === RGBA_ASTC_5x4_Format || r === RGBA_ASTC_5x5_Format || r === RGBA_ASTC_6x5_Format || r === RGBA_ASTC_6x6_Format || r === RGBA_ASTC_8x5_Format || r === RGBA_ASTC_8x6_Format || r === RGBA_ASTC_8x8_Format || r === RGBA_ASTC_10x5_Format || r === RGBA_ASTC_10x6_Format || r === RGBA_ASTC_10x8_Format || r === RGBA_ASTC_10x10_Format || r === RGBA_ASTC_12x10_Format || r === RGBA_ASTC_12x12_Format)
            if (a = e.get("WEBGL_compressed_texture_astc"),
            a !== null) {
                if (r === RGBA_ASTC_4x4_Format)
                    return o === sRGBEncoding ? a.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR : a.COMPRESSED_RGBA_ASTC_4x4_KHR;
                if (r === RGBA_ASTC_5x4_Format)
                    return o === sRGBEncoding ? a.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR : a.COMPRESSED_RGBA_ASTC_5x4_KHR;
                if (r === RGBA_ASTC_5x5_Format)
                    return o === sRGBEncoding ? a.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR : a.COMPRESSED_RGBA_ASTC_5x5_KHR;
                if (r === RGBA_ASTC_6x5_Format)
                    return o === sRGBEncoding ? a.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR : a.COMPRESSED_RGBA_ASTC_6x5_KHR;
                if (r === RGBA_ASTC_6x6_Format)
                    return o === sRGBEncoding ? a.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR : a.COMPRESSED_RGBA_ASTC_6x6_KHR;
                if (r === RGBA_ASTC_8x5_Format)
                    return o === sRGBEncoding ? a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR : a.COMPRESSED_RGBA_ASTC_8x5_KHR;
                if (r === RGBA_ASTC_8x6_Format)
                    return o === sRGBEncoding ? a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR : a.COMPRESSED_RGBA_ASTC_8x6_KHR;
                if (r === RGBA_ASTC_8x8_Format)
                    return o === sRGBEncoding ? a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR : a.COMPRESSED_RGBA_ASTC_8x8_KHR;
                if (r === RGBA_ASTC_10x5_Format)
                    return o === sRGBEncoding ? a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR : a.COMPRESSED_RGBA_ASTC_10x5_KHR;
                if (r === RGBA_ASTC_10x6_Format)
                    return o === sRGBEncoding ? a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR : a.COMPRESSED_RGBA_ASTC_10x6_KHR;
                if (r === RGBA_ASTC_10x8_Format)
                    return o === sRGBEncoding ? a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR : a.COMPRESSED_RGBA_ASTC_10x8_KHR;
                if (r === RGBA_ASTC_10x10_Format)
                    return o === sRGBEncoding ? a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR : a.COMPRESSED_RGBA_ASTC_10x10_KHR;
                if (r === RGBA_ASTC_12x10_Format)
                    return o === sRGBEncoding ? a.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR : a.COMPRESSED_RGBA_ASTC_12x10_KHR;
                if (r === RGBA_ASTC_12x12_Format)
                    return o === sRGBEncoding ? a.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR : a.COMPRESSED_RGBA_ASTC_12x12_KHR
            } else
                return null;
        if (r === RGBA_BPTC_Format)
            if (a = e.get("EXT_texture_compression_bptc"),
            a !== null) {
                if (r === RGBA_BPTC_Format)
                    return o === sRGBEncoding ? a.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT : a.COMPRESSED_RGBA_BPTC_UNORM_EXT
            } else
                return null;
        return r === UnsignedInt248Type ? i ? 34042 : (a = e.get("WEBGL_depth_texture"),
        a !== null ? a.UNSIGNED_INT_24_8_WEBGL : null) : s[r] !== void 0 ? s[r] : null
    }
    return {
        convert: n
    }
}
class ArrayCamera extends PerspectiveCamera {
    constructor(e=[]) {
        super(),
        this.isArrayCamera = !0,
        this.cameras = e
    }
}
class Group extends Object3D {
    constructor() {
        super(),
        this.isGroup = !0,
        this.type = "Group"
    }
}
const _moveEvent = {
    type: "move"
};
class WebXRController {
    constructor() {
        this._targetRay = null,
        this._grip = null,
        this._hand = null
    }
    getHandSpace() {
        return this._hand === null && (this._hand = new Group,
        this._hand.matrixAutoUpdate = !1,
        this._hand.visible = !1,
        this._hand.joints = {},
        this._hand.inputState = {
            pinching: !1
        }),
        this._hand
    }
    getTargetRaySpace() {
        return this._targetRay === null && (this._targetRay = new Group,
        this._targetRay.matrixAutoUpdate = !1,
        this._targetRay.visible = !1,
        this._targetRay.hasLinearVelocity = !1,
        this._targetRay.linearVelocity = new Vector3,
        this._targetRay.hasAngularVelocity = !1,
        this._targetRay.angularVelocity = new Vector3),
        this._targetRay
    }
    getGripSpace() {
        return this._grip === null && (this._grip = new Group,
        this._grip.matrixAutoUpdate = !1,
        this._grip.visible = !1,
        this._grip.hasLinearVelocity = !1,
        this._grip.linearVelocity = new Vector3,
        this._grip.hasAngularVelocity = !1,
        this._grip.angularVelocity = new Vector3),
        this._grip
    }
    dispatchEvent(e) {
        return this._targetRay !== null && this._targetRay.dispatchEvent(e),
        this._grip !== null && this._grip.dispatchEvent(e),
        this._hand !== null && this._hand.dispatchEvent(e),
        this
    }
    connect(e) {
        if (e && e.hand) {
            const t = this._hand;
            if (t)
                for (const i of e.hand.values())
                    this._getHandJoint(t, i)
        }
        return this.dispatchEvent({
            type: "connected",
            data: e
        }),
        this
    }
    disconnect(e) {
        return this.dispatchEvent({
            type: "disconnected",
            data: e
        }),
        this._targetRay !== null && (this._targetRay.visible = !1),
        this._grip !== null && (this._grip.visible = !1),
        this._hand !== null && (this._hand.visible = !1),
        this
    }
    update(e, t, i) {
        let n = null
          , r = null
          , o = null;
        const a = this._targetRay
          , c = this._grip
          , l = this._hand;
        if (e && t.session.visibilityState !== "visible-blurred") {
            if (l && e.hand) {
                o = !0;
                for (const p of e.hand.values()) {
                    const f = t.getJointPose(p, i)
                      , x = this._getHandJoint(l, p);
                    f !== null && (x.matrix.fromArray(f.transform.matrix),
                    x.matrix.decompose(x.position, x.rotation, x.scale),
                    x.jointRadius = f.radius),
                    x.visible = f !== null
                }
                const u = l.joints["index-finger-tip"]
                  , h = l.joints["thumb-tip"]
                  , d = u.position.distanceTo(h.position)
                  , m = .02
                  , g = .005;
                l.inputState.pinching && d > m + g ? (l.inputState.pinching = !1,
                this.dispatchEvent({
                    type: "pinchend",
                    handedness: e.handedness,
                    target: this
                })) : !l.inputState.pinching && d <= m - g && (l.inputState.pinching = !0,
                this.dispatchEvent({
                    type: "pinchstart",
                    handedness: e.handedness,
                    target: this
                }))
            } else
                c !== null && e.gripSpace && (r = t.getPose(e.gripSpace, i),
                r !== null && (c.matrix.fromArray(r.transform.matrix),
                c.matrix.decompose(c.position, c.rotation, c.scale),
                r.linearVelocity ? (c.hasLinearVelocity = !0,
                c.linearVelocity.copy(r.linearVelocity)) : c.hasLinearVelocity = !1,
                r.angularVelocity ? (c.hasAngularVelocity = !0,
                c.angularVelocity.copy(r.angularVelocity)) : c.hasAngularVelocity = !1));
            a !== null && (n = t.getPose(e.targetRaySpace, i),
            n === null && r !== null && (n = r),
            n !== null && (a.matrix.fromArray(n.transform.matrix),
            a.matrix.decompose(a.position, a.rotation, a.scale),
            n.linearVelocity ? (a.hasLinearVelocity = !0,
            a.linearVelocity.copy(n.linearVelocity)) : a.hasLinearVelocity = !1,
            n.angularVelocity ? (a.hasAngularVelocity = !0,
            a.angularVelocity.copy(n.angularVelocity)) : a.hasAngularVelocity = !1,
            this.dispatchEvent(_moveEvent)))
        }
        return a !== null && (a.visible = n !== null),
        c !== null && (c.visible = r !== null),
        l !== null && (l.visible = o !== null),
        this
    }
    _getHandJoint(e, t) {
        if (e.joints[t.jointName] === void 0) {
            const i = new Group;
            i.matrixAutoUpdate = !1,
            i.visible = !1,
            e.joints[t.jointName] = i,
            e.add(i)
        }
        return e.joints[t.jointName]
    }
}
class DepthTexture extends Texture {
    constructor(e, t, i, n, r, o, a, c, l, u) {
        if (u = u !== void 0 ? u : DepthFormat,
        u !== DepthFormat && u !== DepthStencilFormat)
            throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");
        i === void 0 && u === DepthFormat && (i = UnsignedIntType),
        i === void 0 && u === DepthStencilFormat && (i = UnsignedInt248Type),
        super(null, n, r, o, a, c, u, i, l),
        this.isDepthTexture = !0,
        this.image = {
            width: e,
            height: t
        },
        this.magFilter = a !== void 0 ? a : NearestFilter,
        this.minFilter = c !== void 0 ? c : NearestFilter,
        this.flipY = !1,
        this.generateMipmaps = !1
    }
}
class WebXRManager extends EventDispatcher {
    constructor(e, t) {
        super();
        const i = this;
        let n = null
          , r = 1
          , o = null
          , a = "local-floor"
          , c = null
          , l = null
          , u = null
          , h = null
          , d = null
          , m = null;
        const g = t.getContextAttributes();
        let p = null
          , f = null;
        const x = []
          , S = []
          , v = new Set
          , M = new Map
          , y = new PerspectiveCamera;
        y.layers.enable(1),
        y.viewport = new Vector4;
        const A = new PerspectiveCamera;
        A.layers.enable(2),
        A.viewport = new Vector4;
        const P = [y, A]
          , _ = new ArrayCamera;
        _.layers.enable(1),
        _.layers.enable(2);
        let L = null
          , D = null;
        this.cameraAutoUpdate = !0,
        this.enabled = !1,
        this.isPresenting = !1,
        this.getController = function(V) {
            let k = x[V];
            return k === void 0 && (k = new WebXRController,
            x[V] = k),
            k.getTargetRaySpace()
        }
        ,
        this.getControllerGrip = function(V) {
            let k = x[V];
            return k === void 0 && (k = new WebXRController,
            x[V] = k),
            k.getGripSpace()
        }
        ,
        this.getHand = function(V) {
            let k = x[V];
            return k === void 0 && (k = new WebXRController,
            x[V] = k),
            k.getHandSpace()
        }
        ;
        function $(V) {
            const k = S.indexOf(V.inputSource);
            if (k === -1)
                return;
            const K = x[k];
            K !== void 0 && K.dispatchEvent({
                type: V.type,
                data: V.inputSource
            })
        }
        function R() {
            n.removeEventListener("select", $),
            n.removeEventListener("selectstart", $),
            n.removeEventListener("selectend", $),
            n.removeEventListener("squeeze", $),
            n.removeEventListener("squeezestart", $),
            n.removeEventListener("squeezeend", $),
            n.removeEventListener("end", R),
            n.removeEventListener("inputsourceschange", T);
            for (let V = 0; V < x.length; V++) {
                const k = S[V];
                k !== null && (S[V] = null,
                x[V].disconnect(k))
            }
            L = null,
            D = null,
            e.setRenderTarget(p),
            d = null,
            h = null,
            u = null,
            n = null,
            f = null,
            j.stop(),
            i.isPresenting = !1,
            i.dispatchEvent({
                type: "sessionend"
            })
        }
        this.setFramebufferScaleFactor = function(V) {
            r = V,
            i.isPresenting === !0 && console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")
        }
        ,
        this.setReferenceSpaceType = function(V) {
            a = V,
            i.isPresenting === !0 && console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")
        }
        ,
        this.getReferenceSpace = function() {
            return c || o
        }
        ,
        this.setReferenceSpace = function(V) {
            c = V
        }
        ,
        this.getBaseLayer = function() {
            return h !== null ? h : d
        }
        ,
        this.getBinding = function() {
            return u
        }
        ,
        this.getFrame = function() {
            return m
        }
        ,
        this.getSession = function() {
            return n
        }
        ,
        this.setSession = async function(V) {
            if (n = V,
            n !== null) {
                if (p = e.getRenderTarget(),
                n.addEventListener("select", $),
                n.addEventListener("selectstart", $),
                n.addEventListener("selectend", $),
                n.addEventListener("squeeze", $),
                n.addEventListener("squeezestart", $),
                n.addEventListener("squeezeend", $),
                n.addEventListener("end", R),
                n.addEventListener("inputsourceschange", T),
                g.xrCompatible !== !0 && await t.makeXRCompatible(),
                n.renderState.layers === void 0 || e.capabilities.isWebGL2 === !1) {
                    const k = {
                        antialias: n.renderState.layers === void 0 ? g.antialias : !0,
                        alpha: g.alpha,
                        depth: g.depth,
                        stencil: g.stencil,
                        framebufferScaleFactor: r
                    };
                    d = new XRWebGLLayer(n,t,k),
                    n.updateRenderState({
                        baseLayer: d
                    }),
                    f = new WebGLRenderTarget(d.framebufferWidth,d.framebufferHeight,{
                        format: RGBAFormat,
                        type: UnsignedByteType,
                        encoding: e.outputEncoding,
                        stencilBuffer: g.stencil
                    })
                } else {
                    let k = null
                      , K = null
                      , ee = null;
                    g.depth && (ee = g.stencil ? 35056 : 33190,
                    k = g.stencil ? DepthStencilFormat : DepthFormat,
                    K = g.stencil ? UnsignedInt248Type : UnsignedIntType);
                    const ie = {
                        colorFormat: 32856,
                        depthFormat: ee,
                        scaleFactor: r
                    };
                    u = new XRWebGLBinding(n,t),
                    h = u.createProjectionLayer(ie),
                    n.updateRenderState({
                        layers: [h]
                    }),
                    f = new WebGLRenderTarget(h.textureWidth,h.textureHeight,{
                        format: RGBAFormat,
                        type: UnsignedByteType,
                        depthTexture: new DepthTexture(h.textureWidth,h.textureHeight,K,void 0,void 0,void 0,void 0,void 0,void 0,k),
                        stencilBuffer: g.stencil,
                        encoding: e.outputEncoding,
                        samples: g.antialias ? 4 : 0
                    });
                    const X = e.properties.get(f);
                    X.__ignoreDepthValues = h.ignoreDepthValues
                }
                f.isXRRenderTarget = !0,
                this.setFoveation(1),
                c = null,
                o = await n.requestReferenceSpace(a),
                j.setContext(n),
                j.start(),
                i.isPresenting = !0,
                i.dispatchEvent({
                    type: "sessionstart"
                })
            }
        }
        ;
        function T(V) {
            for (let k = 0; k < V.removed.length; k++) {
                const K = V.removed[k]
                  , ee = S.indexOf(K);
                ee >= 0 && (S[ee] = null,
                x[ee].disconnect(K))
            }
            for (let k = 0; k < V.added.length; k++) {
                const K = V.added[k];
                let ee = S.indexOf(K);
                if (ee === -1) {
                    for (let X = 0; X < x.length; X++)
                        if (X >= S.length) {
                            S.push(K),
                            ee = X;
                            break
                        } else if (S[X] === null) {
                            S[X] = K,
                            ee = X;
                            break
                        }
                    if (ee === -1)
                        break
                }
                const ie = x[ee];
                ie && ie.connect(K)
            }
        }
        const C = new Vector3
          , F = new Vector3;
        function U(V, k, K) {
            C.setFromMatrixPosition(k.matrixWorld),
            F.setFromMatrixPosition(K.matrixWorld);
            const ee = C.distanceTo(F)
              , ie = k.projectionMatrix.elements
              , X = K.projectionMatrix.elements
              , Te = ie[14] / (ie[10] - 1)
              , oe = ie[14] / (ie[10] + 1)
              , ge = (ie[9] + 1) / ie[5]
              , ae = (ie[9] - 1) / ie[5]
              , Le = (ie[8] - 1) / ie[0]
              , xe = (X[8] + 1) / X[0]
              , me = Te * Le
              , ze = Te * xe
              , ke = ee / (-Le + xe)
              , Ge = ke * -Le;
            k.matrixWorld.decompose(V.position, V.quaternion, V.scale),
            V.translateX(Ge),
            V.translateZ(ke),
            V.matrixWorld.compose(V.position, V.quaternion, V.scale),
            V.matrixWorldInverse.copy(V.matrixWorld).invert();
            const qe = Te + ke
              , Ue = oe + ke
              , Re = me - Ge
              , je = ze + (ee - Ge)
              , Ye = ge * oe / Ue * qe
              , E = ae * oe / Ue * qe;
            V.projectionMatrix.makePerspective(Re, je, Ye, E, qe, Ue)
        }
        function z(V, k) {
            k === null ? V.matrixWorld.copy(V.matrix) : V.matrixWorld.multiplyMatrices(k.matrixWorld, V.matrix),
            V.matrixWorldInverse.copy(V.matrixWorld).invert()
        }
        this.updateCamera = function(V) {
            if (n === null)
                return;
            _.near = A.near = y.near = V.near,
            _.far = A.far = y.far = V.far,
            (L !== _.near || D !== _.far) && (n.updateRenderState({
                depthNear: _.near,
                depthFar: _.far
            }),
            L = _.near,
            D = _.far);
            const k = V.parent
              , K = _.cameras;
            z(_, k);
            for (let ie = 0; ie < K.length; ie++)
                z(K[ie], k);
            _.matrixWorld.decompose(_.position, _.quaternion, _.scale),
            V.matrix.copy(_.matrix),
            V.matrix.decompose(V.position, V.quaternion, V.scale);
            const ee = V.children;
            for (let ie = 0, X = ee.length; ie < X; ie++)
                ee[ie].updateMatrixWorld(!0);
            K.length === 2 ? U(_, y, A) : _.projectionMatrix.copy(y.projectionMatrix)
        }
        ,
        this.getCamera = function() {
            return _
        }
        ,
        this.getFoveation = function() {
            if (h !== null)
                return h.fixedFoveation;
            if (d !== null)
                return d.fixedFoveation
        }
        ,
        this.setFoveation = function(V) {
            h !== null && (h.fixedFoveation = V),
            d !== null && d.fixedFoveation !== void 0 && (d.fixedFoveation = V)
        }
        ,
        this.getPlanes = function() {
            return v
        }
        ;
        let B = null;
        function Z(V, k) {
            if (l = k.getViewerPose(c || o),
            m = k,
            l !== null) {
                const K = l.views;
                d !== null && (e.setRenderTargetFramebuffer(f, d.framebuffer),
                e.setRenderTarget(f));
                let ee = !1;
                K.length !== _.cameras.length && (_.cameras.length = 0,
                ee = !0);
                for (let ie = 0; ie < K.length; ie++) {
                    const X = K[ie];
                    let Te = null;
                    if (d !== null)
                        Te = d.getViewport(X);
                    else {
                        const ge = u.getViewSubImage(h, X);
                        Te = ge.viewport,
                        ie === 0 && (e.setRenderTargetTextures(f, ge.colorTexture, h.ignoreDepthValues ? void 0 : ge.depthStencilTexture),
                        e.setRenderTarget(f))
                    }
                    let oe = P[ie];
                    oe === void 0 && (oe = new PerspectiveCamera,
                    oe.layers.enable(ie),
                    oe.viewport = new Vector4,
                    P[ie] = oe),
                    oe.matrix.fromArray(X.transform.matrix),
                    oe.projectionMatrix.fromArray(X.projectionMatrix),
                    oe.viewport.set(Te.x, Te.y, Te.width, Te.height),
                    ie === 0 && _.matrix.copy(oe.matrix),
                    ee === !0 && _.cameras.push(oe)
                }
            }
            for (let K = 0; K < x.length; K++) {
                const ee = S[K]
                  , ie = x[K];
                ee !== null && ie !== void 0 && ie.update(ee, k, c || o)
            }
            if (B && B(V, k),
            k.detectedPlanes) {
                i.dispatchEvent({
                    type: "planesdetected",
                    data: k.detectedPlanes
                });
                let K = null;
                for (const ee of v)
                    k.detectedPlanes.has(ee) || (K === null && (K = []),
                    K.push(ee));
                if (K !== null)
                    for (const ee of K)
                        v.delete(ee),
                        M.delete(ee),
                        i.dispatchEvent({
                            type: "planeremoved",
                            data: ee
                        });
                for (const ee of k.detectedPlanes)
                    if (!v.has(ee))
                        v.add(ee),
                        M.set(ee, k.lastChangedTime),
                        i.dispatchEvent({
                            type: "planeadded",
                            data: ee
                        });
                    else {
                        const ie = M.get(ee);
                        ee.lastChangedTime > ie && (M.set(ee, ee.lastChangedTime),
                        i.dispatchEvent({
                            type: "planechanged",
                            data: ee
                        }))
                    }
            }
            m = null
        }
        const j = new WebGLAnimation;
        j.setAnimationLoop(Z),
        this.setAnimationLoop = function(V) {
            B = V
        }
        ,
        this.dispose = function() {}
    }
}
function WebGLMaterials(s, e) {
    function t(p, f) {
        f.color.getRGB(p.fogColor.value, getUnlitUniformColorSpace(s)),
        f.isFog ? (p.fogNear.value = f.near,
        p.fogFar.value = f.far) : f.isFogExp2 && (p.fogDensity.value = f.density)
    }
    function i(p, f, x, S, v) {
        f.isMeshBasicMaterial || f.isMeshLambertMaterial ? n(p, f) : f.isMeshToonMaterial ? (n(p, f),
        u(p, f)) : f.isMeshPhongMaterial ? (n(p, f),
        l(p, f)) : f.isMeshStandardMaterial ? (n(p, f),
        h(p, f),
        f.isMeshPhysicalMaterial && d(p, f, v)) : f.isMeshMatcapMaterial ? (n(p, f),
        m(p, f)) : f.isMeshDepthMaterial ? n(p, f) : f.isMeshDistanceMaterial ? (n(p, f),
        g(p, f)) : f.isMeshNormalMaterial ? n(p, f) : f.isLineBasicMaterial ? (r(p, f),
        f.isLineDashedMaterial && o(p, f)) : f.isPointsMaterial ? a(p, f, x, S) : f.isSpriteMaterial ? c(p, f) : f.isShadowMaterial ? (p.color.value.copy(f.color),
        p.opacity.value = f.opacity) : f.isShaderMaterial && (f.uniformsNeedUpdate = !1)
    }
    function n(p, f) {
        p.opacity.value = f.opacity,
        f.color && p.diffuse.value.copy(f.color),
        f.emissive && p.emissive.value.copy(f.emissive).multiplyScalar(f.emissiveIntensity),
        f.map && (p.map.value = f.map),
        f.alphaMap && (p.alphaMap.value = f.alphaMap),
        f.bumpMap && (p.bumpMap.value = f.bumpMap,
        p.bumpScale.value = f.bumpScale,
        f.side === BackSide && (p.bumpScale.value *= -1)),
        f.displacementMap && (p.displacementMap.value = f.displacementMap,
        p.displacementScale.value = f.displacementScale,
        p.displacementBias.value = f.displacementBias),
        f.emissiveMap && (p.emissiveMap.value = f.emissiveMap),
        f.normalMap && (p.normalMap.value = f.normalMap,
        p.normalScale.value.copy(f.normalScale),
        f.side === BackSide && p.normalScale.value.negate()),
        f.specularMap && (p.specularMap.value = f.specularMap),
        f.alphaTest > 0 && (p.alphaTest.value = f.alphaTest);
        const x = e.get(f).envMap;
        if (x && (p.envMap.value = x,
        p.flipEnvMap.value = x.isCubeTexture && x.isRenderTargetTexture === !1 ? -1 : 1,
        p.reflectivity.value = f.reflectivity,
        p.ior.value = f.ior,
        p.refractionRatio.value = f.refractionRatio),
        f.lightMap) {
            p.lightMap.value = f.lightMap;
            const M = s.physicallyCorrectLights !== !0 ? Math.PI : 1;
            p.lightMapIntensity.value = f.lightMapIntensity * M
        }
        f.aoMap && (p.aoMap.value = f.aoMap,
        p.aoMapIntensity.value = f.aoMapIntensity);
        let S;
        f.map ? S = f.map : f.specularMap ? S = f.specularMap : f.displacementMap ? S = f.displacementMap : f.normalMap ? S = f.normalMap : f.bumpMap ? S = f.bumpMap : f.roughnessMap ? S = f.roughnessMap : f.metalnessMap ? S = f.metalnessMap : f.alphaMap ? S = f.alphaMap : f.emissiveMap ? S = f.emissiveMap : f.clearcoatMap ? S = f.clearcoatMap : f.clearcoatNormalMap ? S = f.clearcoatNormalMap : f.clearcoatRoughnessMap ? S = f.clearcoatRoughnessMap : f.iridescenceMap ? S = f.iridescenceMap : f.iridescenceThicknessMap ? S = f.iridescenceThicknessMap : f.specularIntensityMap ? S = f.specularIntensityMap : f.specularColorMap ? S = f.specularColorMap : f.transmissionMap ? S = f.transmissionMap : f.thicknessMap ? S = f.thicknessMap : f.sheenColorMap ? S = f.sheenColorMap : f.sheenRoughnessMap && (S = f.sheenRoughnessMap),
        S !== void 0 && (S.isWebGLRenderTarget && (S = S.texture),
        S.matrixAutoUpdate === !0 && S.updateMatrix(),
        p.uvTransform.value.copy(S.matrix));
        let v;
        f.aoMap ? v = f.aoMap : f.lightMap && (v = f.lightMap),
        v !== void 0 && (v.isWebGLRenderTarget && (v = v.texture),
        v.matrixAutoUpdate === !0 && v.updateMatrix(),
        p.uv2Transform.value.copy(v.matrix))
    }
    function r(p, f) {
        p.diffuse.value.copy(f.color),
        p.opacity.value = f.opacity
    }
    function o(p, f) {
        p.dashSize.value = f.dashSize,
        p.totalSize.value = f.dashSize + f.gapSize,
        p.scale.value = f.scale
    }
    function a(p, f, x, S) {
        p.diffuse.value.copy(f.color),
        p.opacity.value = f.opacity,
        p.size.value = f.size * x,
        p.scale.value = S * .5,
        f.map && (p.map.value = f.map),
        f.alphaMap && (p.alphaMap.value = f.alphaMap),
        f.alphaTest > 0 && (p.alphaTest.value = f.alphaTest);
        let v;
        f.map ? v = f.map : f.alphaMap && (v = f.alphaMap),
        v !== void 0 && (v.matrixAutoUpdate === !0 && v.updateMatrix(),
        p.uvTransform.value.copy(v.matrix))
    }
    function c(p, f) {
        p.diffuse.value.copy(f.color),
        p.opacity.value = f.opacity,
        p.rotation.value = f.rotation,
        f.map && (p.map.value = f.map),
        f.alphaMap && (p.alphaMap.value = f.alphaMap),
        f.alphaTest > 0 && (p.alphaTest.value = f.alphaTest);
        let x;
        f.map ? x = f.map : f.alphaMap && (x = f.alphaMap),
        x !== void 0 && (x.matrixAutoUpdate === !0 && x.updateMatrix(),
        p.uvTransform.value.copy(x.matrix))
    }
    function l(p, f) {
        p.specular.value.copy(f.specular),
        p.shininess.value = Math.max(f.shininess, 1e-4)
    }
    function u(p, f) {
        f.gradientMap && (p.gradientMap.value = f.gradientMap)
    }
    function h(p, f) {
        p.roughness.value = f.roughness,
        p.metalness.value = f.metalness,
        f.roughnessMap && (p.roughnessMap.value = f.roughnessMap),
        f.metalnessMap && (p.metalnessMap.value = f.metalnessMap),
        e.get(f).envMap && (p.envMapIntensity.value = f.envMapIntensity)
    }
    function d(p, f, x) {
        p.ior.value = f.ior,
        f.sheen > 0 && (p.sheenColor.value.copy(f.sheenColor).multiplyScalar(f.sheen),
        p.sheenRoughness.value = f.sheenRoughness,
        f.sheenColorMap && (p.sheenColorMap.value = f.sheenColorMap),
        f.sheenRoughnessMap && (p.sheenRoughnessMap.value = f.sheenRoughnessMap)),
        f.clearcoat > 0 && (p.clearcoat.value = f.clearcoat,
        p.clearcoatRoughness.value = f.clearcoatRoughness,
        f.clearcoatMap && (p.clearcoatMap.value = f.clearcoatMap),
        f.clearcoatRoughnessMap && (p.clearcoatRoughnessMap.value = f.clearcoatRoughnessMap),
        f.clearcoatNormalMap && (p.clearcoatNormalScale.value.copy(f.clearcoatNormalScale),
        p.clearcoatNormalMap.value = f.clearcoatNormalMap,
        f.side === BackSide && p.clearcoatNormalScale.value.negate())),
        f.iridescence > 0 && (p.iridescence.value = f.iridescence,
        p.iridescenceIOR.value = f.iridescenceIOR,
        p.iridescenceThicknessMinimum.value = f.iridescenceThicknessRange[0],
        p.iridescenceThicknessMaximum.value = f.iridescenceThicknessRange[1],
        f.iridescenceMap && (p.iridescenceMap.value = f.iridescenceMap),
        f.iridescenceThicknessMap && (p.iridescenceThicknessMap.value = f.iridescenceThicknessMap)),
        f.transmission > 0 && (p.transmission.value = f.transmission,
        p.transmissionSamplerMap.value = x.texture,
        p.transmissionSamplerSize.value.set(x.width, x.height),
        f.transmissionMap && (p.transmissionMap.value = f.transmissionMap),
        p.thickness.value = f.thickness,
        f.thicknessMap && (p.thicknessMap.value = f.thicknessMap),
        p.attenuationDistance.value = f.attenuationDistance,
        p.attenuationColor.value.copy(f.attenuationColor)),
        p.specularIntensity.value = f.specularIntensity,
        p.specularColor.value.copy(f.specularColor),
        f.specularIntensityMap && (p.specularIntensityMap.value = f.specularIntensityMap),
        f.specularColorMap && (p.specularColorMap.value = f.specularColorMap)
    }
    function m(p, f) {
        f.matcap && (p.matcap.value = f.matcap)
    }
    function g(p, f) {
        p.referencePosition.value.copy(f.referencePosition),
        p.nearDistance.value = f.nearDistance,
        p.farDistance.value = f.farDistance
    }
    return {
        refreshFogUniforms: t,
        refreshMaterialUniforms: i
    }
}
function WebGLUniformsGroups(s, e, t, i) {
    let n = {}
      , r = {}
      , o = [];
    const a = t.isWebGL2 ? s.getParameter(35375) : 0;
    function c(S, v) {
        const M = v.program;
        i.uniformBlockBinding(S, M)
    }
    function l(S, v) {
        let M = n[S.id];
        M === void 0 && (g(S),
        M = u(S),
        n[S.id] = M,
        S.addEventListener("dispose", f));
        const y = v.program;
        i.updateUBOMapping(S, y);
        const A = e.render.frame;
        r[S.id] !== A && (d(S),
        r[S.id] = A)
    }
    function u(S) {
        const v = h();
        S.__bindingPointIndex = v;
        const M = s.createBuffer()
          , y = S.__size
          , A = S.usage;
        return s.bindBuffer(35345, M),
        s.bufferData(35345, y, A),
        s.bindBuffer(35345, null),
        s.bindBufferBase(35345, v, M),
        M
    }
    function h() {
        for (let S = 0; S < a; S++)
            if (o.indexOf(S) === -1)
                return o.push(S),
                S;
        return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),
        0
    }
    function d(S) {
        const v = n[S.id]
          , M = S.uniforms
          , y = S.__cache;
        s.bindBuffer(35345, v);
        for (let A = 0, P = M.length; A < P; A++) {
            const _ = M[A];
            if (m(_, A, y) === !0) {
                const L = _.__offset
                  , D = Array.isArray(_.value) ? _.value : [_.value];
                let $ = 0;
                for (let R = 0; R < D.length; R++) {
                    const T = D[R]
                      , C = p(T);
                    typeof T == "number" ? (_.__data[0] = T,
                    s.bufferSubData(35345, L + $, _.__data)) : T.isMatrix3 ? (_.__data[0] = T.elements[0],
                    _.__data[1] = T.elements[1],
                    _.__data[2] = T.elements[2],
                    _.__data[3] = T.elements[0],
                    _.__data[4] = T.elements[3],
                    _.__data[5] = T.elements[4],
                    _.__data[6] = T.elements[5],
                    _.__data[7] = T.elements[0],
                    _.__data[8] = T.elements[6],
                    _.__data[9] = T.elements[7],
                    _.__data[10] = T.elements[8],
                    _.__data[11] = T.elements[0]) : (T.toArray(_.__data, $),
                    $ += C.storage / Float32Array.BYTES_PER_ELEMENT)
                }
                s.bufferSubData(35345, L, _.__data)
            }
        }
        s.bindBuffer(35345, null)
    }
    function m(S, v, M) {
        const y = S.value;
        if (M[v] === void 0) {
            if (typeof y == "number")
                M[v] = y;
            else {
                const A = Array.isArray(y) ? y : [y]
                  , P = [];
                for (let _ = 0; _ < A.length; _++)
                    P.push(A[_].clone());
                M[v] = P
            }
            return !0
        } else if (typeof y == "number") {
            if (M[v] !== y)
                return M[v] = y,
                !0
        } else {
            const A = Array.isArray(M[v]) ? M[v] : [M[v]]
              , P = Array.isArray(y) ? y : [y];
            for (let _ = 0; _ < A.length; _++) {
                const L = A[_];
                if (L.equals(P[_]) === !1)
                    return L.copy(P[_]),
                    !0
            }
        }
        return !1
    }
    function g(S) {
        const v = S.uniforms;
        let M = 0;
        const y = 16;
        let A = 0;
        for (let P = 0, _ = v.length; P < _; P++) {
            const L = v[P]
              , D = {
                boundary: 0,
                storage: 0
            }
              , $ = Array.isArray(L.value) ? L.value : [L.value];
            for (let R = 0, T = $.length; R < T; R++) {
                const C = $[R]
                  , F = p(C);
                D.boundary += F.boundary,
                D.storage += F.storage
            }
            if (L.__data = new Float32Array(D.storage / Float32Array.BYTES_PER_ELEMENT),
            L.__offset = M,
            P > 0) {
                A = M % y;
                const R = y - A;
                A !== 0 && R - D.boundary < 0 && (M += y - A,
                L.__offset = M)
            }
            M += D.storage
        }
        return A = M % y,
        A > 0 && (M += y - A),
        S.__size = M,
        S.__cache = {},
        this
    }
    function p(S) {
        const v = {
            boundary: 0,
            storage: 0
        };
        return typeof S == "number" ? (v.boundary = 4,
        v.storage = 4) : S.isVector2 ? (v.boundary = 8,
        v.storage = 8) : S.isVector3 || S.isColor ? (v.boundary = 16,
        v.storage = 12) : S.isVector4 ? (v.boundary = 16,
        v.storage = 16) : S.isMatrix3 ? (v.boundary = 48,
        v.storage = 48) : S.isMatrix4 ? (v.boundary = 64,
        v.storage = 64) : S.isTexture ? console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group.") : console.warn("THREE.WebGLRenderer: Unsupported uniform value type.", S),
        v
    }
    function f(S) {
        const v = S.target;
        v.removeEventListener("dispose", f);
        const M = o.indexOf(v.__bindingPointIndex);
        o.splice(M, 1),
        s.deleteBuffer(n[v.id]),
        delete n[v.id],
        delete r[v.id]
    }
    function x() {
        for (const S in n)
            s.deleteBuffer(n[S]);
        o = [],
        n = {},
        r = {}
    }
    return {
        bind: c,
        update: l,
        dispose: x
    }
}
function createCanvasElement() {
    const s = createElementNS("canvas");
    return s.style.display = "block",
    s
}
function WebGLRenderer(s={}) {
    this.isWebGLRenderer = !0;
    const e = s.canvas !== void 0 ? s.canvas : createCanvasElement()
      , t = s.context !== void 0 ? s.context : null
      , i = s.depth !== void 0 ? s.depth : !0
      , n = s.stencil !== void 0 ? s.stencil : !0
      , r = s.antialias !== void 0 ? s.antialias : !1
      , o = s.premultipliedAlpha !== void 0 ? s.premultipliedAlpha : !0
      , a = s.preserveDrawingBuffer !== void 0 ? s.preserveDrawingBuffer : !1
      , c = s.powerPreference !== void 0 ? s.powerPreference : "default"
      , l = s.failIfMajorPerformanceCaveat !== void 0 ? s.failIfMajorPerformanceCaveat : !1;
    let u;
    t !== null ? u = t.getContextAttributes().alpha : u = s.alpha !== void 0 ? s.alpha : !1;
    let h = null
      , d = null;
    const m = []
      , g = [];
    this.domElement = e,
    this.debug = {
        checkShaderErrors: !0
    },
    this.autoClear = !0,
    this.autoClearColor = !0,
    this.autoClearDepth = !0,
    this.autoClearStencil = !0,
    this.sortObjects = !0,
    this.clippingPlanes = [],
    this.localClippingEnabled = !1,
    this.outputEncoding = LinearEncoding,
    this.physicallyCorrectLights = !1,
    this.toneMapping = NoToneMapping,
    this.toneMappingExposure = 1;
    const p = this;
    let f = !1
      , x = 0
      , S = 0
      , v = null
      , M = -1
      , y = null;
    const A = new Vector4
      , P = new Vector4;
    let _ = null
      , L = e.width
      , D = e.height
      , $ = 1
      , R = null
      , T = null;
    const C = new Vector4(0,0,L,D)
      , F = new Vector4(0,0,L,D);
    let U = !1;
    const z = new Frustum;
    let B = !1
      , Z = !1
      , j = null;
    const V = new Matrix4
      , k = new Vector2
      , K = new Vector3
      , ee = {
        background: null,
        fog: null,
        environment: null,
        overrideMaterial: null,
        isScene: !0
    };
    function ie() {
        return v === null ? $ : 1
    }
    let X = t;
    function Te(w, N) {
        for (let H = 0; H < w.length; H++) {
            const O = w[H]
              , q = e.getContext(O, N);
            if (q !== null)
                return q
        }
        return null
    }
    try {
        const w = {
            alpha: !0,
            depth: i,
            stencil: n,
            antialias: r,
            premultipliedAlpha: o,
            preserveDrawingBuffer: a,
            powerPreference: c,
            failIfMajorPerformanceCaveat: l
        };
        if ("setAttribute"in e && e.setAttribute("data-engine", `three.js r${REVISION}`),
        e.addEventListener("webglcontextlost", fe, !1),
        e.addEventListener("webglcontextrestored", ue, !1),
        e.addEventListener("webglcontextcreationerror", Ee, !1),
        X === null) {
            const N = ["webgl2", "webgl", "experimental-webgl"];
            if (p.isWebGL1Renderer === !0 && N.shift(),
            X = Te(N, w),
            X === null)
                throw Te(N) ? new Error("Error creating WebGL context with your selected attributes.") : new Error("Error creating WebGL context.")
        }
        X.getShaderPrecisionFormat === void 0 && (X.getShaderPrecisionFormat = function() {
            return {
                rangeMin: 1,
                rangeMax: 1,
                precision: 1
            }
        }
        )
    } catch (w) {
        throw console.error("THREE.WebGLRenderer: " + w.message),
        w
    }
    let oe, ge, ae, Le, xe, me, ze, ke, Ge, qe, Ue, Re, je, Ye, E, b, W, Q, te, ne, _e, re, Y, de;
    function pe() {
        oe = new WebGLExtensions(X),
        ge = new WebGLCapabilities(X,oe,s),
        oe.init(ge),
        re = new WebGLUtils(X,oe,ge),
        ae = new WebGLState(X,oe,ge),
        Le = new WebGLInfo,
        xe = new WebGLProperties,
        me = new WebGLTextures(X,oe,ae,xe,ge,re,Le),
        ze = new WebGLCubeMaps(p),
        ke = new WebGLCubeUVMaps(p),
        Ge = new WebGLAttributes(X,ge),
        Y = new WebGLBindingStates(X,oe,Ge,ge),
        qe = new WebGLGeometries(X,Ge,Le,Y),
        Ue = new WebGLObjects(X,qe,Ge,Le),
        te = new WebGLMorphtargets(X,ge,me),
        b = new WebGLClipping(xe),
        Re = new WebGLPrograms(p,ze,ke,oe,ge,Y,b),
        je = new WebGLMaterials(p,xe),
        Ye = new WebGLRenderLists,
        E = new WebGLRenderStates(oe,ge),
        Q = new WebGLBackground(p,ze,ke,ae,Ue,u,o),
        W = new WebGLShadowMap(p,Ue,ge),
        de = new WebGLUniformsGroups(X,Le,ge,ae),
        ne = new WebGLBufferRenderer(X,oe,Le,ge),
        _e = new WebGLIndexedBufferRenderer(X,oe,Le,ge),
        Le.programs = Re.programs,
        p.capabilities = ge,
        p.extensions = oe,
        p.properties = xe,
        p.renderLists = Ye,
        p.shadowMap = W,
        p.state = ae,
        p.info = Le
    }
    pe();
    const le = new WebXRManager(p,X);
    this.xr = le,
    this.getContext = function() {
        return X
    }
    ,
    this.getContextAttributes = function() {
        return X.getContextAttributes()
    }
    ,
    this.forceContextLoss = function() {
        const w = oe.get("WEBGL_lose_context");
        w && w.loseContext()
    }
    ,
    this.forceContextRestore = function() {
        const w = oe.get("WEBGL_lose_context");
        w && w.restoreContext()
    }
    ,
    this.getPixelRatio = function() {
        return $
    }
    ,
    this.setPixelRatio = function(w) {
        w !== void 0 && ($ = w,
        this.setSize(L, D, !1))
    }
    ,
    this.getSize = function(w) {
        return w.set(L, D)
    }
    ,
    this.setSize = function(w, N, H) {
        if (le.isPresenting) {
            console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");
            return
        }
        L = w,
        D = N,
        e.width = Math.floor(w * $),
        e.height = Math.floor(N * $),
        H !== !1 && (e.style.width = w + "px",
        e.style.height = N + "px"),
        this.setViewport(0, 0, w, N)
    }
    ,
    this.getDrawingBufferSize = function(w) {
        return w.set(L * $, D * $).floor()
    }
    ,
    this.setDrawingBufferSize = function(w, N, H) {
        L = w,
        D = N,
        $ = H,
        e.width = Math.floor(w * H),
        e.height = Math.floor(N * H),
        this.setViewport(0, 0, w, N)
    }
    ,
    this.getCurrentViewport = function(w) {
        return w.copy(A)
    }
    ,
    this.getViewport = function(w) {
        return w.copy(C)
    }
    ,
    this.setViewport = function(w, N, H, O) {
        w.isVector4 ? C.set(w.x, w.y, w.z, w.w) : C.set(w, N, H, O),
        ae.viewport(A.copy(C).multiplyScalar($).floor())
    }
    ,
    this.getScissor = function(w) {
        return w.copy(F)
    }
    ,
    this.setScissor = function(w, N, H, O) {
        w.isVector4 ? F.set(w.x, w.y, w.z, w.w) : F.set(w, N, H, O),
        ae.scissor(P.copy(F).multiplyScalar($).floor())
    }
    ,
    this.getScissorTest = function() {
        return U
    }
    ,
    this.setScissorTest = function(w) {
        ae.setScissorTest(U = w)
    }
    ,
    this.setOpaqueSort = function(w) {
        R = w
    }
    ,
    this.setTransparentSort = function(w) {
        T = w
    }
    ,
    this.getClearColor = function(w) {
        return w.copy(Q.getClearColor())
    }
    ,
    this.setClearColor = function() {
        Q.setClearColor.apply(Q, arguments)
    }
    ,
    this.getClearAlpha = function() {
        return Q.getClearAlpha()
    }
    ,
    this.setClearAlpha = function() {
        Q.setClearAlpha.apply(Q, arguments)
    }
    ,
    this.clear = function(w=!0, N=!0, H=!0) {
        let O = 0;
        w && (O |= 16384),
        N && (O |= 256),
        H && (O |= 1024),
        X.clear(O)
    }
    ,
    this.clearColor = function() {
        this.clear(!0, !1, !1)
    }
    ,
    this.clearDepth = function() {
        this.clear(!1, !0, !1)
    }
    ,
    this.clearStencil = function() {
        this.clear(!1, !1, !0)
    }
    ,
    this.dispose = function() {
        e.removeEventListener("webglcontextlost", fe, !1),
        e.removeEventListener("webglcontextrestored", ue, !1),
        e.removeEventListener("webglcontextcreationerror", Ee, !1),
        Ye.dispose(),
        E.dispose(),
        xe.dispose(),
        ze.dispose(),
        ke.dispose(),
        Ue.dispose(),
        Y.dispose(),
        de.dispose(),
        Re.dispose(),
        le.dispose(),
        le.removeEventListener("sessionstart", se),
        le.removeEventListener("sessionend", ce),
        j && (j.dispose(),
        j = null),
        Ae.stop()
    }
    ;
    function fe(w) {
        w.preventDefault(),
        console.log("THREE.WebGLRenderer: Context Lost."),
        f = !0
    }
    function ue() {
        console.log("THREE.WebGLRenderer: Context Restored."),
        f = !1;
        const w = Le.autoReset
          , N = W.enabled
          , H = W.autoUpdate
          , O = W.needsUpdate
          , q = W.type;
        pe(),
        Le.autoReset = w,
        W.enabled = N,
        W.autoUpdate = H,
        W.needsUpdate = O,
        W.type = q
    }
    function Ee(w) {
        console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ", w.statusMessage)
    }
    function Pe(w) {
        const N = w.target;
        N.removeEventListener("dispose", Pe),
        Oe(N)
    }
    function Oe(w) {
        I(w),
        xe.remove(w)
    }
    function I(w) {
        const N = xe.get(w).programs;
        N !== void 0 && (N.forEach(function(H) {
            Re.releaseProgram(H)
        }),
        w.isShaderMaterial && Re.releaseShaderCache(w))
    }
    this.renderBufferDirect = function(w, N, H, O, q, he) {
        N === null && (N = ee);
        const ve = q.isMesh && q.matrixWorld.determinant() < 0
          , ye = ut(w, N, H, O, q);
        ae.setMaterial(O, ve);
        let Se = H.index
          , Ce = 1;
        O.wireframe === !0 && (Se = qe.getWireframeAttribute(H),
        Ce = 2);
        const be = H.drawRange
          , Me = H.attributes.position;
        let De = be.start * Ce
          , We = (be.start + be.count) * Ce;
        he !== null && (De = Math.max(De, he.start * Ce),
        We = Math.min(We, (he.start + he.count) * Ce)),
        Se !== null ? (De = Math.max(De, 0),
        We = Math.min(We, Se.count)) : Me != null && (De = Math.max(De, 0),
        We = Math.min(We, Me.count));
        const Ke = We - De;
        if (Ke < 0 || Ke === 1 / 0)
            return;
        Y.setup(q, O, ye, H, Se);
        let Qe, Fe = ne;
        if (Se !== null && (Qe = Ge.get(Se),
        Fe = _e,
        Fe.setIndex(Qe)),
        q.isMesh)
            O.wireframe === !0 ? (ae.setLineWidth(O.wireframeLinewidth * ie()),
            Fe.setMode(1)) : Fe.setMode(4);
        else if (q.isLine) {
            let we = O.linewidth;
            we === void 0 && (we = 1),
            ae.setLineWidth(we * ie()),
            q.isLineSegments ? Fe.setMode(1) : q.isLineLoop ? Fe.setMode(2) : Fe.setMode(3)
        } else
            q.isPoints ? Fe.setMode(0) : q.isSprite && Fe.setMode(4);
        if (q.isInstancedMesh)
            Fe.renderInstances(De, Ke, q.count);
        else if (H.isInstancedBufferGeometry) {
            const we = H._maxInstanceCount !== void 0 ? H._maxInstanceCount : 1 / 0
              , nt = Math.min(H.instanceCount, we);
            Fe.renderInstances(De, Ke, nt)
        } else
            Fe.render(De, Ke)
    }
    ,
    this.compile = function(w, N) {
        function H(O, q, he) {
            O.transparent === !0 && O.side === TwoPassDoubleSide ? (O.side = BackSide,
            O.needsUpdate = !0,
            Xe(O, q, he),
            O.side = FrontSide,
            O.needsUpdate = !0,
            Xe(O, q, he),
            O.side = TwoPassDoubleSide) : Xe(O, q, he)
        }
        d = E.get(w),
        d.init(),
        g.push(d),
        w.traverseVisible(function(O) {
            O.isLight && O.layers.test(N.layers) && (d.pushLight(O),
            O.castShadow && d.pushShadow(O))
        }),
        d.setupLights(p.physicallyCorrectLights),
        w.traverse(function(O) {
            const q = O.material;
            if (q)
                if (Array.isArray(q))
                    for (let he = 0; he < q.length; he++) {
                        const ve = q[he];
                        H(ve, w, O)
                    }
                else
                    H(q, w, O)
        }),
        g.pop(),
        d = null
    }
    ;
    let G = null;
    function J(w) {
        G && G(w)
    }
    function se() {
        Ae.stop()
    }
    function ce() {
        Ae.start()
    }
    const Ae = new WebGLAnimation;
    Ae.setAnimationLoop(J),
    typeof self < "u" && Ae.setContext(self),
    this.setAnimationLoop = function(w) {
        G = w,
        le.setAnimationLoop(w),
        w === null ? Ae.stop() : Ae.start()
    }
    ,
    le.addEventListener("sessionstart", se),
    le.addEventListener("sessionend", ce),
    this.render = function(w, N) {
        if (N !== void 0 && N.isCamera !== !0) {
            console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");
            return
        }
        if (f === !0)
            return;
        w.matrixWorldAutoUpdate === !0 && w.updateMatrixWorld(),
        N.parent === null && N.matrixWorldAutoUpdate === !0 && N.updateMatrixWorld(),
        le.enabled === !0 && le.isPresenting === !0 && (le.cameraAutoUpdate === !0 && le.updateCamera(N),
        N = le.getCamera()),
        w.isScene === !0 && w.onBeforeRender(p, w, N, v),
        d = E.get(w, g.length),
        d.init(),
        g.push(d),
        V.multiplyMatrices(N.projectionMatrix, N.matrixWorldInverse),
        z.setFromProjectionMatrix(V),
        Z = this.localClippingEnabled,
        B = b.init(this.clippingPlanes, Z, N),
        h = Ye.get(w, m.length),
        h.init(),
        m.push(h),
        Ne(w, N, 0, p.sortObjects),
        h.finish(),
        p.sortObjects === !0 && h.sort(R, T),
        B === !0 && b.beginShadows();
        const H = d.state.shadowsArray;
        if (W.render(H, w, N),
        B === !0 && b.endShadows(),
        this.info.autoReset === !0 && this.info.reset(),
        Q.render(h, w),
        d.setupLights(p.physicallyCorrectLights),
        N.isArrayCamera) {
            const O = N.cameras;
            for (let q = 0, he = O.length; q < he; q++) {
                const ve = O[q];
                Ve(h, w, ve, ve.viewport)
            }
        } else
            Ve(h, w, N);
        v !== null && (me.updateMultisampleRenderTarget(v),
        me.updateRenderTargetMipmap(v)),
        w.isScene === !0 && w.onAfterRender(p, w, N),
        Y.resetDefaultState(),
        M = -1,
        y = null,
        g.pop(),
        g.length > 0 ? d = g[g.length - 1] : d = null,
        m.pop(),
        m.length > 0 ? h = m[m.length - 1] : h = null
    }
    ;
    function Ne(w, N, H, O) {
        if (w.visible === !1)
            return;
        if (w.layers.test(N.layers)) {
            if (w.isGroup)
                H = w.renderOrder;
            else if (w.isLOD)
                w.autoUpdate === !0 && w.update(N);
            else if (w.isLight)
                d.pushLight(w),
                w.castShadow && d.pushShadow(w);
            else if (w.isSprite) {
                if (!w.frustumCulled || z.intersectsSprite(w)) {
                    O && K.setFromMatrixPosition(w.matrixWorld).applyMatrix4(V);
                    const ve = Ue.update(w)
                      , ye = w.material;
                    ye.visible && h.push(w, ve, ye, H, K.z, null)
                }
            } else if ((w.isMesh || w.isLine || w.isPoints) && (w.isSkinnedMesh && w.skeleton.frame !== Le.render.frame && (w.skeleton.update(),
            w.skeleton.frame = Le.render.frame),
            !w.frustumCulled || z.intersectsObject(w))) {
                O && K.setFromMatrixPosition(w.matrixWorld).applyMatrix4(V);
                const ve = Ue.update(w)
                  , ye = w.material;
                if (Array.isArray(ye)) {
                    const Se = ve.groups;
                    for (let Ce = 0, be = Se.length; Ce < be; Ce++) {
                        const Me = Se[Ce]
                          , De = ye[Me.materialIndex];
                        De && De.visible && h.push(w, ve, De, H, K.z, Me)
                    }
                } else
                    ye.visible && h.push(w, ve, ye, H, K.z, null)
            }
        }
        const he = w.children;
        for (let ve = 0, ye = he.length; ve < ye; ve++)
            Ne(he[ve], N, H, O)
    }
    function Ve(w, N, H, O) {
        const q = w.opaque
          , he = w.transmissive
          , ve = w.transparent;
        d.setupLightsView(H),
        he.length > 0 && Je(q, N, H),
        O && ae.viewport(A.copy(O)),
        q.length > 0 && Ie(q, N, H),
        he.length > 0 && Ie(he, N, H),
        ve.length > 0 && Ie(ve, N, H),
        ae.buffers.depth.setTest(!0),
        ae.buffers.depth.setMask(!0),
        ae.buffers.color.setMask(!0),
        ae.setPolygonOffset(!1)
    }
    function Je(w, N, H) {
        const O = ge.isWebGL2;
        j === null && (j = new WebGLRenderTarget(1,1,{
            generateMipmaps: !0,
            type: oe.has("EXT_color_buffer_half_float") ? HalfFloatType : UnsignedByteType,
            minFilter: LinearMipmapLinearFilter,
            samples: O && r === !0 ? 4 : 0
        })),
        p.getDrawingBufferSize(k),
        O ? j.setSize(k.x, k.y) : j.setSize(floorPowerOfTwo(k.x), floorPowerOfTwo(k.y));
        const q = p.getRenderTarget();
        p.setRenderTarget(j),
        p.clear();
        const he = p.toneMapping;
        p.toneMapping = NoToneMapping,
        Ie(w, N, H),
        p.toneMapping = he,
        me.updateMultisampleRenderTarget(j),
        me.updateRenderTargetMipmap(j),
        p.setRenderTarget(q)
    }
    function Ie(w, N, H) {
        const O = N.isScene === !0 ? N.overrideMaterial : null;
        for (let q = 0, he = w.length; q < he; q++) {
            const ve = w[q]
              , ye = ve.object
              , Se = ve.geometry
              , Ce = O === null ? ve.material : O
              , be = ve.group;
            ye.layers.test(H.layers) && Ze(ye, N, H, Se, Ce, be)
        }
    }
    function Ze(w, N, H, O, q, he) {
        w.onBeforeRender(p, N, H, O, q, he),
        w.modelViewMatrix.multiplyMatrices(H.matrixWorldInverse, w.matrixWorld),
        w.normalMatrix.getNormalMatrix(w.modelViewMatrix),
        q.onBeforeRender(p, N, H, O, w, he),
        q.transparent === !0 && q.side === TwoPassDoubleSide ? (q.side = BackSide,
        q.needsUpdate = !0,
        p.renderBufferDirect(H, N, O, q, w, he),
        q.side = FrontSide,
        q.needsUpdate = !0,
        p.renderBufferDirect(H, N, O, q, w, he),
        q.side = TwoPassDoubleSide) : p.renderBufferDirect(H, N, O, q, w, he),
        w.onAfterRender(p, N, H, O, q, he)
    }
    function Xe(w, N, H) {
        N.isScene !== !0 && (N = ee);
        const O = xe.get(w)
          , q = d.state.lights
          , he = d.state.shadowsArray
          , ve = q.state.version
          , ye = Re.getParameters(w, q.state, he, N, H)
          , Se = Re.getProgramCacheKey(ye);
        let Ce = O.programs;
        O.environment = w.isMeshStandardMaterial ? N.environment : null,
        O.fog = N.fog,
        O.envMap = (w.isMeshStandardMaterial ? ke : ze).get(w.envMap || O.environment),
        Ce === void 0 && (w.addEventListener("dispose", Pe),
        Ce = new Map,
        O.programs = Ce);
        let be = Ce.get(Se);
        if (be !== void 0) {
            if (O.currentProgram === be && O.lightsStateVersion === ve)
                return ot(w, ye),
                be
        } else
            ye.uniforms = Re.getUniforms(w),
            w.onBuild(H, ye, p),
            w.onBeforeCompile(ye, p),
            be = Re.acquireProgram(ye, Se),
            Ce.set(Se, be),
            O.uniforms = ye.uniforms;
        const Me = O.uniforms;
        (!w.isShaderMaterial && !w.isRawShaderMaterial || w.clipping === !0) && (Me.clippingPlanes = b.uniform),
        ot(w, ye),
        O.needsLights = dt(w),
        O.lightsStateVersion = ve,
        O.needsLights && (Me.ambientLightColor.value = q.state.ambient,
        Me.lightProbe.value = q.state.probe,
        Me.directionalLights.value = q.state.directional,
        Me.directionalLightShadows.value = q.state.directionalShadow,
        Me.spotLights.value = q.state.spot,
        Me.spotLightShadows.value = q.state.spotShadow,
        Me.rectAreaLights.value = q.state.rectArea,
        Me.ltc_1.value = q.state.rectAreaLTC1,
        Me.ltc_2.value = q.state.rectAreaLTC2,
        Me.pointLights.value = q.state.point,
        Me.pointLightShadows.value = q.state.pointShadow,
        Me.hemisphereLights.value = q.state.hemi,
        Me.directionalShadowMap.value = q.state.directionalShadowMap,
        Me.directionalShadowMatrix.value = q.state.directionalShadowMatrix,
        Me.spotShadowMap.value = q.state.spotShadowMap,
        Me.spotLightMatrix.value = q.state.spotLightMatrix,
        Me.spotLightMap.value = q.state.spotLightMap,
        Me.pointShadowMap.value = q.state.pointShadowMap,
        Me.pointShadowMatrix.value = q.state.pointShadowMatrix);
        const De = be.getUniforms()
          , We = WebGLUniforms.seqWithValue(De.seq, Me);
        return O.currentProgram = be,
        O.uniformsList = We,
        be
    }
    function ot(w, N) {
        const H = xe.get(w);
        H.outputEncoding = N.outputEncoding,
        H.instancing = N.instancing,
        H.skinning = N.skinning,
        H.morphTargets = N.morphTargets,
        H.morphNormals = N.morphNormals,
        H.morphColors = N.morphColors,
        H.morphTargetsCount = N.morphTargetsCount,
        H.numClippingPlanes = N.numClippingPlanes,
        H.numIntersection = N.numClipIntersection,
        H.vertexAlphas = N.vertexAlphas,
        H.vertexTangents = N.vertexTangents,
        H.toneMapping = N.toneMapping
    }
    function ut(w, N, H, O, q) {
        N.isScene !== !0 && (N = ee),
        me.resetTextureUnits();
        const he = N.fog
          , ve = O.isMeshStandardMaterial ? N.environment : null
          , ye = v === null ? p.outputEncoding : v.isXRRenderTarget === !0 ? v.texture.encoding : LinearEncoding
          , Se = (O.isMeshStandardMaterial ? ke : ze).get(O.envMap || ve)
          , Ce = O.vertexColors === !0 && !!H.attributes.color && H.attributes.color.itemSize === 4
          , be = !!O.normalMap && !!H.attributes.tangent
          , Me = !!H.morphAttributes.position
          , De = !!H.morphAttributes.normal
          , We = !!H.morphAttributes.color
          , Ke = O.toneMapped ? p.toneMapping : NoToneMapping
          , Qe = H.morphAttributes.position || H.morphAttributes.normal || H.morphAttributes.color
          , Fe = Qe !== void 0 ? Qe.length : 0
          , we = xe.get(O)
          , nt = d.state.lights;
        if (B === !0 && (Z === !0 || w !== y)) {
            const $e = w === y && O.id === M;
            b.setState(O, w, $e)
        }
        let Be = !1;
        O.version === we.__version ? (we.needsLights && we.lightsStateVersion !== nt.state.version || we.outputEncoding !== ye || q.isInstancedMesh && we.instancing === !1 || !q.isInstancedMesh && we.instancing === !0 || q.isSkinnedMesh && we.skinning === !1 || !q.isSkinnedMesh && we.skinning === !0 || we.envMap !== Se || O.fog === !0 && we.fog !== he || we.numClippingPlanes !== void 0 && (we.numClippingPlanes !== b.numPlanes || we.numIntersection !== b.numIntersection) || we.vertexAlphas !== Ce || we.vertexTangents !== be || we.morphTargets !== Me || we.morphNormals !== De || we.morphColors !== We || we.toneMapping !== Ke || ge.isWebGL2 === !0 && we.morphTargetsCount !== Fe) && (Be = !0) : (Be = !0,
        we.__version = O.version);
        let et = we.currentProgram;
        Be === !0 && (et = Xe(O, N, q));
        let lt = !1
          , it = !1
          , rt = !1;
        const He = et.getUniforms()
          , tt = we.uniforms;
        if (ae.useProgram(et.program) && (lt = !0,
        it = !0,
        rt = !0),
        O.id !== M && (M = O.id,
        it = !0),
        lt || y !== w) {
            if (He.setValue(X, "projectionMatrix", w.projectionMatrix),
            ge.logarithmicDepthBuffer && He.setValue(X, "logDepthBufFC", 2 / (Math.log(w.far + 1) / Math.LN2)),
            y !== w && (y = w,
            it = !0,
            rt = !0),
            O.isShaderMaterial || O.isMeshPhongMaterial || O.isMeshToonMaterial || O.isMeshStandardMaterial || O.envMap) {
                const $e = He.map.cameraPosition;
                $e !== void 0 && $e.setValue(X, K.setFromMatrixPosition(w.matrixWorld))
            }
            (O.isMeshPhongMaterial || O.isMeshToonMaterial || O.isMeshLambertMaterial || O.isMeshBasicMaterial || O.isMeshStandardMaterial || O.isShaderMaterial) && He.setValue(X, "isOrthographic", w.isOrthographicCamera === !0),
            (O.isMeshPhongMaterial || O.isMeshToonMaterial || O.isMeshLambertMaterial || O.isMeshBasicMaterial || O.isMeshStandardMaterial || O.isShaderMaterial || O.isShadowMaterial || q.isSkinnedMesh) && He.setValue(X, "viewMatrix", w.matrixWorldInverse)
        }
        if (q.isSkinnedMesh) {
            He.setOptional(X, q, "bindMatrix"),
            He.setOptional(X, q, "bindMatrixInverse");
            const $e = q.skeleton;
            $e && (ge.floatVertexTextures ? ($e.boneTexture === null && $e.computeBoneTexture(),
            He.setValue(X, "boneTexture", $e.boneTexture, me),
            He.setValue(X, "boneTextureSize", $e.boneTextureSize)) : console.warn("THREE.WebGLRenderer: SkinnedMesh can only be used with WebGL 2. With WebGL 1 OES_texture_float and vertex textures support is required."))
        }
        const st = H.morphAttributes;
        if ((st.position !== void 0 || st.normal !== void 0 || st.color !== void 0 && ge.isWebGL2 === !0) && te.update(q, H, O, et),
        (it || we.receiveShadow !== q.receiveShadow) && (we.receiveShadow = q.receiveShadow,
        He.setValue(X, "receiveShadow", q.receiveShadow)),
        O.isMeshGouraudMaterial && O.envMap !== null && (tt.envMap.value = Se,
        tt.flipEnvMap.value = Se.isCubeTexture && Se.isRenderTargetTexture === !1 ? -1 : 1),
        it && (He.setValue(X, "toneMappingExposure", p.toneMappingExposure),
        we.needsLights && ht(tt, rt),
        he && O.fog === !0 && je.refreshFogUniforms(tt, he),
        je.refreshMaterialUniforms(tt, O, $, D, j),
        WebGLUniforms.upload(X, we.uniformsList, tt, me)),
        O.isShaderMaterial && O.uniformsNeedUpdate === !0 && (WebGLUniforms.upload(X, we.uniformsList, tt, me),
        O.uniformsNeedUpdate = !1),
        O.isSpriteMaterial && He.setValue(X, "center", q.center),
        He.setValue(X, "modelViewMatrix", q.modelViewMatrix),
        He.setValue(X, "normalMatrix", q.normalMatrix),
        He.setValue(X, "modelMatrix", q.matrixWorld),
        O.isShaderMaterial || O.isRawShaderMaterial) {
            const $e = O.uniformsGroups;
            for (let at = 0, ft = $e.length; at < ft; at++)
                if (ge.isWebGL2) {
                    const ct = $e[at];
                    de.update(ct, et),
                    de.bind(ct, et)
                } else
                    console.warn("THREE.WebGLRenderer: Uniform Buffer Objects can only be used with WebGL 2.")
        }
        return et
    }
    function ht(w, N) {
        w.ambientLightColor.needsUpdate = N,
        w.lightProbe.needsUpdate = N,
        w.directionalLights.needsUpdate = N,
        w.directionalLightShadows.needsUpdate = N,
        w.pointLights.needsUpdate = N,
        w.pointLightShadows.needsUpdate = N,
        w.spotLights.needsUpdate = N,
        w.spotLightShadows.needsUpdate = N,
        w.rectAreaLights.needsUpdate = N,
        w.hemisphereLights.needsUpdate = N
    }
    function dt(w) {
        return w.isMeshLambertMaterial || w.isMeshToonMaterial || w.isMeshPhongMaterial || w.isMeshStandardMaterial || w.isShadowMaterial || w.isShaderMaterial && w.lights === !0
    }
    this.getActiveCubeFace = function() {
        return x
    }
    ,
    this.getActiveMipmapLevel = function() {
        return S
    }
    ,
    this.getRenderTarget = function() {
        return v
    }
    ,
    this.setRenderTargetTextures = function(w, N, H) {
        xe.get(w.texture).__webglTexture = N,
        xe.get(w.depthTexture).__webglTexture = H;
        const O = xe.get(w);
        O.__hasExternalTextures = !0,
        O.__hasExternalTextures && (O.__autoAllocateDepthBuffer = H === void 0,
        O.__autoAllocateDepthBuffer || oe.has("WEBGL_multisampled_render_to_texture") === !0 && (console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),
        O.__useRenderToTexture = !1))
    }
    ,
    this.setRenderTargetFramebuffer = function(w, N) {
        const H = xe.get(w);
        H.__webglFramebuffer = N,
        H.__useDefaultFramebuffer = N === void 0
    }
    ,
    this.setRenderTarget = function(w, N=0, H=0) {
        v = w,
        x = N,
        S = H;
        let O = !0
          , q = null
          , he = !1
          , ve = !1;
        if (w) {
            const Se = xe.get(w);
            Se.__useDefaultFramebuffer !== void 0 ? (ae.bindFramebuffer(36160, null),
            O = !1) : Se.__webglFramebuffer === void 0 ? me.setupRenderTarget(w) : Se.__hasExternalTextures && me.rebindTextures(w, xe.get(w.texture).__webglTexture, xe.get(w.depthTexture).__webglTexture);
            const Ce = w.texture;
            (Ce.isData3DTexture || Ce.isDataArrayTexture || Ce.isCompressedArrayTexture) && (ve = !0);
            const be = xe.get(w).__webglFramebuffer;
            w.isWebGLCubeRenderTarget ? (q = be[N],
            he = !0) : ge.isWebGL2 && w.samples > 0 && me.useMultisampledRTT(w) === !1 ? q = xe.get(w).__webglMultisampledFramebuffer : q = be,
            A.copy(w.viewport),
            P.copy(w.scissor),
            _ = w.scissorTest
        } else
            A.copy(C).multiplyScalar($).floor(),
            P.copy(F).multiplyScalar($).floor(),
            _ = U;
        if (ae.bindFramebuffer(36160, q) && ge.drawBuffers && O && ae.drawBuffers(w, q),
        ae.viewport(A),
        ae.scissor(P),
        ae.setScissorTest(_),
        he) {
            const Se = xe.get(w.texture);
            X.framebufferTexture2D(36160, 36064, 34069 + N, Se.__webglTexture, H)
        } else if (ve) {
            const Se = xe.get(w.texture)
              , Ce = N || 0;
            X.framebufferTextureLayer(36160, 36064, Se.__webglTexture, H || 0, Ce)
        }
        M = -1
    }
    ,
    this.readRenderTargetPixels = function(w, N, H, O, q, he, ve) {
        if (!(w && w.isWebGLRenderTarget)) {
            console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");
            return
        }
        let ye = xe.get(w).__webglFramebuffer;
        if (w.isWebGLCubeRenderTarget && ve !== void 0 && (ye = ye[ve]),
        ye) {
            ae.bindFramebuffer(36160, ye);
            try {
                const Se = w.texture
                  , Ce = Se.format
                  , be = Se.type;
                if (Ce !== RGBAFormat && re.convert(Ce) !== X.getParameter(35739)) {
                    console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");
                    return
                }
                const Me = be === HalfFloatType && (oe.has("EXT_color_buffer_half_float") || ge.isWebGL2 && oe.has("EXT_color_buffer_float"));
                if (be !== UnsignedByteType && re.convert(be) !== X.getParameter(35738) && !(be === FloatType && (ge.isWebGL2 || oe.has("OES_texture_float") || oe.has("WEBGL_color_buffer_float"))) && !Me) {
                    console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");
                    return
                }
                N >= 0 && N <= w.width - O && H >= 0 && H <= w.height - q && X.readPixels(N, H, O, q, re.convert(Ce), re.convert(be), he)
            } finally {
                const Se = v !== null ? xe.get(v).__webglFramebuffer : null;
                ae.bindFramebuffer(36160, Se)
            }
        }
    }
    ,
    this.copyFramebufferToTexture = function(w, N, H=0) {
        const O = Math.pow(2, -H)
          , q = Math.floor(N.image.width * O)
          , he = Math.floor(N.image.height * O);
        me.setTexture2D(N, 0),
        X.copyTexSubImage2D(3553, H, 0, 0, w.x, w.y, q, he),
        ae.unbindTexture()
    }
    ,
    this.copyTextureToTexture = function(w, N, H, O=0) {
        const q = N.image.width
          , he = N.image.height
          , ve = re.convert(H.format)
          , ye = re.convert(H.type);
        me.setTexture2D(H, 0),
        X.pixelStorei(37440, H.flipY),
        X.pixelStorei(37441, H.premultiplyAlpha),
        X.pixelStorei(3317, H.unpackAlignment),
        N.isDataTexture ? X.texSubImage2D(3553, O, w.x, w.y, q, he, ve, ye, N.image.data) : N.isCompressedTexture ? X.compressedTexSubImage2D(3553, O, w.x, w.y, N.mipmaps[0].width, N.mipmaps[0].height, ve, N.mipmaps[0].data) : X.texSubImage2D(3553, O, w.x, w.y, ve, ye, N.image),
        O === 0 && H.generateMipmaps && X.generateMipmap(3553),
        ae.unbindTexture()
    }
    ,
    this.copyTextureToTexture3D = function(w, N, H, O, q=0) {
        if (p.isWebGL1Renderer) {
            console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: can only be used with WebGL2.");
            return
        }
        const he = w.max.x - w.min.x + 1
          , ve = w.max.y - w.min.y + 1
          , ye = w.max.z - w.min.z + 1
          , Se = re.convert(O.format)
          , Ce = re.convert(O.type);
        let be;
        if (O.isData3DTexture)
            me.setTexture3D(O, 0),
            be = 32879;
        else if (O.isDataArrayTexture)
            me.setTexture2DArray(O, 0),
            be = 35866;
        else {
            console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: only supports THREE.DataTexture3D and THREE.DataTexture2DArray.");
            return
        }
        X.pixelStorei(37440, O.flipY),
        X.pixelStorei(37441, O.premultiplyAlpha),
        X.pixelStorei(3317, O.unpackAlignment);
        const Me = X.getParameter(3314)
          , De = X.getParameter(32878)
          , We = X.getParameter(3316)
          , Ke = X.getParameter(3315)
          , Qe = X.getParameter(32877)
          , Fe = H.isCompressedTexture ? H.mipmaps[0] : H.image;
        X.pixelStorei(3314, Fe.width),
        X.pixelStorei(32878, Fe.height),
        X.pixelStorei(3316, w.min.x),
        X.pixelStorei(3315, w.min.y),
        X.pixelStorei(32877, w.min.z),
        H.isDataTexture || H.isData3DTexture ? X.texSubImage3D(be, q, N.x, N.y, N.z, he, ve, ye, Se, Ce, Fe.data) : H.isCompressedArrayTexture ? (console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: untested support for compressed srcTexture."),
        X.compressedTexSubImage3D(be, q, N.x, N.y, N.z, he, ve, ye, Se, Fe.data)) : X.texSubImage3D(be, q, N.x, N.y, N.z, he, ve, ye, Se, Ce, Fe),
        X.pixelStorei(3314, Me),
        X.pixelStorei(32878, De),
        X.pixelStorei(3316, We),
        X.pixelStorei(3315, Ke),
        X.pixelStorei(32877, Qe),
        q === 0 && O.generateMipmaps && X.generateMipmap(be),
        ae.unbindTexture()
    }
    ,
    this.initTexture = function(w) {
        w.isCubeTexture ? me.setTextureCube(w, 0) : w.isData3DTexture ? me.setTexture3D(w, 0) : w.isDataArrayTexture || w.isCompressedArrayTexture ? me.setTexture2DArray(w, 0) : me.setTexture2D(w, 0),
        ae.unbindTexture()
    }
    ,
    this.resetState = function() {
        x = 0,
        S = 0,
        v = null,
        ae.reset(),
        Y.reset()
    }
    ,
    typeof __THREE_DEVTOOLS__ < "u" && __THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{
        detail: this
    }))
}
class WebGL1Renderer extends WebGLRenderer {
}
WebGL1Renderer.prototype.isWebGL1Renderer = !0;
class Scene extends Object3D {
    constructor() {
        super(),
        this.isScene = !0,
        this.type = "Scene",
        this.background = null,
        this.environment = null,
        this.fog = null,
        this.backgroundBlurriness = 0,
        this.backgroundIntensity = 1,
        this.overrideMaterial = null,
        typeof __THREE_DEVTOOLS__ < "u" && __THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{
            detail: this
        }))
    }
    copy(e, t) {
        return super.copy(e, t),
        e.background !== null && (this.background = e.background.clone()),
        e.environment !== null && (this.environment = e.environment.clone()),
        e.fog !== null && (this.fog = e.fog.clone()),
        this.backgroundBlurriness = e.backgroundBlurriness,
        this.backgroundIntensity = e.backgroundIntensity,
        e.overrideMaterial !== null && (this.overrideMaterial = e.overrideMaterial.clone()),
        this.matrixAutoUpdate = e.matrixAutoUpdate,
        this
    }
    toJSON(e) {
        const t = super.toJSON(e);
        return this.fog !== null && (t.object.fog = this.fog.toJSON()),
        this.backgroundBlurriness > 0 && (t.backgroundBlurriness = this.backgroundBlurriness),
        this.backgroundIntensity !== 1 && (t.backgroundIntensity = this.backgroundIntensity),
        t
    }
    get autoUpdate() {
        return console.warn("THREE.Scene: autoUpdate was renamed to matrixWorldAutoUpdate in r144."),
        this.matrixWorldAutoUpdate
    }
    set autoUpdate(e) {
        console.warn("THREE.Scene: autoUpdate was renamed to matrixWorldAutoUpdate in r144."),
        this.matrixWorldAutoUpdate = e
    }
}
class DataTexture extends Texture {
    constructor(e=null, t=1, i=1, n, r, o, a, c, l=NearestFilter, u=NearestFilter, h, d) {
        super(null, o, a, c, l, u, n, r, h, d),
        this.isDataTexture = !0,
        this.image = {
            data: e,
            width: t,
            height: i
        },
        this.generateMipmaps = !1,
        this.flipY = !1,
        this.unpackAlignment = 1
    }
}
class RawShaderMaterial extends ShaderMaterial {
    constructor(e) {
        super(e),
        this.isRawShaderMaterial = !0,
        this.type = "RawShaderMaterial"
    }
}
typeof __THREE_DEVTOOLS__ < "u" && __THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{
    detail: {
        revision: REVISION
    }
}));
typeof window < "u" && (window.__THREE__ ? console.warn("WARNING: Multiple instances of Three.js being imported.") : window.__THREE__ = REVISION);
function getDefaultExportFromCjs(s) {
    return s && s.__esModule && Object.prototype.hasOwnProperty.call(s, "default") ? s.default : s
}
var minSignal$1 = {
    exports: {}
};
(function(s) {
    (function(e) {
        function t() {
            this._listeners = [],
            this.dispatchCount = 0
        }
        var i = t.prototype;
        i.add = a,
        i.addOnce = c,
        i.remove = l,
        i.dispatch = u;
        var n = "Callback function is missing!"
          , r = Array.prototype.slice;
        function o(h) {
            h.sort(function(d, m) {
                return d = d.p,
                m = m.p,
                m < d ? 1 : m > d ? -1 : 0
            })
        }
        function a(h, d, m, g) {
            if (!h)
                throw n;
            m = m || 0;
            for (var p = this._listeners, f, x, S, v = p.length; v--; )
                if (f = p[v],
                f.f === h && f.c === d)
                    return !1;
            typeof m == "function" && (x = m,
            m = g,
            S = 4),
            p.unshift({
                f: h,
                c: d,
                p: m,
                r: x || h,
                a: r.call(arguments, S || 3),
                j: 0
            }),
            o(p)
        }
        function c(h, d, m, g) {
            if (!h)
                throw n;
            var p = this
              , f = function() {
                return p.remove.call(p, h, d),
                h.apply(d, r.call(arguments, 0))
            };
            g = r.call(arguments, 0),
            g.length === 1 && g.push(e),
            g.splice(2, 0, f),
            a.apply(p, g)
        }
        function l(h, d) {
            if (!h)
                return this._listeners.length = 0,
                !0;
            for (var m = this._listeners, g, p = m.length; p--; )
                if (g = m[p],
                g.f === h && (!d || g.c === d))
                    return g.j = 0,
                    m.splice(p, 1),
                    !0;
            return !1
        }
        function u(h) {
            h = r.call(arguments, 0),
            this.dispatchCount++;
            for (var d = this.dispatchCount, m = this._listeners, g, p, f = m.length; f--; )
                if (g = m[f],
                g && g.j < d && (g.j = d,
                g.r.apply(g.c, g.a.concat(h)) === !1)) {
                    p = g;
                    break
                }
            for (m = this._listeners,
            f = m.length; f--; )
                m[f].j = 0;
            return p
        }
        s.exports = t
    }
    )()
}
)(minSignal$1);
var minSignalExports$1 = minSignal$1.exports;
const MinSignal$2 = getDefaultExportFromCjs(minSignalExports$1);
var quickLoader$b = {
    exports: {}
}
  , minSignal = {
    exports: {}
};
(function(s) {
    (function(e) {
        function t() {
            this._listeners = [],
            this.dispatchCount = 0
        }
        var i = t.prototype;
        i.add = a,
        i.addOnce = c,
        i.remove = l,
        i.dispatch = u;
        var n = "Callback function is missing!"
          , r = Array.prototype.slice;
        function o(h) {
            h.sort(function(d, m) {
                return d = d.p,
                m = m.p,
                m < d ? 1 : d > m ? -1 : 0
            })
        }
        function a(h, d, m, g) {
            if (!h)
                throw n;
            m = m || 0;
            for (var p = this._listeners, f, x, S, v = p.length; v--; )
                if (f = p[v],
                f.f === h && f.c === d)
                    return !1;
            typeof m == "function" && (x = m,
            m = g,
            S = 4),
            p.unshift({
                f: h,
                c: d,
                p: m,
                r: x || h,
                a: r.call(arguments, S || 3),
                j: 0
            }),
            o(p)
        }
        function c(h, d, m, g) {
            if (!h)
                throw n;
            var p = this
              , f = function() {
                return p.remove.call(p, h, d),
                h.apply(d, r.call(arguments, 0))
            };
            g = r.call(arguments, 0),
            g.length === 1 && g.push(e),
            g.splice(2, 0, f),
            a.apply(p, g)
        }
        function l(h, d) {
            if (!h)
                return this._listeners.length = 0,
                !0;
            for (var m = this._listeners, g, p = m.length; p--; )
                if (g = m[p],
                g.f === h && (!d || g.c === d))
                    return g.j = 0,
                    m.splice(p, 1),
                    !0;
            return !1
        }
        function u(h) {
            h = r.call(arguments, 0),
            this.dispatchCount++;
            for (var d = this.dispatchCount, m = this._listeners, g, p, f = m.length; f--; )
                if (g = m[f],
                g && g.j < d && (g.j = d,
                g.r.apply(g.c, g.a.concat(h)) === !1)) {
                    p = g;
                    break
                }
            for (m = this._listeners,
            f = m.length; f--; )
                m[f].j = 0;
            return p
        }
        s.exports = t
    }
    )()
}
)(minSignal);
var minSignalExports = minSignal.exports, MinSignal$1 = minSignalExports, undef$3;
function QuickLoader() {
    this.isLoading = !1,
    this.totalWeight = 0,
    this.loadedWeight = 0,
    this.itemUrls = {},
    this.itemList = [],
    this.loadingSignal = new MinSignal$1,
    this.crossOriginMap = {},
    this.queue = [],
    this.activeItems = [],
    this.maxActiveItems = 4
}
var _p$9 = QuickLoader.prototype;
_p$9.addChunk = addChunk;
_p$9.setCrossOrigin = setCrossOrigin;
_p$9.add = add;
_p$9.load = load$7;
_p$9.start = start$1;
_p$9.loadNext = loadNext;
_p$9._createItem = _createItem;
_p$9._onLoading = _onLoading$1;
_p$9.VERSION = "0.1.17";
_p$9.register = register;
_p$9.retrieveAll = retrieveAll;
_p$9.retrieve = retrieve;
_p$9.testExtensions = testExtensions;
_p$9.create = create;
_p$9.check = check;
var addedItems = _p$9.addedItems = {}
  , loadedItems = _p$9.loadedItems = {}
  , ITEM_CLASS_LIST = _p$9.ITEM_CLASS_LIST = []
  , ITEM_CLASSES = _p$9.ITEM_CLASSES = {};
quickLoader$b.exports = create();
function setCrossOrigin(s, e) {
    this.crossOriginMap[s] = e
}
function addChunk(s, e) {
    var t, i, n, r, o, a = retrieveAll(s, e);
    for (t = 0,
    n = a.length; t < n; t++)
        for (o = a[t],
        i = 0,
        r = o.items.length; i < r; i++)
            this.add(o.items[i], {
                type: o.type
            });
    return a
}
function add(s, e) {
    var t = addedItems[s];
    return t || (t = this._createItem(s, e && e.type ? e.type : retrieve(s).type, e)),
    e && e.onLoad && t.onLoaded.addOnce(e.onLoad),
    this.itemUrls[s] || (this.itemUrls[s] = t,
    this.itemList.push(t),
    this.totalWeight += t.weight),
    t
}
function load$7(s, e) {
    var t = addedItems[s];
    return t || (t = this._createItem(s, e && e.type ? e.type : retrieve(s).type, e)),
    e && e.onLoad && t.onLoaded.addOnce(e.onLoad),
    loadedItems[s] ? t.dispatch() : t.isStartLoaded || t.load(),
    t
}
function start$1(s) {
    s && this.loadingSignal.add(s),
    this.isLoading = !0;
    var e = this.itemList.length;
    if (e) {
        var t = this.itemList.splice(0, this.itemList.length), i;
        for (var n in this.itemUrls)
            delete this.itemUrls[n];
        for (var r = 0; r < e; r++) {
            i = t[r];
            var o = !!loadedItems[i.url];
            i.onLoaded.addOnce(_onItemLoad, this, -1024, i, t, o),
            i.hasLoading && i.loadingSignal.add(_onLoading$1, this, -1024, i, t, undef$3),
            o ? i.dispatch(_onItemLoad) : i.isStartLoaded || this.queue.push(i)
        }
        this.queue.length && this.loadNext()
    } else
        _onItemLoad.call(this, undef$3, this.itemList)
}
function loadNext() {
    if (this.queue.length && this.activeItems.length < this.maxActiveItems) {
        var s = this.queue.shift();
        this.activeItems.push(s),
        this.loadNext(),
        s.load()
    }
}
function _onLoading$1(s, e, t, i, n) {
    s && !s.isLoaded && s.getCombinedPercent(i) === 1 || (n === undef$3 && (this.loadedWeight = _getLoadedWeight(e),
    n = this.loadedWeight / this.totalWeight),
    t = t || this.loadingSignal,
    t.dispatch(n, s))
}
function _getLoadedWeight(s) {
    for (var e = 0, t = 0, i = s.length; t < i; t++)
        e += s[t].loadedWeight;
    return e
}
function _onItemLoad(s, e, t) {
    if (this.loadedWeight = _getLoadedWeight(e),
    !t) {
        for (var i = this.activeItems, n = i.length; n--; )
            if (i[n] === s) {
                i.splice(n, 1);
                break
            }
    }
    var r = this.loadingSignal;
    this.loadedWeight === this.totalWeight ? (this.isLoading = !1,
    this.loadedWeight = 0,
    this.totalWeight = 0,
    this.loadingSignal = new MinSignal$1,
    this._onLoading(s, e, r, 1, 1),
    s && s.noCache && _removeItemCache(s)) : (this._onLoading(s, e, r, 1, this.loadedWeight / this.totalWeight),
    s && s.noCache && _removeItemCache(s),
    t || this.loadNext())
}
function _removeItemCache(s) {
    var e = s.url;
    s.content = undef$3,
    addedItems[e] = undef$3,
    loadedItems[e] = undef$3
}
function _createItem(s, e, t) {
    if (t = t || {},
    !t.crossOrigin) {
        for (var i in this.crossOriginMap)
            if (s.indexOf(i) === 0) {
                t.crossOrigin = this.crossOriginMap[i];
                break
            }
    }
    return new ITEM_CLASSES[e](s,t)
}
function register(s) {
    ITEM_CLASSES[s.type] || (ITEM_CLASS_LIST.push(s),
    ITEM_CLASSES[s.type] = s)
}
function retrieveAll(s, e) {
    var t, i, n = s.length, r = [];
    if (n && typeof s != "string")
        for (t = 0; t < n; t++)
            i = retrieve(s[t], e),
            i && (r = r.concat(i));
    else
        i = retrieve(s, e),
        i && (r = r.concat(i));
    return r
}
function retrieve(s, e) {
    var t, i, n, r, o;
    if (e)
        r = ITEM_CLASSES[e],
        n = r.retrieve(s);
    else
        for (t = 0,
        i = ITEM_CLASS_LIST.length; t < i; t++) {
            if (r = ITEM_CLASS_LIST[t],
            o = r.type,
            typeof s == "string") {
                if (testExtensions(s, r)) {
                    n = [s];
                    break
                }
            } else if (n = r.retrieve(s),
            n && n.length && typeof n[0] == "string" && testExtensions(n[0], r))
                break;
            n = undef$3,
            o = undef$3
        }
    if (n)
        return {
            type: e || o,
            items: n
        }
}
function testExtensions(s, e) {
    if (s) {
        for (var t = _getExtension(s), i = e.extensions, n = i.length; n--; )
            if (t === i[n])
                return !0;
        return !1
    }
}
function _getExtension(s) {
    return s.split(".").pop().split(/#|\?/)[0]
}
function create() {
    return new QuickLoader
}
function check() {
    var s = []
      , e = [];
    for (var t in addedItems)
        s.push(t),
        loadedItems[t] || e.push(addedItems[t]);
    console.log({
        added: s,
        notLoaded: e
    })
}
var quickLoaderExports = quickLoader$b.exports
  , MinSignal = minSignalExports
  , quickLoader$a = quickLoaderExports;
function AbstractItem$6(s, e) {
    if (s) {
        this.url = s,
        this.loadedWeight = 0,
        this.weight = 1,
        this.postPercent = 0;
        for (var t in e)
            this[t] = e[t];
        this.type || (this.type = this.constructor.type),
        this.hasLoading && (this.loadingSignal = new MinSignal,
        this.loadingSignal.add(_onLoading, this),
        this.onLoading && this.loadingSignal.add(this.onLoading)),
        this.onPost ? (this.onPostLoadingSignal = new MinSignal,
        this.onPostLoadingSignal.add(this._onPostLoading, this),
        this.postWeightRatio = this.postWeightRatio || .1) : this.postWeightRatio = 0;
        var i = this;
        this.boundOnLoad = function() {
            i._onLoad()
        }
        ,
        this.onLoaded = new MinSignal,
        quickLoader$a.addedItems[s] = this
    }
}
var AbstractItem_1 = AbstractItem$6
  , _p$8 = AbstractItem$6.prototype;
_p$8.load = load$6;
_p$8._onLoad = _onLoad$6;
_p$8._onLoading = _onLoading;
_p$8._onPostLoading = _onPostLoading;
_p$8._onLoadComplete = _onLoadComplete;
_p$8.getCombinedPercent = getCombinedPercent;
_p$8.dispatch = dispatch;
AbstractItem$6.extensions = [];
AbstractItem$6.retrieve = function() {
    return !1
}
;
function load$6() {
    this.isStartLoaded = !0
}
function _onLoad$6() {
    this.onPost ? this.onPost.call(this, this.content, this.onPostLoadingSignal) : this._onLoadComplete()
}
function _onPostLoading(s) {
    this.postPercent = s,
    this.hasLoading && this.loadingSignal.dispatch(1),
    s === 1 && this._onLoadComplete()
}
function _onLoadComplete() {
    this.isLoaded = !0,
    this.loadedWeight = this.weight,
    quickLoader$a.loadedItems[this.url] = this,
    this.onLoaded.dispatch(this.content)
}
function getCombinedPercent(s) {
    return s * (1 - this.postWeightRatio) + this.postWeightRatio * this.postPercent
}
function _onLoading(s) {
    this.loadedWeight = this.weight * this.getCombinedPercent(s)
}
function dispatch() {
    this.hasLoading && this.loadingSignal.remove(),
    this.onLoaded.dispatch(this.content)
}
var AbstractItem$5 = AbstractItem_1
  , quickLoader$9 = quickLoaderExports;
function __generateFuncName() {
    return "_jsonp" + new Date().getTime() + ~~(Math.random() * 1e8)
}
function JSONPItem(s) {
    s && _super$7.constructor.apply(this, arguments)
}
JSONPItem.type = "jsonp";
JSONPItem.extensions = [];
quickLoader$9.register(JSONPItem);
JSONPItem.retrieve = function(s) {
    return typeof s == "string" && s.indexOf("=") > -1 ? [s] : !1
}
;
var _super$7 = AbstractItem$5.prototype
  , _p$7 = JSONPItem.prototype = new AbstractItem$5;
_p$7.constructor = JSONPItem;
_p$7.load = load$5;
function load$5(s) {
    _super$7.load.apply(this, arguments);
    var e = this
      , t = this.url.lastIndexOf("=") + 1
      , i = this.url.substr(0, t)
      , n = this.url.substr(t);
    n.length === 0 ? (n = __generateFuncName(),
    this.jsonpCallback = s) : this.jsonpCallback = this.jsonpCallback || window[n],
    window[n] = function(o) {
        r.parentNode && r.parentNode.removeChild(r),
        e.content = o,
        e._onLoad()
    }
    ;
    var r = document.createElement("script");
    r.type = "text/javascript",
    r.src = i + n,
    document.getElementsByTagName("head")[0].appendChild(r)
}
var AbstractItem$4 = AbstractItem_1, quickLoader$8 = quickLoaderExports, undef$2, IS_SUPPORT_XML_HTTP_REQUEST = !!window.XMLHttpRequest;
function XHRItem$1(s) {
    s && (_super$6.constructor.apply(this, arguments),
    this.responseType = this.responseType || "",
    this.method = this.method || "GET")
}
var XHRItem_1 = XHRItem$1;
XHRItem$1.type = "xhr";
XHRItem$1.extensions = [];
quickLoader$8.register(XHRItem$1);
XHRItem$1.retrieve = function() {
    return !1
}
;
var _super$6 = AbstractItem$4.prototype
  , _p$6 = XHRItem$1.prototype = new AbstractItem$4;
_p$6.constructor = XHRItem$1;
_p$6.load = load$4;
_p$6._onXmlHttpChange = _onXmlHttpChange;
_p$6._onXmlHttpProgress = _onXmlHttpProgress;
_p$6._onLoad = _onLoad$5;
function load$4() {
    _super$6.load.apply(this, arguments);
    var s = this, e;
    IS_SUPPORT_XML_HTTP_REQUEST ? e = this.xmlhttp = new XMLHttpRequest : e = this.xmlhttp = new ActiveXObject("Microsoft.XMLHTTP"),
    this.hasLoading && (e.onprogress = function(t) {
        s._onXmlHttpProgress(t)
    }
    ),
    e.onreadystatechange = function() {
        s._onXmlHttpChange()
    }
    ,
    e.open(this.method, this.url, !0),
    this.xmlhttp.responseType = this.responseType,
    IS_SUPPORT_XML_HTTP_REQUEST ? e.send(null) : e.send()
}
function _onXmlHttpProgress(s) {
    this.loadingSignal.dispatch(s.loaded / s.total)
}
function _onXmlHttpChange() {
    this.xmlhttp.readyState === 4 && this.xmlhttp.status === 200 && this._onLoad(this.xmlhttp)
}
function _onLoad$5() {
    this.content || (this.content = this.xmlhttp.response),
    this.xmlhttp = undef$2,
    _super$6._onLoad.call(this)
}
var XHRItem = XHRItem_1
  , quickLoader$7 = quickLoaderExports;
function TextItem$1(s, e) {
    s && (e.responseType = "text",
    _super$5.constructor.apply(this, arguments))
}
var TextItem_1 = TextItem$1;
TextItem$1.type = "text";
TextItem$1.extensions = ["html", "txt", "svg"];
quickLoader$7.register(TextItem$1);
TextItem$1.retrieve = function() {
    return !1
}
;
var _super$5 = XHRItem.prototype
  , _p$5 = TextItem$1.prototype = new XHRItem;
_p$5.constructor = TextItem$1;
_p$5._onLoad = _onLoad$4;
function _onLoad$4() {
    this.content || (this.content = this.xmlhttp.responseText),
    _super$5._onLoad.apply(this, arguments)
}
var TextItem = TextItem_1
  , quickLoader$6 = quickLoaderExports;
function JSONItem(s) {
    s && _super$4.constructor.apply(this, arguments)
}
JSONItem.type = "json";
JSONItem.extensions = ["json"];
quickLoader$6.register(JSONItem);
JSONItem.retrieve = function() {
    return !1
}
;
var _super$4 = TextItem.prototype
  , _p$4 = JSONItem.prototype = new TextItem;
_p$4.constructor = JSONItem;
_p$4._onLoad = _onLoad$3;
function _onLoad$3() {
    this.content || (this.content = window.JSON && window.JSON.parse ? JSON.parse(this.xmlhttp.responseText.toString()) : eval(this.xmlhttp.responseText.toString())),
    _super$4._onLoad.call(this)
}
var AbstractItem$3 = AbstractItem_1, quickLoader$5 = quickLoaderExports, undef$1;
function AudioItem(s, e) {
    if (s) {
        this.loadThrough = !e || e.loadThrough === undef$1 ? !0 : e.loadThrough,
        _super$3.constructor.apply(this, arguments);
        try {
            this.content = this.content || new Audio
        } catch {
            this.content = this.content || document.createElement("audio")
        }
        this.crossOrigin && (this.content.crossOrigin = this.crossOrigin)
    }
}
AudioItem.type = "audio";
AudioItem.extensions = ["mp3", "ogg"];
quickLoader$5.register(AudioItem);
AudioItem.retrieve = function(s) {
    return !1
}
;
var _super$3 = AbstractItem$3.prototype
  , _p$3 = AudioItem.prototype = new AbstractItem$3;
_p$3.constructor = AudioItem;
_p$3.load = load$3;
_p$3._onLoad = _onLoad$2;
function load$3() {
    _super$3.load.apply(this, arguments);
    var s = this
      , e = s.content;
    e.src = this.url,
    this.loadThrough ? e.addEventListener("canplaythrough", this.boundOnLoad, !1) : e.addEventListener("canplay", this.boundOnLoad, !1),
    e.load()
}
function _onLoad$2() {
    this.content.removeEventListener("canplaythrough", this.boundOnLoad, !1),
    this.content.removeEventListener("canplay", this.boundOnLoad, !1),
    !this.isLoaded && _super$3._onLoad.call(this)
}
var AbstractItem$2 = AbstractItem_1, quickLoader$4 = quickLoaderExports, undef;
function VideoItem(s, e) {
    if (s) {
        this.loadThrough = !e || e.loadThrough === undef ? !0 : e.loadThrough,
        _super$2.constructor.apply(this, arguments);
        try {
            this.content = this.content || new Video
        } catch {
            this.content = this.content || document.createElement("video")
        }
        this.crossOrigin && (this.content.crossOrigin = this.crossOrigin)
    }
}
VideoItem.type = "video";
VideoItem.extensions = ["mp4", "webm", "ogv"];
quickLoader$4.register(VideoItem);
VideoItem.retrieve = function(s) {
    return !1
}
;
var _super$2 = AbstractItem$2.prototype
  , _p$2 = VideoItem.prototype = new AbstractItem$2;
_p$2.constructor = VideoItem;
_p$2.load = load$2;
_p$2._onLoad = _onLoad$1;
function load$2() {
    _super$2.load.apply(this, arguments);
    var s = this.content;
    s.preload = "auto",
    s.src = this.url,
    this.loadThrough ? s.addEventListener("canplaythrough", this.boundOnLoad, !1) : s.addEventListener("canplay", this.boundOnLoad, !1),
    s.load()
}
function _onLoad$1() {
    this.content.removeEventListener("canplaythrough", this.boundOnLoad),
    this.content.removeEventListener("canplay", this.boundOnLoad),
    !this.isLoaded && _super$2._onLoad.call(this)
}
var AbstractItem$1 = AbstractItem_1
  , quickLoader$3 = quickLoaderExports;
function AnyItem$1(s, e) {
    s && (_super$1.constructor.call(this, s, e),
    !this.loadFunc && console && console[console.error || console.log]("require loadFunc in the config object."))
}
AnyItem$1.type = "any";
AnyItem$1.extensions = [];
quickLoader$3.register(AnyItem$1);
AnyItem$1.retrieve = function() {
    return !1
}
;
var _super$1 = AbstractItem$1.prototype
  , _p$1 = AnyItem$1.prototype = new AbstractItem$1;
_p$1.constructor = AnyItem$1;
_p$1.load = load$1;
function load$1() {
    var s = this;
    this.loadFunc(this.url, function(e) {
        s.content = e,
        _super$1._onLoad.call(s)
    }, this.loadingSignal)
}
function computedStyle$1(s, e, t, i) {
    if (t = window.getComputedStyle,
    i = t ? t(s) : s.currentStyle,
    i)
        return i[e.replace(/-(\w)/gi, function(n, r) {
            return r.toUpperCase()
        })]
}
var computedStyle_commonjs = computedStyle$1
  , AbstractItem = AbstractItem_1
  , computedStyle = computedStyle_commonjs
  , quickLoader$2 = quickLoaderExports;
function ImageItem$1(s, e) {
    s && (_super.constructor.apply(this, arguments),
    this.content = this.content || new Image,
    this.crossOrigin && (this.content.crossOrigin = this.crossOrigin))
}
var _super = AbstractItem.prototype
  , _p = ImageItem$1.prototype = new AbstractItem;
_p.constructor = ImageItem$1;
_p.load = load;
_p._onLoad = _onLoad;
ImageItem$1.retrieve = function(s) {
    if (s.nodeType && s.style) {
        var e = [];
        s.nodeName.toLowerCase() === "img" && s.src.indexOf(";") < 0 && e.push(s.src),
        computedStyle(s, "background-image").replace(/s?url\(\s*?['"]?([^;]*?)['"]?\s*?\)/g, function(i, n) {
            e.push(n)
        });
        for (var t = e.length; t--; )
            _isNotData(e[t]) || e.splice(t, 1);
        return e.length ? e : !1
    } else
        return typeof s == "string" ? [s] : !1
}
;
ImageItem$1.type = "image";
ImageItem$1.extensions = ["jpg", "gif", "png"];
quickLoader$2.register(ImageItem$1);
function load() {
    _super.load.apply(this, arguments);
    var s = this.content;
    s.onload = this.boundOnLoad,
    s.src = this.url
}
function _onLoad() {
    delete this.content.onload,
    this.width = this.content.width,
    this.height = this.content.height,
    _super._onLoad.call(this)
}
function _isNotData(s) {
    return s.indexOf("data:") !== 0
}
var quickLoader = quickLoaderExports;
const quickLoader$1 = getDefaultExportFromCjs(quickLoader)
  , _c$1 = new Color;
class Properties {
    win = window;
    isSecureConnection = window.location.protocol === "https:";
    needsResize = !1;
    isResizing = !1;
    loader = quickLoader$1.create();
    time = 0;
    deltaTime = 0;
    hasInitialized = !1;
    hasStarted = !1;
    startTime = 0;
    viewportWidth = 0;
    viewportHeight = 0;
    useMobileLayout = !1;
    width = 0;
    height = 0;
    renderer = null;
    scene = null;
    camera = null;
    postprocessing = null;
    resolution = new Vector2;
    viewportResolution = new Vector2;
    bgColor = new Color;
    skipProfileUpdate = !1;
    isMobile = browser$1.isMobile;
    canvas = null;
    gl = null;
    webglOpts = {
        antialias: !1,
        alpha: !1,
        xrCompatible: !0
    };
    sharedUniforms = {
        u_cameraDirection: {
            value: this.cameraDirection
        },
        u_time: {
            value: 0
        },
        u_deltaTime: {
            value: 1
        },
        u_resolution: {
            value: this.resolution
        },
        u_viewportResolution: {
            value: this.viewportResolution
        },
        u_bgColor: {
            value: this.bgColor
        }
    };
    initCallFuncList = [];
    timestamp = 0;
    bgColorHex = "#1d1d1d";
    opacity = 1;
    onFirstClicked = new MinSignal$2;
    onResized = new MinSignal$2;
    globalColors = {};
    headerHeight = 0;
    contentHeightUnderTheHeader = 0;
    readCSSProperties() {
        let e = !1;
        return ["error", "white", "black", "orange", "primary", "light-gray", "primary-01", "primary-02", "primary-03", "gray", "gray-light", "dark"].forEach(i => {
            const n = window.getComputedStyle(document.documentElement).getPropertyValue(`--color-${i}`);
            n && (e = !0,
            _c$1.set(n),
            this.globalColors[i] = {
                hex: "#" + _c$1.getHexString(),
                rgbFloat: _c$1.getRGB({
                    r: 0,
                    g: 0,
                    b: 0
                }),
                hslFloat: _c$1.getHSL({
                    h: 0,
                    s: 0,
                    l: 0
                })
            },
            this.globalColors[i].rgbInt = {
                r: Math.round(this.globalColors[i].rgbFloat.r * 255),
                g: Math.round(this.globalColors[i].rgbFloat.g * 255),
                b: Math.round(this.globalColors[i].rgbFloat.b * 255)
            },
            this.globalColors[i].hslInt = {
                h: Math.round(this.globalColors[i].hslFloat.h * 360),
                s: Math.round(this.globalColors[i].hslFloat.s * 100),
                l: Math.round(this.globalColors[i].hslFloat.l * 100)
            })
        }
        ),
        e
    }
}
const properties = new Properties;
var _populated = !1, _ie, _firefox, _opera, _webkit, _chrome, _ie_real_version, _osx, _windows, _linux, _android, _win64, _iphone, _ipad, _native, _mobile;
function _populate() {
    if (!_populated) {
        _populated = !0;
        var s = navigator.userAgent
          , e = /(?:MSIE.(\d+\.\d+))|(?:(?:Firefox|GranParadiso|Iceweasel).(\d+\.\d+))|(?:Opera(?:.+Version.|.)(\d+\.\d+))|(?:AppleWebKit.(\d+(?:\.\d+)?))|(?:Trident\/\d+\.\d+.*rv:(\d+\.\d+))/.exec(s)
          , t = /(Mac OS X)|(Windows)|(Linux)/.exec(s);
        if (_iphone = /\b(iPhone|iP[ao]d)/.exec(s),
        _ipad = /\b(iP[ao]d)/.exec(s),
        _android = /Android/i.exec(s),
        _native = /FBAN\/\w+;/i.exec(s),
        _mobile = /Mobile/i.exec(s),
        _win64 = !!/Win64/.exec(s),
        e) {
            _ie = e[1] ? parseFloat(e[1]) : e[5] ? parseFloat(e[5]) : NaN,
            _ie && document && document.documentMode && (_ie = document.documentMode);
            var i = /(?:Trident\/(\d+.\d+))/.exec(s);
            _ie_real_version = i ? parseFloat(i[1]) + 4 : _ie,
            _firefox = e[2] ? parseFloat(e[2]) : NaN,
            _opera = e[3] ? parseFloat(e[3]) : NaN,
            _webkit = e[4] ? parseFloat(e[4]) : NaN,
            _webkit ? (e = /(?:Chrome\/(\d+\.\d+))/.exec(s),
            _chrome = e && e[1] ? parseFloat(e[1]) : NaN) : _chrome = NaN
        } else
            _ie = _firefox = _opera = _chrome = _webkit = NaN;
        if (t) {
            if (t[1]) {
                var n = /(?:Mac OS X (\d+(?:[._]\d+)?))/.exec(s);
                _osx = n ? parseFloat(n[1].replace("_", ".")) : !0
            } else
                _osx = !1;
            _windows = !!t[2],
            _linux = !!t[3]
        } else
            _osx = _windows = _linux = !1
    }
}
var UserAgent_DEPRECATED$1 = {
    ie: function() {
        return _populate() || _ie
    },
    ieCompatibilityMode: function() {
        return _populate() || _ie_real_version > _ie
    },
    ie64: function() {
        return UserAgent_DEPRECATED$1.ie() && _win64
    },
    firefox: function() {
        return _populate() || _firefox
    },
    opera: function() {
        return _populate() || _opera
    },
    webkit: function() {
        return _populate() || _webkit
    },
    safari: function() {
        return UserAgent_DEPRECATED$1.webkit()
    },
    chrome: function() {
        return _populate() || _chrome
    },
    windows: function() {
        return _populate() || _windows
    },
    osx: function() {
        return _populate() || _osx
    },
    linux: function() {
        return _populate() || _linux
    },
    iphone: function() {
        return _populate() || _iphone
    },
    mobile: function() {
        return _populate() || _iphone || _ipad || _android || _mobile
    },
    nativeApp: function() {
        return _populate() || _native
    },
    android: function() {
        return _populate() || _android
    },
    ipad: function() {
        return _populate() || _ipad
    }
}, UserAgent_DEPRECATED_1 = UserAgent_DEPRECATED$1, canUseDOM = !!(typeof window < "u" && window.document && window.document.createElement), ExecutionEnvironment$1 = {
    canUseDOM,
    canUseWorkers: typeof Worker < "u",
    canUseEventListeners: canUseDOM && !!(window.addEventListener || window.attachEvent),
    canUseViewport: canUseDOM && !!window.screen,
    isInWorker: !canUseDOM
}, ExecutionEnvironment_1 = ExecutionEnvironment$1, ExecutionEnvironment = ExecutionEnvironment_1, useHasFeature;
ExecutionEnvironment.canUseDOM && (useHasFeature = document.implementation && document.implementation.hasFeature && document.implementation.hasFeature("", "") !== !0);
/**
 * Checks if an event is supported in the current execution environment.
 *
 * NOTE: This will not work correctly for non-generic events such as `change`,
 * `reset`, `load`, `error`, and `select`.
 *
 * Borrows from Modernizr.
 *
 * @param {string} eventNameSuffix Event name, e.g. "click".
 * @param {?boolean} capture Check if the capture phase is supported.
 * @return {boolean} True if the event is supported.
 * @internal
 * @license Modernizr 3.0.0pre (Custom Build) | MIT
 */
function isEventSupported$1(s, e) {
    if (!ExecutionEnvironment.canUseDOM || e && !("addEventListener"in document))
        return !1;
    var t = "on" + s
      , i = t in document;
    if (!i) {
        var n = document.createElement("div");
        n.setAttribute(t, "return;"),
        i = typeof n[t] == "function"
    }
    return !i && useHasFeature && s === "wheel" && (i = document.implementation.hasFeature("Events.wheel", "3.0")),
    i
}
var isEventSupported_1 = isEventSupported$1
  , UserAgent_DEPRECATED = UserAgent_DEPRECATED_1
  , isEventSupported = isEventSupported_1
  , PIXEL_STEP = 10
  , LINE_HEIGHT = 40
  , PAGE_HEIGHT = 800;
function normalizeWheel$2(s) {
    var e = 0
      , t = 0
      , i = 0
      , n = 0;
    return "detail"in s && (t = s.detail),
    "wheelDelta"in s && (t = -s.wheelDelta / 120),
    "wheelDeltaY"in s && (t = -s.wheelDeltaY / 120),
    "wheelDeltaX"in s && (e = -s.wheelDeltaX / 120),
    "axis"in s && s.axis === s.HORIZONTAL_AXIS && (e = t,
    t = 0),
    i = e * PIXEL_STEP,
    n = t * PIXEL_STEP,
    "deltaY"in s && (n = s.deltaY),
    "deltaX"in s && (i = s.deltaX),
    (i || n) && s.deltaMode && (s.deltaMode == 1 ? (i *= LINE_HEIGHT,
    n *= LINE_HEIGHT) : (i *= PAGE_HEIGHT,
    n *= PAGE_HEIGHT)),
    i && !e && (e = i < 1 ? -1 : 1),
    n && !t && (t = n < 1 ? -1 : 1),
    {
        spinX: e,
        spinY: t,
        pixelX: i,
        pixelY: n
    }
}
normalizeWheel$2.getEventType = function() {
    return UserAgent_DEPRECATED.firefox() ? "DOMMouseScroll" : isEventSupported("wheel") ? "wheel" : "mousewheel"
}
;
var normalizeWheel_1 = normalizeWheel$2
  , normalizeWheel = normalizeWheel_1;
const normalizeWheel$1 = getDefaultExportFromCjs(normalizeWheel);
class SecondOrderDynamics {
    target0 = null;
    target = null;
    prevTarget = null;
    value = null;
    valueVel = null;
    k1;
    k2;
    k3;
    _f;
    _z;
    _r;
    _w;
    _z;
    _d;
    _targetVelCache;
    _cache1;
    _cache2;
    _k1Stable;
    _k2Stable;
    isVector = null;
    isRobust = null;
    constructor(e, t=1.5, i=.8, n=2, r=!0) {
        this.isRobust = r,
        this.isVector = typeof e == "object",
        this.setFZR(t, i, n),
        this.isVector ? (this.target = e,
        this.target0 = e.clone(),
        this.prevTarget = e.clone(),
        this.value = e.clone(),
        this.valueVel = e.clone().setScalar(0),
        this._targetVelCache = this.valueVel.clone(),
        this._cache1 = this.valueVel.clone(),
        this._cache2 = this.valueVel.clone(),
        this.update = this._updateVector,
        this.reset = this._resetVector) : (this.target0 = e,
        this.prevTarget = e,
        this.value = e,
        this.valueVel = 0,
        this.update = this._updateNumber,
        this.reset = this._resetNumber),
        this.computeStableCoefficients = r ? this._computeRobustStableCoefficients : this._computeStableCoefficients
    }
    update(e, t=0) {}
    reset(e=null) {}
    _resetVector(e=this.target0) {
        this.valueVel.setScalar(0),
        this.prevTarget.copy(e),
        this.target.copy(e),
        this.value.copy(e)
    }
    _resetNumber(e=this.target0) {
        this.valueVel = 0,
        this.prevTarget = e,
        this.target = e,
        this.value = e
    }
    setFZR(e=this._f, t=this._z, i=this._r) {
        let n = Math.PI * 2 * e;
        this.isRobust && (this._w = n,
        this._z = t,
        this._d = this._w * Math.sqrt(Math.abs(this._z * this._z - 1))),
        this.k1 = t / (Math.PI * e),
        this.k2 = 1 / (n * n),
        this.k3 = i * t / n
    }
    _computeStableCoefficients(e) {
        this._k1Stable = this.k1,
        this._k2Stable = Math.max(this.k2, 1.1 * e * e / 4 + e * this.k1 / 2)
    }
    _computeRobustStableCoefficients(e) {
        if (this._w * e < this._z)
            this._k1Stable = this.k1,
            this._k2Stable = Math.max(this.k2, e * e / 2 + e * this.k1 / 2, e * this.k1);
        else {
            let t = Math.exp(-this._z * this._w * e)
              , i = 2 * t * (this._z <= 1 ? Math.cos(e * this._d) : Math.cosh(e * this._d))
              , n = t * t
              , r = e / (1 + n - i);
            this._k1Stable = (1 - n) * r,
            this._k2Stable = e * r
        }
    }
    _updateVector(e) {
        e > 0 && (this._targetVelCache.copy(this.target).sub(this.prevTarget).divideScalar(e),
        this.prevTarget.copy(this.target),
        this.computeStableCoefficients(e),
        this.value.add(this._cache1.copy(this.valueVel).multiplyScalar(e)),
        this._cache1.copy(this.target).add(this._targetVelCache.multiplyScalar(this.k3)).sub(this.value).sub(this._cache2.copy(this.valueVel).multiplyScalar(this._k1Stable)).multiplyScalar(e / this._k2Stable),
        this.valueVel.add(this._cache1))
    }
    _updateNumber(e, t=this.target) {
        if (e > 0) {
            let i = (t - this.prevTarget) / e;
            this.prevTarget = t,
            this.computeStableCoefficients(e),
            this.value += this.valueVel * e,
            this.valueVel += (t + this.k3 * i - this.value - this._k1Stable * this.valueVel) * (e / this._k2Stable)
        }
    }
}
class Input {
    onDowned = new MinSignal$2;
    onMoved = new MinSignal$2;
    onUped = new MinSignal$2;
    onClicked = new MinSignal$2;
    onWheeled = new MinSignal$2;
    onXScrolled = new MinSignal$2;
    onYScrolled = new MinSignal$2;
    wasDown = !1;
    isDown = !1;
    downTime = 0;
    hasClicked = !1;
    hasMoved = !1;
    hadMoved = !1;
    justClicked = !1;
    mouseXY = new Vector2;
    _prevMouseXY = new Vector2;
    prevMouseXY = new Vector2;
    mousePixelXY = new Vector2;
    _prevMousePixelXY = new Vector2;
    prevMousePixelXY = new Vector2;
    downXY = new Vector2;
    downPixelXY = new Vector2;
    deltaXY = new Vector2;
    deltaPixelXY = new Vector2;
    deltaDownXY = new Vector2;
    deltaDownPixelXY = new Vector2;
    deltaDownPixelDistance = 0;
    deltaWheel = 0;
    deltaDragScrollX = 0;
    deltaScrollX = 0;
    deltaDragScrollY = 0;
    deltaScrollY = 0;
    isDragScrollingX = !1;
    isDragScrollingY = !1;
    isWheelScrolling = !1;
    canDesktopDragScroll = !1;
    needsCheckDragScrollDirection = !1;
    lastScrollXDirection = 0;
    lastScrollYDirection = 0;
    easedMouseDynamics = {};
    dragScrollDynamic;
    downThroughElems = [];
    currThroughElems = [];
    prevThroughElems = [];
    clickThroughElems = [];
    preInit() {
        const e = document;
        e.addEventListener("mousedown", this._onDown.bind(this)),
        e.addEventListener("touchstart", this._getTouchBound(this, this._onDown)),
        e.addEventListener("mousemove", this._onMove.bind(this)),
        e.addEventListener("touchmove", this._getTouchBound(this, this._onMove)),
        e.addEventListener("mouseup", this._onUp.bind(this)),
        e.addEventListener("touchend", this._getTouchBound(this, this._onUp)),
        e.addEventListener("wheel", this._onWheel.bind(this)),
        e.addEventListener("mousewheel", this._onWheel.bind(this)),
        this.addEasedInput("default", 1.35, .5, 1.25),
        this.dragScrollDynamic = this.addEasedInput("dragScroll", 1, 3, 1),
        this.onUped.addOnce( () => {
            properties.onFirstClicked.dispatch()
        }
        )
    }
    init() {}
    resize() {
        for (let e in this.easedMouseDynamics)
            this.easedMouseDynamics[e].reset()
    }
    update(e) {
        for (let t in this.easedMouseDynamics) {
            let i = this.easedMouseDynamics[t];
            i.target.copy(this.mouseXY),
            i.update(e)
        }
    }
    addEasedInput(e, t=1.5, i=.8, n=2) {
        return this.easedMouseDynamics[e] = new SecondOrderDynamics(new Vector2,t,i,n)
    }
    postUpdate(e) {
        this.prevThroughElems.length = 0,
        this.prevThroughElems.concat(this.currThroughElems),
        this.deltaWheel = 0,
        this.deltaDragScrollX = 0,
        this.deltaDragScrollY = 0,
        this.deltaScrollX = 0,
        this.deltaScrollY = 0,
        this.deltaXY.set(0, 0),
        this.deltaPixelXY.set(0, 0),
        this.prevMouseXY.copy(this.mouseXY),
        this.prevMousePixelXY.copy(this.mousePixelXY),
        this.hadMoved = this.hasMoved,
        this.wasDown = this.isDown,
        this.justClicked = !1,
        this.isWheelScrolling = !1
    }
    _onWheel(e) {
        let t = normalizeWheel$1(e).pixelY;
        t = math.clamp(t, -200, 200),
        this.deltaWheel += t,
        this.deltaScrollX = this.deltaDragScrollX + this.deltaWheel,
        this.deltaScrollY = this.deltaDragScrollY + this.deltaWheel,
        this.lastScrollXDirection = this.deltaWheel > 0 ? 1 : -1,
        this.lastScrollYDirection = this.deltaWheel > 0 ? 1 : -1,
        this.isWheelScrolling = !0,
        this.onWheeled.dispatch(e.target),
        this.onXScrolled.dispatch(e.target),
        this.onYScrolled.dispatch(e.target)
    }
    _onDown(e) {
        this.isDown = !0,
        this.downTime = +new Date,
        this.prevThroughElems.length = 0,
        this._setThroughElementsByEvent(e, this.downThroughElems),
        this._getInputXY(e, this.downXY),
        this._getInputPixelXY(e, this.downPixelXY),
        this._prevMouseXY.copy(this.downXY),
        this._prevMousePixelXY.copy(this.downPixelXY),
        this.deltaXY.set(0, 0),
        this.deltaPixelXY.set(0, 0),
        this._getInputXY(e, this.mouseXY),
        this.dragScrollDynamic.reset(this.mouseXY),
        this.isDragScrollingX = !1,
        this.isDragScrollingY = !1,
        this.needsCheckDragScrollDirection = !1,
        this._onMove(e),
        this.onDowned.dispatch(e),
        this.needsCheckDragScrollDirection = !0
    }
    _onMove(e) {
        this._getInputXY(e, this.mouseXY),
        this._getInputPixelXY(e, this.mousePixelXY),
        this.deltaXY.copy(this.mouseXY).sub(this._prevMouseXY),
        this.deltaPixelXY.copy(this.mousePixelXY).sub(this._prevMousePixelXY),
        this._prevMouseXY.copy(this.mouseXY),
        this._prevMousePixelXY.copy(this.mousePixelXY),
        this.hasMoved = this.deltaXY.length() > 0,
        this.isDown && (this.deltaDownXY.copy(this.mouseXY).sub(this.downXY),
        this.deltaDownPixelXY.copy(this.mousePixelXY).sub(this.downPixelXY),
        this.deltaDownPixelDistance = this.deltaDownPixelXY.length(),
        (browser$1.isMobile || this.canDesktopDragScroll) && (this.needsCheckDragScrollDirection && (this.isDragScrollingX = Math.abs(this.deltaPixelXY.x) > Math.abs(this.deltaPixelXY.y),
        this.isDragScrollingY = !this.isDragScrollingX,
        this.needsCheckDragScrollDirection = !1),
        this.isDragScrollingX && (this.deltaDragScrollX += -this.deltaPixelXY.x,
        this.deltaScrollX += -this.deltaPixelXY.x + this.deltaWheel,
        this.lastScrollXDirection = this.deltaDragScrollX > 0 ? 1 : -1,
        this.onXScrolled.dispatch(e.target)),
        this.isDragScrollingY && (this.deltaDragScrollY += -this.deltaPixelXY.y,
        this.deltaScrollY += -this.deltaPixelXY.y + this.deltaWheel,
        this.lastScrollYDirection = this.deltaDragScrollY > 0 ? 1 : -1,
        this.onYScrolled.dispatch(e.target)))),
        this._setThroughElementsByEvent(e, this.currThroughElems),
        this.onMoved.dispatch(e)
    }
    _onUp(e) {
        const t = e.clientX - this.downPixelXY.x
          , i = e.clientY - this.downPixelXY.y;
        Math.sqrt(t * t + i * i) < 40 && +new Date - this.downTime < 300 && (this._setThroughElementsByEvent(e, this.clickThroughElems),
        this._getInputXY(e, this.mouseXY),
        this.hasClicked = !0,
        this.justClicked = !0,
        this.onClicked.dispatch(e)),
        this.deltaDownXY.set(0, 0),
        this.deltaDownPixelXY.set(0, 0),
        this.deltaDownPixelDistance = 0,
        this.isDown = !1,
        this.needsCheckDragScrollDirection = !1,
        this.onUped.dispatch(e)
    }
    _getTouchBound(e, t, i) {
        return function(n) {
            i && n.preventDefault && n.preventDefault(),
            t.call(e, n.changedTouches[0] || n.touches[0])
        }
    }
    _getInputXY(e, t) {
        return t.set(e.clientX / properties.viewportWidth * 2 - 1, 1 - e.clientY / properties.viewportHeight * 2),
        t
    }
    _getInputPixelXY(e, t) {
        t.set(e.clientX, e.clientY)
    }
    _setThroughElementsByEvent(e, t) {
        let i = e.target;
        for (t.length = 0; i.parentNode; )
            t.push(i),
            i = i.parentNode
    }
    hasThroughElem(e, t) {
        let i = this[t + "ThroughElems"] || this.currThroughElems
          , n = i.length;
        for (; n--; )
            if (i[n] === e)
                return !0;
        return !1
    }
    hasThroughElemWithClass(e, t) {
        let i = this[t + "ThroughElems"] || this.currThroughElems
          , n = i.length;
        for (; n--; )
            if (i[n].classList.contains(e))
                return i[n];
        return null
    }
}
const input = new Input;
class ScrollDomRange {
    constructor(e, t) {
        let i = Array.isArray(e);
        this.refDomFrom = i ? e[0] : e,
        this.refDomTo = i ? e[1] : e,
        this.isVertical = t,
        this.needsUpdate = !0,
        this.forcedUpdate = !0,
        this.screenX = 0,
        this.screenY = 0,
        this.ratio = 0,
        this.screenRatio = 0,
        this.isActive = !1,
        this._left = 0,
        this._right = 0,
        this._top = 0,
        this._bottom = 0,
        this.left = 0,
        this.right = 0,
        this.top = 0,
        this.bottom = 0,
        this.width = 0,
        this.height = 0,
        this.showScreenOffset = 0,
        this.hideScreenOffset = 0
    }
    update(e, t, i, n) {
        if (n = n || this.needsUpdate,
        n) {
            let a = this.refDomFrom.getBoundingClientRect()
              , c = this.refDomFrom === this.refDomTo ? a : this.refDomTo.getBoundingClientRect();
            this.needsUpdate = !1,
            this._left = a.left,
            this._right = c.right,
            this._top = a.top,
            this._bottom = c.bottom,
            this.width = c.right - a.left,
            this.height = c.bottom - a.top,
            this.forcedUpdate = !1,
            this.isVertical ? (this._top += e,
            this._bottom += e) : (this._left += e,
            this._right += e)
        }
        this.left = this._left,
        this.right = this._right,
        this.top = this._top,
        this.bottom = this._bottom,
        this.isVertical ? (this.top += i,
        this.bottom += i) : (this.left += i,
        this.right += i),
        this.screenX = this.left,
        this.screenY = this.top;
        let r;
        this.isVertical ? r = this.screenY -= e : r = this.screenX -= e;
        let o = this.isVertical ? this.height : this.width;
        this.ratio = Math.min(0, math.unClampedFit(r, t, t - o, -1, 0)),
        this.ratio += Math.max(0, math.unClampedFit(r, 0, -o, 0, 1)),
        this.screenRatio = math.fit(r, t, -o, -1, 1),
        this.showScreenOffset = -(r - t) / t,
        this.hideScreenOffset = -(r + o) / t,
        this.isActive = this.ratio >= -1 && this.ratio <= 1
    }
}
let instances = [];
class Tween {
    constructor(e, t) {
        this.target = e,
        this.fromProperties = {},
        this.toProperties = {},
        this.onComplete = t,
        this.t = 0,
        this.duration = 0,
        this.autoUpdate = !0,
        instances.push(this)
    }
    static autoUpdate(e) {
        for (let t = 0; t < instances.length; t++) {
            let i = instances[t];
            i.autoUpdate && i.update(e)
        }
    }
    restart() {
        this.isActive = !0,
        this.t = 0
    }
    kill() {
        this.t = this.duration
    }
    to(e, t, i=null) {
        let n = {};
        for (let r in t)
            n[r] = this.target[r];
        this.fromTo(e, n, t, i)
    }
    fromTo(e, t, i, n) {
        this.duration = e,
        this.ease = n,
        this.fromProperties = t,
        this.toProperties = i,
        this.restart(),
        this.update(0, this.duration == 0)
    }
    update(e=0, t=!1) {
        if (this.t < this.duration || t) {
            this.t = Math.min(this.duration, this.t + e);
            let i = this.t / this.duration;
            this.ease && (i = this.ease(i));
            for (let n in this.toProperties)
                this.target[n] = math.mix(this.fromProperties[n], this.toProperties[n], i);
            this.t == this.duration && this.onComplete && this.onComplete()
        }
    }
}
class SiteHeader {
    isActive = !0;
    height = 0;
    contentHeightUnderTheHeader = 0;
    theme = "";
    navActiveIndex = -1;
    preInit() {
        this.domEl = document.getElementById("site-header"),
        this.domNav1ItemList = this.domEl.querySelectorAll("#site-header__nav-list-01 .site-header__nav-item"),
        this.domMenuButton = this.domEl.querySelector("#site-header__button-menu"),
        this.domMenuButton.addEventListener("click", () => {
            document.documentElement.classList.toggle("menu-active")
        }
        )
    }
    init() {}
    show() {}
    hide() {}
    setNavActive(e) {
        this.navActiveIndex >= 0 && this.domNav1ItemList[this.navActiveIndex].classList.remove("is-active");
        for (let t = 0; t < this.domNav1ItemList.length; t++)
            if (this.domNav1ItemList[t].dataset.id === e) {
                this.navActiveIndex = t,
                this.domNav1ItemList[t].classList.add("is-active");
                break
            }
    }
    useTheme(e=!0) {
        this.theme !== e && (this.theme = e,
        document.documentElement.classList.remove("theme-dark"),
        document.documentElement.classList.remove("theme-light"),
        document.documentElement.classList.add(`theme-${e}`))
    }
    resize(e, t) {
        const i = this.domEl.getBoundingClientRect();
        this.top = i.top,
        this.height = i.height,
        properties.contentHeightUnderTheHeader = this.contentHeightUnderTheHeader = t - i.y - i.height,
        properties.headerHeight = i.height
    }
    update(e) {}
}
const siteHeader = new SiteHeader;
class SiteMenu {
    isActive = !0;
    height = 0;
    contentHeightUnderTheHeader = 0;
    theme = "";
    navActiveIndex = -1;
    preInit() {
        this.domEl = document.getElementById("site-menu"),
        this.domNav1ItemList = this.domEl.querySelectorAll("#site-menu__nav-01 li"),
        this.menuLinks = [...[...this.domNav1ItemList].map(e => e.querySelector("a")), document.querySelector("#site-menu__btn-1"), document.querySelector("#site-header__logo")],
        this.menuLinks.forEach(e => {
            e.addEventListener("click", t => {
                const i = e.getAttribute("href")
                  , n = window.location.pathname;
                i === n && (t.preventDefault(),
                document.documentElement.classList.remove("menu-active"))
            }
            )
        }
        )
    }
    init() {}
    show() {}
    hide() {}
    setNavActive(e) {
        this.navActiveIndex >= 0 && this.domNav1ItemList[this.navActiveIndex].classList.remove("is-active");
        for (let t = 0; t < this.domNav1ItemList.length; t++)
            if (this.domNav1ItemList[t].dataset.id === e) {
                this.navActiveIndex = t,
                this.domNav1ItemList[t].classList.add("is-active");
                break
            }
    }
    update(e) {}
}
const siteMenu = new SiteMenu
  , blitVert = `#define GLSLIFY 1
attribute vec2 position;
varying vec2 v_uv;

void main() {
    v_uv = position * 0.5 + 0.5;
    gl_Position = vec4(position, 0.0, 1.0);
}
`
  , blitFrag = `#define GLSLIFY 1
uniform sampler2D u_texture;
varying vec2 v_uv;
void main () {
    gl_FragColor = texture2D(u_texture, v_uv);
}
`
  , clearFrag = `#define GLSLIFY 1
uniform vec4 u_color;

varying vec2 v_uv;

void main () {
    gl_FragColor = u_color;
}
`;
class FboHelper {
    isWebGL2;
    renderer;
    quadGeom;
    triGeom;
    floatType;
    precisionPrefix;
    precisionPrefix2;
    vertexShader;
    _scene;
    _camera;
    _tri;
    copyMaterial;
    clearMaterial;
    init(e, t) {
        this.renderer = e,
        this.floatType = t,
        this.isWebGL2 = this.renderer.capabilities.isWebGL2,
        this._scene = new Scene,
        this._camera = new Camera,
        this._camera.position.z = 1,
        this.triGeom = new BufferGeometry,
        this.triGeom.setAttribute("position", new BufferAttribute(new Float32Array([-1, -1, 0, 4, -1, 0, -1, 4, 0]),3)),
        this.quadGeom = new PlaneGeometry(2,2),
        this._tri = new Mesh(this.triGeom),
        this._tri.frustumCulled = !1,
        this._scene.add(this._tri),
        this.precisionPrefix = `precision ${this.renderer.capabilities.precision} float;
`,
        this.precisionPrefix2 = `#version 300 es
			precision ${this.renderer.capabilities.precision} float;
			precision ${this.renderer.capabilities.precision} int;
			#define IS_WEBGL2 true
		`,
        this.isWebGL2 ? (this.vertexPrefix = `${this.precisionPrefix2}
				precision mediump sampler2DArray;
				#define attribute in
				#define varying out
				#define texture2D texture
			`,
        this.fragmentPrefix = `${this.precisionPrefix2}
				#define varying in
				out highp vec4 pc_fragColor;
				#define gl_FragColor pc_fragColor
				#define gl_FragDepthEXT gl_FragDepth
				#define texture2D texture
				#define textureCube texture
				#define texture2DProj textureProj
				#define texture2DLodEXT textureLod
				#define texture2DProjLodEXT textureProjLod
				#define textureCubeLodEXT textureLod
				#define texture2DGradEXT textureGrad
				#define texture2DProjGradEXT textureProjGrad
				#define textureCubeGradEXT textureGrad
			`) : (this.vertexPrefix = this.precisionPrefix,
        this.fragmentPrefix = this.precisionPrefix),
        this.renderer.getContext().getExtension("OES_standard_derivatives"),
        this.vertexShader = this.precisionPrefix + blitVert,
        this.copyMaterial = new RawShaderMaterial({
            uniforms: {
                u_texture: {
                    value: null
                }
            },
            vertexShader: this.vertexShader,
            fragmentShader: this.precisionPrefix + blitFrag,
            depthTest: !1,
            depthWrite: !1,
            blending: NoBlending
        }),
        this.clearMaterial = new RawShaderMaterial({
            uniforms: {
                u_color: {
                    value: new Vector4(1,1,1,1)
                }
            },
            vertexShader: this.vertexShader,
            fragmentShader: this.precisionPrefix + clearFrag,
            depthTest: !1,
            depthWrite: !1,
            blending: NoBlending
        })
    }
    copy(e, t) {
        const i = this.copyMaterial;
        i && (i.uniforms.u_texture.value = e,
        this.render(i, t))
    }
    render(e, t) {
        this._tri && this.renderer && this._scene && this._camera && (this._tri.material = e,
        t && this.renderer.setRenderTarget(t),
        this.renderer.render(this._scene, this._camera),
        t && this.renderer.setRenderTarget(null))
    }
    clearColor(e, t, i, n, r) {
        this.clearMaterial && (this.clearMaterial.uniforms.u_color.value.set(e, t, i, n),
        this.render(this.clearMaterial, r))
    }
    getColorState() {
        if (!this.renderer)
            return {
                autoClear: !0,
                autoClearColor: !0,
                autoClearStencil: !0,
                autoClearDepth: !0,
                clearColor: 0,
                clearAlpha: 1
            };
        const e = new Color;
        return this.renderer.getClearColor(e),
        {
            autoClear: this.renderer.autoClear,
            autoClearColor: this.renderer.autoClearColor,
            autoClearStencil: this.renderer.autoClearStencil,
            autoClearDepth: this.renderer.autoClearDepth,
            clearColor: e.getHex(),
            clearAlpha: this.renderer.getClearAlpha()
        }
    }
    setColorState(e) {
        this.renderer && (this.renderer.setClearColor(e.clearColor, e.clearAlpha),
        this.renderer.autoClear = e.autoClear,
        this.renderer.autoClearColor = e.autoClearColor,
        this.renderer.autoClearStencil = e.autoClearStencil,
        this.renderer.autoClearDepth = e.autoClearDepth)
    }
    createRawShaderMaterial(e) {
        return e = Object.assign({
            depthTest: !1,
            depthWrite: !1,
            blending: NoBlending,
            vertexShader: blitVert,
            fragmentShader: blitFrag,
            derivatives: !1
        }, e),
        e.vertexShader = (e.vertexShaderPrefix ? e.vertexShaderPrefix : e.derivatives ? this.vertexPrefix : this.precisionPrefix) + e.vertexShader,
        e.fragmentShader = (e.fragmentShaderPrefix ? e.fragmentShaderPrefix : e.derivatives ? this.fragmentPrefix : this.precisionPrefix) + e.fragmentShader,
        delete e.vertexShaderPrefix,
        delete e.fragmentShaderPrefix,
        delete e.derivatives,
        new RawShaderMaterial(e)
    }
    createDataTexture(e, t, i, n=!1, r=!0) {
        let o = new DataTexture(e,t,i,RGBAFormat,n ? FloatType : UnsignedByteType,UVMapping,ClampToEdgeWrapping,ClampToEdgeWrapping,r ? NearestFilter : LinearFilter,r ? NearestFilter : LinearFilter,0);
        return o.needsUpdate = !0,
        o
    }
    createRenderTarget(e, t, i=!1, n=!1, r=0) {
        return new WebGLRenderTarget(e,t,{
            wrapS: ClampToEdgeWrapping,
            wrapT: ClampToEdgeWrapping,
            magFilter: i ? NearestFilter : LinearFilter,
            minFilter: i ? NearestFilter : LinearFilter,
            type: n ? this.floatType : UnsignedByteType,
            anisotropy: 0,
            encoding: LinearEncoding,
            depthBuffer: !1,
            stencilBuffer: !1,
            samples: browser$1.isSupportMSAA ? r : 0
        })
    }
    createMultisampleRenderTarget(e, t, i=!1, n=!1, r=8) {
        return !(this.renderer && this.isWebGL2) || !browser$1.isSupportMSAA ? this.createRenderTarget(e, t, i, n) : new WebGLRenderTarget(e,t,{
            wrapS: ClampToEdgeWrapping,
            wrapT: ClampToEdgeWrapping,
            magFilter: i ? NearestFilter : LinearFilter,
            minFilter: i ? NearestFilter : LinearFilter,
            type: n ? this.floatType : UnsignedByteType,
            anisotropy: 0,
            encoding: LinearEncoding,
            depthBuffer: !1,
            stencilBuffer: !1,
            samples: browser$1.isSupportMSAA ? r : 0
        })
    }
    clearMultisampleRenderTargetState(e) {
        if (e = e || this.renderer.getRenderTarget(),
        e && e.samples > 0) {
            const t = this.renderer.properties.get(e);
            let i = this.renderer.getContext();
            i.bindFramebuffer(i.READ_FRAMEBUFFER, t.__webglMultisampledFramebuffer),
            i.bindFramebuffer(i.DRAW_FRAMEBUFFER, t.__webglFramebuffer);
            const n = e.width
              , r = e.height;
            let o = i.COLOR_BUFFER_BIT;
            e.depthBuffer && (o |= i.DEPTH_BUFFER_BIT),
            e.stencilBuffer && (o |= i.STENCIL_BUFFER_BIT),
            i.blitFramebuffer(0, 0, n, r, 0, 0, n, r, o, i.NEAREST),
            i.bindFramebuffer(i.FRAMEBUFFER, t.__webglMultisampledFramebuffer)
        }
    }
}
const fboHelper = new FboHelper
  , ufxVert = `#define GLSLIFY 1
uniform vec3 u_position;
uniform vec4 u_quaternion;
uniform vec3 u_scale;

uniform vec2 u_domXY;
uniform vec2 u_domWH;
uniform vec2 u_domPivot;
uniform vec4 u_domPadding;

vec3 qrotate(vec4 q, vec3 v) {
	return v + 2. * cross(q.xyz, cross(q.xyz, v) + q.w * v);
}

vec3 getBasePosition (in vec3 pos) {
	vec3 basePos = vec3((pos.xy) * u_domWH - u_domPivot, pos.z);
	basePos.xy += mix(-u_domPadding.xz, u_domPadding.yw, pos.xy);
	return basePos;
}

vec3 getScreenPosition (in vec3 basePos) {
	vec3 screenPos = qrotate(u_quaternion, basePos * u_scale) + vec3(u_domPivot.xy, 0.);
	screenPos = (screenPos + vec3(u_domXY.xy,0.) + u_position) * vec3(1.,-1.,1.);
	return screenPos;
}

vec2 padUv (in vec2 uv) {
	vec2 paddedUv = uv + mix(-u_domPadding.xz, u_domPadding.yw, uv) / u_domWH;
	paddedUv.y = 1. - paddedUv.y;
	return paddedUv;
}
`
  , quadVert = `#define GLSLIFY 1
#include <ufxVert>

varying vec2 v_uv;

void main () {
	vec3 basePos = getBasePosition(position);
	vec3 screenPos = getScreenPosition(basePos);
	gl_Position = projectionMatrix * modelViewMatrix * vec4( screenPos, 1.0 );
	v_uv = padUv(uv);
}
`
  , quadFrag = `#define GLSLIFY 1
uniform sampler2D u_bgTexture;
uniform vec2 u_resolution;

uniform sampler2D u_texture;

varying vec2 v_uv;

void main () {
	// read bg texture if requireBg is true
	vec2 bgUv = gl_FragCoord.xy / u_resolution;
	vec4 bgColor = texture2D(u_bgTexture, bgUv);

	float imagePaddingThreshold = max(abs(v_uv.x-.5), abs(v_uv.y-.5));
	float imageAlpha = smoothstep(0.5, 0.5 - fwidth(imagePaddingThreshold), imagePaddingThreshold);
	vec4 image = texture2D(u_texture, v_uv);
	image.a *= imageAlpha;

	gl_FragColor.rgb = mix(bgColor.rgb, image.rgb, image.a);
	gl_FragColor.a = image.a;
}
`;
let _c0 = new Color
  , _c1$1 = new Color;
class PostProfile {
    bloomAmount = 15;
    bloomRadius = 1;
    bloomThreshold = .1;
    bloomSmoothWidth = 1;
    bloomLumaStrength = 0;
    bloomSelectiveStrength = 1;
    bloomSaturation = 1;
    haloWidth = .75;
    haloRGBShift = .03;
    haloLeftColorHex = "#ff0000";
    haloMidColorHex = "#00ff00";
    haloRightColorHex = "#0000ff";
    haloStrength = 0;
    haloMaskInner = .3;
    haloMaskOuter = .5;
    constructor(e={}) {
        Object.assign(this, e)
    }
    blend(e, t=0) {
        t = math.saturate(t);
        for (let i in e)
            if (this.hasOwnProperty(i)) {
                let n = e[i];
                n !== this[i] && (typeof this[i] == "string" ? this[i] = "#" + _c0.setStyle(this[i]).lerp(_c1$1.setStyle(n), t).getHexString() : typeof this[i] == "number" && (this[i] = math.mix(this[i], n, t)))
            }
    }
}
class PostEffect {
    sharedUniforms = {};
    enabled = !0;
    material = null;
    renderOrder = 0;
    _hasShownWarning = !1;
    init(e) {
        Object.assign(this, e)
    }
    needsRender() {
        return !0
    }
    warn(e) {
        this._hasShownWarning || (console.warn(e),
        this._hasShownWarning = !0)
    }
    render(e, t=!1) {
        this.material.uniforms.u_texture && (this.material.uniforms.u_texture.value = e.fromTexture),
        fboHelper.render(this.material, t ? null : e.toRenderTarget),
        e.swap()
    }
}
const frag$3 = `#define GLSLIFY 1
varying vec2 v_uv;
uniform sampler2D u_texture;

uniform sampler2D u_blurTexture0;
uniform sampler2D u_blurTexture1;
uniform sampler2D u_blurTexture2;
uniform sampler2D u_blurTexture3;
uniform sampler2D u_blurTexture4;

uniform float u_bloomWeights[ITERATION];
uniform float u_saturation;

#include <common>

vec3 dithering( vec3 color ) {
	float grid_position = rand( gl_FragCoord.xy );
	vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
	dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
	return color + dither_shift_RGB;
}

void main() {
	vec4 color = texture2D(u_texture, v_uv);

	vec3 bloomColor = (
		u_bloomWeights[0] * texture2D(u_blurTexture0, v_uv)
		+ u_bloomWeights[1] * texture2D(u_blurTexture1, v_uv)
		+ u_bloomWeights[2] * texture2D(u_blurTexture2, v_uv)
		+ u_bloomWeights[3] * texture2D(u_blurTexture3, v_uv)
		+ u_bloomWeights[4] * texture2D(u_blurTexture4, v_uv)
	).rgb;

	float luma = dot(bloomColor, vec3(0.299, 0.587, 0.114));
	color.rgb += mix(vec3(luma), bloomColor, u_saturation);
	color.rgb = dithering(color.rgb);
    gl_FragColor = color;
}
`
  , highPassFrag = `#define GLSLIFY 1
uniform sampler2D u_texture;

uniform float u_luminosityThreshold;
uniform float u_smoothWidth;
uniform float u_lumaStrength;
uniform float u_selectiveStrength;

#ifdef USE_HALO
uniform vec2 u_texelSize;
uniform vec2 u_aspect;
uniform float u_haloWidth;
uniform float u_haloRGBShift;
uniform vec3 u_haloLeftColor;
uniform vec3 u_haloMidColor;
uniform vec3 u_haloRightColor;
uniform float u_haloStrength;
uniform float u_haloMaskInner;
uniform float u_haloMaskOuter;
#endif

varying vec2 v_uv;

void main() {
	vec2 uv = v_uv;

	vec4 texel = texture2D( u_texture, uv );
	float luma = dot( texel.xyz, vec3( 0.299, 0.587, 0.114 ) );
	float alpha = smoothstep( u_luminosityThreshold, u_luminosityThreshold + u_smoothWidth, luma );

	vec3 color = texel.rgb * (alpha * u_lumaStrength + texel.a * u_selectiveStrength);

	gl_FragColor = vec4(color, 1.0);

	#ifdef USE_HALO
		vec2 toCenter = (uv - 0.5) * u_aspect;

		vec2 ghostUv = 1.0 - (toCenter + 0.5);
		vec2 ghostVec = (vec2(0.5) - ghostUv);

		vec2 direction = normalize(ghostVec);
		vec2 haloVec = direction * u_haloWidth;
		float weight = length(vec2(0.5) - fract(ghostUv + haloVec));
		weight = pow(1.0 - weight, 3.0);

		vec3 distortion = vec3(-u_texelSize.x, 0.0, u_texelSize.x) * u_haloRGBShift;
		float zoomBlurRatio = fract(atan(toCenter.y, toCenter.x) * 40.0) * 0.05 + 0.95;
		ghostUv *= zoomBlurRatio;
		vec2 haloUv = ghostUv + haloVec;

		vec3 halo = (
			texture2D(u_texture, haloUv + direction * distortion.r).rgb * u_haloLeftColor +
			texture2D(u_texture, haloUv + direction * distortion.g).rgb * u_haloMidColor +
			texture2D(u_texture, haloUv + direction * distortion.b).rgb * u_haloRightColor
		) * u_haloStrength * smoothstep(u_haloMaskInner, u_haloMaskOuter, length(toCenter));

		#ifdef USE_LENS_DIRT
		vec2 dirtUv = (uv - 0.5) * u_dirtAspect + 0.5;

		vec3 dirt = texture2D(u_dirtTexture, dirtUv).rgb;
		gl_FragColor.rgb += (halo + alpha + 0.05 * dirt) * dirt;
		#else
		gl_FragColor.rgb += halo;
		#endif

	#endif

}
`
  , blurFrag = `#define GLSLIFY 1
varying vec2 v_uv;
uniform sampler2D u_texture;
uniform vec2 u_resolution;
uniform vec2 u_direction;

float gaussianPdf(in float x, in float sigma) {
  return 0.39894 * exp( -0.5 * x * x/( sigma * sigma))/sigma;
}

void main() {
  vec2 invSize = 1.0 / u_resolution;
  float fSigma = float(SIGMA);
  float weightSum = gaussianPdf(0.0, fSigma);
  vec3 diffuseSum = texture2D( u_texture, v_uv).rgb * weightSum;
  for( int i = 1; i < KERNEL_RADIUS; i ++ ) {
    float x = float(i);
    float w = gaussianPdf(x, fSigma);
    vec2 uvOffset = u_direction * invSize * x;
    vec3 sample1 = texture2D( u_texture, v_uv + uvOffset).rgb;
    vec3 sample2 = texture2D( u_texture, v_uv - uvOffset).rgb;
    diffuseSum += (sample1 + sample2) * w;
    weightSum += 2.0 * w;
  }
  gl_FragColor = vec4(diffuseSum/weightSum, 1.0);
}
`;
class Bloom extends PostEffect {
    ITERATION = 5;
    USE_HD = !0;
    amount = 1;
    radius = 0;
    threshold = .1;
    smoothWidth = 1;
    lumaStrength = .5;
    selectiveStrength = 1;
    saturation = 1;
    haloWidth = .8;
    haloRGBShift = .03;
    haloStrength = .21;
    haloLeftColorHex = "#ff0000";
    haloMidColorHex = "#00ff00";
    haloRightColorHex = "#0000ff";
    haloLeftColor = new Color;
    haloMidColor = new Color;
    haloRightColor = new Color;
    haloMaskInner = .3;
    haloMaskOuter = .5;
    highPassMaterial;
    highPassRenderTarget;
    fftMaterial;
    srcMaterial;
    srcSize = 256;
    srcRT;
    renderTargetsHorizontal = [];
    renderTargetsVertical = [];
    blurMaterials = [];
    directionX = new Vector2(1,0);
    directionY = new Vector2(0,1);
    init(e) {
        Object.assign(this, e),
        super.init();
        let t = this.USE_HD ? HalfFloatType : !1;
        this.highPassRenderTarget = fboHelper.createRenderTarget(1, 1, !this.USE_HD, t),
        this.highPassMaterial = fboHelper.createRawShaderMaterial({
            uniforms: {
                u_texture: {
                    value: null
                },
                u_luminosityThreshold: {
                    value: 1
                },
                u_smoothWidth: {
                    value: 1
                },
                u_lumaStrength: {
                    value: 1
                },
                u_selectiveStrength: {
                    value: 1
                },
                u_haloWidth: {
                    value: 1
                },
                u_haloRGBShift: {
                    value: 1
                },
                u_haloLeftColor: {
                    value: this.haloLeftColor
                },
                u_haloMidColor: {
                    value: this.haloMidColor
                },
                u_haloRightColor: {
                    value: this.haloRightColor
                },
                u_haloStrength: {
                    value: 1
                },
                u_haloMaskInner: {
                    value: 1
                },
                u_haloMaskOuter: {
                    value: 1
                },
                u_texelSize: null,
                u_aspect: {
                    value: new Vector2
                },
                u_dirtTexture: {
                    value: null
                },
                u_dirtAspect: {
                    value: new Vector2
                }
            },
            fragmentShader: highPassFrag
        });
        for (let i = 0; i < this.ITERATION; i++) {
            this.renderTargetsHorizontal.push(fboHelper.createRenderTarget(1, 1, !1, t)),
            this.renderTargetsVertical.push(fboHelper.createRenderTarget(1, 1, !1, t));
            let n = 3 + i * 2;
            this.blurMaterials[i] = fboHelper.createRawShaderMaterial({
                uniforms: {
                    u_texture: {
                        value: null
                    },
                    u_resolution: {
                        value: new Vector2
                    },
                    u_direction: {
                        value: null
                    }
                },
                fragmentShader: blurFrag,
                defines: {
                    KERNEL_RADIUS: n,
                    SIGMA: n
                }
            })
        }
        this.material = fboHelper.createRawShaderMaterial({
            uniforms: {
                u_texture: {
                    value: null
                },
                u_bloomStrength: {
                    value: 1
                },
                u_bloomWeights: {
                    value: []
                },
                u_saturation: {
                    value: 0
                }
            },
            fragmentShader: frag$3,
            blending: NoBlending,
            defines: {
                ITERATION: this.ITERATION
            }
        });
        for (let i = 0; i < this.ITERATION; i++)
            this.material.uniforms["u_blurTexture" + i] = {
                value: this.renderTargetsVertical[i].texture
            }
    }
    setDirtTexture(e) {
        this.highPassMaterial.uniforms.u_dirtTexture.value = e
    }
    dispose() {
        this.highPassRenderTarget && this.highPassRenderTarget.dispose();
        for (let e = 0; e < this.ITERATION; e++)
            this.renderTargetsHorizontal[e] && this.renderTargetsHorizontal[e].dispose(),
            this.renderTargetsVertical[e] && this.renderTargetsVertical[e].dispose()
    }
    needsRender() {
        return !!this.amount
    }
    renderFFT(e, t, i) {
        let n = e.width
          , r = e.height
          , o = Math.round(Math.log(n) / Math.log(2))
          , a = Math.round(Math.log(r) / Math.log(2))
          , c = o + a
          , l = c % 2 === 0
          , u = this.fftMaterial
          , h = u.uniforms;
        for (let d = 0; d < c; d++) {
            let m = d < o;
            h.u_texture.value = e.texture,
            h.u_normalization.value = d === 0 ? 1 / Math.sqrt(n * r) : 1,
            h.u_isHorizontal.value = !!m,
            h.u_isForward.value = !!i,
            h.u_texelSize.value.set(1 / n, 1 / r),
            h.u_subtransformSize.value = Math.pow(2, (m ? d : d - o) + 1),
            fboHelper.render(u, t);
            let g = e;
            e = t,
            t = g
        }
        l && fboHelper.copy(e.texture, t)
    }
    render(e, t=!1) {
        let i = e.width, n = e.height, r, o;
        if (r = Math.ceil(i / 2),
        o = Math.ceil(n / 2),
        r !== this.highPassRenderTarget.width || o !== this.highPassRenderTarget.height) {
            this.highPassRenderTarget.setSize(r, o);
            for (let x = 0; x < this.ITERATION; x++)
                this.renderTargetsHorizontal[x].setSize(r, o),
                this.renderTargetsVertical[x].setSize(r, o),
                this.blurMaterials[x].uniforms.u_resolution.value.set(r, o),
                r = Math.ceil(r / 2),
                o = Math.ceil(o / 2)
        }
        let a = this.highPassMaterial.uniforms;
        a.u_texture.value = e.fromTexture,
        a.u_luminosityThreshold.value = this.threshold,
        a.u_smoothWidth.value = this.smoothWidth,
        a.u_lumaStrength.value = this.lumaStrength,
        a.u_selectiveStrength.value = this.selectiveStrength,
        a.u_haloWidth.value = this.haloWidth,
        a.u_haloRGBShift.value = this.haloRGBShift * i;
        let c = this.haloLeftColor.setStyle(this.haloLeftColorHex)
          , l = this.haloMidColor.setStyle(this.haloMidColorHex)
          , u = this.haloRightColor.setStyle(this.haloRightColorHex)
          , h = c.r + l.r + u.r
          , d = c.g + l.g + u.g
          , m = c.b + l.b + u.b;
        c.r = h ? c.r / h : 1,
        c.g = d ? c.g / d : 0,
        c.b = m ? c.b / m : 0,
        l.r = h ? l.r / h : 0,
        l.g = d ? l.g / d : 1,
        l.b = m ? l.b / m : 0,
        u.r = h ? u.r / h : 0,
        u.g = d ? u.g / d : 0,
        u.b = m ? u.b / m : 1,
        a.u_haloStrength.value = this.haloStrength,
        a.u_haloMaskInner.value = this.haloMaskInner,
        a.u_haloMaskOuter.value = this.haloMaskOuter,
        a.u_texelSize = e.sharedUniforms.u_texelSize,
        a.u_aspect = e.sharedUniforms.u_aspect;
        let g = this.haloStrength > 0
          , p = n / Math.sqrt(i * i + n * n) * 2;
        a.u_aspect.value.set(i / n * p, p),
        p = n / Math.max(i, n),
        a.u_dirtAspect.value.set(i / n * p, p),
        this.material.uniforms.u_saturation.value = this.saturation,
        this.highPassMaterial.defines.USE_HALO !== g && (this.highPassMaterial.defines.USE_HALO = g,
        this.highPassMaterial.needsUpdate = !0),
        fboHelper.render(this.highPassMaterial, this.highPassRenderTarget);
        let f = this.highPassRenderTarget;
        for (let x = 0; x < this.ITERATION; x++) {
            let S = this.blurMaterials[x];
            S.uniforms.u_texture.value = f.texture,
            S.uniforms.u_direction.value = this.directionX,
            fboHelper.render(S, this.renderTargetsHorizontal[x]),
            S.uniforms.u_texture.value = this.renderTargetsHorizontal[x].texture,
            S.uniforms.u_direction.value = this.directionY,
            fboHelper.render(S, this.renderTargetsVertical[x]),
            f = this.renderTargetsVertical[x]
        }
        this.material.uniforms.u_texture.value = e.fromTexture;
        for (let x = 0; x < this.ITERATION; x++) {
            let S = (this.ITERATION - x) / this.ITERATION;
            this.material.uniforms.u_bloomWeights.value[x] = this.amount * (S + (1.2 - S * 2) * this.radius) / Math.pow(2, this.ITERATION - x - 1)
        }
        super.render(e, t)
    }
}
const _c = new Color;
class Postprocessing {
    width = 1;
    height = 1;
    scene = null;
    camera = null;
    resolution = new Vector2(0,0);
    texelSize = new Vector2(0,0);
    aspect = new Vector2(1,1);
    onBeforeSceneRendered = new MinSignal$2;
    onAfterSceneRendered = new MinSignal$2;
    onAfterRendered = new MinSignal$2;
    sceneCacheRenderTarget = null;
    sceneCacheBlurCacheRenderTarget = null;
    sceneCacheBlurredRenderTarget = null;
    sceneCacheBlurredTextureSize = new Vector2(0,0);
    sceneRenderTarget = null;
    fromRenderTarget = null;
    toRenderTarget = null;
    useDepthTexture = !0;
    depthTexture = null;
    fromTexture = null;
    toTexture = null;
    sceneTexture = null;
    queue = [];
    hasSizeChanged = !0;
    useMSAA = !1;
    postProfile = new PostProfile;
    useFloatTexture = !1;
    sharedUniforms = {
        u_sceneTexture: {
            value: null
        },
        u_sceneCacheTexture: {
            value: null
        },
        u_sceneCacheBlurredTexture: {
            value: null
        },
        u_sceneCacheBlurredTextureSize: {
            value: this.sceneCacheBlurredTextureSize
        },
        u_fromTexture: {
            value: null
        },
        u_toTexture: {
            value: null
        },
        u_sceneDepthTexture: {
            value: null
        },
        u_cameraNear: {
            value: 0
        },
        u_cameraFar: {
            value: 1
        },
        u_cameraFovRad: {
            value: 1
        },
        u_resolution: {
            value: this.resolution
        },
        u_texelSize: {
            value: this.texelSize
        },
        u_aspect: {
            value: this.aspect
        }
    };
    init(e, t) {
        if (this.scene = e,
        this.camera = t,
        this.useMSAA ? this.sceneRenderTarget = fboHelper.createMultisampleRenderTarget(1, 1, !1, this.useFloatTexture) : this.sceneRenderTarget = fboHelper.createRenderTarget(1, 1, !1, this.useFloatTexture),
        this.sharedUniforms.u_sceneTexture.value = this.sceneRenderTarget.texture,
        this.sceneRenderTarget.depthBuffer = !0,
        this.useMSAA = this.sceneRenderTarget.samples > 0,
        this.fromRenderTarget = fboHelper.createRenderTarget(1, 1, !1, this.useFloatTexture),
        this.toRenderTarget = this.fromRenderTarget.clone(),
        this.useDepthTexture = !!this.useDepthTexture && fboHelper.renderer && (fboHelper.renderer.capabilities.isWebGL2 || fboHelper.renderer.extensions.get("WEBGL_depth_texture")),
        this.fromTexture = this.fromRenderTarget.texture,
        this.toTexture = this.toRenderTarget.texture,
        this.sceneTexture = this.sceneRenderTarget.texture,
        this.sceneCacheRenderTarget = this.fromRenderTarget.clone(),
        this.sceneCacheBlurCacheRenderTarget = this.fromRenderTarget.clone(),
        this.sceneCacheBlurredRenderTarget = this.fromRenderTarget.clone(),
        this.sharedUniforms.u_sceneCacheTexture.value = this.sceneCacheRenderTarget.texture,
        this.sharedUniforms.u_sceneCacheBlurredTexture.value = this.sceneCacheBlurredRenderTarget.texture,
        this.useDepthTexture && fboHelper.renderer) {
            let i = new DepthTexture(this.resolution.width,this.resolution.height);
            fboHelper.renderer.capabilities.isWebGL2 ? i.type = UnsignedIntType : (i.format = DepthStencilFormat,
            i.type = UnsignedInt248Type),
            i.minFilter = NearestFilter,
            i.magFilter = NearestFilter,
            this.sceneRenderTarget.depthTexture = i,
            this.depthTexture = this.sharedUniforms.u_sceneDepthTexture.value = i
        }
    }
    addQueue() {
        let e = this.bloom = new Bloom;
        !properties.renderer.extensions.get("OES_texture_float_linear") && !properties.renderer.extensions.get("OES_texture_half_float_linear") && (e.USE_HD = !1),
        e.init(),
        this.queue.push(e)
    }
    syncProfile() {
        let e = this.postProfile
          , t = this.bloom;
        t.amount = e.bloomAmount,
        t.radius = e.bloomRadius,
        t.threshold = e.bloomThreshold,
        t.smoothWidth = e.bloomSmoothWidth,
        t.lumaStrength = e.bloomLumaStrength,
        t.selectiveStrength = e.bloomSelectiveStrength,
        t.saturation = e.bloomSaturation,
        t.haloWidth = e.haloWidth,
        t.haloRGBShift = e.haloRGBShift,
        t.haloLeftColorHex = e.haloLeftColorHex,
        t.haloMidColorHex = e.haloMidColorHex,
        t.haloRightColorHex = e.haloRightColorHex,
        t.haloStrength = e.haloStrength,
        t.haloMaskInner = e.haloMaskInner,
        t.haloMaskOuter = e.haloMaskOuter
    }
    swap() {
        let e = this.fromRenderTarget;
        this.fromRenderTarget = this.toRenderTarget,
        this.toRenderTarget = e,
        this.fromTexture = this.fromRenderTarget.texture,
        this.toTexture = this.toRenderTarget.texture,
        this.sharedUniforms.u_fromTexture.value = this.fromTexture,
        this.sharedUniforms.u_toTexture.value = this.toTexture
    }
    setSize(e, t) {
        if (this.width !== e || this.height !== t) {
            this.hasSizeChanged = !0,
            this.width = e,
            this.height = t,
            this.resolution.set(e, t),
            this.texelSize.set(1 / e, 1 / t);
            let i = t / Math.sqrt(e * e + t * t) * 2;
            this.aspect.set(e / t * i, i),
            this.sceneRenderTarget.setSize(e, t),
            this.fromRenderTarget.setSize(e, t),
            this.toRenderTarget.setSize(e, t);
            let n = e >> 1
              , r = t >> 1;
            this.sceneCacheRenderTarget.setSize(e, t),
            this.sceneCacheBlurCacheRenderTarget.setSize(n, r),
            this.sceneCacheBlurredRenderTarget.setSize(n, r)
        }
    }
    dispose() {
        this.fromRenderTarget && this.fromRenderTarget.dispose(),
        this.toRenderTarget && this.toRenderTarget.dispose(),
        this.sceneRenderTarget && this.sceneRenderTarget.dispose()
    }
    blendProfile(e, t=0) {
        properties.skipProfileUpdate || this.postProfile.blend(e, t)
    }
    _filterQueue(e) {
        return e.enabled && e.needsRender()
    }
    render(e, t, i) {
        if (!fboHelper.renderer)
            return;
        this.scene = e,
        this.camera = t;
        let n = this.queue.filter(this._filterQueue)
          , r = this.sharedUniforms;
        if (n.sort( (o, a) => o.renderOrder == a.renderOrder ? 0 : o.renderOrder - a.renderOrder),
        r.u_sceneTexture.value = this.sceneRenderTarget.texture,
        r.u_cameraNear.value = t.near,
        r.u_cameraFar.value = t.far,
        r.u_cameraFovRad.value = t.fov / 180 * Math.PI,
        this.onBeforeSceneRendered.dispatch(),
        n.length) {
            _c.set(properties.bgColorHex),
            fboHelper.renderer.setClearColor(_c, properties.opacity),
            fboHelper.renderer.setRenderTarget(this.sceneRenderTarget),
            fboHelper.renderer.render(e, t),
            fboHelper.renderer.setRenderTarget(null),
            fboHelper.copy(this.sceneRenderTarget.texture, this.fromRenderTarget),
            this.onAfterSceneRendered.dispatch(this.sceneRenderTarget);
            let o = fboHelper.getColorState();
            fboHelper.renderer.autoClear = !1;
            for (let a = 0, c = n.length; a < c; a++) {
                let l = a === c - 1 && i;
                n[a].render(this, l)
            }
            fboHelper.setColorState(o)
        } else
            fboHelper.renderer.render(e, t),
            this.onAfterSceneRendered.dispatch();
        this.onAfterRendered.dispatch(),
        this.hasSizeChanged = !1
    }
}
const postprocessing = new Postprocessing;
ShaderChunk.ufxVert = ufxVert;
new Vector3;
new Vector3;
new Matrix4;
class UfxMesh extends Mesh {
    pivot = new Vector2;
    paddingL = 0;
    paddingR = 0;
    paddingT = 0;
    paddingB = 0;
    refDom;
    requireBg;
    tick = 0;
    _domX = 0;
    _domY = 0;
    _domWidth = 0;
    _domHeight = 0;
    _capturedOffsetX = 0;
    _capturedOffsetY = 0;
    constructor(e={}) {
        let t = e.geometry || new PlaneGeometry(1,1,e.segX || 1,e.segY || 1).translate(.5, .5, 0);
        t.computeBoundingBox(),
        super(t, e.material);
        let i = e.refDom;
        if (i) {
            let n = Array.isArray(i);
            this.refDomFrom = n ? i[0] : i,
            this.refDomTo = n ? i[1] : i
        }
        this.pivot = e.pivot || new Vector2(.5,.5),
        this.matrixAutoUpdate = !1,
        this.frustumCulled = !1,
        this.requireBg = e.requireBg === !0,
        this.paddingL = e.paddingL || 0,
        this.paddingR = e.paddingR || 0,
        this.paddingT = e.paddingT || 0,
        this.paddingB = e.paddingB || 0,
        this._initMaterial(e),
        this.onBeforeRender = this._onBeforeRender.bind(this)
    }
    _onBeforeRender() {
        if (this.requireBg) {
            let e = fboHelper.renderer
              , t = e.getRenderTarget();
            fboHelper.clearMultisampleRenderTargetState(),
            fboHelper.copy(postprocessing.sceneTexture, postprocessing.fromRenderTarget),
            e.setRenderTarget(t)
        }
    }
    _initMaterial(e) {
        this.material != e.material && (this.material = new ShaderMaterial({
            vertexShader: e.vertexShader || quadVert,
            fragmentShader: e.fragmentShader || quadFrag
        }),
        this.material.side = DoubleSide,
        this.material.transparent = !0);
        for (let i in e)
            this.material[i] !== void 0 && (this.material[i] = e[i]);
        this.material.extensions.derivatives = !0;
        let t = this.material.uniforms;
        t && (t.u_position = {
            value: this.position
        },
        t.u_quaternion = {
            value: this.quaternion
        },
        t.u_scale = {
            value: this.scale
        },
        t.u_domXY = {
            value: new Vector2
        },
        t.u_domWH = {
            value: new Vector2
        },
        t.u_domPivot = {
            value: new Vector2
        },
        t.u_domPadding = {
            value: new Vector4
        },
        t.u_bgTexture = postprocessing.sharedUniforms.u_fromTexture,
        t.u_resolution = postprocessing.sharedUniforms.u_resolution,
        t.u_viewportResolution = properties.sharedUniforms.u_viewportResolution)
    }
    syncDom(e=0, t=0) {
        if (this.refDomFrom) {
            let i = this.refDomFrom.getBoundingClientRect()
              , n = this.refDomFrom === this.refDomTo ? i : this.refDomTo.getBoundingClientRect();
            this.syncRect(i.left, i.top, Math.ceil(n.right - i.left), Math.ceil(n.bottom - i.top), e, t)
        } else
            console.warn("refDom is missing")
    }
    syncRect(e, t, i, n, r=0, o=0) {
        this._domX = e,
        this._domY = t,
        this._domWidth = Math.ceil(i),
        this._domHeight = Math.ceil(n),
        this.material.uniforms.u_domWH.value.set(this._domWidth, this._domHeight),
        this._capturedOffsetY = r,
        this._capturedOffsetX = o
    }
    testViewport(e=0, t=0) {
        let i = this._domX - this._capturedOffsetX + t
          , n = i + this._domWidth
          , r = this._domY - this._capturedOffsetY + e
          , o = r + this._domHeight;
        return r < properties.viewportHeight && o > 0 && i < properties.viewportWidth && n > 0
    }
    update(e=0, t=0) {
        let i = this.material.uniforms;
        i.u_domXY.value.set(this._domX - this._capturedOffsetX + t, this._domY - this._capturedOffsetY + e),
        i.u_domPivot.value.set(this._domWidth * this.pivot.x, this._domHeight * this.pivot.y),
        i.u_domPadding.value.set(this.paddingL, this.paddingR, this.paddingT, this.paddingB),
        this.tick++
    }
}
class Ufx extends PostEffect {
    scene;
    camera = new PerspectiveCamera(60,1);
    sectionLayer = new Object3D;
    projectDetailsLayer = new Object3D;
    sharedUniforms = {
        u_fromTexture: {
            value: null
        }
    };
    init() {
        this.scene = new Scene,
        this.scene.add(this.sectionLayer),
        this.scene.add(this.projectDetailsLayer)
    }
    render(e, t=!1) {
        let i = this.camera
          , n = properties.viewportWidth
          , r = properties.viewportHeight;
        i.position.set(n / 2, -r / 2, r / (2 * Math.tan(i.fov * Math.PI / 360))),
        i.aspect = n / r,
        i.far = i.position.z * 2,
        i.near = i.far / 1e3,
        i.updateProjectionMatrix();
        let o = fboHelper.getColorState()
          , a = properties.renderer;
        fboHelper.copy(e.fromTexture, e.sceneRenderTarget),
        a.setRenderTarget(e.sceneRenderTarget),
        fboHelper.renderer.autoClear = !1,
        fboHelper.renderer.autoClearColor = !1,
        fboHelper.renderer.autoClearStencil = !0,
        fboHelper.renderer.autoClearDepth = !0,
        fboHelper.renderer.clear(!1, !0, !0),
        a.render(this.scene, this.camera),
        a.setRenderTarget(null);
        let c = t ? null : e.toRenderTarget;
        fboHelper.copy(e.sceneTexture, c),
        fboHelper.setColorState(o),
        e.swap()
    }
}
class PostUfx extends Ufx {
    renderOrder = 20
}
const postUfx = new PostUfx
  , vert$1 = `#define GLSLIFY 1
#include <ufxVert>

varying vec2 v_uv;

void main () {
	vec3 basePos = getBasePosition(position);
	vec3 screenPos = getScreenPosition(basePos);
	gl_Position = projectionMatrix * modelViewMatrix * vec4( screenPos, 1.0 );
	v_uv = padUv(uv);
}

// uniform vec3 u_position;
// uniform vec4 u_quaternion;
// uniform vec3 u_scale;
// uniform vec2 u_domXY;
// uniform vec2 u_domWH;
// uniform vec2 u_domPivot;
// uniform vec4 u_domPadding;

// varying vec2 v_uv;
// varying vec2 v_domWH;
// varying float v_deltaRatio;

// #define PI	3.141592653589793

// vec3 qrotate(vec4 q, vec3 v) {
// 	return v + 2. * cross(q.xyz, cross(q.xyz, v) + q.w * v);
// }

// vec3 getBasePosition (in vec3 pos, in vec2 domWH) {
// 	vec3 basePos = vec3((pos.xy) * domWH - u_domPivot, pos.z);
// 	basePos.xy += mix(-u_domPadding.xz, u_domPadding.yw, pos.xy);
// 	return basePos;
// }

// vec3 getScreenPosition (in vec3 basePos, in vec2 domXY) {
// 	vec3 screenPos = qrotate(u_quaternion, basePos * u_scale) + vec3(u_domPivot.xy, 0.);
// 	screenPos = (screenPos + vec3(domXY,0.) + u_position) * vec3(1.,-1.,1.);
// 	return screenPos;
// }

// void main () {
// 	vec2 domXY = u_domXY;
// 	vec2 domWH = u_domWH;
// 	vec3 pos = position;

// 	vec3 basePos = getBasePosition(pos, domWH);
// 	vec3 screenPos = getScreenPosition(basePos, domXY);
// 	gl_Position = projectionMatrix * modelViewMatrix * vec4( screenPos, 1.0 );

// 	v_uv = vec2(uv.x, 1. - uv.y);
// 	v_domWH = domWH;
// }
`
  , frag$2 = `#define GLSLIFY 1
uniform vec3 u_color;
uniform vec2 u_domWH;
uniform float u_opacity;

varying vec2 v_uv;

#ifdef USE_BORDER
uniform float u_borderWidth;
uniform float u_borderRadius;
uniform float u_borderRatio;
uniform vec2 u_borderContentExpand;
uniform vec2 u_borderContentOffset;

float linearStep(float edge0, float edge1, float x) {
	return clamp((x - edge0) / (edge1 - edge0), 0.0, 1.0);
}

float sdRoundedBox( in vec2 p, in vec2 b, in float r ){
    vec2 q = abs(p)-b+r;
    return min(max(q.x,q.y),0.0) + length(max(q,0.0)) - r;
}

float getRoundedCornerMask (vec2 uv, vec2 size, float borderWidth, float borderRadius, float ratio) {
	vec2 halfSize = size * 0.5;
	borderRadius *= ratio;

	float d = sdRoundedBox((uv -.5) * size + u_borderContentOffset, halfSize - borderWidth * ratio + u_borderContentExpand, borderRadius);
	return smoothstep(0. + fwidth(d), 0., d);
}
#endif

void main () {

	float alpha = 1.;
	#ifdef USE_BORDER

    alpha = 1. - getRoundedCornerMask(v_uv, u_domWH, u_borderWidth, u_borderRadius, u_borderRatio);

	#endif

	gl_FragColor.rgb = u_color;
	gl_FragColor.a = alpha * u_opacity;
}
`;
class Section {
    page = null;
    domContainerEl = null;
    theme = "dark";
    useBorder = !1;
    clampBorderToFullscreen = !1;
    _needBorderMesh = !1;
    borderMesh = null;
    borderWidth = 12;
    borderRadius = 12;
    borderRatio = 1;
    hasBorderTop = !0;
    hasBorderBottom = !0;
    preInit(e, t="", i="dark", n=!1, r=!1) {
        let o = e ? e.domContainer : document;
        this.page = e,
        this.domContainerEl = typeof t == "string" || t instanceof String ? o.querySelector("#" + t) : t,
        this.theme = i,
        this.useBorder = n,
        this.clampBorderToFullscreen = r,
        this._needBorderMesh = this.useBorder || this.theme !== "dark",
        i === "light" && (this.domContainerEl.style.backgroundColor = properties.globalColors.white.hex)
    }
    init() {
        this._needBorderMesh && (this.borderMesh = new UfxMesh({
            refDom: this.domContainerEl,
            uniforms: {
                u_color: {
                    value: new Color(properties.globalColors.white.hex)
                },
                u_borderWidth: {
                    value: 0
                },
                u_borderRadius: {
                    value: 0
                },
                u_borderRatio: {
                    value: 0
                },
                u_opacity: {
                    value: 0
                },
                u_borderContentExpand: {
                    value: new Vector2
                },
                u_borderContentOffset: {
                    value: new Vector2
                }
            },
            vertexShader: vert$1,
            fragmentShader: frag$2,
            depthTest: !1,
            depthWrite: !1,
            transparent: !0
        }),
        this.useBorder && (this.borderMesh.material.defines.USE_BORDER = 1),
        this.page ? this.page.postUfxContainer.add(this.borderMesh) : postUfx.scene.add(this.borderMesh))
    }
    resize(e, t) {
        this.borderMesh && this.borderMesh.syncDom(-scrollManager.scrollPixel)
    }
    update(e, t=!1) {
        const i = scrollManager.getDomRange(this.domContainerEl);
        this.domContainerEl.style.visibility = i.isActive ? "visible" : "hidden";
        let n = !!this.borderMesh;
        if (i.isActive) {
            let r = siteHeader.top + siteHeader.height / 2;
            if (i.screenY <= r && i.screenY + i.height >= r && (this.page.headerTheme = this.theme),
            n) {
                let o = this.borderMesh.material.uniforms;
                o.u_domWH.value.set(this.borderMesh._domWidth, this.borderMesh._domHeight),
                this.borderMesh.update(-scrollManager.scrollPixel),
                this.clampBorderToFullscreen && o.u_domWH.value.y > properties.viewportHeight && (o.u_domWH.value.y = properties.viewportHeight,
                o.u_domXY.value.y < 0 && (o.u_domXY.value.y = o.u_domXY.value.y + Math.min(this.borderMesh._domHeight - properties.viewportHeight, -o.u_domXY.value.y))),
                o.u_borderWidth.value = this.borderWidth,
                o.u_borderRadius.value = this.borderRadius,
                o.u_borderRatio.value = this.page ? this.borderRatio * math.fit(this.page.showRatio, .75, 1, 0, 1) * math.fit(this.page.hideRatio, 0, .25, 1, 0) : this.borderRatio;
                let a = (this.borderWidth + this.borderRadius) * 2;
                this.hasBorderTop && this.hasBorderBottom && (a = 0),
                o.u_borderContentExpand.value.y = a,
                o.u_borderContentOffset.value.y = (this.hasBorderTop ? 0 : -a) + (this.hasBorderBottom ? 0 : a),
                o.u_opacity.value = (pagesManager.isFirstRoute ? 1 : this.page.showRatio) * (1 - this.page.hideRatio)
            }
        }
        n && (this.borderMesh.visible = i.isActive,
        properties.useMobileLayout && this.theme === "dark" && (this.borderMesh.visible = !1))
    }
}
class SiteFooter extends Section {
    isEnterprisePage = null;
    preInit() {
        super.preInit(null, "site-footer", "light"),
        this.domTopRightLinks = document.querySelectorAll(".site-footer__top-right-link"),
        pagesManager.onIdled.add(this.onPageChange, this)
    }
    onPageChange() {}
    init() {
        super.init()
    }
    resize(e, t) {
        super.resize(e, t)
    }
    updateBorder(e, t) {
        this.page = t,
        super.update(e)
    }
    update(e) {
        this.page && (this.domContainerEl.style.opacity = this.page.showRatio * (1 - this.page.hideRatio))
    }
}
const siteFooter = new SiteFooter
  , vert = `#define GLSLIFY 1
varying vec2 v_uv;
void main () {
    gl_Position = vec4(position.xy, 0.0, 1.0);
    v_uv = uv;
}
`
  , frag$1 = `#define GLSLIFY 1
uniform vec3 u_color0;
uniform vec3 u_color1;
uniform float u_scrollY;
uniform float u_showPageRatio;
uniform float u_activeRatio;
uniform float u_moveRatio;
uniform float u_time;
uniform float u_scale;
uniform float u_glowStrength;
uniform vec2 u_resolution;
uniform sampler2D u_screenPaintTexture;
uniform vec2 u_screenPaintTexelSize;

varying vec2 v_uv;

const float PI = 3.1415926535897932384626433832795;

float linearStep(float a, float b, float x) {
    return  clamp((x - a) / (b - a), 0., 1.);
}

float sdHexagon( in vec2 p, in float r ) {
    const vec3 k = vec3(-0.866025404,0.5,0.577350269);
    p = abs(p);
    p -= 2.0*min(dot(k.xy,p),0.0)*k.xy;
    p -= vec2(clamp(p.x, -k.z*r, k.z*r), r);
    return length(p)*sign(p.y);
}

vec2 rotate(vec2 v, float a) {
	float s = sin(a);
	float c = cos(a);
	mat2 m = mat2(c, s, -s, c);
	return m * v;
}

vec4 repeat(vec2 p, vec2 s) {
    vec2 id = floor(p/s + .5);
    return vec4(p - s*id, id);
}

vec4 hash43(vec3 p){
	vec4 p4 = fract(vec4(p.xyzx)  * vec4(.1031, .1030, .0973, .1099));
    p4 += dot(p4, p4.wzxy+33.33);
    return fract((p4.xxyz+p4.yzzw)*p4.zywx);
}

#include <getBlueNoise>

void main () {
    vec3 bnoise = getBlueNoise(gl_FragCoord.xy + vec2(15., 21.));

    // background gradient
    vec2 uv = v_uv;
    float dist = distance(uv, vec2(0.5, -0.5));

    // exagons SDFs
    vec2 aspect = vec2(u_resolution.x / u_resolution.y, 1.);

    vec2 baseUv = aspect * (v_uv - vec2(0.5, u_scrollY + 0.5)) / u_scale;

    float offset = 0.5;
    float offsetY = offset * 1.1547;
    vec2 uvOffset = vec2(offset * 2., offsetY);
    float radius = 0.2;
    float roundCorner = radius * 0.2;

    vec4 hexUvIdsA = repeat(baseUv, uvOffset);
    vec4 hexUvIdsB = repeat(baseUv + vec2(offset, offsetY * .5), uvOffset);

    float hexA = sdHexagon(rotate(hexUvIdsA.xy, PI * .5), radius - roundCorner) - roundCorner;
    float hexB = sdHexagon(rotate(hexUvIdsB.xy, PI * .5), radius - roundCorner) - roundCorner;
    hexUvIdsB.zw += .5;

    if (hexA > hexB) {
        hexA = hexB;
        hexUvIdsA = hexUvIdsB;
    }

    vec4 rands = hash43(vec3(hexUvIdsA.zw, 1.));
    float angleStrength = fract(atan(hexUvIdsA.y, hexUvIdsA.x) * 0.159155 + .5 - u_time * 0.1 + rands.x);

    angleStrength = smoothstep(0.75, 1., angleStrength) * u_activeRatio * max(u_showPageRatio, u_moveRatio);

    float lineThickness = 0.001;
    float absHex = abs(hexA);
    float smoothFactor = fwidth(absHex) * 0.5;
    float lines = linearStep(lineThickness + smoothFactor, lineThickness - smoothFactor, absHex);

    // screen paint
    vec2 uvScreen = gl_FragCoord.xy / u_resolution;
	vec4 data = texture2D(u_screenPaintTexture, uvScreen);
	float weight = (data.z + data.w) * 0.5 * u_activeRatio;

    // final
    vec3 color = mix(u_color0, u_color1, smoothstep(0., 1., pow(dist, 0.4 + u_glowStrength * 0.4)));
    color += (0.02 + angleStrength + weight) * lines * vec3(0., 0.65, 1.);

    gl_FragColor.rgb = color;

    gl_FragColor.rgb += bnoise * 0.004;
    gl_FragColor.a = lines * max(weight, angleStrength);
    gl_FragColor.a *= gl_FragColor.a;
}
`;
class ShaderHelper {
    glslifyStrip(e) {
        return e.replace(/#define\sGLSLIFY\s./, "")
    }
    addChunk(e, t) {
        ShaderChunk[e] = this.glslifyStrip(t)
    }
    _wrapInclude(e) {
        return "#include <" + e + ">"
    }
    insertBefore(e, t, i, n) {
        const r = n ? this._wrapInclude(t) : t;
        return e.replace(t, this.glslifyStrip(i) + `
` + r)
    }
    insertAfter(e, t, i, n) {
        const r = n ? this._wrapInclude(t) : t;
        return e.replace(r, r + `
` + this.glslifyStrip(i) + `
`)
    }
    replace(e, t, i, n) {
        const r = n ? this._wrapInclude(t) : t;
        return e.replace(r, `
` + this.glslifyStrip(i) + `
`)
    }
}
const shaderHelper = new ShaderHelper
  , getBlueNoiseShader = `#define GLSLIFY 1
uniform sampler2D u_blueNoiseTexture;
uniform vec2 u_blueNoiseTexelSize;
uniform vec2 u_blueNoiseCoordOffset;

// getBlueNoise(gl_FragCoord.xy)
vec3 getBlueNoise (vec2 coord) {
	return texture2D(u_blueNoiseTexture, coord * u_blueNoiseTexelSize + u_blueNoiseCoordOffset).rgb;
}
// getStaticBlueNoise(gl_FragCoord.xy)
vec3 getStaticBlueNoise (vec2 coord) {
	return texture2D(u_blueNoiseTexture, coord * u_blueNoiseTexelSize).rgb;
}`;
class BlueNoise {
    sharedUniforms = {
        u_blueNoiseTexture: {
            value: null
        },
        u_blueNoiseLinearTexture: {
            value: null
        },
        u_blueNoiseTexelSize: {
            value: null
        },
        u_blueNoiseCoordOffset: {
            value: new Vector2
        }
    };
    TEXTURE_SIZE = 128;
    preInit() {
        let e = new Texture;
        e.generateMipmaps = !1,
        e.minFilter = e.magFilter = LinearFilter,
        e.wrapS = e.wrapT = RepeatWrapping;
        let t = new Texture(properties.loader.load(settings.TEXTURE_PATH + "LDR_RGB1_0.png", {
            weight: 55,
            onLoad: function() {
                t.needsUpdate = !0,
                e.needsUpdate = !0
            }
        }).content);
        e.image = t.image,
        t.generateMipmaps = !1,
        t.minFilter = t.magFilter = NearestFilter,
        t.wrapS = t.wrapT = RepeatWrapping,
        this.sharedUniforms.u_blueNoiseTexture.value = t,
        this.sharedUniforms.u_blueNoiseLinearTexture.value = e,
        this.sharedUniforms.u_blueNoiseTexelSize.value = new Vector2(1 / this.TEXTURE_SIZE,1 / this.TEXTURE_SIZE),
        shaderHelper.addChunk("getBlueNoise", getBlueNoiseShader)
    }
    update(e) {
        this.sharedUniforms.u_blueNoiseCoordOffset.value.set(Math.random(), Math.random())
    }
}
const blueNoise = new BlueNoise
  , frag = `#define GLSLIFY 1
uniform sampler2D u_lowPaintTexture;
uniform sampler2D u_prevPaintTexture;
uniform vec2 u_paintTexelSize;
uniform vec4 u_drawFrom;
uniform vec4 u_drawTo;

uniform float u_pushStrength;
uniform vec3 u_dissipations;
uniform vec2 u_vel;

varying vec2 v_uv;

vec2 sdSegment( in vec2 p, in vec2 a, in vec2 b ) {
    vec2 pa = p-a, ba = b-a;
    float h = clamp( dot(pa,ba)/dot(ba,ba), 0.0, 1.0 );
    return vec2(length( pa - ba*h ), h);
}

#ifdef USE_NOISE
uniform float u_curlScale;
uniform float u_curlStrength;

vec2 hash(vec2 p) {
	vec3 p3 = fract(vec3(p.xyx) * vec3(.1031, .1030, .0973));
    p3 += dot(p3, p3.yzx+33.33);
    return fract((p3.xx+p3.yz)*p3.zy) * 2.0 - 1.0;
}

vec3 noised( in vec2 p ){
    vec2 i = floor( p );
    vec2 f = fract( p );

    vec2 u = f*f*f*(f*(f*6.0-15.0)+10.0);
    vec2 du = 30.0*f*f*(f*(f-2.0)+1.0);

    vec2 ga = hash( i + vec2(0.0,0.0) );
    vec2 gb = hash( i + vec2(1.0,0.0) );
    vec2 gc = hash( i + vec2(0.0,1.0) );
    vec2 gd = hash( i + vec2(1.0,1.0) );

    float va = dot( ga, f - vec2(0.0,0.0) );
    float vb = dot( gb, f - vec2(1.0,0.0) );
    float vc = dot( gc, f - vec2(0.0,1.0) );
    float vd = dot( gd, f - vec2(1.0,1.0) );

    return vec3( va + u.x*(vb-va) + u.y*(vc-va) + u.x*u.y*(va-vb-vc+vd),   // value
                 ga + u.x*(gb-ga) + u.y*(gc-ga) + u.x*u.y*(ga-gb-gc+gd) +  // derivatives
                 du * (u.yx*(va-vb-vc+vd) + vec2(vb,vc) - va));
}
#endif

void main () {
	vec2 res = sdSegment(gl_FragCoord.xy, u_drawFrom.xy, u_drawTo.xy);
	vec2 radiusWeight = mix(u_drawFrom.zw, u_drawTo.zw, res.y);
	float d = 1.0 - smoothstep(-0.01, radiusWeight.x, res.x);

	vec4 lowData = texture2D(u_lowPaintTexture, v_uv);
	vec2 velInv = (0.5 - lowData.xy) * u_pushStrength;

	#ifdef USE_NOISE
	vec3 noise3 = noised(gl_FragCoord.xy * u_curlScale * (1.0 - lowData.xy));
	vec2 noise = noised(gl_FragCoord.xy * u_curlScale * (2.0 - lowData.xy * (0.5 + noise3.x) + noise3.yz *0.1)).yz;
	velInv += noise * (lowData.z + lowData.w) * u_curlStrength;
	#endif

	vec4 data = texture2D(u_prevPaintTexture, v_uv + velInv * u_paintTexelSize);
	data.xy -= 0.5;
	vec4 delta = (u_dissipations.xxyz - 1.0) * data;

	vec2 newVel = u_vel * d;
	delta += vec4(newVel, radiusWeight.yy * d);
	// delta = sign(delta) * max(vec4(0.004), abs(delta)); // make sure at least +-1/255 is applied to reduce ghosting
	delta.zw = sign(delta.zw) * max(vec2(0.004), abs(delta.zw));
	data += delta;
	data.xy += 0.5;
    gl_FragColor = clamp(data, vec4(0.0), vec4(1.0));
}
`
  , blur9VaryingVertexShader = `#define GLSLIFY 1
attribute vec3 position;

uniform vec2 u_delta;
varying vec2 v_uv[9];

void main() {
    vec2 uv = position.xy * 0.5 + 0.5;

    v_uv[0] = uv;

    vec2 delta = u_delta;
    v_uv[1] = uv - delta;
    v_uv[2] = uv + delta;

    delta += u_delta;
    v_uv[3] = uv - delta;
    v_uv[4] = uv + delta;

    delta += u_delta;
    v_uv[5] = uv - delta;
    v_uv[6] = uv + delta;

    delta += u_delta;
    v_uv[7] = uv - delta;
    v_uv[8] = uv + delta;

    gl_Position = vec4( position, 1.0 );

}
`
  , blur9VaryingFragmentShader = `#define GLSLIFY 1
uniform sampler2D u_texture;
varying vec2 v_uv[9];

void main() {

    vec4 color = texture2D( u_texture, v_uv[0] ) * 0.1633;
    color += texture2D( u_texture,  v_uv[1] ) * 0.1531;
    color += texture2D( u_texture,  v_uv[2] ) * 0.1531;
    color += texture2D( u_texture,  v_uv[3] ) * 0.12245;
    color += texture2D( u_texture,  v_uv[4] ) * 0.12245;
    color += texture2D( u_texture,  v_uv[5] ) * 0.0918;
    color += texture2D( u_texture,  v_uv[6] ) * 0.0918;
    color += texture2D( u_texture,  v_uv[7] ) * 0.051;
    color += texture2D( u_texture,  v_uv[8] ) * 0.051;

    gl_FragColor = color;
}
`
  , blur9FragmentShader = `#define GLSLIFY 1
uniform sampler2D u_texture;
uniform vec2 u_delta;

varying vec2 v_uv;

void main() {

    vec4 color = texture2D( u_texture, v_uv ) * 0.1633;

    vec2 delta = u_delta;
    color += texture2D( u_texture,  v_uv - delta ) * 0.1531;
    color += texture2D( u_texture,  v_uv + delta ) * 0.1531;

    delta += u_delta;
    color += texture2D( u_texture,  v_uv - delta ) * 0.12245;
    color += texture2D( u_texture,  v_uv + delta ) * 0.12245;

    delta += u_delta;
    color += texture2D( u_texture,  v_uv - delta ) * 0.0918;
    color += texture2D( u_texture,  v_uv + delta ) * 0.0918;

    delta += u_delta;
    color += texture2D( u_texture,  v_uv - delta ) * 0.051;
    color += texture2D( u_texture,  v_uv + delta ) * 0.051;

    gl_FragColor = color;

}
`;
class Blur {
    material = null;
    getBlur9Material() {
        let e = fboHelper.MAX_VARYING_VECTORS > 8;
        return this.blur9Material || (this.blur9Material = new RawShaderMaterial({
            uniforms: {
                u_texture: {
                    value: null
                },
                u_delta: {
                    value: new Vector2
                }
            },
            vertexShader: e ? fboHelper.precisionPrefix + blur9VaryingVertexShader : fboHelper.vertexShader,
            fragmentShader: fboHelper.precisionPrefix + (e ? blur9VaryingFragmentShader : blur9FragmentShader),
            depthWrite: !1,
            depthTest: !1
        })),
        this.blur9Material
    }
    blur(e, t, i, n, r, o) {
        let a = .25
          , c = Math.ceil(i.width * t) || 0
          , l = Math.ceil(i.height * t) || 0;
        this.material || (this.material = this.getBlur9Material()),
        n || console.warn("You have to pass intermediateRenderTarget to blur"),
        (c !== n.width || l !== n.height) && n.setSize(c, l),
        r ? o || r.setSize(i.width, i.height) : r = i,
        this.material.uniforms.u_texture.value = i.texture || i,
        this.material.uniforms.u_delta.value.set(e / c * a, 0),
        fboHelper.render(this.material, n),
        this.material.uniforms.u_texture.value = n.texture || n,
        this.material.uniforms.u_delta.value.set(0, e / l * a),
        fboHelper.render(this.material, r)
    }
}
const blur = new Blur;
let _v = new Vector2;
class ScreenPaint {
    _lowRenderTarget;
    _lowBlurRenderTarget;
    _prevPaintRenderTarget;
    _currPaintRenderTarget;
    _material;
    _distortionMaterial;
    _fromDrawData;
    _toDrawData;
    drawEnabled = !0;
    needsMouseDown = !1;
    enabled = !0;
    minRadius = 0;
    maxRadius = 100;
    radiusDistanceRange = 100;
    pushStrength = 25;
    accelerationDissipation = .8;
    velocityDissipation = .985;
    weight1Dissipation = .985;
    weight2Dissipation = .65;
    useNoise = !1;
    curlScale = .1;
    curlStrength = 5;
    _prevUseNoise = null;
    sharedUniforms = {
        u_paintTexelSize: {
            value: new Vector2
        },
        u_prevPaintTexture: {
            value: null
        },
        u_currPaintTexture: {
            value: null
        },
        u_lowPaintTexture: {
            value: null
        }
    };
    init() {
        this._lowRenderTarget = fboHelper.createRenderTarget(1, 1),
        this._lowBlurRenderTarget = fboHelper.createRenderTarget(1, 1),
        this._prevPaintRenderTarget = fboHelper.createRenderTarget(1, 1),
        this._currPaintRenderTarget = fboHelper.createRenderTarget(1, 1),
        this.sharedUniforms.u_lowPaintTexture.value = this._lowRenderTarget.texture,
        this._material = new RawShaderMaterial({
            uniforms: {
                u_lowPaintTexture: {
                    value: this._lowRenderTarget.texture
                },
                u_prevPaintTexture: this.sharedUniforms.u_prevPaintTexture,
                u_paintTexelSize: this.sharedUniforms.u_paintTexelSize,
                u_drawFrom: {
                    value: this._fromDrawData = new Vector4(0,0,0,0)
                },
                u_drawTo: {
                    value: this._toDrawData = new Vector4(0,0,0,0)
                },
                u_pushStrength: {
                    value: 0
                },
                u_curlScale: {
                    value: 0
                },
                u_curlStrength: {
                    value: 0
                },
                u_vel: {
                    value: new Vector2
                },
                u_dissipations: {
                    value: new Vector3
                }
            },
            vertexShader: fboHelper.vertexShader,
            fragmentShader: fboHelper.precisionPrefix + frag
        })
    }
    resize(e, t) {
        let i = e >> 2
          , n = t >> 2
          , r = e >> 4
          , o = t >> 4;
        (i !== this._currPaintRenderTarget.width || n !== this._currPaintRenderTarget.height) && (this._currPaintRenderTarget.setSize(i, n),
        this._prevPaintRenderTarget.setSize(i, n),
        this._lowRenderTarget.setSize(r, o),
        this._lowBlurRenderTarget.setSize(r, o),
        this.sharedUniforms.u_paintTexelSize.value.set(1 / i, 1 / n),
        this.clear())
    }
    clear = () => {
        fboHelper.clearColor(.5, .5, 0, 0, this._lowRenderTarget),
        fboHelper.clearColor(.5, .5, 0, 0, this._lowBlurRenderTarget),
        fboHelper.clearColor(.5, .5, 0, 0, this._currPaintRenderTarget),
        this._material.uniforms.u_vel.value.set(0, 0)
    }
    ;
    update(e) {
        if (!this.enabled)
            return;
        this.useNoise !== this._prevUseNoise && (this._material.defines.USE_NOISE = this.useNoise,
        this._material.needsUpdate = !0,
        this._prevUseNoise = this.useNoise);
        let t = this._currPaintRenderTarget.width
          , i = this._currPaintRenderTarget.height
          , n = this._prevPaintRenderTarget;
        this._prevPaintRenderTarget = this._currPaintRenderTarget,
        this._currPaintRenderTarget = n,
        this.sharedUniforms.u_prevPaintTexture.value = this._prevPaintRenderTarget.texture,
        this.sharedUniforms.u_currPaintTexture.value = this._currPaintRenderTarget.texture,
        this._material.uniforms.u_drawFrom.value.z = this._material.uniforms.u_drawTo.value.z;
        let r = input.mousePixelXY.distanceTo(input.prevMousePixelXY)
          , o = math.fit(r, 0, this.radiusDistanceRange, this.minRadius, this.maxRadius);
        (!input.hadMoved || !this.drawEnabled || (this.needsMouseDown || browser$1.isMobile) && (!input.isDown || !input.wasDown)) && (o = 0),
        o = o / properties.viewportHeight * i,
        this._material.uniforms.u_pushStrength.value = this.pushStrength,
        this._material.uniforms.u_curlScale.value = this.curlScale,
        this._material.uniforms.u_curlStrength.value = this.curlStrength,
        this._material.uniforms.u_dissipations.value.set(this.velocityDissipation, this.weight1Dissipation, this.weight2Dissipation),
        this._fromDrawData.copy(this._toDrawData),
        this._toDrawData.set((input.mouseXY.x + 1) * t / 2, (input.mouseXY.y + 1) * i / 2, o, 1),
        _v.set(this._toDrawData.x - this._fromDrawData.x, this._toDrawData.y - this._fromDrawData.y).multiplyScalar(e * .8),
        this._material.uniforms.u_vel.value.multiplyScalar(this.accelerationDissipation).add(_v),
        fboHelper.render(this._material, this._currPaintRenderTarget),
        fboHelper.copy(this._currPaintRenderTarget.texture, this._lowRenderTarget),
        blur.blur(4, 1, this._lowRenderTarget, this._lowBlurRenderTarget)
    }
}
const screenPaint = new ScreenPaint;
class BgVisual {
    container = new Object3D;
    activeRatio = 1;
    showPageRatio = 0;
    moveRatio = 0;
    counterOffsetY = 0;
    extraGlow = 0;
    sharedUniforms = {
        u_time: properties.sharedUniforms.u_time,
        u_resolution: properties.sharedUniforms.u_resolution,
        u_scrollY: {
            value: 0
        },
        u_showPageRatio: {
            value: 0
        },
        u_activeRatio: {
            value: 0
        },
        u_moveRatio: {
            value: 0
        },
        u_glowStrength: {
            value: 0
        },
        u_scale: {
            value: 1
        },
        u_color0: {
            value: new Color("#4571CE")
        },
        u_color1: {
            value: new Color("#10131c")
        }
    };
    preInit() {}
    init() {
        this.mesh = new Mesh(new PlaneGeometry(2,2),new ShaderMaterial({
            uniforms: Object.assign({
                u_screenPaintTexture: screenPaint.sharedUniforms.u_currPaintTexture,
                u_screenPaintTexelSize: screenPaint.sharedUniforms.u_paintTexelSize
            }, this.sharedUniforms, blueNoise.sharedUniforms),
            vertexShader: vert,
            fragmentShader: frag$1,
            depthWrite: !1
        })),
        this.mesh.renderOrder = -100,
        this.mesh.frustumCulled = !1,
        this.container.add(this.mesh)
    }
    resize(e, t) {}
    preUpdate(e) {}
    update(e) {
        this.extraGlow = 0,
        this.sharedUniforms.u_showPageRatio.value = this.showPageRatio,
        this.sharedUniforms.u_activeRatio.value = this.activeRatio,
        this.sharedUniforms.u_moveRatio.value = this.moveRatio,
        this.sharedUniforms.u_scale.value = properties.useMobileLayout ? .75 : 1,
        this.sharedUniforms.u_glowStrength.value = Math.min(Math.sin(properties.time) * .3 + .3 + this.extraGlow, 1),
        this.sharedUniforms.u_scrollY.value = scrollManager.scrollPixel / properties.viewportHeight - this.counterOffsetY
    }
}
const bgVisual = new BgVisual;
class Page {
    domContainer;
    route = null;
    postUfxContainer = new Object3D;
    headerTheme = "";
    time = 0;
    showRatio = 0;
    hideRatio = 0;
    showDuration = .15;
    hideDuration = .15;
    isActive = !1;
    hasInitialized = !1;
    constructor() {
        this._showPageTween = new Tween(this),
        this._hidePageTween = new Tween(this)
    }
    get isScrollTarget() {
        return pagesManager.scrollTargetPage === this
    }
    preInit(e) {}
    preInitContent(e) {}
    init(e) {}
    initContent(e) {}
    onHideComplete(e, t) {}
    show(e, t, i) {
        this.time = 0,
        siteHeader.setNavActive(this.id),
        siteMenu.setNavActive(this.id),
        this._showPageTween.kill(),
        this._showPageTween.onComplete = i,
        this.hideRatio = 0,
        this._showPageTween.fromTo(this.showDuration, {
            showRatio: 0
        }, {
            showRatio: 1
        })
    }
    hide(e, t, i) {
        this._hidePageTween && this._hidePageTween.kill(),
        this._hidePageTween.onComplete = i,
        this._hidePageTween.fromTo(this.hideDuration, {
            hideRatio: 0
        }, {
            hideRatio: 1
        })
    }
    resize(e, t) {}
    update(e) {
        this.time += e,
        bgVisual.showPageRatio = this.showRatio * (1 - this.hideRatio) * math.fit(this.time, .5, 2.5, 1, 0),
        bgVisual.moveRatio = 0,
        bgVisual.counterOffsetY = 0;
        const t = properties.useMobileLayout;
        scrollManager.useTestValues,
        scrollManager.frictionCoeffFrom = 2,
        scrollManager.frictionCoeffTo = 1.2,
        scrollManager.scrollMultiplier = 1
    }
    postUpdate(e) {
        siteFooter.updateBorder(e, this),
        siteHeader.useTheme(this.headerTheme),
        this.domContainer.style.opacity = this.showRatio * (1 - this.hideRatio)
    }
}
class Ease {
    quadIn(e) {
        return e * e
    }
    quadOut(e) {
        return e * (2 - e)
    }
    quadInOut(e) {
        return (e *= 2) < 1 ? .5 * e * e : -.5 * (--e * (e - 2) - 1)
    }
    cubicIn(e) {
        return e * e * e
    }
    cubicOut(e) {
        return --e * e * e + 1
    }
    cubicInOut(e) {
        return (e *= 2) < 1 ? .5 * e * e * e : .5 * ((e -= 2) * e * e + 2)
    }
    quartIn(e) {
        return e * e * e * e
    }
    quartOut(e) {
        return 1 - --e * e * e * e
    }
    quartInOut(e) {
        return (e *= 2) < 1 ? .5 * e * e * e * e : -.5 * ((e -= 2) * e * e * e - 2)
    }
    quintIn(e) {
        return e * e * e * e * e
    }
    quintOut(e) {
        return --e * e * e * e * e + 1
    }
    quintInOut(e) {
        return (e *= 2) < 1 ? .5 * e * e * e * e * e : .5 * ((e -= 2) * e * e * e * e + 2)
    }
    sineIn(e) {
        return 1 - Math.cos(e * Math.PI / 2)
    }
    sineOut(e) {
        return Math.sin(e * Math.PI / 2)
    }
    sineInOut(e) {
        return .5 * (1 - Math.cos(Math.PI * e))
    }
    expoIn(e) {
        return e === 0 ? 0 : Math.pow(1024, e - 1)
    }
    expoOut(e) {
        return e === 1 ? 1 : 1 - Math.pow(2, -10 * e)
    }
    expoInOut(e) {
        return e === 0 ? 0 : e === 1 ? 1 : (e *= 2) < 1 ? .5 * Math.pow(1024, e - 1) : .5 * (-Math.pow(2, -10 * (e - 1)) + 2)
    }
    circIn(e) {
        return 1 - Math.sqrt(1 - e * e)
    }
    circOut(e) {
        return Math.sqrt(1 - --e * e)
    }
    circInOut(e) {
        return (e *= 2) < 1 ? -.5 * (Math.sqrt(1 - e * e) - 1) : .5 * (Math.sqrt(1 - (e -= 2) * e) + 1)
    }
    elasticIn(e) {
        let t, i = .1, n = .4;
        return e === 0 ? 0 : e === 1 ? 1 : (!i || i < 1 ? (i = 1,
        t = n / 4) : t = n * Math.asin(1 / i) / (2 * Math.PI),
        -(i * Math.pow(2, 10 * (e -= 1)) * Math.sin((e - t) * 2 * Math.PI / n)))
    }
    elasticOut(e) {
        let t, i = .1, n = .4;
        return e === 0 ? 0 : e === 1 ? 1 : (!i || i < 1 ? (i = 1,
        t = n / 4) : t = n * Math.asin(1 / i) / (2 * Math.PI),
        i * Math.pow(2, -10 * e) * Math.sin((e - t) * 2 * Math.PI / n) + 1)
    }
    elasticInOut(e) {
        let t, i = .1, n = .4;
        return e === 0 ? 0 : e === 1 ? 1 : (!i || i < 1 ? (i = 1,
        t = n / 4) : t = n * Math.asin(1 / i) / (2 * Math.PI),
        (e *= 2) < 1 ? -.5 * i * Math.pow(2, 10 * (e -= 1)) * Math.sin((e - t) * 2 * Math.PI / n) : i * Math.pow(2, -10 * (e -= 1)) * Math.sin((e - t) * 2 * Math.PI / n) * .5 + 1)
    }
    backIn(e) {
        let t = 1.70158;
        return e * e * ((t + 1) * e - t)
    }
    backOut(e) {
        let t = 1.70158;
        return --e * e * ((t + 1) * e + t) + 1
    }
    backInOut(e) {
        let t = 2.5949095;
        return (e *= 2) < 1 ? .5 * e * e * ((t + 1) * e - t) : .5 * ((e -= 2) * e * ((t + 1) * e + t) + 2)
    }
    bounceIn(e) {
        return 1 - this.bounceOut(1 - e)
    }
    bounceOut(e) {
        return e < 1 / 2.75 ? 7.5625 * e * e : e < 2 / 2.75 ? 7.5625 * (e -= 1.5 / 2.75) * e + .75 : e < 2.5 / 2.75 ? 7.5625 * (e -= 2.25 / 2.75) * e + .9375 : 7.5625 * (e -= 2.625 / 2.75) * e + .984375
    }
    bounceInOut(e) {
        return e < .5 ? this.bounceIn(e * 2) * .5 : this.bounceOut(e * 2 - 1) * .5 + .5
    }
    cubicBezier(e, t, i, n, r) {
        if (e <= 0)
            return 0;
        if (e >= 1)
            return 1;
        if (t === i && n === r)
            return e;
        const o = (T, C, F, U) => 1 / (3 * C * T * T + 2 * F * T + U)
          , a = (T, C, F, U, z) => C * (T * T * T) + F * (T * T) + U * T + z
          , c = (T, C, F, U, z) => {
            let B = T * T;
            return C * (B * T) + F * B + U * T + z
        }
        ;
        let l = 0, u = 0, h = t, d = i, m = n, g = r, p = 1, f = 1, x = p - 3 * m + 3 * h - l, S = 3 * m - 6 * h + 3 * l, v = 3 * h - 3 * l, M = l, y = f - 3 * g + 3 * d - u, A = 3 * g - 6 * d + 3 * u, P = 3 * d - 3 * u, _ = u, L = e, D, $, R;
        for (D = 0; D < 100; D++)
            $ = a(L, x, S, v, M),
            R = o(L, x, S, v),
            R === 1 / 0 && (R = e),
            L -= ($ - e) * R,
            L = Math.min(Math.max(L, 0), 1);
        return c(L, y, A, P, _)
    }
}
const ease = new Ease;
class Rimlight {
    animation = 0;
    prevAnimation = -1;
    opacity = 1;
    isActive = !1;
    isManual = !1;
    width = 1;
    height = 1;
    showSpeed = 1.5;
    hideSpeed = 2.5;
    angle = 0;
    prevAngle = -1;
    opacity = 0;
    prevOpacity = -1;
    constructor(e) {
        this.domElement = e
    }
    resize(e, t) {
        if (e && t)
            this.width = e,
            this.height = t;
        else {
            let i = this.domElement.getBoundingClientRect();
            this.width = i.width,
            this.height = i.height
        }
    }
    reset() {
        this.isActive = !1,
        this.animation = 0,
        this.update(0)
    }
    update(e, t) {
        let i = this.animation
          , n = t;
        if (this.isManual)
            n = n || this.prevAngle !== this.angle || this.prevOpacity !== this.opacity;
        else {
            let r = e * (i <= 1 ? this.showSpeed : this.hideSpeed);
            i > 0 ? (i = i + r,
            this.animation <= 1 && i > 1 && this.isActive && (i = 1)) : this.isActive && (i = i + r),
            i >= 2 && (i = 0),
            this.angle = -i * 360,
            this.animation = i,
            n = n || this.prevAnimation !== i
        }
        if (n) {
            let r = i < 1 ? math.fit(i, 0, 1, 0, 1, ease.cubicOut) : math.fit(i, 1, 2, 1, 2)
              , o = this.opacity
              , a = this.angle;
            this.isManual || (o = math.fit(r, 0, .3, 0, 1) * math.fit(r, .3, 1, 1, .75) * math.fit(r, 1, 2, 1, 0),
            a = math.fit(r, 0, 1, 0, -45) + math.fit(r, 1, 2, 0, -25)),
            a = a / 180 * Math.PI;
            let c = Math.cos(a) * this.height
              , l = Math.sin(a) * this.width;
            a = Math.atan2(l, c) * 180 / Math.PI,
            this.domElement.style.setProperty("--rim-angle", a + "deg"),
            this.domElement.style.opacity = o,
            this.domElement.style.visibility = o ? "visible" : "hidden"
        }
        this.prevAnimation = this.animation,
        this.prevAngle = this.angle,
        this.prevOpacity = this.opacity
    }
}
let _c1 = new Color
  , _c2 = new Color().setStyle("#92e9d8");
const RIGHT_NAV_ORDERS = [3, 0, 2, 1];
class HomeHero extends Section {
    allowScroll = settings.JUMP_SECTION !== "";
    thumbHoverIndex = 2;
    thumbHoverTargetIndex = 2;
    thumbHoverRatio = 0;
    thumbHoverTargetRatio = 0;
    flowTargetTimeStep = -1;
    flowTimeStep = -1;
    mainVisualIndexVal = 0;
    mainVisualTargetIndexVal = 0;
    mainVisualFocusIndex = -1;
    preInit(e) {
        super.preInit(homePage, "home-hero", "dark", !0, !0),
        this.borderRatio = 0,
        this.domWrapper = this.domContainerEl.querySelector("#home-hero-wrapper"),
        this.domGrid = this.domContainerEl.querySelector("#home-hero__grid"),
        this.domMainVisualContainer = this.domContainerEl.querySelector("#home-hero__main-visual"),
        this.domMainVisualOuter = this.domContainerEl.querySelector("#home-hero__main-visual-outer"),
        this.domHeroLogos = this.domContainerEl.querySelector("#home-hero__logo-lists-outer-wrapper"),
        this.domHeroAlert = this.domContainerEl.querySelector("#home-hero__alert"),
        this.domHeroAlertRimlight = new Rimlight(this.domHeroAlert.querySelector(".o-rimlight")),
        this.domHeroAlertRimlight.showSpeed = 1,
        this.domHeroAlertRimlight.hideSpeed = 1,
        this.domMainVisualItemList = this.domContainerEl.querySelectorAll(".home-hero__main-visual-item"),
        this.domMainVisualItemList.forEach( (t, i) => {
            let n = t._rimlight = new Rimlight(t.querySelector(".o-rimlight"));
            n.showSpeed = 1,
            n.hideSpeed = 1,
            t.addEventListener("mouseenter", this._onMainVisualRollover.bind(this, i, t)),
            t.addEventListener("mousemove", this._onMainVisualRollover.bind(this, i, t)),
            t.addEventListener("mouseleave", this._onMainVisualRollout.bind(this, i, t)),
            t.addEventListener("click", this._onMainVisualClick.bind(this, i, t)),
            t._focusRatio = 0
        }
        ),
        this.domMainCopy = this.domContainerEl.querySelector("#home-hero__main-copy"),
        this.domScroll = this.domContainerEl.querySelector("#home-hero__scroll-indicator"),
        this.domFlowVisual = this.domContainerEl.querySelector("#home-hero__flow-visual"),
        this.domFlowContent = this.domContainerEl.querySelector("#home-hero__flow-content"),
        this.domFlowVisualWrapper = this.domContainerEl.querySelector("#home-hero__flow-visual-wrapper"),
        this.domFlowVisualInner = this.domContainerEl.querySelector("#home-hero__flow-visual-inner"),
        this.domFlowCopyItemList = this.domContainerEl.querySelectorAll(".home-hero__flow-copy-item"),
        this.domFlowCopyNav = this.domContainerEl.querySelector("#home-hero__flow-copy-list-nav"),
        this.domFlowCopyNavHexList = this.domFlowCopyNav.querySelectorAll(".o-icon + .o-icon"),
        this.domThumbnails = this.domContainerEl.querySelector("#home-hero__thumbnails"),
        this.domThumbnailItemList = this.domContainerEl.querySelectorAll(".home-hero__thumbnails-item"),
        this.domThumbnailItemInnerList = this.domContainerEl.querySelectorAll(".home-hero__thumbnails-item-inner"),
        this.domThumbnailItemImgList = this.domContainerEl.querySelectorAll(".home-hero__thumbnails-item img"),
        this.domThumbnailItemTextList = this.domContainerEl.querySelectorAll(".home-hero__thumbnails-item-text"),
        this.domThumbnailItemTextContentList = this.domContainerEl.querySelectorAll(".home-hero__thumbnails-item-text div"),
        this.domThumbnailItemTextSvgPathList = this.domContainerEl.querySelectorAll(".home-hero__thumbnails-item-text path"),
        this._initThumbTextSVG(),
        this.domFlow1Chat1 = this.domContainerEl.querySelector(".home-hero__flow-visual-chat-item:nth-child(1)"),
        this.domFlow1Status = this.domContainerEl.querySelector(".home-hero__flow-visual-left-status-item:nth-child(1)"),
        this.domFlow1Chat2 = this.domContainerEl.querySelector(".home-hero__flow-visual-chat-item:nth-child(2)"),
        this.domFlow1Visual = this.domContainerEl.querySelector(".home-hero__flow-visual-right-item:nth-child(1)"),
        this.domFlow2Status = this.domContainerEl.querySelector(".home-hero__flow-visual-left-status-item:nth-child(2)"),
        this.domFlow2Chat1 = this.domContainerEl.querySelector(".home-hero__flow-visual-chat-status-item:nth-child(1)"),
        this.domFlow2Visual = this.domContainerEl.querySelector(".home-hero__flow-visual-right-item:nth-child(2)"),
        this.domFlow3Status = this.domContainerEl.querySelector(".home-hero__flow-visual-left-status-item:nth-child(3)"),
        this.domFlow3Chat1 = this.domContainerEl.querySelector(".home-hero__flow-visual-chat-status-item:nth-child(2)"),
        this.domFlow3Visual = this.domContainerEl.querySelector(".home-hero__flow-visual-right-item:nth-child(3)"),
        this.domFlow4Chat1 = this.domContainerEl.querySelector(".home-hero__flow-visual-chat-item:nth-child(3)"),
        this.domFlow4Visual = this.domContainerEl.querySelector(".home-hero__flow-visual-right-item:nth-child(4)"),
        this.domVisualNavItems = this.domContainerEl.querySelectorAll("#home-hero__flow-visual-right-nav > div"),
        this.domVisualSlider = this.domContainerEl.querySelector("#home-hero__flow-visual-right-slider"),
        this.domVisualSliderDot = this.domContainerEl.querySelector("#home-hero__flow-visual-right-slider-ball"),
        this.domVisualSliderLine = this.domContainerEl.querySelector("#home-hero__flow-visual-right-slider-bar"),
        this.domThumbnailItemInnerList.forEach( (t, i) => {
            t.__hoverRatio = 0,
            t.addEventListener("mouseenter", this._onThumbnailRollover.bind(this, i)),
            t.addEventListener("mousemove", this._onThumbnailRollover.bind(this, i))
        }
        ),
        this.domEndCopy = this.domContainerEl.querySelector("#home-hero__end-copy")
    }
    _initThumbTextSVG() {
        let e = this.domThumbnailItemTextSvgPathList[0].getAttribute("d");
        this.thumbTextSvgPathOpList = e.split(/[0-9-.]+/g).filter(t => t != ""),
        this.thumbTextSvgPathNumList = e.split(/[^0-9-.]+/g).filter(t => t != "").map(t => parseFloat(t))
    }
    _onThumbnailRollover(e) {}
    init() {
        super.init()
    }
    resize(e, t) {
        let i = this.domGrid.getBoundingClientRect()
          , n = properties.useMobileLayout;
        this._gridWidth = i.width,
        this._gridLeft = (properties.viewportWidth - this._gridWidth) * .5;
        let r = this.domFlowVisualWrapper.getBoundingClientRect();
        this._flowVisualX = r.left,
        this._flowVisualY = r.top - i.top,
        this._flowVisualWidth = r.width,
        this._flowVisualHeight = r.height,
        this._flowVisualItemOffset = r.height + (properties.viewportHeight - r.height) / 2;
        let o = this.domThumbnailItemList[0].getBoundingClientRect()
          , a = this.domThumbnailItemList.length;
        this._thumbnailItemLeft = o.left,
        this._thumbnailItemTop = o.top,
        this._thumbnailItemWidth = o.width,
        this._thumbnailItemHeight = o.height,
        this._thumbnailItemSpacing = this._thumbnailItemWidth * .03,
        this._thumbnailItemTotalWidth = this._thumbnailItemWidth * a + this._thumbnailItemSpacing * (a - 1),
        this._thumbnailToContainerScale = n ? properties.viewportWidth / (this._thumbnailItemWidth * 1.2) : Math.min(.8, this._gridWidth * .94 / this._thumbnailItemTotalWidth),
        this._thumbnailToContainerHoverScale = n ? properties.viewportWidth / (this._thumbnailItemWidth * 1.2) : Math.min(1, this._gridWidth * 1.2 / this._thumbnailItemTotalWidth),
        this.domHeroAlertRimlight.resize(this.domHeroAlert.clientWidth, this.domHeroAlert.clientHeight);
        let c = this.domMainVisualContainer.getBoundingClientRect();
        this.domMainVisualItemList.forEach( (l, u) => {
            l._rimlight.resize(c.width, c.height),
            l._rimlight.domElement.style.setProperty("--border-radius", (c.width * .025).toFixed(1) + "px")
        }
        ),
        this.domThumbnailItemTextSvgPathList.forEach( (l, u) => {
            let d = this.domThumbnailItemTextContentList[u].getBoundingClientRect().width
              , m = ""
              , g = 2;
            this.thumbTextSvgPathOpList.forEach( (p, f) => {
                let x = this.thumbTextSvgPathNumList[f];
                if (m += p,
                p === "V" && g++,
                x !== void 0) {
                    if (g % 2 === 0) {
                        let v = x - 200 > 0 ? 1 : -1;
                        x = (Math.abs(x - 200) - (200 - 158.2496) + d * .5 + 10) * v + 200
                    }
                    m += x
                }
                p === "H" && g++,
                g++
            }
            ),
            this.domThumbnailItemTextSvgPathList[u].setAttribute("d", m)
        }
        ),
        super.resize(e, t)
    }
    _onMainVisualRollover(e, t) {
        t._isClickable && (this.mainVisualFocusIndex = e)
    }
    _onMainVisualRollout(e, t) {
        this.mainVisualFocusIndex = -1
    }
    _onMainVisualClick(e, t) {
        if (t._isClickable) {
            let i = Math.round(this.mainVisualIndexVal);
            this.mainVisualTargetIndexVal = i + math.loop(e - i, 0, 3) % 3
        }
    }
    update(e) {
        const t = properties.useMobileLayout
          , i = scrollManager.getDomRange(this.domContainerEl);
        if (i.isActive) {
            let n = i.showScreenOffset - 1
              , r = i.hideScreenOffset
              , o = t ? 0 : (properties.viewportHeight - siteHeader.contentHeightUnderTheHeader) / 2
              , a = Math.min(i.height - properties.viewportHeight, -i.screenY + o * 0);
            this.domWrapper.style.transform = `translateY(${a}px)`;
            let l = 1 - math.fit(n, 0, .375, 0, 1);
            l == 0 && (this.mainVisualFocusIndex = this.mainVisualIndexVal = this.mainVisualTargetIndexVal = 0),
            this.mainVisualIndexVal = math.mix(this.mainVisualIndexVal, this.mainVisualTargetIndexVal, 1 - Math.exp(-2.5 * e));
            let u = math.fit(homePage.time, 0, 2, 0, 1, ease.circInOut);
            this.domHeroAlert.style.setProperty("--ratio", u),
            this.domHeroAlertRimlight.isActive = homePage.time > .75 && homePage.time < 1,
            this.domHeroAlertRimlight.update(e),
            this.domMainVisualItemList.forEach( (y, A) => {
                let P = math.loop(A - this.mainVisualIndexVal, -.5, 2.5)
                  , _ = math.fit(homePage.time, .15 * (2 - A), 1 + .15 * (2 - A), 0, 1, ease.quadOut)
                  , L = math.fit(n, 0 + A * .1, .5 + A * .1, 0, 1, ease.cubicIn);
                y._focusRatio = math.saturate(y._focusRatio + (A == this.mainVisualFocusIndex ? e : -e) * 4),
                y._focusRatio = Math.max(y._focusRatio, math.fit(P, 1, 0, 0, 1)) * math.fit(P, 0, -.5, 1, 0);
                let D = math.fit(P, 2.25, 2.5, 1, 0) * math.fit(P, 1, 2, 1, Math.max(y._focusRatio * .75, .5)) * math.fit(P, -.5, -.25, 0, 1);
                y.style.transform = `rotate(${0 + math.mix(-7.5, 0, _) - math.fit(P, 2, 2.5, 0, 5, ease.cubicIn) - P * 7.5 + math.fit(P, 0, -.5, 0, 5, ease.cubicIn) + math.mix(0, 5, L)}deg) translateY(${ease.cubicInOut(y._focusRatio) * -1}%)`,
                y.style.opacity = _ * (1 - L) * D,
                y.style.zIndex = 6 - Math.floor(P * 2),
                y.style.pointerEvents = L < .2 ? "auto" : "none",
                y.style.cursor = P > .1 ? "pointer" : "default",
                y._isClickable = P > .1,
                y.style.filter = _ % 1 ? `blur(${((1 - _) * 10).toFixed(0)}px)` : "none",
                y._rimlight.isActive = P > .5 ? A == this.mainVisualFocusIndex : P < .5 && P > -.1,
                y._rimlight.update(e)
            }
            ),
            this.domMainVisualOuter.style.visibility = n < .7 ? "visible" : "hidden",
            this.domMainCopy.style.opacity = l,
            this.domHeroLogos.style.opacity = l,
            this.domHeroAlert.style.opacity = l,
            this.domHeroAlert.style.display = l > 0 ? "flex" : "none",
            this.domMainCopy.style.visibility = l > 0 ? "visible" : "hidden",
            this.domThumbnails.style.visibility = n > 4 && n < 7.75 ? "visible" : "hidden";
            let h = properties.viewportHeight * .35;
            if (n <= 5.1 || n >= 7.25)
                this.thumbHoverTargetIndex = this.thumbHoverIndex = 2,
                this.thumbHoverTargetRatio = 0;
            else if (t)
                this.thumbHoverTargetRatio = 0;
            else {
                let y = o + h
                  , A = this._thumbnailItemHeight / .8 * this._thumbnailToContainerHoverScale
                  , P = -(a + i.screenY - o) + input.mousePixelXY.y;
                P > y - A / 2 && P < y + A / 2 ? (this.thumbHoverTargetIndex = (input.mousePixelXY.x - (-(this._thumbnailItemTotalWidth - this._thumbnailItemWidth) / 2 * this._thumbnailToContainerScale + this._gridWidth / 2 + this._thumbnailItemLeft)) / (this._thumbnailItemWidth + this._thumbnailItemSpacing) / this._thumbnailToContainerScale,
                this.thumbHoverTargetIndex = math.clamp(this.thumbHoverTargetIndex, 0, 4),
                this.thumbHoverTargetIndex = Math.floor(this.thumbHoverTargetIndex) + math.fit(this.thumbHoverTargetIndex % 1, .2, .8, 0, 1),
                this.thumbHoverTargetRatio = 1) : (this.thumbHoverTargetIndex = Math.round(this.thumbHoverTargetIndex),
                this.thumbHoverTargetRatio = 0)
            }
            this.thumbHoverIndex = math.mix(this.thumbHoverIndex, this.thumbHoverTargetIndex, 1 - Math.exp(-8 * e)),
            this.thumbHoverRatio = math.mix(this.thumbHoverRatio, this.thumbHoverTargetRatio, 1 - Math.exp(-8 * e)) * math.fit(n, 5.1, 5.25, 0, 1);
            let d = n > 5.1
              , m = math.clamp((this._flowVisualHeight - this._thumbnailItemHeight) / (this.domThumbnailItemInnerList.length - 1), 0, 30);
            this.domThumbnailItemInnerList.forEach( (y, A) => {
                let P = math.fit(n, 4, t ? 4.5 : 5.25, 0, 1, ease.cubicInOut)
                  , _ = math.fit(Math.abs(this.thumbHoverIndex - A), 1 + this.thumbHoverRatio * .5, 0, 0, 1) * math.fit(n, 5.1, 5.25, 0, 1);
                t && (_ = math.fit(n, 4.25, 4.5, 0, 1));
                let L = (this._flowVisualHeight - m * (this.domThumbnailItemInnerList.length - A - 1)) / this._thumbnailItemHeight
                  , D = this._flowVisualX - this._gridLeft + this._flowVisualWidth * .5
                  , $ = this._flowVisualY + this._flowVisualHeight * .5
                  , R = math.mix(this._thumbnailToContainerScale, this._thumbnailToContainerHoverScale, _)
                  , T = t ? 4 - A : A
                  , C = ((this._thumbnailItemWidth + this._thumbnailItemSpacing) * T - (this._thumbnailItemTotalWidth - this._thumbnailItemWidth) / 2) * this._thumbnailToContainerScale + this._gridWidth / 2;
                t ? C += math.fit(n, 4.75, 6.25, 2, -2) * (this._thumbnailItemWidth + this._thumbnailItemSpacing) * R : C += math.fit(Math.abs(this.thumbHoverIndex - A), 1 + this.thumbHoverRatio * .5, 0, 0, 300 * R) * math.fit(Math.abs(this.thumbHoverIndex - A), 1 + this.thumbHoverRatio * .5, 0, 1, 0) * -Math.sign(this.thumbHoverIndex - A);
                let F = h
                  , U = math.mix(L, R, P)
                  , z = math.mix(D, C, P)
                  , B = math.mix($, F, P);
                y.style.transform = `translate3d(${z - math.mix(this._flowVisualWidth * .5, 750 / 2 * R, P)}px, ${B - math.mix(this._flowVisualHeight * .5, 497 / 2 * R, P)}px, 0) scale(${U})`,
                y.style.zIndex = n < 5.1 ? A : ~~math.fit(Math.abs(this.thumbHoverIndex - A), 0, 4, 10, 0),
                y.style.filter = t ? "none" : `brightness(${math.mix(.64, 1, ~~(math.fit(_, .1, 1, 0, 1) * 10) / 10)})`,
                y.style.pointerEvents = d ? "auto" : "none";
                let Z = math.fit(_, 0, 1, 1, t ? 1 : 1 / .8);
                this.domThumbnailItemImgList[A].style.transform = `scale(${Z})`;
                let j = 48
                  , V = math.fit(_, 0, 1, 0, (Z - 1) / 2 * this._thumbnailItemHeight + j - 1) - math.fit(_, 0, .75, this._thumbnailItemHeight * Z / 2 + j, 0, ease.sineOut)
                  , k = this.domThumbnailItemTextList[A];
                k.style.transform = `translateY(-100%) translateY(${V}px) scale(${1 / U})`,
                k.style.opacity = _,
                k.style.visibility = _ > 0,
                y.__posX = z,
                y.__posY = B,
                y.__scale = U
            }
            );
            let g = .375
              , p = 4.3
              , f = math.fit(n, g, .75, 0, 1) * math.fit(n, 4, p, 1, 0)
              , x = f > 0;
            if (this.domFlowVisual.style.visibility = x ? "visible" : "hidden",
            this.domFlowContent.style.visibility = x ? "visible" : "hidden",
            x) {
                let y = math.fit(n, .375, .75, 0, 1)
                  , A = math.fit(n, 4, p, 0, 1)
                  , P = 0
                  , _ = math.fit(y, 0, .9, 1, 0, ease.cubicOut) * this._flowVisualItemOffset * .1
                  , L = 1
                  , D = math.fit(y, 0, .9, 0, 1, ease.sineOut) * math.fit(A, .1, 1, 1, 0, ease.sineIn);
                if (A > 0) {
                    let U = this.domThumbnailItemInnerList[this.domThumbnailItemInnerList.length - 1]
                      , z = U.__posX
                      , B = U.__posY
                      , Z = U.__scale;
                    P = z - this._flowVisualX - this._flowVisualWidth * .5 + this._gridLeft,
                    _ = B - this._flowVisualY - this._flowVisualHeight * .5,
                    L = Z / this._flowVisualWidth * this._thumbnailItemWidth
                }
                this.domFlowVisualInner.style.transform = `translate3d(${P}px,${_}px,0) scale(${L})`,
                this.domFlowVisualInner.style.opacity = D;
                let R = math.fit(n, g, p, 0, 11)
                  , T = -1 + math.linearstep(0, 1, R) + math.linearstep(4, 5, R) + math.linearstep(6, 7, R) + math.linearstep(8, 9, R) + math.linearstep(10, 11, R)
                  , C = Math.min(3, Math.round(T));
                C !== this.flowStep && (this.domVisualNavItems[RIGHT_NAV_ORDERS[this.flowStep]] && this.domVisualNavItems[RIGHT_NAV_ORDERS[this.flowStep]].classList.remove("is-active"),
                this.domVisualNavItems[RIGHT_NAV_ORDERS[C]] && this.domVisualNavItems[RIGHT_NAV_ORDERS[C]].classList.add("is-active"),
                this.flowStep = C);
                let F = math.fit(n - .375, 0, 4, 0, 1);
                F = F == 1 ? 1 : .25 + math.fit(F * 3 % 1, .1, .9, 0, .25, ease.cubicInOut) + .25 * Math.floor(F * 3),
                this.domVisualSlider.style.opacity = t ? math.linearstep(10.4, 10.2, R) : 1,
                this.domVisualSliderDot.style.left = `${F * 100}%`,
                this.domVisualSliderLine.style.transform = `scaleX(${F})`,
                this.domFlow1Chat1.style.opacity = math.linearstep(.5, 1.25, R),
                this.domFlow1Chat1.style.transform = `translateY(${math.fit(R, .5, 1.25, 1, 0, ease.sineOut)}em)`,
                this.domFlow1Status.style.opacity = math.linearstep(1.75, 2.25, R) * math.linearstep(5, 4, R),
                this.domFlow1Chat2.style.opacity = math.linearstep(2.6, 3.1, R),
                this.domFlow1Chat2.style.transform = `translateY(${math.fit(R, 2.6, 3.1, 1, 0, ease.sineOut)}em)`,
                this.domFlow1Visual.style.opacity = math.linearstep(4.7, 4.3, R),
                this.domFlowVisualInner.style.setProperty("--tab-ratio", math.linearstep(3.5, 4, R)),
                this.domFlow2Status.style.opacity = math.linearstep(4, 4.5, R) * math.linearstep(6.5, 6, R),
                this.domFlow2Chat1.style.opacity = math.linearstep(5, 5.5, R),
                this.domFlow2Chat1.style.transform = `translateY(${math.fit(R, 5, 5.5, 1, 0, ease.sineOut)}em)`,
                this.domFlow2Visual.style.opacity = math.linearstep(4.3, 4.7, R) * math.linearstep(6.7, 6.3, R),
                this.domFlow3Status.style.opacity = math.linearstep(6, 6.5, R) * math.linearstep(8.5, 8, R),
                this.domFlow3Chat1.style.opacity = math.linearstep(7, 7.5, R),
                this.domFlow3Chat1.style.transform = `translateY(${math.fit(R, 7, 7.5, 1, 0, ease.sineOut)}em)`,
                this.domFlow3Visual.style.opacity = math.linearstep(6.3, 6.7, R) * math.linearstep(8.7, 8.3, R),
                this.domFlow4Visual.style.opacity = math.linearstep(8.3, 8.7, R),
                this.domFlow4Chat1.style.opacity = math.linearstep(8.7, 9.2, R),
                this.domFlow4Chat1.style.transform = `translateY(${math.fit(R, 8.7, 9.2, 1, 0, ease.sineOut)}em)`,
                this.domFlowCopyNav.style.opacity = f,
                this.domFlowCopyItemList.forEach( (U, z) => {
                    let B = z === this.domFlowCopyItemList.length - 1
                      , Z = T - z
                      , j = math.linearstep(-.5, 0, Z)
                      , V = math.linearstep(0, .5, Z)
                      , k = math.fit(j, 0, 1, 40, 0, ease.cubicOut) + math.fit(V, 0, 1, 0, -40, ease.cubicIn)
                      , K = math.fit(j, 0, 1, 0, 1, ease.sineOut) * math.fit(V, 0, 1, 1, 0, ease.sineIn)
                      , ee = math.fit(j, 0, 1, 0, 1, ease.sineOut) * math.fit(V, 0, 1, 1, B ? 1 : 0, ease.sineIn);
                    U.style.transform = `translateY(${k}px) translateY(-50%)`,
                    U.style.opacity = K,
                    U.style.visibility = K > 0 ? "visible" : "hidden";
                    let ie = this.domFlowCopyNavHexList[z];
                    ie.style.fill = _c1.setStyle("#0d1119").lerp(_c2, ee).getStyle()
                }
                )
            } else
                this.domFlowCopyItemList.forEach(y => {
                    y.style.visibility = "hidden"
                }
                );
            this.domEndCopy.style.opacity = math.fit(n, 4.55, 4.75, 0, 1),
            this.domEndCopy.style.pointerEvents = n > 4.65 ? "auto" : "none",
            this.borderRatio = math.fit(r, -2, -1, 0, 1),
            bgVisual.moveRatio = math.fit(r, -1.5, -1, bgVisual.moveRatio, 1),
            bgVisual.counterOffsetY += math.fit(r, -7, -1, 0, 6);
            let S, v, M;
            scrollManager.useTestValues ? (S = 2,
            v = 1.2,
            M = t ? 1 : .6) : (S = 2,
            v = 1.2,
            M = t ? 1 : .75),
            scrollManager.frictionCoeffFrom = math.fit(r, -2, -1, S, scrollManager.frictionCoeffFrom),
            scrollManager.frictionCoeffTo = math.fit(r, -2, -1, v, scrollManager.frictionCoeffTo),
            scrollManager.scrollMultiplier = math.fit(r, -2, -1, M, scrollManager.scrollMultiplier)
        } else
            this.thumbHoverTargetIndex = this.thumbHoverIndex = 2;
        super.update(e)
    }
}
const homeHero = new HomeHero;
class HomeBento extends Section {
    preInit(e) {
        super.preInit(homePage, "home-bento", "dark", !0),
        this.domRimlightList = this.domContainerEl.querySelectorAll(".o-rimlight"),
        this.dotButton = this.domContainerEl.querySelector("#home-bento__item-image-main-wrapper-dot"),
        this.domRimlightList.forEach(t => {
            let i = t.parentElement;
            t._instance = new Rimlight(t),
            i.addEventListener("mouseenter", () => {
                t._instance.isActive = !0
            }
            ),
            i.addEventListener("mouseleave", () => {
                t._instance.isActive = !1
            }
            )
        }
        ),
        this.dotButton.addEventListener("click", () => {
            this.dotButton.closest(".home-bento__item").classList.toggle("is-active")
        }
        ),
        this.visual1State = "",
        this.domVisual1 = this.domContainerEl.querySelector("#home-bento__item-01-visual-wrapper"),
        this.domContainerEl.querySelector("#home-bento__item-01-visual-button-success").addEventListener("click", this._onVisual1BtnClick.bind(this))
    }
    _resetVisual1Btns() {
        this.visual1State && this.domVisual1.classList.remove("is-" + this.visual1State),
        this.visual1State = ""
    }
    _onVisual1BtnClick(e) {
        let t = e.currentTarget.dataset.id;
        this.visual1State !== t && (this.visual1State && this.domVisual1.classList.remove("is-" + this.visual1State),
        this.visual1State = t,
        this.domVisual1.classList.add("is-" + this.visual1State))
    }
    init() {
        super.init()
    }
    onPageShow() {
        this._resetVisual1Btns(),
        this.dotButton.closest(".home-bento__item").classList.remove("is-active")
    }
    resize(e, t) {
        this.domRimlightList.forEach(i => {
            i._instance.resize()
        }
        ),
        super.resize(e, t)
    }
    update(e) {
        this.domRimlightList.forEach(t => {
            t._instance.update(e)
        }
        ),
        super.update(e)
    }
}
const homeBento = new HomeBento
  , SLIDE_COUNT$1 = 3
  , DEFAULT_SLIDE_INDEX = 2;
class Slider {
    domContainer;
    _slideSpacing = 0;
    _slidesContainerWidth = 0;
    _slideCollapedWidth = 0;
    _slideExpandedWidth = 0;
    _hasSlideInteracted = !1;
    _slideInteractedTime = 0;
    _activeIndex = DEFAULT_SLIDE_INDEX;
    _waitTime = 7.5;
    _wasChangedByTime = !1;
    _slideList = [];
    constructor(e) {
        this.domContainer = e;
        let t = e.querySelectorAll(".o-slider__slide")
          , i = e.querySelectorAll(".o-slider__slide-wrapper");
        for (let n = 0; n < SLIDE_COUNT$1; n++) {
            const r = t[n];
            t[n].addEventListener("mouseenter", this._onSlideClick.bind(this, n));
            let o = r.querySelectorAll(".o-slider__slide-list-item")
              , a = r.querySelectorAll(".o-slider__slide-image img");
            for (let u = 0; u < o.length; u++)
                o[u].addEventListener("mouseenter", this._onSlideItemHover.bind(this, n, u));
            r.querySelectorAll(".o-slider__slide-timer-item");
            let c = r.querySelectorAll(".o-slider__slide-timer-item");
            r.querySelectorAll(".o-slider__slide-timer-item-progress");
            let l;
            for (let u = 0; u < c.length; u++) {
                let h = c[u];
                n == u ? l = h.querySelector(".o-slider__slide-timer-item-progress") : h.addEventListener("click", this._onTimerItemClick.bind(this, u))
            }
            this._slideList.push({
                activeRatio: n == this._activeIndex ? 1 : 0,
                dom: r,
                domWrapper: i[n],
                itemIndex: 0,
                domItemList: o,
                domImgList: a,
                domTimerItemProgress: l,
                time: 0
            })
        }
    }
    _onTimerItemClick(e, t) {
        t.stopPropagation(),
        this._activeIndex !== e && this._changeSlide(e, !0)
    }
    _onSlideClick(e) {
        this._activeIndex !== e && this._changeSlide(e, !1)
    }
    _changeSlide(e, t) {
        !t && this._wasChangedByTime || (this._slideList[this._activeIndex].time = 0,
        this._activeIndex !== e && (this._activeIndex = e,
        this._hasSlideInteracted = !0,
        this._wasChangedByTime = t),
        this._slideList[e].time = 0)
    }
    _onSlideItemHover(e, t) {
        let i = this._slideList[e]
          , n = i.itemIndex;
        n !== t && (i.itemIndex = t,
        i.domItemList[n] && i.domItemList[n].classList.remove("is-active"),
        i.domImgList[n] && i.domImgList[n].classList.remove("is-active"),
        i.domItemList[t] && i.domItemList[t].classList.add("is-active"),
        i.domImgList[t] && i.domImgList[t].classList.add("is-active"))
    }
    resize() {
        this._slideSpacing = properties.useMobileLayout ? 10 : properties.viewportWidth / 100,
        this._slidesContainerWidth = this.domContainer.getBoundingClientRect().width,
        this._slideCollapedWidth = (this._slidesContainerWidth - this._slideSpacing * 9) / 10,
        this._slideExpandedWidth = this._slidesContainerWidth - 2 * (this._slideSpacing + this._slideCollapedWidth);
        for (let e = 0; e < SLIDE_COUNT$1; e++) {
            const t = this._slideList[e];
            t.domWrapper.style.width = `${this._slideExpandedWidth}px`
        }
    }
    update(e) {
        if (scrollManager.getDomRange(this.domContainer).isActive) {
            this._hasSlideInteracted || (this._slideInteractedTime += e,
            this._activeIndex = Math.round(math.fit(this._slideInteractedTime, 0, .3, DEFAULT_SLIDE_INDEX, 0)),
            this._slideList[this._activeIndex].time = 0,
            this._activeIndex == 0 && (this._hasSlideInteracted = !0));
            let i = !1;
            for (let a = 0; a < SLIDE_COUNT$1; a++) {
                const c = this._slideList[a];
                let l = a == this._activeIndex;
                c.activeRatio = math.saturate(math.mix(c.activeRatio, l ? 1 : 0, 1 - Math.exp(-7 * e))),
                l ? (c.dom.classList.add("is-active"),
                this._slideExpandedWidth - c.activeRatio * this._slideExpandedWidth < .1 && (c.activeRatio = 1)) : (c.dom.classList.remove("is-active"),
                c.activeRatio * this._slideExpandedWidth < .1 && (c.activeRatio = 0)),
                c.activeRatio == 1 && (i = !0)
            }
            i && (this._wasChangedByTime = !1);
            let n = 0;
            for (let a = 0; a < SLIDE_COUNT$1; a++)
                n += this._slideList[a].activeRatio;
            let r = 0;
            for (let a = 0; a < SLIDE_COUNT$1; a++) {
                const c = this._slideList[a];
                let l = c.activeRatio / n
                  , u = r
                  , h = math.mix(this._slideCollapedWidth, this._slideExpandedWidth, l)
                  , d = (this._slideSpacing + this._slideCollapedWidth) * a;
                c.dom.style.transform = "translate3d(" + u + "px,0,0)",
                c.dom.style.width = h + "px",
                c.domWrapper.style.transform = "translate3d(" + (d - u) + "px,0,0)",
                c.domWrapper.style.opacity = math.fit(l, 0, .5, 0, 1),
                r += h + this._slideSpacing
            }
            let o = this._slideList[this._activeIndex];
            o.time = Math.min(o.time + e, this._waitTime),
            o.domTimerItemProgress.style.transform = "scaleX(" + math.fit(o.time, 0, this._waitTime, 0, 1) + ")",
            o.time == this._waitTime && this._changeSlide((this._activeIndex + 1) % SLIDE_COUNT$1, !0)
        } else {
            this._wasChangedByTime = !1,
            this._hasSlideInteracted = !1,
            this._slideInteractedTime = 0;
            for (let i = 0; i < SLIDE_COUNT$1; i++)
                this._slideList[i].activeRatio = i == DEFAULT_SLIDE_INDEX ? 1 : 0,
                this._slideList[i].time = 0
        }
    }
}
class HomeUseCases extends Section {
    _slider;
    preInit(e) {
        super.preInit(homePage, "home-use-cases", "light"),
        this._slider = new Slider(this.domContainerEl.querySelector("#home-use-cases__slider"))
    }
    init() {
        super.init()
    }
    resize(e, t) {
        this._slider.resize(e, t),
        super.resize(e, t)
    }
    update(e) {
        this._slider.update(e),
        super.update(e)
    }
}
const homeUseCases = new HomeUseCases
  , COL_COUNT = 6;
class HomeIntegrationDesktopCard {
    constructor(e, t, i) {
        this.domElement = e[i],
        this.domWrapperElement = this.domElement.querySelector(".o-integration-card__wrapper"),
        this.col = t,
        this.row = i,
        this.toCenterColumn = t - (COL_COUNT - 1) / 2;
        let n = i === e.length - 1;
        this.keyIdx = n ? this.toCenterColumn + 1 : -1,
        (this.keyIdx < 0 || this.keyIdx > 2) && (this.keyIdx = -1),
        this.keyIdx = Math.floor(this.keyIdx),
        this.isKey = this.keyIdx > -1,
        this.isKeyCardEnded = !1,
        this.keyCardLeft = 0
    }
    update(e, t) {
        let i = scrollManager.getDomRange(this.domElement)
          , n = i.screenY + i.height * .5
          , r = 0
          , o = t < 1
          , a = Math.max(0, -n + properties.viewportHeight * .5);
        r -= Math.pow(a / properties.viewportHeight, 2) * properties.viewportHeight * .5 + Math.abs(this.toCenterColumn) * Math.max(0, e - 1) * properties.viewportHeight * .2,
        this.isKey && (r = Math.max(properties.viewportHeight * .5, n + r) - n,
        o = t < .7),
        this.domElement.style.visibility = o ? "visible" : "hidden",
        o && (this.domWrapperElement.style.transform = `translate3d(0,${r}px,0)`)
    }
}
const SLIDE_COUNT = 2
  , SLIDE_SPACING = 16;
class HomeIntegration extends Section {
    _domTitle;
    _cardList = [];
    _keyCardList = [];
    _slideActiveIdx = 1;
    _slidesStartRatio = 0;
    _slidesContainerX;
    _slidesContainerWidth;
    _slidesContainerHeight;
    _slideList = [];
    preInit(e) {
        super.preInit(homePage, "home-integration", "light"),
        this._domTitle = this.domContainerEl.querySelector("#home-integration__title"),
        this._domTitleWrapper = this.domContainerEl.querySelector("#home-integration__title-wrapper");
        let t = this.domContainerEl.querySelectorAll("#home-integration__cards-desktop .home-integration__cards-column");
        for (let r = 0; r < t.length; r++) {
            let o = t[r].querySelectorAll(".o-integration-card");
            for (let a = 0; a < o.length; a++) {
                let c = new HomeIntegrationDesktopCard(o,r,a);
                this._cardList.push(c),
                c.isKey && (this._keyCardList[c.keyIdx] = c)
            }
        }
        this._domSlidesContainer = this.domContainerEl.querySelector("#home-integration__slides");
        let i = this.domContainerEl.querySelectorAll(".home-integration__slide")
          , n = this.domContainerEl.querySelectorAll(".home-integration__slide-wrapper");
        for (let r = 0; r < SLIDE_COUNT; r++) {
            const o = i[r];
            i[r].addEventListener("mouseenter", this._onSlideHover.bind(this, r)),
            this._slideList.push({
                activeRatio: r == this._slideActiveIdx ? 1 : 0,
                dom: o,
                innerDom: o.querySelector(".home-integration__slide-bg"),
                domWrapper: n[r]
            })
        }
    }
    init() {
        super.init()
    }
    resize(e, t) {
        let i = this._domSlidesContainer.getBoundingClientRect();
        this._slidesContainerLeft = i.left,
        this._slidesContainerWidth = i.width,
        this._slidesContainerHeight = i.height;
        let n;
        for (let r = 0; r < this._keyCardList.length; r++) {
            const o = this._keyCardList[r];
            n = o.domElement.getBoundingClientRect(),
            o.keyCardLeft = n.left
        }
        this._cardWidth = n.width,
        this._cardHeight = n.height,
        this._slideExpandedWidth = this._slidesContainerWidth - (SLIDE_COUNT - 1) * (SLIDE_SPACING + this._cardWidth);
        for (let r = 0; r < SLIDE_COUNT; r++) {
            const o = this._slideList[r];
            o.domWrapper.style.width = this._slideExpandedWidth + "px",
            o.domWrapper.style.height = this._slidesContainerHeight + "px"
        }
        super.resize(e, t)
    }
    _onSlideHover(e) {
        this._slideActiveIdx = e
    }
    update(e) {
        if (!this.domContainerEl)
            return;
        let t = scrollManager.getDomRange(this.domContainerEl)
          , i = t.isActive
          , n = i && !properties.useMobileLayout;
        this.domContainerEl.style.visibility = i ? "visible" : "hidden";
        let r = t.showScreenOffset / (t.height / properties.viewportHeight);
        if (n) {
            let o = scrollManager.getDomRange(this._domTitle)
              , a = Math.max(o.screenY - t.screenY, o.screenY) - o.screenY + math.fit(t.showScreenOffset, 0, 1, -50, 0, ease.quadIn)
              , c = math.fit(r, .5, .65, 1, 0)
              , l = math.fit(r, .5, .65, 0, 10);
            this._domTitleWrapper.style.transform = `translateY(${a}px)`,
            this._domTitleWrapper.style.opacity = c,
            this._domTitleWrapper.style.visibility = c > 0 ? "visible" : "hidden",
            this._domTitleWrapper.style.filter = `blur(${l}px)`,
            this._cardList.forEach(h => {
                h.update(t.showScreenOffset, r)
            }
            );
            let u = r >= .7;
            if (this._domSlidesContainer.style.visibility = u ? "visible" : "hidden",
            u) {
                let h = scrollManager.getDomRange(this._domSlidesContainer)
                  , d = math.fit(r, .7, .95, 0, 1, ease.cubicInOut)
                  , m = math.mix(this._cardHeight, this._slidesContainerHeight, d)
                  , g = -h.screenY + (properties.viewportHeight - m) * .5;
                g = Math.min(g, 0);
                for (let S = 0; S < SLIDE_COUNT; S++) {
                    const v = this._slideList[S]
                      , M = math.fit(d, .35, .65, 1, 0);
                    v.innerDom.style.opacity = M,
                    v.domWrapper.style.visibility = M < 1 ? "visible" : "hidden";
                    let y = S == this._slideActiveIdx;
                    v.activeRatio = math.saturate(math.mix(v.activeRatio, y ? 1 : 0, 1 - Math.exp(-7 * e))),
                    this._slideList[S].dom.classList.toggle("is-active", S == this._slideActiveIdx)
                }
                let p = 0;
                for (let S = 0; S < SLIDE_COUNT; S++)
                    p += this._slideList[S].activeRatio;
                let f = math.mix(-this._slidesContainerLeft + this._keyCardList[0].keyCardLeft, 0, d)
                  , x = math.mix(this._keyCardList[1].keyCardLeft - this._keyCardList[0].keyCardLeft - this._cardWidth, SLIDE_SPACING, d);
                for (let S = 0; S < SLIDE_COUNT; S++) {
                    const v = this._slideList[S];
                    let M = v.activeRatio / p
                      , y = f
                      , A = math.mix(this._cardWidth, math.mix(this._cardWidth, this._slideExpandedWidth, M), d)
                      , P = (SLIDE_SPACING + this._cardWidth) * S;
                    v.dom.style.transform = "translate3d(" + y + "px," + g + "px,0)",
                    v.dom.style.width = A + "px",
                    v.dom.style.height = m + "px",
                    v.domWrapper.style.transform = "translate3d(" + (P - y) + "px,0,0)",
                    f += A + x
                }
            }
        } else
            i && (this._domTitleWrapper.style.transform = "translateZ(0)",
            this._domTitleWrapper.style.opacity = 1,
            this._domTitleWrapper.style.visibility = "visible",
            this._domTitleWrapper.style.filter = "none");
        super.update(e)
    }
}
const homeIntegration = new HomeIntegration;
class HomeCta extends Section {
    preInit() {
        super.preInit(homePage, "home-cta", "light")
    }
    init() {
        super.init()
    }
    resize(e, t) {
        super.resize(e, t)
    }
    update(e) {
        super.update(e)
    }
}
const homeCta = new HomeCta;
class HomePage extends Page {
    path = "";
    id = "home";
    preInit() {
        super.preInit(),
        homeHero.preInit(this.domContainer),
        homeUseCases.preInit(this.domContainer),
        homeBento.preInit(this.domContainer),
        homeIntegration.preInit(this.domContainer),
        homeCta.preInit(this.domContainer)
    }
    init() {
        homeHero.init(),
        homeUseCases.init(),
        homeBento.init(),
        homeIntegration.init(),
        homeCta.init()
    }
    resize(e, t) {
        homeHero.resize(e, t),
        homeUseCases.resize(e, t),
        homeBento.resize(e, t),
        homeIntegration.resize(e, t),
        homeCta.resize(e, t)
    }
    show(e, t, i) {
        homeBento.onPageShow(),
        super.show(e, t, i)
    }
    update(e) {
        super.update(e),
        homeHero.update(e),
        homeUseCases.update(e),
        homeBento.update(e),
        homeIntegration.update(e),
        homeCta.update(e),
        super.postUpdate(e)
    }
}
const homePage = new HomePage
  , REF_SIZE = 700
  , SPRITE_SIZE = 256
  , SPRITE_COL = 4
  , ICON_LIST = [{
    x: 0,
    y: 0,
    r: 170
}, {
    x: -180,
    y: -180,
    r: 68
}, {
    x: -180,
    y: 180,
    r: 68
}, {
    x: 180,
    y: 180,
    r: 68
}, {
    x: 180,
    y: -180,
    r: 68
}, {
    x: -294,
    y: 0,
    r: 110
}, {
    x: 0,
    y: 294,
    r: 110
}, {
    x: 294,
    y: 0,
    r: 110
}, {
    x: 0,
    y: -294,
    r: 110
}, {
    x: -350,
    y: -216,
    r: 68
}, {
    x: -350,
    y: 216,
    r: 68
}, {
    x: -216,
    y: 350,
    r: 68
}, {
    x: 216,
    y: 350,
    r: 68
}, {
    x: 350,
    y: 216,
    r: 68
}, {
    x: 350,
    y: -216,
    r: 68
}, {
    x: 216,
    y: -350,
    r: 68
}, {
    x: -216,
    y: -350,
    r: 68
}];
class EnterpriseFeaturesIcons {
    viewWidth = 0;
    viewHeight = 0;
    isActive = !1;
    mouseX = 0;
    mouseY = 0;
    targetMouseX = 0;
    targetMouseY = 0;
    activeDynamics;
    showRatio = 0;
    preInit(e) {
        this.canvas = e.querySelector("#enterprise-features-icons-canvas"),
        this.ctx = this.canvas.getContext("2d"),
        this.domContainer = this.canvas.parentNode,
        this.img = properties.loader.load(settings.IMAGE_PATH + "enterprise/enterprise-features-icons.png").content,
        this.activeDynamics = new SecondOrderDynamics(0,2,.3,3);
        for (let t = 0; t < ICON_LIST.length; t++) {
            let i = ICON_LIST[t];
            i.originalX = i.x,
            i.originalY = i.y,
            i.originalR = i.r,
            i.radiusRatio = math.distanceTo(i.originalX, i.originalY) / math.distanceTo(REF_SIZE / 2, REF_SIZE / 2)
        }
        this.domContainer.addEventListener("mouseenter", this.onMouseMove.bind(this)),
        this.domContainer.addEventListener("mousemove", this.onMouseMove.bind(this)),
        this.domContainer.addEventListener("mouseleave", this.onMouseLeave.bind(this))
    }
    onMouseMove(e) {
        let t = scrollManager.getDomRange(this.domContainer);
        this.isActive = !0,
        this.targetMouseX = math.fit(e.clientX - t.screenX, 0, t.width, -REF_SIZE / 2, REF_SIZE / 2),
        this.targetMouseY = math.fit(e.clientY - t.screenY, 0, t.height, -REF_SIZE / 2, REF_SIZE / 2)
    }
    onMouseLeave() {
        this.isActive = !1
    }
    init() {}
    resize(e, t) {
        let i = this.domContainer.getBoundingClientRect();
        this.viewWidth = i.width,
        this.viewHeight = i.height,
        this.canvas.width = Math.ceil(i.width * settings.DPR),
        this.canvas.height = Math.ceil(i.height * settings.DPR)
    }
    update(e) {
        if (scrollManager.getDomRange(this.domContainer).isActive) {
            this.mouseX = math.mix(this.mouseX, this.targetMouseX, 1 - Math.exp(-e * 9)),
            this.mouseY = math.mix(this.mouseY, this.targetMouseY, 1 - Math.exp(-e * 9)),
            this.activeDynamics.update(e, this.isActive ? 1 : 0);
            let i = 0;
            if (this.showRatio = math.saturate(this.showRatio + e),
            !this.img.naturalWidth)
                return;
            let n = this.ctx;
            n.save(),
            n.scale(settings.DPR * this.viewWidth / REF_SIZE, settings.DPR * this.viewHeight / REF_SIZE),
            n.clearRect(0, 0, REF_SIZE, REF_SIZE),
            n.translate(REF_SIZE / 2, REF_SIZE / 2);
            for (let r = 0; r < ICON_LIST.length; r++) {
                let o = ICON_LIST[r]
                  , a = math.fit(this.showRatio, .3 * o.radiusRatio, .7 + o.radiusRatio * .3, 0, 1)
                  , c = this.mouseX - o.originalX
                  , l = this.mouseY - o.originalY
                  , u = math.distanceTo(c, l) / math.distanceTo(REF_SIZE, REF_SIZE)
                  , h = Math.pow(1 - u, 3) * i
                  , d = h * .15;
                o.x = o.originalX + (this.mouseX - o.originalX) * d,
                o.y = o.originalY + (this.mouseY - o.originalY) * d;
                let m = math.fit(o.radiusRatio, 0, 1, 1, math.fit(h, .2, .5, .1, 1))
                  , g = math.fit(o.radiusRatio, .45, .8, 1, math.fit(h, .2, .5, .3, 1));
                n.save(),
                n.translate(o.x, o.y),
                n.fillStyle = "rgba(255, 255, 255, " + m * .25 + ")",
                n.beginPath(),
                n.arc(0, 0, o.r * math.fit(a, 0, .8, 0, 1, ease.backOut) * math.mix(1, .9, h), 0, Math.PI * 2),
                n.closePath(),
                n.fill(),
                n.globalAlpha = g;
                let p = r % SPRITE_COL * SPRITE_SIZE
                  , f = ~~(r / SPRITE_COL) * SPRITE_SIZE
                  , x = o.r * .75 * math.fit(a, .2, 1, 0, 1, ease.backOut) * math.mix(1, 1.15, h);
                n.drawImage(this.img, p, f, SPRITE_SIZE, SPRITE_SIZE, -x / 2, -x / 2, x, x),
                n.restore()
            }
            n.restore()
        } else
            this.targetMouseX = this.mouseX = 0,
            this.targetMouseY = this.mouseY = 0,
            this.showRatio = 0,
            this.activeDynamics.reset(0)
    }
}
const enterpriseFeaturesIcons = new EnterpriseFeaturesIcons;
class EnterpriseFeatures extends Section {
    _slider;
    preInit(e) {
        super.preInit(enterprisePage, "enterprise-features", "light"),
        this._slider = new Slider(this.domContainerEl.querySelector("#enterprise-features__slider")),
        enterpriseFeaturesIcons.preInit(this.domContainerEl)
    }
    init() {
        enterpriseFeaturesIcons.init(),
        super.init()
    }
    resize(e, t) {
        this._slider.resize(e, t),
        enterpriseFeaturesIcons.resize(e, t),
        super.resize(e, t)
    }
    update(e) {
        this._slider.update(e),
        enterpriseFeaturesIcons.update(e),
        super.update(e)
    }
}
const enterpriseFeatures = new EnterpriseFeatures;
class EnterpriseCta extends Section {
    preInit() {
        super.preInit(enterprisePage, "enterprise-cta", "light")
    }
    init() {
        super.init()
    }
    resize(e, t) {
        super.resize(e, t)
    }
    update(e) {
        super.update(e)
    }
}
const enterpriseCta = new EnterpriseCta;
class EnterpriseBento extends Section {
    preInit(e) {
        super.preInit(enterprisePage, "enterprise-bento", "dark", !0),
        this.domRimlightList = this.domContainerEl.querySelectorAll(".o-rimlight"),
        this.domRimlightList.forEach(t => {
            let i = t.parentElement;
            t._instance = new Rimlight(t),
            i.addEventListener("mouseenter", () => {
                t._instance.isActive = !0
            }
            ),
            i.addEventListener("mouseleave", () => {
                t._instance.isActive = !1
            }
            )
        }
        )
    }
    init() {
        super.init()
    }
    resize(e, t) {
        this.domRimlightList.forEach(i => {
            i._instance.resize()
        }
        ),
        super.resize(e, t)
    }
    update(e) {
        const t = scrollManager.getDomRange(this.domContainerEl);
        this.borderRatio = math.fit(t.hideScreenOffset, Math.max(-1.5, -t.height / properties.viewportHeight), -1, 0, 1),
        this.domRimlightList.forEach(i => {
            i._instance.update(e)
        }
        ),
        super.update(e)
    }
}
const enterpriseBento = new EnterpriseBento;
class EnterprisePage extends Page {
    path = "enterprise";
    id = "enterprise";
    preInit() {
        super.preInit(),
        enterpriseBento.preInit(this.domContainer),
        enterpriseFeatures.preInit(this.domContainer),
        enterpriseCta.preInit(this.domContainer)
    }
    init() {
        enterpriseBento.init(),
        enterpriseFeatures.init(),
        enterpriseCta.init()
    }
    resize(e, t) {
        enterpriseBento.resize(e, t),
        enterpriseFeatures.resize(e, t),
        enterpriseCta.resize(e, t)
    }
    update(e) {
        super.update(e),
        enterpriseBento.update(e),
        enterpriseFeatures.update(e),
        enterpriseCta.update(e),
        super.postUpdate(e)
    }
}
const enterprisePage = new EnterprisePage;
class PricingHeader extends Section {
    preInit(e) {
        super.preInit(pricingPage, "pricing-header", "dark", !0),
        this.borderRatio = 0,
        this.domRimlightList = this.domContainerEl.querySelectorAll(".o-rimlight"),
        this.domRimlightList.forEach(t => {
            let i = t.parentElement;
            t._instance = new Rimlight(t),
            i.addEventListener("mouseenter", () => {
                t._instance.isActive = !0
            }
            ),
            i.addEventListener("mouseleave", () => {
                t._instance.isActive = !1
            }
            )
        }
        )
    }
    init() {
        super.init()
    }
    resize(e, t) {
        this.domRimlightList.forEach(i => {
            i._instance.resize()
        }
        ),
        super.resize(e, t)
    }
    update(e) {
        const t = scrollManager.getDomRange(this.domContainerEl);
        this.borderRatio = math.fit(t.showScreenOffset, 1, Math.max(1.25, t.height / properties.viewportHeight), 0, 1),
        this.domRimlightList.forEach(i => {
            i._instance.update(e)
        }
        ),
        super.update(e)
    }
}
const pricingHeader = new PricingHeader;
class pricingPlans extends Section {
    _titleTop = 0;
    _titleBottom = 0;
    _mobileTop = 0;
    preInit(e) {
        super.preInit(pricingPage, "pricing-plans", "light"),
        this.domMobileNavButtons = this.domContainerEl.querySelectorAll(".pricing-plans__nav-mobile-top-item"),
        this.domMobileNavCTA = this.domContainerEl.querySelectorAll(".pricing-plans__nav-mobile-bottom-item"),
        this.domItemsWrapper = this.domContainerEl.querySelectorAll(".pricing-plans__section-item-inner-wrapper"),
        this.domTitle = this.domContainerEl.querySelector("#pricing-plans__title"),
        this.domMobile = this.domContainerEl.querySelector("#pricing-plans__nav-mobile"),
        this.domMobileNavButtons.forEach(t => {
            t.addEventListener("click", () => {
                this.handleMobileNavButtonClick(t)
            }
            )
        }
        )
    }
    handleMobileNavButtonClick(e) {
        this.domMobileNavButtons.forEach(t => {
            t.classList.remove("is-active")
        }
        ),
        e.classList.add("is-active"),
        this.domMobileNavCTA.forEach(t => {
            t.classList.remove("is-active"),
            t.dataset.id == e.dataset.plan && t.classList.add("is-active")
        }
        ),
        this.domItemsWrapper.forEach(t => {
            t.classList.remove("is-active"),
            t.dataset.id == e.dataset.plan && t.classList.add("is-active")
        }
        )
    }
    init() {
        super.init()
    }
    resize(e, t) {
        if (this.domTitle.style.transform = "translateZ(0)",
        this.domMobile.style.transform = "translateZ(0)",
        properties.useMobileLayout) {
            let i;
            i = this.domContainerEl.getBoundingClientRect();
            let n = i.top;
            i = this.domTitle.getBoundingClientRect(),
            this._titleTop = i.top - n,
            this._titleBottom = i.bottom - n,
            i = this.domMobile.getBoundingClientRect(),
            this._mobileTop = i.top - n,
            this._mobileBottom = i.bottom - n
        }
        super.resize(e, t)
    }
    update(e) {
        super.update(e);
        const t = scrollManager.getDomRange(this.domContainerEl);
        if (properties.useMobileLayout) {
            let i;
            i = Math.max(0, -t.screenY),
            i = Math.min(i, t.height - this._mobileBottom),
            this.domTitle.style.transform = `translateY(${i}px)`,
            i = Math.max(0, -t.screenY - (this._mobileTop - this._titleBottom) * .5),
            i = Math.min(i, t.height - (this._mobileTop - this._titleBottom) * .5 - this._mobileBottom),
            this.domMobile.style.transform = `translateY(${i}px)`
        }
    }
}
const pricingPlans$1 = new pricingPlans;
class PricingFaq extends Section {
    currentItem = null;
    preInit(e) {
        super.preInit(pricingPage, "pricing-faq", "dark", !0),
        this.domPricingRight = e.querySelector("#pricing-faq__right"),
        this.itemList = e.querySelectorAll(".pricing-faq__list-item"),
        this.itemList.forEach(t => {
            t.querySelector(".pricing-faq__list-question").addEventListener("click", this._onItemClick.bind(this, t))
        }
        )
    }
    _onItemClick(e) {
        let t = scrollManager.scrollPixel;
        properties.onResized.addOnce( () => {
            scrollManager.scrollToPixel(t, !0)
        }
        ),
        this._activateItem(this.currentItem === e ? null : e),
        properties.needsResize = !0
    }
    _activateItem(e) {
        this.currentItem && this.currentItem !== e && this.currentItem.classList.remove("is-active"),
        e && this.currentItem !== e && e.classList.add("is-active"),
        this.currentItem = e
    }
    init() {
        super.init()
    }
    resize(e, t) {
        super.resize(e, t)
    }
    update(e) {
        super.update(e),
        scrollManager.getDomRange(this.domContainerEl)
    }
}
const pricingFaq = new PricingFaq;
class PricingPage extends Page {
    path = "pricing";
    id = "pricing";
    preInit() {
        super.preInit(),
        pricingHeader.preInit(this.domContainer),
        pricingPlans$1.preInit(this.domContainer),
        pricingFaq.preInit(this.domContainer)
    }
    init() {
        pricingHeader.init(),
        pricingPlans$1.init(),
        pricingFaq.init()
    }
    resize(e, t) {
        pricingHeader.resize(e, t),
        pricingPlans$1.resize(e, t),
        pricingFaq.resize(e, t)
    }
    update(e) {
        super.update(e),
        pricingHeader.update(e),
        pricingPlans$1.update(e),
        pricingFaq.update(e),
        super.postUpdate(e)
    }
}
const pricingPage = new PricingPage;
/*! @vimeo/player v2.25.0 | (c) 2024 Vimeo | MIT License | https://github.com/vimeo/player.js */
function ownKeys(s, e) {
    var t = Object.keys(s);
    if (Object.getOwnPropertySymbols) {
        var i = Object.getOwnPropertySymbols(s);
        e && (i = i.filter(function(n) {
            return Object.getOwnPropertyDescriptor(s, n).enumerable
        })),
        t.push.apply(t, i)
    }
    return t
}
function _objectSpread2(s) {
    for (var e = 1; e < arguments.length; e++) {
        var t = arguments[e] != null ? arguments[e] : {};
        e % 2 ? ownKeys(Object(t), !0).forEach(function(i) {
            _defineProperty(s, i, t[i])
        }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(s, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function(i) {
            Object.defineProperty(s, i, Object.getOwnPropertyDescriptor(t, i))
        })
    }
    return s
}
function _regeneratorRuntime() {
    _regeneratorRuntime = function() {
        return s
    }
    ;
    var s = {}
      , e = Object.prototype
      , t = e.hasOwnProperty
      , i = Object.defineProperty || function(R, T, C) {
        R[T] = C.value
    }
      , n = typeof Symbol == "function" ? Symbol : {}
      , r = n.iterator || "@@iterator"
      , o = n.asyncIterator || "@@asyncIterator"
      , a = n.toStringTag || "@@toStringTag";
    function c(R, T, C) {
        return Object.defineProperty(R, T, {
            value: C,
            enumerable: !0,
            configurable: !0,
            writable: !0
        }),
        R[T]
    }
    try {
        c({}, "")
    } catch {
        c = function(T, C, F) {
            return T[C] = F
        }
    }
    function l(R, T, C, F) {
        var U = T && T.prototype instanceof d ? T : d
          , z = Object.create(U.prototype)
          , B = new L(F || []);
        return i(z, "_invoke", {
            value: y(R, C, B)
        }),
        z
    }
    function u(R, T, C) {
        try {
            return {
                type: "normal",
                arg: R.call(T, C)
            }
        } catch (F) {
            return {
                type: "throw",
                arg: F
            }
        }
    }
    s.wrap = l;
    var h = {};
    function d() {}
    function m() {}
    function g() {}
    var p = {};
    c(p, r, function() {
        return this
    });
    var f = Object.getPrototypeOf
      , x = f && f(f(D([])));
    x && x !== e && t.call(x, r) && (p = x);
    var S = g.prototype = d.prototype = Object.create(p);
    function v(R) {
        ["next", "throw", "return"].forEach(function(T) {
            c(R, T, function(C) {
                return this._invoke(T, C)
            })
        })
    }
    function M(R, T) {
        function C(U, z, B, Z) {
            var j = u(R[U], R, z);
            if (j.type !== "throw") {
                var V = j.arg
                  , k = V.value;
                return k && typeof k == "object" && t.call(k, "__await") ? T.resolve(k.__await).then(function(K) {
                    C("next", K, B, Z)
                }, function(K) {
                    C("throw", K, B, Z)
                }) : T.resolve(k).then(function(K) {
                    V.value = K,
                    B(V)
                }, function(K) {
                    return C("throw", K, B, Z)
                })
            }
            Z(j.arg)
        }
        var F;
        i(this, "_invoke", {
            value: function(U, z) {
                function B() {
                    return new T(function(Z, j) {
                        C(U, z, Z, j)
                    }
                    )
                }
                return F = F ? F.then(B, B) : B()
            }
        })
    }
    function y(R, T, C) {
        var F = "suspendedStart";
        return function(U, z) {
            if (F === "executing")
                throw new Error("Generator is already running");
            if (F === "completed") {
                if (U === "throw")
                    throw z;
                return $()
            }
            for (C.method = U,
            C.arg = z; ; ) {
                var B = C.delegate;
                if (B) {
                    var Z = A(B, C);
                    if (Z) {
                        if (Z === h)
                            continue;
                        return Z
                    }
                }
                if (C.method === "next")
                    C.sent = C._sent = C.arg;
                else if (C.method === "throw") {
                    if (F === "suspendedStart")
                        throw F = "completed",
                        C.arg;
                    C.dispatchException(C.arg)
                } else
                    C.method === "return" && C.abrupt("return", C.arg);
                F = "executing";
                var j = u(R, T, C);
                if (j.type === "normal") {
                    if (F = C.done ? "completed" : "suspendedYield",
                    j.arg === h)
                        continue;
                    return {
                        value: j.arg,
                        done: C.done
                    }
                }
                j.type === "throw" && (F = "completed",
                C.method = "throw",
                C.arg = j.arg)
            }
        }
    }
    function A(R, T) {
        var C = T.method
          , F = R.iterator[C];
        if (F === void 0)
            return T.delegate = null,
            C === "throw" && R.iterator.return && (T.method = "return",
            T.arg = void 0,
            A(R, T),
            T.method === "throw") || C !== "return" && (T.method = "throw",
            T.arg = new TypeError("The iterator does not provide a '" + C + "' method")),
            h;
        var U = u(F, R.iterator, T.arg);
        if (U.type === "throw")
            return T.method = "throw",
            T.arg = U.arg,
            T.delegate = null,
            h;
        var z = U.arg;
        return z ? z.done ? (T[R.resultName] = z.value,
        T.next = R.nextLoc,
        T.method !== "return" && (T.method = "next",
        T.arg = void 0),
        T.delegate = null,
        h) : z : (T.method = "throw",
        T.arg = new TypeError("iterator result is not an object"),
        T.delegate = null,
        h)
    }
    function P(R) {
        var T = {
            tryLoc: R[0]
        };
        1 in R && (T.catchLoc = R[1]),
        2 in R && (T.finallyLoc = R[2],
        T.afterLoc = R[3]),
        this.tryEntries.push(T)
    }
    function _(R) {
        var T = R.completion || {};
        T.type = "normal",
        delete T.arg,
        R.completion = T
    }
    function L(R) {
        this.tryEntries = [{
            tryLoc: "root"
        }],
        R.forEach(P, this),
        this.reset(!0)
    }
    function D(R) {
        if (R) {
            var T = R[r];
            if (T)
                return T.call(R);
            if (typeof R.next == "function")
                return R;
            if (!isNaN(R.length)) {
                var C = -1
                  , F = function U() {
                    for (; ++C < R.length; )
                        if (t.call(R, C))
                            return U.value = R[C],
                            U.done = !1,
                            U;
                    return U.value = void 0,
                    U.done = !0,
                    U
                };
                return F.next = F
            }
        }
        return {
            next: $
        }
    }
    function $() {
        return {
            value: void 0,
            done: !0
        }
    }
    return m.prototype = g,
    i(S, "constructor", {
        value: g,
        configurable: !0
    }),
    i(g, "constructor", {
        value: m,
        configurable: !0
    }),
    m.displayName = c(g, a, "GeneratorFunction"),
    s.isGeneratorFunction = function(R) {
        var T = typeof R == "function" && R.constructor;
        return !!T && (T === m || (T.displayName || T.name) === "GeneratorFunction")
    }
    ,
    s.mark = function(R) {
        return Object.setPrototypeOf ? Object.setPrototypeOf(R, g) : (R.__proto__ = g,
        c(R, a, "GeneratorFunction")),
        R.prototype = Object.create(S),
        R
    }
    ,
    s.awrap = function(R) {
        return {
            __await: R
        }
    }
    ,
    v(M.prototype),
    c(M.prototype, o, function() {
        return this
    }),
    s.AsyncIterator = M,
    s.async = function(R, T, C, F, U) {
        U === void 0 && (U = Promise);
        var z = new M(l(R, T, C, F),U);
        return s.isGeneratorFunction(T) ? z : z.next().then(function(B) {
            return B.done ? B.value : z.next()
        })
    }
    ,
    v(S),
    c(S, a, "Generator"),
    c(S, r, function() {
        return this
    }),
    c(S, "toString", function() {
        return "[object Generator]"
    }),
    s.keys = function(R) {
        var T = Object(R)
          , C = [];
        for (var F in T)
            C.push(F);
        return C.reverse(),
        function U() {
            for (; C.length; ) {
                var z = C.pop();
                if (z in T)
                    return U.value = z,
                    U.done = !1,
                    U
            }
            return U.done = !0,
            U
        }
    }
    ,
    s.values = D,
    L.prototype = {
        constructor: L,
        reset: function(R) {
            if (this.prev = 0,
            this.next = 0,
            this.sent = this._sent = void 0,
            this.done = !1,
            this.delegate = null,
            this.method = "next",
            this.arg = void 0,
            this.tryEntries.forEach(_),
            !R)
                for (var T in this)
                    T.charAt(0) === "t" && t.call(this, T) && !isNaN(+T.slice(1)) && (this[T] = void 0)
        },
        stop: function() {
            this.done = !0;
            var R = this.tryEntries[0].completion;
            if (R.type === "throw")
                throw R.arg;
            return this.rval
        },
        dispatchException: function(R) {
            if (this.done)
                throw R;
            var T = this;
            function C(j, V) {
                return z.type = "throw",
                z.arg = R,
                T.next = j,
                V && (T.method = "next",
                T.arg = void 0),
                !!V
            }
            for (var F = this.tryEntries.length - 1; F >= 0; --F) {
                var U = this.tryEntries[F]
                  , z = U.completion;
                if (U.tryLoc === "root")
                    return C("end");
                if (U.tryLoc <= this.prev) {
                    var B = t.call(U, "catchLoc")
                      , Z = t.call(U, "finallyLoc");
                    if (B && Z) {
                        if (this.prev < U.catchLoc)
                            return C(U.catchLoc, !0);
                        if (this.prev < U.finallyLoc)
                            return C(U.finallyLoc)
                    } else if (B) {
                        if (this.prev < U.catchLoc)
                            return C(U.catchLoc, !0)
                    } else {
                        if (!Z)
                            throw new Error("try statement without catch or finally");
                        if (this.prev < U.finallyLoc)
                            return C(U.finallyLoc)
                    }
                }
            }
        },
        abrupt: function(R, T) {
            for (var C = this.tryEntries.length - 1; C >= 0; --C) {
                var F = this.tryEntries[C];
                if (F.tryLoc <= this.prev && t.call(F, "finallyLoc") && this.prev < F.finallyLoc) {
                    var U = F;
                    break
                }
            }
            U && (R === "break" || R === "continue") && U.tryLoc <= T && T <= U.finallyLoc && (U = null);
            var z = U ? U.completion : {};
            return z.type = R,
            z.arg = T,
            U ? (this.method = "next",
            this.next = U.finallyLoc,
            h) : this.complete(z)
        },
        complete: function(R, T) {
            if (R.type === "throw")
                throw R.arg;
            return R.type === "break" || R.type === "continue" ? this.next = R.arg : R.type === "return" ? (this.rval = this.arg = R.arg,
            this.method = "return",
            this.next = "end") : R.type === "normal" && T && (this.next = T),
            h
        },
        finish: function(R) {
            for (var T = this.tryEntries.length - 1; T >= 0; --T) {
                var C = this.tryEntries[T];
                if (C.finallyLoc === R)
                    return this.complete(C.completion, C.afterLoc),
                    _(C),
                    h
            }
        },
        catch: function(R) {
            for (var T = this.tryEntries.length - 1; T >= 0; --T) {
                var C = this.tryEntries[T];
                if (C.tryLoc === R) {
                    var F = C.completion;
                    if (F.type === "throw") {
                        var U = F.arg;
                        _(C)
                    }
                    return U
                }
            }
            throw new Error("illegal catch attempt")
        },
        delegateYield: function(R, T, C) {
            return this.delegate = {
                iterator: D(R),
                resultName: T,
                nextLoc: C
            },
            this.method === "next" && (this.arg = void 0),
            h
        }
    },
    s
}
function asyncGeneratorStep(s, e, t, i, n, r, o) {
    try {
        var a = s[r](o)
          , c = a.value
    } catch (l) {
        t(l);
        return
    }
    a.done ? e(c) : Promise.resolve(c).then(i, n)
}
function _asyncToGenerator(s) {
    return function() {
        var e = this
          , t = arguments;
        return new Promise(function(i, n) {
            var r = s.apply(e, t);
            function o(c) {
                asyncGeneratorStep(r, i, n, o, a, "next", c)
            }
            function a(c) {
                asyncGeneratorStep(r, i, n, o, a, "throw", c)
            }
            o(void 0)
        }
        )
    }
}
function _classCallCheck(s, e) {
    if (!(s instanceof e))
        throw new TypeError("Cannot call a class as a function")
}
function _defineProperties(s, e) {
    for (var t = 0; t < e.length; t++) {
        var i = e[t];
        i.enumerable = i.enumerable || !1,
        i.configurable = !0,
        "value"in i && (i.writable = !0),
        Object.defineProperty(s, _toPropertyKey(i.key), i)
    }
}
function _createClass(s, e, t) {
    return e && _defineProperties(s.prototype, e),
    Object.defineProperty(s, "prototype", {
        writable: !1
    }),
    s
}
function _defineProperty(s, e, t) {
    return e = _toPropertyKey(e),
    e in s ? Object.defineProperty(s, e, {
        value: t,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : s[e] = t,
    s
}
function _inherits(s, e) {
    if (typeof e != "function" && e !== null)
        throw new TypeError("Super expression must either be null or a function");
    s.prototype = Object.create(e && e.prototype, {
        constructor: {
            value: s,
            writable: !0,
            configurable: !0
        }
    }),
    Object.defineProperty(s, "prototype", {
        writable: !1
    }),
    e && _setPrototypeOf(s, e)
}
function _getPrototypeOf(s) {
    return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(t) {
        return t.__proto__ || Object.getPrototypeOf(t)
    }
    ,
    _getPrototypeOf(s)
}
function _setPrototypeOf(s, e) {
    return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(i, n) {
        return i.__proto__ = n,
        i
    }
    ,
    _setPrototypeOf(s, e)
}
function _isNativeReflectConstruct() {
    if (typeof Reflect > "u" || !Reflect.construct || Reflect.construct.sham)
        return !1;
    if (typeof Proxy == "function")
        return !0;
    try {
        return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {})),
        !0
    } catch {
        return !1
    }
}
function _construct(s, e, t) {
    return _isNativeReflectConstruct() ? _construct = Reflect.construct.bind() : _construct = function(n, r, o) {
        var a = [null];
        a.push.apply(a, r);
        var c = Function.bind.apply(n, a)
          , l = new c;
        return o && _setPrototypeOf(l, o.prototype),
        l
    }
    ,
    _construct.apply(null, arguments)
}
function _isNativeFunction(s) {
    return Function.toString.call(s).indexOf("[native code]") !== -1
}
function _wrapNativeSuper(s) {
    var e = typeof Map == "function" ? new Map : void 0;
    return _wrapNativeSuper = function(i) {
        if (i === null || !_isNativeFunction(i))
            return i;
        if (typeof i != "function")
            throw new TypeError("Super expression must either be null or a function");
        if (typeof e < "u") {
            if (e.has(i))
                return e.get(i);
            e.set(i, n)
        }
        function n() {
            return _construct(i, arguments, _getPrototypeOf(this).constructor)
        }
        return n.prototype = Object.create(i.prototype, {
            constructor: {
                value: n,
                enumerable: !1,
                writable: !0,
                configurable: !0
            }
        }),
        _setPrototypeOf(n, i)
    }
    ,
    _wrapNativeSuper(s)
}
function _assertThisInitialized(s) {
    if (s === void 0)
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    return s
}
function _possibleConstructorReturn(s, e) {
    if (e && (typeof e == "object" || typeof e == "function"))
        return e;
    if (e !== void 0)
        throw new TypeError("Derived constructors may only return object or undefined");
    return _assertThisInitialized(s)
}
function _createSuper(s) {
    var e = _isNativeReflectConstruct();
    return function() {
        var i = _getPrototypeOf(s), n;
        if (e) {
            var r = _getPrototypeOf(this).constructor;
            n = Reflect.construct(i, arguments, r)
        } else
            n = i.apply(this, arguments);
        return _possibleConstructorReturn(this, n)
    }
}
function _toPrimitive(s, e) {
    if (typeof s != "object" || s === null)
        return s;
    var t = s[Symbol.toPrimitive];
    if (t !== void 0) {
        var i = t.call(s, e);
        if (typeof i != "object")
            return i;
        throw new TypeError("@@toPrimitive must return a primitive value.")
    }
    return String(s)
}
function _toPropertyKey(s) {
    var e = _toPrimitive(s, "string");
    return typeof e == "symbol" ? e : String(e)
}
var isNode = typeof global < "u" && {}.toString.call(global) === "[object global]";
function getMethodName(s, e) {
    return s.indexOf(e.toLowerCase()) === 0 ? s : "".concat(e.toLowerCase()).concat(s.substr(0, 1).toUpperCase()).concat(s.substr(1))
}
function isDomElement(s) {
    return !!(s && s.nodeType === 1 && "nodeName"in s && s.ownerDocument && s.ownerDocument.defaultView)
}
function isInteger(s) {
    return !isNaN(parseFloat(s)) && isFinite(s) && Math.floor(s) == s
}
function isVimeoUrl(s) {
    return /^(https?:)?\/\/((((player|www)\.)?vimeo\.com)|((player\.)?[a-zA-Z0-9-]+\.(videoji\.(hk|cn)|vimeo\.work)))(?=$|\/)/.test(s)
}
function isVimeoEmbed(s) {
    var e = /^https:\/\/player\.((vimeo\.com)|([a-zA-Z0-9-]+\.(videoji\.(hk|cn)|vimeo\.work)))\/video\/\d+/;
    return e.test(s)
}
function getOembedDomain(s) {
    for (var e = (s || "").match(/^(?:https?:)?(?:\/\/)?([^/?]+)/), t = (e && e[1] || "").replace("player.", ""), i = [".videoji.hk", ".vimeo.work", ".videoji.cn"], n = 0, r = i; n < r.length; n++) {
        var o = r[n];
        if (t.endsWith(o))
            return t
    }
    return "vimeo.com"
}
function getVimeoUrl() {
    var s = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {}
      , e = s.id
      , t = s.url
      , i = e || t;
    if (!i)
        throw new Error("An id or url must be passed, either in an options object or as a data-vimeo-id or data-vimeo-url attribute.");
    if (isInteger(i))
        return "https://vimeo.com/".concat(i);
    if (isVimeoUrl(i))
        return i.replace("http:", "https:");
    throw e ? new TypeError("“".concat(e, "” is not a valid video id.")) : new TypeError("“".concat(i, "” is not a vimeo.com url."))
}
var subscribe = function s(e, t, i) {
    var n = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : "addEventListener"
      , r = arguments.length > 4 && arguments[4] !== void 0 ? arguments[4] : "removeEventListener"
      , o = typeof t == "string" ? [t] : t;
    return o.forEach(function(a) {
        e[n](a, i)
    }),
    {
        cancel: function() {
            return o.forEach(function(c) {
                return e[r](c, i)
            })
        }
    }
}
  , arrayIndexOfSupport = typeof Array.prototype.indexOf < "u"
  , postMessageSupport = typeof window < "u" && typeof window.postMessage < "u";
if (!isNode && (!arrayIndexOfSupport || !postMessageSupport))
    throw new Error("Sorry, the Vimeo Player API is not available in this browser.");
var commonjsGlobal = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function createCommonjsModule(s, e) {
    return e = {
        exports: {}
    },
    s(e, e.exports),
    e.exports
}
/*!
 * weakmap-polyfill v2.0.4 - ECMAScript6 WeakMap polyfill
 * https://github.com/polygonplanet/weakmap-polyfill
 * Copyright (c) 2015-2021 polygonplanet <polygon.planet.aqua@gmail.com>
 * @license MIT
 */
(function(s) {
    if (s.WeakMap)
        return;
    var e = Object.prototype.hasOwnProperty
      , t = Object.defineProperty && function() {
        try {
            return Object.defineProperty({}, "x", {
                value: 1
            }).x === 1
        } catch {}
    }()
      , i = function(r, o, a) {
        t ? Object.defineProperty(r, o, {
            configurable: !0,
            writable: !0,
            value: a
        }) : r[o] = a
    };
    s.WeakMap = function() {
        function r() {
            if (this === void 0)
                throw new TypeError("Constructor WeakMap requires 'new'");
            if (i(this, "_id", a("_WeakMap")),
            arguments.length > 0)
                throw new TypeError("WeakMap iterable is not supported")
        }
        i(r.prototype, "delete", function(l) {
            if (o(this, "delete"),
            !n(l))
                return !1;
            var u = l[this._id];
            return u && u[0] === l ? (delete l[this._id],
            !0) : !1
        }),
        i(r.prototype, "get", function(l) {
            if (o(this, "get"),
            !!n(l)) {
                var u = l[this._id];
                if (u && u[0] === l)
                    return u[1]
            }
        }),
        i(r.prototype, "has", function(l) {
            if (o(this, "has"),
            !n(l))
                return !1;
            var u = l[this._id];
            return !!(u && u[0] === l)
        }),
        i(r.prototype, "set", function(l, u) {
            if (o(this, "set"),
            !n(l))
                throw new TypeError("Invalid value used as weak map key");
            var h = l[this._id];
            return h && h[0] === l ? (h[1] = u,
            this) : (i(l, this._id, [l, u]),
            this)
        });
        function o(l, u) {
            if (!n(l) || !e.call(l, "_id"))
                throw new TypeError(u + " method called on incompatible receiver " + typeof l)
        }
        function a(l) {
            return l + "_" + c() + "." + c()
        }
        function c() {
            return Math.random().toString().substring(2)
        }
        return i(r, "_polyfill", !0),
        r
    }();
    function n(r) {
        return Object(r) === r
    }
}
)(typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof window < "u" ? window : commonjsGlobal);
var npo_src = createCommonjsModule(function(s) {
    /*! Native Promise Only
    v0.8.1 (c) Kyle Simpson
    MIT License: http://getify.mit-license.org
*/
    (function(t, i, n) {
        i[t] = i[t] || n(),
        s.exports && (s.exports = i[t])
    }
    )("Promise", commonjsGlobal, function() {
        var t, i, n, r = Object.prototype.toString, o = typeof setImmediate < "u" ? function(v) {
            return setImmediate(v)
        }
        : setTimeout;
        try {
            Object.defineProperty({}, "x", {}),
            t = function(v, M, y, A) {
                return Object.defineProperty(v, M, {
                    value: y,
                    writable: !0,
                    configurable: A !== !1
                })
            }
        } catch {
            t = function(M, y, A) {
                return M[y] = A,
                M
            }
        }
        n = function() {
            var v, M, y;
            function A(P, _) {
                this.fn = P,
                this.self = _,
                this.next = void 0
            }
            return {
                add: function(_, L) {
                    y = new A(_,L),
                    M ? M.next = y : v = y,
                    M = y,
                    y = void 0
                },
                drain: function() {
                    var _ = v;
                    for (v = M = i = void 0; _; )
                        _.fn.call(_.self),
                        _ = _.next
                }
            }
        }();
        function a(S, v) {
            n.add(S, v),
            i || (i = o(n.drain))
        }
        function c(S) {
            var v, M = typeof S;
            return S != null && (M == "object" || M == "function") && (v = S.then),
            typeof v == "function" ? v : !1
        }
        function l() {
            for (var S = 0; S < this.chain.length; S++)
                u(this, this.state === 1 ? this.chain[S].success : this.chain[S].failure, this.chain[S]);
            this.chain.length = 0
        }
        function u(S, v, M) {
            var y, A;
            try {
                v === !1 ? M.reject(S.msg) : (v === !0 ? y = S.msg : y = v.call(void 0, S.msg),
                y === M.promise ? M.reject(TypeError("Promise-chain cycle")) : (A = c(y)) ? A.call(y, M.resolve, M.reject) : M.resolve(y))
            } catch (P) {
                M.reject(P)
            }
        }
        function h(S) {
            var v, M = this;
            if (!M.triggered) {
                M.triggered = !0,
                M.def && (M = M.def);
                try {
                    (v = c(S)) ? a(function() {
                        var y = new g(M);
                        try {
                            v.call(S, function() {
                                h.apply(y, arguments)
                            }, function() {
                                d.apply(y, arguments)
                            })
                        } catch (A) {
                            d.call(y, A)
                        }
                    }) : (M.msg = S,
                    M.state = 1,
                    M.chain.length > 0 && a(l, M))
                } catch (y) {
                    d.call(new g(M), y)
                }
            }
        }
        function d(S) {
            var v = this;
            v.triggered || (v.triggered = !0,
            v.def && (v = v.def),
            v.msg = S,
            v.state = 2,
            v.chain.length > 0 && a(l, v))
        }
        function m(S, v, M, y) {
            for (var A = 0; A < v.length; A++)
                (function(_) {
                    S.resolve(v[_]).then(function(D) {
                        M(_, D)
                    }, y)
                }
                )(A)
        }
        function g(S) {
            this.def = S,
            this.triggered = !1
        }
        function p(S) {
            this.promise = S,
            this.state = 0,
            this.triggered = !1,
            this.chain = [],
            this.msg = void 0
        }
        function f(S) {
            if (typeof S != "function")
                throw TypeError("Not a function");
            if (this.__NPO__ !== 0)
                throw TypeError("Not a promise");
            this.__NPO__ = 1;
            var v = new p(this);
            this.then = function(y, A) {
                var P = {
                    success: typeof y == "function" ? y : !0,
                    failure: typeof A == "function" ? A : !1
                };
                return P.promise = new this.constructor(function(L, D) {
                    if (typeof L != "function" || typeof D != "function")
                        throw TypeError("Not a function");
                    P.resolve = L,
                    P.reject = D
                }
                ),
                v.chain.push(P),
                v.state !== 0 && a(l, v),
                P.promise
            }
            ,
            this.catch = function(y) {
                return this.then(void 0, y)
            }
            ;
            try {
                S.call(void 0, function(y) {
                    h.call(v, y)
                }, function(y) {
                    d.call(v, y)
                })
            } catch (M) {
                d.call(v, M)
            }
        }
        var x = t({}, "constructor", f, !1);
        return f.prototype = x,
        t(x, "__NPO__", 0, !1),
        t(f, "resolve", function(v) {
            var M = this;
            return v && typeof v == "object" && v.__NPO__ === 1 ? v : new M(function(A, P) {
                if (typeof A != "function" || typeof P != "function")
                    throw TypeError("Not a function");
                A(v)
            }
            )
        }),
        t(f, "reject", function(v) {
            return new this(function(y, A) {
                if (typeof y != "function" || typeof A != "function")
                    throw TypeError("Not a function");
                A(v)
            }
            )
        }),
        t(f, "all", function(v) {
            var M = this;
            return r.call(v) != "[object Array]" ? M.reject(TypeError("Not an array")) : v.length === 0 ? M.resolve([]) : new M(function(A, P) {
                if (typeof A != "function" || typeof P != "function")
                    throw TypeError("Not a function");
                var _ = v.length
                  , L = Array(_)
                  , D = 0;
                m(M, v, function(R, T) {
                    L[R] = T,
                    ++D === _ && A(L)
                }, P)
            }
            )
        }),
        t(f, "race", function(v) {
            var M = this;
            return r.call(v) != "[object Array]" ? M.reject(TypeError("Not an array")) : new M(function(A, P) {
                if (typeof A != "function" || typeof P != "function")
                    throw TypeError("Not a function");
                m(M, v, function(L, D) {
                    A(D)
                }, P)
            }
            )
        }),
        f
    })
})
  , callbackMap = new WeakMap;
function storeCallback(s, e, t) {
    var i = callbackMap.get(s.element) || {};
    e in i || (i[e] = []),
    i[e].push(t),
    callbackMap.set(s.element, i)
}
function getCallbacks(s, e) {
    var t = callbackMap.get(s.element) || {};
    return t[e] || []
}
function removeCallback(s, e, t) {
    var i = callbackMap.get(s.element) || {};
    if (!i[e])
        return !0;
    if (!t)
        return i[e] = [],
        callbackMap.set(s.element, i),
        !0;
    var n = i[e].indexOf(t);
    return n !== -1 && i[e].splice(n, 1),
    callbackMap.set(s.element, i),
    i[e] && i[e].length === 0
}
function shiftCallbacks(s, e) {
    var t = getCallbacks(s, e);
    if (t.length < 1)
        return !1;
    var i = t.shift();
    return removeCallback(s, e, i),
    i
}
function swapCallbacks(s, e) {
    var t = callbackMap.get(s);
    callbackMap.set(e, t),
    callbackMap.delete(s)
}
function parseMessageData(s) {
    if (typeof s == "string")
        try {
            s = JSON.parse(s)
        } catch (e) {
            return console.warn(e),
            {}
        }
    return s
}
function postMessage(s, e, t) {
    if (!(!s.element.contentWindow || !s.element.contentWindow.postMessage)) {
        var i = {
            method: e
        };
        t !== void 0 && (i.value = t);
        var n = parseFloat(navigator.userAgent.toLowerCase().replace(/^.*msie (\d+).*$/, "$1"));
        n >= 8 && n < 10 && (i = JSON.stringify(i)),
        s.element.contentWindow.postMessage(i, s.origin)
    }
}
function processData(s, e) {
    e = parseMessageData(e);
    var t = [], i;
    if (e.event) {
        if (e.event === "error") {
            var n = getCallbacks(s, e.data.method);
            n.forEach(function(o) {
                var a = new Error(e.data.message);
                a.name = e.data.name,
                o.reject(a),
                removeCallback(s, e.data.method, o)
            })
        }
        t = getCallbacks(s, "event:".concat(e.event)),
        i = e.data
    } else if (e.method) {
        var r = shiftCallbacks(s, e.method);
        r && (t.push(r),
        i = e.value)
    }
    t.forEach(function(o) {
        try {
            if (typeof o == "function") {
                o.call(s, i);
                return
            }
            o.resolve(i)
        } catch {}
    })
}
var oEmbedParameters = ["airplay", "audio_tracks", "audiotrack", "autopause", "autoplay", "background", "byline", "cc", "chapter_id", "chapters", "chromecast", "color", "colors", "controls", "dnt", "end_time", "fullscreen", "height", "id", "interactive_params", "keyboard", "loop", "maxheight", "maxwidth", "muted", "play_button_position", "playsinline", "portrait", "progress_bar", "quality_selector", "responsive", "speed", "start_time", "texttrack", "title", "transcript", "transparent", "unmute_button", "url", "vimeo_logo", "volume", "watch_full_video", "width"];
function getOEmbedParameters(s) {
    var e = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    return oEmbedParameters.reduce(function(t, i) {
        var n = s.getAttribute("data-vimeo-".concat(i));
        return (n || n === "") && (t[i] = n === "" ? 1 : n),
        t
    }, e)
}
function createEmbed(s, e) {
    var t = s.html;
    if (!e)
        throw new TypeError("An element must be provided");
    if (e.getAttribute("data-vimeo-initialized") !== null)
        return e.querySelector("iframe");
    var i = document.createElement("div");
    return i.innerHTML = t,
    e.appendChild(i.firstChild),
    e.setAttribute("data-vimeo-initialized", "true"),
    e.querySelector("iframe")
}
function getOEmbedData(s) {
    var e = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}
      , t = arguments.length > 2 ? arguments[2] : void 0;
    return new Promise(function(i, n) {
        if (!isVimeoUrl(s))
            throw new TypeError("“".concat(s, "” is not a vimeo.com url."));
        var r = getOembedDomain(s)
          , o = "https://".concat(r, "/api/oembed.json?url=").concat(encodeURIComponent(s));
        for (var a in e)
            e.hasOwnProperty(a) && (o += "&".concat(a, "=").concat(encodeURIComponent(e[a])));
        var c = "XDomainRequest"in window ? new XDomainRequest : new XMLHttpRequest;
        c.open("GET", o, !0),
        c.onload = function() {
            if (c.status === 404) {
                n(new Error("“".concat(s, "” was not found.")));
                return
            }
            if (c.status === 403) {
                n(new Error("“".concat(s, "” is not embeddable.")));
                return
            }
            try {
                var l = JSON.parse(c.responseText);
                if (l.domain_status_code === 403) {
                    createEmbed(l, t),
                    n(new Error("“".concat(s, "” is not embeddable.")));
                    return
                }
                i(l)
            } catch (u) {
                n(u)
            }
        }
        ,
        c.onerror = function() {
            var l = c.status ? " (".concat(c.status, ")") : "";
            n(new Error("There was an error fetching the embed code from Vimeo".concat(l, ".")))
        }
        ,
        c.send()
    }
    )
}
function initializeEmbeds() {
    var s = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : document
      , e = [].slice.call(s.querySelectorAll("[data-vimeo-id], [data-vimeo-url]"))
      , t = function(n) {
        "console"in window && console.error && console.error("There was an error creating an embed: ".concat(n))
    };
    e.forEach(function(i) {
        try {
            if (i.getAttribute("data-vimeo-defer") !== null)
                return;
            var n = getOEmbedParameters(i)
              , r = getVimeoUrl(n);
            getOEmbedData(r, n, i).then(function(o) {
                return createEmbed(o, i)
            }).catch(t)
        } catch (o) {
            t(o)
        }
    })
}
function resizeEmbeds() {
    var s = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : document;
    if (!window.VimeoPlayerResizeEmbeds_) {
        window.VimeoPlayerResizeEmbeds_ = !0;
        var e = function(i) {
            if (isVimeoUrl(i.origin) && !(!i.data || i.data.event !== "spacechange")) {
                for (var n = s.querySelectorAll("iframe"), r = 0; r < n.length; r++)
                    if (n[r].contentWindow === i.source) {
                        var o = n[r].parentElement;
                        o.style.paddingBottom = "".concat(i.data.data[0].bottom, "px");
                        break
                    }
            }
        };
        window.addEventListener("message", e)
    }
}
function initAppendVideoMetadata() {
    var s = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : document;
    if (!window.VimeoSeoMetadataAppended) {
        window.VimeoSeoMetadataAppended = !0;
        var e = function(i) {
            if (isVimeoUrl(i.origin)) {
                var n = parseMessageData(i.data);
                if (!(!n || n.event !== "ready"))
                    for (var r = s.querySelectorAll("iframe"), o = 0; o < r.length; o++) {
                        var a = r[o]
                          , c = a.contentWindow === i.source;
                        if (isVimeoEmbed(a.src) && c) {
                            var l = new Player(a);
                            l.callMethod("appendVideoMetadata", window.location.href)
                        }
                    }
            }
        };
        window.addEventListener("message", e)
    }
}
function checkUrlTimeParam() {
    var s = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : document;
    if (!window.VimeoCheckedUrlTimeParam) {
        window.VimeoCheckedUrlTimeParam = !0;
        var e = function(n) {
            "console"in window && console.error && console.error("There was an error getting video Id: ".concat(n))
        }
          , t = function(n) {
            if (isVimeoUrl(n.origin)) {
                var r = parseMessageData(n.data);
                if (!(!r || r.event !== "ready"))
                    for (var o = s.querySelectorAll("iframe"), a = function() {
                        var u = o[c]
                          , h = u.contentWindow === n.source;
                        if (isVimeoEmbed(u.src) && h) {
                            var d = new Player(u);
                            d.getVideoId().then(function(m) {
                                var g = new RegExp("[?&]vimeo_t_".concat(m, "=([^&#]*)")).exec(window.location.href);
                                if (g && g[1]) {
                                    var p = decodeURI(g[1]);
                                    d.setCurrentTime(p)
                                }
                            }).catch(e)
                        }
                    }, c = 0; c < o.length; c++)
                        a()
            }
        };
        window.addEventListener("message", t)
    }
}
function initializeScreenfull() {
    var s = function() {
        for (var i, n = [["requestFullscreen", "exitFullscreen", "fullscreenElement", "fullscreenEnabled", "fullscreenchange", "fullscreenerror"], ["webkitRequestFullscreen", "webkitExitFullscreen", "webkitFullscreenElement", "webkitFullscreenEnabled", "webkitfullscreenchange", "webkitfullscreenerror"], ["webkitRequestFullScreen", "webkitCancelFullScreen", "webkitCurrentFullScreenElement", "webkitCancelFullScreen", "webkitfullscreenchange", "webkitfullscreenerror"], ["mozRequestFullScreen", "mozCancelFullScreen", "mozFullScreenElement", "mozFullScreenEnabled", "mozfullscreenchange", "mozfullscreenerror"], ["msRequestFullscreen", "msExitFullscreen", "msFullscreenElement", "msFullscreenEnabled", "MSFullscreenChange", "MSFullscreenError"]], r = 0, o = n.length, a = {}; r < o; r++)
            if (i = n[r],
            i && i[1]in document) {
                for (r = 0; r < i.length; r++)
                    a[n[0][r]] = i[r];
                return a
            }
        return !1
    }()
      , e = {
        fullscreenchange: s.fullscreenchange,
        fullscreenerror: s.fullscreenerror
    }
      , t = {
        request: function(n) {
            return new Promise(function(r, o) {
                var a = function l() {
                    t.off("fullscreenchange", l),
                    r()
                };
                t.on("fullscreenchange", a),
                n = n || document.documentElement;
                var c = n[s.requestFullscreen]();
                c instanceof Promise && c.then(a).catch(o)
            }
            )
        },
        exit: function() {
            return new Promise(function(n, r) {
                if (!t.isFullscreen) {
                    n();
                    return
                }
                var o = function c() {
                    t.off("fullscreenchange", c),
                    n()
                };
                t.on("fullscreenchange", o);
                var a = document[s.exitFullscreen]();
                a instanceof Promise && a.then(o).catch(r)
            }
            )
        },
        on: function(n, r) {
            var o = e[n];
            o && document.addEventListener(o, r)
        },
        off: function(n, r) {
            var o = e[n];
            o && document.removeEventListener(o, r)
        }
    };
    return Object.defineProperties(t, {
        isFullscreen: {
            get: function() {
                return !!document[s.fullscreenElement]
            }
        },
        element: {
            enumerable: !0,
            get: function() {
                return document[s.fullscreenElement]
            }
        },
        isEnabled: {
            enumerable: !0,
            get: function() {
                return !!document[s.fullscreenEnabled]
            }
        }
    }),
    t
}
var defaultOptions = {
    role: "viewer",
    autoPlayMuted: !0,
    allowedDrift: .3,
    maxAllowedDrift: 1,
    minCheckInterval: .1,
    maxRateAdjustment: .2,
    maxTimeToCatchUp: 1
}
  , TimingSrcConnector = function(s) {
    _inherits(t, s);
    var e = _createSuper(t);
    function t(i, n) {
        var r, o = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {}, a = arguments.length > 3 ? arguments[3] : void 0;
        return _classCallCheck(this, t),
        r = e.call(this),
        _defineProperty(_assertThisInitialized(r), "logger", void 0),
        _defineProperty(_assertThisInitialized(r), "speedAdjustment", 0),
        _defineProperty(_assertThisInitialized(r), "adjustSpeed", function() {
            var c = _asyncToGenerator(_regeneratorRuntime().mark(function l(u, h) {
                var d;
                return _regeneratorRuntime().wrap(function(g) {
                    for (; ; )
                        switch (g.prev = g.next) {
                        case 0:
                            if (r.speedAdjustment !== h) {
                                g.next = 2;
                                break
                            }
                            return g.abrupt("return");
                        case 2:
                            return g.next = 4,
                            u.getPlaybackRate();
                        case 4:
                            return g.t0 = g.sent,
                            g.t1 = r.speedAdjustment,
                            g.t2 = g.t0 - g.t1,
                            g.t3 = h,
                            d = g.t2 + g.t3,
                            r.log("New playbackRate:  ".concat(d)),
                            g.next = 12,
                            u.setPlaybackRate(d);
                        case 12:
                            r.speedAdjustment = h;
                        case 13:
                        case "end":
                            return g.stop()
                        }
                }, l)
            }));
            return function(l, u) {
                return c.apply(this, arguments)
            }
        }()),
        r.logger = a,
        r.init(n, i, _objectSpread2(_objectSpread2({}, defaultOptions), o)),
        r
    }
    return _createClass(t, [{
        key: "disconnect",
        value: function() {
            this.dispatchEvent(new Event("disconnect"))
        }
    }, {
        key: "init",
        value: function() {
            var i = _asyncToGenerator(_regeneratorRuntime().mark(function r(o, a, c) {
                var l = this, u, h, d;
                return _regeneratorRuntime().wrap(function(g) {
                    for (; ; )
                        switch (g.prev = g.next) {
                        case 0:
                            return g.next = 2,
                            this.waitForTOReadyState(o, "open");
                        case 2:
                            if (c.role !== "viewer") {
                                g.next = 10;
                                break
                            }
                            return g.next = 5,
                            this.updatePlayer(o, a, c);
                        case 5:
                            u = subscribe(o, "change", function() {
                                return l.updatePlayer(o, a, c)
                            }),
                            h = this.maintainPlaybackPosition(o, a, c),
                            this.addEventListener("disconnect", function() {
                                h.cancel(),
                                u.cancel()
                            }),
                            g.next = 14;
                            break;
                        case 10:
                            return g.next = 12,
                            this.updateTimingObject(o, a);
                        case 12:
                            d = subscribe(a, ["seeked", "play", "pause", "ratechange"], function() {
                                return l.updateTimingObject(o, a)
                            }, "on", "off"),
                            this.addEventListener("disconnect", function() {
                                return d.cancel()
                            });
                        case 14:
                        case "end":
                            return g.stop()
                        }
                }, r, this)
            }));
            function n(r, o, a) {
                return i.apply(this, arguments)
            }
            return n
        }()
    }, {
        key: "updateTimingObject",
        value: function() {
            var i = _asyncToGenerator(_regeneratorRuntime().mark(function r(o, a) {
                return _regeneratorRuntime().wrap(function(l) {
                    for (; ; )
                        switch (l.prev = l.next) {
                        case 0:
                            return l.t0 = o,
                            l.next = 3,
                            a.getCurrentTime();
                        case 3:
                            return l.t1 = l.sent,
                            l.next = 6,
                            a.getPaused();
                        case 6:
                            if (!l.sent) {
                                l.next = 10;
                                break
                            }
                            l.t2 = 0,
                            l.next = 13;
                            break;
                        case 10:
                            return l.next = 12,
                            a.getPlaybackRate();
                        case 12:
                            l.t2 = l.sent;
                        case 13:
                            l.t3 = l.t2,
                            l.t4 = {
                                position: l.t1,
                                velocity: l.t3
                            },
                            l.t0.update.call(l.t0, l.t4);
                        case 16:
                        case "end":
                            return l.stop()
                        }
                }, r)
            }));
            function n(r, o) {
                return i.apply(this, arguments)
            }
            return n
        }()
    }, {
        key: "updatePlayer",
        value: function() {
            var i = _asyncToGenerator(_regeneratorRuntime().mark(function r(o, a, c) {
                var l, u, h;
                return _regeneratorRuntime().wrap(function(m) {
                    for (; ; )
                        switch (m.prev = m.next) {
                        case 0:
                            if (l = o.query(),
                            u = l.position,
                            h = l.velocity,
                            typeof u == "number" && a.setCurrentTime(u),
                            typeof h != "number") {
                                m.next = 25;
                                break
                            }
                            if (h !== 0) {
                                m.next = 11;
                                break
                            }
                            return m.next = 6,
                            a.getPaused();
                        case 6:
                            if (m.t0 = m.sent,
                            m.t0 !== !1) {
                                m.next = 9;
                                break
                            }
                            a.pause();
                        case 9:
                            m.next = 25;
                            break;
                        case 11:
                            if (!(h > 0)) {
                                m.next = 25;
                                break
                            }
                            return m.next = 14,
                            a.getPaused();
                        case 14:
                            if (m.t1 = m.sent,
                            m.t1 !== !0) {
                                m.next = 19;
                                break
                            }
                            return m.next = 18,
                            a.play().catch(function() {
                                var g = _asyncToGenerator(_regeneratorRuntime().mark(function p(f) {
                                    return _regeneratorRuntime().wrap(function(S) {
                                        for (; ; )
                                            switch (S.prev = S.next) {
                                            case 0:
                                                if (!(f.name === "NotAllowedError" && c.autoPlayMuted)) {
                                                    S.next = 5;
                                                    break
                                                }
                                                return S.next = 3,
                                                a.setMuted(!0);
                                            case 3:
                                                return S.next = 5,
                                                a.play().catch(function(v) {
                                                    return console.error("Couldn't play the video from TimingSrcConnector. Error:", v)
                                                });
                                            case 5:
                                            case "end":
                                                return S.stop()
                                            }
                                    }, p)
                                }));
                                return function(p) {
                                    return g.apply(this, arguments)
                                }
                            }());
                        case 18:
                            this.updatePlayer(o, a, c);
                        case 19:
                            return m.next = 21,
                            a.getPlaybackRate();
                        case 21:
                            if (m.t2 = m.sent,
                            m.t3 = h,
                            m.t2 === m.t3) {
                                m.next = 25;
                                break
                            }
                            a.setPlaybackRate(h);
                        case 25:
                        case "end":
                            return m.stop()
                        }
                }, r, this)
            }));
            function n(r, o, a) {
                return i.apply(this, arguments)
            }
            return n
        }()
    }, {
        key: "maintainPlaybackPosition",
        value: function(n, r, o) {
            var a = this
              , c = o.allowedDrift
              , l = o.maxAllowedDrift
              , u = o.minCheckInterval
              , h = o.maxRateAdjustment
              , d = o.maxTimeToCatchUp
              , m = Math.min(d, Math.max(u, l)) * 1e3
              , g = function() {
                var f = _asyncToGenerator(_regeneratorRuntime().mark(function x() {
                    var S, v, M, y, A;
                    return _regeneratorRuntime().wrap(function(_) {
                        for (; ; )
                            switch (_.prev = _.next) {
                            case 0:
                                if (_.t0 = n.query().velocity === 0,
                                _.t0) {
                                    _.next = 6;
                                    break
                                }
                                return _.next = 4,
                                r.getPaused();
                            case 4:
                                _.t1 = _.sent,
                                _.t0 = _.t1 === !0;
                            case 6:
                                if (!_.t0) {
                                    _.next = 8;
                                    break
                                }
                                return _.abrupt("return");
                            case 8:
                                return _.t2 = n.query().position,
                                _.next = 11,
                                r.getCurrentTime();
                            case 11:
                                if (_.t3 = _.sent,
                                S = _.t2 - _.t3,
                                v = Math.abs(S),
                                a.log("Drift: ".concat(S)),
                                !(v > l)) {
                                    _.next = 22;
                                    break
                                }
                                return _.next = 18,
                                a.adjustSpeed(r, 0);
                            case 18:
                                r.setCurrentTime(n.query().position),
                                a.log("Resync by currentTime"),
                                _.next = 29;
                                break;
                            case 22:
                                if (!(v > c)) {
                                    _.next = 29;
                                    break
                                }
                                return M = v / d,
                                y = h,
                                A = M < y ? (y - M) / 2 : y,
                                _.next = 28,
                                a.adjustSpeed(r, A * Math.sign(S));
                            case 28:
                                a.log("Resync by playbackRate");
                            case 29:
                            case "end":
                                return _.stop()
                            }
                    }, x)
                }));
                return function() {
                    return f.apply(this, arguments)
                }
            }()
              , p = setInterval(function() {
                return g()
            }, m);
            return {
                cancel: function() {
                    return clearInterval(p)
                }
            }
        }
    }, {
        key: "log",
        value: function(n) {
            var r;
            (r = this.logger) === null || r === void 0 || r.call(this, "TimingSrcConnector: ".concat(n))
        }
    }, {
        key: "waitForTOReadyState",
        value: function(n, r) {
            return new Promise(function(o) {
                var a = function c() {
                    n.readyState === r ? o() : n.addEventListener("readystatechange", c, {
                        once: !0
                    })
                };
                a()
            }
            )
        }
    }]),
    t
}(_wrapNativeSuper(EventTarget))
  , playerMap = new WeakMap
  , readyMap = new WeakMap
  , screenfull = {}
  , Player = function() {
    function s(e) {
        var t = this
          , i = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
        if (_classCallCheck(this, s),
        window.jQuery && e instanceof jQuery && (e.length > 1 && window.console && console.warn && console.warn("A jQuery object with multiple elements was passed, using the first element."),
        e = e[0]),
        typeof document < "u" && typeof e == "string" && (e = document.getElementById(e)),
        !isDomElement(e))
            throw new TypeError("You must pass either a valid element or a valid id.");
        if (e.nodeName !== "IFRAME") {
            var n = e.querySelector("iframe");
            n && (e = n)
        }
        if (e.nodeName === "IFRAME" && !isVimeoUrl(e.getAttribute("src") || ""))
            throw new Error("The player element passed isn’t a Vimeo embed.");
        if (playerMap.has(e))
            return playerMap.get(e);
        this._window = e.ownerDocument.defaultView,
        this.element = e,
        this.origin = "*";
        var r = new npo_src(function(a, c) {
            if (t._onMessage = function(h) {
                if (!(!isVimeoUrl(h.origin) || t.element.contentWindow !== h.source)) {
                    t.origin === "*" && (t.origin = h.origin);
                    var d = parseMessageData(h.data)
                      , m = d && d.event === "error"
                      , g = m && d.data && d.data.method === "ready";
                    if (g) {
                        var p = new Error(d.data.message);
                        p.name = d.data.name,
                        c(p);
                        return
                    }
                    var f = d && d.event === "ready"
                      , x = d && d.method === "ping";
                    if (f || x) {
                        t.element.setAttribute("data-ready", "true"),
                        a();
                        return
                    }
                    processData(t, d)
                }
            }
            ,
            t._window.addEventListener("message", t._onMessage),
            t.element.nodeName !== "IFRAME") {
                var l = getOEmbedParameters(e, i)
                  , u = getVimeoUrl(l);
                getOEmbedData(u, l, e).then(function(h) {
                    var d = createEmbed(h, e);
                    return t.element = d,
                    t._originalElement = e,
                    swapCallbacks(e, d),
                    playerMap.set(t.element, t),
                    h
                }).catch(c)
            }
        }
        );
        if (readyMap.set(this, r),
        playerMap.set(this.element, this),
        this.element.nodeName === "IFRAME" && postMessage(this, "ping"),
        screenfull.isEnabled) {
            var o = function() {
                return screenfull.exit()
            };
            this.fullscreenchangeHandler = function() {
                screenfull.isFullscreen ? storeCallback(t, "event:exitFullscreen", o) : removeCallback(t, "event:exitFullscreen", o),
                t.ready().then(function() {
                    postMessage(t, "fullscreenchange", screenfull.isFullscreen)
                })
            }
            ,
            screenfull.on("fullscreenchange", this.fullscreenchangeHandler)
        }
        return this
    }
    return _createClass(s, [{
        key: "callMethod",
        value: function(t) {
            var i = this
              , n = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
            return new npo_src(function(r, o) {
                return i.ready().then(function() {
                    storeCallback(i, t, {
                        resolve: r,
                        reject: o
                    }),
                    postMessage(i, t, n)
                }).catch(o)
            }
            )
        }
    }, {
        key: "get",
        value: function(t) {
            var i = this;
            return new npo_src(function(n, r) {
                return t = getMethodName(t, "get"),
                i.ready().then(function() {
                    storeCallback(i, t, {
                        resolve: n,
                        reject: r
                    }),
                    postMessage(i, t)
                }).catch(r)
            }
            )
        }
    }, {
        key: "set",
        value: function(t, i) {
            var n = this;
            return new npo_src(function(r, o) {
                if (t = getMethodName(t, "set"),
                i == null)
                    throw new TypeError("There must be a value to set.");
                return n.ready().then(function() {
                    storeCallback(n, t, {
                        resolve: r,
                        reject: o
                    }),
                    postMessage(n, t, i)
                }).catch(o)
            }
            )
        }
    }, {
        key: "on",
        value: function(t, i) {
            if (!t)
                throw new TypeError("You must pass an event name.");
            if (!i)
                throw new TypeError("You must pass a callback function.");
            if (typeof i != "function")
                throw new TypeError("The callback must be a function.");
            var n = getCallbacks(this, "event:".concat(t));
            n.length === 0 && this.callMethod("addEventListener", t).catch(function() {}),
            storeCallback(this, "event:".concat(t), i)
        }
    }, {
        key: "off",
        value: function(t, i) {
            if (!t)
                throw new TypeError("You must pass an event name.");
            if (i && typeof i != "function")
                throw new TypeError("The callback must be a function.");
            var n = removeCallback(this, "event:".concat(t), i);
            n && this.callMethod("removeEventListener", t).catch(function(r) {})
        }
    }, {
        key: "loadVideo",
        value: function(t) {
            return this.callMethod("loadVideo", t)
        }
    }, {
        key: "ready",
        value: function() {
            var t = readyMap.get(this) || new npo_src(function(i, n) {
                n(new Error("Unknown player. Probably unloaded."))
            }
            );
            return npo_src.resolve(t)
        }
    }, {
        key: "addCuePoint",
        value: function(t) {
            var i = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
            return this.callMethod("addCuePoint", {
                time: t,
                data: i
            })
        }
    }, {
        key: "removeCuePoint",
        value: function(t) {
            return this.callMethod("removeCuePoint", t)
        }
    }, {
        key: "enableTextTrack",
        value: function(t, i) {
            if (!t)
                throw new TypeError("You must pass a language.");
            return this.callMethod("enableTextTrack", {
                language: t,
                kind: i
            })
        }
    }, {
        key: "disableTextTrack",
        value: function() {
            return this.callMethod("disableTextTrack")
        }
    }, {
        key: "pause",
        value: function() {
            return this.callMethod("pause")
        }
    }, {
        key: "play",
        value: function() {
            return this.callMethod("play")
        }
    }, {
        key: "requestFullscreen",
        value: function() {
            return screenfull.isEnabled ? screenfull.request(this.element) : this.callMethod("requestFullscreen")
        }
    }, {
        key: "exitFullscreen",
        value: function() {
            return screenfull.isEnabled ? screenfull.exit() : this.callMethod("exitFullscreen")
        }
    }, {
        key: "getFullscreen",
        value: function() {
            return screenfull.isEnabled ? npo_src.resolve(screenfull.isFullscreen) : this.get("fullscreen")
        }
    }, {
        key: "requestPictureInPicture",
        value: function() {
            return this.callMethod("requestPictureInPicture")
        }
    }, {
        key: "exitPictureInPicture",
        value: function() {
            return this.callMethod("exitPictureInPicture")
        }
    }, {
        key: "getPictureInPicture",
        value: function() {
            return this.get("pictureInPicture")
        }
    }, {
        key: "remotePlaybackPrompt",
        value: function() {
            return this.callMethod("remotePlaybackPrompt")
        }
    }, {
        key: "unload",
        value: function() {
            return this.callMethod("unload")
        }
    }, {
        key: "destroy",
        value: function() {
            var t = this;
            return new npo_src(function(i) {
                if (readyMap.delete(t),
                playerMap.delete(t.element),
                t._originalElement && (playerMap.delete(t._originalElement),
                t._originalElement.removeAttribute("data-vimeo-initialized")),
                t.element && t.element.nodeName === "IFRAME" && t.element.parentNode && (t.element.parentNode.parentNode && t._originalElement && t._originalElement !== t.element.parentNode ? t.element.parentNode.parentNode.removeChild(t.element.parentNode) : t.element.parentNode.removeChild(t.element)),
                t.element && t.element.nodeName === "DIV" && t.element.parentNode) {
                    t.element.removeAttribute("data-vimeo-initialized");
                    var n = t.element.querySelector("iframe");
                    n && n.parentNode && (n.parentNode.parentNode && t._originalElement && t._originalElement !== n.parentNode ? n.parentNode.parentNode.removeChild(n.parentNode) : n.parentNode.removeChild(n))
                }
                t._window.removeEventListener("message", t._onMessage),
                screenfull.isEnabled && screenfull.off("fullscreenchange", t.fullscreenchangeHandler),
                i()
            }
            )
        }
    }, {
        key: "getAutopause",
        value: function() {
            return this.get("autopause")
        }
    }, {
        key: "setAutopause",
        value: function(t) {
            return this.set("autopause", t)
        }
    }, {
        key: "getBuffered",
        value: function() {
            return this.get("buffered")
        }
    }, {
        key: "getCameraProps",
        value: function() {
            return this.get("cameraProps")
        }
    }, {
        key: "setCameraProps",
        value: function(t) {
            return this.set("cameraProps", t)
        }
    }, {
        key: "getChapters",
        value: function() {
            return this.get("chapters")
        }
    }, {
        key: "getCurrentChapter",
        value: function() {
            return this.get("currentChapter")
        }
    }, {
        key: "getColor",
        value: function() {
            return this.get("color")
        }
    }, {
        key: "getColors",
        value: function() {
            return npo_src.all([this.get("colorOne"), this.get("colorTwo"), this.get("colorThree"), this.get("colorFour")])
        }
    }, {
        key: "setColor",
        value: function(t) {
            return this.set("color", t)
        }
    }, {
        key: "setColors",
        value: function(t) {
            if (!Array.isArray(t))
                return new npo_src(function(r, o) {
                    return o(new TypeError("Argument must be an array."))
                }
                );
            var i = new npo_src(function(r) {
                return r(null)
            }
            )
              , n = [t[0] ? this.set("colorOne", t[0]) : i, t[1] ? this.set("colorTwo", t[1]) : i, t[2] ? this.set("colorThree", t[2]) : i, t[3] ? this.set("colorFour", t[3]) : i];
            return npo_src.all(n)
        }
    }, {
        key: "getCuePoints",
        value: function() {
            return this.get("cuePoints")
        }
    }, {
        key: "getCurrentTime",
        value: function() {
            return this.get("currentTime")
        }
    }, {
        key: "setCurrentTime",
        value: function(t) {
            return this.set("currentTime", t)
        }
    }, {
        key: "getDuration",
        value: function() {
            return this.get("duration")
        }
    }, {
        key: "getEnded",
        value: function() {
            return this.get("ended")
        }
    }, {
        key: "getLoop",
        value: function() {
            return this.get("loop")
        }
    }, {
        key: "setLoop",
        value: function(t) {
            return this.set("loop", t)
        }
    }, {
        key: "setMuted",
        value: function(t) {
            return this.set("muted", t)
        }
    }, {
        key: "getMuted",
        value: function() {
            return this.get("muted")
        }
    }, {
        key: "getPaused",
        value: function() {
            return this.get("paused")
        }
    }, {
        key: "getPlaybackRate",
        value: function() {
            return this.get("playbackRate")
        }
    }, {
        key: "setPlaybackRate",
        value: function(t) {
            return this.set("playbackRate", t)
        }
    }, {
        key: "getPlayed",
        value: function() {
            return this.get("played")
        }
    }, {
        key: "getQualities",
        value: function() {
            return this.get("qualities")
        }
    }, {
        key: "getQuality",
        value: function() {
            return this.get("quality")
        }
    }, {
        key: "setQuality",
        value: function(t) {
            return this.set("quality", t)
        }
    }, {
        key: "getRemotePlaybackAvailability",
        value: function() {
            return this.get("remotePlaybackAvailability")
        }
    }, {
        key: "getRemotePlaybackState",
        value: function() {
            return this.get("remotePlaybackState")
        }
    }, {
        key: "getSeekable",
        value: function() {
            return this.get("seekable")
        }
    }, {
        key: "getSeeking",
        value: function() {
            return this.get("seeking")
        }
    }, {
        key: "getTextTracks",
        value: function() {
            return this.get("textTracks")
        }
    }, {
        key: "getVideoEmbedCode",
        value: function() {
            return this.get("videoEmbedCode")
        }
    }, {
        key: "getVideoId",
        value: function() {
            return this.get("videoId")
        }
    }, {
        key: "getVideoTitle",
        value: function() {
            return this.get("videoTitle")
        }
    }, {
        key: "getVideoWidth",
        value: function() {
            return this.get("videoWidth")
        }
    }, {
        key: "getVideoHeight",
        value: function() {
            return this.get("videoHeight")
        }
    }, {
        key: "getVideoUrl",
        value: function() {
            return this.get("videoUrl")
        }
    }, {
        key: "getVolume",
        value: function() {
            return this.get("volume")
        }
    }, {
        key: "setVolume",
        value: function(t) {
            return this.set("volume", t)
        }
    }, {
        key: "setTimingSrc",
        value: function() {
            var e = _asyncToGenerator(_regeneratorRuntime().mark(function i(n, r) {
                var o = this, a;
                return _regeneratorRuntime().wrap(function(l) {
                    for (; ; )
                        switch (l.prev = l.next) {
                        case 0:
                            if (n) {
                                l.next = 2;
                                break
                            }
                            throw new TypeError("A Timing Object must be provided.");
                        case 2:
                            return l.next = 4,
                            this.ready();
                        case 4:
                            return a = new TimingSrcConnector(this,n,r),
                            postMessage(this, "notifyTimingObjectConnect"),
                            a.addEventListener("disconnect", function() {
                                return postMessage(o, "notifyTimingObjectDisconnect")
                            }),
                            l.abrupt("return", a);
                        case 8:
                        case "end":
                            return l.stop()
                        }
                }, i, this)
            }));
            function t(i, n) {
                return e.apply(this, arguments)
            }
            return t
        }()
    }]),
    s
}();
isNode || (screenfull = initializeScreenfull(),
initializeEmbeds(),
resizeEmbeds(),
initAppendVideoMetadata(),
checkUrlTimeParam());
class VideoOverlay {
    constructor() {
        this.code = document.querySelector("#vimeo-overlay").dataset.code,
        this.closeElements = [document.querySelector("#vimeo-overlay__close-button"), document.querySelector("#vimeo-overlay__bg")],
        this.openButton = document.querySelector("#vimeo-preview__image-wrapper"),
        this.isActive = !1,
        this.iframe = document.querySelector("#vimeo-overlay iframe"),
        document.querySelector("#vimeo-overlay__content-inner").appendChild(this.iframe),
        this.closeElements.forEach(t => {
            t.addEventListener("click", this.enable.bind(this, !1))
        }
        ),
        this.openButton.addEventListener("click", this.enable.bind(this, !0)),
        document.addEventListener("keydown", t => {
            t.key === "Escape" && this.isActive && this.enable(!1)
        }
        )
    }
    enable(e, t) {
        e ? (this.isActive = !0,
        document.documentElement.classList.add("vimeo-open"),
        this.iframe.src = `https://player.vimeo.com/video/${t}?h=00000000&autoplay=0`,
        this.player = new Player(this.iframe),
        scrollManager.isActive = !1) : (this.isActive = !1,
        document.documentElement.classList.remove("vimeo-open"),
        this.player.pause(),
        this.player.setCurrentTime(0),
        scrollManager.isActive = !0)
    }
}
const videoOverlay = new VideoOverlay;
class CaseStudy extends Section {
    domInner;
    domVideoThumbnail;
    preInit(e, t) {
        super.preInit(caseStudyPage, t.querySelector("#case-study"), "light"),
        this.domVideoThumbnail = t.querySelector("#case-study__video"),
        console.log(this.domVideoThumbnail),
        this.domVideoThumbnail.addEventListener("click", i => {
            const n = i.target.closest("#case-study__video").dataset.code;
            videoOverlay.enable(!0, n)
        }
        )
    }
    init() {
        super.init()
    }
    resize(e, t) {
        super.resize(e, t)
    }
    update(e) {
        super.update(e)
    }
}
class CaseStudyPage extends Page {
    path = /customers\/([^\/]+)$/;
    id = "case-study";
    currentCaseStudy = null;
    preInit() {
        super.preInit()
    }
    preInitContent(e) {
        let t = e.content.domInner = e.dom.querySelector("#case-study-page__inner");
        (e.content.caseStudy = new CaseStudy).preInit(e, t)
    }
    init() {}
    initContent(e) {
        e.content.caseStudy.init()
    }
    show(e, t, i) {
        this.domContainer.append(t.content.domInner),
        this.currentCaseStudy = t.content.caseStudy,
        super.show(e, t, i)
    }
    resize(e, t) {
        this.currentCaseStudy && this.currentCaseStudy.resize(e, t),
        super.resize(e, t)
    }
    update(e) {
        super.update(e),
        this.currentCaseStudy && this.currentCaseStudy.update(e),
        super.postUpdate(e)
    }
}
const caseStudyPage = new CaseStudyPage;
class Route {
    constructor(e) {
        this.path = e,
        this.target = null,
        this.title = "",
        this.desc = "",
        this.dom = null,
        this.hasContentPreloaded = !1,
        this.content = {}
    }
    setTitleDom(e, t, i) {
        this.title = e,
        this.desc = t,
        this.dom = i
    }
    setTarget(e) {
        let t = null;
        for (let i = 0; i < e.length; i++) {
            let n = e[i];
            if (n.regExp.test(this.path)) {
                t = n;
                break
            }
        }
        t || console.error("route not found for path: " + this.path),
        this.target = t.target
    }
}
let loc = window.location
  , ORIGIN = window.location.origin
  , URL_PREFIX_REGEX = new RegExp("^" + ORIGIN.replace(/\//g, "\\/"));
class RouteManager {
    routes = {};
    matchList = [];
    currPath = null;
    _pendingPath = null;
    queryStr;
    onRouteChanged = new MinSignal$2;
    get currRoute() {
        return this.routes[this.currPath]
    }
    init() {
        let e = this.parseUrl();
        this.queryStr = e.query,
        window.addEventListener("popstate", this._onStatePop.bind(this)),
        this.setUrl()
    }
    addPath(e, t) {
        this.matchList.push({
            regExp: e instanceof RegExp ? e : new RegExp("^" + e + "$"),
            target: t
        })
    }
    _createRoute(e) {
        let t = this.routes[e] = new Route(e);
        return t.setTarget(this.matchList),
        t
    }
    _fetchHtml(e) {
        let t = this.routes[e];
        t ? t.dom && this._onDomReady(t) : properties.loader.load("/" + e, {
            type: "text",
            onLoad: this._initDom.bind(this, this._createRoute(e))
        })
    }
    _initDom(e, t) {
        let i, n, r;
        t ? (i = document.implementation.createHTMLDocument(),
        i.open(),
        i.write(t),
        i.close()) : i = document,
        n = i.querySelector("title"),
        r = i.querySelector('meta[name="description"]'),
        e.setTitleDom(n ? n.textContent : "", r ? r.content : "", i.querySelector(".page")),
        this._attachEvents(document.documentElement),
        this._onDomReady(e)
    }
    _attachEvents(e) {
        let t = e.querySelectorAll("a");
        for (let i = 0, n = t.length; i < n; i++) {
            let r = t[i];
            if (!r.__hasClickParsed) {
                r.__hasClickParsed = !0;
                let o = r.href.indexOf(window.location.origin) === 0 || r.href.indexOf("https://") !== 0 && r.href.indexOf("http://") !== 0 || r.href.indexOf("/") === 0;
                o = o && !r.href.includes("mailto:") && !r.href.match(/\.[\w\d]+$/g),
                o && (r.addEventListener("mouseenter", a => {
                    this.preFetch(this.parseUrl(r.href).path)
                }
                ),
                r.addEventListener("click", a => {
                    !a.ctrlKey && !a.metaKey && (a.preventDefault(),
                    this.setUrl(r.href))
                }
                ))
            }
        }
    }
    _onDomReady(e) {
        this._pendingPath == e.path && (this._pendingPath = null,
        this.onRouteChanged.dispatch(e))
    }
    parseUrl(e=loc.href) {
        let t = e.replace(URL_PREFIX_REGEX, "")
          , i = t.split("#")
          , n = i[1];
        i = i[0].split("?");
        let r = i[1];
        return t = this.parsePath(i[0]),
        {
            path: t,
            query: r,
            hash: n
        }
    }
    parsePath(e) {
        return e = e.replace(/^\/|\/$/g, ""),
        e
    }
    setUrl(e=loc.href) {
        let t = this.parseUrl(e);
        this.setPath(t.path, t.query, t.hash)
    }
    setPath(e, t, i) {
        e = this.parsePath(e),
        t = this.mergeQueryStr(this.queryStr, t),
        i = i,
        e !== this.currPath ? (history.pushState(null, null, (e || "/") + (t ? "?" + t : "") + (i ? "#" + i : "")),
        this._onStatePop()) : this._pendingPath || scrollManager.scrollToPixel(0)
    }
    mergeQueryStr(e, t) {
        let i = Object.assign(settings.parseQuery(e ? "?" + e : ""), settings.parseQuery(t ? "?" + t : ""))
          , n = "";
        for (let r in i)
            n += r + "=" + i[r] + "&";
        return n ? n.slice(0, -1) : ""
    }
    preFetch(e) {
        e = this.parsePath(e),
        this._fetchHtml(e)
    }
    _onStatePop(e) {
        e && e.preventDefault();
        let t = this.parseUrl().path;
        t !== this.currPath && (this.currPath = t,
        this._pendingPath = t,
        properties.hasInitialized ? this._fetchHtml(t) : this._initDom(this._createRoute(t)))
    }
}
const routeManager = new RouteManager;
class CustomersHeader extends Section {
    preInit(e) {
        super.preInit(customersPage, "customers-header", "dark", !0),
        this.domLogosWrapper = this.domContainerEl.querySelector("#customers-header__logo-lists-wrapper")
    }
    init() {
        super.init()
    }
    resize(e, t) {
        super.resize(e, t)
    }
    update(e) {
        const t = scrollManager.getDomRange(this.domContainerEl);
        this.borderRatio = math.fit(t.hideScreenOffset, -1, -.5, 0, 1),
        super.update(e)
    }
}
const customersHeader = new CustomersHeader;
class CustomersFeedback extends Section {
    activeIndex = 0;
    activeIndexRatio = 0;
    preInit(e) {
        super.preInit(customersPage, "customers-feedback", "light"),
        this.domGalleryWrapper = e.querySelector("#customers-feedback__gallery-wrapper"),
        this.domGalleryItems = Array.from(e.querySelectorAll(".customers-feedback__gallery-item-list-wrapper")),
        this.domGalleryItems.forEach( (t, i) => {
            t.addEventListener("mouseenter", () => {
                t._data.isActive = !0,
                this.activeIndex = i
            }
            ),
            t.addEventListener("mouseleave", () => {
                t._data.isActive = !1,
                this.activeIndex = 0
            }
            )
        }
        )
    }
    init() {
        super.init()
    }
    resize(e, t) {
        super.resize(e, t),
        this.collapsedWidth = (properties.viewportWidth - properties.viewportWidth * .03 * 2 - properties.viewportWidth * .01 * 4) / 5,
        this.expandedWidth = (properties.viewportWidth - properties.viewportWidth * .03 * 2 - properties.viewportWidth * .01 * 11) / 12 * 6 + properties.viewportWidth * .01 * 5,
        !properties.isMobile && properties.viewportWidth > 1440 ? this.domGalleryItems.forEach(i => {
            i._data = {
                width: this.collapsedWidth,
                height: i.getBoundingClientRect().height,
                isActive: !1,
                padding: parseFloat(getComputedStyle(i.querySelector(".customers-feedback__gallery-item-list")).padding || 0),
                activeRatio: 0,
                domInner: i.querySelector(".customers-feedback__gallery-item-list")
            },
            i._data.domInner.style.width = `${this.expandedWidth}px`
        }
        ) : this.domGalleryItems.forEach(i => {
            i._data = {
                width: this.collapsedWidth,
                height: i.getBoundingClientRect().height,
                isActive: !1,
                padding: parseFloat(getComputedStyle(i.querySelector(".customers-feedback__gallery-item-list")).padding || 0),
                activeRatio: 0,
                domInner: i.querySelector(".customers-feedback__gallery-item-list")
            },
            i._data.domInner.style.width = ""
        }
        )
    }
    showOverlay() {}
    update(e) {
        if (super.update(e),
        !properties.isMobile && properties.viewportWidth > 1440) {
            let t = 0;
            ((this.collapsedWidth + properties.viewportWidth * .01) * 5 + this.expandedWidth - properties.viewportWidth) / 6,
            this.domGalleryItems.forEach( (i, n) => {
                i._data.activeRatio = math.mix(i._data.activeRatio, i._data.isActive ? 1 : 0, .05),
                i.style.setProperty("--image-ratio", 1 - i._data.activeRatio);
                let r = math.mix(this.collapsedWidth, this.expandedWidth, i._data.activeRatio);
                this.activeIndexRatio = math.mix(this.activeIndexRatio, this.activeIndex, .01),
                i.style.width = `${r}px`,
                i.style.left = `${t - (this.expandedWidth - this.collapsedWidth) * this.activeIndexRatio / 4}px`,
                t += r + properties.viewportWidth * .01
            }
            )
        } else
            this.domGalleryItems.forEach(t => {
                t.style.width = "",
                t.style.left = "",
                t.style.setProperty("--image-ratio", 1)
            }
            )
    }
}
const customersFeedback = new CustomersFeedback;
class CustomersData extends Section {
    preInit(e) {
        super.preInit(customersPage, "customers-data", "light")
    }
    init() {
        super.init()
    }
    resize(e, t) {
        super.resize(e, t)
    }
    update(e) {
        super.update(e)
    }
}
const customersData = new CustomersData;
class CustomersPage extends Page {
    path = "customers";
    id = "customers";
    preInit() {
        super.preInit(),
        customersHeader.preInit(this.domContainer),
        customersFeedback.preInit(this.domContainer),
        customersData.preInit(this.domContainer)
    }
    init() {
        customersHeader.init(),
        customersFeedback.init(),
        customersData.init()
    }
    show(e, t, i) {
        window.location.hash == "#nubank" && (window.location.href = "/customers/nubank"),
        e.path && e.path.match(/^customers\/.+/g) && scrollManager.scrollTo(this.domContainer.querySelector("#customers-feedback__hero"), -.2, !0),
        super.show(e, t, i)
    }
    resize(e, t) {
        customersHeader.resize(e, t),
        customersFeedback.resize(e, t),
        customersData.resize(e, t)
    }
    update(e) {
        super.update(e),
        customersHeader.update(e),
        customersFeedback.update(e),
        customersData.update(e),
        super.postUpdate(e)
    }
}
const customersPage = new CustomersPage;
class PageManager {
    pages = {};
    pageList = [homePage, enterprisePage, pricingPage, customersPage, caseStudyPage];
    scrollTargetPage = null;
    domContainer = null;
    domInner = null;
    prevRoute = null;
    currRoute = null;
    _defaultRoute;
    _pendingRoute;
    _isHiding = !1;
    _isShowing = !1;
    _hasPreloaded = !0;
    isFirstRoute = !0;
    onIdled = new MinSignal$2;
    NEEDS_LOG = !1;
    constructor() {
        this._defaultRoute = new Route(void 0),
        this.prevRoute = this.currRoute = this._defaultRoute;
        for (let e = 0; e < this.pageList.length; e++) {
            let t = this.pageList[e];
            this.pages[t.id] = t,
            routeManager.addPath(t.path, t)
        }
    }
    preInit() {
        this.domContainer = document.getElementById("pages-container"),
        routeManager.onRouteChanged.add(this._onRouteChanged, this),
        this._onRouteChanged(routeManager.currRoute)
    }
    get isIdle() {
        return !this._isHiding && this._hasPreloaded && !this._isShowing
    }
    _onRouteChanged(e) {
        if (!this.isIdle)
            this._pendingRoute = e;
        else if (this.currRoute !== e) {
            this.prevRoute = this.currRoute,
            this.currRoute = e;
            let t = this.currRoute.target;
            if (t.domContainer || (t.domContainer = this.currRoute.dom,
            this._log("preInit: " + this.currRoute.path),
            postUfx.scene.add(t.postUfxContainer),
            t.preInit(this.currRoute)),
            properties.hasInitialized ? this._hasPreloaded = !1 : this.scrollTargetPage = t,
            this.currRoute.hasContentPreloaded || (this._log("preInitContent: " + this.currRoute.path),
            t.preInitContent(this.currRoute)),
            properties.hasInitialized) {
                let i = this.prevRoute.target;
                this._isHiding = !0,
                this._log("hide page: " + this.prevRoute.path),
                document.documentElement.classList.remove("menu-active"),
                i.hide(this.prevRoute, this.currRoute, () => {
                    this._isHiding = !1,
                    this._hasPreloaded && this._onHideComplete()
                }
                ),
                properties.loader.start(n => {
                    n == 1 && (this._hasPreloaded = !0,
                    this._isHiding || this._onHideComplete())
                }
                )
            }
        }
    }
    init() {
        this._initPage()
    }
    _initPage() {
        let e = this.currRoute.target;
        e.hasInitialized || (this._log("init: " + this.currRoute.path),
        e.init(this.currRoute),
        e.hasInitialized = !0),
        this.currRoute.hasContentPreloaded || (this.currRoute.hasContentPreloaded = !0,
        this._log("initContent: " + this.currRoute.path),
        e.initContent(this.currRoute))
    }
    _onHideComplete() {
        if (this._initPage(),
        this._isShowing = !0,
        this.prevRoute.target) {
            let e = this.prevRoute.target;
            this._log("hide page complete: " + this.prevRoute.path),
            e.isActive = !1,
            e !== this.currRoute.target && (e.domContainer.remove(),
            e.postUfxContainer.visible = !1),
            e.onHideComplete(this.prevRoute, this.currRoute),
            document.documentElement.classList.remove("is-page-" + e.id)
        }
        this._showPage()
    }
    resize(e, t) {
        this.prevRoute.target && this.prevRoute.target.isActive && this.prevRoute.target !== this.currRoute.target && this.prevRoute.target.resize(e, t),
        this.currRoute && this.currRoute.target.isActive && this.currRoute.target.resize(e, t)
    }
    start() {
        this._isShowing = !0,
        this._showPage()
    }
    _showPage() {
        let e = this.currRoute.target;
        e.isActive = !0,
        properties.hasInitialized && e !== this.prevRoute.target && this.domContainer.prepend(e.domContainer),
        document.title = this.currRoute.title,
        document.querySelector('meta[name="description"]').content = this.currRoute.desc,
        document.querySelector('meta[property="og:description"]').content = this.currRoute.desc,
        document.querySelector('meta[name="twitter:description"]').content = this.currRoute.desc,
        this.scrollTargetPage = e,
        e.postUfxContainer.visible = !0,
        this._log("show page: " + this.currRoute.path),
        scrollManager.resize(properties.viewportWidth, properties.viewportHeight),
        scrollManager.scrollToPixel(0, !0),
        e.resize(properties.viewportWidth, properties.viewportHeight),
        siteFooter.resize(properties.viewportWidth, properties.viewportHeight),
        document.documentElement.classList.add("is-page-" + e.id),
        e.show(this.prevRoute, this.currRoute, this._onShowComplete.bind(this))
    }
    _onShowComplete() {
        if (this._isShowing = !1,
        this.isFirstRoute = !1,
        this._log("==============="),
        this._pendingRoute) {
            let e = this._pendingRoute;
            this._pendingRoute = null,
            this._onRouteChanged(e)
        } else
            this.onIdled.dispatch()
    }
    update(e) {
        this.prevRoute.target && this.prevRoute.target.isActive && this.prevRoute.target !== this.currRoute.target && this.prevRoute.target.update(e),
        this.currRoute && this.currRoute.target.isActive && this.currRoute.target.update(e)
    }
    _log(e) {
        this.NEEDS_LOG && console.log("%cPageManager: " + e, "color: #fff;background-color:#00f")
    }
}
const pagesManager = new PageManager;
class ScrollPane {
    id = 0;
    lockOnDirection = !0;
    isActive = !1;
    x;
    y;
    viewDom;
    contentDom;
    isVertical = !0;
    targetScrollPixel = 0;
    scrollViewDelta = 0;
    viewWidthPixel = 0;
    viewHeightPixel = 0;
    contentSize = 0;
    contentSizePixel = 0;
    scrollView = 0;
    progress = 0;
    minScrollPixel = .1;
    viewSizePixel = 1;
    scrollMultiplier = 1;
    domRanges = new Map;
    useResizeObserver = !0;
    tick = -1;
    lastResizeTick = -1;
    resizeObserveTick = -1;
    hasResizeObserved = !1;
    dragHistory = [];
    dragHistoryMaxTime = .1;
    isWheelScrolling = !1;
    frictionCoeffFrom = 2.1;
    frictionCoeffTo = 1.9;
    frictionCoeffWeightDivisor = 5;
    minVelocity = -1;
    wheelEaseCoeff = 12;
    scrollPixel = 0;
    letructor() {}
    init(e={}) {
        Object.assign(this, e),
        this.contentDom && this.useResizeObserver && window.ResizeObserver && new ResizeObserver(this._onResizeObserve.bind(this)).observe(this.contentDom),
        document.documentElement.addEventListener("keydown", t => {
            t.key === "ArrowUp" ? this.scrollToPixel(this.scrollPixel - 100) : t.key === "ArrowDown" ? this.scrollToPixel(this.scrollPixel + 100) : t.key === "PageUp" ? this.scrollToPixel(this.scrollPixel - this.viewSizePixel) : t.key === "PageDown" && this.scrollToPixel(this.scrollPixel + this.viewSizePixel)
        }
        )
    }
    _onResizeObserve() {
        this.hasResizeObserved = !0,
        this.resizeObserveTick = this.tick,
        properties.needsResize = !0
    }
    getDomRange(e, t=0, i=!1) {
        let n = this.domRanges.get(e);
        return n || this.domRanges.set(e, n = new ScrollDomRange(e,this.isVertical)),
        n.update(this.scrollPixel, this.viewSizePixel, t, i),
        n
    }
    scrollTo(e, t=0, i=!1) {
        if (e = typeof e == "string" ? document.getElementById(e) : e,
        e) {
            let n = this.getDomRange(e);
            this.scrollToPixel(n.top + t * this.viewSizePixel, i)
        }
    }
    scrollToPixel(e=0, t=!1) {
        e = this._clampScrollPixel(e),
        t ? (this.resetScroll(e),
        this.progress = this.contentSize > 0 ? e / this.contentSizePixel : 0) : (this.resetScroll(this.scrollPixel),
        this.targetScrollPixel = e,
        this.isWheelScrolling = !0),
        this.syncDom()
    }
    resize(e, t) {
        if (this.domRanges.forEach(n => {
            n.needsUpdate = !0
        }
        ),
        this.viewDom) {
            let n = this.viewDom.getBoundingClientRect();
            e = n.width,
            t = n.height
        }
        this.viewWidthPixel = e,
        this.viewHeightPixel = t;
        let i = this.isVertical ? t : e;
        if (this.contentDom) {
            let n = this.contentDom.getBoundingClientRect();
            this.contentSize = Math.max(0, (this.isVertical ? n.height : n.width) / i - 1)
        }
        this.contentSizePixel = Math.floor(this.contentSize * i),
        this.targetScrollPixel = this.contentSizePixel * this.progress,
        this.resetScroll(this.targetScrollPixel),
        this.viewSizePixel = i,
        this.lastResizeTick = this.tick,
        this.syncDom()
    }
    _clampScrollPixel(e) {
        return math.clamp(e, 0, this.contentSizePixel)
    }
    resetScroll(e) {
        this.targetScrollPixel = this.scrollPixel = e,
        this.velocityPixel = 0,
        this.dragHistory.length = 0
    }
    update(e) {
        this.hasResizeObserved && (this.hasResizeObserved = !1,
        this.resizeObserveTick !== this.lastResizeTick && this.resize(this.viewWidthPixel, this.viewHeightPixel));
        let t = this.scrollView
          , i = input.isDown && (!this.lockOnDirection && (input.isDragScrollingY || input.isDragScrollingX) || this.isVertical && input.isDragScrollingY || !this.isVertical && input.isDragScrollingX)
          , n = 0;
        if (input.isDown && !input.wasDown && (this.dragHistory.length = 0),
        this.isMoveable) {
            let r = 0;
            this.isVertical ? input.isWheelScrolling || input.isDragScrollingY ? r = input.deltaScrollY : !this.lockOnDirection && input.isDragScrollingX && (r = -input.deltaPixelXY.y + input.deltaWheel) : input.isWheelScrolling || input.isDragScrollingX ? r = input.deltaScrollX : !this.lockOnDirection && input.isDragScrollingY && (r = -input.deltaPixelXY.x + input.deltaWheel),
            r *= this.scrollMultiplier,
            input.isWheelScrolling && (this.isWheelScrolling = !0);
            let o = properties.time;
            if (i) {
                for (this.dragHistory.push({
                    time: o,
                    deltaTime: e,
                    deltaPixel: r
                }); this.dragHistory.length > 0 && o - this.dragHistory[0].time > this.dragHistoryMaxTime; )
                    this.dragHistory.shift();
                this.targetScrollPixel = this.scrollPixel,
                this.isWheelScrolling = !1,
                n = r
            } else if (input.isDown && this.resetScroll(this.scrollPixel),
            this.isWheelScrolling) {
                this.dragHistory.length = 0,
                this.velocityPixel = 0,
                this.targetScrollPixel += r,
                this.targetScrollPixel = this._clampScrollPixel(this.targetScrollPixel);
                let a = this.targetScrollPixel - this.scrollPixel;
                n = a * (1 - Math.exp(-this.wheelEaseCoeff * e)),
                Math.abs(a) < this.minScrollPixel && (n = a,
                this.isWheelScrolling = !1)
            } else {
                if (this.dragHistory.length > 0) {
                    let l = 0
                      , u = 0;
                    for (let h = 0; h < this.dragHistory.length; h++) {
                        let d = this.dragHistory[h];
                        if (d.time > 0) {
                            let m = d.deltaPixel / d.deltaTime
                              , g = d.deltaTime
                              , p = this.dragHistory.length == 1 ? 1 : (d.time - this.dragHistory[0].time) / this.dragHistoryMaxTime
                              , f = g * p;
                            u += m * f,
                            l += f
                        }
                    }
                    this.velocityPixel = u / l,
                    this.dragHistory.length = 0
                }
                let c = -math.mix(this.frictionCoeffFrom, this.frictionCoeffTo, math.clamp(Math.abs(this.velocityPixel / this.viewSizePixel / this.frictionCoeffWeightDivisor), 0, 1)) * this.velocityPixel;
                this.velocityPixel += c * e,
                n = this.velocityPixel * e
            }
        }
        this.scrollPixel = this._clampScrollPixel(this.scrollPixel + n),
        this.scrollView = this.scrollPixel / this.viewSizePixel,
        this.scrollViewDelta = this.scrollView - t,
        this.progress = this.contentSize > 0 ? this.scrollPixel / this.contentSizePixel : 0,
        Math.abs(this.targetScrollPixel - this.scrollPixel) < this.minScrollPixel && (this.scrollPixel = this.targetScrollPixel),
        Math.abs(this.velocityPixel) <= this.minVelocity && (this.velocityPixel = 0),
        this.isScrolling = this.targetScrollPixel !== this.scrollPixel || Math.abs(this.velocityPixel) > 0,
        this.syncDom(),
        this.tick++
    }
    syncDom() {
        this.contentDom && (this.x = 0,
        this.y = 0,
        this.isVertical ? this.y = -this.scrollPixel : this.x = -this.scrollPixel,
        this.contentDom.style.transform = `translate3d(${this.x}px, ${this.y}px, 0px)`)
    }
    get isMoveable() {
        return this.isActive && pagesManager.isIdle && this.contentSize > 0
    }
}
class ScrollManager extends ScrollPane {
    domScrollIndicator;
    domScrollIndicatorHeight = 1;
    domScrollIndicatorBar;
    scrollIndicatorActiveRatio = 0;
    lastMouseInteractiveTime = -1 / 0;
    isIndicatorActive = void 0;
    easedScrollStrength = 0;
    isCustomerOverlayOpen = !1;
    useTestValues = settings.SCROLL_TEST_VALUES;
    frameIdx = -1;
    MIN_BAR_SCALE_Y = 1 / 10;
    init() {
        super.init({
            contentDom: document.getElementById("viewport-wrapper"),
            domScrollIndicator: document.getElementById("scroll-indicator"),
            domScrollIndicatorBar: document.getElementById("scroll-indicator-bar"),
            canOvershoot: !1
        }),
        input.onDowned.add( () => {
            input.hasThroughElemWithClass("scroll-x") && (this.lockOnDirection = !0)
        }
        ),
        input.onUped.add( () => {
            this.lockOnDirection = !1
        }
        )
    }
    resize(e, t) {
        super.resize(e, t),
        this.domScrollIndicatorHeight = this.domScrollIndicator.getBoundingClientRect().height
    }
    update(e) {
        super.update(e, this.scrollValue),
        this.easedScrollStrength += Math.abs(this.scrollViewDelta),
        this.easedScrollStrength += (0 - this.easedScrollStrength) * (1 - Math.exp(-10 * e)),
        this.easedScrollStrength = Math.min(this.easedScrollStrength, 1),
        Math.abs(this.scrollViewDelta) > 0 ? (this.lastMouseInteractiveTime = properties.time,
        this.isIndicatorActive = !0) : properties.time > this.lastMouseInteractiveTime + .5 && (this.isIndicatorActive = !1),
        this.scrollIndicatorActiveRatio = math.clamp(this.scrollIndicatorActiveRatio + (this.isIndicatorActive ? 2 : -2) * e, 0, 1),
        this.domScrollIndicator.style.opacity = this.scrollIndicatorActiveRatio;
        let i = 1
          , n = 0;
        this.contentSize > 0 && (i = Math.max(this.MIN_BAR_SCALE_Y, 1 / (1 + this.contentSize)),
        n = this.scrollView / this.contentSize * (1 - i)),
        this.domScrollIndicatorBar.style.height = this.domScrollIndicatorHeight * i + "px",
        this.domScrollIndicatorBar.style.transform = "translate3d(0," + this.domScrollIndicatorHeight * n + "px,0)",
        this.frameIdx++
    }
    get isMoveable() {
        return super.isMoveable && pagesManager.isIdle && !(properties.useMobileLayout && document.documentElement.classList.contains("menu-active")) && !this.isCustomerOverlayOpen
    }
}
const scrollManager = new ScrollManager;
class TextureHelper {
    blackTexture;
    whiteTexture;
    transparentTexture;
    init() {
        this.blackTexture = this._createPixelTexture([0, 0, 0, 255]),
        this.whiteTexture = this._createPixelTexture([255, 255, 255, 255]),
        this.transparentTexture = this._createPixelTexture([0, 0, 0, 0])
    }
    _createPixelTexture(e) {
        return fboHelper.createDataTexture(new Uint8Array(e), 1, 1, !1, !0)
    }
}
const textureHelper = new TextureHelper
  , ImageItem = properties.loader.ITEM_CLASSES.image;
class TextureItem extends ImageItem {
    constructor(e, t) {
        let i = t.content || new Texture(new Image);
        switch (t.content = i.image,
        i.minFilter = t.minFilter || LinearMipMapLinearFilter,
        i.magFilter = t.magFilter || LinearFilter,
        i.minFilter) {
        case NearestMipMapNearestFilter:
        case NearestMipMapLinearFilter:
        case LinearMipMapNearestFilter:
        case LinearMipMapLinearFilter:
            i.generateMipmaps = !0,
            i.anisotropy = t.anisotropy || properties.renderer.capabilities.getMaxAnisotropy();
            break;
        default:
            i.generateMipmaps = !1
        }
        i.flipY = t.flipY === void 0 ? !0 : t.flipY,
        t.wrap ? i.wrapS = i.wrapT = t.wrap : (t.wrapS && (i.wrapS = t.wrapS),
        t.wrapT && (i.wrapT = t.wrapT)),
        super(e, t),
        this.content = i
    }
    retrieve() {
        return !1
    }
    load() {
        this.isStartLoaded = !0;
        let e = this.content.image;
        e.onload = this.boundOnLoad,
        e.src = this.url
    }
    _onLoad() {
        delete this.content.image.onload,
        this.width = this.content.image.width,
        this.height = this.content.image.height,
        this.content.needsUpdate = !0,
        this.onPost ? this.onPost.call(this, this.content, this.onPostLoadingSignal) : this._onLoadComplete()
    }
}
TextureItem.type = "texture";
TextureItem.extensions = [];
let DEFAULT_POST_PROFILE = new PostProfile;
class Visuals {
    container = new Object3D;
    preInit() {
        bgVisual.preInit(),
        this.container.add(bgVisual.container)
    }
    init() {
        bgVisual.init()
    }
    resize(e, t) {
        bgVisual.resize(e, t)
    }
    preUpdate(e) {
        postprocessing.blendProfile(DEFAULT_POST_PROFILE, 1),
        bgVisual.preUpdate(e),
        postprocessing.syncProfile()
    }
    update(e) {
        bgVisual.update(e)
    }
}
const visuals = new Visuals;
class App {
    initEngine() {
        if (properties.canvas = document.getElementById("canvas"),
        window.addEventListener("beforeunload", function(e) {
            properties.canvas.style.display = "none"
        }),
        settings.USE_WEBGL2 && window.WebGL2RenderingContext)
            try {
                properties.gl = properties.canvas.getContext("webgl2", properties.webglOpts),
                settings.RENDER_TARGET_FLOAT_TYPE = HalfFloatType,
                settings.DATA_FLOAT_TYPE = FloatType
            } catch (e) {
                console.error(e)
            }
        if (!properties.gl && (settings.USE_WEBGL2 = !1,
        window.WebGLRenderingContext))
            try {
                let e = properties.gl = properties.canvas.getContext("webgl", properties.webglOpts) || properties.canvas.getContext("experimental-webgl", properties.webglOpts);
                (e.getExtension("OES_texture_float") || e.getExtension("OES_texture_half_float")) && e.getParameter(e.MAX_VERTEX_TEXTURE_IMAGE_UNITS) ? (settings.RENDER_TARGET_FLOAT_TYPE = browser.isIOS || e.getExtension("OES_texture_half_float") ? HalfFloatType : FloatType,
                settings.DATA_FLOAT_TYPE = FloatType) : (settings.USE_FLOAT_PACKING = !0,
                settings.RENDER_TARGET_FLOAT_TYPE = settings.DATA_FLOAT_TYPE = UnsignedByteType)
            } catch (e) {
                return console.error(e),
                !1
            }
        properties.loader.register(TextureItem),
        properties.renderer = new WebGLRenderer({
            canvas: properties.canvas,
            context: properties.gl
        }),
        properties.scene = new Scene,
        properties.camera = new PerspectiveCamera(60,1,.1,50),
        properties.scene.add(properties.camera),
        fboHelper.init(properties.renderer, settings.RENDER_TARGET_FLOAT_TYPE),
        textureHelper.init(),
        postprocessing.init(properties.scene, properties.camera),
        blueNoise.preInit(),
        screenPaint.init(),
        postprocessing.addQueue()
    }
    preInit() {
        visuals.preInit()
    }
    init() {
        visuals.init(),
        properties.scene.add(visuals.container),
        settings.IS_DEV === !1 && console.log("%c Created by Lusion: https://lusion.co", "border:2px solid gray; padding:5px; font-family:monospace; font-size:11px;")
    }
    start() {}
    resize(e, t) {
        properties.renderer.setSize(e, t),
        properties.canvas.style.width = `${properties.viewportWidth}px`,
        properties.canvas.style.height = `${properties.viewportHeight}px`,
        properties.camera.aspect = properties.width / properties.height,
        properties.camera.updateProjectionMatrix(),
        postprocessing.setSize(properties.width, properties.height),
        screenPaint.resize(properties.width, properties.height),
        visuals.resize(properties.width, properties.height)
    }
    update(e=0) {
        properties.time = properties.sharedUniforms.u_time.value += e,
        properties.deltaTime = properties.sharedUniforms.u_deltaTime.value = e,
        blueNoise.update(e),
        visuals.preUpdate(e),
        screenPaint.update(e),
        visuals.update(e),
        postprocessing.render(properties.scene, properties.camera, !0),
        window.__debugTexture && fboHelper.debugTo(window.__debugTexture)
    }
}
const app = new App;
class Preloader {
    isActive = !1;
    targetPercent = 0;
    percent = 0;
    initToStartPercent = 0;
    domContainer;
    domCanvas;
    domText;
    domBar;
    domBarInner;
    ctx;
    _tmpCamera = new Camera;
    MIN_PRELOAD_DURATION = .2;
    PERCENT_BETWEEN_INIT_AND_START = .1;
    MIN_DURATION_BETWEEN_INIT_AND_START = .15;
    HIDE_DURATION = .2;
    preInit() {
        this.domContainer = document.getElementById("preloader"),
        this.domSvg = this.domContainer.querySelector("svg"),
        this.isActive = !0
    }
    show(e, t) {
        this._initCallback = e,
        this._startCallback = t,
        this.isActive = !0,
        properties.loader.start(i => {
            this.targetPercent = i
        }
        )
    }
    hide() {
        settings.SKIP_ANIMATION && (this.isActive = !1,
        this.domContainer.style.display = "none")
    }
    resize(e, t) {
        this.isActive
    }
    update(e) {
        this.isActive && this._initCallback && (this._initCallback(),
        this._startCallback(),
        this.domContainer.style.display = "none",
        this.isActive = !1)
    }
}
const preloader = new Preloader;
class UI {
    preInit() {
        if (document.documentElement.classList.add("is-ready"),
        postUfx.init(),
        postprocessing.queue.push(postUfx),
        preloader.preInit(),
        siteHeader.preInit(),
        siteMenu.preInit(),
        siteFooter.preInit(),
        settings.HIDE_UI) {
            let e = document.getElementById("ui");
            document.body.h,
            e.classList.add("is-hidden"),
            e.style.opacity = 0
        }
    }
    preload(e, t) {
        preloader.show(e, t)
    }
    init() {
        siteHeader.init(),
        siteMenu.init(),
        siteFooter.init()
    }
    start() {
        preloader.hide()
    }
    resize(e, t) {
        document.documentElement.style.setProperty("--vh", properties.viewportHeight * .01 + "px"),
        preloader.resize(e, t),
        siteHeader.resize(e, t),
        siteFooter.resize(e, t)
    }
    update(e) {
        preloader.update(e),
        siteHeader.update(e),
        siteMenu.update(e),
        siteFooter.update(e)
    }
}
const ui = new UI
  , AnyItem = properties.loader.ITEM_CLASSES.any;
class FontItem extends AnyItem {
    constructor(e, t) {
        FontItem.canvas || FontItem.initCanvas(),
        t.loadFunc = () => {}
        ,
        t.hasLoading = t.hasLoading === void 0 ? !0 : t.hasLoading,
        t.refText = "refing something...",
        t.refFontSize = t.refFontSize || 120,
        t.refFont = t.refFont || "monospace:400:italic",
        t.interval = t.interval || 20,
        t.refTextWidth = 0,
        super(e, t),
        this.loadFunc = this._loadFunc.bind(this)
    }
    static canvas;
    static ctx;
    static initCanvas() {
        let e = document.createElement("canvas");
        e.width = e.height = 1,
        FontItem.canvas = e,
        FontItem.ctx = e.getContext("2d")
    }
    _loadFunc(e, t, i) {
        let n = e.split(",")
          , r = [];
        for (let d = 0; d < n.length; d++)
            r.push(n[d].trim());
        n = this.refFont.split(":");
        let o = n[0]
          , a = n[1] || "normal"
          , c = n[2] || "normal"
          , l = o;
        this.refTextWidth = this._getTextWidth(o, a, c);
        let u, h = r.length;
        u = setInterval( () => {
            n = r[0].split(":"),
            o = n[0],
            a = n[1] || "normal",
            c = n[2] || "normal",
            this._getTextWidth(o, a, c, l) !== this.refTextWidth && (r.shift(),
            i.dispatch((h - r.length) / h),
            r.length === 0 && (clearInterval(u),
            t()))
        }
        , this.refInterval)
    }
    _getTextWidth = (e, t, i, n) => {
        let r = FontItem.ctx;
        return r.font = i + " " + t + " " + this.refFontSize + "px " + e + (n ? ", " + n : ""),
        r.measureText(this.refText).width
    }
    ;
    _onLoaderLoad(e, t) {
        this.content = t,
        e(t)
    }
    _onLoaderLoading(e, t) {
        e.dispatch(t.loaded / t.total)
    }
}
FontItem.type = "font";
FontItem.extensions = [];
class DevGrid {
    static keyCode = 103;
    static html = `
	<div id="dev-grid">
		<style>
		  #dev-grid {
			position: fixed;
			top: 0;
			left: 0;
			right: 0;
			bottom: 0;
			pointer-events: none;
			z-index: 100000;
		  }
		  #dev-grid .o-grid > * {
			height: 100vh;
			display: flex;
		  }
		  #dev-grid .o-grid > *:before {
			content: '';
			display: block;
			width: 100%;
			background-color: rgba(255,0,0,.15);
		  }
		</style>
		<div class="o-container u-d-sm-none">
		  <div class="o-grid">
			<div class="o-col-1"></div>
			<div class="o-col-1"></div>
			<div class="o-col-1"></div>
			<div class="o-col-1"></div>
			<div class="o-col-1"></div>
			<div class="o-col-1"></div>
			<div class="o-col-1"></div>
			<div class="o-col-1"></div>
			<div class="o-col-1"></div>
			<div class="o-col-1"></div>
			<div class="o-col-1"></div>
			<div class="o-col-1"></div>
		  </div>
		</div>
		<div class="o-container u-d-none u-d-sm-block">
		  <div class="o-grid">
			<div class="o-col-1"></div>
			<div class="o-col-1"></div>
			<div class="o-col-1"></div>
			<div class="o-col-1"></div>
			<div class="o-col-1"></div>
			<div class="o-col-1"></div>
			<div class="o-col-1"></div>
			<div class="o-col-1"></div>
			<div class="o-col-1"></div>
			<div class="o-col-1"></div>
			<div class="o-col-1"></div>
			<div class="o-col-1"></div>
		  </div>
		</div>
	  </div>
	</div>
  `;
    constructor() {
        this.active = !1,
        document.addEventListener("keypress", this.onKeyPress.bind(this))
    }
    onKeyPress(e) {
        e.keyCode == DevGrid.keyCode && event.target.tagName.toLowerCase() != "input" && event.target.tagName.toLowerCase() != "textarea" && (this.active = !this.active,
        this.active ? this.show() : this.hide())
    }
    show() {
        document.body.insertAdjacentHTML("beforeend", DevGrid.html)
    }
    hide() {
        document.getElementById("dev-grid").remove()
    }
}
new DevGrid;
let dateTime = performance.now();
function preRun() {
    properties.readCSSProperties() ? preInit() : requestAnimationFrame(preRun)
}
function preInit() {
    for (const [t,i] of Object.entries(settings.CROSS_ORIGINS))
        properties.loader.setCrossOrigin(t, i);
    routeManager.init(),
    properties.loader.register(FontItem);
    let s = properties.viewportWidth = window.innerWidth
      , e = properties.viewportHeight = window.innerHeight;
    properties.width = s,
    properties.height = e,
    properties.loader.add("neue-haas-grotesk-display:400,neue-haas-grotesk-display:500,neue-haas-grotesk-display:700,neue-haas-grotesk-display:700:italic,neue-haas-grotesk-text:400,neue-haas-grotesk-text:400:italic,neue-haas-grotesk-text:700", {
        type: "font"
    }),
    app.initEngine(),
    input.preInit(),
    scrollManager.init(),
    ui.preInit(),
    pagesManager.preInit(),
    app.preInit(),
    window.addEventListener("resize", onResize),
    _onResize(),
    loop(),
    ui.preload(init, start)
}
function init() {
    settings.LOOK_DEV_MODE && gui.init(),
    input.init(),
    ui.init(),
    pagesManager.init(),
    app.init(),
    properties.hasInitialized = !0
}
function start() {
    ui.start(),
    pagesManager.start(),
    app.start(),
    properties.hasStarted = !0,
    _onResize(),
    scrollManager.isActive = !0,
    settings.JUMP_SECTION !== "" && scrollManager.scrollTo(settings.JUMP_SECTION, settings.JUMP_OFFSET, !0)
}
function onResize() {
    properties.needsResize = !0
}
function _onResize(s) {
    properties.isResizing = !0;
    let e = properties.viewportWidth = window.innerWidth
      , t = properties.viewportHeight = window.innerHeight;
    properties.viewportResolution.set(e, window.innerHeight),
    properties.useMobileLayout = properties.viewportWidth < 768,
    document.documentElement.style.setProperty("--vh", t * .01 + "px");
    let i = settings.UP_SCALE
      , n = e * settings.DPR
      , r = t * settings.DPR;
    if (settings.USE_PIXEL_LIMIT === !0 && n * r > settings.MAX_PIXEL_COUNT) {
        let o = n / r;
        r = Math.sqrt(settings.MAX_PIXEL_COUNT / o),
        n = Math.ceil(r * o),
        r = Math.ceil(r)
    }
    properties.width = Math.ceil(n / i),
    properties.height = Math.ceil(r / i),
    properties.resolution.set(properties.width, properties.height),
    properties.viewportWidth = e,
    properties.viewportHeight = t,
    scrollManager.resize(e, t),
    pagesManager.resize(e, t),
    ui.resize(e, t),
    app.resize(properties.width, properties.height),
    scrollManager.resize(e, t),
    properties.isResizing = !1,
    properties.onResized.dispatch()
}
function update(s) {
    input.update(s),
    scrollManager.update(s),
    ui.update(s),
    pagesManager.update(s),
    app.update(s),
    input.postUpdate(s)
}
function loop(s) {
    properties.timestamp = s,
    window.requestAnimationFrame(loop);
    let e = performance.now()
      , t = (e - dateTime) / 1e3;
    dateTime = e,
    t = Math.min(t, 1 / 20),
    properties.needsResize && _onResize(),
    properties.hasStarted && (properties.startTime += t),
    Tween.autoUpdate(t),
    update(t),
    properties.needsResize = !1
}
preRun();
Object.assign || document.documentElement.classList.add("not-supported not-supported--browser");
document.documentElement.classList.remove("no-js");
/(ipad|iphone|android)/i.test((navigator.userAgent || navigator.vendor).toLowerCase()) ? document.documentElement.classList.add("is-mobile") : document.documentElement.classList.add("is-desktop");
function preventZoom(s) {
    s.preventDefault(),
    document.body.style.zoom = "1"
}
window.addEventListener("wheel", s => s.preventDefault(), {
    passive: !1
});
document.addEventListener("gesturestart", s => preventZoom(s));
document.addEventListener("gesturechange", s => preventZoom(s));
document.addEventListener("gestureend", s => preventZoom(s));
