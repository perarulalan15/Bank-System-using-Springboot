# SecureBank - Full-Stack Banking Application

A modern, secure banking application built with Spring Boot and React.js, demonstrating full-stack development capabilities with enterprise-grade security features.

![Spring Boot](https://img.shields.io/badge/Spring%20Boot-2.7+-brightgreen)
![React](https://img.shields.io/badge/React-18+-blue)
![Java](https://img.shields.io/badge/Java-11+-orange)

## Demo

<img width="1919" height="918" alt="Image" src="https://github.com/user-attachments/assets/87645e5e-5fa2-488f-877b-0c8b100755fa" />
<img width="1919" height="911" alt="Image" src="https://github.com/user-attachments/assets/1b164b66-6663-4e7e-9aca-404233883dda" />

## 🏗️ Architecture

This application follows a modern full-stack architecture:

- **Backend**: Spring Boot REST API with JPA/Hibernate
- **Frontend**: React.js with modern hooks and responsive design
- **Database**: Postgresql (production)
- **Security**: Session-based authentication with CORS support

## ✨ Features

### 🔐 Authentication & Security
- Secure user registration and login
- Session-based authentication
- Password protection
- CORS configuration for cross-origin requests

### 💰 Banking Operations
- Real-time account balance tracking
- Deposit and withdrawal transactions
- Transaction history with detailed records
- Automatic account number generation

### 📱 Modern UI/UX
- Responsive design for all devices
- Modern glassmorphism design elements
- Real-time balance updates
- Intuitive dashboard interface
- Loading states and error handling

### 🛠️ Technical Features
- RESTful API architecture
- JPA/Hibernate for database operations
- React hooks for state management
- Form validation and error handling
- Session persistence across browser refreshes

## 🚀 Getting Started

### Prerequisites
- Java 11 or higher
- Node.js 16 or higher
- npm or yarn package manager
- PostgreSQL

### Backend Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/perarulalan15/Bank-System-using-Springboot
   cd securebank
   ```

2. **Navigate to backend directory**
   ```bash
   cd backend
   ```

3. **Configure database (optional)**
   ```properties
   # application.properties
   spring.datasource.url=jdbc:h2:mem:testdb
   spring.datasource.driver-class-name=org.h2.Driver
   spring.jpa.hibernate.ddl-auto=create-drop
   ```

4. **Run the Spring Boot application**
   ```bash
   ./mvnw spring-boot:run
   ```
   
   The backend server will start on `http://localhost:8081`

### Frontend Setup

1. **Navigate to frontend directory**
   ```bash
   cd frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the React development server**
   ```bash
   npm start
   ```
   
   The frontend will start on `http://localhost:3000`

## 📁 Project Structure

```
securebank/
├── backend/
│   ├── src/main/java/com/example/bank/system/
│   │   ├── controller/
│   │   │   └── UserController.java
│   │   ├── service/
│   │   │   └── UserService.java
│   │   ├── model/
│   │   │   ├── User.java
│   │   │   └── Transaction.java
│   │   └── repository/
│   │       ├── UserRepo.java
│   │       └── TransactionRepo.java
│   └── src/main/resources/
│       └── application.properties
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   └── BankingApp.js
│   │   ├── styles/
│   │   └── utils/
│   └── public/
└── README.md
```

## 🔌 API Endpoints

### Authentication
- `POST /api/signup` - Register new user
- `POST /api/login` - User login
- `POST /api/logout` - User logout
- `GET /api/user-info` - Get current user information

### Banking Operations
- `POST /api/deposit` - Make a deposit
- `POST /api/withdraw` - Make a withdrawal
- `GET /api/history` - Get transaction history

## 🛡️ Security Features

- **Session Management**: Secure session-based authentication
- **CORS Configuration**: Properly configured for cross-origin requests
- **Input Validation**: Server-side validation for all inputs
- **Error Handling**: Comprehensive error handling and user feedback

## 🎨 Frontend Features

- **Modern Design**: Glassmorphism UI with gradient backgrounds
- **Responsive Layout**: Works on desktop, tablet, and mobile devices
- **Real-time Updates**: Automatic balance updates after transactions
- **Loading States**: Visual feedback during API calls
- **Form Validation**: Client-side validation with error messages

## 🧪 Testing

### Manual Testing
1. Start both backend and frontend servers
2. Register a new account
3. Login with created credentials
4. Test deposit and withdrawal operations
5. View transaction history

### Test Scenarios
- User registration with duplicate username
- Login with invalid credentials
- Deposit with invalid amounts
- Withdrawal exceeding balance
- Session persistence across page refreshes

## 🚀 Deployment

### Backend Deployment
```bash
./mvnw clean package
java -jar target/bank-system-0.0.1-SNAPSHOT.jar
```

### Frontend Deployment
```bash
npm run build
# Deploy the build folder to your preferred hosting service
```

## 🛠️ Technologies Used

### Backend
- **Spring Boot** - Application framework
- **Spring Data JPA** - Data persistence
- **Spring Web** - REST API development
- **Spring Session** - Session management

### Frontend
- **React.js** - Frontend framework
- **Tailwind CSS** - Utility-first CSS framework
- **Lucide React** - Modern icon library
- **Fetch API** - HTTP client for API calls

## 📈 Future Enhancements

- [ ] JWT-based authentication
- [ ] Money transfer between accounts
- [ ] Transaction categories and filtering
- [ ] Account statements and reporting
- [ ] Email notifications
- [ ] Two-factor authentication
- [ ] Admin panel for user management
- [ ] Mobile app development

## 🤝 Contributing

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📧 Contact

Your Name - [perarulalan0115@gmail.com](mailto:perarulalan0115@gmail.com)

Project Link: https://github.com/perarulalan15/Bank-System-using-Springboot

---

**Note**: This is a demonstration project for portfolio purposes. For production use, additional security measures, proper database configuration, and comprehensive testing would be required.
