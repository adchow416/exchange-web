import React from 'react';
import { mount } from 'enzyme'
import App from './App';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

describe("Basic Test", () => {
  it('Should render the app', async () => {
    const wrapper = mount(<App/>)
    expect(wrapper.find('a').first().text()).toBe('Rates By Exchange Rate API')
  });
})

describe("Input Test", () => {
  let originalFetch;

  beforeEach(() => {
      originalFetch = global.fetch;
      global.fetch = jest.fn(() => Promise.resolve({
          json: () => Promise.resolve(["USD"])
      }));
  });

  afterEach(() => {
      global.fetch = originalFetch;
  });

  it('Should select correct currency type on change', async () => {
    const wrapper = mount(<App/>)
    expect(wrapper.find('select').first().props().value).toBe('')
    wrapper.find('select').first().simulate('change', {target: {value: 'USD'}})
    expect(wrapper.find('select').first().props().value).toBe('USD')
  });

  it('Should input correct currency on change', async () => {
    const wrapper = mount(<App/>)
    expect(wrapper.find('input').first().props().value).toBe(0)
    wrapper.find('input').first().simulate('change', {target: {value: 1}})
    expect(wrapper.find('input').first().props().value).toBe(1)
  });
});


describe("Button Test", () => {
  let originalFetch;

  beforeEach(() => {
      originalFetch = global.fetch;
      global.fetch = jest.fn(() => Promise.resolve({
          json: () => Promise.resolve(1)
      }));
  });

  afterEach(() => {
      global.fetch = originalFetch;
  });

  it('Should change the text on button click', async () => {
    const wrapper = mount(<App/>)
    expect(wrapper.find('#convertedCurrencyDisplay').first().text()).toBe('Converted Currency: 0')
    wrapper.find('button').first().simulate('click')
    expect(wrapper.find('#convertedCurrencyDisplay').first().text()).toBe('Converted Currency: 1')
  });
});