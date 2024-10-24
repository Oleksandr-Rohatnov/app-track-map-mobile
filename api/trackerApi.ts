import axiosClient from './axiosClient';

const trackerApi = {
  getTrackers: (authKey?: string) => {
    return axiosClient.get('/trackers', {
      headers: {
        Authorization: authKey
      }
    });
  }
};

export default trackerApi;
