import PageHeader from '../../components/common/PageHeader';
import Loader from '../../components/Loader';
import useLoader from '../../hooks/useLoader';
import DirectorMessage from '../../components/DirectorMessage';

const DirectorMessagePage = () => {
  const loading = useLoader();

  if (loading) return <Loader />;

  return (
    <>
    <SEO
  title="Director Message"
  description="Message from the Director of Brain Inspire System of Education."
  keywords="director message, BISE"
/>
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