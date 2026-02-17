const TASK_STATES = {
    TODO: "Todo",
    DOING: "Doing",
    DONE: "Done",
    ARCHIVED: "Archived",
    DELETED: "Deleted"
}

//defaults for instance vars
const DEFAULT_TASK_NAME   = "New Task";
const DEFAULT_DESCRIPTION = "";
const DEFAULT_STATUS      = TASK_STATES.TODO;
const DEFAULT_POSITION    = 0;
const DEFAULT_FINISHED    = false;

//text sizes
const NAME_SIZE           = 25
const DESC_SIZE           = 16
const STATUS_SIZE         = 16

//colors, lots of colors (im making SURE const doesnt get deprecated)
const NAME_COLOR          = { R: 0,   G: 0,   B: 0   }
const DESC_COLOR          = { R: 0,   G: 0,   B: 0   }
const STATUS_COLOR        = { R: 255, G: 0,   B: 0   }
const WHY_IS_THIS_HERE    = { R: 255, G: 255, B: 255 }

//confirm button settings (offsets so far)
const CONFIRM_X_OFFSET    = 10
const CONFIRM_Y_OFFSET    = 10

//cancel button settings (offsets so far)
const CANCEL_X_OFFSET     = 350
const CANCEL_Y_OFFSET     = 10

//text settings
const TEXT_X_OFFSET       = 190
const TEXT_X_PADDING      = 0   //not used yet
const TEXT_Y_OFFSET       = 0   //not used yet
const TEXT_Y_PADDING      = 30

//id settings
const ID_MIN              = 1
const ID_MAX              = 99999

class Task {
    constructor(name, desc, status, position) { 
        this.name        = name     || DEFAULT_TASK_NAME;
        this.description = desc     || DEFAULT_DESCRIPTION;
        this.status      = status   || DEFAULT_STATUS;
        this.position    = position || DEFAULT_POSITION;
        this.finished    =             DEFAULT_FINISHED;
        this.Id          =             GenerateId()

        this.markTaskDoneButton = createButton(`Mark Done`);
        this.markTaskDoneButton.hide();
        this.markTaskDoneButton.mousePressed(() => this.buttonPressedMarkDone());
        
        this.deleteTaskButton = createButton(`Delete Task`);
        this.deleteTaskButton.hide();
        this.deleteTaskButton.mousePressed(() => this.buttonPressedDelete());

        this.id = Math.floor(Date.now() / ((Math.random() * 10000) + 500))

    }

    //getters and setters
    getName()     { return this.name }
    getDesc()     { return this.description }
    getStatus()   { return this.status }
    getPosition() { return this.position}
    isFinished()  { return this.finished }

    setName(newName)       { this.name        = newName   || DEFAULT_TASK_NAME }
    setDesc(newDesc)       { this.description = newDesc   || DEFAULT_DESCRIPTION }
    setStatus(newStatus)   { this.status      = newStatus || DEFAULT_STATUS }
    setPosition(newPos)    { this.position    = newPos    || DEFAULT_POSITION }
    setFinished(condition) { this.finished    = condition || DEFAULT_FINISHED }

    //im not saying that this method should be in the list but it should definitely be in the list
    setArchived() {
        this.setStatus(TASK_STATES.ARCHIVED);
    }

    //kinda barebones but hopefully the list class can carry
    setCompleted() {
        this.setStatus(TASK_STATES.DONE);
        this.setFinished(true);
    }

    //get the list class to remove this or something
    delete() {
        this.setName("Deleted Task")
        this.setDesc("")
        this.setStatus(TASK_STATES.DELETED)
    }

    //basically slides the position of the task up or down 1 spot (world record for fastest annihilation of the webapp)
    slidePosition(direction) {
        if (direction == 0) { //do not.
            return;
        }
        let normDirection = direction / Math.abs(direction); //wizard spell to normalize the direction to either 1 or -1 (in theory)
        this.setPosition(normDirection);
    }
    

    //methods
    toString() {
        let output = ""

        output += `Name: ${this.name}\n`
        output += `Description: ${this.description}\n`
        output += `Status: ${this.status}\n`
        output += `Position: ${this.position}\n`
        output += `Is Finished: ${this.finished}`

        return output;
    }

    deleteTaskButtons(){
        this.markTaskDoneButton.remove();
        this.deleteTaskButton.remove();
    }

    buttonPressedMarkDone(){
        this.setCompleted();
        refresh();
    }

    buttonPressedDelete(){
        let list = this.getListTask()
        this.deleteTaskButtons()
        list.removeTask(this);
        refresh();
    }

    //gets the list that the task is in
    getListTask(){
        for(let list of listArray){
            let storage = list.getStorage();
            if(storage.findIndex(t => t.id === this.id) != -1){
                return list
            }
        }
    }

    show(x, y) {

        // main box
        rect(x, y, 380, 120, 10);

        // sets pos of buttons        
        this.markTaskDoneButton.position(x + 10, y+10);
        this.deleteTaskButton.position(x + 285, y+10);

        //shows buttons
        this.markTaskDoneButton.show();
        this.deleteTaskButton.show();

        // text slop
        //name
        textAlign(CENTER, CENTER);
        fill(NAME_COLOR.R, NAME_COLOR.G, NAME_COLOR.B);
        textSize(NAME_SIZE);
        text(this.name, x + TEXT_X_OFFSET, y + TEXT_Y_PADDING);

        //desc
        fill(DESC_COLOR.R, DESC_COLOR.G, DESC_COLOR.B);
        textSize(DESC_SIZE);
        text(this.description, x + TEXT_X_OFFSET, y + TEXT_Y_PADDING * 2);

        //status
        fill(STATUS_COLOR.R, STATUS_COLOR.G, STATUS_COLOR.B);
        textSize(STATUS_SIZE)
        text(this.status, x + TEXT_X_OFFSET, y + TEXT_Y_PADDING * 3);

        fill(WHY_IS_THIS_HERE.R, WHY_IS_THIS_HERE.G, WHY_IS_THIS_HERE.B); //im confused on why were filling with white here lol (might be p5js jank)
    }

    static fromJSON(data) {
        return new Task(
            data.name, 
            data.description, 
            data.status, 
            data.position, 
            data.finished,
            data.Id
        );
    }

    
    toJSON(){
        return {
            name: this.name,
            description: this.description,
            status: this.status,
            position: this.position,
            finished: this.finished,
            Id: this.Id
        };
    }
}

let generatedIds = {} //array to store already generated ids (avoids the low chance of getting the same id twice)
//Generates a random id for the task (probably redundant)
function GenerateId() {
    let generatedId
    let idValid = false

    while (!idValid) {
        generatedId = Math.floor(Math.random() * ID_MAX) + ID_MIN
        
        //extra code to make it loop back around if the id is already created (too many lines for such an unlikely problem)
        idValid = true
        for (let id in generatedIds) {
            if (!(rand == id)) {
                console.warn("ID is already created!")
                continue
            }
            idValid = false
        }
    }

    return generatedId
}