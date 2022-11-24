export class DataReader {
    source;   
    monitor;

    constructor(source, monitor) {
        this.source = source;  
        this.monitor = monitor;     
    }  
    
    start() {

    }
}

export class LocalDataReader extends DataReader{   
    handler;
    interalTime;    

    constructor(source, monitor) {
        super(source, monitor);
        this.interalTime = 1000;
    }     

    //periodically read data and update
    start(dataTypes) {
        var self = this;        
        this.handler = setTimeout(function() {
             self.read(dataTypes);
        }, self.interalTime);
    }

    processJSON(json, dataTypes) {
        for (let dataType of dataTypes) {                    
            if (json.wave[dataType + '_wave']) {
                this.monitor.onDataUpdated(json.wave[dataType + '_wave'], dataType);
            }
            if (json['param'][dataType + '_param']) {
                this.monitor.onParamUpdate(json.param[dataType + '_param'], dataType);
            }
        }
    }

    //if data received then call monitor.onDataUpdated()  and onParamUpdate()
    read(dataTypes) {          
        fetch(this.source)
            .then(response => response.json())
            .then(json => {               
                this.processJSON(json, dataTypes);
            });
    }
}