///////////////////////////////////////////////////////////////////////////
/// Developer : NAVAddin
/// EMail : NavAddIns@outlook.com
/// Date : 2020-09-09
/// License: Free
/// Remarks: no password is set on snk
///////////////////////////////////////////////////////////////////////////
using Microsoft.Dynamics.Framework.UI.Extensibility;

namespace Microsoft.Dynamics.Nav.Client.TinyMCEEditor
{
    public delegate void ControlAddInReadyEventHandler(bool IsReady);

    public delegate void DocumentReadyEventHandler(bool IsReady);

    public delegate void ApplicationEventHandler();

    public delegate void StringEventHandler(string Contents, bool IsText);

    public delegate void ContentHasChangedEventHandler(string EventName);

    [ControlAddInExport("Microsoft.Dynamics.Nav.Client.TinyMCEEditor")]
    public interface ITinyMCEEditor
    {
        [ApplicationVisible]
        void SetSkinIconAndCss(string pSkinName, string pIconSize, string pCssName, bool pCssCores);

        [ApplicationVisible]
        void SetFonts(string pFonts);

        [ApplicationVisible]
        void SetFontSize(string pFontSize);

        [ApplicationVisible]
        void SetLanguage(string pLanguage,string pDirectionality);

        [ApplicationVisible]
        void SetTokenProvider(string pTokenProvider);

        [ApplicationVisible]
        void SetDropboxAppKey(string pDropboxAppKey);

        [ApplicationVisible]
        void SetGoogleDriveKey(string pGoogledDiveKey);

        [ApplicationVisible]
        void SetGoogleDriveClientId(string pGoogleDriveClientid);

        [ApplicationVisible]
        void SetOnlineScriptUrl(string pUrl,bool pFreeLicense);

        [ApplicationVisible]
        void SetEnablePremiumPlugin();

        [ApplicationVisible]
        void SetEditable(bool pEditable);

        [ApplicationVisible]
        void SetHtmlSchema(string pSchema);

        [ApplicationVisible]
        void GetDefaultFonts();

        [ApplicationVisible]
        void GetDefaultFontSize();

        [ApplicationVisible]
        void SetDispose();

        [ApplicationVisible]
        void SetViewMode();

        [ApplicationVisible]
        void SetShowMenu();

        [ApplicationVisible]
        void GetVersion();

        [ApplicationVisible]
        void GetAvaiableSkin();

        [ApplicationVisible]
        void SetHideBrand();

        [ApplicationVisible]
        void SetHideToolbar();
        
        [ApplicationVisible]
        void SetAutoSave(int pSecond,bool pConfirm);

        [ApplicationVisible]
        void SetContentOnly();
        
        [ApplicationVisible]
        void InitContent(bool pIsText, bool pIsFixContentType);

        [ApplicationVisible]
        void SetContent(string pContent);

        [ApplicationVisible]
        void SetContentBlock(string pBlock);

        [ApplicationVisible]
        void GetContent();

        [ApplicationVisible]
        void GetContentAs(bool pIsText);

        [ApplicationVisible]
        void SetEnableContentEventOn(bool pInput,bool pKeyup,bool pChange,bool pNodeChange);

        [ApplicationVisible]
        void SetContentType(bool pIsText, bool pIsFixContentType);

        [ApplicationVisible]
        void SetContentStyle(string pStyle);

        [ApplicationVisible]
        event StringEventHandler ContentText;

        [ApplicationVisible]
        event ApplicationEventHandler ContentTypeHasChanged;

        [ApplicationVisible]
        event ContentHasChangedEventHandler ContentHasChanged;

        [ApplicationVisible]
        event ApplicationEventHandler ContentHasSaved;

        [ApplicationVisible]
        event ControlAddInReadyEventHandler ControlAddInReady;

        [ApplicationVisible]
        event DocumentReadyEventHandler DocumentReady;
    }
}