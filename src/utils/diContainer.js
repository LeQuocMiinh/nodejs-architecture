class DIContainer {
    constructor() {
        this.factories = {};
        this.dependencies = {};
    }

    factory(name, _factory) {
        this.factories[name] = _factory;
    }

    register(name, dep) {
        this.dependencies[name] = dep;
    }

    get(name) {
        if (!this.dependencies[name]) {
            // get factory for current component
            const _factory = this.factories[name];
            // load component using factory and also load dependencies of the factory
            this.dependencies[name] = _factory && diContainer.inject(_factory);

            if (!this.dependencies[name]) {
                throw new Error(`Cannot find module: ${name}`);
            }
        }
        return this.dependencies[name];
    }

    inject(_factory) {
        // load all dependencies of the current factory if the component has dependencies
        const args = _factory._inject
            ? _factory._inject.map(dep => diContainer.get(dep))
            : null;
        return _factory.apply(null, args);
    }
}

const diContainer = new DIContainer();

module.exports = diContainer;
