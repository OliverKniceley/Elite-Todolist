const DEFAULT_TASK_NAME = "New Task"
const DEFAULT_DESCRIPTION = ""
const DEFAULT_STATUS = "Todo"
const DEFAULT_FINISHED = false

class Task {
    constructor(name, desc, status) {
        this.Name = name || DEFAULT_TASK_NAME
        this.Description = desc || DEFAULT_DESCRIPTION
        this.Status = status || DEFAULT_STATUS
        this.Finished = DEFAULT_FINISHED
    }

    //getters and setters
    GetName()    { return this.Name }
    GetDesc()    { return this.Description }
    GetStatus()  { return this.Status }
    IsFinished() { return this.Finished}

    SetName(newName)       { this.Name = newName || DEFAULT_TASK_NAME }
    SetDesc(newDesc)       { this.Description = newDesc || DEFAULT_DESCRIPTION }
    SetStatus(newStatus)   { this.Status = newStatus || DEFAULT_STATUS }
    SetFinished(condition) { this.Finished = condition || DEFAULT_FINISHED }

    //methods
    toString() {
        let output = ""

        let name =      this.GetName()
        let desc =      this.GetDesc()
        let status =    this.GetStatus()
        let completed = this.IsFinished()

        output += name + ": \n"
        output += desc + "\n"
        output += "Status: " + status + "\n"
        output += "Finished? " + completed
    }

    Complete() {
        this.SetStatus("Done")
        this.SetFinished(true)
    }

    //im not saying that this method should be in the list but it should definitely be in the list
    Archive() {
        this.SetStatus("Archived")
    }
}