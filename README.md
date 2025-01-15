# Cloud-Based Dog Shelter Website Using Docker and Kubernetes

This document is part of a project developed for the DAT515 Cloud Computing Technologies course at the University of Stavanger. The project is represented by a webpage for a dog shelter, featuring functionalities such as listing available dogs and adding new ones.

A key aspect of this implementation is the use of Docker and Kubernetes to efficiently manage and deploy the application, enhancing its scalability, security, and workflow efficiency. 

Video recording with the website functionality demonstration can be found on [youtube](https://youtu.be/vaIMEQV5pcg).


## Prerequisites
This project uses Kubernetes and Docker as core technologies for application deployment and management. 

Before running the application, ensure that the following tools are installed on your system:

- **Docker** and **Docker Buildx** (for building Docker images)
- **Kubernetes** (including `kubectl`, `kubelet`, and `kubeadm`)

## Application Setup
1. **Build Docker Images**:
   Docker images must be created for each application component and added to the Kubernetes folder. Ensure that the image tag (version) specified during the build process matches the tag referenced in the Flask app deployment configuration.

   Navigate to the directory containing the Dockerfile for the application component. Build the Docker image with the following command:

   ```bash
   sudo docker buildx build --output type=docker --tag <app name>:<version>  .
   ```
  
1. **Save and Import Docker Images**:
   Save the Docker image as a .tar file and import it to Kubernetes:
  
   ```bash
   docker save <app_name>:<version> -o <app_name>.tar
   sudo ctr -n=k8s.io images import <app_name>.tar
   ```


## To deploy Kubernetes
Navigate to the directory `deployment` containing Kubernetes deployment files and apply all deployment and service configurations with:

```bash
cd deployment
kubectl apply -f .
```

## Access the application
After deploying Kubernetes, the application should be running and available on port **30001**

---

## Unit Tests

To run unit tests for both the React frontend and the Flask backend, follow the steps below:

### For React Frontend

Navigate to the React frontend directory and run the tests using npm:

```bash
cd react_frontend/src
npm test
```

### For Flask Backend

1. Go to the `flask_app` directory:
   ```bash
   cd flask_app
   ```

2. With your virtual environment activated, install the necessary dependencies:
   ```bash
   pip install -r requirements.txt
   ```

3. Run the unit tests:
   ```bash
   python -m unittest test_app.py
   ```

## Project Documentation

For more detailed instructions on managing and extending this project, refer to the [documentation](https://github.com/dat515-2024/KaSo/tree/main/documentation) included in this repository.

