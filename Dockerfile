FROM node:alpine
WORKDIR /usr/app/
COPY ["package.json", "package-lock.json*", "./"]
RUN npm install
COPY . .
RUN /bin/sh -l -c "ls -a"
RUN /bin/cat ".env"
CMD ["npm","start"]
