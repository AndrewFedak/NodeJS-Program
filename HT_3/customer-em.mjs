export class EventEmitter {
    listeners = {};

    addEventListener(eventName, fn) {
        if (!this.listeners[eventName]) {
            this.listeners[eventName] = [];
        }
        this.listeners[eventName].push(fn);
    }

    on(eventName, fn) {
        this.addEventListener(eventName, fn)
    }

    removeListener(eventName, fn) {
        if (this.listeners[eventName]) {
            this.listeners[eventName] = this.listeners[eventName].filter((l) => l !== fn);
        }
    }

    off(eventName, fn) {
        this.removeListener(eventName, fn)
    }

    once(eventName, fn) {
        const onceListener = (...args) => {
            this.removeListener(eventName, onceListener);
            fn(...args);
        };
        this.on(eventName, onceListener);
    }

    emit(eventName, ...args) {
        if (this.listeners[eventName]) {
            this.listeners[eventName].forEach((fn) => {
                fn(...args);
            });
        }
    }

    listenerCount(eventName) {
        if (this.listeners[eventName]) {
            return this.listeners[eventName].length;
        }
    }

    rawListeners(eventName) {
        return this.listeners[eventName]
    }
}