export class Storage {
    constructor(name) {
        this.name = name;
        this.storage = localStorage;
    }

    loadStorage() {
        const value = this.storage.getItem(this.name);
        if (!value) return {};

        try {
            const parsedValue = JSON.parse(value);
            return parsedValue && typeof parsedValue === 'object'
                ? parsedValue
                : {};
        } catch (_) {
            this.clear();
            return {};
        }
    }

    saveStorage(value) {
        this.storage.setItem(this.name, JSON.stringify(value));
    }

    get(key) {
        const value = this.loadStorage()[key];
        return value ?? null;
    }

    set(key, value) {
        if (value == null) {
            const storage = this.loadStorage();
            delete storage[key];
            this.saveStorage(storage);
            return;
        }

        const storage = this.loadStorage();
        storage[key] = value;
        this.saveStorage(storage);
    }

    clear() {
        this.storage.removeItem(this.name);
    }
}
