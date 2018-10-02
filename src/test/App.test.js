// @flow

import React from 'react';
import App from '../components/App/App';
import Header from '../components/Header/Header';
import Totals from '../components/Totals/Totals';
import BillList from '../components/BillList/BillList';
import { mount, configure } from 'enzyme';
import { mountToJson } from 'enzyme-to-json';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });

describe('<App />', () => {
  let app;

  beforeEach(() => {
    app = mount(<App />);
  });

  it('renders correctly', () => {
    expect(mountToJson(app)).toMatchSnapshot();
  });

  it('renders a div', () => {
    expect(app.find('div.App').length).toEqual(1);
  });

  it('renders a Header component', () => {
    expect(app.find(Header).length).toEqual(1);
  });

  it('renders a Totals component', () => {
    expect(app.find(Totals).length).toEqual(1);
  });

  it('renders a BillList component', () => {
    expect(app.find(BillList).length).toEqual(1);
  });
});
