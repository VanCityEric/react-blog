import React, { useState, useEffect } from 'react';
import { getDocs, collection, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../firebase-config';
import { Card, Button, Container } from 'react-bootstrap';
import './Home.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { query, orderBy } from 'firebase/firestore';

const Home = (props) => {
  const [postLists, setPostList] = useState([]);

  const postsCollectionRef = collection(db, 'posts');
  const q = query(postsCollectionRef, orderBy('timestamp', 'desc'));

  useEffect(() => {
    const getPosts = async () => {
      const data = await getDocs(q);
      setPostList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getPosts();
  });

  const deletePost = async (id) => {
    const userPostDoc = doc(db, 'posts', id);
    await deleteDoc(userPostDoc);
  };

  return (
    <>
      <div className="header-image">
          <div className="latest-posts">Latest Posts</div>
      </div>
      <div className="home-page">
        {postLists.length === 0 && props.isAuth && (
          <Container className="text-center">
            {' '}
            <p className="dashboard-empty">
              Uh-oh, it looks like your dashboard is empty. <br /> Try creating
              a new post.{' '}
            </p>{' '}
          </Container>
        )}
        {postLists.length === 0 && !props.isAuth && (
          <Container className="text-center">
            {' '}
            <p className="dashboard-empty">
              Uh-oh, it looks like your dashboard is empty. <br /> Log in and
              create a new post.{' '}
            </p>{' '}
          </Container>
        )}
        {postLists.map((post) => {
          return (
            <Container style={{ maxWidth: '1000px' }}>
              <Card>
                <div className="post-header">
                  {post.image}
                  <div className="title">
                    <h4>{post.title}</h4>
                  </div>
                </div>
                <div className="post-text-container">{post.postText} </div>

                <div className="author-text">
                  @{post.author.name} on {post.date.month} {post.date.date},{' '}
                  {post.date.year}{' '}
                </div>
                <div className="delete-btn">
                  {props.isAuth && (
                    <Button
                      onClick={() => {
                        deletePost(post.id);
                      }}
                      variant="outline-danger"
                      size="sm"
                    >
                      <FontAwesomeIcon icon={faTrashAlt}></FontAwesomeIcon>
                    </Button>
                  )}
                </div>
              </Card>
            </Container>
          );
        })}
      </div>
    </>
  );
};

export default Home;
