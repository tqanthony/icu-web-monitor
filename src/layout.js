//import { Util } from "./util.js";
export class LayoutUtil {
    static addMonitor(parent_div) {
        console.log('Creating new monitor window');
        //console.log(Util.hex_2_rgb('FF00EE'));
        let parent =  document.getElementById(parent_div);
        let upper_div = document.createElement('div');
        upper_div.style.height = '80%';
        upper_div.style.width = '100%';        
    }
}