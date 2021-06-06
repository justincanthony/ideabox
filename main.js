//👇 querySelectors👇
var saveButton = document.querySelector('.save-btn');
var displayStarredButton = document.querySelector('.show-starred-button');
var addCommentButton = document.querySelector('.comment-button');
var deleteIdeaButton = document.querySelector('.img-button')
var ideaTitle = document.querySelector('.form-title'); // title text input
var ideaBody = document.querySelector('.form-body'); // body text input
var searchText = document.querySelector('.search-field');
var renderedIdeas = document.querySelector('.ideabox');
var savedIdeas = [];

//👇 eventListeners👇
saveButton.addEventListener('click', instantiateIdeaClass);

renderedIdeas.addEventListener('click', function(e) {
  if(e.target.className === 'delete') {
    deleteIdeaCard(e);
  };
  if(e.target.className === 'empty-star') {
    favoriteIdea(e);
  }
  if(e.target.className === 'star') {
    removeFavorite(e);
}
});

// renderedIdeas.addEventListener('click', function(e) {
//   if(e.target.className === 'delete'){
//     var parent = e.target.parentElement;
//     parent.parentNode.parentNode.remove();
//   }
//   if(e.target.className === "empty-star" || e.target.className === "star") {
//     //new variable for article id
//     var ideaArticle = e.target.parentElement.parentNode.parentNode;
//     // idea article is equal to button
//     for(var i = 0; i < savedIdeas.length; i++) {
//       //if article id matches id in savedIdeas
//       if(Number(ideaArticle.id) === savedIdeas[i].id) {
//         console.log(e.target.className);
//         console.log(e.target.nextElementSibling);
//         //grab idea instance and update star property
//
//         // element we are updating.classList.add("hidden")
//         if(savedIdeas[i].star === true) {
//           //this happens when star is true
//           savedIdeas[i].star = false;
//           e.target.classList.add("hidden")
//           e.target.nextElementSibling.classList.remove("hidden")
//         } else {
//           savedIdeas[i].star = true;
//           // this happens when star is false
//           e.target.classList.remove("hidden")
//           e.target.previousElementSibling.classList.add("hidden")
//         }
//
//         //remove sibling of target
//         // value of starProperty === false
//         console.log("working still!")
//         // updating starValue to true
//         console.log("final works");
//
//       }
//     }
//   }
//   console.log(savedIdeas[0]);
// })

//👇 eventHandlers👇
//Save card + make new instance of Idea
function instantiateIdeaClass(event) {
  event.preventDefault();
  if (ideaBody.value === "" || ideaTitle.value === "") {
    saveButton.disabled = true;
  } else {
    saveButton.disabled = false;
    var newIdeaObject = new Idea(ideaTitle.value, ideaBody.value);
    savedIdeas.push(newIdeaObject);
    renderIdeaCard(newIdeaObject);
    // changeButton();
    // clearFields();
  }
};

function renderIdeaCard(newIdeaObject) {
  var objectId = newIdeaObject.id;
  renderedIdeas.innerHTML += `<article class="idea-card" id="${objectId}">
    <div class="idea-card-header">
      <button class="unsaved-star">
        <img class="empty-star" src="./assets/icons/star.svg" alt="empty star"/>
        <img class= "star hidden" src="./assets/icons/star-active.svg" alt="star"/>
      </button>
      <button class="img-button">
        <img class="delete" src="./assets/icons/delete.svg"/>
      </button>
    </div>
    <div class="idea-card-body">
      <h3>${ideaTitle.value}</h3>
      <p>${ideaBody.value}<p>
    </div>
    <div class="idea-card-footer">
      <button class ="comment-button">
        <img class="comment-image" src="./assets/icons/comment.svg" alt="comment image"/>
      </button>
      <label>Comment</label>
    </div>
  </article>`
};

function deleteIdeaCard(e) {
  var parent = e.target.parentElement.parentNode.parentNode;
  console.log(parent.id);
    for (i = 0; i < savedIdeas.length; i++) {
      if (Number(parent.id) === savedIdeas[i].id) {
        parent.remove();
        savedIdeas.splice(i, 1);
      }
    }
};
function favoriteIdea(e) {
  var emptyStarImage = document.querySelector('.empty-star');
  var articleIdea = e.target.parentElement.parentNode.parentNode;
  var favoritedStarImage = document.querySelector('.star');
  for (var i = 0; i < savedIdeas.length; i++) {
   if (Number(articleIdea.id) === savedIdeas[i].id) {
     savedIdeas[i].star = true;
     favoritedStarImage.classList.remove('hidden');
     emptyStarImage.classList.add('hidden');
    }
}
}
function removeFavorite(e) {
  var emptyStarImage = document.querySelector('.empty-star');
  var articleIdea = e.target.parentElement.parentNode.parentNode;
  var favoritedStarImage = document.querySelector('.star');
  for (var i = 0; i < savedIdeas.length; i++) {
    if (Number(articleIdea.id) === savedIdeas[i].id && savedIdeas[i].star === true) {
      savedIdeas[i].star = false;
     favoritedStarImage.classList.add('hidden');
     emptyStarImage.classList.remove('hidden');
}
}
}

function changeButton() {
  saveButton.classList.remove('disable-button')
  saveButton.classList.add('save-btn');
};

function clearFields() {
  ideaTitle.value = "";
  ideaBody.value = "";
};
