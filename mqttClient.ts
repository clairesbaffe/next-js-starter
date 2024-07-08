import mqtt from 'mqtt';

const brokerUrl = 'mqtt://13.60.47.157:1883';
const username = 'username';
const password = '1234';

const client = mqtt.connect(brokerUrl, {
  username: username,
  password: password,
});

client.on('connect', () => {
  console.log('Connected to MQTT broker');
});

client.on('error', (error) => {
  console.error('MQTT connection error:', error);
});

export const publishMessage = (topic: string, message: string): void => {
  client.publish(topic, message, { qos: 0, retain: false }, (error) => {
    if (error) {
      console.error('MQTT publish error:', error);
    } else {
      console.log('Message published to', topic);
    }
  });
};
