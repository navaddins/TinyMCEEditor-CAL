# Copyright ©  2020                                                                                      #
# Developer : NavAddIn                                                                                   #
# EMail : navaddins@outlook.com                                                                          #
# Date : 2020-09-09                                                                                      #
# Download the file from TinyMCE and Create the Resource file                                            #
# Remarks                                                                                                #
#   You need to set version no. at $TinyMCEVer before start run the powershell with admin mode           #
#   Of course you can set $false to $DownLoadAndPackage to avoid auto download. But your downloaded      #
#   file name must be tinymce_version.zip and tinymce_languages.zip                                      #
#   You can check the latest version no. at https://www.tiny.cloud/get-tiny/self-hosted/                 #
#   You can check the langauge at https://www.tiny.cloud/get-tiny/language-packages/. You can add        #
#   additional language to $AvaiableLangs if this is out of date                                         #

Clear-Host
function CreateZipFile {
    param([string]$ZipFileName)    
    try {
        
        if (Test-Path($ZipFileName)) {
            Get-Item $ZipFileName | Remove-Item -Force
        }
        
        Set-Content $ZipFileName ('PK' + [char]5 + [char]6 + ("$([char]0)" * 18))
        (Get-Item $ZipFileName).IsReadOnly = $false    
    
        $shellApplication = New-Object -com shell.application
        $zipPackage = $shellApplication.NameSpace($ZipFileName)
    
        foreach ($file in $input) { 
            $zipPackage.CopyHere($file.FullName)
            Write-Host "$($file.FullName) is added to zip" -ForegroundColor Green
            Start-sleep -Seconds 10
        }    
    }
    Catch {
        $ErrorMessage = $_.Exception.Message
        Write-Host $ErrorMessage -ForegroundColor Red
    }
}

$PSScriptRt = $PSScriptRoot
if ($PSScriptRt.Length -eq 0) {
    $PSScriptRt = (Get-Item -Path .\).FullName
}

$TinyMCEEditorJSPath = $PSScriptRt

$TinyMCEVer = ""
$DownLoadAndPackage = $true;

$TinyMCEJsZip = "tinymce_" + $TinyMCEVer + ".zip"
$TinyMCELangsZip = "tinymce_languages.zip"
$TinyMCESKinsZip = ""

$TinyMCEJsUrl = "https://download.tiny.cloud/tinymce/community/tinymce_" + $TinyMCEVer + ".zip"
$TinyMCELangsUrl = "https://www.tiny.cloud/tinymce-services-azure/1/i18n/download/?langs="

$TinyMCEJsZipPath = (Join-Path -Path $TinyMCEEditorJSPath -ChildPath $TinyMCEJsZip)
$TinyMCELangsZipPath = (Join-Path -Path $TinyMCEEditorJSPath -ChildPath $TinyMCELangsZip)
$TinyMCESKinsZipPath = (Join-Path -Path $TinyMCEEditorJSPath -ChildPath "skins")
$TinyMCEUnZipPath = (Join-Path $TinyMCEEditorJSPath -ChildPath "tinymce_unzip")
$TinyMCESource = (Join-Path $TinyMCEUnZipPath -ChildPath "tinymce\js\tinymce")
$TinyMCECopyFrom = (Join-Path $TinyMCEUnZipPath -ChildPath "tinymce\js\*")
$TinyMCECopyTo = (Join-Path $TinyMCEEditorJSPath -ChildPath "tinymce")
$TinyMCESkinToolJson = (Join-Path -Path $TinyMCESource -ChildPath "skintool.json")

