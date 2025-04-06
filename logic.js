class Mark {
    constructor(name, percentage, value) {
        this.name = name;
        this.percentage = percentage;
        this.value = value;
    }

    get calculatedValue() {
        return (this.percentage / 100) * this.value;
    }
}

class Module {
    constructor(id, name, credits) {
        this.id = id;
        this.name = name;
        this.credits = credits;
        this.marks = [];
    }

    calculateAverage() {
        let total = 0;
        let sumWeight = 0;
        for (let mark of this.marks) {
            total += mark.calculatedValue;
            sumWeight += mark.percentage;
        }
        return sumWeight > 0 ? total * (100 / sumWeight) : 0;
    }

    get roundedAverage() {
        return Math.round(this.calculateAverage());
    }
}

function getHardcodedModules() {
    const modules = [];

    // 1. Algoritmų sudarymas ir analizė
    const m1 = new Module("P170B400", "Algoritmų sudarymas ir analizė", 6);
    m1.marks = [
        new Mark("LB4", 10, 10),
        new Mark("LB8", 10, 10),
        new Mark("TE9", 20, 5),
        new Mark("LB12", 10, 5),
        new Mark("IR15", 20, 5),
        new Mark("E1", 30, 5)
    ];

    // 2. Duomenų bazės
    const m2 = new Module("P175B602", "Duomenų bazės", 6);
    m2.marks = [
        new Mark("SU5", 15, 9),
        new Mark("LB7", 12, 10),
        new Mark("LB11", 9, 5),
        new Mark("SU13", 15, 5),
        new Mark("LB15", 9, 5),
        new Mark("AD16", 10, 5),
        new Mark("E4", 30, 5)
    ];

    // 3. Operacinės sistemos
    const m3 = new Module("P175B304", "Operacinės sistemos", 6);
    m3.marks = [
        new Mark("KN4", 10, 7),
        new Mark("KN8", 20, 5),
        new Mark("KN15", 10, 5),
        new Mark("KN12", 20, 5),
        new Mark("TE10", 20, 5),
        new Mark("E1", 20, 5)
    ];

    // 4. Programų sistemų inžinerija
    const m4 = new Module("P175B015", "Programų sistemų inžinerija", 6);
    m4.marks = [
        new Mark("LB6", 10, 10),
        new Mark("LB12", 10, 5),
        new Mark("TE8", 15, 10),
        new Mark("TP16", 25, 5),
        new Mark("ŽP16", 10, 5),
        new Mark("E1", 30, 5)
    ];

    // 5. Programų sistemų testavimas
    const m5 = new Module("T120B162", "Programų sistemų testavimas", 6);
    m5.marks = [
        new Mark("RA4", 17.5, 10),
        new Mark("RA8", 17.5, 5),
        new Mark("RA12", 17.5, 5),
        new Mark("RA16", 17.5, 5),
        new Mark("E4", 30, 5)
    ];

    modules.push(m1, m2, m3, m4, m5);
    return modules;
}
