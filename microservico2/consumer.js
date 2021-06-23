const { Kafka } = require("kafkajs");
const axios = require('axios');
const clientId = "product-service";
const brokers = [process.env.KAFKA_CONNECT];
const kafka = new Kafka({ clientId, brokers })
const consumer = kafka.consumer({ groupId: clientId })

const consume = async () => {
	await consumer.connect()
	await consumer.subscribe({ topic: 'createProduct' })
	await consumer.subscribe({ topic: 'updateProduct' })
	await consumer.subscribe({ topic: 'deleteProduct' })
	await consumer.run({
		eachMessage: ({topic, message}) => {
			console.log(topic, message.value.toString());
			(async () => {
				try {
					await axios({
						url: process.env.SLACK_URL,
						method: "POST",
						data: {
							channel: "lab-consumidor",
							text: JSON.stringify({
								topic: topic,
								message: message.value.toString()
							})
						}
					});
				} catch(error) {
					console.log(error)
				}
			})();
		},
	})
}

module.exports = consume