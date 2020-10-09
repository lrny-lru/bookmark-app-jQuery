const baseUrl = 'https://thinkful-list-api.herokuapp.com';
const username = 'lrny-lru';
const endpoint = `${baseUrl}/${username}/bookmarks`;

const callApi = function (...args) {
  // generalized API method
  let error = null;
  // try to fetch
  return fetch(...args)
    .then (res => {
      if (!res.ok) {
        error = { code: res.status };
      }

      return res.json();
    }).then (data => {
      if (error) {
        error.message = data.message;
        return Promise.reject(error);
      }

      return data;
    });
};

const createRecord = function (record) {
  // read all records from database
  return callApi(
    `${endpoint}`,
    {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(record)
    }
  );
};

const readRecords = function () {
  // read all records from database
  return callApi(`${endpoint}`);
};

const updateRecord = function (id, updateData) {
  // update database record
  return callApi(
    `${endpoint}/${id}`,
    {
      method: 'PATCH',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(updateData)
    }
  );
};

const deleteRecord = function (id) {
  // delete record from database
  return callApi(
    `${endpoint}/${id}`,
    {
      method: 'DELETE'
    }
  );
};

export default {
  createRecord,
  readRecords,
  updateRecord,
  deleteRecord
};