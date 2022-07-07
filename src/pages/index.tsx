import PageContainer from '@/components/PageContainer';
import { Meta } from '@/layouts/Meta';

import DefaultChart from '../components/DefaultChart';

const Index = () => {
  return (
    <>
      <Meta
        title="Test Graph"
        description="Next js Boilerplate is the perfect starter code for your project. Build your React application with the Next.js framework."
      />
      <PageContainer>
        <DefaultChart />
      </PageContainer>
    </>
  );
};

export default Index;
