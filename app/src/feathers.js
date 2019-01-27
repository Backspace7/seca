import io from 'socket.io-client';
import feathers from '@feathersjs/client';
// const socketio = require('@feathersjs/socketio-client');

const socket = io('ec2-54-173-87-170.compute-1.amazonaws.com:8080');
const client = feathers();

client.configure(feathers.socketio(socket));

export default client;
