// @flow

import React from 'react';
import Header from '../components/Header/Header';
import {shallow, configure } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });

describe('<Header />', () => {
  let header;

  beforeEach(() => {
    header = shallow(<Header />);
  });

  it('renders correctly', () => {
    expect(shallowToJson(header)).toMatchSnapshot();
  });

  it('renders a <div> element', () => {
    expect(header.find('div.header-wrapper').length).toEqual(1);
  });

  it('renders an <h1> element', () => {
    expect(header.find('h1').length).toEqual(1);
    expect(header.find('h1').text()).toEqual('Welcome to the Clark Take-Home Code Challenge');
  });
});
