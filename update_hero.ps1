$map = @{
    "index.html" = "home1-hero.png"
    "home2.html" = "hopme2-hero.png"
    "about.html" = "about-hero.png"
    "services.html" = "service-hero.png"
    "drivers.html" = "driver-hero.png"
    "results.html" = "result-hero.png"
    "merchandise.html" = "Merchandise-hero.png"
    "calendar.html" = "calendar-hero.png"
    "contact.html" = "contact-hero.png"
    "sponsors.html" = "sponsor-hero.png"
}

foreach ($file in $map.Keys) {
    if (Test-Path $file) {
        $content = [System.IO.File]::ReadAllText($file)
        
        $img = $map[$file]
        
        # Remove video tag completely
        # It usually spans multiple lines:
        # <video autoplay loop muted playsinline class="hero-video">
        #   <source src="..." type="video/mp4">
        # </video>
        $content = [System.Text.RegularExpressions.Regex]::Replace($content, '(?s)<video.*?class="hero-video".*?</video>', '')
        
        # In case the video tag was different
        $content = [System.Text.RegularExpressions.Regex]::Replace($content, '(?s)<video[^>]*>[\s\S]*?</video>', '')

        # Add background image to hero-banner
        $content = [System.Text.RegularExpressions.Regex]::Replace($content, '<section class="hero-banner">', "<section class=`"hero-banner`" style=`"background-image: url('assets/images/$img'); background-size: cover; background-position: center; background-repeat: no-repeat;`">")
        
        [System.IO.File]::WriteAllText($file, $content)
    }
}

Write-Host "Hero image replacements completed"
