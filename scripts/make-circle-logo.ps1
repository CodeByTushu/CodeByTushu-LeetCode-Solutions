Add-Type -AssemblyName System.Drawing

$srcPath = "E:\CodeByTushu-LeetCode-Solutions\Black Logo.PNG"
$src = [System.Drawing.Image]::FromFile($srcPath)
$size = [Math]::Min($src.Width, $src.Height)

$dest = New-Object System.Drawing.Bitmap($size, $size, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
$g = [System.Drawing.Graphics]::FromImage($dest)
$g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
$g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
$g.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality

$g.Clear([System.Drawing.Color]::Transparent)
$path = New-Object System.Drawing.Drawing2D.GraphicsPath
$path.AddEllipse(0, 0, $size, $size)
$g.SetClip($path)
$g.DrawImage($src, 0, 0, $size, $size)

$g.Dispose()
$src.Dispose()

# Save to assets/logo.png, assets/logo-dark.png, assets/black-logo.png
$dest.Save("E:\CodeByTushu-LeetCode-Solutions\assets\logo.png", [System.Drawing.Imaging.ImageFormat]::Png)
$dest.Save("E:\CodeByTushu-LeetCode-Solutions\assets\logo-dark.png", [System.Drawing.Imaging.ImageFormat]::Png)
$dest.Save("E:\CodeByTushu-LeetCode-Solutions\assets\black-logo.png", [System.Drawing.Imaging.ImageFormat]::Png)

$dest.Dispose()

Write-Host "Circle logo generated successfully into assets!"
