import 'reflect-metadata';

/**
 * This is a simple DI container implementation
 * that supports the @Injectable and @Inject decorators.
 * It also supports the DIContainer.set method to manually
 * set instances in the container.
 */

// Injectable decorator
export function Injectable() {
    return function (target: any) {
        // Register the class in the container
        Container.set(target, new target());
    };
}

// Inject decorator
export function Inject(token: any) {
    return function (target: any, propertyKey: string | symbol) {
        Object.defineProperty(target, propertyKey, {
            get: () => {
                return Container.get(token);
            },
        });
    };
}

// Container class
export class Container {
    private static instances: Map<any, any> = new Map();

    static set(token: any, instance: any) {
        this.instances.set(token, instance);
    }

    static get(token: any) {
        return this.instances.get(token);
    }
}
