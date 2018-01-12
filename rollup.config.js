import babel from 'rollup-plugin-babel';
import resolve from 'rollup-plugin-node-resolve';
// import commonjs from 'rollup-plugin-commonjs';
import eslint from 'rollup-plugin-eslint';
import replace from 'rollup-plugin-replace';
import uglify from 'rollup-plugin-uglify';

const DEV = process.env.NODE_ENV !== 'production'

const config = {
  input: 'src/index.js',
  output: {
    file: 'dist/index.js',
    format: 'umd',
    name: 'yell',
  },
  plugins: [
    resolve({
      jsnext: true,
      main: true,
      browser: true,
    }),
    // commonjs(),
    eslint({
      include: [
        'src/**',
      ],
    }),
    babel({
      exclude: 'node_modules/**',
    }),
    replace({
      ENV: JSON.stringify(process.env.NODE_ENV || 'development'),
    }),
    !DEV && uglify(),
  ],
};

/* trun on sourceMap when dev env */
if (DEV) {
  config["sourceMap"] = 'inline'
}

export default config

