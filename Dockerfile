FROM openjdk:8-jdk-alpine

LABEL maintainer="artsiom.matsveyeu@itechart-group.com"

VOLUME /tmp

EXPOSE 8080

ARG JAR_FILE=studentquiz-server/target/StudentQuiz-0.0.1-SNAPSHOT.jar

ADD ${JAR_FILE} StudentQuiz.jar

ENTRYPOINT ["java","-Djava.security.egd=file:/dev/./urandom","-jar","/StudentQuiz.jar"]
