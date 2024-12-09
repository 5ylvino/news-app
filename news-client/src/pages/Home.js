import React from 'react';
import useSWR from 'swr';

import MainLayer from '../components/MainLayer';
import LeftSidebar from '../components/LeftSidebar';
import RightSidebar from '../components/RightSidebar';
import withConditionLayout from '../components/withConditionLayout';
import { API_ENDPOINTS } from '../service/api-endpoints';
import httpClient from '../service/client';

const Home = () => {
  const { data, error, isLoading } = useSWR(
    API_ENDPOINTS.articles,
    httpClient.get
  );
  return <HomeView data={data} error={error} isLoading={isLoading} />;
};
export default Home;

const HomeLayer = props => {
  const { data, ...rest } = props?.data?.data;

  return (
    <div className='block md:flex'>
      <LeftSidebar data={data} />
      <MainLayer pagination={rest} data={data} />
      <RightSidebar data={data} />
    </div>
  );
};
const HomeView = withConditionLayout(HomeLayer);
