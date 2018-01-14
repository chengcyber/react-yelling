import React from 'react'
import renderer from 'react-test-renderer'
import yell from 'react-yelling'
import { version } from '../package'

/* Link Component For Test */
const STATUS = {
  HOVERED: 'hovered',
  NORMAL: 'normal',
};

class Link extends React.Component {
  constructor(props) {
    super(props);

    this._onMouseEnter = this._onMouseEnter.bind(this);
    this._onMouseLeave = this._onMouseLeave.bind(this);

    this.state = {
      class: STATUS.NORMAL,
    };
  }

  _onMouseEnter() {
    this.setState({class: STATUS.HOVERED});
  }

  _onMouseLeave() {
    this.setState({class: STATUS.NORMAL});
  }

  render() {
    return (
      <a
        className={this.state.class}
        href={this.props.page || '#'}
        onMouseEnter={this._onMouseEnter}
        onMouseLeave={this._onMouseLeave}
      >
        {this.props.children}
      </a>
    );
  }
}
Link = yell()(Link)

test('react component works fine', () => {

  const TestComponent = renderer.create(
    <Link page="http://www.facebook.com">Facebook</Link>,
  )

  let tree = TestComponent.toJSON()
  expect(tree).toMatchSnapshot()

  tree.props.onMouseEnter();
  // event trigger the rerender
  tree = TestComponent.toJSON();
  expect(tree).toMatchSnapshot();

  TestComponent.update(
    <Link page="https://www.facebook.com">Safe Facebook</Link>,
  )
  // data trigger the rerender
  tree = TestComponent.toJSON();
  expect(tree).toMatchSnapshot();

})

console.log('TEST PACKAGE VERSION: ' + version)

