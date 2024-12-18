# Use a lightweight JDK base image
FROM eclipse-temurin:17-jdk-jammy AS build

# Set the working directory inside the container
WORKDIR /app

# Copy the Maven wrapper and pom.xml
COPY mvnw /pom.xml /app/

# Copy the Maven dependencies
COPY .mvn /app/.mvn

# Resolve dependencies and prepare for packaging
RUN ./mvnw dependency:go-offline

# Copy the application source code
COPY src /app/src

# Build the application
RUN ./mvnw package -DskipTests

# Runtime image
FROM eclipse-temurin:17-jre-jammy

# Set the working directory
WORKDIR /app

# Copy the built JAR file from the previous stage
COPY --from=build /app/target/*.jar app.jar

# Expose the port your Spring Boot app runs on (default 8080)
EXPOSE 8000

# Start the Spring Boot application
ENTRYPOINT ["java", "-jar", "app.jar"]
