import endPoints from './dataBaseEndPoints';

describe('Test create path to Endpoints', () => {
  test('Settings endpoint', () => {
    expect(endPoints.settings('user1')).toBe('Users/user1/settings');
    expect(endPoints.settings('user2')).toBe('Users/user2/settings');
  });

  test('Hours endpoint', () => {
    expect(endPoints.hours('user1', '2019')).toBe('Users/user1/years/2019/hours');
    expect(endPoints.hours('user2', '2020')).toBe('Users/user2/years/2020/hours');
  });

  test('Hours endpoint', () => {
    expect(endPoints.yearsList('user1')).toBe('Users/user1/settings/yearsList');
    expect(endPoints.yearsList('user2')).toBe('Users/user2/settings/yearsList');
  });

  test('hoursSettings endpoint', () => {
    expect(endPoints.hoursSettings('user1')).toBe('Users/user1/settings/hoursSettings');
    expect(endPoints.hoursSettings('user2')).toBe('Users/user2/settings/hoursSettings');
  });
  test('money endpoint', () => {
    expect(endPoints.money('user1', '2019')).toBe('Users/user1/years/2019/money');
    expect(endPoints.money('user2', '2020')).toBe('Users/user2/years/2020/money');
  });
});
