type Callback = (...args: any[]) => void;

interface Callbacks {
  [key: string]: Callback[];
}

export default class EventManager {
  callbacks: { [key: string]: Callbacks };

  /**
   * Constructor
   */
  constructor() {
    this.callbacks = {};
    this.callbacks.base = {};
  }

  /**
   * On
   */
  on(names: string, callback: Callback): this {
    const that = this;

    // Errors
    if (typeof names === 'undefined' || names === '') {
      console.warn('wrong names');
      return this;
    }

    if (typeof callback === 'undefined') {
      console.warn('wrong callback');
      return this;
    }

    // Resolve names
    const resolvedNames = this.resolveNames(names);

    // Each name
    resolvedNames.forEach(function (_name) {
      // Resolve name
      const name = that.resolveName(_name);

      // Create namespace if not exist
      if (!(that.callbacks[name.namespace] instanceof Object)) {
        that.callbacks[name.namespace] = {};
      }

      // Create callback if not exist
      if (!(that.callbacks[name.namespace][name.value] instanceof Array)) {
        that.callbacks[name.namespace][name.value] = [];
      }

      // Add callback
      that.callbacks[name.namespace][name.value].push(callback);
    });

    return this;
  }


  /**
   * Off
   */
  off(_names: string): boolean {
    const that = this;

    // Errors
    if (typeof _names === 'undefined' || _names === '') {
      console.warn('wrong name');
      return false;
    }

    // Resolve names
    const names = this.resolveNames(_names);

    // Each name
    names.forEach(function (_name) {
      // Resolve name
      const name = that.resolveName(_name);

      // Remove namespace
      if (name.namespace !== 'base' && name.value === '') {
        delete that.callbacks[name.namespace];
      }

      // Remove specific callback in namespace
      else {
        // Default
        if (name.namespace === 'base') {
          // Try to remove from each namespace
          for (const namespace in that.callbacks) {
            if (
              that.callbacks[namespace] instanceof Object &&
              that.callbacks[namespace][name.value] instanceof Array
            ) {
              delete that.callbacks[namespace][name.value];

              // Remove namespace if empty
              if (Object.keys(that.callbacks[namespace]).length === 0) delete that.callbacks[namespace];
            }
          }
        }

        // Specified namespace
        else if (
          that.callbacks[name.namespace] instanceof Object &&
          that.callbacks[name.namespace][name.value] instanceof Array
        ) {
          delete that.callbacks[name.namespace][name.value];

          // Remove namespace if empty
          if (Object.keys(that.callbacks[name.namespace]).length === 0) delete that.callbacks[name.namespace];
        }
      }
    });

    return true;
  }

  /**
   * Trigger
   */
  trigger(_name: string, _args?: any[]): any {
    // Error handling for invalid or empty event name
    if (_name === undefined || _name.trim() === '') {
      console.warn('Invalid event name');
      return null;
    }

    let finalResult: any = null;

    // Resolve the event name
    const resolvedName = this.resolveName(_name);

    const { value: eventName, namespace } = resolvedName;

    // Default args to empty array if not provided correctly
    const args = Array.isArray(_args) ? _args : [];

    // Look for callbacks in the specified namespace or base namespace
    const namespaceToSearch = namespace === 'base' ? Object.keys(this.callbacks) : [namespace];

    for (const ns of namespaceToSearch) {
      const callbacks = this.callbacks[ns]?.[eventName];

      if (Array.isArray(callbacks)) {
        callbacks.forEach((callback: Function) => {
          const result = callback.apply(this, args);
          if (finalResult === null) {
            finalResult = result;
          }
        });
      }
    }

    return finalResult;
  }

  /**
   * Resolve names
   */
  resolveNames(_names: string): string[] {
    // Remove invalid characters from names
    const cleanedNames = _names.replace(/[^a-zA-Z0-9 ,/.]/g, '');

    // Split cleaned names by separators and filter out empty strings
    const namesArray = cleanedNames.split(/[,/]+/).filter(name => name.trim() !== '');

    return namesArray;
  }

  /**
   * Resolve name
   */
  resolveName(name: string): { original: string; value: string; namespace: string } {
    const newName: { original: string; value: string; namespace: string } = { original: '', value: '', namespace: 'base' }; // Default namespace

    const parts: string[] = name.split('.');
    newName.original = name;
    newName.value = parts[0];

    // Specified namespace
    if (parts.length > 1 && parts[1] !== '') {
      newName.namespace = parts[1];
    }

    return newName;
  }
}