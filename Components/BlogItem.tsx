interface BlogItemProps {
  id: string; // Change from number to string
  image: string;
  title: string;
  description: string;
  category: string;
  author: string;
}

const BlogItem: React.FC<BlogItemProps> = ({ id, image, title, description, category, author }) => {
  return (
    <div>
      <a href={`/blogs/${id}`}>
        <h2>{title}</h2>
      </a>
      <p>{description}</p>
    </div>
  );
};

export default BlogItem;
