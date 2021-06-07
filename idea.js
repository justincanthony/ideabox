class Idea {
  constructor(title,body) {
    this.id = Date.now();
    this.title = title;
    this.body = body;
    this.comment = [];
    this.star = false;
    }


saveToStorage() {
    localStorage.setItem(this.id, JSON.stringify(this));
}

deleteFromStorage(id) {
     localStorage.removeItem(id);
}

updateIdea() {
  localStorage.setItem(this.id, JSON.stringify(this));
}
};
