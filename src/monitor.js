export class MonitorContext {
    dataTypes;
    patientName

    constructor(patientName, dataTypes) {
        this.patientName = patientName;
        this.dataTypes = dataTypes;
    }
}

export class Monitor {
    context;   
    consumers;
    reader;

    constructor(context) {
        this.context = context;        
        this.consumers = {};
        for(let dataType of context.dataTypes) {
            let consumer =  new DataConsumer(this, dataType);
            this.addConsumer(consumer);
        }
    }   

    registerReader(reader) {
        this.reader = reader
    }

    addConsumer(consumer) {        
        this.consumers[consumer.dataType] = consumer;       
    }    

    onDataUpdated(data, dataType) {
        console.log('got data', data);
    }

    onParamUpdate(paramData, dataType) {
        console.log('got param', paramData);
    }

    // start monitor
    start() {
        console.log('start monitoring');
        this.reader.start(this.context.dataTypes);
        for (let key in this.consumers) {
            this.consumers[key].start();
        }
    }
}

export class DataConsumer {
    monitor;
    dataType;
    

    constructor(monitor, dataType) {        
        this.dataType = dataType;       
        this.monitor = monitor;
        this.monitor.addConsumer(this);
    }

    process(data) {
        console.log(this.constructor.name, 'processing data', data);
    }

    render (data_type, data) {
        this.monitor.render(data_type, data);
    }

    start() {
        console.log('start consuming data process');
    }
}

export class MonitorControler {
    static MAX_MONITOR = 2;
    monitors;
    divID;
    index = 0;

    constructor(divID) {
        this.monitors = {};
        this.divID = divID;
    }

    addMonitor(monitor) {
        if(this.monitors.length >=  this.MAX_MONITOR) {
            throw('Max monitors');
        }
        this.monitors[this.index] = monitor;
        this.index = (this.index + 1) % MonitorControler.MAX_MONITOR;
    }

    removeMonitor(monitor) {
        this.monitors.filter(item => item !== monitor);
    }

    start() {
        for (let key in this.monitors) {
            this.monitors[key].start();
        }
    }
}