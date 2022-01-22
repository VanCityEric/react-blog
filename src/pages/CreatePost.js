import React, { useState, useEffect } from 'react';
import { Form, Button, Card } from 'react-bootstrap';
import './CreatePost.css';
import { addDoc, collection } from 'firebase/firestore';
import { db, auth } from '../firebase-config';
import { useNavigate } from 'react-router-dom';


const CreatePost = (props) => {
 
  const monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  let myCurrentDate = new Date();
  let time = myCurrentDate.getTime();
  let date = myCurrentDate.getDate();
  let year = myCurrentDate.getFullYear();
  const [title, setTitle] = useState('');
  const [postText, setPostText] = useState('');

  const postsCollectionRef = collection(db, 'posts');
  

  let navigate = useNavigate();
  const createPost = async () => {
    await addDoc(postsCollectionRef, {
      title,
      postText,
      date: {
        month: monthNames[myCurrentDate.getMonth()],
        date: date,
        year: year,
      },
      timestamp: time,
      author: { name: auth.currentUser.displayName, id: auth.currentUser.uid },
    });
    navigate('/');
  };

  const onTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const onPostTextChange = (event) => {
    setPostText(event.target.value);
  };

  useEffect(() => {
    if (!props.isAuth) {
      navigate('/login');
    }
  });

  return (
    <Card>
      <Card.Body>
        <div>
          <h3 className="text-center"> Create a Post</h3>
          <Form>
            <Form.Group id="title" className="mt-2">
              <Form.Label>Title</Form.Label>
              <Form.Control onChange={onTitleChange}></Form.Control>
            </Form.Group>
            <Form.Group id="post" className="mt-2">
              <Form.Label>Post</Form.Label>
              <Form.Control
                as="textarea"
                rows={10}
                onChange={onPostTextChange}
              ></Form.Control>
            </Form.Group>
            <Button onClick={createPost} className="w-100 publish-btn">
              Publish
            </Button>
          </Form>
        </div>
      </Card.Body>
    </Card>
  );
};

export default CreatePost;
