Add-Type -AssemblyName System.Drawing

$paths = @(
    "d:\June Websites\Motorsport & Racing Team Website\assets\images\Official Team Cap.png",
    "d:\June Websites\Motorsport & Racing Team Website\assets\images\Paddock Backpack.png",
    "d:\June Websites\Motorsport & Racing Team Website\assets\images\Chronograph Watch.png"
)

foreach ($p in $paths) {
    if (Test-Path $p) {
        Write-Host "Processing $p"
        $bmp = New-Object System.Drawing.Bitmap $p
        
        # We need a slightly better removal than just pure white, 
        # but let's start with MakeTransparent for exact white.
        # Actually, let's just loop over pixels if MakeTransparent leaves a fringe.
        # Since it's C#, we can compile a quick C# class to do it fast!
        
        $bmp.MakeTransparent([System.Drawing.Color]::White)
        $tmp = $p + ".tmp.png"
        $bmp.Save($tmp, [System.Drawing.Imaging.ImageFormat]::Png)
        $bmp.Dispose()
        Move-Item -Path $tmp -Destination $p -Force
        Write-Host "Done $p"
    }
}
