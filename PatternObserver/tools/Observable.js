function Observable (){
    this.observers = [];
}



Observable.prototype.addObserver = function(observer) {
    this.observers.push(observer)
};

Observable.prototype.removeObserver = function(observer) {
    let index = this.observer.indexOf(observer);
    if (index !== -1){
        this.observers.splice(index, 1);
    }
};

Observable.prototype.notify = function(label, data) {
    console.log(label, data);
    this.observers.forEach(observer => {
        observer.update(label, data);
    })
}