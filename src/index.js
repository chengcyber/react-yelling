const createDebug = require('debug')
const yell = (externalConfig) => (klass) => {

  const DEFAULT_CONFIG = {
    predicate: true,       /* decide yell or not of the highest priority */

    /* lifeCycelMethods */
    componentWillMount: true,
    render: true,
    componentDidMount: true,
    componentWillReceiveProps: true,
    shouldComponentUpdate: true,
    componentWillUpdate: true,
    componentDidUpdate: true,
    componentWillUnmount: true,
  }

  const config = {
    ...DEFAULT_CONFIG,
    externalConfig,
  }

  const {
    predicate,
  } = config

  /* validation according to predicate */
  if ((typeof predicate === 'function' && !predicate())
    || !predicate
  ) {
    return klass
  }

  const yellHelper = (klass, funcName) => {
    const func = klass.prototype[funcName]
    return function(...args) {
      // TODO make log text configurable
      const log = createDebug(klass.name)
      createDebug.enable(klass.name)
      let argsText = ''
      if (args.length) {
        args.forEach( arg => argsText += `${JSON.stringify(arg)} `)
      }
      log(`'s ${funcName}: ${argsText}`)

      if (!func || typeof func !== 'function') {
        /* true for shouldComponentUpdate */
        return true
      }
      return func.call(this, ...args)
    }
  }

  const lifeCycleMethods = [
    'componentWillMount',
    'render',
    'componentDidMount',
    'componentWillReceiveProps',
    'shouldComponentUpdate',
    'componentWillUpdate',
    'componentDidUpdate',
    'componentWillUnmount',
  ]

  lifeCycleMethods.forEach(funcName => {
    if (!config[funcName]) {
      return
    }
    klass.prototype[funcName] = yellHelper(klass, funcName)
  })

  return klass

}

export default yell


