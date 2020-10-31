# TinyMCEEditor-CAL

## TinyMCEEditor
In order to work with Navision (2016, 2017, 2018 and BC), TinymceEditor is using the world's #1 JavaScript library for rich text editing [TinyMCE](https://www.tiny.cloud/) 

##

![Image_1](https://github.com/navaddins/TinyMCEEditor-CAL/blob/main/Images/HtmlMode.png)

![Image_1](https://github.com/navaddins/TinyMCEEditor-CAL/blob/main/Images/TextMode.png)

## FAQ

#### Does it work with NAV 2016, 2017 and 2018 (RTC and Web Client)?

| Navision Version | RTC | Web Client |
|------------------|:---:|:----------:|
|2016              |Yes  |Yes         |
|2017              |Yes  |Yes         |
|2018              |Yes  |Yes         |

#### Where can i find for BC?

[Here](https://github.com/navaddins/TinyMCEEditor-AL) for Business Central (BC)

#### Does it work with offline and online?

Yes, you can choose either offline or online to get latest tinymce js for **Web client**. 

**RTC** is only **offline** mode.

#### Why RTC only working with offline mode?

Some of functions are do not work online js. eg, language, skin. This is a reason to set default offline js for RTC.

#### How can i change for working with online js instead of offline js?

If you want to use online js for RTC. Here, you need to change as per requirement.

```javascript
/* "TinyMCEEditorHelper.js" *
/* From */
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

/* To */
LoadOnlineScript: function () {
        if ((TinyMCEEditorHelper.GetControlAddInReady()) && (TinyMCEEditorHelper.GetOnlineScriptUrl() != '') && (!TinyMCEEditorHelper.GetScriptLoaded())) {
            var excludeJsFiles = ['TinyMCEEditor.js', 'TinyMCEEditorHelper.js', 'jquery.min.js'];
            var excludeCssiles = ['css'];
            TinyMCEEditorHelper.RemoveJsCssfile(excludeJsFiles, 'js');
            TinyMCEEditorHelper.RemoveJsCssfile(excludeCssiles, 'css');
            tinymce = undefined;
            TinyMCEEditorHelper.AddJsCssfile(TinyMCEEditorHelper.GetOnlineScriptUrl(), 'js');
            TinyMCEEditorHelper.SetScriptLoaded();
        }
    },
```

#### Which one is recommended?

I'll choose offline rather than online. No need internet connection and the loading is fast.

#### How do i know i'm using offline or online?

You call below method to check offline or online

```al
CurrPage.TinyMCEEditor.GetVersion();
```

#### How to define online?

In order to use as online, firstly, you need to register your domain and get the api key from TinyMCE. And then you can set tinymce js url as per below property.
```al
CurrPage.TinyMCEEditor.SetOnlineScriptUrl("https://cdn.tiny.cloud/1/no-api-key/tinymce/5/tinymce.min.js","Free License");
```

#### Where can i find the TinyMCE js link?

You can use below link. But you need to replace **"no-api-key"** with your api key after register from TinyMCE web site.


https://cdn.tiny.cloud/1/no-api-key/tinymce/5/tinymce.min.js


#### Why do i need to register the domain name and get api key?

If you do not register, you will get notification when you use.

#### Where do i get api key and register the domain?

You can register at tinymce web site to get [api key](https://www.tiny.cloud/auth/signup/).

#### Is it free?

Yes, it is. But, you can't use [premium plugin feature](https://www.tiny.cloud/apps/).

#### Can i use the js link from other site instead of TinyMCE?

Yes, you can use it as basic. It won't work for language or other plugin. It's better to get the link from TinyMCE.

#### Do i need to register my domain and get the api key for offline?

No.

#### In order to run with latest TinyMCE version (offline), can i build the control addin by myself?

Yes, open the powershell with Administrator and then run the "Create-Resource-Package.ps1". It will auto download the latest version of TinyMCE package from TinyMCE web site and make the **"Resource_TinyMCE_Ver_x.x.x.zip"** file is under **"TinyMCEEditor Package"** folder. **Please read the documentation from "Create-Resource-Package.ps1" before build yourself.**

#### Can i create my own skin and add to package?

Yes, you can make your own skin from [TinyMCE Skin tool](http://skin.tiny.cloud/t5/) and download the skin from TinyMCE Skin tool and save at "TinyMCEEditor CAL\TinyMCEEditor JS\skins" folder. And then rebuild the package again.

#### How can i set my own skin when i run from AL?

You can use below code to set the skin.

```al
CurrPage.TinyMCEEditor.SetSkinIconAndCss(SkinName,IconSize,CssName,CssCores)
```
#### How do i know which skins are avaiable from TinyMCEEditor?

You can use below code to get the avaiable skins.

```al
CurrPage.TinyMCEEditor.GetAvaiableSkin();
```

#### What is CssName?

It allows you to change the view, like document or writer or dark mode. Here is avaiable CSS Names

- default
- dark
- document
- writer
- your own skin name

#### Does it support localization?

Yes, it is. Visit to this [link](https://www.tiny.cloud/docs/configure/localization/) to view the supported language.

#### Do i need to download the language by myself for TinyMCEEditor?

No, TinyMCEEditor is already downloaded and added for you. But you can't find your langauge inside, you may need to add yourself and build it again.

#### How do i define the language?

You can find the language code at [here](https://www.tiny.cloud/docs/configure/localization/#language). And then you need to set the language code as per below

```al
CurrPage.TinyMCEEditor.SetLanguage('de'; 'ltr');
//or
CurrPage.TinyMCEEditor.SetLanguage('ar'; 'rtl');

```


#### Does TinyMCEEditor only support HTML?

No. you can switch between Html mode from Text mode or Text mode to Html mode when you are editing the document.

#### Can i fix Html mode only or Text mode only?

Yes.

```al
//For Html
CurrPage.TinyMCEEditor.InitContent(False, True);

//For Text
CurrPage.TinyMCEEditor.InitContent(True, True);
```

#### Can i change Html mode or Text mode OnAfterGetRec or OnAfterGetCurrRec?

Yes.

```al
//Set True or False between Html and Text
CurrPage.TinyMCEEditor.SetContentType(True/False,True/False);
```

#### Can i set View mode or Readonly mode?

Yes.

```al
CurrPage.TinyMCEEditor.SetViewMode;
```

#### Does it work with editable or view on page trigger?
Yes.
```al
CurrPage.TinyMCEEditor.SetEditable(CurrPage.EDITABLE);
```

#### How do i get the content from TinyMCEEditor to AL?

Use below method and event to get content from TinyMCEEditor to AL

```al
CurrPage.TinyMCEEditor.GetContent();

trigger ContentText(Contents: Text; IsText: Boolean)
begin
    // Do Something
    /*
    if (IsControlAddInReady AND IsDocumentReady) then begin
    end;
    */    
end;
```

#### Can we set auto save?

Yes, you can to use below property for auto save.

```al
CurrPage.TinyMCEEditor.SetAutoSave(Second,ConfirmY/N);
```

#### What is different between GetContent() and GetContentAs(pIsText: Boolean)?

You allow user to switch between Html or Text mode at editor. You need to use **GetContent()** to get current editor content.

You set Editor mode is html only but you want to get html as text. In this case, you need to use **GetContentAs(True)**

Editor mode is text only but you want to get text as html. In this case, you need to use **GetContentAs(False)**

#### Should i call SetDispose() method?

Yes, you should call **SetDispose()** method when you close the page. It will be **released memory**.

```al
CurrPage.TinyMCEEditor.SetDispose();
```

### Where is Resource file and Dll?

You can find at **"TinyMCEEditor Package"** folder.

### What is the Control AddIn Name and Public Key Token

>Addin Name : Microsoft.Dynamics.Nav.Client.TinyMCEEditor

>Public Key Token: 1bd514f27c8bf57b

>Version: 1.0.0.0

>Category: JavaScript Control Add-in

>Description: Microsoft.Dynamics.Nav.Client.TinyMCEEditor control add-in

#### Do you have a Demo?

Yes. you can find at below section.

## Folder Structure

```text
TINYMCEEDITOR CAL
├─Images
│      HtmlMode.png
│      TextMode.png
│
├─TinyMCEEditor C#
│  │  TinyMCEEditor.cs
│  │  TinyMCEEditor.csproj
│  │  TinyMCEEditor.sln
│  │
│  ├─bin
│  │  ├─Debug
│  │  │      blank.txt
│  │  │
│  │  └─Release
│  │          blank.txt
│  │
│  ├─obj
│  │  ├─Debug
│  │  │      blank.txt
│  │  │
│  │  └─Release
│  │          blank.txt
│  │
│  ├─Properties
│  │      AssemblyInfo.cs
│  │
│  ├─References
│  │      Microsoft.Dynamics.Framework.UI.Extensibility.dll
│  │      Microsoft.Dynamics.Framework.UI.Extensibility.xml
│  │
│  └─snk
│          TinyMCEEditor.snk
│
├─TinyMCEEditor FOB
│      TinyMCEEditor.fob
│      TinyMCEEditor.txt
│
├─TinyMCEEditor JS
│  │  Create-Resource-Package.ps1
│  │  manifest.xml
│  │
│  ├─image
│  │      Loader.gif
│  │
│  ├─script
│  │      jquery.min.js
│  │      TinyMCEEditor.js
│  │      TinyMCEEditorHelper.js
│  │      TinyMCEEditorStartUp.js
│  │
│  └─skins
│          tinymceeditor-black.zip
│          tinymceeditor-blue.zip
│          tinymceeditor-dark-gray.zip
│          tinymceeditor-dark-green.zip
│          tinymceeditor-dark.zip
│          tinymceeditor-gray.zip
│
└─TinyMCEEditor Package
        Microsoft.Dynamics.Nav.Client.TinyMCEEditor.dll
        ReadMe.txt
        Resource_TinyMCE_Ver_5.5.1.zip
        VersionLog.txt
```
## Avaiable Properties, Methods and Events

```al
    **Properties and Methods**

    SetSkinIconAndCss(pSkinName: Text; pIconSize: Text; pCssName: Text; pCssCores: Boolean);
    SetFonts(pFonts: Text);
    SetFontSize(pFontSize: Text);
    SetLanguage(pLanguage: Text; pDirectionality: Text);
    SetTokenProvider(pTokenProvider: Text);
    SetDropboxAppKey(pDropboxAppKey: Text);
    SetGoogleDriveKey(pGoogleDriveKey: Text);
    SetGoogleDriveClientId(pGoogleDriveClientid: Text);
    SetOnlineScriptUrl(pUrl: Text; pFreeLicense: Boolean);
    SetEditable(pEditable: Boolean);
    SetHtmlSchema(pSchema: Text);
    SetAutoSave(pSecond: Integer; pConfirm: Boolean);
    InitContent(pIsText: Boolean; pIsFixContentType: Boolean);
    SetContent(pContent: Text);
    SetContentBlock(pBlock: Text);    
    SetEnableContentEventOn(pInput: Boolean; pKeyup: Boolean; pChange: Boolean; pNodeChange: Boolean);
    SetContentType(pIsText: Boolean; pIsFixContentType: Boolean);
    SetContentStyle(pStyle: Text);
    SetHideBrand();
    SetHideToolbar();
    SetViewMode();
    SetShowMenu();
    SetContentOnly();
    SetEnablePremiumPlugin();    
    SetDispose();
    
    GetVersion();
    GetAvaiableSkin();    
    GetDefaultFonts();
    GetDefaultFontSize();    

    GetContent();
    GetContentAs(pIsText: Boolean);

    **Events**
    ContentHasSaved();
    ContentTypeHasChanged();
    ContentHasChanged(EventName: Text);
    ContentText(Contents: Text; IsText: Boolean);
    ControlAddInReady(IsReady: Boolean);
    DocumentReady(IsReady: Boolean);
```

## TinyMCE Version Log

- [Log](https://github.com/navaddins/TinyMCEEditor-CAL/blob/main/TinyMCEEditor%20Package/VersionLog.txt)

## Copyright and License Information

TinyMCEEditor is totally free and [unlicense](https://github.com/navaddins/TinyMCEEditor-CAL/blob/main/LICENSE). But you must follow the TinyMCE and JQuery license terms and condition

- Tinymce [License](https://www.tiny.cloud/docs-3x/extras/TinyMCE3x@License)

- JQuery [License](https://jquery.org/license)
