import {Controller, Http} from "xpresser/types/http";
import wave from "../models/Wave";

/**
 * WaveController
 */
export = <Controller.Object>{
    // Controller Name
    name: "WaveController",

    // Controller Default Error Handler.
    e: (http: Http, error: string) => http.status(401).json({ error }),


    /**
    * Example Action.
    * @param http - Current Http Instance
    */
  async  makeWave(http: Http) {

        const body = http.$body.all()

        await wave.new(body);


        console.log(body,'makeWave');

        return http.status(200).json({
            message: 'Wave Created'
        });

    },
};
