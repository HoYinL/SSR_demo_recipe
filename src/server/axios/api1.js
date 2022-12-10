import axios from "axios";
import store from "../../common/store";
import { setToken } from "../../common/store/tokenreducer";
import { setTokenPayload } from "../../common/store/tokenreducer";
import { setupLoginState } from "../../common/store/loginreducer";
import jwt_decode from "jwt-decode";
import jwt_encode from "jwt-encode";
import Cookies from 'js-cookie';
import config from "../config";

const baseURL = `/api/`;

let authorization = null;

let request = axios.create({
    baseURL,
    headers: {
        "Authorization": authorization, 
    },
});

request.interceptors.request.use(async function (config) {
    config.headers["Authorization"] = authorization
    return config
  }, function (error) {
    return Promise.reject(error)
  })

  // 全局設定 AJAX Response 攔截器 (interceptor)
request.interceptors.response.use(function (response) {
    response.config.headers.Authorization = authorization;
    return response
  }, async function (error) {
    if (error.response) {
      // server responded status code falls out of the range of 2xx
      switch (error.response.status) {

        case 400:
            {
                const { message } = error.response.data
                alert(`${error.response.status}: ${message || '資料錯誤'}。`)
            }
            break
  
        case 401:
            {
                // 當不是 refresh token 作業發生 401 才需要更新 access token 並重發
                // 如果是就略過此刷新 access token 作業，直接不處理(因為 catch 已經攔截處理更新失敗的情況了)
                const refreshTokeUrl = `/api/refreshToken/`

                //${process.env.BASEURL}
                if (error.config.url !== refreshTokeUrl) {
                  console.log('hi');
                  // 原始 request 資訊
                  const originalRequest = error.config

                  if(typeof window != "undefined"){
                    let documentState = setInterval(() => {
                    let state = document.readyState;

                    if(state === 'complete'){ 
                      document.body.style.opacity = "1";
                      clearInterval(documentState)
                    }
                  }, 0)
                  }

                  // 依據 refresh_token 刷新 access_token 並重發 request
                  return request
                    .post('/refreshToken') 
                    .then((response) => {
                      authorization = response.data.JwtToken
                      originalRequest.headers.Authorization = response.data.JwtToken

                      store.dispatch(setToken(response.data.JwtToken));
                      // 重送 request (with new access_token)
                      return axios(originalRequest)
                    })
                }
            }
            break
  
        case 404:
            alert(`${error.response.status}: 資料來源不存在`)
            break
  
        case 500:
            alert(`${error.response.status}: 內部系統發生錯誤`)
            break
  
        default:
            alert(`${error.response.status}: 系統維護中，造成您的不便，敬請見諒。`)
            break
      }

    } else {
      // Something happened in setting up the request that triggered an Error
      if (error.code === 'ECONNABORTED' && error.message && error.message.indexOf('timeout') !== -1) {
        // request time out will be here
        alert('網路連線逾時，請點「確認」鍵後繼續使用。')
      } else {
        // shutdonw api server
        alert('網路連線不穩定，請稍候再試')
      }
    }

    return Promise.reject(error)
})

export const authenticate = async () => {
  let success = false;
  let response;

  await request.get('/authenticate')
    .then((res) => {
        store.dispatch(setupLoginState(true));
        store.dispatch(setToken(res.data.token));
        store.dispatch(setTokenPayload(jwt_decode(res.data.token)));
        response = jwt_decode(res.data.token).token_payload;
        success = true;
    })
    .catch((res) => {
      response = false;
    })

  return success == true ? Promise.resolve(response): Promise.reject(response)
}

export const login = async (username, password) => {
  let response = null;
  let success = null;

   await request.post("/login", {
        username: username,
        password: password,
    })
    .then((res) => {
        if(res.data.user){
            authorization = res.data.token;
            success = true;
            document.cookie = `refresh_token = ${res.data.refresh_token}; max-age = 30 * 24 * 60 * 60`;
            store.dispatch(setupLoginState(true));
            store.dispatch(setToken(res.data.token));
            store.dispatch(setTokenPayload(jwt_decode(res.data.token)));
            response = jwt_decode(res.data.token).token_payload;
            localStorage.setItem('icon', res.data.user.icon);
        } else {
            success = false;
            response = res.data
        }
    })

    return success == true ? Promise.resolve(response) : Promise.reject(response);
};

