let url = new URL(location.href);
let userInfo = JSON.parse(url.searchParams.get('data'));

let userDetails = document.getElementsByClassName('user_details')[0];


function infoUser(infUser, key) {
    if (typeof infUser === 'object') {
        for (let key of Object.keys(infUser)) {
            if (typeof infUser[key] !== 'string' && typeof infUser[key] !== 'number') {
                appendHtml(key + ' : ',true)
            }
            infoUser(infUser[key], key)
        }

    } else {
        appendHtml(key + ' -> ' + infUser)
    }

}

function appendHtml(text,block) {
    let h2Info = document.createElement('h2');

        block && h2Info.classList.add('hr')
        h2Info.innerText = `${text}`;
        userDetails.append(h2Info);

}

function loadUserPosts(userId) {
    let divBtn = document.querySelector('.btnDetails')
    let btnPostUser = document.createElement('button');
    btnPostUser.innerText = 'post of current user';
    btnPostUser.classList.add('btn');
    divBtn.appendChild(btnPostUser);

    let postsDiv = document.createElement('div')
    postsDiv.classList.add('posts');
    document.body.appendChild(postsDiv);

    btnPostUser.onclick = function () {
        fetch(` https://jsonplaceholder.typicode.com/users/${userInfo.id}/posts`)
            .then(posts => posts.json())
            .then(posts => {
                let ul = document.createElement('ul');
                for (const post of posts) {
                    let li = document.createElement('li');
                    li.innerText = post.title;
                    li.classList.add('li_title')
                    ul.appendChild(li);

                    let aTitle = document.createElement('a');
                    aTitle.href = `post-details.html?data=${JSON.stringify(post)}`;
                    aTitle.innerText = 'post details';

                    li.appendChild(aTitle)
                }
                postsDiv.appendChild(ul);
                btnPostUser.disabled = true;
            })
    }
}
fetch(`https://jsonplaceholder.typicode.com/users/${userInfo.id}/`)
    .then(responsive => responsive.json())
    .then(info => {
        infoUser(info);
        loadUserPosts(userInfo.id)
    })


