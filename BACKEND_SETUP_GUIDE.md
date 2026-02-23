# Spring Boot Backend Configuration Guide

## Issue: Form data not reaching database

### Common Causes:
1. **CORS not configured** - Browser blocks requests from React (localhost:5173) to Spring Boot (localhost:8080)
2. **Controller not properly mapped**
3. **Entity/DTO mismatch**
4. **Database connection issues**

---

## Solution 1: Add CORS Configuration (REQUIRED)

### Option A: Global CORS Configuration (Recommended)

Create a new file: `src/main/java/your/package/config/CorsConfig.java`

```java
package your.package.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class CorsConfig {
    
    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/**")
                        .allowedOrigins(
                            "http://localhost:5173",  // Vite default
                            "http://localhost:3000",  // React default
                            "http://127.0.0.1:5173"
                        )
                        .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
                        .allowedHeaders("*")
                        .allowCredentials(true);
            }
        };
    }
}
```

### Option B: Controller-Level CORS

Add this annotation to your controller:

```java
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = {"http://localhost:5173", "http://localhost:3000"})
public class FormController {
    
    @PostMapping("/form")
    public ResponseEntity<?> handleForm(@RequestBody FormData data) {
        // Your logic here
    }
}
```

---

## Solution 2: Verify Your Controller

Your controller should look like this:

```java
package your.package.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import your.package.model.FormData;
import your.package.repository.FormRepository;

@RestController
@CrossOrigin(origins = {"http://localhost:5173", "http://localhost:3000"})
public class FormController {
    
    @Autowired
    private FormRepository formRepository;
    
    @PostMapping("/form")
    public ResponseEntity<String> handleForm(@RequestBody FormData data) {
        try {
            System.out.println("Received data: " + data);
            FormData saved = formRepository.save(data);
            return ResponseEntity.ok("Registration successful! ID: " + saved.getId());
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body("Error: " + e.getMessage());
        }
    }
    
    @GetMapping("/form/test")
    public ResponseEntity<String> test() {
        return ResponseEntity.ok("Server is running!");
    }
}
```

---

## Solution 3: Verify Your Entity

Make sure your entity matches the JSON payload:

```java
package your.package.model;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "registrations")
@Data
public class FormData {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    // Personal Info
    private String fullName;
    private String category;
    private String gender;
    private String dob;
    
    // Academic Info
    private String college;
    private String university;
    private String department;
    private String year;
    private String rollNo;
    
    // Contact Info
    private String phone;
    private String whatsapp;
    private String email;
    private String city;
    private String district;
    
    // Preferences
    private String participationType;
    private String tshirtSize;
    private String foodPreference;
    
    // Emergency
    private String emergencyName;
    private String emergencyPhone;
    
    // Additional
    private String reason;
    private String source;
    private Boolean terms;
}
```

---

## Solution 4: Check application.properties

```properties
# Server Port
server.port=8080

# Database Configuration (H2 for testing)
spring.datasource.url=jdbc:h2:mem:testdb
spring.datasource.driverClassName=org.h2.Driver
spring.datasource.username=sa
spring.datasource.password=

# JPA Configuration
spring.jpa.database-platform=org.hibernate.dialect.H2Dialect
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true

# H2 Console (for debugging)
spring.h2.console.enabled=true
spring.h2.console.path=/h2-console

# OR for MySQL:
# spring.datasource.url=jdbc:mysql://localhost:3306/your_database
# spring.datasource.username=root
# spring.datasource.password=yourpassword
# spring.jpa.hibernate.ddl-auto=update
# spring.jpa.show-sql=true
```

---

## Debugging Steps:

### 1. Check if Spring Boot is running
- Open browser: http://localhost:8080
- You should see Whitelabel Error Page (this is normal)

### 2. Test with the HTML file
- Open: `test-backend.html` in your browser
- Click "Check Server Status"
- Click "Test Form Submission"

### 3. Check Spring Boot Console
Look for logs like:
```
Received data: FormData(fullName=Test User, email=test@example.com, ...)
Hibernate: insert into registrations (full_name, email, ...) values (?, ?, ...)
```

### 4. Check Browser Console (F12)
Look for:
- ✅ `=== FORM SUBMISSION STARTED ===`
- ✅ `Response Status: 200`
- ❌ CORS errors
- ❌ Network errors

---

## Common Error Messages:

### "Failed to fetch" or "Network Error"
- **Cause**: Spring Boot not running or CORS issue
- **Fix**: Start Spring Boot and add CORS configuration

### "405 Method Not Allowed"
- **Cause**: POST endpoint not configured
- **Fix**: Add `@PostMapping("/form")` to controller

### "400 Bad Request"
- **Cause**: JSON structure doesn't match entity
- **Fix**: Check entity field names match JSON keys

### "500 Internal Server Error"
- **Cause**: Database error or null pointer
- **Fix**: Check Spring Boot console logs

---

## Quick Test Commands:

### Test with curl:
```bash
curl -X POST http://localhost:8080/form \
  -H "Content-Type: application/json" \
  -d '{
    "fullName": "Test User",
    "college": "Test College",
    "email": "test@example.com",
    "phone": "9876543210",
    "category": "Student",
    "gender": "Male",
    "dob": "2003-05-14",
    "university": "Test University",
    "department": "CS",
    "year": "3rd Year",
    "rollNo": "TEST123",
    "whatsapp": "9876543210",
    "city": "Test City",
    "district": "Test District",
    "participationType": "Solo",
    "tshirtSize": "L",
    "foodPreference": "Veg",
    "emergencyName": "Emergency",
    "emergencyPhone": "9999999999",
    "reason": "Testing",
    "source": "Website",
    "terms": true
  }'
```

### Test with PowerShell:
```powershell
Invoke-WebRequest -Uri "http://localhost:8080/form" -Method POST -ContentType "application/json" -Body '{
  "fullName": "Test User",
  "college": "Test College",
  "email": "test@example.com",
  "phone": "9876543210",
  "category": "Student",
  "gender": "Male",
  "dob": "2003-05-14",
  "university": "Test University",
  "department": "CS",
  "year": "3rd Year",
  "rollNo": "TEST123",
  "whatsapp": "9876543210",
  "city": "Test City",
  "district": "Test District",
  "participationType": "Solo",
  "tshirtSize": "L",
  "foodPreference": "Veg",
  "emergencyName": "Emergency",
  "emergencyPhone": "9999999999",
  "reason": "Testing",
  "source": "Website",
  "terms": true
}'
```

---

## Next Steps:

1. ✅ Add CORS configuration to Spring Boot
2. ✅ Restart Spring Boot application
3. ✅ Open `test-backend.html` and test
4. ✅ Check browser console (F12) in React app
5. ✅ Check Spring Boot console for logs
6. ✅ Try submitting the form again

If you still have issues, share:
- Spring Boot console logs
- Browser console errors (F12)
- Your FormController.java code
- Your Entity/Model code
