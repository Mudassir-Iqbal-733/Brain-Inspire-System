import PageHeader from '../../components/common/PageHeader';
import DirectorMessage from '../../components/DirectorMessage';

const DirectorMessagePage = () => {
  return (
    <>
      <PageHeader
        title="Director Message"
        breadcrumbs={[
          { label: 'About', href: '/about/director-message' },
          { label: 'Director Message' },
        ]}
      />

      <DirectorMessage contained />
    </>
  );
};

export default DirectorMessagePage;