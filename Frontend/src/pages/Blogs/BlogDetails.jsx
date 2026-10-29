import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  FaArrowLeft,
  FaCalendar,
  FaUser,
  FaEye,
  FaTag,
  FaFacebookF,
  FaWhatsapp,
  FaTwitter,
  FaLink,
  FaComment,
  FaCheckCircle,
} from 'react-icons/fa';
import SEO from '../../components/SEO';
import Comments from '../../components/Comments';
import useBlogsStore from '../../store/useBlogsStore';

const BlogDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const {
    blogDetails,
    blogFetching,
    fetchBlogById,
  } = useBlogsStore();

  const blog = blogDetails[id];

  const [copied, setCopied] = useState(false);

  useEffect(() => {
    fetchBlogById(id);
  }, [id, fetchBlogById]);

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error(err);
    }
  };

  const shareUrl = typeof window !== 'undefined' ? window.location.href : '';
  const shareTitle = blog?.title || '';

  const formatDate = (date) => {
    if (!date) return 'N/A';
    return new Date(date).toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    });
  };

  if (blogFetching && !blog) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <div className="inline-block w-12 h-12 border-4 border-[#38BDF8] border-t-transparent rounded-full animate-spin"></div>
          <p className="text-gray-500 text-sm mt-4">Loading blog...</p>
        </div>
      </div>
    );
  }

  if (!blog) {
    return (
      <>
        <SEO title="Blog Not Found" description="Blog not found." />

        <section className="bg-white py-16 md:py-24">
          <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-[#38BDF8]/10 text-[#38BDF8] text-4xl mb-6">
              <FaComment />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-[#0F1E4A] mb-3">
              Blog Not Found
            </h2>
            <p className="text-gray-600 text-sm md:text-base mb-8">
              The blog you are looking for does not exist.
            </p>
            <button
              onClick={() => navigate('/blogs')}
              className="inline-flex items-center gap-2 bg-[#38BDF8] text-[#0F1E4A] px-6 py-3.5 rounded-full font-bold text-sm shadow-lg shadow-[#38BDF8]/30 hover:bg-[#2563EB] hover:text-white transition-all duration-300"
            >
              <FaArrowLeft className="text-xs" />
              Back to Blogs
            </button>
          </div>
        </section>
      </>
    );
  }

  return (
    <>
      <SEO
        title={blog.title}
        description={blog.shortDesc || `Read ${blog.title} on Brain Inspire.`}
        keywords={blog.keywords || 'blog, news, BISE Bahawalpur'}
      />

      <section className="bg-white py-10 md:py-16 overflow-x-hidden">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <Link
            to="/blogs"
            className="inline-flex items-center gap-2 text-[#2563EB] text-sm font-semibold hover:text-[#38BDF8] transition-colors duration-200 mb-8"
          >
            <FaArrowLeft className="text-xs" />
            Back to Blogs
          </Link>

          <div className="mb-8">
            {blog.category?.name && (
              <span className="inline-flex items-center gap-1.5 text-[10px] font-bold tracking-wider uppercase text-[#0F1E4A] bg-[#38BDF8] px-3 py-1.5 rounded-full mb-5">
                <FaTag className="text-[8px]" />
                {blog.category.name}
              </span>
            )}

            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#0F1E4A] leading-tight mb-5 break-words">
              {blog.title}
            </h1>

            {blog.shortDesc && (
              <p className="text-gray-600 text-base leading-relaxed mb-6 break-words">
                {blog.shortDesc}
              </p>
            )}

            <div className="flex flex-wrap items-center gap-5 text-sm text-gray-500 pb-6 border-b border-gray-100">
              <div className="flex items-center gap-2">
                <FaCalendar className="text-[#38BDF8]" />
                <span>{formatDate(blog.created_at)}</span>
              </div>

              {blog.author && (
                <div className="flex items-center gap-2">
                  <FaUser className="text-[#38BDF8]" />
                  <span>{blog.author}</span>
                </div>
              )}

              {blog.views_count > 0 && (
                <div className="flex items-center gap-2">
                  <FaEye className="text-[#38BDF8]" />
                  <span>{blog.views_count} views</span>
                </div>
              )}
            </div>
          </div>

          {blog.image && (
            <div className="rounded-2xl overflow-hidden mb-8 shadow-md">
              <img
                src={blog.image}
                alt={blog.title}
                className="w-full h-auto max-h-[380px] object-cover"
              />
            </div>
          )}

          <article
            className="blog-content mb-10 w-full overflow-hidden"
            dangerouslySetInnerHTML={{ __html: blog.description || '' }}
          />

          {blog.descImg && (
            <div className="rounded-2xl overflow-hidden my-8 shadow-md">
              <img
                src={blog.descImg}
                alt={blog.title}
                className="w-full h-auto max-h-[380px] object-cover"
              />
            </div>
          )}

          <div className="border-t border-gray-100 pt-8 mb-12">
            <div className="flex flex-wrap items-center gap-3">
              <span className="text-sm font-bold text-[#0F1E4A]">
                Share this post:
              </span>

              <a
                href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`}
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 flex items-center justify-center rounded-full bg-[#1877F2] text-white hover:scale-110 transition-transform duration-300"
                aria-label="Share on Facebook"
              >
                <FaFacebookF className="text-sm" />
              </a>

              <a
                href={`https://wa.me/?text=${encodeURIComponent(shareTitle + ' - ' + shareUrl)}`}
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 flex items-center justify-center rounded-full bg-[#25D366] text-white hover:scale-110 transition-transform duration-300"
                aria-label="Share on WhatsApp"
              >
                <FaWhatsapp className="text-sm" />
              </a>

              <a
                href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareTitle)}`}
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 flex items-center justify-center rounded-full bg-[#1DA1F2] text-white hover:scale-110 transition-transform duration-300"
                aria-label="Share on Twitter"
              >
                <FaTwitter className="text-sm" />
              </a>

              <button
                onClick={handleCopyLink}
                className={`flex items-center gap-2 px-4 h-9 rounded-full text-xs font-bold transition-all duration-300 ${
                  copied
                    ? 'bg-green-500 text-white'
                    : 'bg-gray-100 text-[#0F1E4A] hover:bg-[#38BDF8] hover:text-[#0F1E4A]'
                }`}
              >
                {copied ? (
                  <>
                    <FaCheckCircle />
                    Copied!
                  </>
                ) : (
                  <>
                    <FaLink />
                    Copy Link
                  </>
                )}
              </button>
            </div>
          </div>

          <Comments blogId={id} />
        </div>
      </section>
    </>
  );
};

export default BlogDetails;