export const register = async ( username, email, password, backgroundImg, description ) => {
  let success = null;
  let rejectMessage = null;
  let successMessage = null;

  (description);

  await request.post("/register", {
    username: username,
    email: email,
    password: password,
    backgroundImg: backgroundImg,
    description: description
  }).then((res) => {
    if(res.data.success == true){
      authorization = res.data.token;
      success = true;
      document.cookie = `refresh_token = ${res.data.refresh_token}; max-age = 30 * 24 * 60 * 60`;
      store.dispatch(setupLoginState(true));
      store.dispatch(setToken(res.data.token));
      store.dispatch(setTokenPayload(jwt_decode(res.data.token)));
      localStorage.setItem('icon', res.data.userIcon);
      successMessage = res.data;
    } else {
      success = false;
      rejectMessage = res.data.token_payload;
    }
  })

  return success == true? Promise.resolve(successMessage) : Promise.reject(rejectMessage);
}

export const getContributer = async () => {
  let success = false;
  let contributers = null;

  await request.get('/contributers')
  .then((res) => {
    success = true;
    contributers = res.data;
  })

  return success = true ? Promise.resolve(contributers) : Promise.reject();
}

export const getRecipes = async () => {
  let success = false;
  let recipes = null;

  await request.get('/recipes')
  .then((res) => {
    success = true;
    recipes = res.data;
  })

  return success = true ? Promise.resolve(recipes) : Promise.reject();
}

export const getComment = async () => {
  let success = false;
  let comment = null;

  await request.get('/comment')
  .then((res) => {
    success = true;
    comment = res.data;
  })

  return success = true ? Promise.resolve(comment) : Promise.reject();
}

export const modifyInformation = async ({
  username, 
  password,
  confirm_password,
  email,
  iconSrc,
  id,
  modifiedEmail,
  description
}) => {
  let success;
  let response;

  await request.post('/modifyInfo', {
    username, 
    password,
    confirm_password, 
    email, 
    iconSrc: iconSrc || localStorage.getItem('icon'),
    id,
    modifiedEmail,
    description
  }).then(res => {
    success = true;
    response = res;
    const jwt = jwt_decode(Cookies.get('refresh_token'));
    const clone_jwt = {...jwt};
    clone_jwt.token_payload.username = res.data.user.username;
    clone_jwt.token_payload.description = res.data.user.description;
    const refresh_token = jwt_encode(clone_jwt, config.secret);
    Cookies.set('refresh_token', refresh_token, { expires: 30 * 24 * 60 * 60 });
  }).catch(res => {
    ('false');
    success = false;
    response = 'something happens';
  })

  return success == true? Promise.resolve(response): Promise.reject(response);
}

export const confirmPassword = async (password, id) => {
  let success;

  await request.post('/confirmPassword', {
    password: password, 
    id: id
  }).then((res) => {
    if(res.data.success == 'true'){
      success = true;
    } else {
      success = false;
    }
  })

  return success == true? Promise.resolve(): Promise.reject()
};

export const getPost = async (url, times) => {
  let success;
  let response;

  await request.get(`${url}/${times}`)
  .then((res) => {
    success = true;
    console.log(res);
    response = res['data']['post']
  })
  .catch((res) => {
    success = false;
    response = 'get posts fail'
  })

  return success == true? Promise.resolve(response): Promise.reject(response)
}

export const getBlogContent = async (path) => {
  let success;
  let response;

  await request.get(`${path}`)
  .then((res) => {
    success = true;
    response = res;
    (response);
  })
  .catch((res) => {
    success = false;
    response = 'create Blog fail'
  })

  return response.data
}

export const search_Photo = async (search_target, page) => {
  let response;
  let success;

  let url =
  `https://api.unsplash.com/search/photos/?&page=${page}&query=${search_target}&client_id=NXSN9cn5YNspz6f-s-TrLh7ONVRS-zqQt1-kTHmxTj0`;

  await axios.get(url).then((res) => {
    response = res.data;
    success = true;
  }).catch((error) => {
    response = error;
    success = false
  });

  return success === true? Promise.resolve(response): Promise.reject(response);
}

