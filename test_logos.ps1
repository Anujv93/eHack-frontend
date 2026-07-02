$urls = @(
    'https://raw.githubusercontent.com/gilbarbara/logos/main/logos/google.svg',
    'https://raw.githubusercontent.com/gilbarbara/logos/main/logos/microsoft.svg',
    'https://raw.githubusercontent.com/gilbarbara/logos/main/logos/amazon.svg',
    'https://raw.githubusercontent.com/gilbarbara/logos/main/logos/meta.svg',
    'https://raw.githubusercontent.com/gilbarbara/logos/main/logos/ibm.svg',
    'https://raw.githubusercontent.com/gilbarbara/logos/main/logos/accenture.svg',
    'https://raw.githubusercontent.com/gilbarbara/logos/main/logos/cisco.svg',
    'https://raw.githubusercontent.com/gilbarbara/logos/main/logos/sap.svg',
    'https://raw.githubusercontent.com/gilbarbara/logos/main/logos/oracle.svg',
    'https://raw.githubusercontent.com/gilbarbara/logos/main/logos/salesforce.svg'
)

foreach($url in $urls) {
    try {
        $r = Invoke-WebRequest -Uri $url -UseBasicParsing -TimeoutSec 5
        Write-Host "OK - $url"
    } catch {
        Write-Host "FAIL - $url - $($_.Exception.Message)"
    }
}
