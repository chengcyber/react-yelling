const yell = (externalConfig) => (klass) => {

  const DEFAULT_CONFIG = {
    predicate: true,       /* decide yell or not of the highest priority */
    level: 'log',            /* log level */

    /* lifeCycelMethods */
    componentWillMount: true,
    componentDidMount: true,
    componentWillReceiveProps: true,
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
    level,
  } = config

  /* validation according to predicate */
  if ((typeof predicate === 'function' && !predicate())
    || !predicate
  ) {
    return klass
  }

  /* decide the level should be used */
  const log = typeof console[level] === 'function' ? console[level] : console.log

  const yellHelper = (klass, funcName) => {
    const func = klass.prototype[funcName]
    return function(...args) {
      // TODO make log text configurable
      let argsText = ''
      if (args.length) {
        argsText += 'with '
        args.forEach( arg => argsText += `${JSON.stringify(arg)} `)
      }
      log(`${klass.name} is invoking ${funcName} ${argsText}`)

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


