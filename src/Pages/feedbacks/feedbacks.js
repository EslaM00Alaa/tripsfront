import React, { useState, useEffect } from "react";
import profile from "./cover.jpg";
import Swal from "sweetalert2";
import Button from "react-bootstrap/Button";
import "./style.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import VideoPlayer from "./videoPlayer";
import axios from "../../components/db/api";
const Feedbacks = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [pages, setPages] = useState(0);
  const [currentPage, setcurrentPage] = useState(1);
  const [flag, setFlag] = useState(false);
  const [boolen, setBoolen] = useState(false);
  
  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        const token = localStorage.getItem("token");
  
        // Fetch feedbacks for the current page
        const response1 = await axios.get(`/feedback${localStorage.getItem('role')==='user'?'/user':''}/${currentPage}`, {
          headers: {
            token: `${token}`,
          },
        });
        const data = response1.data;
        console.log(data);
        setFeedbacks(data);
  
        // Fetch total count of feedbacks for pagination
        const response2 = await axios.get("/feedback");
        const cnt = response2.data.count;
        setPages(cnt);
      } catch (error) {
        console.error("Error fetching feedbacks:", error);
      }
    };
  
    fetchFeedbacks();
  }, [currentPage, flag,boolen]);

  async function deleteFeedback(id) {
    try {
      const confirmation = await Swal.fire({
        title: "Do you want to delete this?",
        text: "If deleted, the data cannot be recovered",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it",
        cancelButtonText: "No, keep it",
      });
  
      if (confirmation.isConfirmed) {
        await Swal.fire({
          title: "Deleted",
          text: "It is no longer available in the program",
          icon: "success",
          confirmButtonColor: "#f47555",
        });
  
        // Make DELETE request using axios from db module
        await axios.delete(`/feedback/${id}`);
  
        setBoolen(!boolen)
      }
    } catch (error) {
      console.error('Error deleting feedback:', error);
      // Handle error, show message to the user, etc.
    }
  }

  
  const [comment, setComment] = useState('');
  const [file, setFile] = useState(null);

  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };

  
  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    try {
      const formData = new FormData(); // Create a FormData object
      formData.append('comment', comment); // Append comment to FormData
      formData.append('video', file); // Append video file to FormData
  
      // Make a POST request to upload video and comment using axios from db module
      const response = await axios.post('/feedback', formData, {
        headers: {
          token: localStorage.getItem("token") // Include token in headers
        }
      });
  
      if (response.status >= 200 && response.status < 300) {
        // Show success message using Swal
        Swal.fire({
          icon: 'success',
          title: 'Feedback submitted successfully',
          timer: 1500, // Close the alert after 1.5 seconds
          showConfirmButton: false
        });
  
        // Reset form fields
        setComment('');
        setFile(null);
        setFlag(false);
      } else {
        throw new Error('Failed to submit feedback');
      }
    } catch (error) {
      // Show error message using Swal
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Failed to submit feedback',
      });
      
      console.error('Error submitting feedback:', error);
      // Handle error, show message to the user, etc.
    }
  };
  
  
  const clear = () => {
    setComment('');
    setFile(null);
    // Clear file input
    const fileInput = document.getElementById('exampleFormControlFile1');
    if (fileInput) {
      fileInput.value = ''; // Reset file input value
    }
  };
  

  const generatePages = [];
  for (let i=1;i<=pages;i++)
     {
        generatePages.push(i)
     }
    


  return (
    <div>
      <Header />
 
     <Button className="addbtn" variant="primary" size="sm" onClick={() => { setFlag(!flag); clear() }}>
        {`  ${!flag ? 'add new' : 'close'}`}
      </Button>

      <div className={`formmm ${flag ? 'showw' : 'hiddenn'}`}>
        <form onSubmit={handleSubmit}>
          <div className="form-group row">
            <label htmlFor="colFormLabelSm" className="col-sm-2 col-form-label col-form-label-sm">Your Comment</label>
            <div className="col-sm-10">
              <input
                type="text"
                className="form-control form-control-sm"
                id="colFormLabelSm"
                placeholder="Your comment"
                value={comment}
                onChange={handleCommentChange}
              />
            </div>
          </div>
          <div className="form-group row">
            <label className="col-sm-2" htmlFor="exampleFormControlFile1">Upload File</label>
            <input
              type="file"
              className="form-control-file col-sm-10"
              id="exampleFormControlFile1"
              onChange={handleFileChange}
            />
          </div>
          <button type="submit" className="btn btn-primary">Submit</button>
        </form>
      </div>
  


      {pages > 0 ? (
  <div>
    {feedbacks.map((feedback, index) => (
      <div className="card" key={index}>
        <div className="head">
          <img src={profile} alt="Profile" />
          <h1>{feedback.name}</h1>
        </div>
        <div className="feedbackbody">
          <h5>{feedback.comment}</h5>
          <VideoPlayer videoId={feedback.video} />
        </div>
        <footer>
          {(feedback.mine || localStorage.getItem("role") === "admin") && (
            <button
              className="delete"
              onClick={() => deleteFeedback(feedback.id)}
            >
              DELETE
            </button>
          )}
        </footer>
      </div>
    ))}
    <div className="pagination">
      <button
        onClick={() =>
          setcurrentPage(currentPage - 1 >= 1 ? currentPage - 1 : 1)
        }
        className="page prev"
      >
        prev
      </button>
      {generatePages.map((page) => (
        <div
          onClick={() => setcurrentPage(page)}
          className={currentPage == page ? "page active" : "page"}
          key={page}
        >
          {page}
        </div>
      ))}
      <button
        onClick={() =>
          setcurrentPage(currentPage + 1 <= pages ? currentPage + 1 : pages)
        }
        className="page nxt"
      >
        next
      </button>
    </div>
  </div>
) : (
  <div className="nofeedbacks">No feedbacks to show</div>
)}


      <Footer />
    </div>
  );
};

export default Feedbacks;
//url={}
