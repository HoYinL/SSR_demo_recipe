import React, { useEffect, useState, useRef } from "react";
import { AppBar, Toolbar, Box, Button } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import image from '../../../img/logo.png'
import { Appbar } from "./style";
import { useMediaQuery } from "react-responsive";
import { authenticate } from "../../../../server/axios/api1";
import { useSelector, useDispatch } from "react-redux";
import { setupLoginState } from "../../../store/loginreducer";
import { setSave } from "../../../store/savereducer";
import { clearBlogContent } from "../../../store/blogcontentreducer";
import { setSaveBlogContent } from "../../../store/savecontentreducer";
import { setPublishBlog } from "../../../store/publishblogreducer";
import { setPostedComment } from "../../../store/postcommentreducer";
import { setReportedPost } from "../../../store/reportedpostreducer";
import { setBlockedPost } from "../../../store/blockedpostreducer";
import CommentedPrompt from "./component/CommentedPrompt";
import BlockedPrompt from "./component/BlockedPrompt";
import ReportedPrompt from "./component/ReportPrompt";
import { DocumentOverflow } from "./style";

const Home = () => {
  const useref = useRef(null);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const login = useSelector(state => state.loginState.loginState);
  const saveContent = useSelector(state => state.saveContent.saveContent);
  const save = useSelector(state => state.save.save);
  const postedComment = useSelector(state => state.postedComment.postedComment);
  const blockedPost = useSelector(state => state.blockedPost.blockedPost);
  const reportedPost = useSelector(state => state.reportedPost.reportedPost);
  const user = useSelector(state => state.token.token_payload);

  const [saveState, setSaveState] = useState('');
  const [publish, setPublish] = useState(false);
  const [update, setUpdate] = useState(false);
  const [pathname, setPathname] = useState('');

  const appbar = Appbar();
  const documentOverflow = DocumentOverflow();

  useEffect(() => {
    if (typeof window != 'undefined') {
      setPathname(window.location.pathname);
    }
  }, []);

  const clickAuthenticate = async () => {
    let logined;

    await authenticate()
      .then((res) => {
        (pathname == '/' || pathname == '') ? navigate(`/surfaceUI/${res.id}/LandingPage`) : navigate(pathname);
        logined = true;
      })
      .catch((res) => {
        logined = false;
      })

    return logined == true ? Promise.resolve(logined) : Promise.reject(logined);
  }

  useEffect(() => {
    if (typeof window != 'undefined') {
      let currentLocation = document.location.href;

      const observer = new MutationObserver((mutationList) => {
        if (currentLocation !== document.location.href) {
          // location changed!
          currentLocation = document.location.href;
          if (window.location.pathname.includes('EditPublishedPost')) {
            setPublish(false);
            setUpdate(true);
          } else if (window.location.pathname.includes('CreatePost')) {
            setUpdate(false);
            setPublish(true);
          } else {
            setUpdate(false);
            setPublish(false);
          }
        }
      });

      observer.observe(
        document.getElementById('root'),
        {
          childList: true,
          subtree: false
        });

      document.body.classList.add(documentOverflow.overflowX);
    }
  }, []);

  useEffect(() => {
    if (typeof window != 'undefined') {
      clickAuthenticate()
        .then((res) => {
          if (document.readyState === 'complete') {
            document.body.style.opacity = "1";
            dispatch(setupLoginState(true))
          }
        })
        .catch((res) => {
          if (document.readyState === 'complete') {
            document.body.style.opacity = "1";
            dispatch(setupLoginState(false))
          }
        })
    }
  }, []);

  useEffect(() => {
    if (useref.current == false) {
      useref.current = true;
    } else {
      if (save == false) {
        dispatch(clearBlogContent([]));
      }
    }
  }, [save]);

  useEffect(() => {
    if (saveContent == true) {
      setSaveState('Saved');
      setTimeout(() => { dispatch(setSaveBlogContent(false)) }, 1500)
    } else if (saveContent == false) {
      setSaveState('Save');
    } else {
      setSaveState('Saving..');
    }
  }, [saveContent]);

  useEffect(() => {
    if (postedComment == true) {
      setTimeout(() => {
        dispatch(setPostedComment(false));
      }, 1500)
    }
  }, [postedComment]);

  useEffect(() => {
    if (reportedPost == true) {
      setTimeout(() => {
        dispatch(setReportedPost(false));
      }, 1500)
    }
  }, [reportedPost]);

  useEffect(() => {
    if (blockedPost == true) {
      setTimeout(() => {
        dispatch(setBlockedPost(false));
      }, 1500)
    }
  }, [blockedPost]);

  const xxs = useMediaQuery({
    query: "(min-width: 360px)"
  })

  return (
    <>
      <AppBar className={appbar.appbar} id="Appbar">
        <Toolbar className={appbar.toolbar}>
          <Link to={login ? `/surfaceUI/${user.id}/LandingPage` : "/"}>
            <Box
              component="img"
              className={appbar.logo}
              src={image}
            />
          </Link>
          {
            xxs && !login &&
            <Box sx={{ display: 'flex' }}>
              <Box className={appbar.box}><Link to="/login" className={appbar.link}>SignIn</Link></Box>
              <Box className={appbar.box}><Link to="/signin" className={appbar.link}>SignUp</Link></Box>
            </Box>
          }

          {
            publish &&
            <Box sx={{ display: 'flex', gap: '1rem' }}>
              <Button
                onPointerUp={() => {
                  dispatch(setSaveBlogContent(null))
                  dispatch(clearBlogContent([]));
                  dispatch(setSave(true));
                  setTimeout(() => dispatch(setSave(false)))
                }}
                className={appbar.button}
              >
                {saveState}
              </Button>

              <Button
                onPointerUp={() => {
                  dispatch(setPublishBlog(true));
                  setTimeout(() => dispatch(setPublishBlog(false)))
                }}
                className={appbar.button}
              >
                Publish
              </Button>
            </Box >
          }

          {
            update &&
            <Button
              onPointerUp={() => {
                dispatch(setSave(true));
              }}
              className={appbar.button}
            >
              Update
            </Button>
          }
        </Toolbar>
      </AppBar>

      {
        postedComment && <CommentedPrompt />
      }

      {
        reportedPost && <ReportedPrompt />
      }

      {
        blockedPost && <BlockedPrompt />
      }
    </>
  );
};

export default Home