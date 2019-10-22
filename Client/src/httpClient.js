import Axios, { options } from './axios-api';

export function getPostAsync(id) {
    return Axios.get('/api/blog/' + id)
        .then(response => {
            return response.data;
        });
}

export function getPostsAsync(page, category) {
    return Axios.get('/api/blog/posts/' + page + '/' + category)
        .then(response => {
            return response.data;
        })
}

export function getTagsAsync() {
    return Axios.get('/api/blog/tags')
        .then(response => {
            return response.data;
        });
}

export function getHeaderAsync() {
    return Axios.get("/api/blog/header")
        .then(response => {
            return response.data;
        });
}

export function getCommentsAsync(id) {
    return Axios.get('/api/blog/comments/' + id)
        .then(response => {
            return response.data;
        });
}

export function getAboutAsync() {
    return Axios.get("/api/blog/about")
        .then(response => {
            return response.data;
        });
}

export function getImagesAsync(token) {
    return Axios.get('/api/admin/images', options(token))
        .then(response => {
            return response.data;
        });
}

export function postNewPostAsync(post, token) {
    return Axios.post('/api/blog/new', post, options(token))
        .then(response => {
            return response.data;
        });
}

export function postHeaderAsync(image, token) {
    return Axios.post('/api/admin/header/', image, options(token))
        .then(response => {
            return response.data;
        })
}

export function postImageAsync(image, token) {
    return Axios.post('/api/admin/upload/', image, options(token))
        .then(response => {
            return response.data;
        })
}

export function postCredentialAsync(credential, token) {
    return Axios.post('/api/admin/credential', credential, options(token))
        .then(response => {
            return response.data;
        });
}

export function postNewCommentAsync(id, comment) {
    return Axios.post('/api/blog/' + id + '/new', comment)
        .then(response => {
            return response.data;
        });
}

export function postAboutAsync(about, token) {
    return Axios.post('/api/admin/about', about, options(token))
        .then(response => {
            return response.data;
        });
}

export function deletePostAsync(id, token) {
    return Axios.delete('/api/blog/' + id, options(token))
        .then(response => {
            return response.data;
        });
}

export function deleteCommentAsync(postId, id, token) {
    return Axios.delete('/api/blog/' + postId + '/' + id, options(token))
        .then(response => {
            return response.data;
        });
}

export function deleteImageAsync(id, token) {
    return Axios.delete('/api/admin/images/' + id, options(token))
        .then(response => {
            return response.data;
        });
}