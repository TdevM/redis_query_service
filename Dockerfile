FROM node:alpine
WORKDIR /usr/app/
COPY . .
RUN npm install
RUN /bin/sh -l -c "ls -a"
RUN /bin/cat ".env"
CMD ["npm","start"]
