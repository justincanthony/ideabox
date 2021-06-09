class Idea {
  constructor(title, body, id, star) {
    this.id = id || Date.now();
    this.title = title;
    this.body = body;
    this.comment = [];
    this.star = star || false;
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
