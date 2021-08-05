import Box from '@material-ui/core/Box';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import Rating from '@material-ui/lab/Rating';
import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en';
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import "./style.scss";
import axios from "axios";
import jwtDecode from 'jwt-decode';
import ConfirmationDialog from '../../../../../common/ConfirmationDialog/ConfirmationDialog';
import Button from '@material-ui/core/Button';

const ReviewProducts = (props) => {
  const { relatedProduct } = props;

  // time ago
  TimeAgo.addLocale(en)
  const timeAgo = new TimeAgo('en-US');

  // Check user login
  const [error, setError] = useState("");
  const [comment, setComment] = useState("");
  const auth = useSelector(state => state.auth.data);
  const [value, setValue] = useState(0);
  const [, setHover] = useState(-1);
  const [click, setClick] = useState(true);
  const [userInfo, setUserInfo] = useState();
  const { accessToken } = auth || {};

  useEffect(() => {
    if (accessToken) {
      setUserInfo(jwtDecode(accessToken))
    }
  }, [accessToken])

  //get all users
  const [users, setUsers] = useState([]);

  useEffect(() => {
    try {
      axios.get("http://localhost:5000/api/users")
        .then(res => setUsers(res.data))
    } catch (error) {
      console.log(error)
    }
  }, [click]);

  // get comments
  const [comments, setComments] = useState([]);

  useEffect(() => {
    try {
      axios.get("http://localhost:5000/api/comments")
        .then(res => setComments(res.data))
    } catch (error) {
      console.log(error)
    }
  }, [click])

  const filterComments = comments.filter(comment => {
    return comment.productId === relatedProduct.id
  });

  const result = filterComments.map(comment => {
    return users.map(user => {
      if (comment.userId === user.id) {
        return {
          ...filterComments,
          inforUsers: user,
        }
      }
    })
  }).flat().filter(Boolean);

  function onHandleSubmitComment(e) {
    e.preventDefault();

    setClick(!click);

    if (!accessToken) {
      setError("Please login to comment!");
      alert(error);
      return;
    }

    const data = {
      id: Math.random() * 1000,
      userId: userInfo.id,
      productId: relatedProduct.id,
      userComment: comment,
      numberRating: value,
    }

    try {
      axios.post("http://localhost:5000/api/comments", data)
        .then(res => {

        })
        .catch(error => console.log(error))
    } catch (error) {
      console.log(error);
    }

    setComment("");
    setValue(0);
  }
  const [openConfirm, setOpenConfirm] = useState(false);
  const [selectedCommentId, setselectedCommentId] = useState(null);

  const openConfirmModal = (id) => {
    setOpenConfirm(true);
    setselectedCommentId(id)
  }

  const closeConfirm = () => {
    setOpenConfirm(false);
  }

  const handleDelete = () => {
    axios.delete(`http://localhost:5000/api/comments/${selectedCommentId}`)
      .then(res => {
        setClick(!click);
      })

    closeConfirm();
  }

  const element = result.map((item, index) => (
    <React.Fragment key={index}>
      <div className="col-md-12">
        <div className="media g-mb-30 media-comment">
          <img className="d-flex g-width-50 g-height-50 rounded-circle g-mt-3 g-mr-15" src={item.inforUsers.avatar} alt="Image Description" />
          <div className="media-body u-shadow-v18 g-bg-secondary g-pa-30">
            <div className="g-mb-15">
              <div className="group-rating">
                <h5 className="h5 g-color-gray-dark-v1 mb-0">{item.inforUsers.firstName + " " + item.inforUsers.lastName}</h5>
                <Box component="fieldset" mb={3} borderColor="transparent">
                  <Rating name="read-only" value={item[`${index}`].numberRating} precision={0.5} readOnly />
                </Box>
                {userInfo ? item.inforUsers.id === userInfo.id ? <Button style={{ marginLeft: "auto" }} variant="contained" color="secondary" onClick={() => openConfirmModal(item[`${index}`].id)}>Delete</Button> : "" : ""}
              </div>
              <span className="g-color-gray-dark-v4 g-font-size-12">{timeAgo.format(item[`${index}`].createdAt - 60 * 1000)}</span>
            </div>

            <p style={{ lineHeight: "1.5rem", paddingTop: "1.5rem" }}>{item[`${index}`].userComment}</p>
          </div>
        </div>
      </div>
    </React.Fragment>
  ))

  return (
    <div className="tabs__content--reviews">
      <div className="container">
        <div className="row">
          {element}
        </div>
      </div>
      <form onSubmit={onHandleSubmitComment}>
        <div className="rating">
          <p>Your ratings:</p>
          <div className="star">
            <Box component="fieldset" mb={3} borderColor="transparent">
              <Rating
                name="customized-empty"
                value={value}
                precision={0.5}
                emptyIcon={<StarBorderIcon fontSize="inherit" />}
                onChange={(event, newValue) => {
                  setValue(newValue);
                }}
                onChangeActive={(event, newHover) => {
                  setHover(newHover);
                }}
              />
            </Box>
          </div>
        </div>
        <div className="comment">
          <div className="form-group">
            <label htmlFor="exampleFormControlTextarea1">Your comments</label>
            <textarea
              className="form-control"
              rows="6"
              placeholder="Comments here !"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </div>
      </form>
      <ConfirmationDialog open={openConfirm} onClose={closeConfirm} onOk={handleDelete} title={'comment'} />
    </div>
  );
};

export default ReviewProducts;
