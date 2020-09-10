import local from './local.js';
import remote from './remote.js';

export default process.env.NODE_ENV === 'production' 
	? remote 
	: local;
