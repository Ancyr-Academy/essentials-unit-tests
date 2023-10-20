function getFirstname(name: string) {
  const parts = name.split(' ');
  return parts[0];
}

it('should return the first name', () => {
  const name = 'John Doe'; // Arrange
  const firstname = getFirstname(name); // Act
  expect(firstname).toEqual('John'); // Assert
});
