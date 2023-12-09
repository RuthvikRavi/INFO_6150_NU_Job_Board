#!/bin/bash

#Shell Script For Installation

# Update your OS
sudo apt update

# Install nodejs
sudo apt install nodejs -y
node -v

# Install npm
sudo apt install npm -y

# Install MongoDB
sudo apt-get install gnupg curl -y
curl -fsSL https://pgp.mongodb.com/server-7.0.asc |sudo gpg  --dearmor -o /etc/apt/trusted.gpg.d/mongodb-server-7.0.gpg
echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu jammy/mongodb-org/7.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-7.0.list

sudo apt-get update
sudo apt-get install -y mongodb-org

# Start and Enable MongoDB daemon
sudo systemctl start mongod
sudo systemctl enable mongod

# Install unzip 
sudo apt-get install unzip