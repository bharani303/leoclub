$body = @{
    fullName = "Test User"
    college = "Test College"
    email = "test@example.com"
    phone = "9876543210"
    category = "Student"
    gender = "Male"
    dob = "2003-05-14"
    university = "Test University"
    department = "Computer Science"
    year = "3rd Year"
    rollNo = "TEST123"
    whatsapp = "9876543210"
    city = "Test City"
    district = "Test District"
    participationType = "Solo"
    tshirtSize = "L"
    foodPreference = "Veg"
    emergencyName = "Emergency Contact"
    emergencyPhone = "9999999999"
    reason = "Testing from PowerShell"
    source = "Website"
    terms = $true
}

$json = $body | ConvertTo-Json

Write-Host "Testing POST to http://localhost:8080/form" -ForegroundColor Cyan
Write-Host ""
Write-Host "Payload:" -ForegroundColor Yellow
Write-Host $json
Write-Host ""

try {
    $response = Invoke-RestMethod -Uri "http://localhost:8080/form" -Method Post -Body $json -ContentType "application/json" -Verbose
    Write-Host "SUCCESS!" -ForegroundColor Green
    Write-Host "Response:" -ForegroundColor Green
    Write-Host $response
} catch {
    Write-Host "ERROR!" -ForegroundColor Red
    Write-Host "Status Code: $($_.Exception.Response.StatusCode.value__)" -ForegroundColor Red
    Write-Host "Error Message: $($_.Exception.Message)" -ForegroundColor Red
    
    # Try to get response body
    $reader = New-Object System.IO.StreamReader($_.Exception.Response.GetResponseStream())
    $responseBody = $reader.ReadToEnd()
    Write-Host "Response Body: $responseBody" -ForegroundColor Red
}
