const { Kafka } = require("kafkajs");
const clientId = "product-service";
const brokers = [process.env.KAFKA_CONNECT];

const kafka = new Kafka({ clientId, brokers })
const producer = kafka.producer();

module.exports = producer;
