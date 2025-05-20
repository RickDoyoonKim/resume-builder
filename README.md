# Resume Builder Application

A modern resume builder application created with Angular (frontend) and Spring Boot (backend).

## System Requirements

- **Backend:**
  - Java 8 (JDK 1.8)
  - Maven 3.6+
  
- **Frontend:**
  - Node.js 14+
  - npm 6+
  - Angular CLI 14+

## Installation

### Backend Setup

1. Navigate to the backend directory:
   ```
   cd backend
   ```

2. Install Maven dependencies:
   ```
   mvn clean install
   ```

### Frontend Setup

1. Navigate to the frontend directory:
   ```
   cd frontend
   ```

2. Install npm dependencies:
   ```
   npm install
   ```

## Running the Application

**IMPORTANT:** The backend and frontend must be run separately in different terminal sessions.

### Start the Backend Server

1. Navigate to the backend directory:
   ```
   cd backend
   ```

2. Run the Spring Boot application:
   ```
   mvn spring-boot:run
   ```

3. The backend server will start on port 8081: http://localhost:8081

### Start the Frontend Server

1. Open a new terminal session

2. Navigate to the frontend directory:
   ```
   cd frontend
   ```

3. Run the Angular application:
   ```
   ng serve
   ```

4. The frontend application will start on port 4200: http://localhost:4200

5. Open your browser and visit: http://localhost:4200

## Testing

### Backend Tests

1. Navigate to the backend directory:
   ```
   cd backend
   ```

2. Run the tests:
   ```
   mvn test
   ```

### Frontend Tests

1. Navigate to the frontend directory:
   ```
   cd frontend
   ```

2. Run the tests:
   ```
   ng test
   ```

## Troubleshooting

- **Port Conflicts**: The backend runs on port 8081. If this port is already in use, you can change it in `backend/src/main/resources/application.properties` by modifying the `server.port` property.

- **API Connection Issues**: Make sure the backend is running before using the frontend application. The frontend is configured to connect to the backend at http://localhost:8081.

- **Java Version Conflicts**: This application requires Java 8. If you have multiple Java versions installed, ensure you're using the correct version by checking `java -version` in your terminal.

## License

This project is licensed under the MIT License - see the LICENSE file for details. 