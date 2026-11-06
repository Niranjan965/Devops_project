pipeline {
    agent any

    environment {
        APP_NAME        = 'taskflow-app'
        CONTAINER_NAME  = 'taskflow-container'
        HOST_PORT       = '8080'
        CONTAINER_PORT  = '80'
        IMAGE_TAG       = "${BUILD_NUMBER}"
    }

    options {
        timeout(time: 20, unit: 'MINUTES')
        timestamps()
        disableConcurrentBuilds()
    }

    stages {
        stage('Checkout') {
            steps {
                echo 'Checking out source code from Git repository...'
                checkout scm
            }
        }

        stage('Install Dependencies') {
            steps {
                echo 'Installing project dependencies with clean install (npm ci)...'
                sh 'npm ci'
            }
        }

        stage('Lint') {
            steps {
                echo 'Running ESLint validation checks...'
                sh 'npm run lint'
            }
        }

        stage('Test') {
            steps {
                echo 'Running Vitest unit test suite...'
                sh 'npm test'
            }
        }

        stage('Build') {
            steps {
                echo 'Compiling and building production distribution bundle...'
                sh 'npm run build'
            }
        }

        stage('Docker Build') {
            steps {
                echo "Building Docker container image: ${APP_NAME}:${IMAGE_TAG} and ${APP_NAME}:latest..."
                sh "docker build -t ${APP_NAME}:${IMAGE_TAG} -t ${APP_NAME}:latest ."
            }
        }

        stage('Deploy') {
            steps {
                echo "Deploying ${APP_NAME} to local container runtime on port ${HOST_PORT}..."
                sh '''
                    # Stop and remove existing container if running
                    if [ $(docker ps -a -q -f name=^/${CONTAINER_NAME}$) ]; then
                        echo "Found existing container ${CONTAINER_NAME}. Stopping and removing..."
                        docker stop ${CONTAINER_NAME} || true
                        docker rm -f ${CONTAINER_NAME} || true
                    fi

                    # Run new container instance
                    echo "Starting fresh container ${CONTAINER_NAME} on host port ${HOST_PORT}..."
                    docker run -d \
                        --name ${CONTAINER_NAME} \
                        --restart unless-stopped \
                        -p ${HOST_PORT}:${CONTAINER_PORT} \
                        ${APP_NAME}:latest

                    # Verify container is running
                    sleep 3
                    docker ps -f name=^/${CONTAINER_NAME}$
                '''
            }
        }
    }

    post {
        success {
            echo "================================================================"
            echo "Pipeline succeeded! TaskFlow is live at http://localhost:${HOST_PORT}"
            echo "================================================================"
        }
        failure {
            echo "================================================================"
            echo "Pipeline failed! Please review the console logs above."
            echo "================================================================"
        }
        always {
            cleanWs(
                cleanWhenAborted: false,
                cleanWhenFailure: false,
                cleanWhenNotBuilt: false,
                cleanWhenSuccess: true,
                cleanWhenUnstable: false,
                deleteDirs: false
            )
        }
    }
}
