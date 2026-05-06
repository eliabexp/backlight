class Storage {
    constructor() {
        this.storage = localStorage;
    }

    load(key) {
        const value = this.storage.getItem(key);
        if (!value) return null;

        try {
            return JSON.parse(value);
        } catch (_) {
            this.removeItem(key);
            return null;
        }
    }

    save(key, value) {
        if (value == null) {
            this.removeItem(key);
            return;
        }

        this.storage.setItem(key, JSON.stringify(value));
    }

    removeItem(key) {
        this.storage.removeItem(key);
    }

    clear() {
        this.storage.clear();
    }
}

export const storage = new Storage();