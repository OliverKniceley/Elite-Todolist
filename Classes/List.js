const DEFAULT_LIST_NAME = "New List";

class List{

    constructor(name){
        this.name = name || DEFAULT_LIST_NAME
        this.listStorage = [];
    }

    //Getters
    getStorage(){
        return this.listStorage;
    }

    getName(){
        return this.name;
    }

    //Adds Task object to storage in List object.
    addTask(task){
        this.listStorage.push(task);
        // set the position of the task
        task.setPosition(this.listStorage.length - 1);

        // create callback functions so that the task can remotely control this list

        // give the task a moveDown callback function which calls the list's moveDown method
        task.moveDown = () => {
            const currentIndex = this.listStorage.indexOf(task);
            this.moveDown(currentIndex); // tell the list to move the task
        };

        // give the task a moveUp callback function which calls the list's moveUp method
        task.moveUp = () => {
            const currentIndex = this.listStorage.indexOf(task);
            this.moveUp(currentIndex); // tell the list to move the task
        };

    }

    removeTask(task){
        let storage = this.getStorage();
        const indx = storage.findIndex(t => t.name === task.name);

        //remove task
        this.listStorage.splice(indx, indx >= 0 ? 1 : 0);

        //move to archive
        //todo
    }

    // this will swap the tasks at index and index + 1
    moveDown(index){
        // do a safety check to avoid index out of range
        // TODO
    }

    moveTask(list, task){
        list.addTask(task);
        this.removeTask(task);
    }

    // this will swap the tasks at index and index - 1
    moveUp(index){
        // do a safety check to avoid index out of range
        // TODO
    }

    toString(){
        let output = `List: ${this.name}\n`;


        for(let i = 0; i < this.listStorage.length; i++){
            output += this.listStorage[i].toString();
            if(i < this.listStorage.length - 1){
                output += "\n";
            }
        }


        return output;
    }




    //will need worked on a bit when we get mutiple lists
    pushToLocalStrorage(listID){
        //uploads the obj it to local storage under the key name of what ebver is stored in listID
        const stringObj = JSON.stringify(this)
        localStorage.setItem(listID, stringObj);
    }


    getFromLocalStorage(listId){
        //gets data
        const data = localStorage.getItem(listId);


        //fail safe to check if there is actully data
        if(data === null) return;

        //converts data back
        const parsedData = JSON.parse(data);

        //sets the name of the list to the name saved in local storger
        this.name =  parsedData.name;

        //asinges the objests to a class so it regains its methods
        this.listStorage = parsed.listStorage.map(task => Task.fromJSON(task));
    }

    show(x) {
        // box
        rect(x, 10, 400, 1000);

        // green box which represents mark as done button maybe?
        fill(0, 150, 0);
        rect(x + 10, 20, 20, 20)
        fill(255);

        // red box for delete button maybe?
        fill(150, 0, 0);
        rect(x + 370, 20, 20, 20)
        fill(255);

        // title
        textAlign(CENTER, CENTER);
        fill(0);
        text(this.name, x + 200, 30);
        fill(255);

        // show all tasks in this list
        let y = 70;
        for (const each of this.listStorage) {
            each.show(x + 10, y);
            y += 130
        }
    }

}
