import { EventEmitter } from './customer-em.mjs'
import https from 'node:https'

class WithTime extends EventEmitter {
    async execute(asyncFunc, ...args) {
        try {
            this.emit('begin');

            const startTime = Date.now();
            const result = await asyncFunc(...args);

            const endTime = Date.now();
            const executionTime = endTime - startTime;

            this.emit('data', result);

            this.emit('end');
            console.log('Execution Time:', executionTime, 'ms');
        } catch (err) {
            this.emit('error', err);
            console.error('Error during execution:', err);
        }
    }
}

const withTime = new WithTime();

withTime.on('begin', () => console.log('About to execute'));
withTime.on('end', () => console.log('Done with execute'));
console.log(withTime.rawListeners("end"));

withTime.execute(() => {
    return new Promise((resolve, reject) => {
        https.get('https://jsonplaceholder.typicode.com/posts/1', (res) => {
            const { statusCode } = res;
            if (statusCode !== 200) {
                reject('Error')
            } else {
                res.setEncoding('utf8');
                let rawData = '';
                res.on('data', (chunk) => { rawData += chunk; });
                res.on('end', () => {
                    try {
                        const parsedData = JSON.parse(rawData);
                        resolve(parsedData)
                    } catch (e) {
                        console.error(e.message);
                    }
                });
            }
        });
    })
});