import { Link, useNavigate, useParams } from 'react-router-dom';
import BlogService from '../../services/blogs/blog.service';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';

const timeInFormat = (date) => {


  const currentDate = new Date(date);
  const options = { year: 'numeric', month: 'long', day: 'numeric' };

  // Format the date
  const formattedDateTime = currentDate.toLocaleDateString(undefined, options);
  return formattedDateTime;

}
const EditBlog = ({ present_time }) => {

  const { id } = useParams();

  let navigate = useNavigate();


  const [photo, setPhoto] = useState(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [blog, setBlog] = useState([]);

  useEffect(() => {
    BlogService.getBlog(id).then(
      (response) => {
        console.log(response.data);
        setBlog(response.data);
      }, (error) => {
        console.log(error);
      }
    )
  }, [])
  useEffect(() => {
    if (blog) {
      setDescription(blog.description);
      setTitle(blog.title);
    }
  }, [blog])
  const handleSubmit = (e) => {
    e.preventDefault();
    BlogService.updateBlog(id, title, description, photo).then(
      (response) => {
        console.log(response.data);
        alert('Blog updated successfully');
        navigate('/blogs/explore/')
      }, (error) => {
        console.error(error)
        alert(JSON.stringify(error.response.data))
      }
    )

  }


  return (
    <main>
      <div className="container my-5 bg-light">
        <div className="row bg-theme py-3">
          <div id="blog-nav" className="col-md-4 col-6 d-flex align-items-center">
            <Link to={'/blogs/explore'} className="text-light blog__nav">
              Explore
            </Link>
          </div>
        </div>

        <div className="px-4 py-5">
          <h3 className="mb-4">Create Post</h3>

          <form onSubmit={() => { return false; }} encType="multipart/form-data">
            {/* {% csrf_token %} */}
            <div className="row mb-3">
              <div className="col-md-6">
                <label htmlFor="Title">Blog Title</label>
                <input
                  className="form-control"
                  type="text"
                  name="title"
                  autoComplete="off"
                  onChange={(e) => setTitle(e.target.value)}
                  value={title || blog.title}

                  required
                />
              </div>
              <div className="col-md-6">
                <label htmlFor="Date">Date</label>
                <input
                  className="form-control"
                  type="text"
                  value={blog.date}
                  disabled
                />
              </div>
            </div>

            <div className="row mb-3">
              <div className="col-md-6">
                <label htmlFor="custom-file">Blog Post Image</label>
                <div className="custom-file">
                  <input
                    type="file"
                    id="blog_pic"
                    className="custom-file-input"
                    name="photo"
                    onChange={(e) => setPhoto(e.target.files[0])}
                    defaultValue={photo}
                    required
                  />
                  <label className="custom-file-label" htmlFor="blog_pic">
                  </label>
                </div>
              </div>
            </div>

            <div className="row mb-3">
              <div className="col-md-12">
                <div className="form-group">
                  <label htmlFor="blog_content">Blog Content</label>
                  <textarea
                    className="form-control"
                    id="blog_content"
                    rows="10"
                    name="description"
                    onChange={(e) => setDescription(e.target.value)}
                    value={description || blog.description}

                  ></textarea>
                </div>
              </div>
            </div>

            <div className="row mb-3">
              <div className="col-md-12 d-flex justify-content-end">
                <input
                  type="submit"
                  className="btn btn-success"
                  value="Publish Blog"
                  onClick={handleSubmit}
                />
              </div>
            </div>
          </form>
        </div>
      </div>
    </main >
  );
};

export default EditBlog;
