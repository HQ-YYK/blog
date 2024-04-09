import { useRef } from 'react';

interface Callbacks {
  [namespace: string]: {
    [name: string]: Function[];
  };
}

interface ResolvedName {
  original: string;
  value: string;
  namespace: string;
}

const useCustomPubSub = () => {
  const callbacksRef = useRef<Callbacks>({});
  callbacksRef.current.base = {};

  /**
   * On
   */
  const on = (_names: string | string[], callback: Function) => {
    // Errors
    if (typeof _names === 'undefined' || _names === '') {
      console.warn('wrong names');
      return false;
    }

    if (typeof callback === 'undefined') {
      console.warn('wrong callback');
      return false;
    }

    const names = resolveNames(_names);

    names.forEach((_name: string) => {
      const name = resolveName(_name);

      // Create namespace if not exist
      if (!(callbacksRef.current[name.namespace] instanceof Object)) {
        callbacksRef.current[name.namespace] = {};
      }

      // Create callback if not exist
      if (
        !(callbacksRef.current[name.namespace][name.value] instanceof Array)
      ) {
        callbacksRef.current[name.namespace][name.value] = [];
      }

      // Add callback
      callbacksRef.current[name.namespace][name.value].push(callback);
    });

    return () => {
      names.forEach((_name: string) => {
        const name = resolveName(_name);

        // Remove callback
        const index = callbacksRef.current[name.namespace][name.value].indexOf(
          callback
        );
        if (index !== -1) {
          callbacksRef.current[name.namespace][name.value].splice(index, 1);
        }
      });
    };
  };

  /**
 * Off
 */
  const off = (_names: string | string[]) => {
    // Errors
    if (typeof _names === 'undefined' || _names === '') {
      console.warn('wrong names');
      return false;
    }

    const names = resolveNames(_names);

    names.forEach((_name: string) => {
      const name = resolveName(_name);

      // Remove namespace
      if (name.namespace !== 'base' && name.value === '') {
        delete callbacksRef.current[name.namespace];
      }

      // Remove specific callback in namespace
      else {
        // Default
        if (name.namespace === 'base') {
          // Try to remove from each namespace
          for (const namespace in callbacksRef.current) {
            if (
              callbacksRef.current[namespace] instanceof Object &&
              callbacksRef.current[namespace][name.value] instanceof Array
            ) {
              delete callbacksRef.current[namespace][name.value];

              // Remove namespace if empty
              if (Object.keys(callbacksRef.current[namespace]).length === 0)
                delete callbacksRef.current[namespace];
            }
          }
        }

        // Specified namespace
        else if (
          callbacksRef.current[name.namespace] instanceof Object &&
          callbacksRef.current[name.namespace][name.value] instanceof Array
        ) {
          delete callbacksRef.current[name.namespace][name.value];

          // Remove namespace if empty
          if (Object.keys(callbacksRef.current[name.namespace]).length === 0)
            delete callbacksRef.current[name.namespace];
        }
      }
    });

    return true;
  };

  /**
   * Trigger
   */
  const trigger = (_name: string, _args?: any[]) => {
    // Errors
    if (typeof _name === 'undefined' || _name === '') {
      console.warn('wrong name');
      return false;
    }

    let finalResult: null = null;
    const args = Array.isArray(_args) ? _args : [];

    const name = resolveName(_name);

    // Default namespace
    if (name.namespace === 'base') {
      // Try to find callback in each namespace
      for (const namespace in callbacksRef.current) {
        if (
          callbacksRef.current[namespace] instanceof Object &&
          callbacksRef.current[namespace][name.value] instanceof Array
        ) {
          callbacksRef.current[namespace][name.value].forEach((callback) => {
            const result = callback.apply(null, args);
            if (typeof finalResult === 'undefined') {
              finalResult = result;
            }
          });
        }
      }
    }

    // Specified namespace
    else if (
      callbacksRef.current[name.namespace] instanceof Object &&
      callbacksRef.current[name.namespace][name.value] instanceof Array
    ) {
      callbacksRef.current[name.namespace][name.value].forEach((callback) => {
        const result = callback.apply(null, args);
        if (typeof finalResult === 'undefined') {
          finalResult = result;
        }
      });
    }

    return finalResult;
  };

  /**
   * Resolve names
   */
  const resolveNames = (_names: any) => {
    let names = _names
    names = names.replace(/[^a-zA-Z0-9 ,/.]/g, '')
    names = names.replace(/[,/]+/g, ' ')
    names = names.split(' ')

    return names
  }

  /**
  * Resolve name
  */
  const resolveName = (name: string): ResolvedName => {
    const newName: ResolvedName = {
      original: name,
      value: '',
      namespace: 'base', // Base namespace
    };

    const parts = name.split('.');

    newName.value = parts[0];

    // Specified namespace
    if (parts.length > 1 && parts[1] !== '') {
      newName.namespace = parts[1];
    }

    return newName;
  };

  return {
    on,
    off,
    trigger,
  };
};

export default useCustomPubSub;