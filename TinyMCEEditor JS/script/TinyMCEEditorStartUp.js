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

var IsRunOnBC = !1; // Set value to !1 for (NAV 2016~2018) otherwise !0 (BC)
var TinyMCEEditorStartUp = {
    Initialize: function (pRunOnBC) {
        TinyMCEEditorHelper.Initialize(pRunOnBC);
    }
}
if (typeof TinyMCEEditorStartUp != 'undefined')
    TinyMCEEditorStartUp.Initialize(IsRunOnBC);