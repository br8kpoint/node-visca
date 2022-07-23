import { Camera } from "../visca/visca";
import { ViscaController,ViscaCameraConfig, ViscaControllerConfig,ViscaCommand } from "../visca/visca";

let config = {
    viscaSerial:{port:"COM7",baud:9600},
    //viscaIPCameras: [],
    viscaServer:{basePort: 52381,}
}
let ipConfig = {
    
} as ViscaCameraConfig;
let viscaConfig = config as ViscaControllerConfig;
viscaConfig.viscaSerial.baud = 9600;
viscaConfig.viscaSerial.port = "COM7";
ipConfig.id = 1;
ipConfig.ip = "192.168.0.127";
ipConfig.name= "Test";
ipConfig.port=1259;
const controller = new ViscaController(viscaConfig);
let cam1 = controller.addIPCamera(ipConfig, true);
/*cam1.on('update',()=>{
    console.log('cam 1 updated:');
    console.log(JSON.stringify(cam1));
});*/
setTimeout(function(){
    let cmd = ViscaCommand.cmdCameraPresetRecall(1,0);
    cmd.onComplete = function(){
        console.log("position 1 done.")
        setTimeout(function(){
            let cmd = ViscaCommand.cmdCameraPresetRecall(1,3);
            cmd.onComplete=function(){
                console.log("Position 2 done")
            }
            cam1.sendCommand(cmd);
            console.log("position 2")
        },2000)
    }
    cam1.sendCommand(cmd);
    console.log("position 1")
},2000)


