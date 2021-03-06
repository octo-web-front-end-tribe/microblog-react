import React from 'react';
import sinon from 'sinon';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import { Redirect } from 'react-router';
import Login from './LoginForm';
import * as AuthenticationService from '../AuthenticationService/AuthenticationService';

describe('Login component', () => {
  describe('on render', () => {
    it('should render an input', () => {
      const wrapper = shallow(<Login />);

      expect(wrapper.find('input')).to.have.length(1);
    });

    it('should input element have the right className', () => {
      const wrapper = shallow(<Login />);
      expect(wrapper.find('input').hasClass('login-form__username')).to.be.true;
    });

    it('should render a button', () => {
      const wrapper = shallow(<Login />);

      expect(wrapper.find('button')).to.have.length(1);
    });

    it('should button element have the right className', () => {
      const wrapper = shallow(<Login />);

      expect(wrapper.find('button').hasClass('login-form__identify')).to.be.true;
    });

    it('should redirect to another page when authenticated', () => {
      const wrapper = shallow(<Login />);
      wrapper.setState({ isAuthenticated: true });

      const redirectComponent = wrapper.find(Redirect);
      expect(redirectComponent).to.have.length(1);
      expect(redirectComponent.props().to).to.equal('/');
    });
  });

  describe('on change', () => {
    it('should set state with input value', () => {
      // given
      const wrapper = shallow(<Login />);
      const input = wrapper.find('input');

      // when
      input.simulate('change', { target: { value: 'toto' } });

      // then
      expect(wrapper.state('inputValue')).to.equal('toto');
    });
  });

  describe('on key press', () => {
    describe('with a key different than enter', () => {
      beforeEach(() => {
        window.localStorage.clear();
      });

      it('should do nothing', () => {
        // given
        const input = shallow(<Login />).find('input');

        // when
        input.simulate('keyPress', { keyCode: 'notEnter' });

        // then
        expect(window.localStorage.length).to.equal(0);
      });
    });

    describe('with enter', () => {
      let stubAuthenticate;

      beforeEach(() => {
        window.localStorage.clear();
        stubAuthenticate = sinon.stub(AuthenticationService, 'authenticate');
      });

      afterEach(() => {
        stubAuthenticate.restore();
      });

      it('should save name inside local Storage with value', () => {
        // given
        const wrapper = shallow(<Login />);
        wrapper.setState({ inputValue: 'My name' });
        const input = wrapper.find('input');

        // when
        input.simulate('keyPress', { key: 'Enter' });

        // then
        expect(stubAuthenticate.calledOnce).to.be.true;
        expect(stubAuthenticate.calledWith('My name')).to.be.true
        expect(wrapper.state('isAuthenticated')).to.be.true;
      });
    });
  });

  describe('click on button', () => {
    let stubAuthenticate;

    beforeEach(() => {
      window.localStorage.clear();
      stubAuthenticate = sinon.stub(AuthenticationService, 'authenticate');
    });

    afterEach(() => {
      stubAuthenticate.restore();
    });

    it('should authenticate with the name', () => {
      // given
      const wrapper = shallow(<Login />);
      wrapper.setState({ inputValue: 'My name' });
      const button = wrapper.find('button');

      // when
      button.simulate('click');

      // then
      expect(stubAuthenticate.calledOnce).to.be.true;
      expect(wrapper.state('isAuthenticated')).to.be.true;
    });
  });
});
