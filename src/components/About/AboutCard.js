import React from "react";
import Card from "react-bootstrap/Card";
import { ImPointRight } from "react-icons/im";

function AboutCard() {
  return (
    <Card className="quote-card-view">
      <Card.Body>
        <blockquote className="blockquote mb-0">
          <p style={{ textAlign: "justify" }}>
            Hello Guys , I am <span className="purple">Tushar Rathod aka Calto... </span>
            from <span className="purple"> Sangli, India.</span>
            <br /> I am a Third Year student pursuing B.Tech.
            in Computer Science And Engineering.
            <br />
            I am a dynamic technologist with a passion for crafting innovative solutions. Proficient in Python, Java, and C/C++, I navigate databases like MySQL, MongoDB, and Postgres with ease. My toolkit includes DevOps expertise in Git, Docker, Kubernetes, Google Cloud, Grafana, and Prometheus. I safeguard systems using Ghidra, Nmap, Wireshark, and Burpsuite, while optimizing performance with tools like Apache Kafka, Zipkin, Maven, Gradle, and resilience4j. My academic journey has fortified me in data structures, algorithms, computer networks, database engineering, operating systems, and artificial intelligence, empowering me to excel in diverse tech landscapes.
            <br />
            <br />
            Some of my hobbies are 
          </p>
          <ul>
            <li className="about-activity">
              <ImPointRight /> Playing PC Games
            </li>
            <li className="about-activity">
              <ImPointRight /> Cricket
            </li>
            <li className="about-activity">
              <ImPointRight /> Travelling
            </li>
          </ul>
          
        </blockquote>
      </Card.Body>
    </Card>
  );
}

export default AboutCard;
