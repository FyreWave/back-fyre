import {Controller, Http} from "xpresser/types/http";


const AppController = <Controller.Object>{
    /**
     * Controller name.
     * @type {string}
     */
    name: 'AppController',

    /**
     * Index Method for "/"
     * @returns {string}
     */
    ping(){


        return {
            message: 'pong'
        }
    },


    api404(http: Http): Http.Response {
        return http.toApiFalse(
            {
                error: 404,
            },
            404
        );
    },
};

export = AppController;