try {
    if ($TinyMCEVer -eq '') {
        Write-Host "TinyMCE Version cannot be blank" -ForegroundColor Red
        return
    }

    $AvaiableLangs = @("ar",
        "hy",
        "eu",
        "bn_BD",
        "bg_BG",
        "ca",
        "zh_CN",
        "zh_TW",
        "hr",
        "cs",
        "da",
        "nl",
        "eo",
        "et",
        "fi",
        "fr_FR",
        "gl",
        "de",
        "el",
        "he_IL",
        "hu_HU",
        "id",
        "it",
        "it_IT",
        "ja",
        "kab",
        "kk",
        "ko_KR",
        "ku",
        "lt",
        "nb_NO",
        "fa",
        "fa_IR",
        "pl",
        "pt_BR",
        "pt_PT",
        "ro",
        "ro_RO",
        "ru",
        "ru_RU",
        "sk",
        "sl",
        "sl_SI",
        "es",
        "es_MX",
        "es_ES",
        "sv_SE",
        "ta",
        "ta_IN",
        "th_TH",
        "tr",
        "tr_TR",
        "uk",
        "vi",
        "cy")

    $LangsQuery = ''
    foreach ($Lang in $AvaiableLangs) {
        $LangsQuery += $Lang + ","
    }

    $TinyMCELangsUrl += $LangsQuery.TrimEnd(",")
    
    if ($DownLoadAndPackage) {
        Invoke-WebRequest $TinyMCEJsUrl -OutFile $TinyMCEJsZipPath -ErrorAction Stop
        Invoke-WebRequest $TinyMCELangsUrl -OutFile $TinyMCELangsZipPath -ErrorAction Stop
    }
    
    Expand-Archive -LiteralPath $TinyMCEJsZipPath -DestinationPath $TinyMCEUnZipPath -Force
    Expand-Archive -LiteralPath $TinyMCELangsZipPath -DestinationPath $TinyMCESource -Force

    $TinyMCESKinsZips = Get-ChildItem ($TinyMCESKinsZipPath) -Filter "*.zip"
    foreach ($TinyMCESKinsZip in $TinyMCESKinsZips) {
        Expand-Archive -LiteralPath $TinyMCESKinsZip.FullName -DestinationPath $TinyMCESource -Force
    }

    Remove-Item -Path $TinyMCESkinToolJson -Force -ErrorAction SilentlyContinue
    Remove-Item -Path $TinyMCECopyTo -Recurse -Force -ErrorAction SilentlyContinue

    Copy-Item -Path $TinyMCECopyFrom -Destination $TinyMCECopyTo -Recurse -Force

    Remove-Item -Path $TinyMCEJsZipPath -Force -ErrorAction SilentlyContinue
    Remove-Item -Path $TinyMCELangsZipPath -ErrorAction SilentlyContinue
    Remove-Item -Path $TinyMCEUnZipPath -Recurse -Force -ErrorAction SilentlyContinue

    $TinyMCEEditorJSPath = $TinyMCEEditorJSPath.TrimEnd('\') + '\'
    $FullNames = Get-ChildItem $TinyMCEEditorJSPath -Recurse -File -Exclude @('*.zip', '*.xml', '*.ps1', '*.al', '*.json') | Select-Object -ExpandProperty FullName

    $TinyMCEEditorPackage = Join-Path -Path $PSScriptRt.Substring(0, $PSScriptRt.TrimEnd('\').LastIndexOf('\')) -ChildPath "TinyMCEEditor Package"
    New-Item -Path $TinyMCEEditorPackage -ItemType "Directory" -Force -ErrorAction SilentlyContinue

    $CompressedFile = (Join-Path $TinyMCEEditorPackage -ChildPath "Resource_TinyMCE_Ver_$TinyMCEVer.zip")

    $XmlFile = Get-ChildItem (Join-Path -Path $TinyMCEEditorJSPath -ChildPath "manifest.xml")
    [Xml]$Xmlmanifest = Get-Content $XmlFile.FullName
    Write-Host "Reading xml from $($XmlFile.FullName)"

    $NodeResource = $Xmlmanifest.SelectNodes('/Manifest/Resources')
    $NodeResource.RemoveAll()
    Write-Host "Remove all nodes from Resources"

    Write-Host "Adding node to Resources"
    foreach ($FullName in $FullNames) {
        $FileInfo = New-Object System.IO.FileInfo($FullName)
        $FileName = $FileInfo.Name
        $FilePath = $FullName.Substring($TinyMCEEditorJSPath.Length) -replace "\\", "/"
    
        $NodeName = ''
        $NodeInnerText = ''
        Switch ($FileInfo.Extension.ToLower()) {       
            { ($_ -eq ".js") -or ($_ -eq '.ts') -or ($_ -eq '.md') -or ($_ -eq '.txt') } {
                $NodeName = 'Script'
                $NodeInnerText = $FilePath
                Write-Host "<$NodeName>$FilePath</$NodeName>"
                break;
            }
            ".css" { 
                $NodeName = 'StyleSheet'
                $NodeInnerText = $FilePath
                Write-Host "<$NodeName>$FilePath</$NodeName>"
                break; 
            }
            ".woff" { 
                $NodeName = 'StyleSheet'
                $NodeInnerText = $FilePath
                Write-Host "<$NodeName>$FilePath</$NodeName>" 
            }       
            ".gif" {
                if ($FileInfo.Name -eq 'Loader.gif') { 
                    $NodeName = 'Image'
                    $NodeInnerText = $FilePath
                    Write-Host "<$NodeName>$FileName</$NodeName>" 
                }
                else {
                    $NodeName = 'StyleSheet'
                    $NodeInnerText = $FilePath
                    Write-Host "<$NodeName>$FilePath</$NodeName>"
                }
                break;
            }
            default: {
                break;
            }
        }
        if ($NodeName -ne '') {
            $NodeResources = $Xmlmanifest.CreateNode("element", $NodeName, "");
            $NodeResources.InnerText = $NodeInnerText
            $NodeResource.AppendChild($NodeResources)  | Out-Null
        }
    }
    $Xmlmanifest.save($XmlFile)    
    Write-Host ""
    Write-Host "Total $($FullNames.Count) Files are added to $XmlFile" -ForegroundColor Green
    Write-Host ""

    Write-Host "Creating zip file"
    $ResourceFiles = Get-ChildItem $TinyMCEEditorJSPath -Exclude @('*.zip', '*.ps1', '*.al', '*.json', 'skins')
    $ResourceFiles | CreateZipFile -ZipFileName $CompressedFile

    Write-Host ""
    Write-Host "Package is created as $CompressedFile" -ForegroundColor Yellow
    Write-Host ""
    Invoke-Item $TinyMCEEditorPackage
}
catch { 
    $ErrorMessage = $_.Exception.Message
    Write-Host $ErrorMessage -ForegroundColor Red  
}
finally {
    Remove-Item -Path $TinyMCESkinToolJson -Force -ErrorAction SilentlyContinue
    Remove-Item -Path $TinyMCECopyTo -Recurse -Force -ErrorAction SilentlyContinue 
    Remove-Item -Path $TinyMCEJsZipPath -Force -ErrorAction SilentlyContinue
    Remove-Item -Path $TinyMCELangsZipPath -ErrorAction SilentlyContinue
    Remove-Item -Path $TinyMCEUnZipPath -Recurse -Force -ErrorAction SilentlyContin
}
