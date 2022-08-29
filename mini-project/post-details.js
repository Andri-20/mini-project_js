let url = new URL(location.href);
let postInfo = JSON.parse(url.searchParams.get('data'));

console.log(postInfo);
fetch(`https://jsonplaceholder.typicode.com/posts/${postInfo.id}`)
.then(responsive => responsive.json())
.then(infoPost=>{
    let divPost = document.querySelector('.details')
    for (const infoPostElement in infoPost) {
        let h3PostInfo = document.createElement('h3');
        h3PostInfo.innerText=`${infoPostElement}: ${infoPost[infoPostElement]}`
        divPost.appendChild(h3PostInfo);
    }
})
fetch(`https://jsonplaceholder.typicode.com/posts/${postInfo.id}/comments`)
.then(responsive=> responsive.json())
.then(comments=> {

let commentsDiv = document.createElement('div');
commentsDiv.classList.add('comments');
document.body.appendChild(commentsDiv);

    for (const comment of comments) {
        let divComment = document.createElement('div');
        divComment.classList.add('comment');
        commentsDiv.appendChild(divComment);

        let pComment = document.createElement('p');
        pComment.innerText = `${comment.body}`;
        divComment.appendChild(pComment)
    }

})