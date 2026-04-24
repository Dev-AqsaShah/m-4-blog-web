import { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import Footer from "@/Components/Footer";
import ShareButtons from "@/Components/ShareButtons";
import { ConnectDB } from "@/lib/config/db";
import BlogModel from "@/lib/models/BlogModel";
import { FiClock, FiUser, FiArrowLeft } from "react-icons/fi";

type Props = {
  params: Promise<{ id: string }>;
};

const CLOUDINARY_CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || "dm5vap7hs";

const CATEGORY_STYLES: Record<string, string> = {
  Technology: "bg-blue-500/20 text-blue-300 border-blue-500/30",
  Traveling: "bg-green-500/20 text-green-300 border-green-500/30",
  Animals: "bg-orange-500/20 text-orange-300 border-orange-500/30",
  Plants: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
  Arts: "bg-purple-500/20 text-purple-300 border-purple-500/30",
  Lifestyle: "bg-pink-500/20 text-pink-300 border-pink-500/30",
};

function getImageUrl(image: string): string {
  if (!image) return "/assets/h1.jpeg";
  if (/^https?:\/\//.test(image)) return image;
  if (image.startsWith("/uploads/") || image.startsWith("/assets/")) return image;
  return `https://res.cloudinary.com/${CLOUDINARY_CLOUD_NAME}/image/upload/${image.replace(/^\/+/, "")}`;
}

async function getBlog(id: string) {
  try {
    await ConnectDB();
    const blog = await BlogModel.findById(id).lean();
    if (!blog) return null;
    return JSON.parse(JSON.stringify(blog));
  } catch {
    return null;
  }
}

async function getRelatedBlogs(category: string, excludeId: string) {
  try {
    const blogs = await BlogModel.find({ category, _id: { $ne: excludeId } })
      .limit(3)
      .lean();
    return JSON.parse(JSON.stringify(blogs));
  } catch {
    return [];
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const blog = await getBlog(id);
  if (!blog) return { title: "Blog Not Found" };

  const description = blog.description.slice(0, 160);
  const imageUrl = getImageUrl(blog.image);
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://life-unfolded.vercel.app";

  return {
    title: blog.title,
    description,
    openGraph: {
      title: blog.title,
      description,
      url: `${baseUrl}/blogs/${id}`,
      images: imageUrl ? [{ url: imageUrl, width: 1200, height: 630 }] : [],
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: blog.title,
      description,
      images: imageUrl ? [imageUrl] : [],
    },
  };
}

export default async function BlogDetailPage({ params }: Props) {
  const { id } = await params;
  const blog = await getBlog(id);

  if (!blog) notFound();

  const relatedBlogs = await getRelatedBlogs(blog.category, blog._id);
  const wordCount = blog.description.split(/\s+/).length;
  const readingTime = Math.max(1, Math.ceil(wordCount / 200));
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://life-unfolded.vercel.app";
  const shareUrl = `${baseUrl}/blogs/${id}`;
  const imageUrl = getImageUrl(blog.image);
  const categoryStyle = CATEGORY_STYLES[blog.category] || "bg-white/10 text-white/60 border-white/20";
  const formattedDate = blog.createdAt
    ? new Date(blog.createdAt).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })
    : null;

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-blue-950/20 to-black">
      {/* Sticky Navbar */}
      <nav className="sticky top-0 z-50 bg-black/70 backdrop-blur-xl border-b border-white/10">
        <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-2 text-white/70 hover:text-white transition-colors text-sm"
          >
            <FiArrowLeft size={16} />
            Back to Home
          </Link>
          <div className="flex items-center gap-3 text-white/40 text-sm">
            <FiClock size={14} />
            <span>{readingTime} min read</span>
          </div>
        </div>
      </nav>

      {/* Main Article */}
      <article className="max-w-4xl mx-auto px-4 py-10">
        {/* Category Badge */}
        <div className="mb-4">
          <span className={`inline-block text-xs px-3 py-1.5 rounded-full border font-medium ${categoryStyle}`}>
            {blog.category}
          </span>
        </div>

        {/* Title */}
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white mb-5 leading-tight">
          {blog.title}
        </h1>

        {/* Meta Row */}
        <div className="flex flex-wrap items-center gap-4 mb-8 pb-6 border-b border-white/10">
          <span className="flex items-center gap-2 text-white/60 text-sm">
            <FiUser size={14} />
            {blog.author}
          </span>
          <span className="flex items-center gap-2 text-white/60 text-sm">
            <FiClock size={14} />
            {readingTime} min read
          </span>
          {formattedDate && (
            <span className="text-white/40 text-sm">{formattedDate}</span>
          )}
          <div className="ml-auto">
            <ShareButtons url={shareUrl} title={blog.title} />
          </div>
        </div>

        {/* Hero Image */}
        {imageUrl && (
          <div className="relative w-full h-64 sm:h-80 lg:h-[450px] rounded-3xl overflow-hidden mb-10 border border-white/10">
            <Image
              src={imageUrl}
              alt={blog.title}
              fill
              className="object-cover"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 80vw, 896px"
              priority
            />
          </div>
        )}

        {/* Blog Content */}
        <div className="prose prose-invert max-w-none">
          <p className="text-white/80 text-base sm:text-lg leading-relaxed whitespace-pre-wrap">
            {blog.description}
          </p>
        </div>

        {/* Bottom Share */}
        <div className="mt-12 pt-8 border-t border-white/10">
          <p className="text-white/40 text-sm mb-3">Enjoyed this article? Share it!</p>
          <ShareButtons url={shareUrl} title={blog.title} />
        </div>
      </article>

      {/* Related Blogs */}
      {relatedBlogs.length > 0 && (
        <section className="max-w-4xl mx-auto px-4 pb-12">
          <h2 className="text-xl font-bold text-white mb-6 pt-4 border-t border-white/10">
            More in {blog.category}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {relatedBlogs.map(
              (related: { _id: string; title: string; image: string; author: string; description: string }) => (
                <Link
                  key={related._id}
                  href={`/blogs/${related._id}`}
                  className="group block bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:border-blue-400/30 hover:bg-white/8 transition-all"
                >
                  <div className="relative h-36 overflow-hidden">
                    <Image
                      src={getImageUrl(related.image)}
                      alt={related.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="text-white text-sm font-semibold leading-snug line-clamp-2 group-hover:text-blue-300 transition-colors">
                      {related.title}
                    </h3>
                    <p className="text-white/40 text-xs mt-1">{related.author}</p>
                  </div>
                </Link>
              )
            )}
          </div>
        </section>
      )}

      <Footer />
    </div>
  );
}
