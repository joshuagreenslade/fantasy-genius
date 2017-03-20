FROM       ubuntu:16.04

# Installation:
# Import MongoDB public GPG key AND create a MongoDB list file
RUN apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv EA312927
RUN echo "deb http://repo.mongodb.org/apt/ubuntu $(cat /etc/lsb-release | grep $

# Update apt-get sources AND install MongoDB
RUN apt-get update && apt-get install -y mongodb-org

# Create the MongoDB data directory
RUN mkdir -p /data/db

# Expose port #27017 from the container to the host
#EXPOSE 27017

# Set /usr/bin/mongod as the dockerized entry-point application
ENTRYPOINT ["/usr/bin/mongod"]



# base image
FROM node

#RUN apt-get update && apt-get install -y mongo

# create the application directory
RUN mkdir -p /home/nodejs/app
# copy the application
COPY ./app /home/nodejs/app
# move to working directory
WORKDIR /home/nodejs/app
# install all npm modules
RUN npm install --production
EXPOSE 3000
# run the nodejs application
CMD service mongodb-org start && node app.js
