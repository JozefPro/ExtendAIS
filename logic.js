class Mark 
{
    constructor(name, percentage, value) 
    {
        this.name = name;               // Example: "LB4"
        this.percentage = percentage;   // Example: 20 (20%)
        this.value = value;             // Example: 8
    }

    get calculatedValue() {
        return (this.percentage / 100) * this.value;
    }
}

class Module 
{
    constructor(id, name) 
    {
        this.id = id;         // Example: "P170B400"
        this.name = name;     // Example: "Algoritmų sudarymas ir analizė"
        this.marks = [];      // List of Mark objects
    }

     
     calculateAverage() 
     {
        let total_value = 0;

        for (let mark of this.marks) 
        {
            total_value += mark.value;
        }

        return total_value;
    }
}

// **Function to Initialize Two Hardcoded Modules**
function initializeHardcodedModules() {
    let module1 = new Module("P170B400", "Algoritmų sudarymas ir analizė");
    module1.marks = [
        new Mark("LB4", 10, 10),
        new Mark("LB8", 10, 5),
        new Mark("TE9", 20, 5),
        new Mark("LB12", 10, 5),
        new Mark("IR15", 20, 5),
        new Mark("E1", 30, 5)
    ];

    let module2 = new Module("P175B602", "Duomenų Bazės");
    module2.marks = [
        new Mark("SU5", 15, 9),
        new Mark("LB7", 12, 5),
        new Mark("LB11", 9, 5),
        new Mark("SU13", 15, 5),
        new Mark("LB15", 9, 5),
        new Mark("AD16", 10, 5),
        new Mark("E4", 30, 5)
    ];

    return [module1, module2];
}


