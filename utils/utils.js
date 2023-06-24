import axios from 'axios';

const fetchUsers = async () => {
  const url = 'https://my-api.com/users';
  const response = await axios.get(url);
  const users = response.data;
  return users;
};

export default fetchUsers;