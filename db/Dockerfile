# Use the official MySQL image as a base
FROM mysql:latest

# Set the working directory to /app
WORKDIR /app

# Copy the current directory contents into the container at /app
ADD . /app

# everything inside this directory will be run after init
COPY ./init.sql /docker-entrypoint-initdb.d/

# Set the default user for the MySQL image

# Set environment variables for the new user
ENV MYSQL_ROOT_PASSWORD=root
ENV MYSQL_DATABASE=animals
ENV MYSQL_USER=myuser
ENV MYSQL_PASSWORD=mypassword

# Run the following commands to create the new user and grant them the necessary permissions
# Expose port 3306 to allow connections to the database
EXPOSE 3306

# Start the MySQL server when the container is run
CMD ["mysqld"]
