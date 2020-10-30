/*! Copyright ©  2020                                                                                      */
/*! Developer : NavAddIn                                                                                   */
/*! EMail : navaddins@outlook.com                                                                          */
/*! Date : 2020-09-09                                                                                      */
/*! Dependency : TinyMCE and JQuery (3.5.1)                                                                */
/*! License : Free for this library but you may need to follow thirdpary license                           */
/*! Thirdparty JQuery License  : https://jquery.org/license                                                */
/*! Thirdparty TinyMCE License : https://www.tiny.cloud/docs-3x/extras/TinyMCE3x@License                   */
/*! TinyMCE Documentation                                                                                  */
/*!  Premium Plugins           : https://www.tiny.cloud/apps/                                              */
/*!  Tiny Skins and Icon Packs : https://www.tiny.cloud/docs/enterprise/premium-skins-and-icon-packs/      */
/*!  Content appearance options: https://www.tiny.cloud/docs/configure/content-appearance/                 */
/*!  Localization options      : https://www.tiny.cloud/docs/configure/localization/                       */

var TinyMCEEditorHelper = {
    Initialize: function (pRunOnBC) {
        $(document).ready(function () {
            var imgLoader = document.createElement("img");
            imgLoader.setAttribute("id", "imgLoader");
            imgLoader.setAttribute("src", TinyMCEEditorHelper.GetResourceUrl() + "image/Loader.gif");

            var divSpinner = document.createElement("div");
            divSpinner.setAttribute("id", "spinner");
            divSpinner.appendChild(imgLoader);
            document.body.insertBefore(divSpinner, document.body.childNodes[0]);

            divControlAddIn = document.getElementById("controlAddIn");
            if (typeof divControlAddIn != "undefined") {
                $('#controlAddIn').css('background-color', 'white');
                $('#controlAddIn').css('width', $(window).width());
                $('#controlAddIn').css('height', '100%');

                var txtarea = document.createElement("textarea");
                txtarea.setAttribute("style", "visibility: hidden");
                txtarea.setAttribute("class", TinyMCEEditorHelper.Properties.TextAreaIdOrClass);

                divControlAddIn.appendChild(txtarea);
                TinyMCEEditorHelper.SetRunOnBC(pRunOnBC);
                TinyMCEEditorHelper.SetControlAddInReady();
                TinyMCEEditorHelper.RaiseControlAddInReady();

                $(window).resize(function () {
                    $('#spinner').css('width', $(window).width());
                    $('#spinner').css('height', '100%');

                    $('#controlAddIn').css('width', $(window).width());
                    $('#controlAddIn').css('height', '100%');
                });
            };
        });
    },    
    DisplaySpinner: function () {
        if (TinyMCEEditorHelper.Properties.IsDisplaySpinner)
            return;

        $('#controlAddIn').css("display", "none");
        $('#spinner').css("background-color", "white");
        $('#spinner').css("width", $(window).width());
        $('#spinner').css("height", $(window).height());
        $('#imgLoader').css("margin-left", $(window).width() / 2 - $('#imgLoader').width() / 2);
        $('#imgLoader').css("margin-top", $(window).height() / 2 - $('#imgLoader').height() / 2);
        $('#spinner').css("display", "block");
        TinyMCEEditorHelper.Properties.IsDisplaySpinner = !0;
    },
    HideSpinner: function () {
        $('#controlAddIn').css("display", "block");
        $('#spinner').css("display", "none");
        TinyMCEEditorHelper.Properties.IsDisplaySpinner = !1;
    },
    RaiseControlAddInReady: function () {
        if (TinyMCEEditorHelper.GetControlAddInReady())
            Microsoft.Dynamics.NAV.InvokeExtensibilityMethod('ControlAddInReady', [TinyMCEEditorHelper.GetControlAddInReady()]);
    },
    RaiseDocumentReady: function () {
        if (!TinyMCEEditorHelper.GetDocumentReady()) {
            TinyMCEEditorHelper.HideSpinner();
            TinyMCEEditorHelper.Properties.IsDocumentReady = !0;
            Microsoft.Dynamics.NAV.InvokeExtensibilityMethod('DocumentReady', [TinyMCEEditorHelper.GetDocumentReady()]);
        } else
            TinyMCEEditorHelper.HideSpinner();
    },
    RaiseContentText: function (pContent) {
        Microsoft.Dynamics.NAV.InvokeExtensibilityMethod("ContentText", [pContent, TinyMCEEditorHelper.GetContentType()]);
    },
    RaiseContentTypeHasChanged: function () {
        if ((typeof tinymce != 'undefined') && TinyMCEEditorHelper.GetControlAddInReady() && TinyMCEEditorHelper.GetDocumentReady() && TinyMCEEditorHelper.GetContentTypeHasChanged()) {
            Microsoft.Dynamics.NAV.InvokeExtensibilityMethod("ContentTypeHasChanged", []);
        }
        TinyMCEEditorHelper.Properties.IsContentTypeChanged = !1;
    },
    RaiseContentHasChanged: function (pEventName) {
        if ((typeof tinymce != 'undefined') && TinyMCEEditorHelper.GetControlAddInReady() && TinyMCEEditorHelper.GetDocumentReady()) {
            if (tinymce.activeEditor.isDirty()) {
                Microsoft.Dynamics.NAV.InvokeExtensibilityMethod("ContentHasChanged", [pEventName]);
            }
        }
    },
    RaiseContentHasSaved: function () {
        if ((typeof tinymce != 'undefined') && TinyMCEEditorHelper.GetControlAddInReady() && TinyMCEEditorHelper.GetDocumentReady()) {
            Microsoft.Dynamics.NAV.InvokeExtensibilityMethod("ContentHasSaved", []);
        }
    },
    GetWindowLocation: function () {
        return window.location;
    },
    GetHref: function () {
        return TinyMCEEditorHelper.GetWindowLocation().href.toLowerCase();
    },
    GetProtocol: function () {
        return TinyMCEEditorHelper.GetWindowLocation().protocol.toLowerCase();
    },
    GetHost: function () {
        return TinyMCEEditorHelper.GetWindowLocation().host.toLowerCase();
    },
    GetHostName: function () {
        return TinyMCEEditorHelper.GetWindowLocation().hostname.toLowerCase();
    },
    GetPathName: function () {
        return TinyMCEEditorHelper.GetWindowLocation().pathname.toLowerCase();
    },
    GetSelfHost: function () {
        return TinyMCEEditorHelper.GetProtocol() == 'file';
    },
    GetResourceUrl: function () {
        var currScriptUrl = $('script[src*="TinyMCEEditor.js"]').attr('src');
        var currResourceUrl = currScriptUrl.substring(0, currScriptUrl.lastIndexOf("script"));
        if (currResourceUrl.slice(currResourceUrl.length - 1) != "/")
            currResourceUrl = currResourceUrl + "/"
        return currResourceUrl;        
    },
    GetResourceBaseUrl: function () {
        return TinyMCEEditorHelper.GetProtocol() + TinyMCEEditorHelper.GetHost() + TinyMCEEditorHelper.GetResourceUrl();
    },
    GetEnvironment: function () {
        return Microsoft.Dynamics.NAV.GetEnvironment();
    },
    GetBusy: function () {
        return TinyMCEEditorHelper.GetEnvironment().Busy
    },
    GetUserName: function () {
        return TinyMCEEditorHelper.GetEnvironment().UserName;
    },
    GetCompanyName: function () {
        return TinyMCEEditorHelper.GetEnvironment().CompanyName
    },
    GetDeviceCategory: function () {
        return TinyMCEEditorHelper.GetEnvironment().DeviceCategory
    },
    GetPlatform: function () {
        return TinyMCEEditorHelper.GetEnvironment().Platform
    },
    UserInteractionMode: function () {
        return TinyMCEEditorHelper.GetEnvironment().UserInteractionMode
    },
    SetControlAddInReady: function () {
        TinyMCEEditorHelper.DisplaySpinner();
        TinyMCEEditorHelper.Properties.IsAddInReady = !0;
    },
    GetControlAddInReady: function () {
        return TinyMCEEditorHelper.Properties.IsAddInReady;
    },
    SetDocumentReadyReset: function (pReset) {
        if (!pReset)
            TinyMCEEditorHelper.Properties.IsDocumentReady = !1;
    },
    GetDocumentReady: function () {
        return TinyMCEEditorHelper.Properties.IsDocumentReady;
    },
    SetRunOnBC: function (pRunOnBC) {
        TinyMCEEditorHelper.Properties.IsRunOnBC = pRunOnBC;
    },
    GetRunOnBC: function () {
        return TinyMCEEditorHelper.Properties.IsRunOnBC;
    },
    InitContent: function (pIsText, pIsFixContentType) {
        if (!TinyMCEEditorHelper.GetControlAddInReady() || !TinyMCEEditorHelper.GetDocumentReady()) {
            TinyMCEEditorHelper.SetContentTypeUpdate(pIsText, pIsFixContentType);
            TinyMCEEditorHelper.SetTinyMCE();
        } else {
            if ((typeof tinymce != 'undefined'))
                tinymce.activeEditor.windowManager.alert('No need to call InitContent');
        }
    },
    SetSkinIconAndCss: function (pSkinName, pIconSize, pCssName, pCssCores) {
        TinyMCEEditorHelper.Properties.SkinName = pSkinName;
        TinyMCEEditorHelper.Properties.IconSize = pIconSize.trim() === '' ? TinyMCEEditorHelper.Properties.IconSize : pIconSize;
        TinyMCEEditorHelper.Properties.ContentCss = pCssName.trim() === '' ? TinyMCEEditorHelper.Properties.ContentCss : pCssName;
        TinyMCEEditorHelper.Properties.ContentCssCors = pCssCores;
    },
    GetVersion: function () {
        var scriptSources = (TinyMCEEditorHelper.GetScriptLoaded() ? "(Online)" : "(Offline)");
        if ((typeof tinymce != 'undefined') && TinyMCEEditorHelper.GetControlAddInReady() && TinyMCEEditorHelper.GetDocumentReady())
            tinymce.activeEditor.windowManager.alert('TinyMCE Version ' + scriptSources + ' ' + tinymce.majorVersion + '.' + tinymce.minorVersion + '<br />' + TinyMCEEditorHelper.Properties.ControlAddInVersion);
    },
    GetAvaiableSkin: function () {
        if ((typeof tinymce != 'undefined') && TinyMCEEditorHelper.GetControlAddInReady() && TinyMCEEditorHelper.GetDocumentReady())
            tinymce.activeEditor.windowManager.alert('Avaiable Skin:' + TinyMCEEditorHelper.Properties.AvaiableSkinName);
    },
    GetDefaultSkin: function () {
        var defaultSkin = ["oxide", "oxide-dark", "material-classic", "material-outline", "bootstrap", "fabric", "borderless", "small", "jam", "naked", "outside", "snow"];
        return defaultSkin;
    },
    GetIsDefaultSkin: function (pSkinName) {
        var defaultSkin = TinyMCEEditorHelper.GetDefaultSkin();
        var isdefaultSkin = !1;
        for (var i = 0; i < defaultSkin.length; i++) {
            isdefaultSkin = (defaultSkin[i].toLocaleLowerCase().trim() == pSkinName.toLowerCase().trim());
            if (isdefaultSkin)
                break;
        }
        return isdefaultSkin;
    },
    GetSkinName: function () {
        var skinName = TinyMCEEditorHelper.Properties.SkinName.toLowerCase().trim() === '' ?
            ((TinyMCEEditorHelper.GetPlatform() == 0) ? TinyMCEEditorHelper.Properties.WindowsClientSkin :
                (TinyMCEEditorHelper.GetRunOnBC() ? TinyMCEEditorHelper.Properties.WebClientBCSkin : TinyMCEEditorHelper.Properties.WebClientSkin)) :
            TinyMCEEditorHelper.Properties.SkinName.toLowerCase().trim();
        return skinName;
    },
    GetSkinUrl: function () {
        var skinUrl = ''
        if (TinyMCEEditorHelper.GetScriptLoaded())
            skinUrl = TinyMCEEditorHelper.GetIsDefaultSkin(TinyMCEEditorHelper.GetSkinName()) ? '' : TinyMCEEditorHelper.GetResourceUrl() + 'tinymce/skins/ui/' + TinyMCEEditorHelper.GetSkinName();
        return skinUrl;
    },
    GetIconSize: function () {
        return TinyMCEEditorHelper.Properties.IconSize.toLowerCase().trim();
    },
    GetDefaultContentCss: function () {
        var defaultContentCss = ["dark", "default", "document", "writer"];
        return defaultContentCss;
    },
    GetIsDefaultContentCss: function (pCssName) {
        var defaultContentCss = TinyMCEEditorHelper.GetDefaultContentCss();
        var isdefaultCss = !1;
        for (var i = 0; i < defaultContentCss.length; i++) {
            isdefaultCss = (defaultContentCss[i].toLocaleLowerCase().trim() == pCssName.toLowerCase().trim());
            if (isdefaultCss)
                break;
        }
        return isdefaultCss;
    },
    GetContentCss: function () {
        var CssNameOrUrl = '';
        if (TinyMCEEditorHelper.Properties.ContentCss.trim() == '')
            return 'default';

        if (TinyMCEEditorHelper.GetScriptLoaded())
            CssNameOrUrl = TinyMCEEditorHelper.GetIsDefaultContentCss(TinyMCEEditorHelper.Properties.ContentCss) ? TinyMCEEditorHelper.Properties.ContentCss : TinyMCEEditorHelper.GetResourceUrl() + 'tinymce/skins/content/' +
            TinyMCEEditorHelper.Properties.ContentCss + "/content.min.css";
        else
            CssNameOrUrl = TinyMCEEditorHelper.Properties.ContentCss;
        return CssNameOrUrl.toLowerCase().trim();
    },
    GetContentCssCores: function () {
        return TinyMCEEditorHelper.Properties.ContentCssCors;
    },
    SetHideBrand: function () {
        TinyMCEEditorHelper.Properties.IsHideBrand = !1;
    },
    GetHideBrand: function () {
        return TinyMCEEditorHelper.Properties.IsHideBrand;
    },
    SetShowMenu: function () {
        TinyMCEEditorHelper.Properties.ShowMenu = !0;
    },
    GetShowMenu: function () {
        return TinyMCEEditorHelper.Properties.ShowMenu;
    },
    SetHideToolbar: function () {
        TinyMCEEditorHelper.Properties.IsHideToolbar = !0;
        TinyMCEEditorHelper.SetShowMenu();
    },
    GetHideToolbar: function () {
        return TinyMCEEditorHelper.Properties.IsHideToolbar;
    },
    SetFonts: function (pFonts) {
        TinyMCEEditorHelper.Properties.Fonts = pFonts;
    },
    GetFonts: function () {
        return TinyMCEEditorHelper.Properties.Fonts.trim() === '' ? TinyMCEEditorHelper.Properties.DefaultFonts : TinyMCEEditorHelper.Properties.Fonts.trim();
    },
    GetDefaultFonts: function () {
        if ((typeof tinymce != 'undefined') && TinyMCEEditorHelper.GetControlAddInReady() && TinyMCEEditorHelper.GetDocumentReady())
            tinymce.activeEditor.windowManager.alert('Default Fonts :' + TinyMCEEditorHelper.Properties.DefaultFonts);
    },
    SetFontSize: function (pFontSize) {
        TinyMCEEditorHelper.Properties.FontSize = pFontSize;
    },
    GetFontSize: function () {
        return TinyMCEEditorHelper.Properties.FontSize.trim() === '' ? TinyMCEEditorHelper.Properties.DefaultFontSize : TinyMCEEditorHelper.Properties.FontSize.trim();
    },
    GetDefaultFontSize: function () {
        if ((typeof tinymce != 'undefined') && TinyMCEEditorHelper.GetControlAddInReady() && TinyMCEEditorHelper.GetDocumentReady())
            tinymce.activeEditor.windowManager.alert('Default Font Size :' + TinyMCEEditorHelper.Properties.DefaultFontSize);
    },
    SetEditable: function (pEditable) {
        if ((typeof tinymce != 'undefined') && TinyMCEEditorHelper.GetControlAddInReady() && TinyMCEEditorHelper.GetDocumentReady()) {
            if (pEditable)
                tinymce.activeEditor.mode.set('design');
            else
                tinymce.activeEditor.mode.set('readonly');
            TinyMCEEditorHelper.Properties.IsEditable = e;
        }
    },
    GetEditable: function () {
        return !TinyMCEEditorHelper.Properties.IsEditable;
    },
    SetViewMode: function () {
        TinyMCEEditorHelper.Properties.IsViewMOde = !0;
    },
    GetViewMode: function () {
        return TinyMCEEditorHelper.Properties.IsViewMOde;
    },
    SetContentTypeIsFix: function (pIsFixContentType) {
        TinyMCEEditorHelper.Properties.IsContentTypeIsFix = pIsFixContentType;
    },
    GetContentTypeIsFix: function () {
        return TinyMCEEditorHelper.Properties.IsContentTypeIsFix;
    },
    SetContentType: function (pIsText, pIsFixContentType) {
        if (TinyMCEEditorHelper.GetViewMode())
            TinyMCEEditorHelper.SetContentTypeUpdate(pIsText, pIsFixContentType);
        else
            TinyMCEEditorHelper.SetHtmlToTextToHtml(pIsText, pIsFixContentType, !1);
    },
    SetContentTypeAs: function (pIsText) {
        TinyMCEEditorHelper.Properties.IsText = pIsText;
    },
    SetContentTypeUpdate: function (pIsText, pIsFixContentType) {
        TinyMCEEditorHelper.Properties.IsText = pIsText;
        TinyMCEEditorHelper.SetContentTypeIsFix(pIsFixContentType);
    },
    GetContentType: function () {
        return TinyMCEEditorHelper.Properties.IsText;
    },
    GetContentTypeFormat: function (e) {
        if (e)
            return TinyMCEEditorHelper.GetContentType() ? 'text' : 'raw';
        else
            return TinyMCEEditorHelper.GetContentType() ? 'text' : 'html';
    },
    SetContentStyle: function (pStyle) {
        TinyMCEEditorHelper.Properties.ContentStyle = pStyle;
    },
    GetContentStyle: function () {
        return TinyMCEEditorHelper.Properties.ContentStyle.trim();
    },
    SetContentOnly: function () {
        TinyMCEEditorHelper.Properties.ContentOnly = !0;
    },
    GetContentOnly: function () {
        return TinyMCEEditorHelper.Properties.ContentOnly;
    },
    GetFullPagePlugin: function () {
        return !TinyMCEEditorHelper.GetContentOnly() ? ' ' + TinyMCEEditorHelper.Properties.FullPagePlugin : ''
    },
    SetLanguage: function (pLanguage, pDirectionality) {
        TinyMCEEditorHelper.Properties.Language = pLanguage.trim() === '' ? TinyMCEEditorHelper.Properties.Language : pLanguage;
        TinyMCEEditorHelper.Properties.LanguageDirectionality = pDirectionality.trim() === '' ? TinyMCEEditorHelper.Properties.LanguageDirectionality : pDirectionality;
    },
    GetLanguage: function () {
        return TinyMCEEditorHelper.Properties.Language.trim();
    },
    GetLanguageDirectionality: function () {
        return TinyMCEEditorHelper.Properties.LanguageDirectionality.trim();
    },
    SetTokenProvider: function (pTokenprovider) {
        TinyMCEEditorHelper.Properties.TokenProvider = pTokenprovider;
    },
    GetTokenProvider: function () {
        return TinyMCEEditorHelper.Properties.TokenProvider.trim();
    },
    SetDropboxAppKey: function (pDropboxAppKey) {
        TinyMCEEditorHelper.Properties.DropboxKey = pDropboxAppKey;
    },
    GetDropboxAppKey: function () {
        return TinyMCEEditorHelper.Properties.DropboxKey.trim();
    },
    SetGoogleDriveKey: function (pGoogleDriveKey) {
        TinyMCEEditorHelper.Properties.GoogleDriveKey = pGoogleDriveKey;
    },
    GetGoogleDriveKey: function () {
        return TinyMCEEditorHelper.Properties.GoogleDriveKey.trim();
    },
    SetGoogleDriveClientId: function (pGoogleDriveClientid) {
        TinyMCEEditorHelper.Properties.GoogleDriveClientId = pGoogleDriveClientid;
    },
    GetGoogleDriveClientId: function () {
        return TinyMCEEditorHelper.Properties.GoogleDriveClientId.trim();
    },
    SetOnlineScriptUrl: function (pUrl, pFreeLicense) {
        TinyMCEEditorHelper.Properties.OnlineScriptUrl = pUrl;
        TinyMCEEditorHelper.Properties.IsFreeLicense = pFreeLicense;
        TinyMCEEditorHelper.LoadOnlineScript();

    },
    GetOnlineScriptUrl: function () {
        return TinyMCEEditorHelper.Properties.OnlineScriptUrl.trim();
    },
    GetIsFreeLicense: function () {
        return TinyMCEEditorHelper.Properties.IsFreeLicense;
    },
    LoadOnlineScript: function () {
        if ((TinyMCEEditorHelper.GetControlAddInReady()) && (TinyMCEEditorHelper.GetOnlineScriptUrl() != '') && (!TinyMCEEditorHelper.GetScriptLoaded()) && (TinyMCEEditorHelper.GetPlatform() != 0)) {
            var excludeJsFiles = ['TinyMCEEditor.js', 'TinyMCEEditorHelper.js', 'jquery.min.js'];
            var excludeCssiles = ['css'];
            TinyMCEEditorHelper.RemoveJsCssfile(excludeJsFiles, 'js');
            TinyMCEEditorHelper.RemoveJsCssfile(excludeCssiles, 'css');
            tinymce = undefined;
            TinyMCEEditorHelper.AddJsCssfile(TinyMCEEditorHelper.GetOnlineScriptUrl(), 'js');
            TinyMCEEditorHelper.SetScriptLoaded();
        }
    },
    SetEnablePremiumPlugin: function () {
        TinyMCEEditorHelper.Properties.IsEnablePremiumPlugin = !0;
    },
    GetEnablePremiumPlugin: function () {
        if ((TinyMCEEditorHelper.GetIsFreeLicense()) || (TinyMCEEditorHelper.GetPlatform() == 0))
            return !1;
        return TinyMCEEditorHelper.Properties.IsEnablePremiumPlugin;
    },
    GetPremiumPlugin: function () {
        return TinyMCEEditorHelper.GetEnablePremiumPlugin() ? ' ' + TinyMCEEditorHelper.Properties.PremiumPlugin : '';
    },
    SetScriptLoaded: function () {
        TinyMCEEditorHelper.Properties.IsScriptLoaded = !0;
    },
    GetScriptLoaded: function () {
        return TinyMCEEditorHelper.Properties.IsScriptLoaded;
    },
    SetDispose: function () {
        if ((typeof tinymce != 'undefined') && TinyMCEEditorHelper.GetControlAddInReady() && TinyMCEEditorHelper.GetDocumentReady()) {
            TinyMCEEditorHelper.SetDocumentReadyReset(!1);
            tinymce.activeEditor.destroy(false);
        }
    },
    SetAutoSave: function (pSecond, pConfirm) {
        TinyMCEEditorHelper.Properties.AutoSaveInterval = pSecond;
        TinyMCEEditorHelper.Properties.IsAutoSaveConfirm = pConfirm;
        TinyMCEEditorHelper.SetEnableAutoSave((pSecond > 0));
    },
    SetEnableAutoSave: function (pEnable) {
        TinyMCEEditorHelper.Properties.IsEnableAutoSave = pEnable;
    },
    GetEnableAutoSave: function () {
        return TinyMCEEditorHelper.Properties.IsEnableAutoSave;
    },
    GetAutoSavePlugin: function () {
        return TinyMCEEditorHelper.GetEnableAutoSave() ? ' ' + TinyMCEEditorHelper.Properties.AutoSavePlugin : ''
    },
    GetAutoSaveInterval: function () {
        return TinyMCEEditorHelper.Properties.AutoSaveInterval + 's';
    },
    GetAutoSaveConfirm: function () {
        return TinyMCEEditorHelper.Properties.IsAutoSaveConfirm;
    },
    SetAutoSaving: function () {
        if (TinyMCEEditorHelper.GetAutoSaveConfirm()) {
            if (!TinyMCEEditorHelper.GetAutoSaving()) {
                TinyMCEEditorHelper.Properties.IsAutoSaving = !0;
                if ((typeof tinymce != 'undefined') && TinyMCEEditorHelper.GetControlAddInReady() && TinyMCEEditorHelper.GetDocumentReady()) {
                    tinymce.activeEditor.setDirty(false);
                    tinymce.activeEditor.windowManager.confirm("Do you want to save for the changes?", function (result) {
                        tinymce.activeEditor.setDirty(true);
                        if (result)
                            tinymce.activeEditor.execCommand('mceSave');
                        else
                            tinymce.activeEditor.setDirty(false);
                    });
                }
            }
        } else {
            if (!TinyMCEEditorHelper.GetAutoSaving()) {
                TinyMCEEditorHelper.Properties.IsAutoSaving = !0;
                if ((typeof tinymce != 'undefined') && TinyMCEEditorHelper.GetControlAddInReady() && TinyMCEEditorHelper.GetDocumentReady()) {
                    tinymce.activeEditor.execCommand('mceSave');
                }

            }
        };
        TinyMCEEditorHelper.SetAutoSaved();
    },
    GetAutoSaving: function () {
        return TinyMCEEditorHelper.Properties.IsAutoSaving;
    },
    SetAutoSaved: function () {
        TinyMCEEditorHelper.Properties.IsAutoSaving = !1;
    },
    SetHtmlSchema: function (pSchema) {
        TinyMCEEditorHelper.Properties.HtmlSchema = pSchema.trim() === '' ? TinyMCEEditorHelper.Properties.HtmlSchema : pSchema;
    },
    GetHtmlSchema: function () {
        return TinyMCEEditorHelper.Properties.HtmlSchema.toLowerCase().trim();
    },
    SetContentBlock: function (pBlock) {
        TinyMCEEditorHelper.Properties.ContentBlock = pBlock.trim() === '' ? TinyMCEEditorHelper.Properties.ContentBlock : pBlock;
    },
    GetContentBlock: function () {
        return TinyMCEEditorHelper.Properties.ContentBlock.toLowerCase().trim();
    },
    SetContent: function (pContent) {
        if ((typeof tinymce != 'undefined') && TinyMCEEditorHelper.GetControlAddInReady() && TinyMCEEditorHelper.GetDocumentReady())
            tinymce.activeEditor.resetContent(pContent.trim());
    },
    GetContent: function () {
        if ((typeof tinymce != 'undefined') && TinyMCEEditorHelper.GetControlAddInReady() && TinyMCEEditorHelper.GetDocumentReady()) {
            TinyMCEEditorHelper.RaiseContentText(TinyMCEEditorHelper.GetContentText(!0));
        }
    },
    GetContentAs: function (pIsText) {
        if ((typeof tinymce != 'undefined') && TinyMCEEditorHelper.GetControlAddInReady() && TinyMCEEditorHelper.GetDocumentReady()) {
            var cntType = TinyMCEEditorHelper.GetContentType();
            TinyMCEEditorHelper.SetContentTypeAs(pIsText);
            var cnt = TinyMCEEditorHelper.GetContentText(!0);
            if (TinyMCEEditorHelper.GetContentType())
                cnt = TinyMCEEditorHelper.RemoveHtmlHeadBodyTag(cnt);
            TinyMCEEditorHelper.RaiseContentText(cnt);
            TinyMCEEditorHelper.SetContentTypeAs(cntType);
        }
    },
    GetContentText: function (pDefault) {
        var cnt = '';
        if ((typeof tinymce != 'undefined') && TinyMCEEditorHelper.GetControlAddInReady() && TinyMCEEditorHelper.GetDocumentReady()) {
            if (!pDefault)
                cnt = tinymce.activeEditor.getContent();
            else {
                cnt = tinymce.activeEditor.getContent({
                    format: TinyMCEEditorHelper.GetContentTypeFormat(!1)
                });
            }
        };
        return cnt.trim();
    },
    SetContentTypeHasChanged: function (pIsChanged) {
        TinyMCEEditorHelper.Properties.IsContentTypeChanged = pIsChanged;
    },
    GetContentTypeHasChanged: function () {
        return TinyMCEEditorHelper.Properties.IsContentTypeChanged;
    },
    SetEnableContentEventOn: function (pInput, pKeyup, pChange, pNodeChange) {
        TinyMCEEditorHelper.Properties.IsEnableContentOnInput = pInput;
        TinyMCEEditorHelper.Properties.IsEnableContentOnKeyup = pKeyup;
        TinyMCEEditorHelper.Properties.IsEnableContentOnChange = pChange;
        TinyMCEEditorHelper.Properties.IsEnableContentOnNodeChange = pNodeChange;
        TinyMCEEditorHelper.Properties.IsEnableContentEventOn = ((pInput != 0) || (pKeyup != 0) || (pChange != 0) || (pNodeChange != 0));
    },
    GetEnableContentEventOn: function () {
        if (TinyMCEEditorHelper.GetEnableAutoSave())
            return !1
        else
            return TinyMCEEditorHelper.Properties.IsEnableContentEventOn;
    },
    GetEnableContentOnInput: function () {
        return TinyMCEEditorHelper.Properties.IsEnableContentOnInput;
    },
    GetEnableContentOnKeyup: function () {
        return TinyMCEEditorHelper.Properties.IsEnableContentOnKeyup;
    },
    GetEnableContentOnChange: function () {
        return TinyMCEEditorHelper.Properties.IsEnableContentOnChange;
    },
    GetEnableContentOnNodeChange: function () {
        return TinyMCEEditorHelper.Properties.IsEnableContentOnNodeChange;
    },
    CreateJsCssfile: function (pFileName, ppFileType) {
        if (ppFileType == "js") {
            var s = document.createElement('script');
            s.setAttribute("src", pFileName);
            s.setAttribute("referrerpolicy", "origin");
        } else if (ppFileType == "css") {
            var s = document.createElement("link")
            s.setAttribute("rel", "stylesheet");
            s.setAttribute("type", "text/css");
            s.setAttribute("href", pFileName);
        }
        return s;
    },
    ReplaceJsCssfile: function (pOldFileName, pNewFileName, pFileType) {
        var targetelement = (pFileType == "js") ? "script" : (pFileType == "css") ? "link" : "none"
        var targetattr = (pFileType == "js") ? "src" : (pFileType == "css") ? "href" : "none"
        var allsuspects = document.getElementsByTagName(targetelement)
        for (var i = allsuspects.length; i > 0; i--) {
            if (allsuspects[i] && allsuspects[i].getAttribute(targetattr) != null && allsuspects[i].getAttribute(targetattr).indexOf(pOldFileName) != -1) {
                var newelement = TinyMCEEditorHelper.CreateJsCssfile(pNewFileName, pFileType)
                allsuspects[i].parentNode.replaceChild(newelement, allsuspects[i])
            }
        }
    },
    AddJsCssfile: function (pFileName, pFileType) {
        var s = TinyMCEEditorHelper.CreateJsCssfile(pFileName, pFileType);
        document.head.appendChild(s);
    },
    RemoveJsCssfile: function (pExcludeFiles, pFileType) {
        var targetelement = (pFileType == "js") ? "script" : (pFileType == "css") ? "link" : "none"
        var targetattr = (pFileType == "js") ? "src" : (pFileType == "css") ? "href" : "none"
        var allsuspects = document.getElementsByTagName(targetelement)

        for (var i = allsuspects.length; i >= 0; i--) {
            var excludeThis = !0;
            for (var j = 0; j < pExcludeFiles.length; j++) {
                if (allsuspects[i] && allsuspects[i].getAttribute(targetattr) != null && allsuspects[i].getAttribute(targetattr).indexOf(pExcludeFiles[j]) != -1)
                    excludeThis = !1;
            };
            if ((excludeThis != 0) && (typeof allsuspects[i] != 'undefined'))
                allsuspects[i].parentNode.removeChild(allsuspects[i]);
        }
    },
    SetHtmlToTextToHtmlConfirm: function () {
        if ((typeof tinymce != 'undefined') && TinyMCEEditorHelper.GetControlAddInReady() && TinyMCEEditorHelper.GetDocumentReady()) {
            if (TinyMCEEditorHelper.GetContentText(!1) != '') {
                tinymce.activeEditor.windowManager.confirm("Html format will be change to text format. Do you want to continue?", function (pResult) {
                    if (pResult)
                        TinyMCEEditorHelper.SetHtmlToTextToHtml(!0, TinyMCEEditorHelper.GetContentTypeIsFix(), !0);
                });
            } else
                TinyMCEEditorHelper.SetHtmlToTextToHtml(!0, TinyMCEEditorHelper.GetContentTypeIsFix(), !0);
        }
    },
    SetHtmlToTextToHtml: function (pIsText, pIsFixContentType, pReset) {
        if ((typeof tinymce != 'undefined') && TinyMCEEditorHelper.GetControlAddInReady() && TinyMCEEditorHelper.GetDocumentReady()) {
            TinyMCEEditorHelper.DisplaySpinner();
            if (TinyMCEEditorHelper.GetEnableContentEventOn()) {
                if (TinyMCEEditorHelper.GetEnableContentOnInput())
                    tinymce.activeEditor.off('input');
                if (TinyMCEEditorHelper.GetEnableContentOnKeyup())
                    tinymce.activeEditor.off('keyup');
                if (TinyMCEEditorHelper.GetEnableContentOnChange())
                    tinymce.activeEditor.off('change');
                if (TinyMCEEditorHelper.GetEnableContentOnNodeChange())
                    tinymce.activeEditor.off('NodeChange');
            }

            TinyMCEEditorHelper.SetContentTypeUpdate(pIsText, pIsFixContentType);
            TinyMCEEditorHelper.SetContentTypeHasChanged(pReset);
            TinyMCEEditorHelper.SetDocumentReadyReset(pReset);
            tinymce.remove(TinyMCEEditorHelper.Properties.TextAreaClassName);
            TinyMCEEditorHelper.SetTinyMCE();
        }
    },
    RemoveHtmlHeadBodyTag: function (pContent) {
        var cnt = '';
        if (typeof pContent != "undefined") {
            cnt = pContent;
            if ((cnt != null) && (cnt != '')) {
                cnt = cnt.replace(new RegExp("<!doctype[^>[]*(\\[[^]]*\\])?>", "i"), ''); //Remove DocType
                cnt = cnt.replace(new RegExp("<html[^>]*>", "i"), '').replace(new RegExp("</html>", "i"), ''); //Remove Html
                cnt = cnt.replace(new RegExp("<head>(.*)<\/head>", 'i'), ''); //Remove Head
                cnt = cnt.replace(new RegExp("<head>", 'i'), '').replace(new RegExp("</head>", 'i'), ''); //Remove Head
                cnt = cnt.replace(new RegExp("<body[^>]*>", "i"), '').replace(new RegExp("</body>", "i"), ''); //Remove Body                
                cnt = cnt.replace(new RegExp("^(<br />)+|(<br />)+$", "gi"), '');
                cnt = cnt.replace(new RegExp("<div><br /></div>", "i"), '');
                cnt = cnt.replace(new RegExp("^(\r\n|\n|\r)+|(\r\n|\n|\r)+$", "gi"), '');
            }
        }
        return cnt.trim();
    },
    OnBeforeSetContentHtml: function (pObject) {
        var cnt = '';
        if (typeof pObject != "undefined") {
            cnt = pObject.content;
            if (TinyMCEEditorHelper.GetContentOnly())
                cnt = TinyMCEEditorHelper.RemoveHtmlHeadBodyTag(cnt);
        }
        return cnt.trim();
    },
    OnSetContentHtml: function (pObject) {
        var cnt = '';
        if (typeof pObject != "undefined") {
            cnt = pObject.content;
            if ((cnt != null) && (cnt != '')) {}
        }
        return cnt.trim();
    },
    OnGetContentHtml: function (pObject) {
        var cnt = '';
        if (typeof pObject != "undefined") {
            cnt = pObject.content;
            if ((cnt != null) && (cnt != '')) {
                cnt = cnt.replace(new RegExp("<br[^>]*>", "gi"), '<br />').replace(new RegExp("<br>", "gi"), '<br />');
                cnt = cnt.replace(new RegExp("^(<br />)+|(<br />)+$", "gi"), '');
                cnt = cnt.replace(new RegExp("<div><br /></div>", "i"), '');
                cnt = cnt.replace(new RegExp("<pre><br /></pre>", "i"), '');
                cnt = cnt.replace(new RegExp("<p><br /></p>", "i"), '');
            }
        }
        return cnt.trim();
    },
    OnBeforeSetContentText: function (pObject) {
        var cnt = '';
        if (typeof pObject != "undefined") {
            cnt = pObject.content;
            if ((cnt != null) && (cnt != '')) {
                cnt = TinyMCEEditorHelper.RemoveHtmlHeadBodyTag(cnt);
                cnt = cnt.replace(new RegExp("<div> </div><br>", "gi"), '<div></div><br />');
                cnt = cnt.replace(new RegExp("<div> </div><br />", "gi"), '<div></div><br />');
                cnt = cnt.replace(new RegExp("<div><br /></div>", "i"), '');
                cnt = cnt.replace(new RegExp("<pre> </pre><br>", "gi"), '<pre></pre><br />');
                cnt = cnt.replace(new RegExp("<pre> </pre><br />", "gi"), '<pre></pre><br />');
                cnt = cnt.replace(new RegExp("<pre><br /></pre>", "i"), '');
                cnt = cnt.replace(new RegExp("<p> </p><br>", "gi"), '<p></p><br />');
                cnt = cnt.replace(new RegExp("<p> </p><br />", "gi"), '<p></p><br />');
                cnt = cnt.replace(new RegExp("<p><br /></p>", "i"), '');

                cnt = cnt.replace(new RegExp("\r\n|\n|\r", "g"), '<br />');
                cnt = cnt.replace(new RegExp("<br>", "gi"), '<br />');
                cnt = cnt.replace(new RegExp("^(<br />)+|(<br />)+$", "gi"), '');
            }
        }
        return cnt.trim();
    },
    OnSetContentText: function (pObject) {
        var cnt = '';
        if (typeof pObject != "undefined") {
            cnt = pObject.content;
            if ((cnt != null) && (cnt != '')) {
                cnt = cnt.replace(new RegExp("^(<br />)+|(<br />)+$", "gi"), '');
            }
        }
        return cnt.trim();
    },
    OnGetContentText: function (pObject) {
        var cnt = '';
        if (typeof pObject != "undefined") {
            cnt = pObject.content;
            if ((cnt != null) && (cnt != '')) {
                cnt = cnt.replace(new RegExp("<div></div>", "i"), '');
                cnt = cnt.replace(new RegExp("<pre></pre>", "i"), '');
                cnt = cnt.replace(new RegExp("<p></p>", "i"), '');
                cnt = cnt.replace(new RegExp("<br>", "gi"), '<br />');
                cnt = cnt.replace(new RegExp("^(<br />)+|(<br />)+$", "gi"), '');
            }
        }
        return cnt.trim();
    },
    OnKeyUp: function (pObject) {
        var allowedKeys = [37, 38, 39, 40];
        var keyCode = pObject.keyCode;
        if (typeof keyCode != "undefined") {
            if (allowedKeys.indexOf(keyCode) == -1)
                TinyMCEEditorHelper.RaiseContentHasChanged('keyup');
        } else
            TinyMCEEditorHelper.RaiseContentHasChanged('keyup');
    },
    SetTinyMCE: function () {

        if (!TinyMCEEditorHelper.GetControlAddInReady())
            return;

        if ((typeof tinymce == 'undefined')) {
            window.setTimeout(function () {
                TinyMCEEditorHelper.SetTinyMCE();
            }, 3000);
        } else {
            if (!TinyMCEEditorHelper.GetViewMode()) {
                switch (TinyMCEEditorHelper.GetContentTypeFormat(!1)) {
                    case 'text':
                        tinymce.init({
                            selector: TinyMCEEditorHelper.Properties.TextAreaClassName,
                            auto_focus: TinyMCEEditorHelper.Properties.TextAreaClassName,
                            skin: TinyMCEEditorHelper.GetSkinName(),
                            skin_url: TinyMCEEditorHelper.GetSkinUrl(),
                            icons: TinyMCEEditorHelper.GetIconSize(),
                            content_css: TinyMCEEditorHelper.GetContentCss(),
                            content_css_cors: TinyMCEEditorHelper.GetContentCssCores(),
                            content_style: '',
                            branding: TinyMCEEditorHelper.GetHideBrand(),
                            language: TinyMCEEditorHelper.GetLanguage(),
                            directionality: TinyMCEEditorHelper.GetLanguageDirectionality(),
                            entity_encoding: TinyMCEEditorHelper.GetContentTypeFormat(!0),
                            menubar: TinyMCEEditorHelper.GetShowMenu() ? 'file edit view' : false,
                            width: "100%",
                            height: "100%",
                            readonly: TinyMCEEditorHelper.GetEditable(),
                            paste_as_text: true,
                            forced_root_block: '',
                            remove_trailing_brs: false,
                            force_br_newlines: true,
                            force_p_newlines: false,
                            convert_newlines_to_brs: true,
                            resize: false,
                            statusbar: true,
                            elementpath: false,
                            valid_elements: "br",
                            schema: TinyMCEEditorHelper.GetHtmlSchema(),
                            autosave_ask_before_unload: false,
                            autosave_interval: TinyMCEEditorHelper.GetAutoSaveInterval(),
                            plugins: "newdocument save preview print wordcount paste directionality searchreplace quickbars visualchars" + TinyMCEEditorHelper.GetAutoSavePlugin(),
                            menu: {
                                file: {
                                    title: 'File',
                                    items: 'mnuTextFormat | newdocument mnuSave | preview print '
                                },
                                edit: {
                                    title: 'Edit',
                                    items: 'undo redo | cut copy paste | selectall | searchreplace | a11ycheck ltr rtl'
                                },
                                view: {
                                    title: 'View',
                                    items: 'visualchars | spellchecker | preview fullscreen'
                                }
                            },
                            toolbar: TinyMCEEditorHelper.GetHideToolbar() ? !TinyMCEEditorHelper.GetHideToolbar() : 'btnTextFormat | newdocument save preview print | wordcount | undo redo | selectall cut copy paste searchreplace| a11ycheck ltr rtl | visualchars | spellchecker',
                            quickbars_selection_toolbar: TinyMCEEditorHelper.GetHideToolbar() ? !TinyMCEEditorHelper.GetHideToolbar() : 'cut copy paste searchreplace',
                            a11y_advanced_options: true,
                            content_style: '',
                            save_onsavecallback: function () {
                                TinyMCEEditorHelper.RaiseContentHasSaved();
                            },
                            setup: function (ed) {
                                ed.ui.registry.addMenuItem('mnuSave', {
                                    text: 'Save',
                                    icon: 'save',
                                    onAction: function () {
                                        tinymce.activeEditor.execCommand('mceSave');
                                    }
                                });
                                if (!TinyMCEEditorHelper.GetContentTypeIsFix()) {
                                    ed.ui.registry.addMenuItem('mnuTextFormat', {
                                        text: 'Html',
                                        onAction: function () {
                                            TinyMCEEditorHelper.SetHtmlToTextToHtml(!1, TinyMCEEditorHelper.GetContentTypeIsFix(), !0);
                                        }
                                    });
                                    ed.ui.registry.addButton('btnTextFormat', {
                                        text: 'Html',
                                        onAction: function () {
                                            TinyMCEEditorHelper.SetHtmlToTextToHtml(!1, TinyMCEEditorHelper.GetContentTypeIsFix(), !0);
                                        }
                                    });
                                };
                                ed.on('init',
                                    function () {
                                        if (TinyMCEEditorHelper.GetContentTypeHasChanged())
                                            TinyMCEEditorHelper.SetContent(TinyMCEEditorHelper.GetContentText(!1));
                                        TinyMCEEditorHelper.RaiseDocumentReady();
                                        TinyMCEEditorHelper.RaiseContentTypeHasChanged();
                                    });
                                ed.on('BeforeSetContent', function (e) {
                                    e.content = TinyMCEEditorHelper.OnBeforeSetContentText(e);
                                });
                                ed.on('GetContent', function (e) {
                                    e.content = TinyMCEEditorHelper.OnGetContentText(e);
                                });
                                ed.on('StoreDraft', function () {
                                    TinyMCEEditorHelper.SetAutoSaving();
                                });
                                if (TinyMCEEditorHelper.GetEnableContentEventOn()) {
                                    if (TinyMCEEditorHelper.GetEnableContentOnInput())
                                        ed.on('input', function (e) {
                                            TinyMCEEditorHelper.RaiseContentHasChanged('input');
                                        });
                                    if (TinyMCEEditorHelper.GetEnableContentOnKeyup())
                                        ed.on('keyup', function (e) {
                                            TinyMCEEditorHelper.OnKeyUp(e);
                                        });
                                    if (TinyMCEEditorHelper.GetEnableContentOnChange())
                                        ed.on('change', function (e) {
                                            TinyMCEEditorHelper.RaiseContentHasChanged('change');
                                        });
                                    if (TinyMCEEditorHelper.GetEnableContentOnNodeChange())
                                        ed.on('NodeChange', function (e) {
                                            TinyMCEEditorHelper.RaiseContentHasChanged('nodechange');
                                        });
                                }
                            }
                        });
                        break;
                    case 'html':
                        tinymce.init({
                            selector: TinyMCEEditorHelper.Properties.TextAreaClassName,
                            auto_focus: TinyMCEEditorHelper.Properties.TextAreaClassName,
                            tinydrive_token_provider: TinyMCEEditorHelper.GetTokenProvider(),
                            tinydrive_dropbox_app_key: TinyMCEEditorHelper.GetDropboxAppKey(),
                            tinydrive_google_drive_key: TinyMCEEditorHelper.GetGoogleDriveKey(),
                            tinydrive_google_drive_client_id: TinyMCEEditorHelper.GetGoogleDriveClientId(),
                            skin: TinyMCEEditorHelper.GetSkinName(),
                            skin_url: TinyMCEEditorHelper.GetSkinUrl(),
                            icons: TinyMCEEditorHelper.GetIconSize(),
                            content_css: TinyMCEEditorHelper.GetContentCss(),
                            content_css_cors: TinyMCEEditorHelper.GetContentCssCores(),
                            content_style: TinyMCEEditorHelper.GetContentStyle(),
                            branding: TinyMCEEditorHelper.GetHideBrand(),
                            language: TinyMCEEditorHelper.GetLanguage(),
                            directionality: TinyMCEEditorHelper.GetLanguageDirectionality(),
                            entity_encoding: TinyMCEEditorHelper.GetContentTypeFormat(!0),
                            menubar: TinyMCEEditorHelper.GetShowMenu() ? 'file edit insert view format table tools' : false,
                            font_formats: TinyMCEEditorHelper.GetFonts(),
                            fontsize_formats: TinyMCEEditorHelper.GetFontSize(),
                            importcss_append: true,
                            width: "100%",
                            height: "100%",
                            readonly: TinyMCEEditorHelper.GetEditable(),
                            paste_as_text: false,
                            forced_root_block: TinyMCEEditorHelper.GetContentBlock(),
                            remove_trailing_brs: false,
                            force_br_newlines: true,
                            force_p_newlines: false,
                            paste_data_images: true,
                            convert_newlines_to_brs: true,
                            resize: false,
                            statusbar: true,
                            elementpath: false,
                            relative_urls: false,
                            remove_script_host: true,
                            menu: {
                                file: {
                                    title: 'File',
                                    items: 'mnuTextFormat | newdocument mnuSave | preview | print '
                                },
                                edit: {
                                    title: 'Edit',
                                    items: 'undo redo | cut copy paste | selectall | searchreplace'
                                },
                                view: {
                                    title: 'View',
                                    items: 'code | visualaid visualchars visualblocks | spellchecker | preview fullscreen'
                                },
                                insert: {
                                    title: 'Insert',
                                    items: 'image link media template codesample inserttable | charmap emoticons hr | pagebreak nonbreaking anchor toc | insertdatetime'
                                },
                                format: {
                                    title: 'Format',
                                    items: 'bold italic underline strikethrough superscript subscript codeformat | formats blockformats fontformats fontsizes align | forecolor backcolor | removeformat'
                                },
                                tools: {
                                    title: 'Tools',
                                    items: 'spellchecker spellcheckerlanguage | code wordcount'
                                },
                                table: {
                                    title: 'Table',
                                    items: 'inserttable | cell row column | tableprops deletetable'
                                }
                            },
                            autosave_ask_before_unload: false,
                            autosave_interval: TinyMCEEditorHelper.GetAutoSaveInterval(),
                            plugins: ['save print preview searchreplace autolink directionality',
                                'visualblocks visualchars fullscreen image link media template code codesample table charmap hr pagebreak nonbreaking anchor',
                                'toc insertdatetime advlist lists wordcount imagetools textpattern noneditable',
                                'charmap emoticons quickbars' + TinyMCEEditorHelper.GetPremiumPlugin() + TinyMCEEditorHelper.GetAutoSavePlugin() + TinyMCEEditorHelper.GetFullPagePlugin()
                            ],
                            toolbar: TinyMCEEditorHelper.GetHideToolbar() ? !TinyMCEEditorHelper.GetHideToolbar() : 'btnTextFormat | newdocument save preview print | wordcount  | undo redo | selectall cut copy paste searchreplace |' +
                                'bold italic underline strikethrough subscript superscript hr pagebreak| casechange fontselect fontsizeselect formatselect|' +
                                'forecolor backcolor permanentpen formatpainter removeformat | a11ycheck ltr rtl | alignleft aligncenter alignright alignjustify | outdent indent |  numlist bullist checklist |' +
                                'charmap emoticons | insertfile image media pageembed link template | anchor blockquote codesample code visualchars | table',
                            toolbar_mode: 'sliding',
                            contextmenu: 'link imagetools table configurepermanentpen',
                            quickbars_selection_toolbar: TinyMCEEditorHelper.GetHideToolbar() ? !TinyMCEEditorHelper.GetHideToolbar() : 'cut copy paste searchreplace | bold italic | quicklink h2 h3 blockquote | quickimage quicktable',
                            a11y_advanced_options: true,
                            image_title: true,
                            image_caption: true,
                            automatic_uploads: false,
                            image_advtab: true,
                            file_picker_types: 'image',
                            schema: TinyMCEEditorHelper.GetHtmlSchema(),
                            save_onsavecallback: function () {
                                TinyMCEEditorHelper.RaiseContentHasSaved();
                            },
                            file_picker_callback: function (cb, value, meta) {
                                var input = document.createElement('input');
                                input.setAttribute('type', 'file');
                                input.setAttribute('accept', 'image/*');

                                input.onchange = function () {
                                    var file = this.files[0];

                                    var reader = new FileReader();
                                    reader.onload = function () {
                                        var id = 'blobid' + (new Date()).getTime();
                                        var blobCache = tinymce.activeEditor.editorUpload.blobCache;
                                        var base64 = reader.result.split(',')[1];
                                        var blobInfo = blobCache.create(id, file, base64);
                                        blobCache.add(blobInfo);
                                        cb(blobInfo.blobUri(), {
                                            title: file.name
                                        });
                                    };
                                    reader.readAsDataURL(file);
                                };

                                input.click();
                            },
                            setup: function (ed) {
                                ed.ui.registry.addMenuItem('mnuSave', {
                                    text: 'Save',
                                    icon: 'save',
                                    onAction: function () {
                                        tinymce.activeEditor.execCommand('mceSave');
                                    }
                                });
                                if (!TinyMCEEditorHelper.GetContentTypeIsFix()) {
                                    ed.ui.registry.addMenuItem('mnuTextFormat', {
                                        text: 'Text',
                                        onAction: function () {
                                            TinyMCEEditorHelper.SetHtmlToTextToHtmlConfirm();
                                        }
                                    });
                                    ed.ui.registry.addButton('btnTextFormat', {
                                        text: 'Text',
                                        onAction: function () {
                                            TinyMCEEditorHelper.SetHtmlToTextToHtmlConfirm();
                                        }
                                    });
                                };
                                ed.on('init',
                                    function () {
                                        TinyMCEEditorHelper.RaiseDocumentReady();
                                        TinyMCEEditorHelper.RaiseContentTypeHasChanged();
                                    });
                                ed.on('BeforeSetContent', function (e) {
                                    e.content = TinyMCEEditorHelper.OnBeforeSetContentHtml(e);
                                });
                                ed.on('GetContent', function (e) {
                                    e.content = TinyMCEEditorHelper.OnGetContentHtml(e);
                                });
                                ed.on('StoreDraft', function () {
                                    TinyMCEEditorHelper.SetAutoSaving();
                                });
                                if (TinyMCEEditorHelper.GetEnableContentEventOn()) {
                                    if (TinyMCEEditorHelper.GetEnableContentOnInput())
                                        ed.on('input', function (e) {
                                            TinyMCEEditorHelper.RaiseContentHasChanged('input');
                                        });
                                    if (TinyMCEEditorHelper.GetEnableContentOnKeyup())
                                        ed.on('keyup', function (e) {
                                            TinyMCEEditorHelper.OnKeyUp(e);
                                        });
                                    if (TinyMCEEditorHelper.GetEnableContentOnChange())
                                        ed.on('change', function (e) {
                                            TinyMCEEditorHelper.RaiseContentHasChanged('change');
                                        });
                                    if (TinyMCEEditorHelper.GetEnableContentOnNodeChange())
                                        ed.on('NodeChange', function (e) {
                                            TinyMCEEditorHelper.RaiseContentHasChanged('nodechange');
                                        });
                                }
                            }
                        });
                        break;
                };
            } else {
                tinymce.init({
                    selector: TinyMCEEditorHelper.Properties.TextAreaClassName,
                    auto_focus: TinyMCEEditorHelper.Properties.TextAreaClassName,
                    skin: TinyMCEEditorHelper.GetSkinName(),
                    skin_url: TinyMCEEditorHelper.GetSkinUrl(),
                    icons: TinyMCEEditorHelper.GetIconSize(),
                    content_css: TinyMCEEditorHelper.GetContentCss(),
                    content_css_cors: TinyMCEEditorHelper.GetContentCssCores(),
                    branding: TinyMCEEditorHelper.GetHideBrand(),
                    language: TinyMCEEditorHelper.GetLanguage(),
                    directionality: TinyMCEEditorHelper.GetLanguageDirectionality(),
                    entity_encoding: TinyMCEEditorHelper.GetContentTypeFormat(!0),
                    font_formats: TinyMCEEditorHelper.GetFonts(),
                    fontsize_formats: TinyMCEEditorHelper.GetFontSize(),
                    importcss_append: true,
                    width: "100%",
                    height: "100%",
                    readonly: true,
                    paste_as_text: false,
                    forced_root_block: false,
                    remove_trailing_brs: false,
                    remove_linebreaks: false,
                    force_br_newlines: true,
                    force_p_newlines: false,
                    menubar: false,
                    resize: false,
                    statusbar: true,
                    elementpath: false,
                    toolbar: false,
                    relative_urls: false,
                    remove_script_host: true,
                    plugins: "past" + TinyMCEEditorHelper.GetFullPagePlugin(),
                    schema: TinyMCEEditorHelper.GetHtmlSchema(),
                    setup: function (ed) {
                        ed.on('init',
                            function () {
                                TinyMCEEditorHelper.RaiseDocumentReady();
                            });
                        ed.on('BeforeSetContent', function (e) {
                            if (TinyMCEEditorHelper.GetContentType()) {
                                e.content = TinyMCEEditorHelper.OnBeforeSetContentText(e);
                            }
                        });
                    }
                });
            }
        };
    },
    Properties: {
        TextAreaIdOrClass: 'txttinymce',
        TextAreaClassName: 'textarea.txttinymce',
        IsAddInReady: !1,
        IsDocumentReady: !1,
        IsDisplaySpinner: !1,
        IsScriptLoaded: !1,
        IsRunOnBC: !1,
        IsText: !1,
        IsEditable: !0,
        IsViewMOde: !1,
        IsHideBrand: !0,
        IsHideToolbar: !1,
        IsContentTypeIsFix: !1,
        IsEnableContentEventOn: !1,
        IsEnableContentOnInput: !1,
        IsEnableContentOnKeyup: !1,
        IsEnableContentOnChange: !1,
        IsEnableContentOnNodeChange: !1,
        IsContentTypeChanged: !1,
        ContentOnly: !1,
        IsFreeLicense: !0,
        IsEnablePremiumPlugin: !1,
        IsEnableAutoSave: !1,
        IsAutoSaveConfirm: !1,
        IsAutoSaving: !1,
        AutoSaveInterval: 60,
        AutoSavePlugin: 'autosave',
        IsSelfHost: !1,
        PremiumPlugin: 'tinydrive powerpaste casechange advcode mediaembed checklist tinymcespellchecker a11ychecker formatpainter permanentpen pageembed mentions linkchecker advtable',
        ContentStyle: '',
        Fonts: '',
        DefaultFonts: 'Andale Mono=andale mono,times; Arial=arial,helvetica,sans-serif; Arial Black=arial black,avant garde; ' +
            'Arial Unicode MS=arial unicode ms,arial unicode; ' +
            'Book Antiqua=book antiqua,palatino; Comic Sans MS=comic sans ms,sans-serif; Courier New=courier new,courier; ' +
            'Georgia=georgia,palatino; Helvetica=helvetica; Impact=impact,chicago; Pyidaungsu=pyidaungsu; Symbol=symbol; Tahoma=tahoma,arial,helvetica,sans-serif; ' +
            'Terminal=terminal,monaco; Times New Roman=times new roman,times; Segoe UI=segoe ui;Segoe UI Light=segoe ui light;Trebuchet MS=trebuchet ms,geneva; Verdana=verdana,geneva; Webdings=webdings; Wingdings=wingdings,zapf dingbats; ',
        FontSize: '',
        DefaultFontSize: '8pt 10pt 12pt 14pt 18pt 24pt 36pt',
        ShowMenu: !1,
        SkinName: '',
        IconSize: '',
        ContentCss: 'default',
        ContentCssCors: !1,
        Language: 'en',
        LanguageDirectionality: 'ltr',
        OnlineScriptUrl: '',
        TokenProvider: '',
        DropboxKey: '',
        GoogleDriveKey: '',
        GoogleDriveClientId: '',
        HtmlSchema: 'html4',
        ContentBlock: 'div',
        FullPagePlugin: 'fullpage',
        ControlAddInVersion: 'Microsoft.Dynamics.Nav.Client.TinyMCEEditor Version 1.0.0.0',
        AvaiableSkinName: "oxide, oxide-dark, tinymceeditor-black, tinymceeditor-blue, tinymceeditor-dark, tinymceeditor-dark-gray, tinymceeditor-dark-green, tinymceeditor-gray",
        WindowsClientSkin: "tinymceeditor-black",
        WebClientSkin: "tinymceeditor-blue",
        WebClientBCSkin: "tinymceeditor-dark-green",
        ResourceSubFolder: ''
    }
};