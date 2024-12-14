# e-kan

e-kan is an e-commerce platform for purchasing fish for aquaculture (not for consumption). Buyers can procure fish directly from BPTPB (Balai Pengembangan Teknologi Perikanan Budidaya).

## Project Structure

This project consists of:

- **Backend**: Spring Boot
- **Frontend**: Next.js
- **Database**: MySQL

## Features

- User registration and authentication
- Browse fish available for aquaculture
- Purchase fish directly from BPTPB
- Manage orders and transactions
- Payment integration with Midtrans Core API
- Realtime chat with Seller

## Prerequisites

- Java 17 or later
- Node.js 16 or later
- MySQL database server
- Maven

## Installation

### Backend (Spring Boot)
1. Clone the repository:
   ```bash
   git clone https://github.com/kevinjuliow/e-kan.git
   cd e-kan/backend
   ```

2. Configure the `application.properties` file:
   ```properties
   spring.datasource.url=jdbc:mysql://localhost:3306/e_kan
   spring.datasource.username=your_mysql_username
   spring.datasource.password=your_mysql_password
   spring.jpa.hibernate.ddl-auto=update

   server.port=8000
   ```

3. Build and run the application:
   ```bash
   mvn spring-boot:run
   ```

   The backend will be available at `http://localhost:8000/api`.

### Frontend (Next.js)
1. Navigate to the frontend directory:
   ```bash
   cd e-kan/frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure the environment variables:
   Create a `.env.local` file and add:
   ```env
   NEXT_DEV_API_URL=http://localhost:8000/api
   ```

4. Run the development server:
   ```bash
   npm run dev
   ```

   The frontend will be available at `http://localhost:3000`.
    
## Database Setup

1. Create a database named `e_kan` in your MySQL server:
   ```sql
   CREATE DATABASE ekan;
   ```

2. Ensure the credentials match those in the `application.properties` file.

## API Endpoints

- **Base URL**: `http://localhost:8000/api`

### Authentication
- `POST /auth/pembeli/signup`: User registration
- `POST /auth/pembeli/login`: User login


