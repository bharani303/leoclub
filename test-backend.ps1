# Test Spring Boot Backend API
# Run this script to test if your backend is working

Write-Host "================================" -ForegroundColor Cyan
Write-Host "Spring Boot Backend Test" -ForegroundColor Cyan
Write-Host "================================" -ForegroundColor Cyan
Write-Host ""

# Test 1: Check if server is running
Write-Host "Test 1: Checking if server is running..." -ForegroundColor Yellow
try {
    $response = Invoke-WebRequest -Uri "http://localhost:8080" -Method GET -TimeoutSec 5 -ErrorAction Stop
    Write-Host "✅ Server is ONLINE!" -ForegroundColor Green
} catch {
    Write-Host "❌ Server is OFFLINE or not responding" -ForegroundColor Red
    Write-Host "Error: $($_.Exception.Message)" -ForegroundColor Red
    Write-Host ""
    Write-Host "Please make sure:" -ForegroundColor Yellow
    Write-Host "1. Spring Boot application is running" -ForegroundColor Yellow
    Write-Host "2. Server is running on port 8080" -ForegroundColor Yellow
    exit
}

Write-Host ""

# Test 2: Send test data to /form endpoint
Write-Host "Test 2: Sending test registration data..." -ForegroundColor Yellow

$testData = @{
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
} | ConvertTo-Json

Write-Host ""
Write-Host "Payload:" -ForegroundColor Cyan
Write-Host $testData -ForegroundColor Gray
Write-Host ""

try {
    $response = Invoke-WebRequest -Uri "http://localhost:8080/form" `
        -Method POST `
        -ContentType "application/json" `
        -Body $testData `
        -TimeoutSec 10 `
        -ErrorAction Stop
    
    Write-Host "✅ SUCCESS! Data sent to backend" -ForegroundColor Green
    Write-Host "Status Code: $($response.StatusCode)" -ForegroundColor Green
    Write-Host "Response: $($response.Content)" -ForegroundColor Green
    Write-Host ""
    Write-Host "✅ Your backend is working correctly!" -ForegroundColor Green
    Write-Host "You can now use the React form to submit data." -ForegroundColor Green
    
} catch {
    $statusCode = $_.Exception.Response.StatusCode.value__
    Write-Host "❌ FAILED to send data" -ForegroundColor Red
    Write-Host "Status Code: $statusCode" -ForegroundColor Red
    Write-Host "Error: $($_.Exception.Message)" -ForegroundColor Red
    Write-Host ""
    
    if ($statusCode -eq 404) {
        Write-Host "Issue: Endpoint not found" -ForegroundColor Yellow
        Write-Host "Fix: Make sure your controller has @PostMapping('/form')" -ForegroundColor Yellow
    }
    elseif ($statusCode -eq 405) {
        Write-Host "Issue: Method not allowed" -ForegroundColor Yellow
        Write-Host "Fix: Make sure POST method is enabled for /form endpoint" -ForegroundColor Yellow
    }
    elseif ($statusCode -eq 400) {
        Write-Host "Issue: Bad request - data format mismatch" -ForegroundColor Yellow
        Write-Host "Fix: Check if your Entity fields match the JSON payload" -ForegroundColor Yellow
    }
    elseif ($statusCode -eq 500) {
        Write-Host "Issue: Internal server error" -ForegroundColor Yellow
        Write-Host "Fix: Check Spring Boot console logs for details" -ForegroundColor Yellow
    }
    else {
        Write-Host "Issue: Unknown error" -ForegroundColor Yellow
        Write-Host "Fix: Check Spring Boot console logs" -ForegroundColor Yellow
    }
    
    Write-Host ""
    Write-Host "Common fixes:" -ForegroundColor Cyan
    Write-Host "1. Add CORS configuration (see BACKEND_SETUP_GUIDE.md)" -ForegroundColor White
    Write-Host "2. Check your FormController.java" -ForegroundColor White
    Write-Host "3. Verify Entity/Model fields" -ForegroundColor White
    Write-Host "4. Check application.properties database config" -ForegroundColor White
}

Write-Host ""
Write-Host "================================" -ForegroundColor Cyan
Write-Host "Test Complete" -ForegroundColor Cyan
Write-Host "================================" -ForegroundColor Cyan
