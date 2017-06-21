import test from 'ava'
import React from 'react'
import {shallow} from 'enzyme'

import Home from '../../client/components/Home'

test('has a .home-background class name', t => {
  const wrapper = shallow(<Home />)
  t.true(wrapper.hasClass('home-background'))
})
