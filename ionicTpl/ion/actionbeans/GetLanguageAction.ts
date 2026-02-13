    /**
     * Function GetLanguageAction
     *
     * @param page  , the current page
     * @param props , the object which holds properties key-value pairs
     * @param vars  , the object which holds variables key-value pairs
     */
    GetLanguageAction(page: C8oPageBase, props, vars) : Promise<any> {
        return new Promise((resolve, reject) => {
            props = props || {};

            try {
                var normalizeLang = function(value: any): string {
                    if (value == null) {
                        return "";
                    }
                    var lang = ("" + value).trim().toLowerCase();
                    lang = lang.replace(/^[\[\]\s'"]+/, "").replace(/[\[\]\s'"]+$/, "");
                    if (lang == "") {
                        return "";
                    }
                    return lang.split(/[-_]/)[0];
                };

                var parseLanguages = function(value: any): string[] {
                    if (Array.isArray(value)) {
                        return value
                            .map(function(item) { return normalizeLang(item); })
                            .filter(function(item) { return item != ""; });
                    }

                    if (typeof value === "string") {
                        var trimmed = value.trim();
                        if (trimmed == "") {
                            return [];
                        }

                        if (trimmed.charAt(0) == "[") {
                            try {
                                var parsed = JSON.parse(trimmed);
                                if (Array.isArray(parsed)) {
                                    return parsed
                                        .map(function(item) { return normalizeLang(item); })
                                        .filter(function(item) { return item != ""; });
                                }
                            } catch (e) {
                            }
                        }

                        return trimmed
                            .split(",")
                            .map(function(item) { return normalizeLang(item); })
                            .filter(function(item) { return item != ""; });
                    }

                    return [];
                };

                var storageKey = (props.storageKey != null && ("" + props.storageKey).trim() != "") ? ("" + props.storageKey).trim() : "c8o.language";
                var fallbackLanguage = normalizeLang(props.fallbackLanguage) || "en";
                var supportedLanguages = parseLanguages(props.supportedLanguages);
                var useStorage = props.useStorage !== false;
                var useBrowser = props.useBrowser !== false;
                var useGlobal = props.useGlobal !== false;
                var persist = props.persist !== false;
                var applyLanguage = props.applyLanguage !== false;
                var setDefaultLanguage = props.setDefaultLanguage !== false;
                var globalProperty = (props.globalProperty != null && ("" + props.globalProperty).trim() != "") ? ("" + props.globalProperty).trim() : "language";

                var selectedLanguage = "";
                var source = "";

                selectedLanguage = normalizeLang((this.translate as any).currentLang);
                if (selectedLanguage != "") {
                    source = "translate";
                }

                if (selectedLanguage == "" && useGlobal && page && page.global && globalProperty != "") {
                    selectedLanguage = normalizeLang(page.global[globalProperty]);
                    if (selectedLanguage != "") {
                        source = "global";
                    }
                }

                if (selectedLanguage == "" && useStorage && typeof window !== "undefined" && window.localStorage) {
                    try {
                        selectedLanguage = normalizeLang(window.localStorage.getItem(storageKey));
                        if (selectedLanguage != "") {
                            source = "storage";
                        }
                    } catch (e) {
                    }
                }

                if (selectedLanguage == "" && useBrowser && typeof navigator !== "undefined") {
                    var browserLanguage = (navigator as any).language || (navigator as any).userLanguage;
                    selectedLanguage = normalizeLang(browserLanguage);
                    if (selectedLanguage != "") {
                        source = "browser";
                    }
                }

                if (selectedLanguage == "") {
                    selectedLanguage = fallbackLanguage;
                    source = "fallback";
                }

                if (supportedLanguages.length > 0 && supportedLanguages.indexOf(selectedLanguage) == -1) {
                    if (supportedLanguages.indexOf(fallbackLanguage) != -1) {
                        selectedLanguage = fallbackLanguage;
                    } else {
                        selectedLanguage = supportedLanguages[0];
                    }
                    source = "supported";
                }

                if (setDefaultLanguage) {
                    this.translate.setDefaultLang(fallbackLanguage);
                }

                if (applyLanguage) {
                    this.translate.use(selectedLanguage);
                }

                if (persist && typeof window !== "undefined" && window.localStorage) {
                    try {
                        window.localStorage.setItem(storageKey, selectedLanguage);
                    } catch (e) {
                    }
                }

                if (page && page.global && globalProperty != "") {
                    page.global[globalProperty] = selectedLanguage;
                }

                resolve({
                    lang: selectedLanguage,
                    source: source,
                    fallback: fallbackLanguage,
                    supportedLanguages: supportedLanguages
                });
            } catch (e) {
                reject(e);
            }
        });
    }