export const embedWebPage = async (URL) => {
  let response;
  let success;

  const options = {
    url: `https://iframe.ly/api/iframely?url=${URL}&api_key=809b9725324ae72580e70b`,
  }
  await axios.request(options).then((res) => {
    response = res;
    success = true;
  }).catch((error) => {
    response = error;
    success = false;
  });

  return success === true? Promise.resolve(response): Promise.reject(response);
};

export const postPostComment = async (userId, postId, commentContent) => {
  let success = false
  let savedContent = null;

  await request.post(`surfaceUI/${userId}/PostComment/${postId}/`, 
    {
      commentContent: commentContent,
    })
    .then((res) => {
      success = true;
      savedContent = res.data['commentList'];
    });

  return success == true ? Promise.resolve(savedContent) : Promise.reject();
};

export const getPostComment = async (url) => {
  let success = false
  let savedContent = null;
  const routeUrl = url.replace('Blog', 'PostComment')

  await request.get(routeUrl)
    .then((res) => {
      success = true;
      savedContent = res.data;
    });

  return success == true ? Promise.resolve(savedContent) : Promise.reject();
};

export const getCommentContent = async (url, commentId) => {
  let success = false
  let savedContent = null;
  const routeUrl = url.replace('Blog', 'PostComment');
  (`${routeUrl}/${commentId}`);

  await request.get(`${routeUrl}/${commentId}`)
    .then((res) => {
      success = true;
      savedContent = res.data;
    });

  return success == true ? Promise.resolve(savedContent) : Promise.reject();
};

export const getAuthorPost = async (url, times) => {
  let success = false
  let savedContent = null;

  await request.get(`${url}/${times}`)
    .then((res) => {
      success = true;
      savedContent = res.data;
    });

  return success == true ? Promise.resolve(savedContent) : Promise.reject();
};

export const getUser = async (userId) => {
  let success = false
  let savedContent = null;

  await request.get(`surfaceUI/User/${userId}`)
    .then((res) => {
      success = true;
      savedContent = res.data;
    });

  return success == true ? Promise.resolve(savedContent) : Promise.reject();
};

export const getFeatures = async (featuresId) => {
  let success = false
  let savedContent = null;

  await request.get(`surfaceUI/Feature/${featuresId}`)
    .then((res) => {
      success = true;
      savedContent = res.data;
    });

  return success == true ? Promise.resolve(savedContent) : Promise.reject();
};

export const writeNewFile = async (content, userId) => {
  let success = false
  let savedContent = null;

  await request.post(`/writeFile/${userId}`, {
    content: content
  })
    .then((res) => {
      success = true;
      savedContent = res.data;
    });

  return success == true ? Promise.resolve(savedContent) : Promise.reject();
}

export const getVideo = async (id) => {
  let success = false
  let savedContent = null;
  
  await request.get(`/video/${id}`)
    .then((res) => {
      success = true;
      savedContent = res.data;
    });

  return success == true ? Promise.resolve(savedContent) : Promise.reject();
};

export const getReelsVideos = async (times) => {
  let success = false
  let savedContent = null;
  
  await request.get(`/ReelsVideos/${times}`)
    .then((res) => {
      success = true;
      savedContent = res.data;
    });

  return success == true ? Promise.resolve(savedContent) : Promise.reject();
};

export const blockPost = async (userId, postId) => {
  let success = false
  let savedContent = null;
  
  await request.post(`/surfaceUI/${userId}/BlockPost/${postId}`)
    .then((res) => {
      success = true;
      savedContent = res.data;
    });

  return success == true ? Promise.resolve(savedContent) : Promise.reject();
};

export const getBlockPost = async (userId) => {
  let success = false
  let savedContent = null;
  
  await request.get(`/surfaceUI/${userId}/BlockPost/`)
    .then((res) => {
      success = true;
      savedContent = res.data;
    });

  return success == true ? Promise.resolve(savedContent) : Promise.reject();
};

export const sortUser = async () => {
  let success = false
  let savedContent = null;
  
  await request.get(`/surfaceUI/SortUser/`)
    .then((res) => {
      success = true;
      savedContent = res.data;
    });

  return success == true ? Promise.resolve(savedContent) : Promise.reject();
};

export const sortPost = async () => {
  let success = false
  let savedContent = null;
  
  await request.get(`/surfaceUI/SortPost/`)
    .then((res) => {
      success = true;
      savedContent = res.data;
    });

  return success == true ? Promise.resolve(savedContent) : Promise.reject();
};

