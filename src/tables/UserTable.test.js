import React from 'react';
import { shallow } from 'enzyme';
import UserTable from './UserTable';
import { cleanup } from '@testing-library/react';

afterEach(cleanup);

test('userTable with some data', () => {
  const fakeUsers = [
    { id: 1, first_name: "test", last_name: "test", email: "test@example.com" },
    { id: 2, first_name: "test1", last_name: "test1", email: "test1@example.com" }  
  ];
  const userTable = shallow(<UserTable users={fakeUsers} />)

  expect(userTable.find('tr')).toHaveLength(3);
  expect(userTable.find('tbody>tr>td').at(0).text()).toBe('test');
  expect(userTable.find('tbody>tr>td').at(2).text()).toBe('test@example.com')
});

test('userTable with no data', () => {
  const userTable = shallow(<UserTable users={[]} />)

  expect(userTable.find('tr')).toHaveLength(2);
  expect(userTable.find('tbody>tr>td').at(0).text()).toBe('No users')
})
